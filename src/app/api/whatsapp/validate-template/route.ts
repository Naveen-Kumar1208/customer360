import { NextRequest, NextResponse } from 'next/server';

const WHATSAPP_CONFIG = {
  PHONE_NUMBER_ID: '253011594562692',
  BUSINESS_ACCOUNT_ID: '274821882361683',
  ACCESS_TOKEN: 'EAAP0tZBxzuAEBO7LpxLY7T2GpRs4XJmcQZCZC1y39oGZBxjwjsZAZAZAU6lZAs6CDAeMS1UZBbC8zwsBhjuJly1ZA7XVk1zmANRNwQ2OPriYz0QLxDKGemY24sQZCYDmP3Y4KanlvTKrBlN1Jbgq464pMUU4ZAd3pNBZAAwZBGLdPkbCC4Gpr3HZCZBKGjwIDbV0UIEIgJRqygZDZD',
  API_VERSION: 'v23.0',
};

interface TemplateValidationRequest {
  templateName: string;
  parameters?: string[];
}

// Helper function to count template parameters
function countTemplateParameters(template: any): { header: number; body: number; total: number } {
  const headerComponent = template.components?.find((comp: any) => comp.type === 'HEADER');
  const bodyComponent = template.components?.find((comp: any) => comp.type === 'BODY');
  
  // Count parameters in header text
  const headerParams = headerComponent?.text ? 
    (headerComponent.text.match(/\{\{\d+\}\}/g) || []).length : 0;
  
  // Count parameters in body text
  const bodyParams = bodyComponent?.text ? 
    (bodyComponent.text.match(/\{\{\d+\}\}/g) || []).length : 0;
  
  return {
    header: headerParams,
    body: bodyParams,
    total: headerParams + bodyParams
  };
}

// Helper function to build correct WhatsApp message payload
function buildMessagePayload(phone: string, templateName: string, templateData: any, parameters: string[]) {
  const paramCounts = countTemplateParameters(templateData);
  
  // Validate parameter count
  if (parameters.length !== paramCounts.total) {
    throw new Error(`Template requires ${paramCounts.total} parameters but ${parameters.length} provided`);
  }
  
  const components = [];
  let paramIndex = 0;
  
  // Add header parameters if exists
  if (paramCounts.header > 0) {
    const headerParams = parameters.slice(paramIndex, paramIndex + paramCounts.header);
    components.push({
      type: "header",
      parameters: headerParams.map(param => ({ type: "text", text: param }))
    });
    paramIndex += paramCounts.header;
  }
  
  // Add body parameters if exists
  if (paramCounts.body > 0) {
    const bodyParams = parameters.slice(paramIndex, paramIndex + paramCounts.body);
    components.push({
      type: "body",
      parameters: bodyParams.map(param => ({ type: "text", text: param }))
    });
  }
  
  return {
    messaging_product: "whatsapp",
    to: phone,
    type: "template",
    template: {
      name: templateName,
      language: {
        code: templateData.language || "en_US"
      },
      components: components
    }
  };
}

export async function POST(request: NextRequest) {
  console.log('🔍 Validating WhatsApp template');
  
  try {
    const { templateName, parameters = [] }: TemplateValidationRequest = await request.json();
    
    if (!templateName) {
      return NextResponse.json(
        { error: 'Template name is required' },
        { status: 400 }
      );
    }
    
    console.log('📋 Validating template:', { templateName, paramCount: parameters.length });
    
    // Fetch template details from Meta API
    const templateUrl = `https://graph.facebook.com/${WHATSAPP_CONFIG.API_VERSION}/${WHATSAPP_CONFIG.BUSINESS_ACCOUNT_ID}/message_templates?name=${templateName}&fields=name,status,category,language,components`;
    
    const response = await fetch(templateUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_CONFIG.ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        {
          success: false,
          error: 'Template not found',
          details: error
        },
        { status: 404 }
      );
    }
    
    const data = await response.json();
    const template = data.data?.[0];
    
    if (!template) {
      return NextResponse.json(
        {
          success: false,
          error: 'Template not found'
        },
        { status: 404 }
      );
    }
    
    if (template.status !== 'APPROVED') {
      return NextResponse.json(
        {
          success: false,
          error: `Template status is ${template.status}, only APPROVED templates can be used`
        },
        { status: 400 }
      );
    }
    
    // Count required parameters
    const paramCounts = countTemplateParameters(template);
    
    console.log('📊 Parameter analysis:', {
      template: templateName,
      required: paramCounts,
      provided: parameters.length,
      parameters: parameters
    });
    
    // Validate parameter count
    const isValid = parameters.length === paramCounts.total;
    
    let messagePayload = null;
    let validationError = null;
    
    if (isValid && parameters.length > 0) {
      try {
        // Build sample message payload for testing
        messagePayload = buildMessagePayload("919940804585", templateName, template, parameters);
      } catch (error) {
        validationError = error instanceof Error ? error.message : 'Failed to build message payload';
      }
    }
    
    return NextResponse.json({
      success: isValid,
      template: {
        name: template.name,
        status: template.status,
        category: template.category,
        language: template.language,
        components: template.components
      },
      parameterInfo: {
        required: paramCounts,
        provided: parameters.length,
        isValid: isValid,
        error: isValid ? null : `Template requires ${paramCounts.total} parameters but ${parameters.length} provided`
      },
      samplePayload: messagePayload,
      validationError: validationError,
      parameters: parameters
    });
    
  } catch (error) {
    console.error('❌ Template validation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Template validation failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
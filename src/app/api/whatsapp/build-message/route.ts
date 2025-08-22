import { NextRequest, NextResponse } from 'next/server';

const WHATSAPP_CONFIG = {
  PHONE_NUMBER_ID: '253011594562692',
  BUSINESS_ACCOUNT_ID: '274821882361683',
  ACCESS_TOKEN: 'EAAP0tZBxzuAEBO7LpxLY7T2GpRs4XJmcQZCZC1y39oGZBxjwjsZAZAZAU6lZAs6CDAeMS1UZBbC8zwsBhjuJly1ZA7XVk1zmANRNwQ2OPriYz0QLxDKGemY24sQZCYDmP3Y4KanlvTKrBlN1Jbgq464pMUU4ZAd3pNBZAAwZBGLdPkbCC4Gpr3HZCZBKGjwIDbV0UIEIgJRqygZDZD',
  API_VERSION: 'v23.0',
};

interface BuildMessageRequest {
  phone: string;
  templateName: string;
  parameters?: string[];
  campaignId?: string;
}

// Helper function to count template parameters in text
function countParametersInText(text: string): number {
  if (!text) return 0;
  const matches = text.match(/\{\{\d+\}\}/g);
  return matches ? matches.length : 0;
}

// Helper function to get template details and parameter requirements
async function getTemplateDetails(templateName: string) {
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
    throw new Error(`Template not found: ${error.error?.message || 'Unknown error'}`);
  }
  
  const data = await response.json();
  const template = data.data?.[0];
  
  if (!template) {
    throw new Error('Template not found');
  }
  
  if (template.status !== 'APPROVED') {
    throw new Error(`Template status is ${template.status}, only APPROVED templates can be used`);
  }
  
  return template;
}

// Helper function to build WhatsApp message payload with correct parameter structure
function buildWhatsAppMessagePayload(phone: string, template: any, parameters: string[] = []) {
  const components = [];
  let paramIndex = 0;
  
  // Process template components in order
  for (const component of template.components || []) {
    if (component.type === 'HEADER' && component.text) {
      const headerParamCount = countParametersInText(component.text);
      if (headerParamCount > 0) {
        const headerParams = parameters.slice(paramIndex, paramIndex + headerParamCount);
        if (headerParams.length !== headerParamCount) {
          throw new Error(`Header requires ${headerParamCount} parameters but ${headerParams.length} provided`);
        }
        components.push({
          type: "header",
          parameters: headerParams.map(param => ({ type: "text", text: param }))
        });
        paramIndex += headerParamCount;
      }
    }
    
    if (component.type === 'BODY' && component.text) {
      const bodyParamCount = countParametersInText(component.text);
      if (bodyParamCount > 0) {
        const bodyParams = parameters.slice(paramIndex, paramIndex + bodyParamCount);
        if (bodyParams.length !== bodyParamCount) {
          throw new Error(`Body requires ${bodyParamCount} parameters but ${bodyParams.length} provided`);
        }
        components.push({
          type: "body",
          parameters: bodyParams.map(param => ({ type: "text", text: param }))
        });
        paramIndex += bodyParamCount;
      }
    }
  }
  
  // Validate total parameter count
  if (paramIndex !== parameters.length) {
    throw new Error(`Template requires ${paramIndex} parameters but ${parameters.length} provided`);
  }
  
  return {
    messaging_product: "whatsapp",
    to: phone,
    type: "template",
    template: {
      name: template.name,
      language: {
        code: template.language || "en_US"
      },
      components: components.length > 0 ? components : undefined
    }
  };
}

export async function POST(request: NextRequest) {
  console.log('🔧 Building WhatsApp message payload');
  
  try {
    const { phone, templateName, parameters = [], campaignId }: BuildMessageRequest = await request.json();
    
    if (!phone || !templateName) {
      return NextResponse.json(
        { error: 'Phone and templateName are required' },
        { status: 400 }
      );
    }
    
    console.log('📋 Building message:', {
      phone,
      templateName,
      paramCount: parameters.length,
      parameters
    });
    
    // Get template details from Meta API
    const template = await getTemplateDetails(templateName);
    
    // Calculate required parameters
    const headerComponent = template.components?.find((comp: any) => comp.type === 'HEADER');
    const bodyComponent = template.components?.find((comp: any) => comp.type === 'BODY');
    
    const headerParamCount = headerComponent ? countParametersInText(headerComponent.text) : 0;
    const bodyParamCount = bodyComponent ? countParametersInText(bodyComponent.text) : 0;
    const totalRequired = headerParamCount + bodyParamCount;
    
    console.log('📊 Parameter requirements:', {
      header: headerParamCount,
      body: bodyParamCount,
      total: totalRequired,
      provided: parameters.length
    });
    
    // Build the message payload
    const messagePayload = buildWhatsAppMessagePayload(phone, template, parameters);
    
    // Add campaign ID for tracking if provided
    const fullPayload = {
      messagePayload,
      phone,
      ...(campaignId && { campaignId })
    };
    
    console.log('✅ Message payload built successfully:', JSON.stringify(messagePayload, null, 2));
    
    return NextResponse.json({
      success: true,
      payload: fullPayload,
      template: {
        name: template.name,
        language: template.language,
        status: template.status
      },
      parameterInfo: {
        header: headerParamCount,
        body: bodyParamCount,
        total: totalRequired,
        provided: parameters.length
      },
      components: template.components
    });
    
  } catch (error) {
    console.error('❌ Error building message payload:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to build message payload'
      },
      { status: 400 }
    );
  }
}
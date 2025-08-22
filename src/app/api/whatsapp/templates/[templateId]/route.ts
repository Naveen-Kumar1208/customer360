import { NextRequest, NextResponse } from 'next/server';

const WHATSAPP_CONFIG = {
  PHONE_NUMBER_ID: '253011594562692',
  BUSINESS_ACCOUNT_ID: '274821882361683',
  ACCESS_TOKEN: 'EAAP0tZBxzuAEBO7LpxLY7T2GpRs4XJmcQZCZC1y39oGZBxjwjsZAZAZAU6lZAs6CDAeMS1UZBbC8zwsBhjuJly1ZA7XVk1zmANRNwQ2OPriYz0QLxDKGemY24sQZCYDmP3Y4KanlvTKrBlN1Jbgq464pMUU4ZAd3pNBZAAwZBGLdPkbCC4Gpr3HZCZBKGjwIDbV0UIEIgJRqygZDZD',
  API_VERSION: 'v23.0',
};

export async function GET(
  request: NextRequest,
  { params }: { params: { templateId: string } }
) {
  const { templateId } = params;
  
  console.log(`📋 Fetching WhatsApp template details for: ${templateId}`);
  
  try {
    // Fetch specific template from Meta WhatsApp Business API
    const response = await fetch(
      `https://graph.facebook.com/${WHATSAPP_CONFIG.API_VERSION}/${WHATSAPP_CONFIG.BUSINESS_ACCOUNT_ID}/message_templates?name=${templateId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_CONFIG.ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ WhatsApp Template API error:', error);
      
      return NextResponse.json(
        {
          success: false,
          error: error.error?.message || 'Template not found',
          templateId
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
          error: 'Template not found',
          templateId
        },
        { status: 404 }
      );
    }

    console.log('✅ Fetched template details:', { name: template.name, status: template.status });
    
    // Extract detailed components
    const components = template.components || [];
    const headerComponent = components.find((comp: any) => comp.type === 'HEADER');
    const bodyComponent = components.find((comp: any) => comp.type === 'BODY');
    const footerComponent = components.find((comp: any) => comp.type === 'FOOTER');
    const buttonComponents = components.filter((comp: any) => comp.type === 'BUTTONS');

    // Format detailed template information
    const templateDetails = {
      id: template.name,
      name: template.name,
      category: template.category,
      language: template.language,
      status: template.status,
      quality_rating: template.quality_rating,
      rejected_reason: template.rejected_reason,
      created_time: template.created_time,
      updated_time: template.updated_time,
      components: {
        header: headerComponent ? {
          type: headerComponent.type,
          format: headerComponent.format,
          text: headerComponent.text,
          example: headerComponent.example
        } : null,
        body: bodyComponent ? {
          type: bodyComponent.type,
          text: bodyComponent.text,
          example: bodyComponent.example
        } : null,
        footer: footerComponent ? {
          type: footerComponent.type,
          text: footerComponent.text
        } : null,
        buttons: buttonComponents.length > 0 ? buttonComponents.map((buttonComp: any) => ({
          type: buttonComp.type,
          buttons: buttonComp.buttons
        })) : []
      },
      // Extract parameters for easy reference
      parameters: {
        header: headerComponent?.example?.header_text || [],
        body: bodyComponent?.example?.body_text?.[0] || [],
        total_count: (headerComponent?.example?.header_text?.length || 0) + 
                    (bodyComponent?.example?.body_text?.[0]?.length || 0)
      }
    };

    return NextResponse.json({
      success: true,
      template: templateDetails,
      source: 'whatsapp_api'
    });

  } catch (error) {
    console.error('❌ Error fetching template details:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch template details',
        details: error instanceof Error ? error.message : 'Unknown error',
        templateId
      },
      { status: 500 }
    );
  }
}
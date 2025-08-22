import { NextRequest, NextResponse } from 'next/server';

// WhatsApp Business API Configuration
const WHATSAPP_CONFIG = {
  PHONE_NUMBER_ID: '253011594562692',
  ACCESS_TOKEN: 'EAAP0tZBxzuAEBO7LpxLY7T2GpRs4XJmcQZCZC1y39oGZBxjwjsZAZAZAU6lZAs6CDAeMS1UZBbC8zwsBhjuJly1ZA7XVk1zmANRNwQ2OPriYz0QLxDKGemY24sQZCYDmP3Y4KanlvTKrBlN1Jbgq464pMUU4ZAd3pNBZAAwZBGLdPkbCC4Gpr3HZCZBKGjwIDbV0UIEIgJRqygZDZD',
  API_VERSION: 'v23.0',
};

interface SendMessageRequest {
  messagePayload: any;
  phone: string;
  campaignId?: string;
}

export async function POST(request: NextRequest) {
  console.log('🚀 WhatsApp API route called');
  
  try {
    const { messagePayload, phone, campaignId }: SendMessageRequest = await request.json();
    
    if (!messagePayload || !phone) {
      console.error('❌ Missing required fields:', { messagePayload: !!messagePayload, phone: !!phone });
      return NextResponse.json(
        { error: 'Missing required fields: messagePayload, phone' },
        { status: 400 }
      );
    }
    
    console.log('📤 Sending WhatsApp message:', {
      phone,
      template: messagePayload.template?.name || messagePayload.type,
      endpoint: `https://graph.facebook.com/${WHATSAPP_CONFIG.API_VERSION}/${WHATSAPP_CONFIG.PHONE_NUMBER_ID}/messages`
    });
    
    // Send message to WhatsApp Business API
    const response = await fetch(
      `https://graph.facebook.com/${WHATSAPP_CONFIG.API_VERSION}/${WHATSAPP_CONFIG.PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${WHATSAPP_CONFIG.ACCESS_TOKEN}`,
        },
        body: JSON.stringify(messagePayload),
      }
    );
    
    const responseData = await response.json();
    
    if (!response.ok) {
      console.error('❌ WhatsApp API error:', {
        status: response.status,
        statusText: response.statusText,
        error: responseData,
        phone
      });
      
      // Return detailed error information
      return NextResponse.json(
        {
          success: false,
          error: responseData.error?.message || `HTTP ${response.status}: ${response.statusText}`,
          details: responseData,
          phone,
          status: response.status
        },
        { status: 400 } // Return 400 to frontend instead of original error code
      );
    }
    
    const messageId = responseData.messages?.[0]?.id;
    
    console.log('✅ WhatsApp message sent successfully:', {
      phone,
      messageId,
      waId: responseData.messages?.[0]?.wa_id,
      campaignId
    });

    // Store message-to-campaign mapping for webhook tracking
    if (campaignId && messageId) {
      // In a real application, store this in a database
      // For now, we'll use the conversations API to track it
      try {
        await fetch(`${request.nextUrl.origin}/api/whatsapp/conversations`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone,
            campaignId,
            messageId,
            content: `Campaign message sent`,
            type: 'outgoing',
            status: 'sent'
          })
        });
      } catch (error) {
        console.error('❌ Error storing campaign tracking:', error);
      }
    }
    
    return NextResponse.json({
      success: true,
      messageId,
      whatsapp_id: responseData.messages?.[0]?.wa_id,
      phone,
      campaignId,
      response: responseData
    });
    
  } catch (error) {
    console.error('❌ Server error in WhatsApp API route:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Add a GET method for testing the endpoint
export async function GET() {
  return NextResponse.json({
    status: 'WhatsApp API endpoint is running',
    config: {
      phoneNumberId: WHATSAPP_CONFIG.PHONE_NUMBER_ID,
      apiVersion: WHATSAPP_CONFIG.API_VERSION,
      hasToken: !!WHATSAPP_CONFIG.ACCESS_TOKEN
    },
    timestamp: new Date().toISOString()
  });
}
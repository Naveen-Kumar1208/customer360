import { NextResponse } from 'next/server';

const WHATSAPP_CONFIG = {
  PHONE_NUMBER_ID: '253011594562692',
  BUSINESS_ACCOUNT_ID: '274821882361683',
  ACCESS_TOKEN: 'EAAP0tZBxzuAEBO7LpxLY7T2GpRs4XJmcQZCZC1y39oGZBxjwjsZAZAZAU6lZAs6CDAeMS1UZBbC8zwsBhjuJly1ZA7XVk1zmANRNwQ2OPriYz0QLxDKGemY24sQZCYDmP3Y4KanlvTKrBlN1Jbgq464pMUU4ZAd3pNBZAAwZBGLdPkbCC4Gpr3HZCZBKGjwIDbV0UIEIgJRqygZDZD',
  API_VERSION: 'v23.0',
};

export async function GET() {
  console.log('🧪 Testing WhatsApp Templates API');
  
  try {
    // Test API connectivity and credentials
    const testUrl = `https://graph.facebook.com/${WHATSAPP_CONFIG.API_VERSION}/${WHATSAPP_CONFIG.PHONE_NUMBER_ID}`;
    
    console.log('🔍 Testing API endpoint:', testUrl);
    console.log('🔑 Using access token (length):', WHATSAPP_CONFIG.ACCESS_TOKEN.length);
    
    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_CONFIG.ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('📊 Test response status:', response.status, response.statusText);
    
    if (!response.ok) {
      const error = await response.json();
      console.error('❌ API test failed:', error);
      
      return NextResponse.json({
        success: false,
        test: 'connectivity',
        error: error.error?.message || `HTTP ${response.status}`,
        details: error,
        config: {
          phoneNumberId: WHATSAPP_CONFIG.PHONE_NUMBER_ID,
          apiVersion: WHATSAPP_CONFIG.API_VERSION,
          tokenPresent: !!WHATSAPP_CONFIG.ACCESS_TOKEN,
          tokenLength: WHATSAPP_CONFIG.ACCESS_TOKEN.length
        }
      });
    }

    const data = await response.json();
    console.log('✅ API test successful:', data);

    // Test templates endpoint directly with Business Account ID
    const templatesUrl = `https://graph.facebook.com/${WHATSAPP_CONFIG.API_VERSION}/${WHATSAPP_CONFIG.BUSINESS_ACCOUNT_ID}/message_templates?limit=10`;
    console.log('📋 Testing templates endpoint:', templatesUrl);
    
    const templatesResponse = await fetch(templatesUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_CONFIG.ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    const templatesData = templatesResponse.ok 
      ? await templatesResponse.json() 
      : { error: await templatesResponse.json() };

    return NextResponse.json({
      success: true,
      tests: {
        connectivity: {
          status: 'passed',
          phoneNumberInfo: data
        },
        templates: {
          status: templatesResponse.ok ? 'passed' : 'failed',
          statusCode: templatesResponse.status,
          data: templatesResponse.ok ? {
            total: templatesData.data?.length || 0,
            templates: templatesData.data?.map((t: any) => ({ 
              name: t.name, 
              status: t.status, 
              category: t.category 
            })) || []
          } : templatesData.error
        }
      },
      config: {
        phoneNumberId: WHATSAPP_CONFIG.PHONE_NUMBER_ID,
        businessAccountId: WHATSAPP_CONFIG.BUSINESS_ACCOUNT_ID,
        apiVersion: WHATSAPP_CONFIG.API_VERSION,
        tokenPresent: !!WHATSAPP_CONFIG.ACCESS_TOKEN,
        endpoint: templatesUrl
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Test failed with error:', error);
    
    return NextResponse.json({
      success: false,
      test: 'network',
      error: error instanceof Error ? error.message : 'Unknown error',
      config: {
        phoneNumberId: WHATSAPP_CONFIG.PHONE_NUMBER_ID,
        apiVersion: WHATSAPP_CONFIG.API_VERSION,
        tokenPresent: !!WHATSAPP_CONFIG.ACCESS_TOKEN
      }
    }, { status: 500 });
  }
}
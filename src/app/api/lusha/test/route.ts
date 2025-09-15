import { type NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const LUSHA_API_BASE_URL = 'https://api.lusha.com';
const LUSHA_API_KEY = 'ee0f1129-46b7-4e21-bc0f-49de9fb1b021';

export async function GET(request: NextRequest) {
  try {
    // Test with a simple person enrichment request
    const testPayload = {
      data: [{
        email: 'test@example.com'
      }],
      metadata: {
        refreshJobInfo: true
      }
    };

    const response = await fetch(`${LUSHA_API_BASE_URL}/v2/person`, {
      method: 'POST',
      headers: {
        'api_key': LUSHA_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(testPayload)
    });

    const responseText = await response.text();
    
    return NextResponse.json({
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseText,
      apiKey: LUSHA_API_KEY.substring(0, 8) + '...',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Lusha API test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
}
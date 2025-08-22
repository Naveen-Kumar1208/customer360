import { type NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';

const LUSHA_API_BASE_URL = 'https://api.lusha.com';
const LUSHA_API_KEY = process.env.LUSHA_API_KEY || 'your-real-lusha-api-key-here';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Debug: Check if API key is properly configured
    if (!LUSHA_API_KEY || LUSHA_API_KEY === 'your-real-lusha-api-key-here') {
      console.error('Lusha API key not configured properly');
      return NextResponse.json(
        { 
          error: 'Lusha API key not configured. Please set LUSHA_API_KEY environment variable.',
          debug: 'The API key is either missing or set to the default placeholder value.'
        },
        { status: 500 }
      );
    }

    console.log('Lusha API call - Endpoint:', `${LUSHA_API_BASE_URL}/v2/person`);
    console.log('Lusha API call - Request body:', JSON.stringify(body, null, 2));
    console.log('Lusha API call - API key length:', LUSHA_API_KEY.length);
    console.log('Lusha API call - API key first 8 chars:', LUSHA_API_KEY.substring(0, 8) + '...');
    
    const response = await fetch(`${LUSHA_API_BASE_URL}/v2/person`, {
      method: 'POST',
      headers: {
        'api_key': LUSHA_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lusha API Error:', response.status, errorText);
      return NextResponse.json(
        { error: `Lusha API Error: ${response.status} - ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Person API proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
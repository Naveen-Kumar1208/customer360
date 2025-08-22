import { type NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';

const LUSHA_API_BASE_URL = 'https://api.lusha.com';
const LUSHA_API_KEY = process.env.LUSHA_API_KEY || 'your-real-lusha-api-key-here';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${LUSHA_API_BASE_URL}/company`, {
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
      console.error('Lusha Company API Error:', response.status, errorText);
      return NextResponse.json(
        { error: `Lusha API Error: ${response.status} - ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Company API proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
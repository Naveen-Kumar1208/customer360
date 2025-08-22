import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';

const LUSHA_API_KEY = process.env.LUSHA_API_KEY || 'your-real-lusha-api-key-here';

export async function GET() {
  try {
    const isConfigured = LUSHA_API_KEY && LUSHA_API_KEY !== 'your-real-lusha-api-key-here';
    
    return NextResponse.json({
      configured: isConfigured,
      hasApiKey: !!LUSHA_API_KEY,
      keyLength: isConfigured ? LUSHA_API_KEY.length : 0,
      keyPreview: isConfigured ? `${LUSHA_API_KEY.substring(0, 8)}...` : 'Not configured',
      message: isConfigured 
        ? 'Lusha API key is properly configured.' 
        : 'Lusha API key is not configured. Please set the LUSHA_API_KEY environment variable.',
      instructions: {
        development: 'Add LUSHA_API_KEY=your_api_key to your .env.local file',
        production: 'Set LUSHA_API_KEY environment variable in your hosting platform'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to check API configuration',
        configured: false 
      },
      { status: 500 }
    );
  }
}
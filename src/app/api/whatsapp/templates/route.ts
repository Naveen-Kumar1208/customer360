import { NextRequest, NextResponse } from 'next/server';

const WHATSAPP_CONFIG = {
  PHONE_NUMBER_ID: '253011594562692',
  BUSINESS_ACCOUNT_ID: '274821882361683',
  ACCESS_TOKEN: 'EAAP0tZBxzuAEBO7LpxLY7T2GpRs4XJmcQZCZC1y39oGZBxjwjsZAZAZAU6lZAs6CDAeMS1UZBbC8zwsBhjuJly1ZA7XVk1zmANRNwQ2OPriYz0QLxDKGemY24sQZCYDmP3Y4KanlvTKrBlN1Jbgq464pMUU4ZAd3pNBZAAwZBGLdPkbCC4Gpr3HZCZBKGjwIDbV0UIEIgJRqygZDZD',
  API_VERSION: 'v23.0',
};

export async function GET(request: NextRequest) {
  console.log('📋 Fetching WhatsApp templates from Meta API');
  
  // Extract pagination parameters from URL
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const after = searchParams.get('after') || '';
  const before = searchParams.get('before') || '';
  
  console.log('📄 Pagination params:', { page, limit, after, before });
  console.log('🔧 Config:', {
    phoneNumberId: WHATSAPP_CONFIG.PHONE_NUMBER_ID,
    businessAccountId: WHATSAPP_CONFIG.BUSINESS_ACCOUNT_ID,
    apiVersion: WHATSAPP_CONFIG.API_VERSION,
    hasToken: !!WHATSAPP_CONFIG.ACCESS_TOKEN,
    tokenLength: WHATSAPP_CONFIG.ACCESS_TOKEN?.length
  });
  
  try {
    // Build API URL with pagination
    let templatesUrl = `https://graph.facebook.com/${WHATSAPP_CONFIG.API_VERSION}/${WHATSAPP_CONFIG.BUSINESS_ACCOUNT_ID}/message_templates?limit=${limit}&fields=name,status,category,language,components,quality_rating,rejected_reason`;
    
    // Add cursor-based pagination if provided
    if (after) {
      templatesUrl += `&after=${after}`;
    } else if (before) {
      templatesUrl += `&before=${before}`;
    }
    
    console.log('🌐 Templates API URL:', templatesUrl);
    
    // Fetch approved templates from Meta WhatsApp Business API
    const response = await fetch(templatesUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_CONFIG.ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('📡 Templates response status:', response.status, response.statusText);

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ WhatsApp Templates API error:', {
        status: response.status,
        statusText: response.statusText,
        error: error,
        headers: response.headers
      });
      
      // Return error response instead of fallback to help debug
      return NextResponse.json({
        success: false,
        templates: [],
        source: 'whatsapp_api_error',
        error: error.error?.message || `HTTP ${response.status}: ${response.statusText}`,
        details: error,
        debug: {
          phoneNumberId: WHATSAPP_CONFIG.PHONE_NUMBER_ID,
          apiVersion: WHATSAPP_CONFIG.API_VERSION,
          hasToken: !!WHATSAPP_CONFIG.ACCESS_TOKEN
        }
      }, { status: response.status });
    }

    const data = await response.json();
    console.log('✅ Raw API response:', JSON.stringify(data, null, 2));
    console.log('📊 Templates found:', { 
      total: data.data?.length || 0,
      templates: data.data?.map((t: any) => ({ name: t.name, status: t.status, category: t.category })) || []
    });
    
    // Get all templates (not just approved) for debugging
    const allTemplates = data.data || [];
    
    // Filter approved templates
    const approvedTemplates = allTemplates.filter((template: any) => 
      template.status === 'APPROVED'
    );
    
    console.log('🎯 Approved templates:', { 
      count: approvedTemplates.length,
      names: approvedTemplates.map((t: any) => t.name)
    });

    // Format templates for frontend with enhanced debugging
    const formattedTemplates = approvedTemplates.map((template: any) => {
      const bodyComponent = template.components?.find((comp: any) => comp.type === 'BODY');
      const headerComponent = template.components?.find((comp: any) => comp.type === 'HEADER');
      const buttonComponents = template.components?.filter((comp: any) => comp.type === 'BUTTONS') || [];
      
      const formatted = {
        id: template.name,
        name: template.name,
        category: template.category,
        language: template.language,
        status: template.status,
        quality_rating: template.quality_rating,
        content: bodyComponent?.text || '',
        header: headerComponent ? {
          type: headerComponent.format || 'TEXT',
          content: headerComponent.text || ''
        } : undefined,
        buttons: buttonComponents.length > 0 ? buttonComponents[0].buttons : undefined,
        // Add raw components for debugging
        components: template.components,
        // Add example parameters
        parameters: bodyComponent?.example?.body_text?.[0] || []
      };
      
      console.log(`📝 Formatted template "${template.name}":`, JSON.stringify(formatted, null, 2));
      return formatted;
    });

    // Extract pagination info from Facebook's response
    const paging = data.paging || {};
    const hasNext = !!paging.next;
    const hasPrevious = !!paging.previous;
    const nextCursor = paging.cursors?.after || null;
    const previousCursor = paging.cursors?.before || null;

    const response_data = {
      success: true,
      templates: formattedTemplates,
      source: 'whatsapp_api',
      pagination: {
        currentPage: page,
        limit: limit,
        total: formattedTemplates.length,
        hasNext: hasNext,
        hasPrevious: hasPrevious,
        nextCursor: nextCursor,
        previousCursor: previousCursor,
        nextPage: hasNext ? page + 1 : null,
        previousPage: hasPrevious && page > 1 ? page - 1 : null
      },
      debug: {
        totalFromAPI: allTemplates.length,
        approvedCount: approvedTemplates.length,
        allStatuses: [...new Set(allTemplates.map((t: any) => t.status))],
        phoneNumberId: WHATSAPP_CONFIG.PHONE_NUMBER_ID,
        paging: paging
      }
    };

    console.log('🚀 Final response with pagination:', JSON.stringify(response_data, null, 2));
    return NextResponse.json(response_data);

  } catch (error) {
    console.error('❌ Network/parsing error:', error);
    
    return NextResponse.json({
      success: false,
      templates: [],
      source: 'network_error',
      error: error instanceof Error ? error.message : 'Unknown network error',
      debug: {
        phoneNumberId: WHATSAPP_CONFIG.PHONE_NUMBER_ID,
        apiVersion: WHATSAPP_CONFIG.API_VERSION,
        hasToken: !!WHATSAPP_CONFIG.ACCESS_TOKEN
      }
    }, { status: 500 });
  }
}
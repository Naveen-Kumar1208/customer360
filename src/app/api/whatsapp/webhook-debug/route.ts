import { NextRequest, NextResponse } from 'next/server';

// Import webhook stats from the main webhook route
async function getWebhookStats() {
  try {
    // Get webhook stats by making an internal request
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/whatsapp/webhook/stats`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching webhook stats:', error);
  }
  
  // Fallback stats
  return {
    received: 0,
    processed: 0,
    failed: 0,
    lastReceived: null,
    lastError: null,
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  };
}

// Debug endpoint to check webhook configuration and recent activity
export async function GET() {
  try {
    const webhookStats = await getWebhookStats();
    
    const debugInfo = {
      timestamp: new Date().toISOString(),
      status: {
        overall: webhookStats.received > 0 ? 'Active' : 'Waiting for webhooks',
        lastActivity: webhookStats.lastReceived || 'Never',
        health: webhookStats.failed === 0 ? 'Healthy' : 'Has errors'
      },
      webhookConfig: {
        endpoint: '/api/whatsapp/webhook',
        verifyToken: process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN ? 'Configured ✅' : 'Not configured ❌',
        appSecret: process.env.WHATSAPP_APP_SECRET ? 'Configured ✅' : 'Not configured ⚠️',
        accessToken: process.env.WHATSAPP_ACCESS_TOKEN ? 'Configured ✅' : 'Not configured ❌',
        phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || 'Not configured ❌',
        environment: process.env.NODE_ENV || 'development'
      },
      statistics: {
        totalReceived: webhookStats.received,
        totalProcessed: webhookStats.processed,
        totalFailed: webhookStats.failed,
        successRate: webhookStats.received > 0 ? Math.round((webhookStats.processed / webhookStats.received) * 100) : 0,
        lastError: webhookStats.lastError,
        uptime: `${Math.round(webhookStats.uptime / 60)} minutes`
      },
      instructions: {
        setupSteps: [
          '1. Go to WhatsApp Business API dashboard',
          '2. Navigate to Configuration > Webhooks',
          '3. Set webhook URL to: https://your-domain.com/api/whatsapp/webhook',
          '4. Set verify token in environment variable: WHATSAPP_WEBHOOK_VERIFY_TOKEN',
          '5. Subscribe to "messages" webhook field',
          '6. Test with a message to see delivery reports'
        ],
        testingAlternative: [
          'Use the "Test Status Updates" button in analytics to simulate delivery reports',
          'This bypasses webhook requirements and directly updates campaign status'
        ]
      },
      commonIssues: [
        'Webhook URL not accessible from internet (use ngrok for local testing)',
        'Verify token mismatch between WhatsApp config and environment variable',
        'Webhook not subscribed to "messages" field in WhatsApp dashboard',
        'Firewall blocking incoming webhook requests'
      ]
    };

    return NextResponse.json(debugInfo);

  } catch (error) {
    console.error('❌ Error in webhook debug:', error);
    return NextResponse.json(
      { error: 'Failed to get debug info' },
      { status: 500 }
    );
  }
}

// Test webhook endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('🧪 Webhook debug test received:', JSON.stringify(body, null, 2));
    
    // Simulate processing a delivery report
    if (body.testMessageId && body.testPhone && body.testStatus) {
      const { testMessageId, testPhone, testStatus } = body;
      
      // Call our delivery simulation endpoint
      const simulateResponse = await fetch(`${request.nextUrl.origin}/api/whatsapp/simulate-delivery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messageId: testMessageId,
          phone: testPhone,
          status: testStatus
        }),
      });

      if (simulateResponse.ok) {
        return NextResponse.json({
          success: true,
          message: `Test delivery status ${testStatus} processed for ${testPhone}`,
          simulationResult: await simulateResponse.json()
        });
      } else {
        throw new Error('Failed to process test delivery status');
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook debug endpoint received request',
      receivedData: body
    });

  } catch (error) {
    console.error('❌ Error processing webhook debug test:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook test' },
      { status: 500 }
    );
  }
}
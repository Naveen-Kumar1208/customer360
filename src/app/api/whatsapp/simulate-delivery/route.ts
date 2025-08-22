import { NextRequest, NextResponse } from 'next/server';

// Simulate delivery status updates for testing
export async function POST(request: NextRequest) {
  try {
    const { messageId, phone, status } = await request.json();

    if (!messageId || !phone || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: messageId, phone, status' },
        { status: 400 }
      );
    }

    console.log('🧪 Simulating delivery status update:', { messageId, phone, status });

    // Simulate webhook payload format
    const simulatedWebhookPayload = {
      object: 'whatsapp_business_account',
      entry: [
        {
          id: '253011594562692',
          changes: [
            {
              field: 'messages',
              value: {
                statuses: [
                  {
                    id: messageId,
                    recipient_id: phone,
                    status: status,
                    timestamp: Math.floor(Date.now() / 1000).toString()
                  }
                ]
              }
            }
          ]
        }
      ]
    };

    // Call the webhook processor directly
    const webhookResponse = await fetch(`${request.nextUrl.origin}/api/whatsapp/webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(simulatedWebhookPayload),
    });

    if (webhookResponse.ok) {
      console.log('✅ Simulated delivery status processed successfully');
      return NextResponse.json({
        success: true,
        message: `Simulated ${status} status for ${phone}`,
        messageId,
        phone,
        status
      });
    } else {
      throw new Error(`Webhook processing failed: ${webhookResponse.statusText}`);
    }

  } catch (error) {
    console.error('❌ Error simulating delivery status:', error);
    return NextResponse.json(
      { error: 'Failed to simulate delivery status' },
      { status: 500 }
    );
  }
}

// GET - List recent messages for testing
export async function GET() {
  try {
    // Load campaigns to get recent message IDs
    const campaignsResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/whatsapp/campaigns`);
    
    if (!campaignsResponse.ok) {
      throw new Error('Failed to load campaigns');
    }

    const campaignsData = await campaignsResponse.json();
    const recentMessages: Array<{
      messageId: string;
      phone: string;
      campaignId: string;
      campaignName: string;
      status: string;
    }> = [];

    // Extract recent messages from campaigns
    campaignsData.campaigns?.forEach((campaign: any) => {
      campaign.contacts?.forEach((contact: any) => {
        if (contact.messageId) {
          recentMessages.push({
            messageId: contact.messageId,
            phone: contact.phone,
            campaignId: campaign.id,
            campaignName: campaign.name,
            status: contact.status
          });
        }
      });
    });

    // Sort by most recent (assuming messageId contains timestamp)
    recentMessages.sort((a, b) => b.messageId.localeCompare(a.messageId));

    return NextResponse.json({
      success: true,
      recentMessages: recentMessages.slice(0, 20), // Last 20 messages
      instructions: {
        usage: 'POST to /api/whatsapp/simulate-delivery with { messageId, phone, status }',
        validStatuses: ['sent', 'delivered', 'read', 'failed'],
        example: {
          messageId: recentMessages[0]?.messageId || 'msg_example_123',
          phone: recentMessages[0]?.phone || '919788288496',
          status: 'delivered'
        }
      }
    });

  } catch (error) {
    console.error('❌ Error getting recent messages:', error);
    return NextResponse.json(
      { error: 'Failed to get recent messages' },
      { status: 500 }
    );
  }
}
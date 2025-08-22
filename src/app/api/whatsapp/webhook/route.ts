import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Webhook statistics for monitoring
const webhookStats = {
  received: 0,
  processed: 0,
  failed: 0,
  lastReceived: null as string | null,
  lastError: null as string | null
};

// WhatsApp webhook endpoint for delivery reports and incoming messages
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  webhookStats.received++;
  webhookStats.lastReceived = new Date().toISOString();
  
  console.log('📨 WhatsApp webhook received', {
    timestamp: webhookStats.lastReceived,
    totalReceived: webhookStats.received
  });
  
  try {
    // Get raw body for signature verification
    const rawBody = await request.text();
    let body;
    
    try {
      body = JSON.parse(rawBody);
    } catch (parseError) {
      console.error('❌ Invalid JSON in webhook payload:', parseError);
      webhookStats.failed++;
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }
    
    console.log('📨 Webhook payload:', JSON.stringify(body, null, 2));

    // Verify webhook signature in production
    if (process.env.NODE_ENV === 'production' && process.env.WHATSAPP_APP_SECRET) {
      const signature = request.headers.get('x-hub-signature-256');
      if (!signature || !verifyWebhookSignature(rawBody, signature)) {
        console.error('❌ Webhook signature verification failed');
        webhookStats.failed++;
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 403 }
        );
      }
    }
    
    // Verify webhook signature (in production, verify the webhook signature)
    const hubChallenge = request.nextUrl.searchParams.get('hub.challenge');
    const hubVerifyToken = request.nextUrl.searchParams.get('hub.verify_token');
    
    if (hubChallenge && hubVerifyToken) {
      // Webhook verification
      const expectedToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || 'your_verify_token';
      if (hubVerifyToken === expectedToken) {
        console.log('✅ Webhook verification successful');
        return new NextResponse(hubChallenge, { status: 200 });
      } else {
        console.log('❌ Webhook verification failed');
        return NextResponse.json({ error: 'Invalid verify token' }, { status: 403 });
      }
    }

    // Process webhook events
    if (body.object === 'whatsapp_business_account') {
      let processedEvents = 0;
      for (const entry of body.entry || []) {
        for (const change of entry.changes || []) {
          if (change.field === 'messages') {
            await processMessageEvents(change.value);
            processedEvents++;
          }
        }
      }
      
      if (processedEvents > 0) {
        webhookStats.processed++;
        console.log(`✅ Processed ${processedEvents} webhook events successfully`);
      } else {
        console.log('ℹ️ No relevant webhook events to process');
      }
    } else {
      console.log('ℹ️ Non-WhatsApp webhook event received:', body.object);
    }

    const processingTime = Date.now() - startTime;
    console.log(`🕐 Webhook processing completed in ${processingTime}ms`);

    return NextResponse.json({ 
      success: true,
      processingTime,
      stats: {
        received: webhookStats.received,
        processed: webhookStats.processed,
        failed: webhookStats.failed
      }
    }, { status: 200 });
    
  } catch (error) {
    webhookStats.failed++;
    webhookStats.lastError = error instanceof Error ? error.message : 'Unknown error';
    
    console.error('❌ Webhook processing error:', {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      totalFailed: webhookStats.failed
    });
    
    return NextResponse.json(
      { 
        error: 'Webhook processing failed',
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    );
  }
}

// Verify webhook signature for security
function verifyWebhookSignature(body: string, signature: string): boolean {
  try {
    const appSecret = process.env.WHATSAPP_APP_SECRET;
    if (!appSecret) {
      console.warn('⚠️ WHATSAPP_APP_SECRET not configured, skipping signature verification');
      return true; // Skip verification if secret not configured
    }

    const expectedSignature = crypto
      .createHmac('sha256', appSecret)
      .update(body, 'utf8')
      .digest('hex');
    
    const receivedSignature = signature.replace('sha256=', '');
    
    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'hex'),
      Buffer.from(receivedSignature, 'hex')
    );
  } catch (error) {
    console.error('❌ Signature verification error:', error);
    return false;
  }
}

// GET endpoint for webhook verification
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  console.log('🔍 Webhook verification request:', { mode, token, challenge });

  // Verify the webhook
  const expectedToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || 'your_verify_token';
  
  if (mode === 'subscribe' && token === expectedToken) {
    console.log('✅ Webhook verified successfully');
    return new NextResponse(challenge, { status: 200 });
  } else {
    console.log('❌ Webhook verification failed');
    return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
  }
}

// Process different types of message events
async function processMessageEvents(messageData: any) {
  console.log('📱 Processing message events:', messageData);

  // Process status updates (delivery reports)
  if (messageData.statuses) {
    for (const status of messageData.statuses) {
      await processDeliveryStatus(status);
    }
  }

  // Process incoming messages (conversation tracking)
  if (messageData.messages) {
    for (const message of messageData.messages) {
      await processIncomingMessage(message);
    }
  }
}

// Process delivery status updates (sent → delivered → read)
async function processDeliveryStatus(status: any) {
  const { id: messageId, recipient_id: phone, status: deliveryStatus, timestamp } = status;
  
  console.log(`📊 Delivery status update:`, {
    messageId,
    phone,
    status: deliveryStatus,
    timestamp: new Date(parseInt(timestamp) * 1000).toISOString()
  });

  // Here you would typically update your database
  // For now, we'll simulate database updates with console logs
  
  switch (deliveryStatus) {
    case 'sent':
      console.log(`✅ Message ${messageId} confirmed sent to ${phone}`);
      await updateContactStatus(phone, messageId, 'sent', new Date(parseInt(timestamp) * 1000).toISOString());
      break;
      
    case 'delivered':
      console.log(`📨 Message ${messageId} delivered to ${phone}`);
      await updateContactStatus(phone, messageId, 'delivered', new Date(parseInt(timestamp) * 1000).toISOString());
      break;
      
    case 'read':
      console.log(`👁️ Message ${messageId} read by ${phone}`);
      await updateContactStatus(phone, messageId, 'read', new Date(parseInt(timestamp) * 1000).toISOString());
      break;
      
    case 'failed':
      console.log(`❌ Message ${messageId} failed for ${phone}`);
      await updateContactStatus(phone, messageId, 'failed', new Date(parseInt(timestamp) * 1000).toISOString(), status.errors?.[0]?.title);
      break;
      
    default:
      console.log(`ℹ️ Unknown status ${deliveryStatus} for message ${messageId}`);
  }
}

// Process incoming messages for conversation tracking
async function processIncomingMessage(message: any) {
  const { id: messageId, from: phone, timestamp, text, type } = message;
  
  console.log(`💬 Incoming message:`, {
    messageId,
    phone,
    type,
    timestamp: new Date(parseInt(timestamp) * 1000).toISOString(),
    content: text?.body || 'Non-text message'
  });

  // Track conversation for analytics
  await trackConversation({
    messageId,
    phone,
    type,
    content: text?.body || `${type} message`,
    timestamp: new Date(parseInt(timestamp) * 1000).toISOString(),
    direction: 'incoming'
  });

  // Check for click tracking (if message contains URLs)
  if (text?.body && containsURL(text.body)) {
    console.log(`🔗 Click detected from ${phone}`);
    await trackClick(phone, messageId);
  }
}

// Update contact status in campaigns database
async function updateContactStatus(
  phone: string, 
  messageId: string, 
  status: 'sent' | 'delivered' | 'read' | 'failed',
  timestamp: string,
  errorMessage?: string
) {
  try {
    const updateData = {
      phone,
      messageId,
      status,
      timestamp,
      errorMessage,
      updatedAt: new Date().toISOString()
    };

    console.log(`🔄 Contact status updated:`, updateData);
    
    // Update conversation tracking
    await fetch('/api/whatsapp/conversations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone,
        messageId,
        content: `Status update: ${status}`,
        type: 'outgoing',
        status
      })
    });

    // Find and update campaign contact status
    try {
      const response = await fetch('/api/whatsapp/campaigns/update-contact-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageId,
          phone,
          status,
          timestamp,
          errorMessage
        })
      });

      if (response.ok) {
        console.log(`✅ Campaign contact status updated for ${phone}: ${status}`);
      } else {
        console.warn(`⚠️ Could not update campaign contact status for ${phone}`);
      }
    } catch (error) {
      console.error('❌ Error updating campaign contact status:', error);
    }
    
  } catch (error) {
    console.error('❌ Error updating contact status:', error);
  }
}

// Track conversation for analytics
async function trackConversation(conversationData: {
  messageId: string;
  phone: string;
  type: string;
  content: string;
  timestamp: string;
  direction: 'incoming' | 'outgoing';
}) {
  console.log(`💭 Conversation tracked:`, conversationData);
  
  // Store conversation data for analytics
  // In production, this would go to your conversation database
}

// Track clicks for CTR calculation
async function trackClick(phone: string, messageId: string) {
  console.log(`📈 Click tracked for ${phone} on message ${messageId}`);
  
  // Update click analytics
  // In production, this would increment click counters in your analytics database
}

// Utility function to detect URLs in message content
function containsURL(text: string): boolean {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return urlRegex.test(text);
}

// GET webhook statistics endpoint
export async function getWebhookStats() {
  return {
    ...webhookStats,
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    webhookUrl: '/api/whatsapp/webhook',
    lastUpdated: new Date().toISOString()
  };
}

// Export webhook stats for monitoring
export { webhookStats };

// Get delivery status for a specific campaign (utility endpoint)
export async function getDeliveryReport(campaignId: string) {
  // This would typically query your database for delivery statistics
  // For now, return a mock response
  
  return {
    campaignId,
    totalSent: 100,
    delivered: 95,
    read: 78,
    failed: 5,
    clicks: 23,
    deliveryRate: 95,
    readRate: 82,
    ctr: 23,
    lastUpdated: new Date().toISOString(),
    webhookStats: await getWebhookStats()
  };
}
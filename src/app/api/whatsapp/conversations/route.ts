import { NextRequest, NextResponse } from 'next/server';

interface Conversation {
  id: string;
  phone: string;
  campaignId?: string;
  messages: Array<{
    id: string;
    content: string;
    type: 'outgoing' | 'incoming';
    timestamp: string;
    status?: 'sent' | 'delivered' | 'read' | 'failed';
  }>;
  lastActivity: string;
  isActive: boolean;
}

// In-memory store for conversations (in production, use a database)
const conversations = new Map<string, Conversation>();

// GET - Retrieve conversations for a campaign or phone number
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const campaignId = searchParams.get('campaignId');
  const phone = searchParams.get('phone');
  const active = searchParams.get('active') === 'true';

  try {
    let filteredConversations = Array.from(conversations.values());

    // Filter by campaign ID
    if (campaignId) {
      filteredConversations = filteredConversations.filter(c => c.campaignId === campaignId);
    }

    // Filter by phone number
    if (phone) {
      filteredConversations = filteredConversations.filter(c => c.phone === phone);
    }

    // Filter by active status
    if (active) {
      filteredConversations = filteredConversations.filter(c => c.isActive);
    }

    // Sort by last activity
    filteredConversations.sort((a, b) => 
      new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
    );

    return NextResponse.json({
      success: true,
      conversations: filteredConversations,
      total: filteredConversations.length
    });

  } catch (error) {
    console.error('❌ Error retrieving conversations:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve conversations' },
      { status: 500 }
    );
  }
}

// POST - Add a new conversation or message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, campaignId, messageId, content, type, status } = body;

    if (!phone || !messageId || !content || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: phone, messageId, content, type' },
        { status: 400 }
      );
    }

    const conversationKey = `${phone}_${campaignId || 'direct'}`;
    const now = new Date().toISOString();

    let conversation = conversations.get(conversationKey);

    if (!conversation) {
      // Create new conversation
      conversation = {
        id: conversationKey,
        phone,
        campaignId,
        messages: [],
        lastActivity: now,
        isActive: true
      };
    }

    // Add message to conversation
    conversation.messages.push({
      id: messageId,
      content,
      type,
      timestamp: now,
      status
    });

    conversation.lastActivity = now;
    conversation.isActive = true;

    conversations.set(conversationKey, conversation);

    console.log(`💬 Conversation updated for ${phone}:`, {
      conversationId: conversationKey,
      messageCount: conversation.messages.length,
      lastMessage: content.substring(0, 50)
    });

    return NextResponse.json({
      success: true,
      conversation,
      messageCount: conversation.messages.length
    });

  } catch (error) {
    console.error('❌ Error updating conversation:', error);
    return NextResponse.json(
      { error: 'Failed to update conversation' },
      { status: 500 }
    );
  }
}

// PUT - Update conversation status or message status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, campaignId, messageId, status, isActive } = body;

    const conversationKey = `${phone}_${campaignId || 'direct'}`;
    const conversation = conversations.get(conversationKey);

    if (!conversation) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      );
    }

    // Update message status if messageId provided
    if (messageId && status) {
      const message = conversation.messages.find(m => m.id === messageId);
      if (message) {
        message.status = status;
        console.log(`📊 Message status updated: ${messageId} → ${status}`);
      }
    }

    // Update conversation active status
    if (typeof isActive === 'boolean') {
      conversation.isActive = isActive;
    }

    conversation.lastActivity = new Date().toISOString();
    conversations.set(conversationKey, conversation);

    return NextResponse.json({
      success: true,
      conversation
    });

  } catch (error) {
    console.error('❌ Error updating conversation status:', error);
    return NextResponse.json(
      { error: 'Failed to update conversation status' },
      { status: 500 }
    );
  }
}

// GET conversation analytics
export async function getConversationAnalytics(campaignId?: string) {
  try {
    let targetConversations = Array.from(conversations.values());

    if (campaignId) {
      targetConversations = targetConversations.filter(c => c.campaignId === campaignId);
    }

    const analytics = {
      totalConversations: targetConversations.length,
      activeConversations: targetConversations.filter(c => c.isActive).length,
      totalMessages: targetConversations.reduce((sum, c) => sum + c.messages.length, 0),
      incomingMessages: targetConversations.reduce((sum, c) => 
        sum + c.messages.filter(m => m.type === 'incoming').length, 0
      ),
      outgoingMessages: targetConversations.reduce((sum, c) => 
        sum + c.messages.filter(m => m.type === 'outgoing').length, 0
      ),
      responseRate: 0,
      avgResponseTime: 0
    };

    // Calculate response rate
    const conversationsWithReplies = targetConversations.filter(c => 
      c.messages.some(m => m.type === 'incoming')
    );
    analytics.responseRate = targetConversations.length > 0 
      ? Math.round((conversationsWithReplies.length / targetConversations.length) * 100)
      : 0;

    return analytics;

  } catch (error) {
    console.error('❌ Error calculating conversation analytics:', error);
    return null;
  }
}
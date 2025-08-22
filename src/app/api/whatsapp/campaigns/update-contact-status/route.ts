import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Shared file-based storage 
const CAMPAIGNS_FILE = join(process.cwd(), 'campaigns-data.json');

// Load campaigns from file
function loadCampaigns(): Map<string, any> {
  const campaigns = new Map();
  try {
    if (existsSync(CAMPAIGNS_FILE)) {
      const data = readFileSync(CAMPAIGNS_FILE, 'utf-8');
      const campaignsArray = JSON.parse(data);
      campaignsArray.forEach((campaign: any) => {
        campaigns.set(campaign.id, campaign);
      });
    }
  } catch (error) {
    console.error('❌ Error loading campaigns from file:', error);
  }
  return campaigns;
}

// Save campaigns to file
function saveCampaigns(campaigns: Map<string, any>) {
  try {
    const campaignsArray = Array.from(campaigns.values());
    writeFileSync(CAMPAIGNS_FILE, JSON.stringify(campaignsArray, null, 2));
    console.log(`💾 Contact status update - saved ${campaignsArray.length} campaigns to file`);
  } catch (error) {
    console.error('❌ Error saving campaigns to file:', error);
  }
}

// Store message ID to campaign ID mapping
const messageIdToCampaignId = new Map<string, string>();

// POST - Update contact status in a campaign
export async function POST(request: NextRequest) {
  try {
    const { messageId, phone, status, timestamp, errorMessage } = await request.json();

    if (!messageId || !phone || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: messageId, phone, status' },
        { status: 400 }
      );
    }

    console.log('📊 Updating contact status:', { messageId, phone, status, timestamp });

    // Load campaigns from file
    const campaigns = loadCampaigns();

    // Try to find which campaign this message belongs to
    let campaignId = messageIdToCampaignId.get(messageId);
    
    if (!campaignId) {
      // Search through all campaigns to find the message
      for (const [id, campaign] of campaigns.entries()) {
        const contact = campaign.contacts?.find((c: any) => 
          (c.phone === phone && c.messageId === messageId) || 
          (c.phone === phone && !c.messageId) // For contacts without messageId yet
        );
        if (contact) {
          campaignId = id;
          messageIdToCampaignId.set(messageId, campaignId);
          break;
        }
      }
    }

    // If still not found, try to find by phone number only (for initial sent status)
    if (!campaignId) {
      for (const [id, campaign] of campaigns.entries()) {
        const contact = campaign.contacts?.find((c: any) => c.phone === phone);
        if (contact) {
          campaignId = id;
          messageIdToCampaignId.set(messageId, campaignId);
          console.log(`📝 Found campaign by phone number: ${campaignId} for ${phone}`);
          break;
        }
      }
    }

    if (!campaignId) {
      console.warn(`⚠️ No campaign found for messageId: ${messageId}, phone: ${phone}`);
      return NextResponse.json(
        { error: 'Campaign not found for this message' },
        { status: 404 }
      );
    }

    const campaign = campaigns.get(campaignId);
    if (!campaign) {
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      );
    }

    // Find and update the contact
    const contactIndex = campaign.contacts.findIndex((c: any) => c.phone === phone);
    if (contactIndex === -1) {
      console.warn(`⚠️ Contact not found in campaign: ${phone}`);
      return NextResponse.json(
        { error: 'Contact not found in campaign' },
        { status: 404 }
      );
    }

    const contact = campaign.contacts[contactIndex];
    const previousStatus = contact.status;

    // Update contact status and messageId
    contact.status = status;
    if (!contact.messageId) contact.messageId = messageId; // Set messageId if missing
    if (errorMessage) contact.errorMessage = errorMessage;

    // Update timestamps based on status
    switch (status) {
      case 'sent':
        contact.sentAt = timestamp || new Date().toISOString();
        break;
      case 'delivered':
        contact.deliveredAt = timestamp || new Date().toISOString();
        // Update campaign delivered count if transitioning from sent
        if (previousStatus === 'sent') {
          campaign.deliveredCount = (campaign.deliveredCount || 0) + 1;
        }
        break;
      case 'read':
        contact.readAt = timestamp || new Date().toISOString();
        // Update campaign read count if transitioning from delivered or sent
        if (previousStatus === 'delivered') {
          campaign.readCount = (campaign.readCount || 0) + 1;
        } else if (previousStatus === 'sent') {
          // Direct transition from sent to read (skipped delivered)
          campaign.deliveredCount = (campaign.deliveredCount || 0) + 1;
          campaign.readCount = (campaign.readCount || 0) + 1;
        }
        break;
      case 'failed':
        // Update campaign failed count if transitioning from sent
        if (previousStatus === 'sent') {
          campaign.failedCount = (campaign.failedCount || 0) + 1;
        }
        break;
    }

    // Save updated campaign
    campaigns.set(campaignId, campaign);
    saveCampaigns(campaigns); // Persist to file

    console.log(`✅ Contact status updated in campaign ${campaignId}:`, {
      phone,
      oldStatus: previousStatus,
      newStatus: status,
      campaignStats: {
        sent: campaign.sentCount,
        delivered: campaign.deliveredCount,
        read: campaign.readCount,
        failed: campaign.failedCount
      }
    });

    return NextResponse.json({
      success: true,
      campaignId,
      contact: {
        phone,
        status,
        previousStatus,
        sentAt: contact.sentAt,
        deliveredAt: contact.deliveredAt,
        readAt: contact.readAt,
        errorMessage: contact.errorMessage
      },
      campaignStats: {
        sent: campaign.sentCount,
        delivered: campaign.deliveredCount,
        read: campaign.readCount,
        failed: campaign.failedCount
      }
    });

  } catch (error) {
    console.error('❌ Error updating contact status:', error);
    return NextResponse.json(
      { error: 'Failed to update contact status' },
      { status: 500 }
    );
  }
}

// Helper function to register message ID to campaign mapping
export async function registerMessageMapping(messageId: string, campaignId: string) {
  messageIdToCampaignId.set(messageId, campaignId);
  console.log(`📝 Registered message mapping: ${messageId} → ${campaignId}`);
}

// GET - Get message to campaign mappings (for debugging)
export async function GET() {
  return NextResponse.json({
    mappings: Array.from(messageIdToCampaignId.entries()).map(([messageId, campaignId]) => ({
      messageId,
      campaignId
    })),
    totalMappings: messageIdToCampaignId.size
  });
}
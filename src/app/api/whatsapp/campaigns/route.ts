import { NextRequest, NextResponse } from 'next/server';

interface CampaignContact {
  phone: string;
  name?: string;
  status: 'sent' | 'delivered' | 'read' | 'failed' | 'duplicate';
  messageId?: string;
  sentAt?: string;
  deliveredAt?: string;
  readAt?: string;
  errorMessage?: string;
  retryCount?: number;
}

interface WhatsAppCampaign {
  id: string;
  name: string;
  templateName: string;
  status: 'completed' | 'running' | 'scheduled' | 'failed';
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  totalContacts: number;
  sentCount: number;
  deliveredCount: number;
  readCount: number;
  failedCount: number;
  duplicateCount: number;
  clickCount: number;
  ctr: number;
  estimatedCost: number;
  contacts: CampaignContact[];
}

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

// File-based storage for persistence (in production, use a database)
const CAMPAIGNS_FILE = join(process.cwd(), 'campaigns-data.json');

// In-memory storage with file persistence
const campaigns = new Map<string, WhatsAppCampaign>();

// Load existing campaigns from file
function loadCampaigns() {
  try {
    if (existsSync(CAMPAIGNS_FILE)) {
      const data = readFileSync(CAMPAIGNS_FILE, 'utf-8');
      const campaignsArray = JSON.parse(data);
      campaignsArray.forEach((campaign: WhatsAppCampaign) => {
        campaigns.set(campaign.id, campaign);
      });
      console.log(`📊 Loaded ${campaignsArray.length} campaigns from file`);
    } else {
      console.log('📊 No existing campaigns file found, starting fresh');
    }
  } catch (error) {
    console.error('❌ Error loading campaigns from file:', error);
  }
}

// Save campaigns to file
function saveCampaigns() {
  try {
    const campaignsArray = Array.from(campaigns.values());
    writeFileSync(CAMPAIGNS_FILE, JSON.stringify(campaignsArray, null, 2));
    console.log(`💾 Saved ${campaignsArray.length} campaigns to file`);
  } catch (error) {
    console.error('❌ Error saving campaigns to file:', error);
  }
}

// Initialize campaigns
loadCampaigns();

console.log(`📊 Campaign storage initialized with ${campaigns.size} campaigns`);

// GET - Retrieve all campaigns with optional filtering
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const limit = parseInt(searchParams.get('limit') || '50');
  const offset = parseInt(searchParams.get('offset') || '0');
  const search = searchParams.get('search');

  try {
    let campaignList = Array.from(campaigns.values());

    // Filter by status
    if (status && status !== 'all') {
      campaignList = campaignList.filter(campaign => campaign.status === status);
    }

    // Filter by search term (name, template, or ID)
    if (search) {
      const searchLower = search.toLowerCase();
      campaignList = campaignList.filter(campaign => 
        campaign.name.toLowerCase().includes(searchLower) ||
        campaign.templateName.toLowerCase().includes(searchLower) ||
        campaign.id.toLowerCase().includes(searchLower)
      );
    }

    // Sort by creation date (newest first)
    campaignList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Apply pagination
    const total = campaignList.length;
    const paginatedCampaigns = campaignList.slice(offset, offset + limit);

    console.log('📊 Campaigns retrieved:', {
      total,
      filtered: campaignList.length,
      returned: paginatedCampaigns.length,
      status,
      search,
      campaignDetails: paginatedCampaigns.map(c => ({
        id: c.id,
        name: c.name,
        totalContacts: c.totalContacts,
        status: c.status,
        contactsLength: c.contacts?.length || 0
      }))
    });

    return NextResponse.json({
      success: true,
      campaigns: paginatedCampaigns,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      },
      filters: {
        status,
        search
      }
    });

  } catch (error) {
    console.error('❌ Error retrieving campaigns:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve campaigns' },
      { status: 500 }
    );
  }
}

// POST - Create a new campaign record
export async function POST(request: NextRequest) {
  try {
    const campaignData = await request.json();
    
    const {
      id: providedId,
      name,
      templateName,
      totalContacts,
      estimatedCost,
      contacts = []
    } = campaignData;

    if (!name || !templateName || totalContacts === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: name, templateName, totalContacts' },
        { status: 400 }
      );
    }

    // Use provided ID or generate new one
    const campaignId = providedId || `camp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const newCampaign: WhatsAppCampaign = {
      id: campaignId,
      name,
      templateName,
      status: 'scheduled',
      createdAt: new Date().toISOString(),
      totalContacts,
      sentCount: 0,
      deliveredCount: 0,
      readCount: 0,
      failedCount: 0,
      duplicateCount: 0,
      clickCount: 0,
      ctr: 0,
      estimatedCost: estimatedCost || totalContacts * 0.05,
      contacts: contacts || []
    };

    campaigns.set(campaignId, newCampaign);
    saveCampaigns(); // Persist to file

    console.log('✅ Campaign created in API:', {
      campaignId,
      name,
      templateName,
      totalContacts,
      contactsLength: contacts.length,
      estimatedCost: newCampaign.estimatedCost
    });

    return NextResponse.json({
      success: true,
      campaign: newCampaign
    });

  } catch (error) {
    console.error('❌ Error creating campaign:', error);
    return NextResponse.json(
      { error: 'Failed to create campaign' },
      { status: 500 }
    );
  }
}

// PUT - Update campaign status and metrics
export async function PUT(request: NextRequest) {
  try {
    const updateData = await request.json();
    const { campaignId, status, metrics, contacts } = updateData;

    if (!campaignId) {
      return NextResponse.json(
        { error: 'Missing campaignId' },
        { status: 400 }
      );
    }

    const campaign = campaigns.get(campaignId);
    if (!campaign) {
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      );
    }

    // Update campaign status
    if (status) {
      campaign.status = status;
      
      if (status === 'running' && !campaign.startedAt) {
        campaign.startedAt = new Date().toISOString();
      }
      
      if (status === 'completed' && !campaign.completedAt) {
        campaign.completedAt = new Date().toISOString();
      }
    }

    // Update metrics if provided
    if (metrics) {
      Object.assign(campaign, metrics);
      
      // Recalculate CTR
      if (campaign.readCount > 0 && campaign.sentCount > 0) {
        campaign.ctr = (campaign.clickCount / campaign.readCount) * 100;
      }
    }

    // Update contacts if provided
    if (contacts) {
      campaign.contacts = contacts;
    }

    campaigns.set(campaignId, campaign);
    saveCampaigns(); // Persist to file

    console.log('📊 Campaign updated:', {
      campaignId,
      status: campaign.status,
      sent: campaign.sentCount,
      delivered: campaign.deliveredCount,
      read: campaign.readCount
    });

    return NextResponse.json({
      success: true,
      campaign
    });

  } catch (error) {
    console.error('❌ Error updating campaign:', error);
    return NextResponse.json(
      { error: 'Failed to update campaign' },
      { status: 500 }
    );
  }
}

// Helper function to get campaign by ID
export async function getCampaignById(campaignId: string): Promise<WhatsAppCampaign | null> {
  return campaigns.get(campaignId) || null;
}

// Helper function to update campaign contact status
export async function updateCampaignContactStatus(
  campaignId: string, 
  phone: string, 
  status: CampaignContact['status'],
  messageId?: string,
  timestamp?: string,
  errorMessage?: string
) {
  const campaign = campaigns.get(campaignId);
  if (!campaign) return false;

  const contactIndex = campaign.contacts.findIndex(c => c.phone === phone);
  if (contactIndex === -1) return false;

  const contact = campaign.contacts[contactIndex];
  contact.status = status;
  
  if (messageId) contact.messageId = messageId;
  if (errorMessage) contact.errorMessage = errorMessage;

  switch (status) {
    case 'sent':
      contact.sentAt = timestamp || new Date().toISOString();
      campaign.sentCount++;
      break;
    case 'delivered':
      contact.deliveredAt = timestamp || new Date().toISOString();
      campaign.deliveredCount++;
      break;
    case 'read':
      contact.readAt = timestamp || new Date().toISOString();
      campaign.readCount++;
      break;
    case 'failed':
      campaign.failedCount++;
      break;
  }

  campaigns.set(campaignId, campaign);
  return true;
}
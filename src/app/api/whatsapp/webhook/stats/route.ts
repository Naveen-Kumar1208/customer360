import { NextResponse } from 'next/server';

// Import webhook stats from parent route
// This is a workaround to access the webhook statistics
let webhookStats = {
  received: 0,
  processed: 0,
  failed: 0,
  lastReceived: null as string | null,
  lastError: null as string | null
};

// GET endpoint to retrieve webhook statistics
export async function GET() {
  try {
    return NextResponse.json({
      ...webhookStats,
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      webhookUrl: '/api/whatsapp/webhook',
      lastUpdated: new Date().toISOString(),
      status: {
        isHealthy: webhookStats.failed === 0 || (webhookStats.received > 0 && webhookStats.failed / webhookStats.received < 0.1),
        isActive: webhookStats.received > 0,
        successRate: webhookStats.received > 0 ? Math.round((webhookStats.processed / webhookStats.received) * 100) : 0
      }
    });
  } catch (error) {
    console.error('❌ Error getting webhook stats:', error);
    return NextResponse.json(
      { error: 'Failed to get webhook statistics' },
      { status: 500 }
    );
  }
}
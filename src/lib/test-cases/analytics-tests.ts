import {
  WhatsAppTestFramework,
  MockWhatsAppAPI,
  TEST_CONTACTS,
  TEST_TEMPLATES,
  createTestPayload,
  waitForDeliveryReports
} from '../test-utils/whatsapp-test-framework';

export interface CampaignAnalytics {
  campaignId: string;
  templateId: string;
  sentCount: number;
  deliveredCount: number;
  readCount: number;
  failedCount: number;
  clickCount: number;
  ctr: number; // Click-through rate
  deliveryRate: number;
  readRate: number;
  totalContacts: number;
  startTime: string;
  endTime?: string;
  links: LinkAnalytics[];
}

export interface LinkAnalytics {
  url: string;
  clicks: number;
  uniqueClicks: number;
  clickTimestamps: string[];
  clicksByPhone: { [phone: string]: number };
}

export interface DatabaseLog {
  id: string;
  campaignId: string;
  messageId: string;
  phone: string;
  status: 'sent' | 'delivered' | 'read' | 'failed' | 'clicked';
  timestamp: string;
  templateId: string;
  error?: string;
  metadata?: any;
}

export interface ExportReport {
  campaignId: string;
  generatedAt: string;
  totalRecords: number;
  summary: {
    sent: number;
    delivered: number;
    read: number;
    failed: number;
    clicked: number;
    ctr: number;
    deliveryRate: number;
    readRate: number;
  };
  detailedLogs: DatabaseLog[];
}

export class AnalyticsTestSuite {
  private testFramework: WhatsAppTestFramework;
  private mockAPI: MockWhatsAppAPI;
  private databaseLogs: DatabaseLog[] = [];
  private campaignAnalytics: CampaignAnalytics[] = [];
  private linkClicks: { [url: string]: LinkAnalytics } = {};
  
  constructor() {
    this.testFramework = new WhatsAppTestFramework();
    this.mockAPI = new MockWhatsAppAPI();
  }
  
  async runAllTests(): Promise<void> {
    console.log('🚀 Starting Analytics Test Suite');
    
    await this.testDashboardCorrectCounts();
    await this.testCTRCalculation();
    await this.testExportReportAccuracy();
    
    const summary = this.testFramework.getSummary();
    console.log('\n📊 Analytics Test Results:');
    console.log(`Total: ${summary.total}, Passed: ${summary.passed}, Failed: ${summary.failed}`);
    console.log(`Pass Rate: ${summary.passRate}%`);
  }
  
  // Test Case 1: Dashboard shows correct counts (sent, delivered, read)
  private async testDashboardCorrectCounts() {
    await this.testFramework.runTest('Dashboard analytics accuracy', async () => {
      this.mockAPI.reset();
      this.databaseLogs = [];
      
      const campaignId = 'campaign_' + Date.now();
      const template = TEST_TEMPLATES.find(t => t.id === 'hello_world')!;
      const testContacts = TEST_CONTACTS.filter(c => !c.isInvalid && !c.isBlocked && !c.isOptedOut).slice(0, 5);
      
      // Send campaign
      let sentCount = 0;
      const messageIds: string[] = [];
      
      for (const contact of testContacts) {
        const payload = createTestPayload(template, contact);
        const result = await this.mockAPI.sendMessage(payload);
        
        if (result.success) {
          const messageId = result.data.messages[0].id;
          sentCount++;
          messageIds.push(messageId);
          
          // Log to database
          this.logToDatabasee({
            id: `log_${Date.now()}_${Math.random()}`,
            campaignId,
            messageId,
            phone: contact.phone,
            status: 'sent',
            timestamp: new Date().toISOString(),
            templateId: template.id
          });
        } else {
          // Log failed message
          this.logToDatabasee({
            id: `log_${Date.now()}_${Math.random()}`,
            campaignId,
            messageId: 'failed_' + Date.now(),
            phone: contact.phone,
            status: 'failed',
            timestamp: new Date().toISOString(),
            templateId: template.id,
            error: result.data.error?.message || 'Send failed'
          });
        }
      }
      
      // Wait for delivery reports
      await waitForDeliveryReports(3000);
      
      // Process delivery reports
      const reports = this.mockAPI.getDeliveryReports();
      let deliveredCount = 0;
      let readCount = 0;
      
      for (const report of reports) {
        if (messageIds.includes(report.messageId)) {
          this.logToDatabasee({
            id: `log_${Date.now()}_${Math.random()}`,
            campaignId,
            messageId: report.messageId,
            phone: report.phone,
            status: report.status as any,
            timestamp: report.timestamp,
            templateId: template.id
          });
          
          if (report.status === 'delivered') deliveredCount++;
          if (report.status === 'read') readCount++;
        }
      }
      
      // Calculate analytics
      const analytics = this.calculateCampaignAnalytics(campaignId);
      
      // Verify dashboard counts match actual data
      const expectedSent = sentCount;
      const expectedDelivered = deliveredCount;
      const expectedRead = readCount;
      const expectedFailed = testContacts.length - sentCount;
      
      const countsMatch = (
        analytics.sentCount === expectedSent &&
        analytics.deliveredCount === expectedDelivered &&
        analytics.readCount === expectedRead &&
        analytics.failedCount === expectedFailed
      );
      
      console.log('📊 Campaign Analytics:', {
        expected: { sent: expectedSent, delivered: expectedDelivered, read: expectedRead, failed: expectedFailed },
        actual: { sent: analytics.sentCount, delivered: analytics.deliveredCount, read: analytics.readCount, failed: analytics.failedCount }
      });
      
      return countsMatch;
    });
  }
  
  // Test Case 2: CTR calculated correctly for campaigns with links
  private async testCTRCalculation() {
    await this.testFramework.runTest('Click-through rate calculation', async () => {
      this.mockAPI.reset();
      this.databaseLogs = [];
      this.linkClicks = {};
      
      const campaignId = 'campaign_ctr_' + Date.now();
      const template = TEST_TEMPLATES.find(t => t.id === 'link_template')!;
      const testContacts = TEST_CONTACTS.filter(c => !c.isInvalid && !c.isBlocked && !c.isOptedOut).slice(0, 8);
      const linkUrl = 'https://example.com/offers';
      
      // Send campaign with link
      let sentCount = 0;
      const messageIds: string[] = [];
      
      for (const contact of testContacts) {
        const payload = createTestPayload(template, contact);
        const result = await this.mockAPI.sendMessage(payload);
        
        if (result.success) {
          const messageId = result.data.messages[0].id;
          sentCount++;
          messageIds.push(messageId);
          
          this.logToDatabasee({
            id: `log_${Date.now()}_${Math.random()}`,
            campaignId,
            messageId,
            phone: contact.phone,
            status: 'sent',
            timestamp: new Date().toISOString(),
            templateId: template.id
          });
        }
      }
      
      // Simulate link clicks (60% of sent messages get clicked)
      const clickRate = 0.6;
      const expectedClicks = Math.floor(sentCount * clickRate);
      let actualClicks = 0;
      
      for (let i = 0; i < expectedClicks; i++) {
        const contact = testContacts[i];
        const messageId = messageIds[i];
        
        // Some users click multiple times
        const clickCount = Math.random() > 0.7 ? 2 : 1; // 30% chance of double click
        
        for (let c = 0; c < clickCount; c++) {
          this.simulateLinkClick(campaignId, messageId, contact.phone, linkUrl);
          actualClicks++;
        }
      }
      
      // Calculate CTR
      const analytics = this.calculateCampaignAnalytics(campaignId);
      const expectedCTR = (expectedClicks / sentCount) * 100; // Unique clicks / sent messages
      const actualCTR = analytics.ctr;
      
      // Allow 5% tolerance for calculation differences
      const ctrAccurate = Math.abs(actualCTR - expectedCTR) <= 5;
      
      console.log('📊 CTR Analysis:', {
        sentMessages: sentCount,
        totalClicks: actualClicks,
        uniqueClicks: expectedClicks,
        expectedCTR: expectedCTR.toFixed(2) + '%',
        actualCTR: actualCTR.toFixed(2) + '%',
        accurate: ctrAccurate
      });
      
      return ctrAccurate && analytics.clickCount > 0;
    });
  }
  
  // Test Case 3: Export report matches database logs
  private async testExportReportAccuracy() {
    await this.testFramework.runTest('Export report data accuracy', async () => {
      // Use existing data from previous tests
      if (this.databaseLogs.length === 0) {
        // Create some test data if none exists
        const campaignId = 'export_test_' + Date.now();
        for (let i = 0; i < 5; i++) {
          this.logToDatabasee({
            id: `log_${i}`,
            campaignId,
            messageId: `msg_${i}`,
            phone: `91900000000${i}`,
            status: i < 3 ? 'delivered' : 'sent',
            timestamp: new Date().toISOString(),
            templateId: 'hello_world'
          });
        }
      }
      
      // Get a campaign to export
      const campaignIds = [...new Set(this.databaseLogs.map(log => log.campaignId))];
      const testCampaignId = campaignIds[0];
      
      // Generate export report
      const exportReport = this.generateExportReport(testCampaignId);
      
      // Verify report accuracy against database
      const campaignLogs = this.databaseLogs.filter(log => log.campaignId === testCampaignId);
      
      // Count verification
      const dbSent = campaignLogs.filter(log => log.status === 'sent').length;
      const dbDelivered = campaignLogs.filter(log => log.status === 'delivered').length;
      const dbRead = campaignLogs.filter(log => log.status === 'read').length;
      const dbFailed = campaignLogs.filter(log => log.status === 'failed').length;
      const dbClicked = campaignLogs.filter(log => log.status === 'clicked').length;
      
      const countsMatch = (
        exportReport.summary.sent === dbSent &&
        exportReport.summary.delivered === dbDelivered &&
        exportReport.summary.read === dbRead &&
        exportReport.summary.failed === dbFailed &&
        exportReport.summary.clicked === dbClicked
      );
      
      // Record count verification
      const recordCountMatch = exportReport.totalRecords === campaignLogs.length;
      const detailedLogsMatch = exportReport.detailedLogs.length === campaignLogs.length;
      
      // Rate calculations verification
      const expectedDeliveryRate = dbSent > 0 ? (dbDelivered / dbSent) * 100 : 0;
      const expectedReadRate = dbDelivered > 0 ? (dbRead / dbDelivered) * 100 : 0;
      const expectedCTR = dbSent > 0 ? (dbClicked / dbSent) * 100 : 0;
      
      const ratesMatch = (
        Math.abs(exportReport.summary.deliveryRate - expectedDeliveryRate) <= 1 &&
        Math.abs(exportReport.summary.readRate - expectedReadRate) <= 1 &&
        Math.abs(exportReport.summary.ctr - expectedCTR) <= 1
      );
      
      console.log('📊 Export Report Verification:', {
        countsMatch,
        recordCountMatch,
        detailedLogsMatch,
        ratesMatch,
        dbRecords: campaignLogs.length,
        exportRecords: exportReport.totalRecords,
        summary: exportReport.summary
      });
      
      return countsMatch && recordCountMatch && detailedLogsMatch && ratesMatch;
    });
  }
  
  // Helper Methods
  private logToDatabasee(log: DatabaseLog): void {
    this.databaseLogs.push(log);
  }
  
  private simulateLinkClick(campaignId: string, messageId: string, phone: string, url: string): void {
    // Log click to database
    this.logToDatabasee({
      id: `click_${Date.now()}_${Math.random()}`,
      campaignId,
      messageId,
      phone,
      status: 'clicked',
      timestamp: new Date().toISOString(),
      templateId: 'link_template',
      metadata: { clickedUrl: url }
    });
    
    // Update link analytics
    if (!this.linkClicks[url]) {
      this.linkClicks[url] = {
        url,
        clicks: 0,
        uniqueClicks: 0,
        clickTimestamps: [],
        clicksByPhone: {}
      };
    }
    
    const linkAnalytics = this.linkClicks[url];
    linkAnalytics.clicks++;
    linkAnalytics.clickTimestamps.push(new Date().toISOString());
    
    if (!linkAnalytics.clicksByPhone[phone]) {
      linkAnalytics.clicksByPhone[phone] = 0;
      linkAnalytics.uniqueClicks++; // New unique user
    }
    linkAnalytics.clicksByPhone[phone]++;
  }
  
  private calculateCampaignAnalytics(campaignId: string): CampaignAnalytics {
    const logs = this.databaseLogs.filter(log => log.campaignId === campaignId);
    
    const sentCount = logs.filter(log => log.status === 'sent').length;
    const deliveredCount = logs.filter(log => log.status === 'delivered').length;
    const readCount = logs.filter(log => log.status === 'read').length;
    const failedCount = logs.filter(log => log.status === 'failed').length;
    const clickCount = logs.filter(log => log.status === 'clicked').length;
    
    // Get unique phones that clicked (for accurate CTR)
    const uniqueClickedPhones = new Set(
      logs.filter(log => log.status === 'clicked').map(log => log.phone)
    ).size;
    
    const ctr = sentCount > 0 ? (uniqueClickedPhones / sentCount) * 100 : 0;
    const deliveryRate = sentCount > 0 ? (deliveredCount / sentCount) * 100 : 0;
    const readRate = deliveredCount > 0 ? (readCount / deliveredCount) * 100 : 0;
    
    const analytics: CampaignAnalytics = {
      campaignId,
      templateId: logs[0]?.templateId || '',
      sentCount,
      deliveredCount,
      readCount,
      failedCount,
      clickCount: uniqueClickedPhones,
      ctr,
      deliveryRate,
      readRate,
      totalContacts: sentCount + failedCount,
      startTime: logs[0]?.timestamp || new Date().toISOString(),
      links: Object.values(this.linkClicks)
    };
    
    // Store analytics
    const existingIndex = this.campaignAnalytics.findIndex(a => a.campaignId === campaignId);
    if (existingIndex >= 0) {
      this.campaignAnalytics[existingIndex] = analytics;
    } else {
      this.campaignAnalytics.push(analytics);
    }
    
    return analytics;
  }
  
  private generateExportReport(campaignId: string): ExportReport {
    const campaignLogs = this.databaseLogs.filter(log => log.campaignId === campaignId);
    const analytics = this.calculateCampaignAnalytics(campaignId);
    
    return {
      campaignId,
      generatedAt: new Date().toISOString(),
      totalRecords: campaignLogs.length,
      summary: {
        sent: analytics.sentCount,
        delivered: analytics.deliveredCount,
        read: analytics.readCount,
        failed: analytics.failedCount,
        clicked: analytics.clickCount,
        ctr: analytics.ctr,
        deliveryRate: analytics.deliveryRate,
        readRate: analytics.readRate
      },
      detailedLogs: campaignLogs.sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      )
    };
  }
  
  // Public utility methods for integration
  public getCampaignAnalytics(campaignId: string): CampaignAnalytics | undefined {
    return this.campaignAnalytics.find(a => a.campaignId === campaignId);
  }
  
  public getAllCampaignAnalytics(): CampaignAnalytics[] {
    return this.campaignAnalytics;
  }
  
  public getDatabaseLogs(campaignId?: string): DatabaseLog[] {
    if (campaignId) {
      return this.databaseLogs.filter(log => log.campaignId === campaignId);
    }
    return this.databaseLogs;
  }
  
  public getLinkAnalytics(url: string): LinkAnalytics | undefined {
    return this.linkClicks[url];
  }
  
  public exportCampaignData(campaignId: string): ExportReport {
    return this.generateExportReport(campaignId);
  }
  
  getResults() {
    return this.testFramework.getResults();
  }
  
  getSummary() {
    return this.testFramework.getSummary();
  }
}
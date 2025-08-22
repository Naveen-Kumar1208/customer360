import {
  WhatsAppTestFramework,
  TEST_CONTACTS,
  TEST_TEMPLATES,
  createTestPayload
} from '../test-utils/whatsapp-test-framework';

export interface AuthToken {
  token: string;
  expires: number;
  refreshToken?: string;
  permissions: string[];
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'agent' | 'viewer';
  permissions: string[];
  isActive: boolean;
}

export interface OptOutContact {
  phone: string;
  optedOutAt: string;
  reason: string;
  campaignId?: string;
}

export class SecurityTestSuite {
  private testFramework: WhatsAppTestFramework;
  private currentToken: AuthToken | null = null;
  private optOutList: OptOutContact[] = [];
  private users: User[] = [];
  
  constructor() {
    this.testFramework = new WhatsAppTestFramework();
    this.initializeTestData();
  }
  
  private initializeTestData() {
    // Mock users for testing
    this.users = [
      {
        id: 'admin_1',
        email: 'admin@test.com',
        role: 'admin',
        permissions: ['send_campaigns', 'manage_users', 'view_analytics'],
        isActive: true
      },
      {
        id: 'agent_1',
        email: 'agent@test.com',
        role: 'agent',
        permissions: ['send_campaigns', 'view_analytics'],
        isActive: true
      },
      {
        id: 'viewer_1',
        email: 'viewer@test.com',
        role: 'viewer',
        permissions: ['view_analytics'],
        isActive: true
      },
      {
        id: 'inactive_1',
        email: 'inactive@test.com',
        role: 'agent',
        permissions: ['send_campaigns'],
        isActive: false
      }
    ];
    
    // Mock opt-out list
    this.optOutList = [
      {
        phone: '918888888888',
        optedOutAt: new Date().toISOString(),
        reason: 'User requested opt-out',
        campaignId: 'camp_123'
      },
      {
        phone: '917777777777',
        optedOutAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        reason: 'Spam complaint'
      }
    ];
  }
  
  async runAllTests(): Promise<void> {
    console.log('🚀 Starting Security Test Suite');
    
    await this.testTokenExpiredRefreshMechanism();
    await this.testUnauthorizedUserAccess();
    await this.testOptOutContactListRespected();
    
    const summary = this.testFramework.getSummary();
    console.log('\n📊 Security Test Results:');
    console.log(`Total: ${summary.total}, Passed: ${summary.passed}, Failed: ${summary.failed}`);
    console.log(`Pass Rate: ${summary.passRate}%`);
  }
  
  // Test Case 1: Token expired → refresh mechanism works
  private async testTokenExpiredRefreshMechanism() {
    await this.testFramework.runTest('Token expiry and refresh mechanism', async () => {
      // Simulate expired token
      this.currentToken = {
        token: 'expired_token_123',
        expires: Date.now() - 3600000, // Expired 1 hour ago
        refreshToken: 'refresh_token_456',
        permissions: ['send_campaigns']
      };
      
      // Attempt to send campaign with expired token
      const template = TEST_TEMPLATES.find(t => t.id === 'hello_world')!;
      const contact = TEST_CONTACTS[0];
      
      let campaignResult = await this.attemptCampaignSend(template, [contact]);
      
      // Should fail due to expired token
      if (campaignResult.success) {
        console.log('❌ Campaign succeeded with expired token');
        return false;
      }
      
      // Attempt token refresh
      const refreshResult = await this.refreshToken();
      if (!refreshResult.success) {
        console.log('❌ Token refresh failed');
        return false;
      }
      
      // Retry campaign with new token
      campaignResult = await this.attemptCampaignSend(template, [contact]);
      
      // Should succeed with refreshed token
      if (!campaignResult.success) {
        console.log('❌ Campaign failed after token refresh');
        return false;
      }
      
      console.log('✅ Token refresh mechanism working');
      return true;
    });
  }
  
  // Test Case 2: Unauthorized user cannot send campaign
  private async testUnauthorizedUserAccess() {
    await this.testFramework.runTest('Unauthorized user access prevention', async () => {
      const template = TEST_TEMPLATES.find(t => t.id === 'hello_world')!;
      const contact = TEST_CONTACTS[0];
      
      // Test 1: User without send_campaigns permission
      const viewerUser = this.users.find(u => u.role === 'viewer')!;
      const viewerResult = await this.attemptCampaignSendAsUser(template, [contact], viewerUser);
      
      if (viewerResult.success) {
        console.log('❌ Viewer user was able to send campaign');
        return false;
      }
      
      // Test 2: Inactive user
      const inactiveUser = this.users.find(u => !u.isActive)!;
      const inactiveResult = await this.attemptCampaignSendAsUser(template, [contact], inactiveUser);
      
      if (inactiveResult.success) {
        console.log('❌ Inactive user was able to send campaign');
        return false;
      }
      
      // Test 3: Valid user should succeed
      const adminUser = this.users.find(u => u.role === 'admin')!;
      const adminResult = await this.attemptCampaignSendAsUser(template, [contact], adminUser);
      
      if (!adminResult.success) {
        console.log('❌ Admin user was unable to send campaign');
        return false;
      }
      
      console.log('✅ Authorization checks working correctly');
      return true;
    });
  }
  
  // Test Case 3: Opt-out contact list respected (no messages sent)
  private async testOptOutContactListRespected() {
    await this.testFramework.runTest('Opt-out contact list compliance', async () => {
      const template = TEST_TEMPLATES.find(t => t.id === 'hello_world')!;
      
      // Mix of opted-out and regular contacts
      const testContacts = [
        { phone: '919940804585', name: 'Regular User' }, // Not opted out
        { phone: '918888888888', name: 'Opted Out User' }, // Opted out
        { phone: '917777777777', name: 'Spam Complaint User' }, // Opted out
        { phone: '919876543210', name: 'Another Regular User' } // Not opted out
      ];
      
      // Filter out opted-out contacts
      const allowedContacts = testContacts.filter(contact => 
        !this.isOptedOut(contact.phone)
      );
      
      // Send campaign only to allowed contacts
      const campaignResult = await this.attemptCampaignSend(template, allowedContacts);
      
      if (!campaignResult.success) {
        console.log('❌ Campaign failed to send');
        return false;
      }
      
      // Verify correct number of messages sent
      const expectedSentCount = 2; // Only 2 non-opted-out contacts
      const actualSentCount = campaignResult.sentCount;
      
      if (actualSentCount !== expectedSentCount) {
        console.log(`❌ Expected ${expectedSentCount} messages, but ${actualSentCount} were sent`);
        return false;
      }
      
      // Verify no messages were sent to opted-out numbers
      const optedOutNumbers = this.optOutList.map(o => o.phone);
      const sentToOptedOut = campaignResult.sentToNumbers?.some(phone => 
        optedOutNumbers.includes(phone)
      );
      
      if (sentToOptedOut) {
        console.log('❌ Messages were sent to opted-out numbers');
        return false;
      }
      
      console.log('✅ Opt-out list respected correctly');
      return true;
    });
  }
  
  // Helper Methods
  private async refreshToken(): Promise<{ success: boolean; token?: AuthToken }> {
    // Simulate token refresh API call
    if (!this.currentToken?.refreshToken) {
      return { success: false };
    }
    
    // Simulate successful refresh
    this.currentToken = {
      token: 'new_access_token_' + Date.now(),
      expires: Date.now() + 3600000, // 1 hour from now
      refreshToken: 'new_refresh_token_' + Date.now(),
      permissions: this.currentToken.permissions
    };
    
    return { success: true, token: this.currentToken };
  }
  
  private isTokenValid(token: AuthToken): boolean {
    return token.expires > Date.now();
  }
  
  private userHasPermission(user: User, permission: string): boolean {
    return user.isActive && user.permissions.includes(permission);
  }
  
  private isOptedOut(phone: string): boolean {
    return this.optOutList.some(opt => opt.phone === phone);
  }
  
  private async attemptCampaignSend(
    template: any, 
    contacts: any[]
  ): Promise<{ success: boolean; sentCount: number; sentToNumbers?: string[] }> {
    // Check token validity
    if (!this.currentToken || !this.isTokenValid(this.currentToken)) {
      return { success: false, sentCount: 0 };
    }
    
    // Simulate sending messages
    const sentToNumbers: string[] = [];
    let sentCount = 0;
    
    for (const contact of contacts) {
      // Skip opted-out contacts
      if (this.isOptedOut(contact.phone)) {
        continue;
      }
      
      // Simulate API call success
      if (Math.random() > 0.1) { // 90% success rate
        sentCount++;
        sentToNumbers.push(contact.phone);
      }
    }
    
    return { 
      success: sentCount > 0, 
      sentCount, 
      sentToNumbers 
    };
  }
  
  private async attemptCampaignSendAsUser(
    template: any, 
    contacts: any[], 
    user: User
  ): Promise<{ success: boolean; sentCount: number }> {
    // Check user authorization
    if (!this.userHasPermission(user, 'send_campaigns')) {
      return { success: false, sentCount: 0 };
    }
    
    // Create mock token for user
    this.currentToken = {
      token: `token_${user.id}_${Date.now()}`,
      expires: Date.now() + 3600000,
      permissions: user.permissions
    };
    
    // Attempt to send campaign
    return await this.attemptCampaignSend(template, contacts);
  }
  
  // Additional security utilities
  public addOptOut(phone: string, reason: string, campaignId?: string): void {
    this.optOutList.push({
      phone,
      optedOutAt: new Date().toISOString(),
      reason,
      campaignId
    });
  }
  
  public removeOptOut(phone: string): void {
    this.optOutList = this.optOutList.filter(opt => opt.phone !== phone);
  }
  
  public getOptOutList(): OptOutContact[] {
    return this.optOutList;
  }
  
  public validateUserPermissions(user: User, requiredPermissions: string[]): boolean {
    if (!user.isActive) return false;
    
    return requiredPermissions.every(permission => 
      user.permissions.includes(permission)
    );
  }
  
  getResults() {
    return this.testFramework.getResults();
  }
  
  getSummary() {
    return this.testFramework.getSummary();
  }
}
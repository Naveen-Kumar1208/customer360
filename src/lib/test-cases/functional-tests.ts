import {
  WhatsAppTestFramework,
  MockWhatsAppAPI,
  TEST_CONTACTS,
  TEST_TEMPLATES,
  createTestPayload,
  removeDuplicateContacts,
  validatePhoneNumber,
  waitForDeliveryReports
} from '../test-utils/whatsapp-test-framework';

export class FunctionalTestSuite {
  private testFramework: WhatsAppTestFramework;
  private mockAPI: MockWhatsAppAPI;
  
  constructor() {
    this.testFramework = new WhatsAppTestFramework();
    this.mockAPI = new MockWhatsAppAPI();
  }
  
  async runAllTests(): Promise<void> {
    console.log('🚀 Starting Functional Test Suite');
    
    await this.testCampaignWithApprovedTemplate();
    await this.testPersonalizationVariables();
    await this.testUnverifiedTemplate();
    await this.testInvalidPhoneNumber();
    await this.testCampaignScheduling();
    await this.testDuplicateContacts();
    await this.testRateLimitingWithRetry();
    
    const summary = this.testFramework.getSummary();
    console.log('\n📊 Functional Test Results:');
    console.log(`Total: ${summary.total}, Passed: ${summary.passed}, Failed: ${summary.failed}`);
    console.log(`Pass Rate: ${summary.passRate}%`);
  }
  
  // Test Case 1: Send campaign with approved template → all contacts receive messages
  private async testCampaignWithApprovedTemplate() {
    await this.testFramework.runTest('Campaign with approved template', async () => {
      this.mockAPI.reset();
      
      const template = TEST_TEMPLATES.find(t => t.id === 'hello_world' && t.status === 'APPROVED')!;
      const validContacts = TEST_CONTACTS.filter(c => !c.isInvalid && !c.isBlocked && !c.isOptedOut).slice(0, 3);
      
      let sentCount = 0;
      for (const contact of validContacts) {
        const payload = createTestPayload(template, contact);
        const result = await this.mockAPI.sendMessage(payload);
        
        if (result.success) {
          sentCount++;
        }
      }
      
      return sentCount === validContacts.length;
    });
  }
  
  // Test Case 2: Personalization works (variables replaced correctly)
  private async testPersonalizationVariables() {
    await this.testFramework.runTest('Personalization variables replacement', async () => {
      const template = TEST_TEMPLATES.find(t => t.id === 'welcome_personalized')!;
      const contact = TEST_CONTACTS[0]; // Naveen Test
      
      const payload = createTestPayload(template, contact);
      
      // Check if variables are correctly mapped
      const hasNameParameter = payload.template?.components?.[0]?.parameters?.some(
        (p: any) => p.text === contact.name
      );
      const hasCompanyParameter = payload.template?.components?.[0]?.parameters?.some(
        (p: any) => p.text === contact.company
      );
      
      return hasNameParameter && hasCompanyParameter;
    });
  }
  
  // Test Case 3: Unverified template → error returned
  private async testUnverifiedTemplate() {
    await this.testFramework.runTest('Unverified template error handling', async () => {
      this.mockAPI.reset();
      
      const template = TEST_TEMPLATES.find(t => t.id === 'unverified_template')!;
      const contact = TEST_CONTACTS[0];
      
      const payload = createTestPayload(template, contact);
      const result = await this.mockAPI.sendMessage(payload);
      
      return !result.success && result.data.error?.message?.includes('Template does not exist');
    });
  }
  
  // Test Case 4: Invalid phone number → API returns 400 error, app logs failure
  private async testInvalidPhoneNumber() {
    await this.testFramework.runTest('Invalid phone number handling', async () => {
      this.mockAPI.reset();
      
      const template = TEST_TEMPLATES.find(t => t.id === 'hello_world')!;
      const invalidContact = TEST_CONTACTS.find(c => c.isInvalid)!;
      
      // Test validation function
      const isValid = validatePhoneNumber(invalidContact.phone);
      if (isValid) return false; // Should be invalid
      
      // Test API response
      const payload = createTestPayload(template, invalidContact);
      const result = await this.mockAPI.sendMessage(payload);
      
      return !result.success && result.data.error?.message?.includes('Invalid phone number');
    });
  }
  
  // Test Case 5: Campaign scheduling works (message sent at defined time)
  private async testCampaignScheduling() {
    await this.testFramework.runTest('Campaign scheduling', async () => {
      // Simulate scheduled sending
      const scheduledTime = Date.now() + 2000; // 2 seconds from now
      const template = TEST_TEMPLATES.find(t => t.id === 'hello_world')!;
      const contact = TEST_CONTACTS[0];
      
      let messageSent = false;
      const startTime = Date.now();
      
      // Schedule message
      setTimeout(async () => {
        const payload = createTestPayload(template, contact);
        const result = await this.mockAPI.sendMessage(payload);
        messageSent = result.success;
      }, scheduledTime - Date.now());
      
      // Wait for message to be sent
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const endTime = Date.now();
      const actualDelay = endTime - startTime;
      
      // Check if message was sent and timing is approximately correct (within 500ms tolerance)
      return messageSent && Math.abs(actualDelay - 2000) < 500;
    });
  }
  
  // Test Case 6: Duplicate contacts → only one message sent
  private async testDuplicateContacts() {
    await this.testFramework.runTest('Duplicate contact handling', async () => {
      this.mockAPI.reset();
      
      const template = TEST_TEMPLATES.find(t => t.id === 'hello_world')!;
      const contactsWithDuplicates = [
        { phone: '911234567890', name: 'Test User 1' },
        { phone: '911234567890', name: 'Test User 2' }, // Duplicate
        { phone: '919876543210', name: 'Test User 3' },
        { phone: '911234567890', name: 'Test User 4' }, // Another duplicate
      ];
      
      // Remove duplicates
      const uniqueContacts = removeDuplicateContacts(contactsWithDuplicates);
      
      // Send messages
      let sentCount = 0;
      for (const contact of uniqueContacts) {
        const payload = createTestPayload(template, contact);
        const result = await this.mockAPI.sendMessage(payload);
        
        if (result.success) {
          sentCount++;
        }
      }
      
      // Should only send to 2 unique numbers
      return uniqueContacts.length === 2 && sentCount === 2;
    });
  }
  
  // Test Case 7: API rate limiting handled (retry with exponential backoff)
  private async testRateLimitingWithRetry() {
    await this.testFramework.runTest('Rate limiting and retry mechanism', async () => {
      this.mockAPI.reset();
      
      const template = TEST_TEMPLATES.find(t => t.id === 'hello_world')!;
      const contacts = TEST_CONTACTS.slice(0, 6); // More than rate limit
      
      let sentCount = 0;
      let rateLimitHit = false;
      
      for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const payload = createTestPayload(template, contact);
        
        let retries = 0;
        const maxRetries = 3;
        let backoffDelay = 1000; // Start with 1 second
        
        while (retries < maxRetries) {
          const result = await this.mockAPI.sendMessage(payload);
          
          if (result.success) {
            sentCount++;
            break;
          } else if (result.data.error?.message?.includes('Rate limit')) {
            rateLimitHit = true;
            retries++;
            
            if (retries < maxRetries) {
              // Exponential backoff
              await new Promise(resolve => setTimeout(resolve, backoffDelay));
              backoffDelay *= 2;
            }
          } else {
            // Other error, don't retry
            break;
          }
        }
      }
      
      // Should have hit rate limit and successfully sent some messages after retry
      return rateLimitHit && sentCount > 0;
    });
  }
  
  getResults() {
    return this.testFramework.getResults();
  }
  
  getSummary() {
    return this.testFramework.getSummary();
  }
}
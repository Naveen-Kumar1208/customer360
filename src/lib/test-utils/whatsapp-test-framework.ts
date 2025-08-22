// WhatsApp Campaign Test Framework
export interface TestContact {
  phone: string;
  name?: string;
  email?: string;
  company?: string;
  isOptedOut?: boolean;
  isBlocked?: boolean;
  isInvalid?: boolean;
}

export interface TestTemplate {
  id: string;
  name: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  language: string;
  category: string;
  content: string;
  hasVariables: boolean;
  variables?: string[];
}

export interface TestResult {
  testName: string;
  passed: boolean;
  error?: string;
  details?: any;
  timestamp: string;
}

export interface CampaignTestResult {
  campaignId: string;
  templateId: string;
  contactCount: number;
  sentCount: number;
  failedCount: number;
  deliveredCount: number;
  readCount: number;
  errors: string[];
}

// Test Data Sets
export const TEST_CONTACTS: TestContact[] = [
  // Valid contacts
  { phone: '919940804585', name: 'Naveen Test', email: 'naveen@test.com', company: 'Test Corp' },
  { phone: '919788288496', name: 'Santhi Test', email: 'santhi@test.com', company: 'Test Industries' },
  { phone: '918144162853', name: 'Prakash Test', email: 'prakash@test.com', company: 'Test Inc' },
  
  // Edge cases
  { phone: '911234567890', name: 'Duplicate 1', email: 'dup1@test.com' },
  { phone: '911234567890', name: 'Duplicate 2', email: 'dup2@test.com' }, // Duplicate for testing
  { phone: '91invalid', name: 'Invalid Number', isInvalid: true },
  { phone: '919999999999', name: 'Blocked User', isBlocked: true },
  { phone: '918888888888', name: 'Opted Out', isOptedOut: true },
];

export const TEST_TEMPLATES: TestTemplate[] = [
  {
    id: 'hello_world',
    name: 'hello_world',
    status: 'APPROVED',
    language: 'en_US',
    category: 'UTILITY',
    content: 'Hello World',
    hasVariables: false
  },
  {
    id: 'welcome_personalized',
    name: 'welcome_personalized',
    status: 'APPROVED',
    language: 'en_US',
    category: 'MARKETING',
    content: 'Hello {{1}}, welcome to {{2}}! Your account is ready.',
    hasVariables: true,
    variables: ['name', 'company']
  },
  {
    id: 'unverified_template',
    name: 'unverified_template',
    status: 'PENDING',
    language: 'en_US',
    category: 'MARKETING',
    content: 'This template is not approved yet.',
    hasVariables: false
  },
  {
    id: 'link_template',
    name: 'link_template',
    status: 'APPROVED',
    language: 'en_US',
    category: 'MARKETING',
    content: 'Check out our latest offers: https://example.com/offers',
    hasVariables: false
  }
];

// Mock API Responses
export const MOCK_RESPONSES = {
  SUCCESS: {
    messages: [{ id: 'msg_123', wa_id: '919940804585' }]
  },
  TEMPLATE_ERROR: {
    error: {
      code: 131051,
      message: 'Template does not exist',
      error_subcode: 2388003,
      fbtrace_id: 'test_trace'
    }
  },
  INVALID_PHONE: {
    error: {
      code: 131026,
      message: 'Invalid phone number',
      error_subcode: 2388001,
      fbtrace_id: 'test_trace'
    }
  },
  RATE_LIMIT: {
    error: {
      code: 131048,
      message: 'Rate limit hit',
      error_subcode: 2390003,
      fbtrace_id: 'test_trace'
    }
  },
  USER_BLOCKED: {
    error: {
      code: 131056,
      message: 'User has blocked the business',
      error_subcode: 2388108,
      fbtrace_id: 'test_trace'
    }
  }
};

// Test Utilities
export class WhatsAppTestFramework {
  private testResults: TestResult[] = [];
  
  async runTest(testName: string, testFn: () => Promise<boolean>): Promise<TestResult> {
    const result: TestResult = {
      testName,
      passed: false,
      timestamp: new Date().toISOString()
    };
    
    try {
      console.log(`🧪 Running test: ${testName}`);
      result.passed = await testFn();
      if (result.passed) {
        console.log(`✅ PASSED: ${testName}`);
      } else {
        console.log(`❌ FAILED: ${testName}`);
      }
    } catch (error) {
      result.passed = false;
      result.error = error instanceof Error ? error.message : String(error);
      console.log(`❌ ERROR: ${testName} - ${result.error}`);
    }
    
    this.testResults.push(result);
    return result;
  }
  
  getResults(): TestResult[] {
    return this.testResults;
  }
  
  getSummary() {
    const total = this.testResults.length;
    const passed = this.testResults.filter(r => r.passed).length;
    const failed = total - passed;
    
    return {
      total,
      passed,
      failed,
      passRate: total > 0 ? Math.round((passed / total) * 100) : 0
    };
  }
  
  reset() {
    this.testResults = [];
  }
}

// Mock WhatsApp API for testing
export class MockWhatsAppAPI {
  private messageLog: any[] = [];
  private deliveryReports: any[] = [];
  private rateLimitCount = 0;
  private readonly maxRateLimit = 3;
  
  async sendMessage(payload: any): Promise<any> {
    // Simulate rate limiting
    this.rateLimitCount++;
    if (this.rateLimitCount > this.maxRateLimit) {
      this.rateLimitCount = 0; // Reset for next batch
      return { success: false, data: MOCK_RESPONSES.RATE_LIMIT };
    }
    
    // Check template status
    const template = TEST_TEMPLATES.find(t => t.name === payload.template?.name);
    if (template && template.status !== 'APPROVED') {
      return { success: false, data: MOCK_RESPONSES.TEMPLATE_ERROR };
    }
    
    // Check phone number validity
    const contact = TEST_CONTACTS.find(c => c.phone === payload.to);
    if (contact?.isInvalid) {
      return { success: false, data: MOCK_RESPONSES.INVALID_PHONE };
    }
    
    if (contact?.isBlocked) {
      return { success: false, data: MOCK_RESPONSES.USER_BLOCKED };
    }
    
    if (contact?.isOptedOut) {
      return { success: false, data: { error: { message: 'User has opted out' } } };
    }
    
    // Simulate successful send
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const response = {
      messages: [{ id: messageId, wa_id: payload.to }]
    };
    
    // Log message for analytics
    this.messageLog.push({
      messageId,
      phone: payload.to,
      template: payload.template?.name || payload.type,
      timestamp: new Date().toISOString(),
      status: 'sent'
    });
    
    // Simulate delivery report (async)
    setTimeout(() => {
      this.simulateDeliveryReport(messageId, payload.to);
    }, Math.random() * 2000 + 1000); // 1-3 seconds delay
    
    return { success: true, data: response };
  }
  
  private simulateDeliveryReport(messageId: string, phone: string) {
    const statuses = ['delivered', 'read'];
    const contact = TEST_CONTACTS.find(c => c.phone === phone);
    
    // Some messages might not be delivered
    if (Math.random() > 0.1) { // 90% delivery rate
      this.deliveryReports.push({
        messageId,
        phone,
        status: 'delivered',
        timestamp: new Date().toISOString()
      });
      
      // Some delivered messages might be read
      if (Math.random() > 0.3) { // 70% read rate
        setTimeout(() => {
          this.deliveryReports.push({
            messageId,
            phone,
            status: 'read',
            timestamp: new Date().toISOString()
          });
        }, Math.random() * 5000 + 2000); // 2-7 seconds after delivery
      }
    }
  }
  
  getMessageLog() {
    return this.messageLog;
  }
  
  getDeliveryReports() {
    return this.deliveryReports;
  }
  
  reset() {
    this.messageLog = [];
    this.deliveryReports = [];
    this.rateLimitCount = 0;
  }
}

// Utility functions
export function createTestPayload(template: TestTemplate, contact: TestContact) {
  const basePayload = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: contact.phone,
  };
  
  if (template.hasVariables) {
    return {
      ...basePayload,
      type: 'template',
      template: {
        name: template.name,
        language: { code: template.language },
        components: [
          {
            type: 'body',
            parameters: template.variables?.map((variable, index) => ({
              type: 'text',
              text: variable === 'name' ? (contact.name || 'Customer') : (contact.company || 'Your Company')
            })) || []
          }
        ]
      }
    };
  } else {
    return {
      ...basePayload,
      type: 'template',
      template: {
        name: template.name,
        language: { code: template.language }
      }
    };
  }
}

export function removeDuplicateContacts(contacts: TestContact[]): TestContact[] {
  const seen = new Set();
  return contacts.filter(contact => {
    if (seen.has(contact.phone)) {
      return false;
    }
    seen.add(contact.phone);
    return true;
  });
}

export function validatePhoneNumber(phone: string): boolean {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it's a valid length (10-15 digits)
  if (cleaned.length < 10 || cleaned.length > 15) {
    return false;
  }
  
  // Should start with country code
  return /^[1-9]\d{9,14}$/.test(cleaned);
}

export async function waitForDeliveryReports(timeoutMs: number = 10000): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, timeoutMs);
  });
}
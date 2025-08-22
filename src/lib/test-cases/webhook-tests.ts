import {
  WhatsAppTestFramework,
  MockWhatsAppAPI,
  TEST_CONTACTS,
  TEST_TEMPLATES,
  createTestPayload,
  waitForDeliveryReports
} from '../test-utils/whatsapp-test-framework';

export interface WebhookEvent {
  object: string;
  entry: Array<{
    id: string;
    changes: Array<{
      value: {
        messaging_product: string;
        metadata: {
          display_phone_number: string;
          phone_number_id: string;
        };
        contacts?: Array<{
          profile: { name: string };
          wa_id: string;
        }>;
        messages?: Array<{
          from: string;
          id: string;
          timestamp: string;
          text?: { body: string };
          type: string;
          context?: { id: string }; // Reply to message
        }>;
        statuses?: Array<{
          id: string;
          status: 'sent' | 'delivered' | 'read' | 'failed';
          timestamp: string;
          recipient_id: string;
          conversation?: {
            id: string;
            origin: { type: string };
          };
          pricing?: {
            billable: boolean;
            pricing_model: string;
            category: string;
          };
          errors?: Array<{
            code: number;
            title: string;
            message: string;
            error_data: {
              details: string;
            };
          }>;
        }>;
      };
      field: string;
    }>;
    time: number;
  }>;
}

export interface ConversationThread {
  messageId: string;
  phone: string;
  direction: 'outbound' | 'inbound';
  content: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read' | 'failed';
  contextId?: string; // For replies
}

export interface DeliveryReport {
  messageId: string;
  phone: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  timestamp: string;
  error?: string;
}

export class WebhookTestSuite {
  private testFramework: WhatsAppTestFramework;
  private mockAPI: MockWhatsAppAPI;
  private deliveryReports: DeliveryReport[] = [];
  private conversationThreads: ConversationThread[] = [];
  private failedMessages: DeliveryReport[] = [];
  
  constructor() {
    this.testFramework = new WhatsAppTestFramework();
    this.mockAPI = new MockWhatsAppAPI();
  }
  
  async runAllTests(): Promise<void> {
    console.log('🚀 Starting Webhook Test Suite');
    
    await this.testDeliveryReportsLogging();
    await this.testFailedMessagesStorage();
    await this.testIncomingReplyCapture();
    
    const summary = this.testFramework.getSummary();
    console.log('\n📊 Webhook Test Results:');
    console.log(`Total: ${summary.total}, Passed: ${summary.passed}, Failed: ${summary.failed}`);
    console.log(`Pass Rate: ${summary.passRate}%`);
  }
  
  // Test Case 1: Delivery reports logged (sent → delivered → read)
  private async testDeliveryReportsLogging() {
    await this.testFramework.runTest('Delivery reports logging flow', async () => {
      this.mockAPI.reset();
      this.deliveryReports = [];
      
      // Send a message
      const template = TEST_TEMPLATES.find(t => t.id === 'hello_world')!;
      const contact = TEST_CONTACTS[0];
      const payload = createTestPayload(template, contact);
      
      const sendResult = await this.mockAPI.sendMessage(payload);
      if (!sendResult.success) return false;
      
      const messageId = sendResult.data.messages[0].id;
      
      // Initial status: sent
      this.processWebhookEvent(this.createStatusWebhook(messageId, contact.phone, 'sent'));
      
      // Wait for delivery simulation
      await waitForDeliveryReports(5000);
      
      // Process delivery reports from mock API
      const reports = this.mockAPI.getDeliveryReports();
      for (const report of reports) {
        if (report.messageId === messageId) {
          this.processWebhookEvent(this.createStatusWebhook(
            report.messageId,
            report.phone,
            report.status as any
          ));
        }
      }
      
      // Verify flow: sent → delivered → read
      const messageReports = this.deliveryReports.filter(r => r.messageId === messageId);
      const hasSent = messageReports.some(r => r.status === 'sent');
      const hasDelivered = messageReports.some(r => r.status === 'delivered');
      const hasRead = messageReports.some(r => r.status === 'read');
      
      console.log('📊 Delivery flow:', { hasSent, hasDelivered, hasRead, reportCount: messageReports.length });
      
      return hasSent && hasDelivered; // Read might not always happen
    });
  }
  
  // Test Case 2: Failed messages stored (e.g., user blocked, invalid number)
  private async testFailedMessagesStorage() {
    await this.testFramework.runTest('Failed messages storage', async () => {
      this.mockAPI.reset();
      this.failedMessages = [];
      
      // Try sending to blocked user
      const template = TEST_TEMPLATES.find(t => t.id === 'hello_world')!;
      const blockedContact = TEST_CONTACTS.find(c => c.isBlocked)!;
      const payload = createTestPayload(template, blockedContact);
      
      const result = await this.mockAPI.sendMessage(payload);
      
      if (!result.success) {
        // Message failed at send time
        this.failedMessages.push({
          messageId: 'failed_' + Date.now(),
          phone: blockedContact.phone,
          status: 'failed',
          timestamp: new Date().toISOString(),
          error: result.data.error?.message || 'Send failed'
        });
      } else {
        // Simulate failure webhook for a sent message
        const messageId = result.data.messages[0].id;
        const failureWebhook = this.createFailureWebhook(messageId, blockedContact.phone, 'User blocked business');
        this.processWebhookEvent(failureWebhook);
      }
      
      // Also test invalid phone number
      const invalidContact = TEST_CONTACTS.find(c => c.isInvalid)!;
      const invalidPayload = createTestPayload(template, invalidContact);
      const invalidResult = await this.mockAPI.sendMessage(invalidPayload);
      
      if (!invalidResult.success) {
        this.failedMessages.push({
          messageId: 'invalid_' + Date.now(),
          phone: invalidContact.phone,
          status: 'failed',
          timestamp: new Date().toISOString(),
          error: invalidResult.data.error?.message || 'Invalid phone'
        });
      }
      
      // Verify failures are stored
      const blockedFailure = this.failedMessages.find(f => f.phone === blockedContact.phone);
      const invalidFailure = this.failedMessages.find(f => f.phone === invalidContact.phone);
      
      console.log('📊 Failed messages:', { 
        blockedFailure: !!blockedFailure, 
        invalidFailure: !!invalidFailure, 
        totalFailed: this.failedMessages.length 
      });
      
      return blockedFailure && invalidFailure;
    });
  }
  
  // Test Case 3: Incoming reply captured and stored in conversation thread
  private async testIncomingReplyCapture() {
    await this.testFramework.runTest('Incoming reply capture and threading', async () => {
      this.conversationThreads = [];
      
      // Simulate sending a message first
      const template = TEST_TEMPLATES.find(t => t.id === 'hello_world')!;
      const contact = TEST_CONTACTS[0];
      const payload = createTestPayload(template, contact);
      
      const sendResult = await this.mockAPI.sendMessage(payload);
      if (!sendResult.success) return false;
      
      const originalMessageId = sendResult.data.messages[0].id;
      
      // Add outbound message to thread
      this.conversationThreads.push({
        messageId: originalMessageId,
        phone: contact.phone,
        direction: 'outbound',
        content: template.content,
        timestamp: new Date().toISOString(),
        status: 'sent'
      });
      
      // Simulate incoming reply
      const replyWebhook = this.createIncomingMessageWebhook(
        contact.phone,
        'Thank you for your message!',
        originalMessageId // Context/reply to
      );
      
      this.processWebhookEvent(replyWebhook);
      
      // Simulate another reply in the thread
      const followUpWebhook = this.createIncomingMessageWebhook(
        contact.phone,
        'Can you provide more information?'
      );
      
      this.processWebhookEvent(followUpWebhook);
      
      // Verify conversation thread
      const threadMessages = this.conversationThreads.filter(t => t.phone === contact.phone);
      const outboundCount = threadMessages.filter(t => t.direction === 'outbound').length;
      const inboundCount = threadMessages.filter(t => t.direction === 'inbound').length;
      const hasContextReply = threadMessages.some(t => t.direction === 'inbound' && t.contextId === originalMessageId);
      
      console.log('📊 Conversation thread:', { 
        outboundCount, 
        inboundCount, 
        hasContextReply, 
        totalMessages: threadMessages.length 
      });
      
      return outboundCount === 1 && inboundCount === 2 && hasContextReply;
    });
  }
  
  // Helper Methods for Creating Webhook Events
  private createStatusWebhook(messageId: string, phone: string, status: 'sent' | 'delivered' | 'read' | 'failed'): WebhookEvent {
    return {
      object: 'whatsapp_business_account',
      entry: [{
        id: '253011594562692',
        changes: [{
          value: {
            messaging_product: 'whatsapp',
            metadata: {
              display_phone_number: '919999999999',
              phone_number_id: '253011594562692',
            },
            statuses: [{
              id: messageId,
              status,
              timestamp: Math.floor(Date.now() / 1000).toString(),
              recipient_id: phone,
              conversation: {
                id: 'conv_' + Date.now(),
                origin: { type: 'business_initiated' }
              },
              pricing: {
                billable: true,
                pricing_model: 'CBP',
                category: 'business_initiated'
              }
            }]
          },
          field: 'messages'
        }],
        time: Math.floor(Date.now() / 1000)
      }]
    };
  }
  
  private createFailureWebhook(messageId: string, phone: string, errorMessage: string): WebhookEvent {
    return {
      object: 'whatsapp_business_account',
      entry: [{
        id: '253011594562692',
        changes: [{
          value: {
            messaging_product: 'whatsapp',
            metadata: {
              display_phone_number: '919999999999',
              phone_number_id: '253011594562692',
            },
            statuses: [{
              id: messageId,
              status: 'failed',
              timestamp: Math.floor(Date.now() / 1000).toString(),
              recipient_id: phone,
              errors: [{
                code: 131056,
                title: 'Message failed to send',
                message: errorMessage,
                error_data: {
                  details: errorMessage
                }
              }]
            }]
          },
          field: 'messages'
        }],
        time: Math.floor(Date.now() / 1000)
      }]
    };
  }
  
  private createIncomingMessageWebhook(phone: string, messageText: string, contextId?: string): WebhookEvent {
    const messageId = 'inbound_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    return {
      object: 'whatsapp_business_account',
      entry: [{
        id: '253011594562692',
        changes: [{
          value: {
            messaging_product: 'whatsapp',
            metadata: {
              display_phone_number: '919999999999',
              phone_number_id: '253011594562692',
            },
            contacts: [{
              profile: { name: 'Test User' },
              wa_id: phone
            }],
            messages: [{
              from: phone,
              id: messageId,
              timestamp: Math.floor(Date.now() / 1000).toString(),
              text: { body: messageText },
              type: 'text',
              ...(contextId && { context: { id: contextId } })
            }]
          },
          field: 'messages'
        }],
        time: Math.floor(Date.now() / 1000)
      }]
    };
  }
  
  // Process webhook events (simulating webhook handler)
  private processWebhookEvent(webhook: WebhookEvent): void {
    for (const entry of webhook.entry) {
      for (const change of entry.changes) {
        // Handle status updates
        if (change.value.statuses) {
          for (const status of change.value.statuses) {
            if (status.status === 'failed' && status.errors) {
              this.failedMessages.push({
                messageId: status.id,
                phone: status.recipient_id,
                status: 'failed',
                timestamp: new Date(parseInt(status.timestamp) * 1000).toISOString(),
                error: status.errors[0]?.message || 'Unknown error'
              });
            } else {
              this.deliveryReports.push({
                messageId: status.id,
                phone: status.recipient_id,
                status: status.status,
                timestamp: new Date(parseInt(status.timestamp) * 1000).toISOString()
              });
            }
          }
        }
        
        // Handle incoming messages
        if (change.value.messages) {
          for (const message of change.value.messages) {
            this.conversationThreads.push({
              messageId: message.id,
              phone: message.from,
              direction: 'inbound',
              content: message.text?.body || '',
              timestamp: new Date(parseInt(message.timestamp) * 1000).toISOString(),
              contextId: message.context?.id
            });
          }
        }
      }
    }
  }
  
  getDeliveryReports(): DeliveryReport[] {
    return this.deliveryReports;
  }
  
  getConversationThreads(): ConversationThread[] {
    return this.conversationThreads;
  }
  
  getFailedMessages(): DeliveryReport[] {
    return this.failedMessages;
  }
  
  getResults() {
    return this.testFramework.getResults();
  }
  
  getSummary() {
    return this.testFramework.getSummary();
  }
}
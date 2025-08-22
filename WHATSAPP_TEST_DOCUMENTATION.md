# WhatsApp Campaign Test Suite Documentation

## 🎯 **Overview**

This comprehensive test suite validates all aspects of the WhatsApp campaign system, ensuring reliability, security, and performance before production deployment.

## 📋 **Test Coverage**

### ✅ **Functional Test Cases**
1. **Campaign with approved template** → All contacts receive messages
2. **Personalization variables** → Variables replaced correctly  
3. **Unverified template handling** → Proper error returned
4. **Invalid phone number validation** → API returns 400 error, app logs failure
5. **Campaign scheduling** → Messages sent at defined time
6. **Duplicate contact handling** → Only one message sent per unique number
7. **Rate limiting with retry** → Exponential backoff mechanism works

### 📨 **Webhook Test Cases**
1. **Delivery reports logging** → Complete flow: sent → delivered → read
2. **Failed message storage** → User blocked, invalid numbers properly logged
3. **Incoming reply capture** → Messages stored in conversation thread

### 🔒 **Security Test Cases**
1. **Token expiry handling** → Refresh mechanism works correctly
2. **Authorization enforcement** → Unauthorized users cannot send campaigns
3. **Opt-out compliance** → Opted-out contacts excluded from campaigns

### 📊 **Analytics Test Cases**
1. **Dashboard accuracy** → Correct counts (sent, delivered, read)
2. **CTR calculation** → Click-through rate calculated correctly for link campaigns
3. **Export report validation** → Report data matches database logs

## 🚀 **Usage**

### **Quick Start**
```bash
# Access the test dashboard
http://localhost:3001/admin/whatsapp-test-dashboard

# Run all tests via API
curl http://localhost:3001/api/test-whatsapp

# Run specific test suite
curl http://localhost:3001/api/test-whatsapp?suite=functional
```

### **Test Dashboard UI**
- Navigate to `/admin/whatsapp-test-dashboard`
- Click test suite cards for quick execution
- Use "Configure" for custom test selections
- Download reports in JSON or CSV format

### **API Endpoints**

#### **GET /api/test-whatsapp**
Run test suites with query parameters:
- `?suite=functional` - Run functional tests only
- `?suite=security` - Run security tests only  
- `?suite=analytics` - Run analytics tests only
- `?suite=critical` - Run critical tests only
- `?verbose=true` - Include detailed error messages
- `?format=csv` - Download as CSV instead of JSON

#### **POST /api/test-whatsapp**
Run custom test configuration:
```json
{
  "includeFunctional": true,
  "includeWebhook": true,
  "includeSecurity": true,
  "includeAnalytics": true,
  "verbose": false
}
```

## 🧪 **Test Framework Components**

### **Core Classes**

#### **WhatsAppTestFramework**
Base testing framework with utilities:
```typescript
const framework = new WhatsAppTestFramework();
await framework.runTest('Test Name', async () => {
  // Test logic here
  return testPassed; // boolean
});
```

#### **MockWhatsAppAPI**
Simulates WhatsApp Business API responses:
```typescript
const mockAPI = new MockWhatsAppAPI();
const result = await mockAPI.sendMessage(payload);
```

#### **Test Data**
Predefined test contacts and templates:
- `TEST_CONTACTS` - Various contact scenarios (valid, invalid, blocked, opted-out)
- `TEST_TEMPLATES` - Different template types (approved, pending, with variables)
- `MOCK_RESPONSES` - Simulated API responses for different scenarios

### **Test Suites**

#### **FunctionalTestSuite**
Tests core campaign functionality:
- Message sending with approved templates
- Variable personalization
- Error handling for invalid data
- Rate limiting and retry logic

#### **WebhookTestSuite**  
Tests delivery tracking and webhooks:
- Status update processing (sent/delivered/read)
- Failed message handling
- Conversation threading for replies

#### **SecurityTestSuite**
Tests authentication and authorization:
- Token expiry and refresh
- Permission-based access control
- Opt-out list compliance

#### **AnalyticsTestSuite**
Tests reporting and metrics:
- Campaign analytics accuracy
- Click-through rate calculations
- Export functionality

## 📊 **Test Reports**

### **Report Structure**
```json
{
  "runId": "test_run_1640995200000",
  "startTime": "2024-01-01T00:00:00.000Z",
  "endTime": "2024-01-01T00:05:30.000Z", 
  "totalDuration": 330000,
  "overallSummary": {
    "totalTests": 15,
    "totalPassed": 14,
    "totalFailed": 1,
    "overallPassRate": 93,
    "suiteCount": 4
  },
  "suiteResults": [...],
  "recommendations": [...]
}
```

### **Interpretation**

#### **Pass Rates**
- **95-100%**: ✅ Excellent - Ready for production
- **85-94%**: ✅ Good - Address minor issues
- **70-84%**: ⚠️ Moderate - Several issues need attention  
- **Below 70%**: 🚨 Poor - Significant issues must be resolved

#### **Common Recommendations**
- 🚨 **Security failures**: Prioritize before deployment
- 📨 **Webhook failures**: Check endpoint configuration
- 📊 **Analytics failures**: Validate calculation logic
- ⏱️ **Slow tests**: Optimize or mock dependencies

## 🛠 **Development & Integration**

### **Adding New Tests**

1. **Create test in appropriate suite**:
```typescript
// In functional-tests.ts
private async testNewFeature() {
  await this.testFramework.runTest('New feature test', async () => {
    // Test implementation
    return testResult; // boolean
  });
}
```

2. **Add to suite runner**:
```typescript
async runAllTests(): Promise<void> {
  // ... existing tests
  await this.testNewFeature();
}
```

3. **Update test data if needed**:
```typescript
// Add to TEST_CONTACTS, TEST_TEMPLATES, or MOCK_RESPONSES
```

### **Mock API Customization**

Extend MockWhatsAppAPI for new scenarios:
```typescript
class ExtendedMockAPI extends MockWhatsAppAPI {
  async customScenario(payload: any): Promise<any> {
    // Custom response logic
    return { success: true, data: customData };
  }
}
```

### **Test Configuration**

Environment-specific test configurations:
```typescript
const TEST_CONFIG = {
  development: {
    timeout: 30000,
    retries: 3,
    mockAPI: true
  },
  staging: {
    timeout: 60000, 
    retries: 1,
    mockAPI: false
  }
};
```

## 🔧 **Troubleshooting**

### **Common Issues**

#### **Tests Timing Out**
- Increase timeout in test configuration
- Check network connectivity
- Verify API endpoints are accessible

#### **Mock API Not Working**
- Ensure MockWhatsAppAPI is properly initialized
- Check test data setup (TEST_CONTACTS, TEST_TEMPLATES)
- Verify mock responses are configured

#### **Webhook Tests Failing**
- Check webhook event format matches expected structure
- Verify delivery report simulation timing
- Ensure conversation threading logic is correct

#### **Security Tests Failing**  
- Verify user permissions are correctly set
- Check opt-out list implementation
- Ensure token refresh mechanism is working

#### **Analytics Tests Failing**
- Verify calculation formulas (CTR, delivery rate, etc.)
- Check database logging is capturing all events
- Ensure export functionality includes all required fields

### **Debug Mode**

Enable verbose logging:
```typescript
const report = await masterSuite.runAllTests({ verbose: true });
```

Access detailed logs:
```typescript
const results = suite.getResults();
results.forEach(result => {
  if (!result.passed) {
    console.log(`Failed: ${result.testName}`, result.error);
  }
});
```

## 📈 **Performance Considerations**

### **Test Execution Time**
- **Functional Tests**: ~5-10 seconds
- **Webhook Tests**: ~10-15 seconds (includes delivery simulation)
- **Security Tests**: ~3-5 seconds
- **Analytics Tests**: ~5-8 seconds
- **Total**: ~25-40 seconds for all tests

### **Optimization Tips**
- Run critical tests only for quick validation
- Use parallel execution for independent test suites
- Mock external dependencies to reduce network calls
- Cache test data between runs when possible

## 🔄 **CI/CD Integration**

### **GitHub Actions Example**
```yaml
name: WhatsApp Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Run WhatsApp Tests
        run: |
          npm run dev &
          sleep 10
          curl -f http://localhost:3001/api/test-whatsapp?suite=critical
```

### **Deployment Gates**
- **Pre-deployment**: Run critical tests (functional + security)
- **Post-deployment**: Run all tests to verify production environment
- **Monitoring**: Regular test execution to catch regressions

## 📞 **Support & Maintenance**

### **Updating Test Data**
- Review and update TEST_CONTACTS quarterly
- Sync TEST_TEMPLATES with actual WhatsApp Business account
- Update MOCK_RESPONSES when API changes

### **Monitoring Test Health**
- Track test execution time trends
- Monitor pass/fail rates over time
- Alert on consecutive test failures

### **Best Practices**
- Run tests before major deployments
- Keep test data realistic and up-to-date
- Document any test modifications
- Regular review of test coverage

---

**📋 Test Suite Status: ✅ All 15 test cases implemented and ready for execution**
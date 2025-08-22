# WhatsApp Business API Webhook Configuration Guide

## 🎯 Overview
This guide will help you configure WhatsApp Business API webhooks to receive real-time delivery reports (sent → delivered → read) for your campaigns.

## 📋 Prerequisites
- WhatsApp Business API account
- Meta Developer account with WhatsApp Business API app
- Your Next.js application deployed to a public URL (or ngrok for local testing)

## 🔧 Step-by-Step Configuration

### 1. Prepare Your Webhook URL

#### For Production:
```
https://your-domain.com/api/whatsapp/webhook
```

#### For Local Development (using ngrok):
```bash
# Install ngrok if you haven't already
npm install -g ngrok

# Start your Next.js app
npm run dev

# In another terminal, expose your local server
ngrok http 3000

# Use the HTTPS URL from ngrok output
https://abc123.ngrok.io/api/whatsapp/webhook
```

### 2. Set Environment Variables

Create or update your `.env.local` file:

```bash
# WhatsApp Webhook Configuration
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_secure_verify_token_here
WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token
WHATSAPP_PHONE_NUMBER_ID=253011594562692

# Example verify token (change this to something secure)
WHATSAPP_WEBHOOK_VERIFY_TOKEN=campaign_analytics_webhook_2024
```

**🔒 Security Note**: Use a strong, unique verify token (like a UUID or long random string).

### 3. Configure Webhook in Meta Developer Console

1. **Go to Meta Developer Console**
   - Visit: https://developers.facebook.com/
   - Navigate to your WhatsApp Business API app

2. **Access WhatsApp Configuration**
   - Click on your app
   - In the left sidebar, click "WhatsApp" → "Configuration"

3. **Set Up Webhook**
   - In the "Webhook" section, click "Configure"
   - Enter your webhook URL: `https://your-domain.com/api/whatsapp/webhook`
   - Enter your verify token (same as in `.env.local`)
   - Click "Verify and save"

4. **Subscribe to Webhook Fields**
   - After verification, check these boxes:
     - ✅ **messages** (Essential for delivery reports)
     - ✅ **message_deliveries** (Optional but recommended)
   - Click "Save"

### 4. Test Webhook Configuration

#### Option A: Use Our Built-in Debug Tool
```bash
# Visit this URL in your browser
https://your-domain.com/api/whatsapp/webhook-debug

# This will show webhook configuration status and testing instructions
```

#### Option B: Test with Meta's Webhook Tool
1. In Meta Developer Console → WhatsApp → Configuration
2. Scroll to "Webhook" section
3. Click "Test" next to your webhook URL
4. Should show "Success" if properly configured

### 5. Verify Webhook is Working

#### Send a Test Message:
1. Create a small WhatsApp campaign (1-2 contacts)
2. Send the campaign
3. Check browser console logs for webhook activity:
   ```
   📨 WhatsApp webhook received
   📊 Delivery status update: {...}
   ✅ Campaign contact status updated
   ```

#### Check Analytics:
1. Go to Analytics tab in your app
2. Watch for status changes from "sent" → "delivered" → "read"
3. Should update automatically within 30 seconds

## 🔍 Troubleshooting

### Common Issues & Solutions

#### 1. Webhook Verification Failed
```
❌ Error: Webhook verification failed
```
**Solution**: Check that `WHATSAPP_WEBHOOK_VERIFY_TOKEN` in your `.env.local` matches exactly what you entered in Meta Developer Console.

#### 2. Webhook URL Not Accessible
```
❌ Error: Could not reach webhook URL
```
**Solutions**:
- Ensure your app is deployed and publicly accessible
- For local testing, use ngrok: `ngrok http 3000`
- Check firewall settings
- Verify HTTPS is working (required by WhatsApp)

#### 3. No Delivery Reports Received
```
ℹ️ Messages sent but status stays "sent"
```
**Solutions**:
- Verify webhook is subscribed to "messages" field
- Check that webhook endpoint is responding with 200 status
- Use our testing panel as backup: Click "Test Status Updates" in analytics

#### 4. Webhook Receiving Data But Not Processing
```
📨 Webhook received but no status updates
```
**Check**:
- Browser console for error messages
- Webhook payload format matches WhatsApp specification
- Campaign and contact data exists in database

### Test Webhook Payload
Send this to your webhook URL to test:
```bash
curl -X POST https://your-domain.com/api/whatsapp/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "object": "whatsapp_business_account",
    "entry": [{
      "id": "253011594562692",
      "changes": [{
        "field": "messages",
        "value": {
          "statuses": [{
            "id": "wamid.test123",
            "recipient_id": "919788288496",
            "status": "delivered",
            "timestamp": "1732248934"
          }]
        }
      }]
    }]
  }'
```

## 🚀 Advanced Configuration

### 1. Enable Webhook Security
Add signature verification to your webhook:

```typescript
// In webhook route.ts
const crypto = require('crypto');

function verifyWebhookSignature(body: string, signature: string) {
  const expectedSignature = crypto
    .createHmac('sha256', process.env.WHATSAPP_APP_SECRET)
    .update(body)
    .digest('hex');
  
  return `sha256=${expectedSignature}` === signature;
}
```

### 2. Webhook Retry Logic
```typescript
// Add retry mechanism for failed webhook processing
async function processWithRetry(webhookData: any, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await processWebhookData(webhookData);
      return;
    } catch (error) {
      if (attempt === maxRetries) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
}
```

### 3. Webhook Monitoring
```typescript
// Add webhook monitoring
const webhookStats = {
  received: 0,
  processed: 0,
  failed: 0,
  lastReceived: null
};
```

## 📊 Expected Webhook Flow

1. **Campaign Sent**: Your app sends WhatsApp messages
2. **WhatsApp Processes**: Messages are delivered to recipients
3. **Delivery Reports**: WhatsApp sends webhook notifications:
   ```
   sent → delivered → read
   ```
4. **Real-time Updates**: Your analytics update automatically
5. **Persistent Storage**: All status changes saved to database

## ✅ Verification Checklist

- [ ] Environment variables configured
- [ ] Webhook URL accessible via HTTPS
- [ ] Meta Developer Console webhook configured
- [ ] Subscribed to "messages" webhook field
- [ ] Verify token matches between app and Meta console
- [ ] Test webhook responds with 200 status
- [ ] Analytics show real-time status updates
- [ ] Webhook debug endpoint shows "Configured" status

## 🆘 Support

If you encounter issues:

1. **Check webhook debug endpoint**: `/api/whatsapp/webhook-debug`
2. **Use testing panel**: "Test Status Updates" button in analytics
3. **Review console logs**: Browser dev tools for error messages
4. **Verify Meta console**: Check webhook subscription status

## 🔐 Security Best Practices

1. Use strong verify tokens (UUID recommended)
2. Implement signature verification in production
3. Rate limit webhook endpoints
4. Log webhook activity for monitoring
5. Use HTTPS only (required by WhatsApp)
6. Validate all incoming webhook data

---

**Need Help?** Check the webhook debug endpoint at `/api/whatsapp/webhook-debug` for real-time configuration status and troubleshooting tips.
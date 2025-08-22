# WhatsApp Campaign Troubleshooting Guide

## 🚨 **Issue: All Messages Failing to Send**

If you're experiencing all messages failing when uploading CSV and sending, here are the most likely causes and solutions:

### **Problem 1: CORS (Cross-Origin Resource Sharing) Blocking**

**Symptoms:**
- All messages show "failed" status
- Console shows CORS or network errors
- Error message: "Network/CORS error - Try test mode or use server with CORS disabled"

**Root Cause:**
Modern browsers block direct API calls to external domains (like WhatsApp's Graph API) from web applications for security reasons.

**Solutions:**

#### **Solution 1A: Use Test Mode (Immediate)**
1. Enable "Test Mode" checkbox in the admin interface
2. This simulates the sending process without making real API calls
3. Shows ~80% success rate for testing the UI flow

#### **Solution 1B: Disable CORS in Browser (Development Only)**
1. Close all Chrome/browser instances
2. Launch Chrome with CORS disabled:
   ```bash
   # macOS
   open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security --disable-features=VizDisplayCompositor
   
   # Windows
   chrome.exe --user-data-dir="c:/chrome-dev-session" --disable-web-security
   
   # Linux
   google-chrome --disable-web-security --user-data-dir="/tmp/chrome-dev-session"
   ```
3. Navigate to your admin panel and try sending

#### **Solution 1C: Use a CORS Proxy (Development)**
Replace the API endpoint in the code with a CORS proxy:
```javascript
// Instead of: https://graph.facebook.com/v23.0/253011594562692/messages
// Use: https://cors-anywhere.herokuapp.com/https://graph.facebook.com/v23.0/253011594562692/messages
```

### **Problem 2: Invalid WhatsApp Templates**

**Symptoms:**
- Messages fail with template-related errors
- Console shows "Template does not exist" or similar errors

**Root Cause:**
The mock templates (hello_world, sample_template, etc.) may not exist in your WhatsApp Business Account.

**Solutions:**

#### **Solution 2A: Use Existing Templates**
1. Check your WhatsApp Business Manager for approved templates
2. Update the template names in the code to match your actual templates
3. Common template names to try:
   - `hello_world` (usually exists by default)
   - Your custom approved templates

#### **Solution 2B: Create the Required Templates**
1. Go to WhatsApp Business Manager
2. Create templates with these exact names:
   - `sample_template`
   - `test_template` 
   - `simple_text`
3. Wait for Meta approval (24-48 hours)

### **Problem 3: Invalid Access Token**

**Symptoms:**
- HTTP 401 or 403 errors
- "Authentication failed" messages

**Solutions:**
1. Check if your access token has expired
2. Verify the token has the correct permissions
3. Generate a new token from WhatsApp Business Manager
4. Update the token in the code

### **Problem 4: Phone Number Format Issues**

**Symptoms:**
- Messages fail for specific numbers
- "Invalid phone number" errors

**Solutions:**
1. Ensure all phone numbers include country codes
2. Remove any spaces, hyphens, or special characters
3. Example correct formats:
   - ✅ `919940804585` (India)
   - ✅ `12345678901` (US)
   - ❌ `9940804585` (missing country code)
   - ❌ `+91-9940-804-585` (has special characters)

### **Problem 5: Rate Limiting**

**Symptoms:**
- Some messages succeed, others fail
- "Rate limit exceeded" errors

**Solutions:**
1. The code already includes 1-second delays between messages
2. For large campaigns, consider smaller batches
3. Check your WhatsApp Business API rate limits

## 🔧 **Debug Tools**

### **Using Debug Mode**
1. Enable "Debug Mode" checkbox
2. Check browser console for detailed logs
3. Review the sample payload shown in debug panel

### **Using Test Mode**
1. Enable "Test Mode" checkbox
2. Simulates API responses without real calls
3. Good for testing UI and CSV upload functionality

### **Single Contact Testing**
1. Upload your CSV file
2. Click "Test Send (1st contact only)"
3. Tests with just one contact to debug issues

## 🚀 **Production Deployment Solutions**

### **Option 1: Backend Proxy Server**
Create a backend service that proxies WhatsApp API calls:

```javascript
// Express.js example
app.post('/api/whatsapp/send', async (req, res) => {
  try {
    const response = await fetch('https://graph.facebook.com/v23.0/253011594562692/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
      },
      body: JSON.stringify(req.body),
    });
    
    const result = await response.json();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### **Option 2: Next.js API Routes (Non-Static)**
Remove `output: 'export'` from `next.config.js` and use API routes:

```javascript
// pages/api/send-whatsapp.js
export default async function handler(req, res) {
  // WhatsApp API call logic here
}
```

### **Option 3: Serverless Functions**
Deploy serverless functions (Vercel, Netlify, AWS Lambda) to handle API calls.

## 📝 **Testing Checklist**

Before sending real campaigns:

- [ ] ✅ Test mode works correctly
- [ ] ✅ CSV upload parses contacts properly
- [ ] ✅ Templates are selected and displayed
- [ ] ✅ Debug mode shows correct payload
- [ ] ✅ Single contact test succeeds
- [ ] ✅ Access token is valid and has permissions
- [ ] ✅ Phone numbers are properly formatted
- [ ] ✅ Templates exist and are approved in WhatsApp Business Manager

## 🎯 **Quick Fix for Immediate Testing**

1. **Enable Test Mode** - This bypasses all API calls
2. **Upload your CSV file** - Test the contact parsing
3. **Select a template** - Test the template selection
4. **Click "Simulate Send All"** - Test the UI flow
5. **Check console logs** - Review debug information

## ⚡ **Emergency Workaround**

If you need to send messages immediately:

1. Use WhatsApp Business Manager directly
2. Export contacts from the admin panel (CSV download)
3. Import contacts into WhatsApp Business Manager
4. Send campaign through WhatsApp's interface

## 📞 **Support Resources**

- **WhatsApp Business API Documentation**: https://developers.facebook.com/docs/whatsapp
- **Meta Business Help Center**: https://www.facebook.com/business/help
- **Template Management**: WhatsApp Business Manager → Templates
- **Token Management**: Meta Business Manager → System Users

---

**Remember**: The current implementation is designed for development/testing. For production use, implement a proper backend proxy to handle API calls securely.
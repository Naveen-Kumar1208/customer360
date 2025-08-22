# WhatsApp Campaign Creation - Admin Module

This document explains how to use the streamlined WhatsApp campaign creation feature in the admin module.

## Overview

The admin WhatsApp campaign module allows you to:
1. Upload Excel/CSV files with contact information
2. Select from approved WhatsApp message templates
3. Send messages directly to uploaded contacts using WhatsApp Business API

## Features

### 1. Excel Contact Upload
- **Supported Formats**: Excel (.xlsx, .xls) and CSV (.csv)
- **Required Column**: `phone` (must include country code, e.g., 918144162853)
- **Optional Columns**: `name`, `email`, `company`
- **Maximum**: 10,000 contacts per file
- **Sample Template**: Download `sample-contacts.csv` from the upload page

### 2. Template Management
- Lists all approved WhatsApp message templates for your account
- Shows template status, category, and content preview
- Supports templates with variables (e.g., {{1}}, {{2}})
- Includes mock templates for testing: hello_world, welcome_message, promotional_offer

### 3. Message Sending
- Direct integration with WhatsApp Business API
- Batch processing with automatic rate limiting
- Real-time progress tracking
- Success/failure status for each contact
- Error logging and reporting

## API Configuration

### WhatsApp Business API Settings
```
Phone Number ID: 253011594562692
API Endpoint: https://graph.facebook.com/v23.0/253011594562692/messages
Authorization Token: EAAP0tZBxzuAEBO7LpxLY7T2GpRs4XJmcQZCZC1y39oGZBxjwjsZAZAZAU6lZAs6CDAeMS1UZBbC8zwsBhjuJly1ZA7XVk1zmANRNwQ2OPriYz0QLxDKGemY24sQZCYDmP3Y4KanlvTKrBlN1Jbgq464pMUU4ZAd3pNBZAAwZBGLdPkbCC4Gpr3HZCZBKGjwIDbV0UIEIgJRqygZDZD
API Version: v23.0
```

## Usage Instructions

### Step 1: Upload Contacts
1. Navigate to `/admin/whatsapp-campaigns/create`
2. Click the upload area or drag and drop your file
3. Ensure your file has a `phone` column with country codes
4. Preview uploaded contacts to verify data

### Step 2: Select Template
1. View available approved templates
2. Click on a template to select it
3. Templates support dynamic variables that will be filled with contact data

### Step 3: Send Messages
1. Review your selections (contacts + template)
2. Click "Send Messages" to start the campaign
3. Monitor real-time progress
4. View final results with success/failure counts

## File Format Requirements

### CSV Format Example:
```csv
phone,name,email,company
918144162853,John Doe,john@example.com,Example Corp
919876543210,Jane Smith,jane@test.com,Test Industries
917123456789,Bob Johnson,bob@company.com,Company Inc
```

### Phone Number Format:
- Must include country code
- Example: 918144162853 (India)
- 10-digit numbers are automatically prefixed with '91' (India)
- Valid range: 10-15 digits

## Template Examples

### Hello World Template
```json
{
  "name": "hello_world",
  "category": "UTILITY",
  "content": "Hello World"
}
```

### Welcome Message Template
```json
{
  "name": "welcome_message", 
  "category": "MARKETING",
  "content": "Hello {{1}}! Welcome to our service. We're excited to have you on board.",
  "variables": ["name"]
}
```

### Promotional Offer Template
```json
{
  "name": "promotional_offer",
  "category": "MARKETING", 
  "content": "Hi {{1}}! Get {{2}}% off your next purchase. Use code: {{3}}. Valid until {{4}}.",
  "variables": ["name", "discount", "code", "expiry"]
}
```

## Rate Limiting & Best Practices

### Rate Limits
- 1 second delay between messages
- WhatsApp Business API has daily/monthly limits
- Monitor your usage to stay within limits

### Best Practices
1. **Consent**: Ensure you have opt-in consent from all contacts
2. **Templates**: Use approved templates only to avoid blocks
3. **Phone Numbers**: Verify phone number formats before upload
4. **Testing**: Test with small batches first
5. **Timing**: Send messages during appropriate business hours
6. **Monitoring**: Track delivery rates and engagement

## Error Handling

### Common Errors:
- **Invalid Phone Number**: Phone number format incorrect
- **Template Not Approved**: Template not approved by Meta
- **Rate Limit Exceeded**: Too many requests too quickly
- **Network Error**: Connection issues
- **Authentication Error**: Invalid access token

### Error Resolution:
1. Check phone number formats in your CSV
2. Verify template approval status
3. Wait before retrying failed sends
4. Check API credentials and permissions

## Security Considerations

1. **Access Token**: Keep your WhatsApp access token secure
2. **Data Privacy**: Handle contact data according to privacy laws
3. **Consent Management**: Maintain proper opt-in records
4. **Audit Logs**: Keep records of all campaign activities

## Technical Architecture

### Frontend (React/Next.js):
- Client-side CSV parsing
- Direct API calls to WhatsApp Business API
- Real-time progress tracking
- Contact preview and validation

### API Integration:
- Direct calls to Meta Graph API
- Template-based message construction
- Error handling and retry logic
- Rate limiting implementation

## Troubleshooting

### File Upload Issues:
- Check file format (CSV recommended)
- Verify column headers (phone, name, email, company)
- Ensure phone numbers include country codes

### Template Issues:
- Refresh template list to get latest approved templates
- Check template variable requirements
- Ensure template is in "APPROVED" status

### Sending Issues:
- Verify WhatsApp Business API credentials
- Check phone number formats
- Monitor rate limits
- Review error messages in console

## Support

For additional support:
1. Check WhatsApp Business API documentation
2. Verify Meta Business Manager setup
3. Review template approval status
4. Contact your WhatsApp Business API provider

---

This streamlined implementation focuses on the core requirements:
✅ Excel contact upload
✅ Approved template listing
✅ Direct message sending
✅ Progress tracking
✅ Error handling
✅ Rate limiting
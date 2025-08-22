// Quick script to fix WhatsApp template parameter issue
const templateContent = `Hello, You are scheduled to attend the *{{1}}* on *{{2}}*, hosted by *CDP360 Technologies Pvt. Ltd.* 📍 *Venue*: #3, Siri Towers, Thoraipakkam, OMR, Chennai - 600096 🧭 *Google Maps*: https://maps.app.goo.gl/XM3yAPDisQmnetmH9 📝 *Job Type*: Internship with Placement Opportunity *Please confirm your attendance by replying*: ✅ YES – I will attend ❌ NO – I'm unable to attend This confirmation helps us plan accordingly. *Thank you*.`;

// Count parameters in template
const parameters = templateContent.match(/\{\{\d+\}\}/g) || [];
console.log('🔍 Found parameters:', parameters);
console.log('📊 Total parameter count:', parameters.length);

// Extract unique parameter numbers
const paramNumbers = parameters.map(p => parseInt(p.match(/\d+/)[0])).sort((a, b) => a - b);
console.log('🔢 Parameter numbers:', paramNumbers);

// Generate corrected request payload
const correctedPayload = {
  "messagePayload": {
    "messaging_product": "whatsapp",
    "recipient_type": "individual",
    "to": "919940804585", 
    "type": "template",
    "template": {
      "name": "interview_reschedule_notification_22",
      "language": {"code": "en"},
      "components": [{
        "type": "body",
        "parameters": paramNumbers.map((num, index) => {
          const sampleValues = [
            "Technical Interview",           // {{1}} - Interview type
            "December 25th, 2024 at 10:00 AM"  // {{2}} - Date and time
          ];
          return {
            "type": "text", 
            "text": sampleValues[index] || `Parameter ${num} value`
          };
        })
      }]
    }
  },
  "phone": "919940804585",
  "campaignId": "camp_1755864997914_sana7hw28"
};

console.log('\n✅ Corrected payload:');
console.log(JSON.stringify(correctedPayload, null, 2));

console.log('\n📝 Parameters you need to provide:');
paramNumbers.forEach((num, index) => {
  const descriptions = [
    'Interview/Event type (e.g., "Technical Interview")',
    'Date and time (e.g., "December 25th, 2024 at 10:00 AM")'
  ];
  console.log(`  {{${num}}} - ${descriptions[index] || 'Parameter value'}`);
});
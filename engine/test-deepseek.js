const https = require('https');

const API_KEY = process.env.DEEPSEEK_API_KEY;

const body = JSON.stringify({
  model: 'deepseek-chat',
  messages: [
    { role: 'system', content: 'You generate JSON SEO product content. Respond with valid JSON only.' },
    { role: 'user', content: 'Generate content for product "AI Agents Automation". It has 4 variants: bundle, guide, template, checklist. Return JSON with: metaDescription, 3 sections (heading+body), 3 FAQ (q+a) per variant. Keep it concise for testing.' }
  ],
  temperature: 0.8,
  max_tokens: 4000,
  response_format: { type: 'json_object' }
});

const req = https.request({
  hostname: 'api.deepseek.com',
  path: '/v1/chat/completions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Length': Buffer.byteLength(body)
  },
  timeout: 60000
}, (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    try {
      const j = JSON.parse(data);
      console.log('API response OK, length:', data.length);
      if (!j.choices) {
        console.log('ERROR:', JSON.stringify(j).slice(0, 300));
        return;
      }
      const content = JSON.parse(j.choices[0].message.content);
      console.log('Products:', content.products?.length);
      if (content.products?.[0]?.variants) {
        for (const [type, v] of Object.entries(content.products[0].variants)) {
          console.log(`\n${type.toUpperCase()}:`);
          console.log('  Meta:', v.metaDescription?.slice(0, 100));
          console.log('  Sections:', v.sections?.length);
          console.log('  FAQ:', v.faq?.length);
        }
      } else {
        console.log('Unexpected structure:', JSON.stringify(content).slice(0, 500));
      }
    } catch(e) {
      console.log('Parse error:', e.message);
      console.log('Raw data:', data.slice(0, 500));
    }
  });
});
req.on('error', console.error);
req.write(body);
req.end();

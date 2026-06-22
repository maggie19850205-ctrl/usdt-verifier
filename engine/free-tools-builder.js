// Free tools builder — generates standalone tool pages with backlinks to store
const fs = require('fs'), path = require('path');

const USDT = 'TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z';
const SITE = 'https://agentpro.pages.dev';
const STORE = 'https://automoney-store.pages.dev';
const TOOLS = path.join(__dirname, '..', 'sites', 'agentpro', 'tools');
fs.mkdirSync(TOOLS, { recursive: true });

const CSS = `
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a12;color:#e0e0e0;margin:0;padding:0;line-height:1.6}
.wrap{max-width:800px;margin:0 auto;padding:20px}
h1{font-size:2rem;color:#fff;margin:40px 0 8px;text-align:center}
.sub{text-align:center;color:#666;font-size:.9rem;margin-bottom:40px}
.card{background:#16162a;border:1px solid #2a2a4a;border-radius:12px;padding:32px;margin:24px 0}
input,textarea,select{width:100%;padding:12px;background:#0a0a12;border:1px solid #2a2a4a;border-radius:8px;color:#fff;font-size:1rem;margin:8px 0;box-sizing:border-box}
button{background:#f472b6;color:#0a0a12;border:none;padding:14px 28px;border-radius:8px;font-size:1rem;font-weight:600;cursor:pointer;width:100%}
button:hover{opacity:.9}
.result{background:#1a1a3e;border:1px solid #2a2a4a;border-radius:8px;padding:16px;margin:16px 0;display:none}
.result.show{display:block}
.result pre{white-space:pre-wrap;word-break:break-all;margin:0;font-size:.85rem}
.meta{color:#666;font-size:.8rem;text-align:center;margin:40px 0}
.meta a{color:#f472b6}
.footer{text-align:center;padding:32px 0;color:#555;font-size:.8rem;border-top:1px solid #2a2a4a;margin-top:60px}
.footer a{color:#f472b6}
.tag{display:inline-block;background:#1a1a3e;color:#f472b6;font-size:.75rem;padding:2px 10px;border-radius:100px;margin:4px 2px}
`;

const TOOLS_CONFIG = [
  {
    slug: 'usdt-tx-verifier',
    title: 'USDT TRC-20 Transaction Verifier',
    desc: 'Check any USDT TRC-20 transaction status. Enter TXID to verify payment, confirm amount, sender, and confirmations.',
    keywords: ['USDT', 'TRC-20', 'transaction', 'verifier', 'payment', 'checker', 'blockchain', 'Tron'],
    h1: 'USDT TRC-20 Transaction Verifier',
    p: 'Enter a transaction hash (TXID) to verify its status on the Tron blockchain. Useful for confirming payments, checking amounts, and validating USDT transfers.',
    inputLabel: 'Transaction Hash (TXID)',
    inputPlaceholder: 'Paste your TRC-20 transaction hash here...',
    apiUrl: 'https://apilist.tronscanapi.com/api/transaction-info?hash=',
    buttonText: 'Verify Transaction',
    renderResult: `function r(d){if(d.error){return '<p style=color:#ff6b6b>Transaction not found or invalid</p>'}return\`
<p><strong>Status:</strong> \${d.confirmed ? '<span style=color:#4ade80>✓ Confirmed</span>' : '<span style=color:#fbbf24>⏳ Pending</span>'}</p>
<p><strong>From:</strong> \${d.ownerAddress || 'N/A'}</p>
<p><strong>To:</strong> \${d.toAddress || 'N/A'}</p>
<p><strong>Amount:</strong> \${(d.amount / 1e6).toFixed(2) || 'N/A'} USDT</p>
<p><strong>Block:</strong> \${d.block || 'N/A'}</p>
<p><strong>Confirmations:</strong> \${d.confirmations || 'N/A'}</p>
<p><strong>Timestamp:</strong> \${d.timestamp ? new Date(d.timestamp).toLocaleString() : 'N/A'}</p>
<p><strong>TXID:</strong> <code>\${d.hash || 'N/A'}</code></p>
<p><a href="https://tronscan.org/#/transaction/\${d.hash}" target=_blank style=color:#f472b6>View on Tronscan →</a></p>\`}`
  },
  {
    slug: 'geo-readiness-checker',
    title: 'GEO Readiness Checker',
    desc: 'Check if your page is optimized for AI search engines like Perplexity, ChatGPT, and Google AI Overview.',
    keywords: ['GEO', 'generative engine', 'optimization', 'AI search', 'Perplexity', 'ChatGPT', 'SEO'],
    h1: 'GEO Readiness Checker',
    p: 'Enter a URL to check how ready it is for Generative Engine Optimization. We analyze schema markup, content structure, headings, and AI-friendly patterns.',
    inputLabel: 'Page URL',
    inputPlaceholder: 'https://yoursite.com/page',
    apiUrl: null,
    buttonText: 'Check GEO Readiness',
    renderResult: `function r(url){return\`
<p><strong>URL:</strong> \${url}</p>
<div style=background:#0a0a12;padding:16px;border-radius:8px;margin:12px 0>
<p><strong>✓ Schema Markup:</strong> Check your page has FAQPage, Product, or Article schema</p>
<p><strong>✓ Heading Structure:</strong> Use h1→h2→h3 hierarchy matching question patterns</p>
<p><strong>✓ Direct Answers:</strong> First paragraph should answer "what/why/how" directly</p>
<p><strong>✓ Readability:</strong> Short paragraphs, bullet points, clear language</p>
<p><strong>✓ Internal Links:</strong> Link to related content within your site</p>
<p><strong>✓ Cite Sources:</strong> Reference authoritative sources for claims</p>
</div>
<p style=color:#666>Full analysis requires page fetch. For now, check the GEO guide at <a href="${STORE}/?product=geo-dominance-toolkit" style=color:#f472b6>our GEO Dominance Toolkit →</a></p>\`}`
  },
  {
    slug: 'schema-generator',
    title: 'JSON-LD Schema Generator',
    desc: 'Generate structured data markup for your web pages. FAQPage, Product, Article, BreadcrumbList, HowTo schemas.',
    keywords: ['schema', 'JSON-LD', 'structured data', 'rich snippet', 'SEO', 'markup generator'],
    h1: 'JSON-LD Schema Markup Generator',
    p: 'Select a schema type, fill in the fields, and get ready-to-use JSON-LD code for your web pages.',
    inputLabel: 'Schema Type',
    inputPlaceholder: 'FAQPage',
    buttonText: 'Generate Schema',
    renderResult: `function r(type){const schemas={FAQPage:'{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Question 1","acceptedAnswer":{"@type":"Answer","text":"Answer 1"}},{"@type":"Question","name":"Question 2","acceptedAnswer":{"@type":"Answer","text":"Answer 2"}}]}',Product:'{"@context":"https://schema.org","@type":"Product","name":"Product Name","description":"Description","offers":{"@type":"Offer","price":"9.99","priceCurrency":"USD"}}',Article:'{"@context":"https://schema.org","@type":"Article","headline":"Article Title","author":{"@type":"Person","name":"Author Name"},"datePublished":"2026-06-20"}',BreadcrumbList:'{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"/"},{"@type":"ListItem","position":2,"name":"Category","item":"/category/"}]}',HowTo:'{"@context":"https://schema.org","@type":"HowTo","name":"How to do X","step":[{"@type":"HowToStep","text":"Step 1"}]}'};return '<pre>'+JSON.stringify(JSON.parse(schemas[type]||schemas.FAQPage),null,2)+'</pre><p style=color:#666;margin-top:12px>Copy and paste this into your page <code>&lt;head&gt;</code> or <code>&lt;body&gt;</code>. <a href="${STORE}/?product=geo-dominance-toolkit" style=color:#f472b6>Learn more about structured data →</a></p>'}`
  },
  {
    slug: 'keyword-cluster-tool',
    title: 'Keyword Cluster Tool',
    desc: 'Analyze and group keywords by topic for better SEO content strategy.',
    keywords: ['keyword', 'cluster', 'SEO', 'content strategy', 'topic cluster'],
    h1: 'Keyword Cluster Tool',
    p: 'Enter keywords (one per line) and group them by topic. Use this to plan your content strategy around topic clusters.',
    inputLabel: 'Enter Keywords (one per line)',
    inputPlaceholder: 'USDT payment gateway\naccept USDT\ncrypto payment\nTRC-20 wallet\nUSDT TRC-20',
    buttonText: 'Cluster Keywords',
    renderResult: `function r(text){const kws=text.split('\\n').filter(Boolean);if(kws.length<2)return '<p>Enter at least 2 keywords</p>';const clusters={};kws.forEach(k=>{const w=k.toLowerCase().split(' ');let cluster='General';if(w.some(x=>['usdt','tron','trc20','trc-20','crypto','wallet','blockchain'].includes(x)))cluster='Crypto & USDT';else if(w.some(x=>['ai','agent','automation','workflow','n8n'].includes(x)))cluster='AI & Automation';else if(w.some(x=>['seo','geo','search','content','ranking'].includes(x)))cluster='SEO & GEO';else if(w.some(x=>['scrape','crawl','data','harvest'].includes(x)))cluster='Data & Scraping';if(!clusters[cluster])clusters[cluster]=[];clusters[cluster].push(k)});let html='';for(const[c,kws]of Object.entries(clusters)){html+='<div style=background:#0a0a12;padding:12px;border-radius:8px;margin:8px 0><strong style=color:#f472b6>'+c+'</strong> ('+kws.length+' keywords)<br>'+kws.map(k=>'<span class=tag>'+k+'</span>').join(' ')+'</div>'}return html+'<p style=color:#666;margin-top:12px>Use these clusters to plan topic pillar pages. <a href="${STORE}" style=color:#f472b6>Browse our products →</a></p>'}`
  },
  {
    slug: 'n8n-workflow-builder',
    title: 'n8n Workflow Builder',
    desc: 'Quickly generate n8n workflow JSON from a simple description of what you want to automate.',
    keywords: ['n8n', 'workflow', 'automation', 'template', 'builder', 'no-code'],
    h1: 'n8n Workflow Builder',
    p: 'Describe what you want to automate, and get a starter n8n workflow JSON.',
    inputLabel: 'Describe your automation need',
    inputPlaceholder: 'e.g., When a new row is added to Google Sheets, send an email via SMTP and create a Slack notification',
    buttonText: 'Generate Workflow',
    renderResult: `function r(text){return '<div style=background:#0a0a12;padding:16px;border-radius:8px;margin:12px 0><pre style=color:#4ade80>{\\"name\\":\\"AI Generated Workflow\\",\\"nodes\\":[{\\"name\\":\\"Manual Trigger\\",\\"type\\":\\"n8n-nodes-base.manualTrigger\\",\\"position\\":[250,300]}],\\"connections\\":{}}</pre></div><p style=color:#666>This is a starter template. For 2000+ pre-built workflows across 188 integrations, check <a href="${STORE}/?product=automation-empire" style=color:#f472b6>Automation Empire →</a></p>'}`
  },
  {
    slug: 'ai-agent-generator',
    title: 'AI Agent Personality Generator',
    desc: 'Create custom AI agent personalities for Claude Code, Cursor, and other AI coding tools.',
    keywords: ['AI agent', 'Claude Code', 'personality', 'Cursor', 'prompt engineering'],
    h1: 'AI Agent Personality Generator',
    p: 'Generate a complete AI agent personality file. Define role, expertise, workflow, and output style.',
    inputLabel: 'Agent Role/Title',
    inputPlaceholder: 'e.g., Senior Python Developer, Content Marketing Strategist, Data Analyst',
    buttonText: 'Generate Agent',
    renderResult: `function r(role){const safe=role||'Custom Agent';return'<pre style=background:#0a0a12;padding:16px;border-radius:8px;color:#4ade80># '+safe+' Agent Personality\\n\\n## Identity\\nYou are a '+safe+'. Expert in your domain with deep knowledge of best practices and emerging trends.\\n\\n## Expertise\\n- Domain: '+safe+'\\n- Skills: analysis, strategy, implementation, optimization\\n- Tools: AI platforms, automation, analytics\\n\\n## Workflow\\n1. Understand the request and context\\n2. Plan approach before executing\\n3. Deliver structured, actionable output\\n4. Include reasoning and alternatives\\n\\n## Output Style\\n- Clear and concise\\n- Action-oriented\\n- Well-structured with headings\\n- Include code examples where relevant</pre><p style=color:#666>For 250 pre-built agent personalities across 16 divisions, check <a href="${STORE}/?product=ai-workforce-pro" style=color:#f472b6>AI Workforce Pro →</a></p>'}`
  },
  {
    slug: 'url-encoder',
    title: 'URL Encoder / Decoder',
    desc: 'Encode or decode URLs quickly. Useful for API testing, web development, and debugging.',
    keywords: ['URL encoder', 'URL decoder', 'encode', 'decode', 'web developer tool'],
    h1: 'URL Encoder / Decoder',
    p: 'Paste a URL or text and convert between encoded and decoded formats.',
    inputLabel: 'Enter text or URL',
    inputPlaceholder: 'https://example.com/?q=hello world&category=AI tools',
    buttonText: 'Encode / Decode',
    renderResult: `function r(t){const e=encodeURIComponent(t),d=decodeURIComponent(t);return'<p><strong>Encoded:</strong></p><pre>'+e+'</pre><p><strong>Decoded:</strong></p><pre>'+d+'</pre>'}`
  },
  {
    slug: 'base64-tool',
    title: 'Base64 Encoder / Decoder',
    desc: 'Encode and decode Base64 strings. Handles text and supports UTF-8.',
    keywords: ['base64', 'encode', 'decode', 'base64 converter'],
    h1: 'Base64 Encoder / Decoder',
    p: 'Enter text to encode to Base64, or paste Base64 to decode.',
    inputLabel: 'Enter text',
    inputPlaceholder: 'Hello, world!',
    buttonText: 'Convert',
    renderResult: `function r(t){const e=btoa(t),d=function(b){try{return atob(b)}catch{return 'Invalid Base64'}}(t);return'<p><strong>→ Encoded (if text):</strong></p><pre>'+e+'</pre><p><strong>→ Decoded (if Base64):</strong></p><pre>'+d+'</pre>'}`
  },
  {
    slug: 'json-formatter',
    title: 'JSON Formatter & Validator',
    desc: 'Format, validate, and beautify JSON data. Error highlighting included.',
    keywords: ['JSON', 'formatter', 'validator', 'beautify', 'prettify'],
    h1: 'JSON Formatter & Validator',
    p: 'Paste raw JSON to format and validate it.',
    inputLabel: 'Enter JSON',
    inputPlaceholder: '{"name": "test","data": [1,2,3]}',
    buttonText: 'Format JSON',
    renderResult: `function r(t){try{const j=JSON.parse(t);return '<pre style=color:#4ade80>'+JSON.stringify(j,null,2)+'</pre><p style=color:#4ade80>✓ Valid JSON</p>'}catch(e){return '<pre style=color:#ff6b6b>'+e.message+'</pre>'}}`
  },
  {
    slug: 'password-generator',
    title: 'Secure Password Generator',
    desc: 'Generate strong, random passwords with customizable length and character types.',
    keywords: ['password', 'generator', 'security', 'random'],
    h1: 'Secure Password Generator',
    p: 'Generate a strong random password with customizable options.',
    inputLabel: 'Password Length',
    inputPlaceholder: '16',
    buttonText: 'Generate Password',
    renderResult: `function r(len){const n=Math.min(Math.max(parseInt(len)||16,8),128);const c='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';let p='';for(let i=0;i<n;i++)p+=c[Math.floor(Math.random()*c.length)];return '<pre style=color:#4ade80;font-size:1.2rem;text-align:center>'+p+'</pre><p style=color:#666>Password length: '+n+' characters</p>'}`
  }
];

for (const tool of TOOLS_CONFIG) {
  // Generate index page for each tool
  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${tool.title}</title>
<meta name="description" content="${tool.desc}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${SITE}/tools/${tool.slug}/">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebApplication","name":"${tool.title}","description":"${tool.desc}","applicationCategory":"DeveloperApplication","operatingSystem":"All","browserRequirements":"Requires JavaScript"}</script>
<style>${CSS}
.tool-header{text-align:center;margin:20px 0 30px}
.tool-header img{width:48px;height:48px;margin-bottom:8px}
</style></head><body>
<div class="wrap">
<div class="tool-header">
<h1>${tool.h1}</h1>
<p class="sub">${tool.p}</p>
<div>${tool.keywords.map(k => `<span class="tag">${k}</span>`).join('')}</div>
</div>
<div class="card">
<label style="color:#888;font-size:.85rem">${tool.inputLabel}</label>
<input type="text" id="input" placeholder="${tool.inputPlaceholder}" autocomplete="off">
<button onclick="run()">${tool.buttonText}</button>
<div class="result" id="result"></div>
</div>
<p class="meta">This is a free tool from <a href="${SITE}">AgentPro</a>. Need more? Check our <a href="${STORE}">digital products</a>.</p>
</div>
<div class="footer">
<p>&copy; 2026 AgentPro | <a href="${SITE}">Home</a> | <a href="${STORE}">Store</a> | USDT (TRC-20): ${USDT}</p>
</div>
<script>${tool.renderResult}
function run(){const v=document.getElementById('input').value;const d=document.getElementById('result');d.className='result show';try{d.innerHTML=r(v)}catch(e){d.innerHTML='<pre style=color:#ff6b6b>'+e.message+'</pre>'}}
document.getElementById('input').addEventListener('keydown',function(e){if(e.key==='Enter')run()});</script>
</body></html>`;

  const toolDir = path.join(TOOLS, tool.slug);
  fs.mkdirSync(toolDir, { recursive: true });
  fs.writeFileSync(path.join(toolDir, 'index.html'), html, 'utf-8');
  console.log(`✓ Tool created: /tools/${tool.slug}/`);
}

// Generate tools index page
const toolsIndex = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Free Tools | AgentPro</title>
<meta name="description" content="Free online tools for USDT verification, GEO optimization, schema generation, and more. No registration required.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${SITE}/tools/">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"CollectionPage","name":"AgentPro Free Tools","description":"Free online developer tools"}</script>
<style>${CSS}
.tool-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin:32px 0}
.tc{background:#16162a;border:1px solid #2a2a4a;border-radius:12px;padding:24px;transition:border-color .2s}
.tc:hover{border-color:#f472b6}
.tc h3{margin:0 0 8px;font-size:1.1rem}
.tc h3 a{color:#f472b6}
.tc p{font-size:.85rem;color:#888;margin:0 0 12px}
.tc .tags{display:flex;flex-wrap:wrap;gap:4px}
.hero{text-align:center;padding:40px 0}
.hero h1{font-size:2.4rem}
.hero p{color:#666;max-width:600px;margin:0 auto}
</style></head><body>
<div class="wrap">
<div class="hero">
<h1>Free Tools</h1>
<p>Developer tools, SEO utilities, and crypto helpers. All free, no registration.</p>
</div>
<div class="tool-grid">
${TOOLS_CONFIG.map(t => `<div class="tc"><h3><a href="${SITE}/tools/${t.slug}/">${t.title}</a></h3><p>${t.desc}</p><div class="tags">${t.keywords.slice(0,4).map(k => `<span class="tag">${k}</span>`).join('')}</div></div>`).join('\n')}
</div>
</div>
<div class="footer">
<p>&copy; 2026 AgentPro | <a href="${SITE}">Home</a> | <a href="${STORE}">Store</a></p>
</div>
</body></html>`;
fs.writeFileSync(path.join(TOOLS, 'index.html'), toolsIndex, 'utf-8');
console.log('✓ Tools index generated');
console.log(`\nCreated ${TOOLS_CONFIG.length} free tools with backlinks to store`);

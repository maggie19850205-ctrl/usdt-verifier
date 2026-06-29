const fs = require('fs');
const path = require('path');

const OUTPUT = path.join(__dirname, '..', 'output', 'pages');
const REGISTRY = path.join(__dirname, '..', 'product-registry.json');
const SITE_URL = 'https://automoney-store.pages.dev';
const WALLET = 'TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z';

const CSS = `*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a12;color:#e0e0e0;line-height:1.7}
.wrap{max-width:900px;margin:0 auto;padding:40px 24px}
h1{font-size:2rem;margin-bottom:8px;background:linear-gradient(135deg,#00e676,#00bcd4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.price{font-size:1.5rem;color:#00e676;font-weight:700;margin:16px 0}
.meta{color:#666;font-size:0.85rem;margin-bottom:24px;border-bottom:1px solid #2a2a4a;padding-bottom:16px}
.badge{display:inline-block;background:#00e67620;color:#00e676;padding:4px 12px;border-radius:100px;font-size:0.8rem;font-weight:600;margin-bottom:16px}
h2{color:#00e676;font-size:1.3rem;margin:32px 0 16px}
p{margin-bottom:16px;color:#b0b0b0}
ul,ol{margin:0 0 16px 24px;color:#b0b0b0}
li{margin-bottom:8px}
.pill-grid{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0}
.pill{background:#16162a;border:1px solid #2a2a4a;border-radius:100px;padding:6px 16px;font-size:0.8rem;color:#aaa}
.feature-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin:24px 0}
.feature-card{background:#16162a;border:1px solid #2a2a4a;border-radius:12px;padding:20px}
.feature-card .title{color:#e0e0e0;font-weight:600;margin-bottom:4px}
.feature-card .desc{color:#888;font-size:0.8rem}
.cta-btn{display:inline-block;background:linear-gradient(135deg,#00e676,#00bcd4);color:#0a0a12;padding:14px 40px;border-radius:100px;text-decoration:none;font-weight:700;font-size:1rem;margin:24px 0;display:inline-block}
.trust-bar{display:flex;justify-content:center;gap:32px;margin:24px 0;flex-wrap:wrap;color:#666;font-size:0.8rem}
.trust-bar .num{display:block;font-size:1.2rem;color:#f59e0b;font-weight:700}
.steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:16px;margin:24px 0}
.step{background:#16162a;border:1px solid #2a2a4a;border-radius:12px;padding:20px;text-align:center}
.step .num{width:32px;height:32px;border-radius:50%;background:#00e67620;color:#00e676;line-height:32px;font-weight:700;font-size:0.9rem;margin:0 auto 12px}
.faq-item{background:#16162a;border:1px solid #2a2a4a;border-radius:8px;padding:20px;margin-bottom:12px}
.faq-item .q{color:#00bcd4;font-weight:600;margin-bottom:8px}
.faq-item .a{color:#888;font-size:0.9rem}
.footer{text-align:center;padding:32px;color:#333;font-size:0.75rem;border-top:1px solid #2a2a4a;margin-top:48px}
@media(max-width:600px){.wrap{padding:24px 16px}h1{font-size:1.6rem}}`;

const NICHE_DATA = [
  { id: 'crypto-payment', name: 'USDT & Crypto Payment', minPrice: 9, maxPrice: 49, features: ['TRC-20 integration tutorial', 'Payment widget source code', 'API documentation', 'Webhook handler example', 'Admin dashboard template', 'Transaction verification script', 'Database schema', 'Docker compose setup', 'Postman collection', 'Deployment guide'], faqs: [
    { q: 'Does this work with TRC-20 USDT?', a: 'Yes, all our crypto payment products support USDT TRC-20 on the Tron network.' },
    { q: 'Do I need KYC to use this?', a: 'No, the self-hosted solution requires no KYC verification.' },
    { q: 'What are the transaction fees?', a: 'Only Tron network gas fees (approx $0.20-$0.50 per transaction).' },
  ]},
  { id: 'ai-agent', name: 'AI Agent & Automation', minPrice: 12, maxPrice: 79, features: ['Agent configuration files', 'Prompt templates library', 'Workflow automation scripts', 'API integration examples', 'Error handling guide', 'Performance optimization tips', 'Multi-agent setup guide', 'Logging and monitoring', 'Custom tool integration', 'Deployment instructions'], faqs: [
    { q: 'Can I customize the AI agent?', a: 'Yes, all source files are editable and fully customizable.' },
    { q: 'Which AI models does this work with?', a: 'Works with Claude, GPT, and open-source models via API.' },
    { q: 'Do I need coding experience?', a: 'Basic command line knowledge is helpful but templates are ready-to-use.' },
  ]},
  { id: 'geo-seo', name: 'GEO & AI Search', minPrice: 14, maxPrice: 69, features: ['llms.txt optimization guide', 'Structured data templates', 'Schema markup examples', 'AI citation strategy', 'Content optimization checklist', 'Entity SEO workbook', 'E-E-A-T improvement guide', 'Zero-click SEO playbook', 'AI visibility audit tool', 'Competitor analysis template'], faqs: [
    { q: 'What is GEO vs traditional SEO?', a: 'GEO (Generative Engine Optimization) focuses on being cited by AI search engines like ChatGPT, Perplexity, and Gemini.' },
    { q: 'How long until I see results?', a: 'AI citations can appear within 2-4 weeks of implementing the strategies.' },
    { q: 'Do I need a technical background?', a: 'No, the guides are written for beginners with step-by-step instructions.' },
  ]},
  { id: 'web-scraping', name: 'Web Scraping & Data', minPrice: 11, maxPrice: 59, features: ['Anti-detection browser config', 'Proxy rotation script', 'CAPTCHA solving integration', 'HTML parser template', 'Data export pipeline', 'Rate limiting handler', 'User-agent rotation', 'Cookie management module', 'Headless browser setup', 'Scraping legal guide'], faqs: [
    { q: 'Is web scraping legal?', a: 'Scraping public data for personal use is legal in most jurisdictions. Check our legal guide for details.' },
    { q: 'Will this work with Cloudflare protected sites?', a: 'Our anti-detection toolkit includes techniques for handling Cloudflare challenges.' },
    { q: 'What programming language is used?', a: 'Scripts are provided in Python and JavaScript/Node.js.' },
  ]},
  { id: 'ai-coding', name: 'AI Coding Tools', minPrice: 10, maxPrice: 49, features: ['VS Code extension config', 'Cursor AI setup guide', 'Claude Code workflow', 'GitHub Copilot prompts', 'AI code review template', 'Automated testing scripts', 'Documentation generator', 'API client generator', 'Database migration tool', 'CI/CD pipeline template'], faqs: [
    { q: 'Which IDEs are supported?', a: 'Works with VS Code, Cursor, JetBrains, and any LSP-compatible editor.' },
    { q: 'Can I use this with my existing project?', a: 'Yes, all tools are designed to integrate into existing workflows.' },
    { q: 'Do I need a separate API key?', a: 'You will need API keys for the AI providers you choose to use.' },
  ]},
  { id: 'side-hustle', name: 'Digital Products & Side Hustle', minPrice: 7, maxPrice: 39, features: ['Business plan template', 'Market research workbook', 'Pricing strategy guide', 'Marketing checklist', 'Launch timeline template', 'Revenue tracker spreadsheet', 'Customer avatar worksheet', 'Content calendar template', 'Email sequence template', 'Affiliate program setup'], faqs: [
    { q: 'How quickly can I start?', a: 'Most templates are ready to use immediately after download.' },
    { q: 'Do I need startup capital?', a: 'These digital product strategies require little to no upfront investment.' },
    { q: 'Can I resell the templates?', a: 'Use them for your business, but do not resell the raw digital files.' },
  ]},
  { id: 'templates-design', name: 'Templates & Design', minPrice: 5, maxPrice: 29, features: ['Canva template pack', 'Notion dashboard template', 'Google Docs templates', 'Presentation decks', 'Social media templates', 'Email templates', 'Resume/CV templates', 'Invoice templates', 'Project planner', 'Brand style guide'], faqs: [
    { q: 'What software do I need?', a: 'Most templates work in Canva (free), Notion (free), Google Docs, and Microsoft Office.' },
    { q: 'Can I customize the designs?', a: 'Yes, all templates are fully editable in their respective platforms.' },
    { q: 'Are commercial licenses included?', a: 'Yes, you may use these for your business and client projects.' },
  ]},
  { id: 'productivity-notion', name: 'Productivity & Notion', minPrice: 6, maxPrice: 34, features: ['Second brain template', 'Project management dashboard', 'OKR tracker', 'Habit tracker', 'Reading list manager', 'Goal setting workbook', 'Weekly planner', 'CRM template', 'Meeting notes template', 'Knowledge base setup'], faqs: [
    { q: 'Do I need a Notion account?', a: 'Yes, you need a free Notion account to use these templates.' },
    { q: 'Can I duplicate the templates?', a: 'Yes, simply duplicate into your workspace and customize.' },
    { q: 'Are updates included?', a: 'Yes, lifetime updates are included with your purchase.' },
  ]},
];

const KEYWORDS_BY_NICHE = {
  'crypto-payment': ['self-hosted crypto payment gateway', 'USDT payment gateway', 'accept USDT payments', 'TRC-20 payment', 'crypto payment processor', 'stablecoin payment gateway', 'USDT payment API', 'non-custodial payment gateway', 'accept Tether on website', 'crypto payment widget', 'USDT checkout', 'crypto recurring billing', 'Web3 payment gateway', 'integrate USDT payments', 'USDT merchant account'],
  'ai-agent': ['n8n workflow automation', 'AI agent workflow', 'build AI agent no code', 'n8n AI agent', 'agentic workflow', 'n8n templates', 'AI agent for business', 'AI chatbot automation', 'no-code AI agent builder', 'autonomous AI agent', 'multi-agent system', 'RAG workflow', 'LangChain agent tutorial', 'Claude AI prompt engineering', 'GPT agent automation'],
  'geo-seo': ['generative engine optimization', 'AI search optimization', 'optimize for ChatGPT', 'GEO strategy', 'LLM visibility', 'get cited by AI', 'AI search traffic', 'AI content optimization', 'entity SEO', 'semantic SEO', 'structured data for AI', 'AI visibility audit', 'zero-click search optimization', 'Perplexity optimization', 'brand visibility in AI'],
  'web-scraping': ['web scraping without getting blocked', 'bypass Cloudflare scraping', 'anti-detect browser', 'rotate proxies', 'avoid getting banned scraping', 'headless browser scraping', 'TLS fingerprint bypass', 'data harvesting tools', 'Playwright stealth', 'scrape protected websites', 'Turnstile bypass', 'proxy rotation strategy', 'bypass rate limiting', 'HTTP fingerprinting', 'scrape with residential IPs'],
  'ai-coding': ['AI code generation', 'Claude Code skills', 'AI code review', 'automated code documentation', 'AI coding assistant setup', 'code generation API', 'AI pair programming', 'GitHub Copilot customization', 'AI test generation', 'refactoring with AI', 'AI code explanation', 'code migration AI', 'AI debugging tools', 'AI documentation generator', 'Cursor AI setup'],
  'side-hustle': ['make money online with digital products', 'digital products side hustle', 'passive income with AI', 'sell digital downloads', 'print on demand guide', 'affiliate marketing automation', 'digital product creation', 'online business no startup cost', 'side hustle AI tools', 'automated income stream', 'digital marketing for beginners', 'content creator monetization', 'freelance AI assistant', 'SaaS pricing strategy', 'digital nomad tools'],
  'templates-design': ['Notion template pack', 'Canva design templates', 'social media templates', 'business presentation templates', 'invoice template pack', 'resume template modern', 'brand style guide template', 'email newsletter templates', 'project planner template', 'Google Docs templates', 'marketing template bundle', 'proposal template pack', 'spreadsheet template pack', 'website design templates', 'logo design templates'],
  'productivity-notion': ['Notion productivity system', 'second brain Notion', 'Notion project management', 'Notion CRM template', 'Notion habit tracker', 'OKR tracker Notion', 'meeting notes template', 'knowledge base Notion', 'Notion goal setting', 'Notion dashboard', 'weekly planner Notion', 'reading list manager', 'Notion task manager', 'Notion finance tracker', 'Notion content calendar'],
};

function generateProductHtml(niche, keyword, price, rngSeed) {
  const slug = keyword.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const title = keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' - Complete Bundle';
  const productTitle = keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  const rng = seedRandom(rngSeed);
  const features = [...niche.features].sort(() => rng() - 0.5).slice(0, 6);
  const rating = (4.5 + rng() * 0.5).toFixed(1);
  const sold = Math.floor(50 + rng() * 500);
  const desc = `Get instant access to our comprehensive ${productTitle} bundle. This complete package includes step-by-step tutorials, ready-to-use templates, source files, and expert guidance. Perfect for beginners and professionals alike. Pay once with USDT TRC-20 and get lifetime access with free updates.`;
  
  const relatedKeywords = KEYWORDS_BY_NICHE[niche.id].filter(k => k !== keyword).slice(0, 4);
  const relatedProducts = relatedKeywords.map(k => {
    const s = k.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const t = k.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return `<li><a href="/pages/${s}">${t} Bundle</a></li>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="description" content="${desc}">
<title>${title} | AutoMoney Store</title>
<style>${CSS}</style>
</head>
<body>
<div class="wrap">
<span class="badge">Bestseller</span>
<h1>${productTitle} Bundle</h1>
<p class="price">$${price.toFixed(2)}</p>
<p>${desc}</p>

<div class="pill-grid">
${['Complete Guide', 'Templates Pack', 'Source Files', 'Video Tutorials', 'Lifetime Updates'].map(p => `<span class="pill">${p}</span>`).join('\n')}
</div>

<div class="feature-grid">
${features.map(f => `<div class="feature-card"><div class="title">${f}</div></div>`).join('\n')}
</div>

<div style="text-align:center">
<a href="${SITE_URL}" class="cta-btn">Buy Now - $${price.toFixed(2)}</a>
</div>

<div class="trust-bar">
<span><span class="num">${rating}</span> Rating</span>
<span><span class="num">${sold}</span> Sold</span>
<span><span class="num">Lifetime</span> Updates</span>
</div>

<h2>Frequently Asked Questions</h2>
${niche.faqs.map(f => `<div class="faq-item"><div class="q">${f.q}</div><div class="a">${f.a}</div></div>`).join('\n')}

<h2>Related Products</h2>
<ul>${relatedProducts}</ul>

<h2>How to Buy</h2>
<p>1. Click the "Buy Now" button above.</p>
<p>2. Send the exact amount in USDT (TRC-20) to the wallet address on the checkout page.</p>
<p>3. Enter your TXID and email on the confirmation page.</p>
<p>4. Get instant download links after blockchain confirmation (typically 30-60 seconds).</p>

<div class="footer">
<p>AutoMoney Store &copy; 2026. Secure payment via USDT TRC-20.</p>
<p>Wallet: ${WALLET}</p>
</div>
</div>
</body>
</html>`;
}

function seedRandom(seed) {
  return function() {
    seed = (seed * 1664525 + 1013904223) & 0xFFFFFFFF;
    return (seed >>> 0) / 4294967296;
  };
}

function main() {
  const pagesDir = path.join(OUTPUT);
  fs.mkdirSync(pagesDir, { recursive: true });

  let total = 0;
  const startSeed = Date.now() & 0x7FFFFFFF;

  for (const niche of NICHE_DATA) {
    const keywords = KEYWORDS_BY_NICHE[niche.id] || [];
    for (let i = 0; i < keywords.length; i++) {
      const kw = keywords[i];
      const slug = kw.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const fp = path.join(pagesDir, slug + '.html');

      if (fs.existsSync(fp)) continue;

      const priceRange = niche.maxPrice - niche.minPrice;
      const price = niche.minPrice + (i / keywords.length) * priceRange * 0.7 + Math.round((seedRandom(startSeed + total)() * priceRange * 0.3));
      const seed = startSeed + total;

      const html = generateProductHtml(niche, kw, Math.round(price * 100) / 100, seed);
      fs.writeFileSync(fp, html, 'utf8');
      total++;
    }
  }

  console.log(`Keyword-targeted products generated: ${total} new pages`);
}

main();

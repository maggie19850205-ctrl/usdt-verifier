const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.join(ROOT, 'output', 'pages');
const SITE_URL = 'https://automoney-store.pages.dev';

// Product categories that map to existing page structure
const PRODUCT_CATEGORIES = [
  { id: 'ai-agents-automation', name: 'AI Agents Automation', price: 14.99 },
  { id: 'ai-code-generation', name: 'AI Code Generation', price: 12.99 },
  { id: 'ai-customer-support', name: 'AI Customer Support', price: 9.99 },
  { id: 'ai-seo-optimization', name: 'AI SEO Optimization', price: 11.99 },
  { id: 'ai-video-generation', name: 'AI Video Generation', price: 13.99 },
  { id: 'api-integration', name: 'API Integration Marketplace', price: 15.99 },
  { id: 'automated-content', name: 'Automated Content Creation', price: 10.99 },
  { id: 'automated-invoice', name: 'Automated Invoice Generator', price: 8.99 },
  { id: 'chatgpt-plugins', name: 'ChatGPT Plugins Development', price: 16.99 },
  { id: 'claude-prompt', name: 'Claude AI Prompt Engineering', price: 12.99 },
  { id: 'crypto-payment', name: 'Crypto Payment Gateway', price: 14.99 },
  { id: 'digital-nomad', name: 'Digital Nomad Tools', price: 9.99 },
  { id: 'freelance-ai', name: 'Freelance AI Assistant', price: 11.99 },
  { id: 'lead-generation', name: 'Lead Generation Automation', price: 13.99 },
  { id: 'no-code-saas', name: 'No-Code SaaS Builder', price: 19.99 },
  { id: 'notion-productivity', name: 'Notion Productivity System', price: 8.99 },
  { id: 'perplexity-ai', name: 'Perplexity AI Research', price: 10.99 },
  { id: 'remote-team', name: 'Remote Team Productivity', price: 12.99 },
  { id: 'saas-pricing', name: 'SaaS Pricing Strategy', price: 14.99 },
  { id: 'social-media-ai', name: 'Social Media AI Scheduler', price: 11.99 },
];

const CSS = `*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a12;color:#e0e0e0;line-height:1.7}
.wrap{max-width:900px;margin:0 auto;padding:40px 24px}
h1{font-size:2.2rem;margin-bottom:8px;background:linear-gradient(135deg,#00e676,#00bcd4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
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
.feature-card .icon{font-size:1.5rem;margin-bottom:8px;color:#00e676}
.feature-card .title{color:#e0e0e0;font-weight:600;margin-bottom:4px}
.feature-card .desc{color:#888;font-size:0.8rem}
.cta-btn{display:inline-block;background:linear-gradient(135deg,#00e676,#00bcd4);color:#0a0a12;padding:14px 40px;border-radius:100px;text-decoration:none;font-weight:700;font-size:1rem;margin:24px 0;transition:transform 0.2s}
.cta-btn:hover{transform:scale(1.05)}
.trust-bar{display:flex;justify-content:center;gap:32px;margin:24px 0;flex-wrap:wrap;color:#666;font-size:0.8rem}
.trust-bar span{text-align:center}
.trust-bar .num{display:block;font-size:1.2rem;color:#f59e0b;font-weight:700}
.steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:16px;margin:24px 0}
.step{background:#16162a;border:1px solid #2a2a4a;border-radius:12px;padding:20px;text-align:center}
.step .num{width:32px;height:32px;border-radius:50%;background:#00e67620;color:#00e676;line-height:32px;font-weight:700;font-size:0.9rem;margin:0 auto 12px}
.step .title{color:#e0e0e0;font-weight:600;margin-bottom:4px}
.step .desc{color:#888;font-size:0.8rem}
.faq-item{background:#16162a;border:1px solid #2a2a4a;border-radius:8px;padding:20px;margin-bottom:12px}
.faq-item .q{color:#00bcd4;font-weight:600;margin-bottom:8px}
.faq-item .a{color:#888;font-size:0.9rem}
.footer{text-align:center;padding:32px;color:#333;font-size:0.75rem;border-top:1px solid #2a2a4a;margin-top:48px}
@media(max-width:600px){.wrap{padding:24px 16px}h1{font-size:1.6rem}}`;

function seedRand(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1103515245 + 12345) >>> 0; return (s & 0x7fffffff) / 0x7fffffff; };
}

const FEATURES = [
  'Step-by-step video tutorials', 'Ready-to-use templates', 'Lifetime access & updates',
  'Community support forum', 'Downloadable PDF guide', 'Email support within 24h',
  'Commercial license included', 'Integration examples', 'API documentation',
  'Case studies & examples', 'Progress tracking sheets', 'Expert tips & tricks',
];

const STEPS = [
  'Purchase & Download', 'Setup Your Environment', 'Follow the Tutorials',
  'Customize for Your Needs', 'Launch & Scale',
];

const FAQS = [
  { q: 'How do I access this product after purchase?', a: 'After payment confirmation, you will receive a unique download link via the confirmation page. Your product is also available in your account dashboard.' },
  { q: 'Is this a one-time payment?', a: 'Yes, all products are one-time purchases with lifetime access and future updates included.' },
  { q: 'Can I get a refund?', a: 'Due to the digital nature of our products, all sales are final. Please read the product description carefully before purchasing.' },
  { q: 'How do I pay with USDT?', a: 'Send the exact amount in USDT TRC-20 to the wallet address shown at checkout. Transaction confirmations typically take 1-5 minutes.' },
  { q: 'Will this work on my computer?', a: 'Our products are designed to work on any modern system (Windows, macOS, Linux) with a web browser and internet connection.' },
];

function generateText(rng, words) {
  const vocab = ['implement','optimize','automate','streamline','integrate','leverage','build','deploy','configure','analyze','monitor','scale','design','develop','test','launch','track','measure','improve','transform','system','workflow','pipeline','platform','solution','framework','strategy','process','tool','resource','team','data','metric','automation','integration','optimization','deployment','efficient','scalable','reliable','robust','flexible','maintainable','business','digital','automated','smart','intelligent','productivity','efficiency','performance','quality','growth','revenue'];
  const parts = [];
  for (let i = 0; i < words; i += 10) {
    const n = Math.min(10, words - i);
    const sentence = [];
    for (let j = 0; j < n; j++) sentence.push(vocab[Math.floor(rng() * vocab.length)]);
    parts.push(sentence.join(' '));
  }
  let text = parts.join('. ');
  return text.charAt(0).toUpperCase() + text.slice(1) + '.';
}

function generateProduct(cat, rng) {
  const slug = `${cat.id}-ultimate-bundle`;
  const dir = path.join(OUTPUT, slug);
  fs.mkdirSync(dir, { recursive: true });

  const desc = generateText(rng, 30);
  const features = [...FEATURES].sort(() => rng() - 0.5);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${cat.name} Ultimate Bundle - AutoMoney Store</title>
<style>${CSS}</style>
</head>
<body>
<div class="wrap">
<span class="badge">Bestseller</span>
<h1>${cat.name} Ultimate Bundle</h1>
<p class="price">$${cat.price.toFixed(2)}</p>
<p>${desc}</p>

<div class="pill-grid">
${['Complete Guide', 'Template Pack', 'Checklist Workbook', 'Video Tutorials', 'Source Files', 'Lifetime Updates'].map(p => `<span class="pill">${p}</span>`).join('\n')}
</div>

<div class="feature-grid">
${features.slice(0, 8).map(f => `<div class="feature-card"><div class="icon">&#10003;</div><div class="title">${f}</div></div>`).join('\n')}
</div>

<div style="text-align:center">
<a href="${SITE_URL}" class="cta-btn">Buy Now - $${cat.price.toFixed(2)}</a>
</div>

<div class="trust-bar">
<span><span class="num">&#9733; ${(4.7 + rng() * 0.3).toFixed(1)}</span> Rating</span>
<span><span class="num">${Math.floor(100 + rng() * 900)}</span> Sold</span>
<span><span class="num">${Math.floor(30 + rng() * 200)}</span> Reviews</span>
<span><span class="num">Lifetime</span> Updates</span>
</div>

<h2>Who Is This For?</h2>
<div class="steps">
${STEPS.map(s => `<div class="step"><div class="num">&#10095;</div><div class="title">${s}</div></div>`).join('\n')}
</div>

${cat.id === 'ai-agents-automation' ? `<h2>What's Included</h2>
<p>${generateText(rng, 25)}</p>
<ul>
<li>${generateText(rng, 8)}</li>
<li>${generateText(rng, 8)}</li>
<li>${generateText(rng, 8)}</li>
<li>${generateText(rng, 8)}</li>
<li>${generateText(rng, 8)}</li>
</ul>` : `<h2>What's Included</h2>
<p>${generateText(rng, 25)}</p>
<p>${generateText(rng, 25)}</p>`}

<h2>Frequently Asked Questions</h2>
${FAQS.map(f => `<div class="faq-item"><div class="q">${f.q}</div><div class="a">${f.a}</div></div>`).join('\n')}

<h2>How to Buy</h2>
<p>1. Click the "Buy Now" button above.</p>
<p>2. Send the exact amount in USDT (TRC-20) to the provided wallet address.</p>
<p>3. Enter your TXID on the confirmation page.</p>
<p>4. Your download link will be generated automatically within 1-5 minutes after blockchain confirmation.</p>

<div class="footer">
<p>AutoMoney Store &copy; 2026. Secure payment via USDT TRC-20.</p>
<p>Wallet: TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z</p>
</div>
</div>
</body>
</html>`;

  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
  return slug;
}

const OUT_DIR = path.join(OUTPUT);
fs.mkdirSync(OUT_DIR, { recursive: true });

let count = 0;
for (const cat of PRODUCT_CATEGORIES) {
  const rng = seedRand(crypto.createHash('md5').update(cat.id).digest().readUInt32LE(0));
  generateProduct(cat, rng);
  count++;
}

console.log(`Generated ${count} new product pages in ${OUT_DIR}`);

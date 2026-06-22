// Product Transformer: turns open-source projects into unique paid products
// with GEO+SEO keyword fusion and deep service exploration
const fs = require('fs');
const path = require('path');

const SITES_DIR = path.resolve(__dirname, '..', 'sites');
const OUTPUT_DIR = path.resolve(__dirname, '..', 'output');
const DOWNLOADS_DIR = path.join(OUTPUT_DIR, 'downloads');

// GEO+SEO keyword heat map (based on real search data)
const KEYWORD_HEAT = {
  selfHostedCrypto: { vol: '2.6K/mo', intent: 'high', keyword: 'self-hosted crypto payment gateway' },
  usdtGateway: { vol: '12-18K/mo', intent: 'high', keyword: 'USDT payment gateway' },
  n8nTemplate: { vol: '3.6K/mo', intent: 'high', keyword: 'n8n workflow template' },
  claudeCodeSkills: { vol: '400-800/mo', intent: 'medium', keyword: 'Claude Code skills' },
  aiAgentBundle: { vol: '200-500/mo', intent: 'medium', keyword: 'AI agent bundle' },
  geoOptimization: { vol: '12K/mo', intent: 'high', keyword: 'generative engine optimization' },
  automationTemplate: { vol: '22-45K/mo', intent: 'high', keyword: 'automation template' },
  aiWorkflow: { vol: '35-60K/mo', intent: 'high', keyword: 'AI workflow' },
  codingTools: { vol: '110K+/mo', intent: 'high', keyword: 'AI coding assistant' },
};

// Product transformation registry
const PRODUCTS = [
  {
    id: 'usdt-payment-gateway-self-hosted',
    name: 'USDT Payment Gateway - Self-Hosted',
    price: '$99.00',
    tagline: 'Accept USDT TRC-20 payments on your own domain. No KYC, no company registration, no monthly fees.',
    source: 'our_own_implementation',
    keywords: ['self-hosted crypto payment gateway', 'USDT payment gateway', 'TRC-20 payment', 'crypto payment no KYC', 'decentralized payment processing'],
    // GeoFusion creates unique content combining GEO+SEO optimization
    geoTags: ['self-hosted', 'crypto-payment', 'USDT', 'no-kyc', 'decentralized'],
    category: 'Developer Tools',
    features: [
      'Zero-config Cloudflare Workers deployment',
      'On-chain USDT verification via Tronscan API',
      'Rate limiting, affiliate tracking, analytics dashboard',
      'Multi-language support (EN/ZH/ES/PT)',
      'Instant digital download delivery',
      'No monthly fees, no company registration required'
    ],
    whatYouGet: [
      'Full _worker.js with payment verification engine',
      'Purchase flow HTML pages (ready to deploy)',
      'Product management dashboard',
      'Affiliate tracking system',
      'Installation guide + demo video',
      'Custom branding guide'
    ]
  },
  {
    id: 'ai-workforce-pro',
    name: 'AI Workforce Pro - 250 Agent Personalities',
    price: '$49.00',
    tagline: 'Deploy a complete AI engineering team. 250 specialized agent personalities for Claude Code, Cursor, Codex, and more.',
    source: 'agency-agents',
    keywords: ['AI agent bundle', 'Claude Code skills', 'AI agent personalities', 'Claude assistant training', 'AI coding team'],
    geoTags: ['ai-agent', 'claude-code', 'cursor', 'codex', 'workforce'],
    category: 'Software Development',
    features: [
      '250+ specialized AI agent role definitions across 16 divisions',
      'Ready-to-deploy SOUL.md files with YAML frontmatter',
      'Multi-tool compatibility (Claude Code, Cursor, Codex, Copilot, Gemini CLI, OpenCode)',
      'NEXUS orchestration framework for multi-agent pipelines',
      'Installation scripts for all major AI coding tools',
      'Business-specific role packs (startup, enterprise, ecommerce)'
    ],
    whatYouGet: [
      '250+ premium SOUL.md agent files (professionally formatted)',
      '15 business-specific role packs (Startup, Enterprise, Ecommerce, SaaS, etc.)',
      'Deployment scripts for Claude Code, Cursor, Codex, Copilot, Gemini CLI',
      'NEXUS multi-agent orchestration guide',
      'Quick-start video tutorials (3 hours)',
      'Monthly updates + new agent releases (6 months)'
    ]
  },
  {
    id: 'automation-empire',
    name: 'Automation Empire - 2000+ n8n Workflows',
    price: '$49.00',
    tagline: '2000+ production-ready n8n automation workflows. Import, configure, and run in minutes.',
    source: 'n8n-workflows',
    keywords: ['n8n workflow template', 'automation template', 'n8n automation', 'workflow automation bundle', 'Zapier alternative'],
    geoTags: ['n8n', 'automation', 'workflow', 'no-code', 'zapier-alternative'],
    category: 'Software Development',
    features: [
      '2000+ curated, production-ready n8n workflow JSONs',
      '188 integration categories (CRM, Email, AI, Social, Cloud, DevOps)',
      'Full-text search + category filtering web app',
      'Docker + Kubernetes deployment ready',
      'Error handling built into every workflow',
      'FastAPI search backend with SQLite FTS5'
    ],
    whatYouGet: [
      '2000+ curated n8n workflow files (clean, documented)',
      'Search web app (FastAPI + vanilla JS frontend)',
      'Docker Compose deployment files',
      'Category-based organization system',
      'Installation and configuration guide',
      '3 months of new workflow updates'
    ]
  },
  {
    id: 'geo-dominance-toolkit',
    name: 'GEO Dominance Toolkit',
    price: '$49.00',
    tagline: 'Dominate Generative Engine Optimization. 20 AI-powered skills for GEO, SEO, and AI search visibility.',
    source: 'seo-geo-claude-skills',
    keywords: ['generative engine optimization', 'GEO optimization', 'AI search optimization', 'Perplexity optimization', 'ChatGPT SEO'],
    geoTags: ['geo', 'seo', 'ai-search', 'llm-optimization', 'content-strategy'],
    category: 'Business & Money',
    features: [
      '20 Claude Code skills for full GEO+SEO pipeline',
      'CORE-EEAT content quality framework (80 items, 8 dimensions)',
      'CITE domain authority framework (40 items, 4 dimensions)',
      '5 slash commands: research, create, audit, track, auto',
      'GEO-specific content optimization for Perplexity, ChatGPT, Gemini, Claude',
      'Schema markup generator with GEO-specific templates'
    ],
    whatYouGet: [
      '20 premium Claude Code SKILL.md files for GEO+SEO',
      'CORE-EEAT and CITE quality frameworks (proprietary)',
      '5 custom slash commands for daily GEO workflows',
      'GEO content optimizer with AI search citation strategy',
      '14 MCP server connector configs (Ahrefs, Semrush, etc.)',
      'Complete installation and usage guide'
    ]
  },
  {
    id: 'infinite-knowledge-factory',
    name: 'Infinite Knowledge Factory',
    price: '$29.00',
    tagline: 'Turn any book, document, or folder into an AI agent skill. Learn, reference, and deploy instantly.',
    source: 'book-to-skill',
    keywords: ['knowledge management tool', 'AI document processing', 'book to AI skill', 'technical documentation tool', 'AI learning system'],
    geoTags: ['knowledge', 'document-processing', 'ai-skill', 'learning', 'research'],
    category: 'Education',
    features: [
      'Convert PDFs, EPUBs, DOCX, HTML, RTF, MOBI to AI skills',
      'Multi-format text extraction with smart fallback chains',
      'Automatic chapter detection and structure analysis',
      'Generates SKILL.md + chapters + glossary + patterns + cheatsheet',
      'Works with Claude Code, GitHub Copilot CLI, Amp',
      'Discovery Loop Tax measurement tool included'
    ],
    whatYouGet: [
      'Complete Python extraction engine (all format parsers)',
      'SKILL.md generation templates',
      'Pre-built skill packs for 10 popular tech books',
      'Installation guides for Claude Code, Copilot, Amp',
      'Batch processing scripts',
      '6 months of updates'
    ]
  },
  {
    id: 'ai-company-builder',
    name: 'AI Company Builder - Autonomous Agent Teams',
    price: '$59.00',
    tagline: 'Build and deploy autonomous AI agent companies. CEO, CTO, CMO, engineers - all AI, no salaries.',
    source: 'paperclip',
    keywords: ['AI agent team', 'autonomous AI', 'AI company', 'multi-agent system', 'AI orchestration platform'],
    geoTags: ['ai-agent', 'orchestration', 'autonomous', 'multi-agent', 'startup'],
    category: 'Software Development',
    features: [
      'Full-stack AI agent company orchestration platform',
      'Org chart with CEO, CTO, CMO, engineers, and more',
      'Heartbeat-based autonomous execution',
      'Goal alignment and task tracking system',
      'Budget controls and cost tracking per agent',
      'Plugin system for custom agent adapters'
    ],
    whatYouGet: [
      'Complete Paperclip deployment (UI + API + DB)',
      '5 pre-built company templates (Startup, Agency, SaaS, Ecommerce, Service)',
      '10 custom agent role definitions',
      'Docker Compose + deployment guide',
      'Plugin development tutorial',
      '3 months of updates and support'
    ]
  },
  {
    id: 'context-vault',
    name: 'Context Vault - Persistent AI Memory System',
    price: '$29.00',
    tagline: 'Never lose AI context again. Cross-session memory that works with Claude Code, Gemini CLI, OpenCode.',
    source: 'claude-mem',
    keywords: ['AI memory tool', 'Claude session memory', 'AI context management', 'developer productivity tool', 'AI workflow tool'],
    geoTags: ['ai-memory', 'claude', 'context', 'productivity', 'developer-tools'],
    category: 'Software Development',
    features: [
      'Persistent cross-session memory for AI coding tools',
      'Progressive disclosure with token cost visibility',
      'Semantic search + timeline + full observation retrieval',
      'Privacy controls via tag system',
      'MCP search tools for any AI client',
      'Web viewer UI for browsing memory'
    ],
    whatYouGet: [
      'Optimized claude-mem configuration pack',
      'Pre-built team templates (solo dev, startup team, agency)',
      'Memory management best practices guide',
      'MCP integration configs for all tools',
      'Performance optimization guide',
      '3 months of updates'
    ]
  },
  {
    id: 'anti-block-data-harvester',
    name: 'Anti-Block Data Harvester',
    price: '$49.00',
    tagline: 'Scrape any website without getting blocked. Cloudflare bypass, adaptive parsing, stealth mode.',
    source: 'scrapling',
    keywords: ['web scraping tool', 'anti-block scraper', 'data extraction tool', 'Cloudflare bypass', 'Python web scraper'],
    geoTags: ['scraping', 'data-extraction', 'anti-block', 'python', 'web-crawler'],
    category: 'Software Development',
    features: [
      'Adaptive parsing that survives website structure changes',
      'Cloudflare Turnstile/Interstitial bypass out of the box',
      'Stealth browser mode with fingerprint spoofing',
      'Full spider framework (Scrapy-like API)',
      'MCP server for AI-assisted scraping',
      'Interactive CLI shell for development'
    ],
    whatYouGet: [
      'Complete Scrapling framework (all dependencies pre-configured)',
      '20 pre-built spider recipes (ecommerce, social, news, etc.)',
      'Proxy rotation configuration pack',
      'Docker image with all browsers pre-installed',
      'Anti-block best practices guide',
      '6 months of updates'
    ]
  },
  {
    id: 'market-intelligence-engine',
    name: 'Market Intelligence Engine - AI Trend Monitor',
    price: '$49.00',
    tagline: 'Monitor 11 platforms for trending news and topics. AI-filtered, translated, and pushed to any channel.',
    source: 'trendradar',
    keywords: ['AI trend monitoring', 'news aggregation tool', 'social listening tool', 'market intelligence', 'trend analysis tool'],
    geoTags: ['trend-monitoring', 'news-aggregation', 'market-intelligence', 'ai-analysis', 'social-listening'],
    category: 'Business & Money',
    features: [
      'Multi-platform trending aggregation (11 platforms)',
      'AI smart news filtering with natural language interests',
      'AI-powered trend analysis and sentiment scoring',
      '9 push notification channels (Telegram, Email, Slack, etc.)',
      'Docker + GitHub Actions deployment',
      'MCP server for conversational trend analysis'
    ],
    whatYouGet: [
      'Complete TrendRadar deployment (Docker + GitHub Actions)',
      '20 pre-configured AI interest profiles',
      'Custom notification channel configs',
      'MCP server for conversational data analysis',
      'Deployment and configuration guide',
      '3 months of updates'
    ]
  }
];

function generateProductPage(product) {
  const keywordTags = product.keywords.map(k => `<meta property="article:tag" content="${k}">`).join('\n    ');
  const geoSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.tagline,
    offers: {
      '@type': 'Offer',
      price: product.price.replace('$', ''),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    category: product.category
  };

  // Keyword-optimized description with GEO fusion
  const descLines = [
    `Are you searching for a ${product.keywords[0]}? This ${product.name} is the most comprehensive solution available.`,
    `Built for professionals who need ${product.keywords.slice(1,3).join(' and ')}, this product delivers production-ready value.`,
    `Unlike generic free alternatives from open-source communities, this professionally curated package includes documentation, tutorials, and support that turns a raw tool into a complete solution.`
  ];

  return ko`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${product.name} - Buy ${product.keywords[0]}</title>
<meta name="description" content="${product.tagline}">
<meta name="keywords" content="${product.keywords.join(', ')}">
${keywordTags}
<script type="application/ld+json">${JSON.stringify(geoSchema, null, 2)}</script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
  {"@type":"Question","name":"What is ${product.name}?","acceptedAnswer":{"@type":"Answer","text":"${product.name} is a premium ${product.keywords[0]} solution. Unlike free open-source alternatives, this comes with professional documentation, deployment guides, and ongoing updates."}},
  {"@type":"Question","name":"How is this different from the free version?","acceptedAnswer":{"@type":"Answer","text":"This is a professionally curated and enhanced version. While the foundation may be open-source, we add: premium documentation, video tutorials, pre-configured templates, priority updates, and direct support."}},
  {"@type":"Question","name":"How do I pay?","acceptedAnswer":{"@type":"Answer","text":"We accept USDT TRC-20 only. Send payment to the wallet address shown, upload your transaction hash, and receive instant download access."}}
]}
</script>
<link rel="canonical" href="https://agentpro.pages.dev/products/${product.id}">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;background:#0a0a12;color:#e0e0e0;line-height:1.8}
.wrap{max-width:900px;margin:0 auto;padding:40px 24px}
h1{font-size:2.4rem;font-weight:700;color:#fff;margin-bottom:8px;letter-spacing:-0.02em}
h2{font-size:1.5rem;font-weight:600;color:#fff;margin:40px 0 16px}
h3{font-size:1.1rem;font-weight:600;color:#ddd;margin:24px 0 12px}
p{color:#b0b0c0;margin-bottom:16px;font-size:1.05rem}
ul{color:#b0b0c0;margin-bottom:16px;padding-left:24px}
li{margin-bottom:8px}
.price{font-size:3rem;font-weight:700;color:#00e676;margin:24px 0}
.price small{font-size:1rem;color:#888;font-weight:400}
.tagline{font-size:1.2rem;color:#8b7cf7;margin-bottom:24px;font-weight:500}
.badge{display:inline-block;background:#00e67622;color:#00e676;padding:4px 12px;border-radius:20px;font-size:0.85rem;font-weight:600;margin-bottom:16px}
.feature-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin:24px 0}
.feature-card{background:#1a1a2e;border:1px solid #2a2a4a;border-radius:12px;padding:20px}
.feature-card h4{color:#fff;font-size:1rem;margin-bottom:8px}
.feature-card p{font-size:0.9rem;color:#999}
.cta-btn{display:inline-block;background:#00e676;color:#000;padding:16px 48px;border-radius:8px;font-size:1.1rem;font-weight:700;text-decoration:none;margin:24px 0;transition:all 0.2s}
.cta-btn:hover{background:#00c853;transform:translateY(-2px);box-shadow:0 8px 24px #00e67644}
.payment-box{background:#1a1a2e;border:1px solid #333;border-radius:12px;padding:24px;margin:32px 0}
.payment-box code{display:block;background:#0a0a12;padding:16px;border-radius:8px;color:#00e676;font-size:0.9rem;word-break:break-all;margin:12px 0;border:1px solid #2a2a4a}
input[type=text]{width:100%;padding:12px;background:#0a0a12;border:1px solid #333;border-radius:8px;color:#fff;font-size:1rem;margin:8px 0}
.submit-btn{width:100%;padding:14px;background:#8b7cf7;color:#fff;border:none;border-radius:8px;font-size:1.1rem;font-weight:600;cursor:pointer;transition:all 0.2s}
.submit-btn:hover{background:#7c6fe6}
#status{display:none;padding:16px;border-radius:8px;margin:16px 0;text-align:center;font-weight:600}
.status-success{background:#00e67622;color:#00e676;border:1px solid #00e676}
.status-error{background:#ff174422;color:#ff1744;border:1px solid #ff1744}
.status-pending{background:#ffab0044;color:#ffab00;border:1px solid #ffab00}
.footer{text-align:center;padding:24px;color:#444;font-size:0.8rem;border-top:1px solid #2a2a4a;margin-top:48px}
.footer a{color:#666;margin:0 8px;text-decoration:none}
.footer a:hover{color:#8b7cf7}
</style>
</head>
<body>
<div class="wrap">
  <span class="badge">${product.category}</span>
  <h1>${product.name}</h1>
  <div class="tagline">${product.tagline}</div>
  <div class="price">${product.price} <small>one-time payment</small></div>

  <p>${descLines[0]}</p>
  <p>${descLines[1]}</p>
  <p>${descLines[2]}</p>

  <h2>What Makes This Different from Free Alternatives?</h2>
  <p>Most ${product.keywords[0]} solutions found on GitHub are raw code — no documentation, no support, no deployment guides. This premium package transforms raw open-source technology into a <strong>complete, production-ready solution</strong> with professional documentation, video tutorials, pre-configured templates, and ongoing updates.</p>

  <h2>Key Features</h2>
  <div class="feature-grid">
    ${product.features.map(f => `<div class="feature-card"><h4>✦ ${f}</h4><p>Professional-grade feature included in this premium package.</p></div>`).join('')}
  </div>

  <h2>What You Get</h2>
  <ul>
    ${product.whatYouGet.map(w => `<li>${w}</li>`).join('')}
  </ul>

  <h2>Buy Now - USDT TRC-20</h2>
  <div class="payment-box">
    <p><strong>Step 1:</strong> Send <strong>${product.price}</strong> USDT (TRC-20) to:</p>
    <code>TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z</code>
    <p><strong>Step 2:</strong> Enter your transaction hash below:</p>
    <input type="text" id="txid" placeholder="Paste your TRC-20 transaction hash here...">
    <input type="hidden" id="product" value="${product.id}">
    <input type="hidden" id="amount" value="${product.price.replace('$', '')}">
    <button class="submit-btn" onclick="verifyPayment()">Verify Payment & Download</button>
    <div id="status"></div>
    <p style="font-size:0.85rem;color:#666;margin-top:12px">Payment verified on-chain via Tronscan API. Instant delivery after confirmation.</p>
  </div>

  <h2>Why Choose This Product?</h2>
  <ul>
    <li><strong>Professionally curated</strong> — Not raw GitHub code. Every file reviewed, documented, and optimized.</li>
    <li><strong>Video tutorials</strong> — Step-by-step setup guides included.</li>
    <li><strong>Ongoing updates</strong> — 3-6 months of updates included with purchase.</li>
    <li><strong>Direct support</strong> — Email support for installation and configuration.</li>
    <li><strong>USDT TRC-20</strong> — No KYC, no credit card, no company registration.</li>
  </ul>

  <h2>Related Searches</h2>
  <p style="font-size:0.9rem;color:#666">${product.keywords.map(k => `<a href="https://www.google.com/search?q=${encodeURIComponent(k)}" style="color:#8b7cf7;text-decoration:none;margin:0 4px">${k}</a>`).join(' · ')}</p>
</div>

<div class="footer">
  <a href="/">Home</a> · <a href="/products">All Products</a> · <a href="/faq">FAQ</a> · <a href="/contact">Contact</a> · USDT TRC-20: TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z
</div>

<script>
async function verifyPayment() {
  const txid = document.getElementById('txid').value.trim();
  const product = document.getElementById('product').value;
  const amount = document.getElementById('amount').value;
  const status = document.getElementById('status');

  if (!txid) { status.className = 'status-error'; status.style.display = 'block'; status.textContent = 'Please enter a transaction hash.'; return; }
  if (txid.length < 20) { status.className = 'status-error'; status.style.display = 'block'; status.textContent = 'Invalid transaction hash format.'; return; }

  status.className = 'status-pending'; status.style.display = 'block'; status.textContent = 'Verifying on Tronscan... Please wait.';

  try {
    const resp = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ txid, product, amount, slug: '${product.id}' })
    });
    const data = await resp.json();
    if (data.valid) {
      status.className = 'status-success'; status.textContent = 'Payment verified! Redirecting to download...';
      setTimeout(() => { window.location.href = data.downloadUrl; }, 1500);
    } else {
      status.className = 'status-error'; status.textContent = 'Payment not found on chain. Check the transaction hash and try again.';
    }
  } catch(e) {
    status.className = 'status-error'; status.textContent = 'Verification error: ' + e.message;
  }
}
</script>
</body>
</html>`;
}

function generateProductListing(products) {
  return ko`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AgentPro Products - Premium AI Agent & Developer Tools</title>
<meta name="description" content="Premium AI agent personalities, automation workflows, self-hosted USDT payment gateway, and developer tools. Buy with USDT TRC-20.">
<meta name="keywords" content="AI agent bundle, n8n workflow template, Claude Code skills, USDT payment gateway, automation template, generative engine optimization">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;background:#0a0a12;color:#e0e0e0;line-height:1.8}
.wrap{max-width:1100px;margin:0 auto;padding:40px 24px}
h1{font-size:2.4rem;font-weight:700;color:#fff;margin-bottom:24px}
h2{font-size:1.8rem;font-weight:600;color:#fff;margin:40px 0 16px}
p{color:#b0b0c0;margin-bottom:24px}
.product-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px}
.product-card{background:#1a1a2e;border:1px solid #2a2a4a;border-radius:12px;padding:24px;transition:all 0.2s}
.product-card:hover{border-color:#8b7cf7;transform:translateY(-4px);box-shadow:0 12px 40px rgba(139,124,247,0.1)}
.product-card h3{color:#fff;font-size:1.15rem;margin-bottom:8px}
.product-card .desc{font-size:0.9rem;color:#999;margin-bottom:16px}
.product-card .price{font-size:1.5rem;font-weight:700;color:#00e676;margin-bottom:16px}
.product-card .tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px}
.product-card .tag{background:#2a2a4a;color:#aaa;padding:2px 8px;border-radius:4px;font-size:0.75rem}
.product-card .buy-btn{display:inline-block;background:#8b7cf7;color:#fff;padding:10px 24px;border-radius:6px;text-decoration:none;font-weight:600;font-size:0.9rem;transition:all 0.2s}
.product-card .buy-btn:hover{background:#7c6fe6}
.footer{text-align:center;padding:24px;color:#444;font-size:0.8rem;border-top:1px solid #2a2a4a;margin-top:48px}
</style>
</head>
<body>
<div class="wrap">
  <h1>AgentPro Product Store</h1>
  <p>Premium AI agent tools, automation workflows, and self-hosted solutions. Professionally curated, documented, and supported. Pay with USDT TRC-20 — no KYC required.</p>
  
  <h2>Featured Products</h2>
  <div class="product-grid">
    ${products.filter(p => p.id !== 'usdt-payment-gateway-self-hosted').map(p => ko`
    <div class="product-card">
      <h3>${p.name}</h3>
      <div class="desc">${p.tagline}</div>
      <div class="tags">${p.keywords.slice(0,3).map(k => `<span class="tag">${k}</span>`).join('')}</div>
      <div class="price">${p.price}</div>
      <a href="/downloads/${p.id}" class="buy-btn">Buy Now</a>
    </div>`).join('')}
  </div>

  <h2>Flagship: Self-Hosted USDT Payment Gateway</h2>
  <div class="product-card" style="border-color:#00e676;background:#0d2a1a">
    <h3 style="color:#00e676">${products.find(p => p.id === 'usdt-payment-gateway-self-hosted').name}</h3>
    <div class="desc">${products.find(p => p.id === 'usdt-payment-gateway-self-hosted').tagline}</div>
    <div class="tags">${products.find(p => p.id === 'usdt-payment-gateway-self-hosted').keywords.slice(0,3).map(k => `<span class="tag" style="background:#00e67622;color:#00e676">${k}</span>`).join('')}</div>
    <div class="price">$99.00</div>
    <a href="/downloads/usdt-payment-gateway-self-hosted" class="buy-btn" style="background:#00e676;color:#000">Buy Now - Our Flagship Product</a>
  </div>
</div>
<div class="footer">
  <a href="/">Home</a> · <a href="/blog">Blog</a> · <a href="/faq">FAQ</a> · <a href="/contact">Contact</a> · USDT: TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z
</div>
</body>
</html>`;
}

function ko(str, ...vals) {
  return str.reduce((acc, s, i) => acc + (vals[i-1] !== undefined ? vals[i-1] : '') + s);
}

function main() {
  // Generate all product pages
  const productsDir = path.join(DOWNLOADS_DIR);
  fs.mkdirSync(productsDir, { recursive: true });

  for (const product of PRODUCTS) {
    const html = generateProductPage(product);
    const filePath = path.join(productsDir, `${product.id}.html`);
    fs.writeFileSync(filePath, html);
    console.log(`Created: ${product.id}.html (${product.name} - ${product.price})`);
  }

  // Generate product listing page
  const listingHtml = generateProductListing(PRODUCTS);
  const listingPath = path.join(productsDir, 'index.html');
  fs.writeFileSync(listingPath, listingHtml);
  console.log('Created: index.html (product listing)');

  // Generate sitemap entries
  const sitemapEntries = PRODUCTS.map(p => ({
    loc: `https://agentpro.pages.dev/downloads/${p.id}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.8'
  }));

  // Generate site config for generate-multi-site.js integration
  const configPath = path.join(__dirname, '..', 'product-registry.json');
  fs.writeFileSync(configPath, JSON.stringify({
    generated: new Date().toISOString(),
    totalProducts: PRODUCTS.length,
    totalValue: PRODUCTS.reduce((sum, p) => sum + parseFloat(p.price.replace('$', '')), 0),
    products: PRODUCTS.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      keywords: p.keywords,
      source: p.source,
      category: p.category
    }))
  }, null, 2));
  console.log('\n=== Product Registry ===');
  console.log(`Total Products: ${PRODUCTS.length}`);
  console.log(`Total Value: $${PRODUCTS.reduce((sum, p) => sum + parseFloat(p.price.replace('$', '')), 0)}`);
  console.log(`Keywords Covered: ${PRODUCTS.reduce((sum, p) => sum + p.keywords.length, 0)}`);
  console.log(`Search Volume Pool: ${Object.values(KEYWORD_HEAT).reduce((sum, k) => {
    const match = k.vol.match(/([\d.]+)([KM]?)/);
    if (!match) return sum;
    const num = parseFloat(match[1]) * (match[2] === 'K' ? 1000 : match[2] === 'M' ? 1000000 : 1);
    return sum + num;
  }, 0).toLocaleString()}/mo combined`);
}

main();

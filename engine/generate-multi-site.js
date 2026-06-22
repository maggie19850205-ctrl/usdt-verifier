const fs = require('fs');
const path = require('path');
const SITES_DIR = path.resolve(__dirname, '..', 'sites');
fs.mkdirSync(SITES_DIR, { recursive: true });

const CSS = `*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;background:#0a0a12;color:#e0e0e0;line-height:1.8}
.wrap{max-width:1000px;margin:0 auto;padding:40px 24px}
h1{font-size:2.2rem;font-weight:700;color:#fff;margin-bottom:8px;letter-spacing:-0.02em}
h2{font-size:1.4rem;font-weight:600;color:#fff;margin:40px 0 16px}
h3{font-size:1.1rem;font-weight:600;color:#ddd;margin:24px 0 12px}
p{color:#b0b0c0;margin-bottom:16px}
a{color:#8b7cf7;text-decoration:none}a:hover{color:#a99eff}
.footer{text-align:center;padding:24px;color:#333;font-size:0.75rem;border-top:1px solid #2a2a4a;margin-top:48px;line-height:2}
.footer a{color:#555;margin:0 8px}.footer a:hover{color:#8b7cf7}`;

const USDT = 'TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z';
const SIBS = {}; // filled by sites

const sites = [
  {
    slug: 'maomaolove', domain: 'maomaolove.pages.dev',
    title: 'MaoMaoLove - Premium Digital Products',
    desc: 'Premium digital products marketplace. USDT TRC-20 payment, instant delivery, no registration. AI tools, templates, guides, and more.',
    tagline: 'Premium Digital Products for Modern Creators',
    color: '#f472b6',
    theme: 'pink',
    niches: ['Digital Products', 'AI Tools', 'Templates', 'Business'],
    nav: ['Products', 'Tools', 'Blog', 'FAQ'],
    products: [
      {name:'AI Prompt Library (500+ Prompts)', price:'$9.99', slug:'ai-prompt-library', desc:'500+ tested ChatGPT, Claude, and Gemini prompts for content creation, business, and productivity.', badge:'Bestseller'},
      {name:'Notion Business Dashboard', price:'$14.99', slug:'notion-business-dashboard', desc:'Complete Notion workspace for business management. CRM, project tracking, finance, and content calendar.', badge:'Popular'},
      {name:'SEO Audit Checklist Bundle', price:'$19.99', slug:'seo-audit-checklist-bundle', desc:'Comprehensive SEO checklists: technical SEO, on-page, off-page, local SEO, and GEO optimization.', badge:'New'},
      {name:'Content Creation Template Pack', price:'$24.99', slug:'content-creation-template-pack', desc:'50+ templates for blog posts, social media, emails, video scripts, and landing pages.', badge:''},
      {name:'Digital Product Creation Course', price:'$29.99', slug:'digital-product-course', desc:'Step-by-step guide to creating and selling digital products. From idea to first sale in 30 days.', badge:'Hot'},
      {name:'Business Automation Suite', price:'$49.99', slug:'business-automation-suite', desc:'Complete automation workflows for small business. AI-powered email, social, content, and CRM automation.', badge:'Premium'}
    ],
    blogPosts: [
      {slug:'maommaolove-digital-products-guide', title:'MaoMaoLove Digital Products: Complete Guide for Creators', desc:'Everything you need to know about buying and selling digital products on MaoMaoLove. From USDT payment to instant delivery.'},
      {slug:'why-choose-maomaolove', title:'Why MaoMaoLove? The Best Digital Product Marketplace in 2026', desc:'Discover what makes MaoMaoLove different: USDT payments, no registration, GEO-optimized content, and premium quality.'},
      {slug:'maomaolove-vs-other-marketplaces', title:'MaoMaoLove vs Etsy vs Gumroad: Which Is Better for Digital Products?', desc:'Compare MaoMaoLove with Etsy and Gumroad. Fees, traffic sources, payment methods, and creator benefits compared.'}
    ],
    faqs: [
      {q:'What is MaoMaoLove?', a:'MaoMaoLove is a premium digital products marketplace offering AI tools, templates, guides, and business resources. We accept USDT TRC-20 payments and deliver instantly with no registration required.'},
      {q:'How do I pay on MaoMaoLove?', a:'We accept USDT (TRC-20) only. Send payment to our wallet address, upload the transaction hash, and receive instant download access.'},
      {q:'What products does MaoMaoLove offer?', a:'AI prompt libraries, Notion and Canva templates, business guides, automation bundles, SEO/GEO resources, and design assets.'},
      {q:'Is MaoMaoLove available in multiple languages?', a:'Currently available in English. Chinese, Spanish, and Portuguese versions are planned.'}
    ]
  },
  {
    slug: 'aitools', domain: 'aitools-a4r.pages.dev',
    title: 'AITools - AI Prompts & Automation Resources',
    desc: 'Curated AI prompts, ChatGPT templates, and automation guides. Boost your productivity with tested AI workflows.',
    tagline: 'AI Prompts & Automation That Actually Work',
    color: '#00e676',
    theme: 'green',
    niches: ['AI Tools', 'ChatGPT', 'Prompts', 'Automation'],
    nav: ['Prompts', 'Blog', 'Guides', 'FAQ'],
    blogPosts: [
      {slug:'best-chatgpt-prompts-content-creation', title:'10 Best ChatGPT Prompts for Content Creation in 2026', desc:'Tested ChatGPT prompts that save hours of content creation time. Blog posts, social media, emails, and more.'},
      {slug:'ai-automation-workflows-small-business', title:'AI Automation Workflows That Save Small Businesses 20+ Hours/Week', desc:'Complete AI automation workflows for small businesses. From customer service to content publishing, automate everything.'},
      {slug:'chatgpt-vs-claude-vs-gemini-2026', title:'ChatGPT vs Claude vs Gemini: Best AI Assistant for Your Business in 2026', desc:'Compare the top AI assistants for business use. Pricing, features, strengths, and which one fits your needs.'}
    ],
    faqs: [
      {q:'What AI tools do you cover?', a:'We cover ChatGPT, Claude, Gemini, and emerging AI tools. Our prompts and workflows are tested across multiple AI platforms.'},
      {q:'Are your prompts compatible with free AI accounts?', a:'Yes. Most prompts work with free tiers of ChatGPT, Claude, and Gemini. Some advanced prompts may require paid subscriptions.'},
      {q:'Do you offer AI automation consulting?', a:'We provide self-service AI automation guides and bundles. For custom automation, check our complete guide products.'},
      {q:'Can I use your prompts commercially?', a:'Yes. All prompts and workflows are licensed for commercial use.'}
    ]
  },
  {
    slug: 'templatehub', domain: 'templatehub-d7b.pages.dev',
    title: 'TemplateHub - Digital Templates & Design Assets',
    desc: 'Premium digital templates for Notion, Canva, Figma, and more. Planners, dashboards, and design kits for creators.',
    tagline: 'Premium Templates for Your Creative Projects',
    color: '#8b7cf7',
    theme: 'purple',
    niches: ['Templates', 'Design', 'Notion', 'Canva'],
    nav: ['Templates', 'Blog', 'Guides', 'FAQ'],
    blogPosts: [
      {slug:'best-notion-templates-productivity-2026', title:'10 Best Notion Templates for Productivity in 2026', desc:'Curated Notion templates for project management, habit tracking, content planning, and business operations.'},
      {slug:'canva-templates-vs-custom-design', title:'Canva Templates vs Custom Design: What Saves More Money?', desc:'Compare Canva templates with hiring a designer. Costs, quality, turnaround time, and when to use each.'},
      {slug:'digital-planner-templates-guide', title:'Digital Planner Templates: How to Choose and Use in 2026', desc:'Complete guide to digital planner templates. Types, platforms, features, and how to pick the right one.'}
    ],
    faqs: [
      {q:'What template platforms do you support?', a:'Notion, Canva, Figma, Google Sheets, and Microsoft Excel. Each template is designed for its specific platform.'},
      {q:'Can I customize the templates?', a:'Yes. Canva templates are fully editable. Notion templates are duplicate-and-edit. All templates include customization instructions.'},
      {q:'Are your templates compatible with free accounts?', a:'Most templates work with free accounts. Some advanced Notion templates may require a paid Notion plan for full functionality.'},
      {q:'Do you offer template bundles?', a:'Yes. Our bundles include 10-20 related templates at a discounted price compared to buying individually.'}
    ]
  },
  {
    slug: 'geoseo', domain: 'geoseo-bq9.pages.dev',
    title: 'GEOSEO - Generative Engine Optimization Guide',
    desc: 'Complete GEO and SEO resources. Learn how to optimize content for AI search engines like Perplexity, ChatGPT, and Google AI Overview.',
    tagline: 'Optimize for AI Search Engines',
    color: '#f59e0b',
    theme: 'amber',
    niches: ['SEO', 'GEO', 'AI Search', 'Content Strategy'],
    nav: ['Guides', 'Blog', 'Tools', 'FAQ'],
    blogPosts: [
      {slug:'geo-vs-seo-complete-guide-2026', title:'GEO vs SEO: Complete Guide to Generative Engine Optimization in 2026', desc:'Understand the differences between GEO and SEO. Learn how to optimize for both traditional and AI search engines.'},
      {slug:'perplexity-optimization-guide-small-sites', title:'How Small Websites Get Cited by Perplexity AI in 2026', desc:'Step-by-step guide to optimizing your content for Perplexity AI citations. No domain authority needed.'},
      {slug:'chatgpt-search-citation-strategy', title:'ChatGPT Search Citation Strategy: Getting Your Content Cited', desc:'Learn how ChatGPT selects sources for its answers and how to optimize your content to be chosen as a citation.'}
    ],
    faqs: [
      {q:'What is GEO?', a:'Generative Engine Optimization (GEO) is the practice of optimizing content to be cited by AI-powered search engines like Perplexity, ChatGPT, and Google AI Overview.'},
      {q:'Do I need a high-authority site for GEO?', a:'No. GEO favors structured data and clear answers over domain authority. Small sites with proper schema can outperform large sites in AI citations.'},
      {q:'What schema types matter most for GEO?', a:'FAQPage, Article, and HowTo schema are the most cited types by AI search engines.'},
      {q:'How do I measure GEO success?', a:'Track: citation count in AI search results, referral traffic from AI platforms, and brand mention volume.'}
    ]
  },
  {
    slug: 'cryptopay', domain: 'cryptopay-1dm.pages.dev',
    title: 'CryptoPay - USDT & Crypto Payment Guides',
    desc: 'Complete guides for accepting USDT TRC-20 payments. No bank account needed. Works globally.',
    tagline: 'Accept Crypto Payments Anywhere',
    color: '#00bcd4',
    theme: 'cyan',
    niches: ['Crypto', 'USDT', 'Payments', 'Blockchain'],
    nav: ['Guides', 'Blog', 'Tools', 'FAQ'],
    blogPosts: [
      {slug:'accept-usdt-payments-digital-products', title:'How to Accept USDT Payments for Digital Products: Complete 2026 Guide', desc:'Step-by-step guide to accepting USDT TRC-20 payments. No merchant account, no monthly fees, instant settlement.'},
      {slug:'crypto-vs-traditional-payment-comparison', title:'Crypto Payments vs Traditional Payment Processors: Cost Comparison', desc:'Compare fees, settlement times, chargeback risks, and requirements between crypto and traditional payments.'},
      {slug:'usdt-trc-20-vs-erc-20-which-is-better', title:'USDT TRC-20 vs ERC-20: Which Network Should You Use?', desc:'Compare Tron and Ethereum networks for USDT transactions. Speed, fees, security, and ecosystem support.'}
    ],
    faqs: [
      {q:'What is USDT TRC-20?', a:'USDT is a stablecoin pegged to USD. TRC-20 is the Tron network standard. Fast transactions (< 1 minute), low fees (< $0.50), widely supported.'},
      {q:'Do I need a business license to accept crypto?', a:'Requirements vary by country. Many jurisdictions allow sole proprietors to accept crypto without formal registration.'},
      {q:'Can crypto payments be charged back?', a:'No. Crypto transactions are irreversible. This eliminates chargeback fraud entirely.'},
      {q:'What wallet should I use?', a:'Trust Wallet, TronLink, or exchange wallets like Binance. Always use a private wallet for long-term storage.'}
    ]
  },
  {
    slug: 'agentpro', domain: 'agentpro.pages.dev',
    title: 'AgentPro - AI Agent Superstore',
    desc: 'Premium AI agent personalities and internet tools. 236 agents for Claude, Cursor, OpenClaw. Agent-Reach internet kit included.',
    tagline: 'Your AI Workforce, Ready to Deploy',
    color: '#00e676',
    theme: 'green',
    niches: ['AI Agents', 'Claude', 'Agent-Reach', 'Automation'],
    nav: ['Agents', 'Tools', 'Blog', 'FAQ'],
    products: [
      {name:'USDT Payment Gateway - Self-Hosted', price:'$99.00', slug:'usdt-payment-gateway-self-hosted', desc:'Accept USDT TRC-20 payments on your own domain. No KYC, no company registration, no monthly fees. Complete Cloudflare Workers deployment.', badge:'Flagship'},
      {name:'AI Workforce Pro (250 Agent Personalities)', price:'$49.00', slug:'ai-workforce-pro', desc:'Deploy 250 specialized AI agent personalities for Claude Code, Cursor, Codex, and more. Includes SOUL.md files, deployment scripts, and business packs.', badge:'Bestseller'},
      {name:'Automation Empire (2000+ n8n Workflows)', price:'$49.00', slug:'automation-empire', desc:'2000+ production-ready n8n automation workflows across 188 integrations. Search, import, and run in minutes. Docker ready.', badge:'Popular'},
      {name:'GEO Dominance Toolkit', price:'$49.00', slug:'geo-dominance-toolkit', desc:'20 AI-powered Claude Code skills for GEO and SEO. CORE-EEAT content quality framework. Optimize for Perplexity, ChatGPT, Google AI.', badge:'New'},
      {name:'AI Company Builder - Autonomous Agent Teams', price:'$59.00', slug:'ai-company-builder', desc:'Build and deploy autonomous AI agent companies. CEO, CTO, CMO, engineers - all AI. Full orchestration platform.', badge:'Premium'},
      {name:'Anti-Block Data Harvester', price:'$49.00', slug:'anti-block-data-harvester', desc:'Scrape any website without getting blocked. Cloudflare bypass, adaptive parsing, stealth mode. Python framework included.', badge:'New'},
      {name:'Market Intelligence Engine', price:'$49.00', slug:'market-intelligence-engine', desc:'Monitor 11 platforms for trending news. AI-filtered, translated, pushed to any channel. MCP server included.', badge:'Hot'},
      {name:'Infinite Knowledge Factory', price:'$29.00', slug:'infinite-knowledge-factory', desc:'Turn any book, document, or folder into an AI agent skill. PDF, EPUB, DOCX, HTML, MOBI supported.', badge:'Value'},
      {name:'Context Vault - AI Memory System', price:'$29.00', slug:'context-vault', desc:'Persistent cross-session memory for AI coding tools. Never lose context. Works with Claude Code, Gemini CLI, OpenCode.', badge:'Value'},
      {name:'AI Agent Super Bundle (236 Agents)', price:'$29.99', slug:'ai-agent-super-bundle', desc:'Complete collection of 236 specialized AI agent personalities across 16 divisions. Deploy to any AI coding tool.', badge:'Classic'},
      {name:'Agent-Reach Internet Kit', price:'$9.99', slug:'agent-reach-internet-kit', desc:'Give your AI agent real internet access across 13 platforms. Web, YouTube, Twitter, Reddit, and more.', badge:'Starter'}
    ],
    blogPosts: [
      {slug:'ai-agent-personalities-guide', title:'AI Agent Personalities: How to Deploy 250 Specialized Agents', desc:'Complete guide to deploying and using AI agent personalities across Claude Code, Cursor, OpenClaw, and more.'},
      {slug:'self-hosted-usdt-payment-gateway-guide', title:'How to Build a Self-Hosted USDT Payment Gateway in 2026', desc:'Complete guide to accepting USDT TRC-20 payments on your own domain. No KYC, no company registration, no monthly fees.'},
      {slug:'n8n-workflow-automation-2026-guide', title:'2000+ n8n Workflows: The Ultimate Automation Library for 2026', desc:'Build your automation empire with 2000+ production-ready n8n workflows. CRM, AI, email, social media, and more.'},
      {slug:'geo-vs-seo-complete-guide-2026', title:'GEO Dominance: How to Optimize for AI Search Engines in 2026', desc:'Master Generative Engine Optimization. Get cited by Perplexity, ChatGPT, Claude, and Google AI Overview.'},
      {slug:'ai-agent-internet-access-guide', title:'Give Your AI Agents Internet Access: Complete 2026 Guide', desc:'Step-by-step guide to giving AI agents real internet access across 13 platforms. Web, YouTube, Twitter, Reddit, and more.'}
    ],
    faqs: [
      {q:'What products do you sell?', a:'Self-hosted USDT payment gateway, AI agent personality bundles, n8n automation workflows, GEO optimization tools, AI company builder platform, web scraping tools, trend monitoring engines, and AI memory systems.'},
      {q:'How is this different from free GitHub projects?', a:'We transform raw open-source code into complete, production-ready solutions with professional documentation, video tutorials, pre-configured templates, ongoing updates, and direct support.'},
      {q:'How do I pay?', a:'We accept USDT TRC-20 only. Send payment to our wallet address, upload your transaction hash, and receive instant download access. No KYC, no registration.'},
      {q:'Can I use these commercially?', a:'Yes. All products are licensed for commercial use. Each product includes its specific license terms.'}
    ]
  },
  {
    slug: 'sidehustle', domain: 'sidehustle-bks.pages.dev',
    title: 'SideHustle - Make Money Online Guides',
    desc: 'Realistic guides for making money online. Zero investment strategies, digital product creation, and passive income methods.',
    tagline: 'Start Your Side Hustle Today',
    color: '#ef4444',
    theme: 'red',
    niches: ['Side Hustle', 'Make Money', 'Passive Income', 'Online Business'],
    nav: ['Guides', 'Blog', 'Ideas', 'FAQ'],
    blogPosts: [
      {slug:'zero-investment-side-hustle-2026', title:'Zero-Investment Side Hustles That Actually Make Money in 2026', desc:'Side hustles you can start with no money. Free tools, search engine traffic, and proven strategies that work.'},
      {slug:'digital-products-passive-income-2026', title:'Digital Products: The Ultimate Passive Income Strategy for 2026', desc:'Create once, sell forever. Complete guide to building passive income streams with digital products.'},
      {slug:'make-money-ai-without-skills', title:'How to Make Money with AI Even If You Have No Skills', desc:'Use free AI tools to create sellable products. No coding, no design skills, no experience needed.'}
    ],
    faqs: [
      {q:'Can I make money online with zero investment?', a:'Yes. Free AI tools, free website hosting, and free search engine traffic make it possible to start with $0.'},
      {q:'How fast can I make my first dollar?', a:'With consistent effort, first sale typically happens within 2-4 weeks.'},
      {q:'Do I need special skills?', a:'No. AI tools handle content creation and design. Your existing knowledge and interests are sufficient.'},
      {q:'How much can I earn part-time?', a:'Beginners earn $100-500/month in 3-6 months. With more products and experience, $1000-5000+ is achievable.'}
    ]
  }
];

// Build sibling map for cross-links
for (const s of sites) SIBS[s.slug] = s;

function esc(s) { return s.replace(/"/g, '&quot;'); }

function makeSite(site) {
  const dir = path.join(SITES_DIR, site.slug);
  fs.mkdirSync(dir, { recursive: true });
  const BLOG_DIR = path.join(dir, 'blog');
  fs.mkdirSync(BLOG_DIR, { recursive: true });

  const siblings = sites.filter(s => s.slug !== site.slug);
  const crossNav = siblings.map(s => `<a href="https://${s.domain}">${s.title.replace(' - .*','')}</a>`).join('\n    ');

  // —— Homepage ——
  const networkHtml = siblings.map(s => `<div class="product-card"><h3><a href="https://${s.domain}">${s.title}</a></h3><p>${s.tagline}</p><span class="tag">${s.niches[0]}</span></div>`).join('\n');

  let productsSection = '';
  if (site.products && site.products.length) {
    productsSection = `<h2>Featured Products</h2>
<div class="product-grid">
${site.products.map(p => `<div class="prod-card ${p.badge ? 'has-badge' : ''}">
  <div class="prod-badge">${p.badge}</div>
  <h3>${p.name}</h3>
  <p>${esc(p.desc)}</p>
  <div class="prod-footer">
    <span class="prod-price">${p.price} USDT</span>
    <a class="buy-btn" href="https://automoney-store.pages.dev/?product=${p.slug}">Buy Now</a>
  </div>
</div>`).join('\n')}
</div>`;
  }

  const homeHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${site.title}</title>
<meta name="description" content="${esc(site.desc)}">
<link rel="canonical" href="https://${site.domain}/">
<meta name="robots" content="index, follow">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebSite","url":"https://${site.domain}/","name":"${site.title.replace(/"/g,'\\"')}","description":"${esc(site.desc).replace(/"/g,'\\"')}"}</script>
<style>${CSS}
.product-card{background:#16162a;border:1px solid #2a2a4a;border-radius:12px;padding:20px;margin:12px 0}
.product-card h3{margin:0 0 8px}
.product-card h3 a{color:${site.color}}
.product-card p{font-size:0.9rem;margin:0 0 8px}
.tag{display:inline-block;background:#1a1a3e;color:${site.color};font-size:.75rem;padding:2px 10px;border-radius:100px}
.hero{text-align:center;padding:60px 0 40px}
.hero h1{font-size:2.8rem;margin-bottom:16px}
.hero p{font-size:1.1rem;color:#888;max-width:600px;margin:0 auto 24px}
.cta{display:inline-block;background:linear-gradient(135deg,${site.color},${site.color}88);color:#0a0a12;padding:12px 32px;border-radius:100px;font-weight:700;font-size:.95rem}
.sitelist{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin:32px 0}
.nav-links{text-align:center;padding:12px 0;font-size:0.85rem;color:#555}
.nav-links a{color:#888;margin:0 12px}
.product-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin:24px 0}
.prod-card{background:#16162a;border:1px solid #2a2a4a;border-radius:12px;padding:24px;position:relative}
.prod-card h3{font-size:1rem;margin:0 0 8px;color:#fff}
.prod-card p{font-size:0.85rem;color:#888;margin:0 0 16px}
.prod-footer{display:flex;align-items:center;justify-content:space-between}
.prod-price{font-size:1.2rem;font-weight:700;color:${site.color}}
.buy-btn{display:inline-block;background:${site.color};color:#0a0a12;padding:8px 20px;border-radius:100px;font-weight:600;font-size:.85rem}
.buy-btn:hover{opacity:0.9;color:#0a0a12}
.prod-badge{position:absolute;top:-6px;right:12px;background:${site.color};color:#0a0a12;font-size:.7rem;padding:2px 10px;border-radius:100px;font-weight:700}
.has-badge .prod-badge{display:block}
</style></head><body>
<div class="wrap">
<div class="nav-links">
  <a href="/">Home</a>
  ${site.products ? '<a href="/products/">Products</a>' : ''}
  <a href="/blog/">Blog</a>
  <a href="/faq.html">FAQ</a>
${siblings.map(s => `<a href="https://${s.domain}">${s.title.split(' - ')[0]}</a>`).join('\n  ')}
</div>
<div class="hero">
  <h1>${site.title.split(' - ')[0]}</h1>
  <p>${site.tagline}</p>
  <p style="color:#555;font-size:0.9rem">USDT (TRC-20): ${USDT}</p>
  <a href="https://automoney-store.pages.dev/products/" class="cta">Browse All Products →</a>
</div>
${productsSection}
<h2>Our Network Sites</h2>
<div class="sitelist">${networkHtml}</div>
<h2>Latest from Blog</h2>
${site.blogPosts.slice(0,2).map(p => `<div class="product-card"><h3><a href="/blog/${p.slug}.html">${p.title}</a></h3><p>${esc(p.desc)}</p></div>`).join('\n')}
<p style="text-align:center;margin-top:24px"><a href="/blog/" class="cta">View All Posts →</a></p>
<div class="footer">
  <p>&copy; 2026 ${site.title.split(' - ')[0]}</p>
  <p>USDT (TRC-20): ${USDT}</p>
  <p>${siblings.map(s => `<a href="https://${s.domain}">${s.title.split(' - ')[0]}</a>`).join(' · ')}</p>
</div>
</div></body></html>`;
  fs.writeFileSync(path.join(dir, 'index.html'), homeHtml, 'utf-8');

  // —— Blog posts ——
  for (const post of site.blogPosts) {
    const faqs = site.faqs.slice(0, 3);
    const schema = `<script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"${esc(post.title)}","description":"${esc(post.desc)}","author":{"@type":"Person","name":"${site.title.split(' - ')[0]} Team"},"datePublished":"2026-06-20","dateModified":"2026-06-20","mainEntityOfPage":{"@type":"WebPage","@id":"https://${site.domain}/blog/${post.slug}.html"}}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[${faqs.map(f => `{"@type":"Question","name":"${esc(f.q)}","acceptedAnswer":{"@type":"Answer","text":"${esc(f.a)}"}}`).join(',')}]}</script>`;
    const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${post.title} | ${site.title.split(' - ')[0]} Blog</title>
<meta name="description" content="${esc(post.desc)}">
<link rel="canonical" href="https://${site.domain}/blog/${post.slug}.html">
<meta name="robots" content="index, follow">
${schema}
<style>${CSS}
h1{font-size:1.8rem}.meta{color:#555;font-size:.85rem;margin-bottom:32px}
.blog-content p{margin-bottom:16px;color:#b0b0c0}
</style></head><body>
<div class="wrap">
<p style="color:#555;font-size:0.8rem;margin-bottom:24px"><a href="/">Home</a> › <a href="/blog/">Blog</a> › ${post.title}</p>
<h1>${post.title}</h1>
<div class="meta">${site.title.split(' - ')[0]} Team · June 20, 2026</div>
<div class="blog-content">
<p>${post.desc}</p>
<p>This guide is part of the ${site.title.split(' - ')[0]} knowledge base. We provide premium digital products and resources for creators and entrepreneurs.</p>
<p>${siblings.slice(0,2).map(s => `<a href="https://${s.domain}">${s.title.split(' - ')[0]}</a>`).join(' and ')} are sister sites in our network.</p>
<h2>Key Takeaways</h2>
<ul>
<li>${site.niches[0]} is a growing field with significant opportunities</li>
<li>Use structured data and schema markup for better visibility</li>
<li>Accept USDT TRC-20 payments for global reach without banking barriers</li>
</ul>
<h2>Related Resources</h2>
<p>Check out our other sites for more specialized content:</p>
<ul>${siblings.slice(0,4).map(s => `<li><a href="https://${s.domain}">${s.title}</a> — ${s.tagline}</li>`).join('\n')}</ul>
</div>
<div class="footer">
<p>&copy; 2026 ${site.title.split(' - ')[0]} | USDT: ${USDT}</p>
<p>${siblings.map(s => `<a href="https://${s.domain}">${s.title.split(' - ')[0]}</a>`).join(' · ')}</p>
</div>
</div></body></html>`;
    fs.writeFileSync(path.join(BLOG_DIR, `${post.slug}.html`), html, 'utf-8');
    console.log(`  Blog: ${post.slug}.html`);
  }

  // —— FAQ page ——
  const faqSchema = `<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[${site.faqs.map(f => `{"@type":"Question","name":"${esc(f.q)}","acceptedAnswer":{"@type":"Answer","text":"${esc(f.a)}"}}`).join(',')}]}</script>`;
  const faqHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>FAQ | ${site.title.split(' - ')[0]}</title>
<meta name="description" content="${esc(site.title)} frequently asked questions.">
<link rel="canonical" href="https://${site.domain}/faq.html">
<meta name="robots" content="index, follow">
${faqSchema}
<style>${CSS}
.qa{padding:16px;margin:8px 0;background:#16162a;border:1px solid #2a2a4a;border-radius:8px}
.qa-q{color:#fff;font-weight:600;margin-bottom:8px}
.qa-a{color:#b0b0c0;font-size:0.9rem}
</style></head><body>
<div class="wrap">
<p style="color:#555;font-size:0.8rem;margin-bottom:24px"><a href="/">Home</a> › FAQ</p>
<h1>Frequently Asked Questions</h1>
<p style="color:#666;margin-bottom:32px">About ${site.title.split(' - ')[0]}</p>
${site.faqs.map(f => `<div class="qa"><div class="qa-q">${f.q}</div><div class="qa-a">${f.a}</div></div>`).join('\n')}
<div class="footer">
<p>&copy; 2026 ${site.title.split(' - ')[0]} | USDT: ${USDT}</p>
<p>${siblings.map(s => `<a href="https://${s.domain}">${s.title.split(' - ')[0]}</a>`).join(' · ')}</p>
</div>
</div></body></html>`;
  fs.writeFileSync(path.join(dir, 'faq.html'), faqHtml, 'utf-8');

  // —— Blog index page ——
  const blogIndex = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Blog | ${site.title.split(' - ')[0]}</title>
<meta name="description" content="Read the latest articles from ${site.title.split(' - ')[0]}.">
<link rel="canonical" href="https://${site.domain}/blog/">
<meta name="robots" content="index, follow">
<style>${CSS}
.post{background:#16162a;border:1px solid #2a2a4a;border-radius:8px;padding:20px;margin:12px 0}
.post h3{margin:0 0 8px}.post h3 a{color:${site.color}}
.post p{font-size:0.9rem;margin:0}
</style></head><body>
<div class="wrap">
<p style="color:#555;font-size:0.8rem;margin-bottom:24px"><a href="/">Home</a> › Blog</p>
<h1>Blog</h1>
<p style="color:#666;margin-bottom:32px">Latest articles from ${site.title.split(' - ')[0]}</p>
${site.blogPosts.map(p => `<div class="post"><h3><a href="/blog/${p.slug}.html">${p.title}</a></h3><p>${esc(p.desc)}</p></div>`).join('\n')}
<div class="footer">
<p>&copy; 2026 ${site.title.split(' - ')[0]} | USDT: ${USDT}</p>
<p>${siblings.map(s => `<a href="https://${s.domain}">${s.title.split(' - ')[0]}</a>`).join(' · ')}</p>
</div>
</div></body></html>`;
  fs.writeFileSync(path.join(BLOG_DIR, 'index.html'), blogIndex, 'utf-8');

  // —— Products page (maomaolove only) ——
  if (site.products && site.products.length) {
    const prodDir = path.join(dir, 'products');
    fs.mkdirSync(prodDir, { recursive: true });
    const pSchema = `<script type="application/ld+json">{"@context":"https://schema.org","@type":"ItemList","url":"https://${site.domain}/products/","name":"${site.title.split(' - ')[0]} Products","itemListElement":[${site.products.map((p,i) => `{"@type":"ListItem","position":${i+1},"item":{"@type":"Product","name":"${esc(p.name)}","description":"${esc(p.desc)}","offers":{"@type":"Offer","price":${p.price.replace('$','')},"priceCurrency":"USD"}}}`).join(',')}]}</script>`;
    const prodHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Products | ${site.title.split(' - ')[0]}</title>
<meta name="description" content="${esc(site.title)} product catalog. Digital products starting at $9.99. USDT TRC-20 payment, instant delivery.">
<link rel="canonical" href="https://${site.domain}/products/">
<meta name="robots" content="index, follow">
${pSchema}
<style>${CSS}
.product-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;margin:32px 0}
.p-card{background:#16162a;border:1px solid #2a2a4a;border-radius:12px;padding:24px;position:relative}
.p-card h2{font-size:1.1rem;margin:0 0 8px;color:#fff}
.p-card p{font-size:0.85rem;color:#888;margin:0 0 16px}
.p-card .pf{display:flex;align-items:center;justify-content:space-between}
.p-card .pp{font-size:1.3rem;font-weight:700;color:${site.color}}
.p-card .bb{display:inline-block;background:${site.color};color:#0a0a12;padding:8px 20px;border-radius:100px;font-weight:600;font-size:.85rem}
.p-card .pb{position:absolute;top:-6px;right:12px;background:${site.color};color:#0a0a12;font-size:.7rem;padding:2px 10px;border-radius:100px;font-weight:700}
.ins{background:#1a1a3e;border:1px solid #2a2a4a;border-radius:8px;padding:20px;margin:24px 0}
.ins h3{color:${site.color};font-size:1rem;margin:0 0 12px}
.ins ol{margin:0;padding-left:20px}
.ins li{color:#b0b0c0;font-size:0.85rem;margin:6px 0}
.ins code{background:#2a2a4a;padding:2px 8px;border-radius:4px;font-size:.8rem;color:#fff}
</style></head><body>
<div class="wrap">
<p style="color:#555;font-size:0.8rem;margin-bottom:24px"><a href="/">Home</a> › Products</p>
<h1>Digital Products</h1>
<p style="color:#666;margin-bottom:8px">Pay with <strong>USDT (TRC-20)</strong> — no registration, instant delivery.</p>
<div class="ins">
<h3>How to Buy</h3>
<ol>
<li>Send exact USDT amount to: <code>${USDT}</code></li>
<li>Copy your transaction hash (TXID) from your wallet</li>
<li>Click "Buy Now" on the product, paste TXID and email</li>
<li>Receive instant download link</li>
</ol>
</div>
<div class="product-grid">
${site.products.map(p => `<div class="p-card">
  <div class="pb">${p.badge || 'Popular'}</div>
  <h2>${p.name}</h2>
  <p>${esc(p.desc)}</p>
  <div class="pf">
    <span class="pp">${p.price}</span>
    <a class="bb" href="https://automoney-store.pages.dev/?product=${p.slug}">Buy Now →</a>
  </div>
</div>`).join('\n')}
</div>
<div class="footer">
<p>&copy; 2026 ${site.title.split(' - ')[0]} | USDT: ${USDT}</p>
<p>${siblings.map(s => `<a href="https://${s.domain}">${s.title.split(' - ')[0]}</a>`).join(' · ')}</p>
</div>
</div></body></html>`;
    fs.writeFileSync(path.join(prodDir, 'index.html'), prodHtml, 'utf-8');
    console.log(`  Products: ${site.products.length} items`);
  }

  // —— IndexNow key file (same key across all sites) ——
  fs.writeFileSync(path.join(dir, '625e8ab739f0c8372a98ca1a573ff570.txt'), '625e8ab739f0c8372a98ca1a573ff570', 'utf-8');

  // —— robots.txt ——
  fs.writeFileSync(path.join(dir, 'robots.txt'),
    'User-agent: PerplexityBot\nAllow: /\n\nUser-agent: GPTBot\nAllow: /\n\nUser-agent: ChatGPT-User\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /\n\nUser-agent: anthropic-ai\nAllow: /\n\nUser-agent: Claude-Web\nAllow: /\n\nUser-agent: CCBot\nAllow: /\n\nUser-agent: *\nAllow: /\nSitemap: https://' + site.domain + '/sitemap.xml\n', 'utf-8');

  // —— sitemap.xml ——
  const urls = [
    `https://${site.domain}/`,
    `https://${site.domain}/faq.html`,
    ...site.blogPosts.map(p => `https://${site.domain}/blog/${p.slug}.html`),
    `https://${site.domain}/blog/`
  ];
  if (site.products) urls.push(`https://${site.domain}/products/`);
  if (site.slug === 'maomaolove') urls.push(`https://${site.domain}/tools/`);
  fs.writeFileSync(path.join(dir, 'sitemap.xml'),
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map(u => `  <url><loc>${u}</loc><priority>0.8</priority></url>`).join('\n') +
    '\n</urlset>', 'utf-8');

  console.log(`✓ ${site.domain} generated (${urls.length} pages)`);
}

for (const site of sites) makeSite(site);

// —— Generate main brand pages on maomaolove ——
// Tools page that lists all free tools
const toolsHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Free Tools | MaoMaoLove</title>
<meta name="description" content="Free online tools for SEO, content creation, and productivity. No registration required.">
<link rel="canonical" href="https://maomaolove.pages.dev/tools/">
<meta name="robots" content="index, follow">
<style>${CSS}
.tool-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px;margin:32px 0}
.tool-card{background:#16162a;border:1px solid #2a2a4a;border-radius:12px;padding:20px;text-align:center}
.tool-card h3{margin:0 0 8px}.tool-card h3 a{color:#f472b6}
.tool-card p{font-size:0.85rem;margin:0;color:#888}
</style></head><body>
<div class="wrap">
<p style="color:#555;font-size:0.8rem;margin-bottom:24px"><a href="/">Home</a> › Tools</p>
<h1>Free Online Tools</h1>
<p style="color:#666;margin-bottom:24px">No registration, no ads, completely free.</p>
<div class="tool-grid">
  <div class="tool-card"><h3><a href="https://maomaolove.pages.dev/tools/seo-analyzer.html">SEO HTML Analyzer</a></h3><p>Check meta tags, headings, schema, and more</p></div>
  <div class="tool-card"><h3><a href="https://maomaolove.pages.dev/tools/schema-generator.html">Schema Generator</a></h3><p>Generate JSON-LD schema markup</p></div>
  <div class="tool-card"><h3><a href="https://maomaolove.pages.dev/tools/serp-preview.html">SERP Preview Tool</a></h3><p>Preview search result appearance</p></div>
  <div class="tool-card"><h3><a href="https://maomaolove.pages.dev/tools/readability-score.html">Readability Score</a></h3><p>Check Flesch-Kincaid readability</p></div>
</div>
<div class="footer">
<p>&copy; 2026 MaoMaoLove | Visit our network: ${sites.filter(s=>s.slug!=='maomaolove').map(s => `<a href="https://${s.domain}">${s.title.split(' - ')[0]}</a>`).join(' · ')}</p>
</div>
</div></body></html>`;
fs.mkdirSync(path.join(SITES_DIR, 'maomaolove', 'tools'), { recursive: true });
fs.writeFileSync(path.join(SITES_DIR, 'maomaolove', 'tools', 'index.html'), toolsHtml, 'utf-8');

console.log('\nAll sites generated!');

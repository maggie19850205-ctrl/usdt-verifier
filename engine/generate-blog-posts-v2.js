const fs = require('fs');
const path = require('path');

const USDT = 'TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z';

const sites = {
  agentpro: {
    domain: 'agentpro.pages.dev',
    title: 'AgentPro Tools',
    color: '#4fc3f7',
    posts: [
      { title: 'How to Choose the Best AI Coding Agent in 2026', desc: 'Compare the top AI coding agents including Claude Code, Cursor, GitHub Copilot, and more for your development workflow.', keywords: 'ai coding agent, best ai coding assistant 2026, claude code vs cursor' },
      { title: 'N8N Workflow Automation Guide 2026', desc: 'Complete guide to building automation pipelines with n8n, from basic workflows to complex multi-step automations.', keywords: 'n8n workflow automation, n8n guide 2026, automation pipeline tutorial' },
      { title: 'Self-Hosted Crypto Payment Gateway Setup', desc: 'Step-by-step guide to setting up your own self-hosted USDT TRC-20 payment gateway with no third-party fees.', keywords: 'self-hosted payment gateway, crypto payment setup, usdt payment gateway' },
      { title: 'GEO vs SEO Complete Guide 2026', desc: 'Understand the difference between Generative Engine Optimization and traditional SEO for AI search visibility.', keywords: 'geo vs seo, generative engine optimization, ai search optimization 2026' },
      { title: 'AI Agent Personalities Guide for Developers', desc: 'Explore different AI agent personalities and how to customize them for specific development tasks in 2026.', keywords: 'ai agent personalities, customize ai coding agent, agent configuration guide' },
      { title: 'AI Agent Internet Access Configuration', desc: 'Learn how to configure internet access for AI coding agents to browse documentation and fetch real-time data.', keywords: 'ai agent internet access, coding agent browse web, agent configuration' },
      { title: 'Building Automation Pipelines with n8n 2026', desc: 'Deep dive into building production-ready automation pipelines using n8n with error handling and monitoring.', keywords: 'automation pipeline n8n, production workflow automation, n8n best practices' },
      { title: 'Self-Hosted USDT Payment Gateway Guide', desc: 'Complete technical guide to building a self-hosted USDT TRC-20 payment system with Node.js and TronScan API.', keywords: 'usdt payment system, tron payment integration, self-hosted crypto payments' },
      { title: 'Best Free Online Developer Tools 2026', desc: 'Curated list of 71+ free online developer tools including JSON formatter, Base64 encoder, markdown editor and more.', keywords: 'free developer tools 2026, online developer utilities, free coding tools' },
      { title: 'How to Use URL Slug Converter for SEO', desc: 'Guide to creating SEO-friendly URL slugs with our free online slug converter tool.', keywords: 'url slug converter, seo url slugs, slug generator tool' },
      { title: 'Markdown to HTML Converter Guide', desc: 'Quick guide to converting Markdown to clean HTML using our free online converter tool.', keywords: 'markdown to html, md to html converter, online markdown editor' },
      { title: 'Base64 Encoding Decoding Guide for Developers', desc: 'Complete guide to Base64 encoding and decoding for developers, with practical examples and use cases.', keywords: 'base64 encoder decoder, base64 encoding guide, base64 for developers' },
      { title: 'JSON Formatting Best Practices 2026', desc: 'Learn JSON formatting best practices with our free online JSON formatter and validator tool.', keywords: 'json formatter, json validator, json formatting best practices' },
      { title: 'Online Password Generator Security Guide', desc: 'How to create strong passwords using our free online password generator with customizable options.', keywords: 'password generator, strong password creator, online password tool' },
      { title: 'Duplicate Line Remover Tool Guide', desc: 'Efficiently remove duplicate lines from text with our free online duplicate line remover tool.', keywords: 'duplicate line remover, remove duplicate lines, text deduplication tool' },
      { title: 'Text to Slug Converter for SEO Optimization', desc: 'Convert any text to SEO-friendly URL slugs with our free online text to slug converter tool.', keywords: 'text to slug converter, seo url slug, friendly url generator' },
      { title: 'Credit Card Number Validator Guide', desc: 'Learn how to validate credit card numbers using Luhn algorithm with our free online tool.', keywords: 'credit card validator, luhn algorithm, validate card number' },
      { title: 'Caesar Cipher Encoder Decoder Tool', desc: 'Encode and decode messages using Caesar cipher encryption with our free online tool.', keywords: 'caesar cipher, cipher encoder decoder, online encryption tool' },
      { title: 'Roman Numeral Converter Guide', desc: 'Convert between Roman numerals and Arabic numbers with our free online converter tool.', keywords: 'roman numeral converter, roman to number, numeral conversion tool' },
      { title: 'Binary to Text Converter Guide', desc: 'Convert binary code to readable text and vice versa with our free online binary converter.', keywords: 'binary converter, binary to text, text to binary converter' },
      { title: 'Morse Code Translator Tool Guide', desc: 'Translate text to Morse code and decode Morse code messages with our free online tool.', keywords: 'morse code translator, morse code converter, text to morse code' },
      { title: 'ASCII Table Reference Guide', desc: 'Complete ASCII table reference with decimal, hexadecimal, binary and character values for developers.', keywords: 'ascii table, ascii character codes, ascii reference chart' },
      { title: 'Email Extractor Tool Guide', desc: 'Extract email addresses from text content quickly with our free online email extractor tool.', keywords: 'email extractor, extract email addresses, email scraper tool' },
      { title: 'Temperature Converter Between Units', desc: 'Convert temperature between Celsius, Fahrenheit and Kelvin with our free online converter.', keywords: 'temperature converter, celsius to fahrenheit, unit converter tool' },
      { title: 'List Sorter and Organizer Tool', desc: 'Sort lists alphabetically, numerically, or randomly with our free online list sorter tool.', keywords: 'list sorter, sort list online, alphabetical sorter tool' },
      { title: 'Text Statistics Analyzer Tool', desc: 'Analyze text with word count, character count, sentence count and more statistics online free.', keywords: 'text statistics, word counter, character count tool' },
      { title: 'Color Converter Between Hex RGB HSL', desc: 'Convert colors between Hex, RGB and HSL formats with our free online color converter tool.', keywords: 'color converter, hex to rgb, rgb to hex converter' },
      { title: 'JSON to XML Converter Online', desc: 'Convert JSON data to XML format instantly with our free online conversion tool.', keywords: 'json to xml, convert json to xml, json xml converter' },
      { title: 'Excel to JSON Converter Guide', desc: 'Convert Excel spreadsheets to JSON format easily with our free online converter tool.', keywords: 'excel to json, xlsx to json, convert spreadsheet to json' },
      { title: 'HTML Table Generator Tool', desc: 'Generate clean HTML tables from your data with our free online HTML table generator tool.', keywords: 'html table generator, create html table, table maker tool' },
      { title: 'Math Expression Evaluator Online', desc: 'Evaluate complex mathematical expressions instantly with our free online math calculator tool.', keywords: 'math evaluator, expression calculator, online math solver' },
      { title: 'Line Prefix Suffix Add Tool', desc: 'Add prefixes or suffixes to each line of text with our free online text manipulation tool.', keywords: 'line prefix tool, add prefix to lines, text manipulation tool' },
    ]
  },
  autostore: {
    domain: 'automoney-store.pages.dev',
    title: 'AutoMoney Store',
    color: '#66bb6a',
    posts: [
      { title: 'Digital Products Marketplace Guide 2026', desc: 'Complete guide to buying and selling digital products in 2026 with USDT cryptocurrency payments.', keywords: 'digital products marketplace, buy digital products crypto, usdt digital goods' },
      { title: 'USDT Payment Benefits for Digital Goods', desc: 'Why USDT TRC-20 is the best payment method for digital products with low fees and instant settlement.', keywords: 'usdt payment benefits, crypto for digital goods, trc20 payments' },
      { title: 'AI Prompt Library Bundle Review', desc: 'Comprehensive review of premium AI prompt bundles for ChatGPT, Claude and Gemini users.', keywords: 'ai prompt bundle, chatgpt prompts review, claude prompts bundle' },
      { title: 'How to Buy Digital Products with USDT', desc: 'Step-by-step guide to purchasing digital downloads using USDT TRC-20 cryptocurrency payments.', keywords: 'buy with usdt, usdt digital purchase, crypto payment guide' },
      { title: 'Best AI Prompt Templates for Content Creation', desc: 'Top 20 AI prompt templates for creating blog posts, social media content and marketing copy.', keywords: 'ai prompt templates, content creation prompts, writing prompts' },
      { title: 'Why Choose USDT Over PayPal for Digital Goods', desc: 'Compare USDT crypto payments vs PayPal for digital products - fees, speed, chargebacks and privacy.', keywords: 'usdt vs paypal, crypto vs paypal, digital payment comparison' },
      { title: 'Digital Product License Types Explained', desc: 'Understanding commercial use, personal use and extended licenses for digital products.', keywords: 'digital product license, commercial license, personal use license' },
      { title: 'Bundle Deals Guide Save on Digital Products', desc: 'How to save money by purchasing digital product bundles and collections at discounted prices.', keywords: 'digital product bundles, save on digital downloads, bundle deals' },
      { title: 'Notion Template Marketplace Guide 2026', desc: 'Find the best Notion templates for productivity, project management and personal organization.', keywords: 'notion templates, notion marketplace, productivity templates' },
    ]
  },
  cryptopay: {
    domain: 'cryptopay-1dm.pages.dev',
    title: 'CryptoPay Guide',
    color: '#ffd54f',
    posts: [
      { title: 'Setting Up Tron Wallet for USDT Payments', desc: 'Complete guide to setting up a Tron wallet for receiving USDT TRC-20 payments in your business.', keywords: 'tron wallet setup, usdt wallet, trc20 wallet guide' },
      { title: 'Crypto Payment Automation for Merchants', desc: 'How to automate cryptocurrency payment processing for your online store with instant confirmations.', keywords: 'crypto payment automation, merchant crypto payments, automated usdt payments' },
      { title: 'USDT TRC20 vs ERC20 vs BEP20 Comparison', desc: 'Detailed comparison of USDT on TRC20 vs ERC20 vs BEP20 networks - fees, speed and which to choose.', keywords: 'usdt trc20 vs erc20, usdt network comparison, best usdt network' },
      { title: 'What is USDT TRC-20 A Complete Guide', desc: 'Everything you need to know about USDT TRC-20 tokens on the Tron blockchain for payments.', keywords: 'what is usdt trc20, tron usdt explained, tether trc20 guide' },
      { title: 'Crypto Payment Gateway vs Traditional Processor', desc: 'Compare cryptocurrency payment gateways with traditional processors like Stripe and PayPal.', keywords: 'crypto vs traditional payment, crypto gateway comparison, payment processor comparison' },
      { title: 'How to Accept USDT Payments on Your Website', desc: 'Technical guide to integrating USDT TRC-20 payment buttons and checkout on your website.', keywords: 'accept usdt payments, integrate usdt checkout, website crypto payments' },
      { title: 'TronScan API Payment Verification Guide', desc: 'Use TronScan API to verify USDT TRC-20 transactions and automate payment confirmation.', keywords: 'tronscan api, usdt verification api, transaction verification' },
      { title: 'Top 10 Cryptocurrencies for Online Payments', desc: 'Compare the best cryptocurrencies for online payments including USDT, USDC, BTC and more.', keywords: 'best crypto payments, cryptocurrency for online shopping, top payment coins' },
    ]
  },
  sidehustle: {
    domain: 'sidehustle-bks.pages.dev',
    title: 'SideHustle Ideas',
    color: '#ff8a65',
    posts: [
      { title: 'Side Hustle Digital Products 2026', desc: 'Start a profitable side hustle selling digital products online with zero upfront investment.', keywords: 'side hustle digital products, online side business, digital product selling' },
      { title: 'Make Money with AI Tools in 2026', desc: 'Proven strategies to generate income using AI tools like ChatGPT and Claude for content creation.', keywords: 'make money with ai, ai side hustle, chatgpt income 2026' },
      { title: 'Passive Income Strategies 2026', desc: 'Build passive income streams with digital products that sell while you sleep.', keywords: 'passive income strategies, digital product passive income, make money online' },
      { title: 'Zero Investment Side Hustle 2026', desc: 'Start a side business with zero investment using free tools and your existing skills.', keywords: 'zero investment side hustle, start business no money, free side business' },
      { title: 'Digital Products Passive Income Guide', desc: 'Create and sell digital products once, earn income on autopilot with automated delivery.', keywords: 'digital products passive income, automated income, sell once earn forever' },
      { title: 'Make Money with AI Without Technical Skills', desc: 'Non-technical ways to earn money using AI tools for content, design and marketing.', keywords: 'ai without skills, non technical ai income, ai for beginners income' },
    ]
  },
  templatehub: {
    domain: 'templatehub-d7b.pages.dev',
    title: 'TemplateHub',
    color: '#ce93d8',
    posts: [
      { title: 'Notion vs Canva vs Figma Templates', desc: 'Compare Notion, Canva and Figma templates to find the best platform for your needs.', keywords: 'notion vs canva vs figma, template platforms, best template sites' },
      { title: 'Free vs Premium Templates Guide', desc: 'When to use free templates vs investing in premium templates for your business.', keywords: 'free vs premium templates, free templates vs paid, template investment guide' },
      { title: 'Canva Templates for Small Business Branding', desc: 'Build your brand identity with Canva templates designed for small businesses and startups.', keywords: 'canva templates branding, small business templates, brand identity canva' },
      { title: 'Best Notion Templates for Productivity 2026', desc: 'Top Notion templates to supercharge your productivity and organize your workflow.', keywords: 'notion productivity templates, best notion templates, notion workspace' },
      { title: 'Canva Templates vs Custom Design', desc: 'Should you use Canva templates or hire a custom designer for your business.', keywords: 'canva vs custom design, template vs designer, diy design vs professional' },
      { title: 'Digital Planner Templates Complete Guide', desc: 'Find the best digital planner templates for organization, goal tracking and daily planning.', keywords: 'digital planner templates, planning templates, digital organization' },
    ]
  },
  aitools: {
    domain: 'aitools-a4r.pages.dev',
    title: 'AI Tools Hub',
    color: '#ef5350',
    posts: [
      { title: 'AI Automation Tools for Productivity Workflow', desc: 'Best AI automation tools to streamline your workflow and boost productivity in 2026.', keywords: 'ai automation tools, productivity workflow, ai workflow automation' },
      { title: 'ChatGPT Prompts for Business Automation', desc: 'Use ChatGPT prompts to automate business tasks from customer service to content creation.', keywords: 'chatgpt prompts business, ai business automation, prompt engineering business' },
      { title: 'AI Prompt Engineering Best Practices', desc: 'Master prompt engineering with proven techniques for better AI responses.', keywords: 'prompt engineering best practices, ai prompt techniques, prompt engineering guide' },
      { title: 'Best ChatGPT Prompts for Content Creation', desc: 'Generate high-quality content with these tested ChatGPT prompts for blogs and marketing.', keywords: 'chatgpt content creation, ai writing prompts, content generation prompts' },
      { title: 'AI Automation Workflows for Small Business', desc: 'Implement AI automation workflows in your small business to save time and reduce costs.', keywords: 'ai automation small business, business automation workflows, ai cost reduction' },
      { title: 'ChatGPT vs Claude vs Gemini 2026', desc: 'Head-to-head comparison of ChatGPT, Claude and Gemini for various use cases in 2026.', keywords: 'chatgpt vs claude vs gemini, ai model comparison 2026, best ai assistant' },
    ]
  },
  geoseo: {
    domain: 'geoseo-bq9.pages.dev',
    title: 'GEOSEO Pro',
    color: '#26a69a',
    posts: [
      { title: 'GEO Strategy Content Optimization 2026', desc: 'Optimize your content for AI search engines like ChatGPT Search, Perplexity and Google AI Overviews.', keywords: 'geo strategy, ai search optimization, content optimization ai search' },
      { title: 'Schema Markup Guide for AI Search Citations', desc: 'Use schema markup to get your content cited by AI search engines and chatbots.', keywords: 'schema markup ai search, structured data citations, ai search schema' },
      { title: 'Perplexity AI Optimization Technical SEO', desc: 'Technical SEO strategies specifically for ranking in Perplexity AI search results.', keywords: 'perplexity optimization, perplexity seo, ai search ranking' },
      { title: 'GEO vs SEO Complete Guide 2026', desc: 'Understanding the shift from traditional SEO to Generative Engine Optimization for AI search.', keywords: 'geo vs seo 2026, generative engine optimization guide, ai search future' },
      { title: 'ChatGPT Search Citation Strategy', desc: 'How to structure your content to appear as citations in ChatGPT Search results.', keywords: 'chatgpt search citations, appear in chatgpt search, ai citation strategy' },
    ]
  },
  maomaolove: {
    domain: 'maomaolove.pages.dev',
    title: 'MaoMaoLove',
    color: '#f06292',
    posts: [
      { title: 'Digital Products Business Guide 2026', desc: 'Complete guide to starting and growing a digital products business selling templates and tools.', keywords: 'digital products business, online business guide, digital entrepreneurship' },
      { title: 'USDT Digital Product Payment Guide', desc: 'Learn how to buy and sell digital products using USDT TRC-20 cryptocurrency payments.', keywords: 'usdt digital products, crypto payments guide, digital goods payment' },
      { title: 'Content Creation Templates for Productivity', desc: 'Boost your content creation workflow with these productivity templates and tools.', keywords: 'content creation templates, productivity workflow, content planning tools' },
      { title: 'Why Choose MaoMaoLove for Digital Products', desc: 'Discover what makes MaoMaoLove the best marketplace for premium digital products.', keywords: 'maomaolove marketplace, digital product store, premium templates' },
      { title: 'MaoMaoLove vs Other Digital Marketplaces', desc: 'Compare MaoMaoLove with other digital product marketplaces on price, quality and support.', keywords: 'maomaolove vs competitors, digital marketplace comparison, best template store' },
      { title: 'Notion Template Collection at MaoMaoLove', desc: 'Browse our curated collection of premium Notion templates for productivity and planning.', keywords: 'notion templates collection, premium notion templates, maomaolove templates' },
    ]
  }
};

const CSS = `body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0d0d1a;color:#e0e0e0;margin:0;padding:20px;line-height:1.7}
.wrap{max-width:720px;margin:0 auto;padding:20px}
h1{font-size:1.6rem;margin-bottom:0.5rem}
h2{font-size:1.2rem;color:#aaa;margin-top:2rem}
p{font-size:1rem;color:#bbb;margin-bottom:1rem}
a{color:#4fc3f7}
ul{color:#bbb;padding-left:20px}
li{margin-bottom:0.5rem}
pre{background:#1a1a2e;padding:12px;border-radius:6px;overflow-x:auto;font-size:0.85rem}
code{background:#1a1a2e;padding:2px 6px;border-radius:3px;font-size:0.85rem}
.footer{border-top:1px solid #2a2a4a;margin-top:40px;padding-top:20px;font-size:0.8rem;color:#555}
.footer a{color:#555}`;

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function generatePostHtml(site, post, index) {
  const words = post.desc.split(' ');
  const bodyContent = generateBody(site, post, index);
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(post.title)} | ${site.title}</title>
<meta name="description" content="${esc(post.desc)}">
<meta name="keywords" content="${esc(post.keywords)}">
<link rel="canonical" href="https://${site.domain}/blog/${slugify(post.title)}.html">
<meta name="robots" content="index, follow">
<style>${CSS}</style></head><body>
<div class="wrap">
<p style="color:#555;font-size:0.8rem"><a href="/">Home</a> › <a href="/blog/">Blog</a> › ${esc(post.title)}</p>
<h1>${esc(post.title)}</h1>
<p style="color:#666;font-size:0.85rem">Published 2026 | ${site.title}</p>
${bodyContent}
<div class="footer">
<p>&copy; 2026 ${site.title} | USDT: ${USDT}</p>
<p style="margin-top:8px"><a href="/">Home</a> | <a href="/blog/">Blog</a> | <a href="/products/">Products</a></p>
</div>
</div></body></html>`;
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
}

function generateBody(site, post, index) {
  const topics = [
    `<h2>What is ${post.title.split(' in')[0].split(' for')[0].split(' 2026')[0]}?</h2>
<p>${post.title} is an essential topic for anyone interested in ${post.keywords.split(',')[0]}. This comprehensive guide covers everything you need to know to get started and master the subject.</p>
<p>Whether you are a beginner looking to learn the basics or an experienced professional seeking advanced insights, this guide provides practical, actionable information you can use immediately.</p>

<h2>Why This Matters in 2026</h2>
<p>The digital landscape continues to evolve rapidly in 2026. Understanding ${post.keywords.split(',')[0]} gives you a competitive advantage in your personal and professional projects.</p>
<p>With the rise of AI-powered tools and automation, staying informed about ${post.title.toLowerCase()} has never been more important. This guide will help you navigate the current trends and best practices.</p>

<h2>Key Benefits</h2>
<ul>
<li>Save time and effort with proven strategies and techniques</li>
<li>Improve your workflow efficiency and productivity</li>
<li>Stay ahead of the curve with 2026-ready approaches</li>
<li>Access free tools and resources to implement what you learn</li>
</ul>

<h2>Getting Started</h2>
<p>Follow these steps to get started with ${post.title.toLowerCase()}:</p>
<ul>
<li>Understand the core concepts and terminology</li>
<li>Set up the necessary tools and environment</li>
<li>Practice with real-world examples and use cases</li>
<li>Iterate and optimize based on your results</li>
</ul>

<p>Ready to learn more? Check out our <a href="/">free tools</a> and <a href="/products/">premium products</a> designed to help you succeed.</p>`,

    `<h2>Understanding ${post.title.split(' -')[0].split(' vs')[0].split(':')[0]}</h2>
<p>${post.title.split(' in')[0]} plays a crucial role in modern workflows and business operations. This in-depth guide explores the key concepts, tools, and strategies you need to know.</p>
<p>The landscape has changed significantly in recent years, and keeping up with the latest developments is essential for anyone working in this space.</p>

<h2>Key Concepts to Know</h2>
<ul>
<li><strong>Core Principles:</strong> Understanding the fundamentals of ${post.keywords.split(',')[0]}</li>
<li><strong>Best Practices:</strong> Industry-standard approaches for optimal results</li>
<li><strong>Common Pitfalls:</strong> Mistakes to avoid when implementing these strategies</li>
<li><strong>Advanced Techniques:</strong> Taking your knowledge to the next level</li>
</ul>

<h2>Practical Tips</h2>
<p>Here are some practical tips to help you get the most out of your efforts:</p>
<ul>
<li>Start with a clear goal and defined objectives</li>
<li>Use the right tools for your specific needs</li>
<li>Test and measure your results regularly</li>
<li>Iterate based on feedback and performance data</li>
</ul>

<h2>Tools and Resources</h2>
<p>We offer a range of <a href="/">free online tools</a> that can help you implement these strategies. From text processing utilities to developer tools, our collection has everything you need.</p>
<p>For those looking for more comprehensive solutions, check out our <a href="/products/">premium product collection</a>.</p>`,

    `<h2>A Complete Overview of ${post.title.split(' 2026')[0]}</h2>
<p>Welcome to our comprehensive guide on ${post.title.toLowerCase()}. Whether you are new to this topic or looking to deepen your understanding, this article provides valuable insights and practical knowledge.</p>
<p>In 2026, the importance of ${post.keywords.split(',')[0]} continues to grow as technology and best practices evolve.</p>

<h2>What You Will Learn</h2>
<ul>
<li>Fundamental concepts and underlying principles</li>
<li>Step-by-step implementation strategies</li>
<li>Real-world applications and use cases</li>
<li>Expert tips and advanced techniques</li>
</ul>

<h2>Step-by-Step Guide</h2>
<p>Follow this step-by-step guide to master ${post.title.toLowerCase()}:</p>
<ol>
<li><strong>Research:</strong> Understand the landscape and identify your goals</li>
<li><strong>Plan:</strong> Create a strategy that aligns with your objectives</li>
<li><strong>Execute:</strong> Implement using best practices and recommended tools</li>
<li><strong>Review:</strong> Analyze results and optimize for better outcomes</li>
</ol>

<h2>Why Choose Our Approach</h2>
<p>Our methods are tested, proven, and optimized for 2026. We combine industry best practices with practical experience to deliver results you can rely on.</p>
<p>Explore our <a href="/blog/">blog</a> for more articles, or browse our <a href="/products/">products</a> for premium solutions.</p>`
  ];
  return topics[index % topics.length];
}

// Generate for all sites
let total = 0;
for (const [key, site] of Object.entries(sites)) {
  const siteDir = key === 'autostore' ? 'output' : `sites/${key}`;
  const blogDir = path.join(siteDir, 'blog');
  fs.mkdirSync(blogDir, { recursive: true });

  for (let i = 0; i < site.posts.length; i++) {
    const post = site.posts[i];
    const slug = slugify(post.title);
    const html = generatePostHtml(site, post, i);
    const filePath = path.join(blogDir, `${slug}.html`);
    fs.writeFileSync(filePath, html, 'utf-8');
    console.log(`  Blog: ${slug}.html`);
    total++;
  }

  // Update blog index
  if (fs.existsSync(blogDir)) {
    const allPosts = fs.readdirSync(blogDir)
      .filter(f => f.endsWith('.html') && f !== 'index.html')
      .sort().reverse();
    const blogIndex = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Blog | ${site.title}</title>
<meta name="description" content="Read the latest articles from ${site.title}.">
<link rel="canonical" href="https://${site.domain}/blog/">
<meta name="robots" content="index, follow">
<style>${CSS}</style></head><body>
<div class="wrap">
<p style="color:#555;font-size:0.8rem;margin-bottom:24px"><a href="/">Home</a> › Blog</p>
<h1>Blog</h1>
<p style="color:#666;margin-bottom:32px">Latest articles from ${site.title}</p>
${allPosts.map(f => {
  const content = fs.readFileSync(path.join(blogDir, f), 'utf8');
  const title = (content.match(/<title>([^<]+)<\/title>/) || [,f.replace('.html','')])[1];
  const desc = (content.match(/<meta name="description" content="([^"]+)">/) || [,''])[1];
  return `<div class="post"><h3><a href="/blog/${f.replace('.html','')}.html">${esc(title)}</a></h3><p>${desc ? esc(desc) : ''}</p></div>`;
}).join('\n')}
<div class="footer">
<p>&copy; 2026 ${site.title} | USDT: ${USDT}</p>
</div>
</div></body></html>`;
    fs.writeFileSync(path.join(blogDir, 'index.html'), blogIndex, 'utf-8');
    console.log(`  Blog index updated: ${allPosts.length} posts`);
  }
  console.log(`✓ ${site.domain} generated (${site.posts.length} new posts)`);
}

console.log(`\nDone! ${total} new blog posts generated across ${Object.keys(sites).length} sites.`);

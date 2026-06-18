const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const ai = require('./ai-provider.js');

const ROOT = path.resolve(__dirname, '..');
const DOWNLOADS_DIR = path.join(ROOT, 'output', 'downloads');
const PAGES_DIR = path.join(ROOT, 'output', 'pages');
const SITE_URL = 'https://automoney-store.pages.dev';

// Comprehensive digital product database (pre-defined, AI-enhanced)
const PRODUCT_IDEAS = [
  // AI & Automation (20)
  { name: 'AI Chatbot Setup Guide', cat: 'AI Automation' },
  { name: 'ChatGPT Prompt Engineering Bundle', cat: 'AI Automation' },
  { name: 'AI Workflow Automation Blueprint', cat: 'AI Automation' },
  { name: 'Machine Learning Project Starter Kit', cat: 'AI Automation' },
  { name: 'AI Image Generation Prompt Pack', cat: 'AI Automation' },
  { name: 'AI Voiceover Script Templates', cat: 'AI Automation' },
  { name: 'AutoGPT Agent Configuration Guide', cat: 'AI Automation' },
  { name: 'AI Customer Service Automation', cat: 'AI Automation' },
  { name: 'AI Video Script Generator', cat: 'AI Automation' },
  { name: 'AI Content Repurposing System', cat: 'AI Automation' },
  { name: 'AI Meeting Note Taker Template', cat: 'AI Automation' },
  { name: 'AI Code Review Checklist', cat: 'AI Automation' },
  { name: 'AI Data Analysis Workbook', cat: 'AI Automation' },
  { name: 'AI Email Auto-Responder Pack', cat: 'AI Automation' },
  { name: 'AI Social Media Post Generator', cat: 'AI Automation' },
  { name: 'AI SEO Content Optimizer Guide', cat: 'AI Automation' },
  { name: 'AI Resume Builder Templates', cat: 'AI Automation' },
  { name: 'AI Travel Planner Workbook', cat: 'AI Automation' },
  { name: 'AI Fitness Coach Prompt Pack', cat: 'AI Automation' },
  { name: 'AI Recipe Generator Templates', cat: 'AI Automation' },
  // Digital Marketing (15)
  { name: 'Social Media Content Calendar', cat: 'Digital Marketing' },
  { name: 'Email Marketing Funnel Blueprint', cat: 'Digital Marketing' },
  { name: 'Instagram Growth Checklist', cat: 'Digital Marketing' },
  { name: 'TikTok Viral Video Formula', cat: 'Digital Marketing' },
  { name: 'LinkedIn Lead Gen Templates', cat: 'Digital Marketing' },
  { name: 'YouTube SEO Optimization Guide', cat: 'Digital Marketing' },
  { name: 'Facebook Ads Cheat Sheet', cat: 'Digital Marketing' },
  { name: 'Pinterest SEO Strategy Pack', cat: 'Digital Marketing' },
  { name: 'Twitter/X Growth System', cat: 'Digital Marketing' },
  { name: 'Newsletter Content Templates', cat: 'Digital Marketing' },
  { name: 'Marketing Analytics Dashboard', cat: 'Digital Marketing' },
  { name: 'Conversion Rate Optimization Kit', cat: 'Digital Marketing' },
  { name: 'Landing Page Copy Templates', cat: 'Digital Marketing' },
  { name: 'Sales Funnel Builder Workbook', cat: 'Digital Marketing' },
  { name: 'Brand Voice Style Guide Kit', cat: 'Digital Marketing' },
  // Freelancing & Business (15)
  { name: 'Freelance Proposal Templates', cat: 'Freelancing' },
  { name: 'Client Onboarding Kit', cat: 'Freelancing' },
  { name: 'Invoice Template Pack', cat: 'Freelancing' },
  { name: 'Contract Template Bundle', cat: 'Freelancing' },
  { name: 'Project Management Templates', cat: 'Freelancing' },
  { name: 'Time Tracking Spreadsheet', cat: 'Freelancing' },
  { name: 'Business Plan Template', cat: 'Business Strategy' },
  { name: 'Pricing Strategy Guide', cat: 'Business Strategy' },
  { name: 'Market Research Workbook', cat: 'Business Strategy' },
  { name: 'Competitor Analysis Template', cat: 'Business Strategy' },
  { name: 'SWOT Analysis Kit', cat: 'Business Strategy' },
  { name: 'Customer Avatar Workbook', cat: 'Business Strategy' },
  { name: 'Product Launch Checklist', cat: 'Business Strategy' },
  { name: 'Hiring Interview Question Pack', cat: 'Business Strategy' },
  { name: 'Employee Handbook Template', cat: 'Business Strategy' },
  // Productivity & Organization (10)
  { name: 'Notion Dashboard System', cat: 'Productivity' },
  { name: 'Daily Planner Templates', cat: 'Productivity' },
  { name: 'Goal Setting Workbook', cat: 'Productivity' },
  { name: 'Habit Tracker System', cat: 'Productivity' },
  { name: 'Second Brain Notion Setup', cat: 'Productivity' },
  { name: 'Eisenhower Matrix Pack', cat: 'Productivity' },
  { name: 'Pomodoro Technique Kit', cat: 'Productivity' },
  { name: 'Weekly Review Templates', cat: 'Productivity' },
  { name: 'Project Prioritization Matrix', cat: 'Productivity' },
  { name: 'Digital Declutter Checklist', cat: 'Productivity' },
  // E-commerce & Passive Income (10)
  { name: 'Shopify Store Setup Guide', cat: 'E-commerce' },
  { name: 'Product Listing Optimization', cat: 'E-commerce' },
  { name: 'Etsy SEO Keyword Pack', cat: 'E-commerce' },
  { name: 'Dropshipping Supplier List', cat: 'E-commerce' },
  { name: 'Print on Demand Design Pack', cat: 'E-commerce' },
  { name: 'Affiliate Marketing Toolkit', cat: 'E-commerce' },
  { name: 'Digital Product Launch Kit', cat: 'E-commerce' },
  { name: 'KDP Low Content Book Pack', cat: 'E-commerce' },
  { name: 'Crypto Trading Journal', cat: 'Crypto & Blockchain' },
  { name: 'NFT Minting Guide', cat: 'Crypto & Blockchain' },
  // Design & Content (10)
  { name: 'Canva Template Bundle', cat: 'Design & Branding' },
  { name: 'Logo Design Inspiration Pack', cat: 'Design & Branding' },
  { name: 'Color Palette Collection', cat: 'Design & Branding' },
  { name: 'Font Pairing Guide', cat: 'Design & Branding' },
  { name: 'Brand Identity Template', cat: 'Design & Branding' },
  { name: 'Content Writing Templates', cat: 'Content Creation' },
  { name: 'Copywriting Formula Pack', cat: 'Content Creation' },
  { name: 'Blog Post Outline Templates', cat: 'Content Creation' },
  { name: 'Video Script Structure Kit', cat: 'Content Creation' },
  { name: 'Storytelling Framework Guide', cat: 'Content Creation' },
];

const CONTENT_TYPES = [
  { id: 'complete-guide', name: 'Complete Guide', price: 5.99 },
  { id: 'checklist-workbook', name: 'Checklist Workbook', price: 3.99 },
  { id: 'template-pack', name: 'Template Pack', price: 4.99 },
  { id: 'ultimate-bundle', name: 'Ultimate Bundle', price: 8.99 },
];

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function seedRand(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1103515245 + 12345) >>> 0; return (s & 0x7fffffff) / 0x7fffffff; };
}

const CSS = `*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a12;color:#e0e0e0;line-height:1.8}
.wrap{max-width:800px;margin:0 auto;padding:40px 24px}
h1{font-size:2rem;margin-bottom:16px;background:linear-gradient(135deg,#00e676,#00bcd4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
h2{color:#00e676;font-size:1.3rem;margin:32px 0 16px}
h3{color:#00bcd4;font-size:1.1rem;margin:24px 0 12px}
p{margin-bottom:16px;color:#b0b0b0}
ul,ol{margin:0 0 16px 24px;color:#b0b0b0}
li{margin-bottom:8px}
.price{font-size:1.5rem;color:#00e676;font-weight:700;margin:16px 0}
.badge{display:inline-block;background:#00e67620;color:#00e676;padding:4px 12px;border-radius:100px;font-size:0.8rem;font-weight:600;margin-bottom:16px}
.pill-grid{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0}
.pill{background:#16162a;border:1px solid #2a2a4a;border-radius:100px;padding:6px 16px;font-size:0.8rem;color:#aaa}
.highlight{background:#16162a;border:1px solid #2a2a4a;border-radius:8px;padding:20px;margin:24px 0}
.steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:16px;margin:24px 0}
.step{background:#16162a;border:1px solid #2a2a4a;border-radius:12px;padding:20px;text-align:center}
.step .num{width:32px;height:32px;border-radius:50%;background:#00e67620;color:#00e676;line-height:32px;font-weight:700;margin:0 auto 12px}
.cta-btn{display:inline-block;background:linear-gradient(135deg,#00e676,#00bcd4);color:#0a0a12;padding:14px 40px;border-radius:100px;text-decoration:none;font-weight:700;margin:24px 0}
.footer{text-align:center;padding:32px;color:#333;font-size:0.75rem;border-top:1px solid #2a2a4a;margin-top:48px}
@media(max-width:600px){.wrap{padding:24px 16px}h1{font-size:1.5rem}}`;

const SEO_META = (title, desc, slug) => `
<meta name="description" content="${desc.substring(0, 160)}">
<link rel="canonical" href="${SITE_URL}/downloads/${slug}/">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc.substring(0, 160)}">
<meta property="og:type" content="product">
<meta name="robots" content="index, follow">
<meta name="article:modified_time" content="${new Date().toISOString().split('T')[0]}">
`;

const CONTENT_TEMPLATES = {
  'complete-guide': {
    system: (name, cat) => `Write a complete practical guide about "${name}" in ${cat}. Include specific actionable steps.`,
    user: (name) => `Write a 3-paragraph guide about ${name}. Include specific tools, steps to implement, and expected results. Keep it practical and actionable.`,
    desc: (name) => `A comprehensive step-by-step guide to mastering ${name.toLowerCase()}. Includes practical strategies, tools, and actionable frameworks.`,
  },
  'checklist-workbook': {
    system: (name, cat) => `Create a practical checklist for "${name}" in ${cat}.`,
    user: (name) => `Create a 10-item actionable checklist for ${name}. Each item should be a specific, measurable action. Start each with a verb.`,
    desc: (name) => `An actionable ${name.toLowerCase()} checklist. Track your progress and ensure you don't miss any critical steps.`,
  },
  'template-pack': {
    system: (name, cat) => `Describe a template pack for "${name}" in ${cat}.`,
    user: (name) => `Describe 5 specific templates for ${name}. What each template contains and how to use it.`,
    desc: (name) => `Ready-to-use ${name.toLowerCase()} templates. Save hours with professionally designed, customizable templates.`,
  },
  'ultimate-bundle': {
    system: (name, cat) => `Describe an ultimate bundle for "${name}" in ${cat}. Cover everything included.`,
    user: (name) => `Write a 3-paragraph description of the ultimate ${name} bundle. What's included, who it's for, value proposition.`,
    desc: (name) => `The complete ${name.toLowerCase()} bundle. Get the guide, checklist, templates, and bonus resources in one package.`,
  },
};

async function generateContent(name, typeId, seed) {
  const tpl = CONTENT_TEMPLATES[typeId];
  const rng = seedRand(seed);

  const content = await ai.generate(
    tpl.system(name, ''),
    tpl.user(name),
    400, seed
  );

  // If AI returns RNG fallback (single line of vocab), use template-based content
  if (content.split(' ').length < 15 || !content.includes(' ')) {
    return generateFallbackContent(name, typeId, rng);
  }

  return content;
}

function generateFallbackContent(name, typeId, rng) {
  const verbs = ['Master', 'Learn', 'Implement', 'Apply', 'Master', 'Optimize', 'Streamline', 'Automate', 'Scale', 'Build'];
  const benefits = ['save hours of work', 'increase productivity', 'boost efficiency', 'reduce errors', 'improve quality', 'grow revenue', 'save money', 'get better results'];
  const v = verbs[Math.floor(rng() * verbs.length)];
  const b = benefits[Math.floor(rng() * benefits.length)];

  if (typeId === 'complete-guide') {
    return `${v} ${name.toLowerCase()} with this comprehensive step-by-step guide. You'll learn proven strategies to ${b}. This guide covers everything from fundamentals to advanced techniques, with real-world examples and actionable frameworks you can implement immediately. Perfect for beginners and experienced professionals alike.`;
  } else if (typeId === 'checklist-workbook') {
    const items = [];
    for (let i = 0; i < 8; i++) {
      items.push(`â€?${verbs[Math.floor(rng() * verbs.length)]} your ${name.toLowerCase()} strategy - ${benefits[Math.floor(rng() * benefits.length)]}`);
      rng();
    }
    return items.join('\n');
  } else if (typeId === 'template-pack') {
    return `This template pack includes 5 professionally designed templates for ${name.toLowerCase()}. Each template is fully customizable and comes with detailed usage instructions. ${v} your workflow and ${b} with these ready-to-use templates.`;
  } else {
    return `The ultimate ${name.toLowerCase()} bundle includes our complete guide, checklist workbook, template pack, and bonus resources. ${v} everything you need to ${b}. This comprehensive package saves you hours of research and provides everything you need to succeed.`;
  }
}

async function main() {
  console.log('=== Digital Product Content Factory ===\n');
  fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });

  const batch = 8;
  const startIdx = (batch - 1) * 10;
  const endIdx = Math.min(startIdx + 10, PRODUCT_IDEAS.length);
  const batchItems = PRODUCT_IDEAS.slice(startIdx, endIdx);

  console.log(`Batch ${batch}: Products ${startIdx + 1}-${endIdx} of ${PRODUCT_IDEAS.length}`);

  let created = 0, exists = 0;
  for (const product of batchItems) {
    const baseSlug = slugify(product.name);
    for (const type of CONTENT_TYPES) {
      const fileName = `${baseSlug}-${type.id}.html`;
      const filePath = path.join(DOWNLOADS_DIR, fileName);
      if (fs.existsSync(filePath)) { exists++; continue; }

      const seed = crypto.createHash('md5').update(product.name + type.id).digest().readUInt32LE(0);
      const fullName = `${product.name} - ${type.name}`;
      const rng = seedRand(seed);
      const rating = (4.5 + rng() * 0.5).toFixed(1);
      const pages = Math.floor(15 + rng() * 35);

      const content = await generateContent(product.name, type.id, seed);
      const desc = CONTENT_TEMPLATES[type.id].desc(product.name);

      const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${fullName} - AutoMoney Store</title>
${SEO_META(fullName, desc, baseSlug + '-' + type.id)}
<style>${CSS}</style>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Product","name":"${fullName}","description":"${desc.replace(/"/g, '&quot;')}","offers":{"@type":"Offer","price":${type.price},"priceCurrency":"USD","availability":"https://schema.org/InStock"}}</script>
</head>
<body>
<div class="wrap">
<span class="badge">&#9733; ${rating} | ${pages} pages | Category: ${product.cat}</span>
<h1>${fullName}</h1>
<p class="price">$${type.price.toFixed(2)}</p>

<div class="pill-grid">
${['Digital Download', 'PDF Format', 'Lifetime Access', 'Updates Included'].map(p => `<span class="pill">${p}</span>`).join('\n')}
</div>

<h2>What You'll Get</h2>
${content.split('\n').filter(l => l.trim()).map(l => `<p>${l}</p>`).join('\n')}

<div class="highlight">
<h3>Perfect for:</h3>
<ul>
<li>Entrepreneurs looking to ${seedRand(seed + 999)() > 0.5 ? 'scale their business' : 'improve their workflow'}</li>
<li>Freelancers wanting to ${seedRand(seed + 888)() > 0.5 ? 'attract more clients' : 'deliver better results'}</li>
<li>Anyone ready to ${seedRand(seed + 777)() > 0.5 ? 'learn a new skill' : 'optimize their processes'}</li>
</ul>
</div>

<div style="text-align:center">
<a href="${SITE_URL}" class="cta-btn">Buy Now - $${type.price.toFixed(2)}</a>
</div>

<h2>Payment</h2>
<p>Send USDT (TRC-20) to: <strong>TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z</strong></p>

<div class="footer">
<p>AutoMoney Store &copy; 2026.</p>
</div>
</div>
</body>
</html>`;

      fs.writeFileSync(filePath, html, 'utf-8');
      created++;
      console.log(`  Created: ${fileName}`);
    }
  }

  console.log(`\n=== Batch Complete ===`);
  console.log(`Created: ${created}, Already existed: ${exists}`);

  // Stats
  const totalFiles = fs.readdirSync(DOWNLOADS_DIR).filter(f => f.endsWith('.html')).length;
  console.log(`Total download files: ${totalFiles}`);
  console.log(`Remaining products in queue: ${PRODUCT_IDEAS.length - endIdx}`);

  // Write product queue status
  const status = {
    lastBatch: batch,
    processedUpTo: endIdx,
    totalProducts: PRODUCT_IDEAS.length,
    totalDownloadFiles: totalFiles,
    date: new Date().toISOString(),
  };
  fs.writeFileSync(path.join(ROOT, 'output', '.factory-status.json'), JSON.stringify(status, null, 2));
}

main().catch(console.error);

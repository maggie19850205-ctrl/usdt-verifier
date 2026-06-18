const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const ai = require('./ai-provider.js');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.join(ROOT, 'output', 'blog');
const SITE_URL = 'https://automoney-store.pages.dev';

const TOPICS = [
  'AI Agents for Business Automation in 2026',
  'How to Build a No-Code SaaS Platform',
  'Best Crypto Payment Gateways for Digital Products',
  'Remote Team Productivity Tools That Actually Work',
  'AI Prompt Engineering: A Complete Guide for 2026',
  'Lead Generation Automation: Generate 100+ Leads Daily',
  'Digital Nomad Tools for Location Independence',
  'Freelancing with AI Assistants: Boost Your Income',
  'Notion Productivity Systems That Scale',
  'Perplexity AI for Deep Research: Tips & Tricks',
  'SaaS Pricing Strategies That Maximize Revenue',
  'Social Media AI Schedulers: Save 10+ Hours Weekly',
  'ChatGPT Plugins Development Guide 2026',
  'Automated Content Creation with AI Pipelines',
  'Automated Invoice Systems for Freelancers',
  'AI Video Generation: Create Content in Minutes',
  'API Integration Marketplaces: Build & Sell',
  'AI SEO Optimization: Rank Higher with Less Effort',
  'AI Customer Support Automation: Reduce Costs 80%',
  'AI Code Generation Tools: Ship Products Faster',
];

const CSS = `*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a12;color:#e0e0e0;line-height:1.8}
.wrap{max-width:800px;margin:0 auto;padding:40px 24px}
h1{font-size:2rem;margin-bottom:16px;background:linear-gradient(135deg,#00e676,#00bcd4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.meta{color:#666;font-size:0.85rem;margin-bottom:32px;border-bottom:1px solid #2a2a4a;padding-bottom:16px}
h2{color:#00e676;font-size:1.3rem;margin:32px 0 16px}
h3{color:#00bcd4;font-size:1.1rem;margin:24px 0 12px}
p{margin-bottom:16px;color:#b0b0b0}
ul,ol{margin:0 0 16px 24px;color:#b0b0b0}
li{margin-bottom:8px}
.highlight{background:#16162a;border:1px solid #2a2a4a;border-radius:8px;padding:20px;margin:24px 0}
.footer{text-align:center;padding:24px;color:#333;font-size:0.75rem;border-top:1px solid #2a2a4a;margin-top:48px}
.cta{display:inline-block;background:linear-gradient(135deg,#00e676,#00bcd4);color:#0a0a12;padding:12px 32px;border-radius:100px;text-decoration:none;font-weight:700;font-size:0.9rem;margin:16px 0}
@media(max-width:600px){.wrap{padding:24px 16px}h1{font-size:1.5rem}}`;

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const SECTIONS = [
  'Introduction',
  'Why This Matters in 2026',
  'Getting Started',
  'Key Strategies',
  'Implementation Guide',
  'Common Mistakes to Avoid',
  'Case Study',
  'Frequently Asked Questions',
  'Conclusion',
];

async function generatePost(title, rng) {
  const slug = slugify(title);
  const today = new Date().toISOString().split('T')[0];
  const seed = crypto.createHash('md5').update(title).digest().readUInt32LE(0);

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${title} - AutoMoney Blog</title>
<meta name="description" content="${title} - Complete guide and best practices for 2026.">
<style>${CSS}</style>
</head>
<body>
<div class="wrap">
<h1>${title}</h1>
<p class="meta">Published: ${today} &middot; AutoMoney Blog</p>
`;

  for (let si = 0; si < SECTIONS.length; si++) {
    const section = SECTIONS[si];
    html += `<h2>${section}</h2>\n`;

    if (section === 'Case Study') {
      const caseContent = await ai.generate(
        `Write a case study section for blog post titled "${title}". Include specific numbers and results.`,
        `Write a 3-sentence case study about ${title.toLowerCase()} with specific metrics.`,
        200, seed + si
      );
      html += `<p>${caseContent}</p>\n`;
      html += `<div class="highlight"><p><strong>Results:</strong> ${await ai.generate(
        `Results summary for ${title} case study.`,
        `Summarize results of implementing ${title}. 1 sentence.`,
        80, seed + 100 + si
      )}</p></div>\n`;
    } else {
      const content = await ai.generate(
        `You are writing section "${section}" of a blog post titled "${title}". Write informative, specific content.`,
        `Write a 2-3 paragraph section for "${section}" of "${title}". Include specific tips and actionable advice.`,
        250, seed + si
      );
      const paragraphs = content.split('\n').filter(p => p.trim());
      for (const p of paragraphs) {
        html += `<p>${p}</p>\n`;
      }
    }
  }

  html += `<div style="text-align:center;margin:48px 0">
<p>Ready to implement these strategies?</p>
<a href="${SITE_URL}" class="cta">Browse AI Automation Tools</a>
</div>
<div class="footer">
<p>AutoMoney Store &copy; 2026. <a href="${SITE_URL}/blog" style="color:#444;text-decoration:none">More articles</a></p>
</div>
</div>
</body>
</html>`;

  return { slug, html };
}

(async () => {
  const POSTS_DIR = path.join(OUTPUT);
  fs.mkdirSync(POSTS_DIR, { recursive: true });

  let count = 0;
  for (const topic of TOPICS) {
    const rng = ai.seedRand(crypto.createHash('md5').update(topic).digest().readUInt32LE(0));
    const { slug, html } = await generatePost(topic, rng);
    fs.writeFileSync(path.join(POSTS_DIR, `${slug}.html`), html, 'utf-8');
    count++;
    console.log(`  [${count}/${TOPICS.length}] ${topic.substring(0, 50)}`);
  }

  const posts = TOPICS.map(t => ({ title: t, slug: slugify(t), date: new Date().toISOString().split('T')[0] }));

  let indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Blog - AutoMoney Store</title>
<style>${CSS}</style>
</head>
<body>
<div class="wrap">
<h1>AutoMoney Blog</h1>
<p class="meta">Latest articles on AI automation, digital business, and productivity</p>
`;

  for (const p of posts) {
    indexHtml += `<div style="background:#16162a;border:1px solid #2a2a4a;border-radius:8px;padding:20px;margin-bottom:16px">
<a href="/blog/${p.slug}" style="color:#00e676;text-decoration:none;font-size:1.1rem;font-weight:600">${p.title}</a>
<div style="color:#666;font-size:0.8rem;margin-top:8px">${p.date}</div>
</div>\n`;
  }

  fs.writeFileSync(path.join(POSTS_DIR, 'index.html'), indexHtml + `<div class="footer"><p>AutoMoney Store &copy; 2026</p></div></div></body></html>`, 'utf-8');
  console.log(`Generated ${count} blog posts + index`);
})();

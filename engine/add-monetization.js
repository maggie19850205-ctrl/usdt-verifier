const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.join(ROOT, 'output');

const AFFILIATE_LINKS = {
  'chatgpt': { url: 'https://openai.com/chatgpt', label: 'ChatGPT' },
  'claude': { url: 'https://claude.ai', label: 'Claude AI' },
  'canva': { url: 'https://canva.com', label: 'Canva' },
  'notion': { url: 'https://notion.so', label: 'Notion' },
  'midjourney': { url: 'https://midjourney.com', label: 'Midjourney' },
  'perplexity': { url: 'https://perplexity.ai', label: 'Perplexity AI' },
  'warp': { url: 'https://warp.dev', label: 'Warp terminal' },
  'vscode': { url: 'https://code.visualstudio.com', label: 'VS Code' },
  'github': { url: 'https://github.com', label: 'GitHub' },
  'digitalocean': { url: 'https://digitalocean.com', label: 'DigitalOcean' },
  'cloudflare': { url: 'https://cloudflare.com', label: 'Cloudflare' },
  'stripe': { url: 'https://stripe.com', label: 'Stripe' },
  'shopify': { url: 'https://shopify.com', label: 'Shopify' },
  'wordpress': { url: 'https://wordpress.org', label: 'WordPress' },
  'figma': { url: 'https://figma.com', label: 'Figma' },
};

const FOOTER_AD = `
<div style="margin-top:32px;padding:20px;background:#1a1a2e;border-radius:8px;border:1px solid #2a2a4a;text-align:center">
  <p style="color:#888;font-size:0.8rem;margin-bottom:8px">— Sponsored —</p>
  <a href="https://automoney-store.pages.dev" style="color:#00e676;text-decoration:none;font-weight:600" target="_blank" rel="noopener">
    Build Your AutoMoney Empire &rarr;
  </a>
  <p style="color:#555;font-size:0.75rem;margin-top:4px">All-in-one digital product marketplace with USDT payments</p>
</div>`;

function walkHtml(dir) {
  const files = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walkHtml(p).forEach(f => files.push(f));
      else if (e.name.endsWith('.html')) files.push(p);
    }
  } catch {}
  return files;
}

const htmlFiles = walkHtml(OUTPUT);
let affCount = 0;
let adCount = 0;

for (const file of htmlFiles) {
  let html = fs.readFileSync(file, 'utf-8');
  const lower = html.toLowerCase();
  let changed = false;

  for (const [keyword, link] of Object.entries(AFFILIATE_LINKS)) {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    let match;
    while ((match = regex.exec(lower)) !== null) {
      const before = html.slice(Math.max(0, match.index - 100), match.index);
      if (before.includes('href="') || before.includes("href='")) continue;
      if (before.includes('src="') || before.includes("src='")) continue;
      const word = html.slice(match.index, match.index + match[0].length);
      const replacement = `<a href="${link.url}" target="_blank" rel="noopener" style="color:#00bcd4">${word}</a>`;
      html = html.slice(0, match.index) + replacement + html.slice(match.index + match[0].length);
      changed = true;
      affCount++;
    }
  }

  if (!html.includes('</body>')) continue;

  if (html.includes('free-online') || html.includes('counter') || html.includes('generator') || html.includes('converter') || html.includes('calculator')) {
    if (!html.includes('Sponsored')) {
      html = html.replace('</body>', `${FOOTER_AD}\n</body>`);
      adCount++;
      changed = true;
    }
  }

  if (changed) fs.writeFileSync(file, html, 'utf-8');
}

console.log(`Added ${affCount} affiliate links across ${htmlFiles.length} files`);
console.log(`Added ad slots to ${adCount} tool pages`);

const fs = require('fs');
const path = require('path');

const OUTPUT = path.resolve(__dirname, '..', 'output');
const DL_DIR = path.join(OUTPUT, 'downloads');
const USDT = 'TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z';

const CSS = `*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;background:#0a0a12;color:#e0e0e0;line-height:1.8}
.wrap{max-width:900px;margin:0 auto;padding:40px 24px}
h1{font-size:2rem;font-weight:700;color:#fff;margin-bottom:16px}
h2{font-size:1.3rem;font-weight:600;color:#fff;margin:32px 0 16px}
h3{font-size:1.1rem;font-weight:600;color:#ddd;margin:20px 0 10px}
p{color:#b0b0c0;margin-bottom:16px}
a{color:#00e676;text-decoration:none}a:hover{color:#66ffa1}
.price{font-size:2rem;font-weight:700;color:#00e676;margin:24px 0}
.buy-btn{display:inline-block;background:linear-gradient(135deg,#00e676,#00bcd4);color:#0a0a12;padding:16px 48px;border-radius:100px;font-weight:700;font-size:1.1rem;margin:16px 0}
.ins{background:#16162a;border:1px solid #2a2a4a;border-radius:12px;padding:24px;margin:24px 0}
.ins code{background:#2a2a4a;padding:2px 8px;border-radius:4px;color:#00e676}
.ins ol{margin:0;padding-left:20px;color:#b0b0c0}
.ins li{margin:6px 0}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;margin:16px 0}
.tag{background:#1a1a3e;color:#00e676;padding:4px 12px;border-radius:6px;font-size:.8rem;text-align:center}
.footer{text-align:center;padding:24px;color:#333;font-size:.75rem;border-top:1px solid #2a2a4a;margin-top:48px}
.footer a{color:#555;margin:0 8px}`;

function esc(s) { return s.replace(/"/g, '&quot;'); }

const agents = [
  'Frontend Developer','Backend Architect','Mobile App Builder','AI Engineer','DevOps Automator',
  'Rapid Prototyper','Senior Developer','Security Architect','Penetration Tester','Incident Responder',
  'Cloud Security Architect','UI Designer','UX Researcher','Brand Guardian','Growth Hacker',
  'Content Creator','SEO Specialist','PPC Strategist','Product Manager','Sprint Prioritizer',
  'Sales Outbound Strategist','Deal Strategist','Sales Engineer','Support Responder','Data Engineer'
];

// === Sales page for AI Agent Super Bundle ===
const agentSalesHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>AI Agent Super Bundle - 236 Agents for Claude, Cursor & More</title>
<meta name="description" content="236 specialized AI agent personalities. Frontend dev, marketing, sales, security, design, and more. One-click deploy to Claude Code, Cursor, OpenClaw, Windsurf.">
<link rel="canonical" href="https://automoney-store.pages.dev/downloads/ai-agent-super-bundle">
<meta name="robots" content="index, follow">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Product","name":"AI Agent Super Bundle","description":"236 specialized AI agent personalities for Claude Code, Cursor, OpenClaw, and more.","offers":{"@type":"Offer","price":"29.99","priceCurrency":"USD"},"category":"Digital Products"}</script>
<style>${CSS}</style></head><body>
<div class="wrap">
<p style="color:#555;font-size:0.8rem"><a href="/">Home</a> › <a href="/products/">Products</a> › AI Agent Super Bundle</p>
<h1>AI Agent Super Bundle</h1>
<p style="color:#888;font-size:1.1rem">236 specialized AI agent personalities — deploy to Claude Code, Cursor, OpenClaw, Windsurf, and more</p>
<div class="price">$29.99 USDT</div>
<div class="ins">
<h3>What You Get</h3>
<ul>
<li><strong>236 agent definitions</strong> across 16 divisions</li>
<li><strong>Engineering</strong>: Frontend, Backend, DevOps, Security, Mobile, AI/ML, SRE</li>
<li><strong>Marketing</strong>: SEO, Content, Social, Growth, Email, China platforms</li>
<li><strong>Sales</strong>: Outbound, Discovery, Proposals, Pipeline Analysis</li>
<li><strong>Design</strong>: UI/UX, Brand, Visual Storytelling, Accessibility</li>
<li><strong>Security</strong>: AppSec, Pentest, Cloud Security, Compliance, Threat Intel</li>
<li><strong>Plus</strong>: Finance, GIS, Game Dev, Paid Media, PM, Testing, Academic</li>
<li><strong>Cross-platform install scripts</strong> for Claude Code, Cursor, OpenClaw, Windsurf, Copilot</li>
<li><strong>MIT License</strong> — commercial use allowed</li>
</ul>
</div>
<div class="ins">
<h3>How to Buy</h3>
<ol>
<li>Send <strong>$29.99 USDT (TRC-20)</strong> to: <code>${USDT}</code></li>
<li>Copy your transaction hash (TXID) from your wallet</li>
<li>Enter TXID and email below, click Verify</li>
<li>Download your bundle instantly</li>
</ol>
</div>
<div id="purchase-modal" style="background:#16162a;border:1px solid #2a2a4a;border-radius:12px;padding:24px;margin:24px 0">
<h3>Complete Your Purchase</h3>
<input type="text" id="txid-input" placeholder="Paste your USDT TXID here" style="width:100%;padding:12px;background:#1a1a3e;border:1px solid #2a2a4a;border-radius:6px;color:#fff;margin:8px 0">
<input type="email" id="email-input" placeholder="Your email (for backup link)" style="width:100%;padding:12px;background:#1a1a3e;border:1px solid #2a2a4a;border-radius:6px;color:#fff;margin:8px 0">
<button onclick="verifyPurchase()" style="background:#00e676;color:#0a0a12;padding:12px 32px;border:none;border-radius:6px;font-weight:700;margin:8px 0;cursor:pointer">Verify Payment →</button>
<div id="result" style="margin-top:12px;color:#b0b0c0"></div>
</div>
<script>
async function verifyPurchase() {
  const txid = document.getElementById('txid-input').value.trim();
  const email = document.getElementById('email-input').value.trim();
  const resultDiv = document.getElementById('result');
  if (!txid) { resultDiv.textContent = 'Please enter your TXID'; return; }
  resultDiv.textContent = 'Verifying...';
  try {
    const res = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({txid, email, product:'ai-agent-super-bundle', amount:'29.99'})
    });
    const data = await res.json();
    if (data.valid) {
      resultDiv.innerHTML = '<span style="color:#00e676">✓ Payment verified! <a href="' + data.downloadUrl + '" style="color:#fff">Click here to download</a></span>';
    } else {
      resultDiv.textContent = 'Payment not found. Make sure you sent exactly $29.99 USDT to ' + '${USDT}';
    }
  } catch(e) { resultDiv.textContent = 'Error: ' + e.message; }
}
</script>
<h2>Featured Agents</h2>
<div class="grid">${agents.slice(0,24).map(a => `<span class="tag">${a}</span>`).join('\n')}</div>
<p style="text-align:center;margin-top:24px;color:#666">+ 212 more across 16 divisions</p>
<div class="footer"><p>&copy; 2026 AutoMoney Store | USDT: ${USDT} | <a href="/">Home</a> · <a href="/products/">Products</a></p></div>
</div></body></html>`;
fs.writeFileSync(path.join(OUTPUT, 'downloads', 'ai-agent-super-bundle.html'), agentSalesHtml, 'utf-8');
console.log('Created: ai-agent-super-bundle.html');

// === Sales page for Agent-Reach Internet Kit ===
const reachSalesHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Agent-Reach Internet Kit — Give AI Agents Internet Access</title>
<meta name="description" content="Give your AI agent internet capabilities. Read YouTube, Twitter, Reddit, Bilibili, Xiaohongshu, LinkedIn, search the web, and more. One-click install.">
<link rel="canonical" href="https://automoney-store.pages.dev/downloads/agent-reach-internet-kit">
<meta name="robots" content="index, follow">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Product","name":"Agent-Reach Internet Kit","description":"Give AI agents internet capabilities across 13 platforms.","offers":{"@type":"Offer","price":"9.99","priceCurrency":"USD"},"category":"Digital Products"}</script>
<style>${CSS}</style></head><body>
<div class="wrap">
<p style="color:#555;font-size:0.8rem"><a href="/">Home</a> › <a href="/products/">Products</a> › Agent-Reach Internet Kit</p>
<h1>Agent-Reach Internet Kit</h1>
<p style="color:#888;font-size:1.1rem">Give your AI agent real internet capabilities — read web pages, search Twitter, watch YouTube, browse Reddit, and more</p>
<div class="price">$9.99 USDT</div>
<div class="ins">
<h3>What You Get</h3>
<ul>
<li><strong>Full Agent-Reach installation package</strong> (Python CLI)</li>
<li><strong>13 platform channels</strong>: Web, YouTube, Twitter/X, Reddit, Bilibili, Xiaohongshu, LinkedIn, GitHub, RSS, Web Search, V2EX, Xueqiu, Xiaoyuzhou</li>
<li><strong>Auto-diagnostic</strong>: \`agent-reach doctor\` checks every channel</li>
<li><strong>Cross-platform</strong>: Works with Claude Code, OpenClaw, Cursor, Windsurf, Codex</li>
<li><strong>Free forever</strong> — no API keys needed, all open-source</li>
<li><strong>Installation guide</strong> with step-by-step instructions</li>
</ul>
</div>
<div class="ins">
<h3>How to Buy</h3>
<ol>
<li>Send <strong>$9.99 USDT (TRC-20)</strong> to: <code>${USDT}</code></li>
<li>Copy your TXID and enter below</li>
<li>Download the full kit instantly</li>
</ol>
</div>
<div id="purchase-modal" style="background:#16162a;border:1px solid #2a2a4a;border-radius:12px;padding:24px;margin:24px 0">
<h3>Complete Your Purchase</h3>
<input type="text" id="txid-input" placeholder="Paste your USDT TXID here" style="width:100%;padding:12px;background:#1a1a3e;border:1px solid #2a2a4a;border-radius:6px;color:#fff;margin:8px 0">
<input type="email" id="email-input" placeholder="Your email (for backup link)" style="width:100%;padding:12px;background:#1a1a3e;border:1px solid #2a2a4a;border-radius:6px;color:#fff;margin:8px 0">
<button onclick="verifyPurchase()" style="background:#00e676;color:#0a0a12;padding:12px 32px;border:none;border-radius:6px;font-weight:700;margin:8px 0;cursor:pointer">Verify Payment →</button>
<div id="result" style="margin-top:12px;color:#b0b0c0"></div>
</div>
<script>
async function verifyPurchase() {
  const txid = document.getElementById('txid-input').value.trim();
  const email = document.getElementById('email-input').value.trim();
  const resultDiv = document.getElementById('result');
  if (!txid) { resultDiv.textContent = 'Please enter your TXID'; return; }
  resultDiv.textContent = 'Verifying...';
  try {
    const res = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({txid, email, product:'agent-reach-internet-kit', amount:'9.99'})
    });
    const data = await res.json();
    if (data.valid) {
      resultDiv.innerHTML = '<span style="color:#00e676">✓ Payment verified! <a href="' + data.downloadUrl + '" style="color:#fff">Click here to download</a></span>';
    } else {
      resultDiv.textContent = 'Payment not found. Make sure you sent exactly $9.99 USDT.';
    }
  } catch(e) { resultDiv.textContent = 'Error: ' + e.message; }
}
</script>
<h2>Supported Platforms</h2>
<div class="grid">${['Web Pages','YouTube','Twitter/X','Reddit','Bilibili','Xiaohongshu','LinkedIn','GitHub','RSS Feeds','Web Search','V2EX','Xueqiu','Podcasts'].map(p => `<span class="tag">${p}</span>`).join('\n')}</div>
<div class="footer"><p>&copy; 2026 AutoMoney Store | USDT: ${USDT} | <a href="/">Home</a> · <a href="/products/">Products</a></p></div>
</div></body></html>`;
fs.writeFileSync(path.join(OUTPUT, 'downloads', 'agent-reach-internet-kit.html'), reachSalesHtml, 'utf-8');
console.log('Created: agent-reach-internet-kit.html');

// === Bundle product page (the actual download page delivered after payment) ===
// The user downloads a ZIP file. Since we serve HTML pages, create a page
// that lists all files in the bundle
const bundleDownloadHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Download: AI Agent Super Bundle</title>
<style>${CSS}
.file-list{background:#16162a;border:1px solid #2a2a4a;border-radius:8px;padding:16px;margin:16px 0;font-size:.85rem}
.file-list li{color:#b0b0c0;margin:4px 0;list-style:none;padding:4px 0;border-bottom:1px solid #1a1a3e}
.dl-btn{display:inline-block;background:#00e676;color:#0a0a12;padding:16px 48px;border-radius:100px;font-weight:700;font-size:1.1rem;margin:24px 0;text-align:center}
</style></head><body>
<div class="wrap">
<h1>AI Agent Super Bundle</h1>
<p style="color:#888">Thank you for your purchase! Below is your download.</p>
<a class="dl-btn" href="/downloads/ai-agent-super-bundle/">Download Bundle →</a>
<h2>What's Included</h2>
<p>236 agent files across 16 divisions. Each file is a complete agent personality definition with identity, workflows, and deployment instructions.</p>
<h3>Quick Install</h3>
<div class="ins" style="background:#16162a;border:1px solid #2a2a4a;border-radius:8px;padding:16px">
<code style="display:block;margin:8px 0"># Claude Code<br>cp -r agents/* ~/.claude/agents/<br><br># Cursor<br>cp -r agents/* ~/.cursor/agents/<br><br># OpenClaw<br>cp -r agents/* ~/.openclaw/agents/</code>
</div>
</div></body></html>`;
fs.writeFileSync(path.join(OUTPUT, 'downloads', 'ai-agent-super-bundle', 'index.html'), bundleDownloadHtml, 'utf-8');
console.log('Created: download page for ai-agent-super-bundle');

// === Agent-Reach download page ===
const reachDownloadHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Download: Agent-Reach Internet Kit</title>
<style>${CSS}
.dl-btn{display:inline-block;background:#00e676;color:#0a0a12;padding:16px 48px;border-radius:100px;font-weight:700;font-size:1.1rem;margin:24px 0}
</style></head><body>
<div class="wrap">
<h1>Agent-Reach Internet Kit</h1>
<p style="color:#888">Thank you for your purchase! Below is your download.</p>
<a class="dl-btn" href="/downloads/agent-reach-internet-kit/">Download Kit →</a>
<h2>Quick Start</h2>
<div class="ins" style="background:#16162a;border:1px solid #2a2a4a;border-radius:8px;padding:16px">
<code style="display:block;margin:8px 0">cd agent-reach<br>pip install -e .<br>agent-reach install --env=auto</code>
</div>
<p>After installation, run <code>agent-reach doctor</code> to check all platform channels.</p>
</div></body></html>`;
fs.writeFileSync(path.join(OUTPUT, 'downloads', 'agent-reach-internet-kit', 'index.html'), reachDownloadHtml, 'utf-8');
console.log('Created: download page for agent-reach-internet-kit');

// === Update sitemap to include new product pages ===
const sitemapPath = path.join(OUTPUT, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf-8');
const newUrls = [
  'https://automoney-store.pages.dev/downloads/ai-agent-super-bundle',
  'https://automoney-store.pages.dev/downloads/agent-reach-internet-kit'
];
for (const url of newUrls) {
  if (!sitemap.includes(url)) {
    sitemap = sitemap.replace('</urlset>', `  <url><loc>${url}</loc><priority>0.9</priority></url>\n</urlset>`);
  }
}
fs.writeFileSync(sitemapPath, sitemap, 'utf-8');
console.log('Updated sitemap');

// === Add product pages to _worker.js PRODUCT_FILES ===
const workerPath = path.join(OUTPUT, '_worker.js');
let worker = fs.readFileSync(workerPath, 'utf-8');
const newEntries = `,'ai-agent-super-bundle','agent-reach-internet-kit'`;
worker = worker.replace(/const PRODUCT_FILES\s*=\s*\[[^\]]+\]/, match => {
  if (match.includes('ai-agent-super-bundle')) return match;
  return match.replace(']', newEntries + ']');
});
fs.writeFileSync(workerPath, worker, 'utf-8');
console.log('Updated _worker.js PRODUCT_FILES');

console.log('\nDone! New products added to store.');

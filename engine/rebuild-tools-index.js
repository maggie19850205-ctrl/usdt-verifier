const fs = require('fs');
const path = require('path');

const CATEGORIES = {
  'text-tools': { label: 'Text', icon: 'Aa' },
  'developer-tools': { label: 'Dev', icon: '</>' },
  'converter-tools': { label: 'Convert', icon: '⇄' },
  'security-tools': { label: 'Security', icon: '🔒' },
  'seo-tools': { label: 'SEO', icon: '📈' },
  'calculator-tools': { label: 'Calc', icon: '∑' },
  'image-tools': { label: 'Image', icon: '🖼' },
  'design-tools': { label: 'Design', icon: '🎨' },
  'health-tools': { label: 'Health', icon: '❤' },
  'timer-tools': { label: 'Timer', icon: '⏱' },
  'audio-tools': { label: 'Audio', icon: '🔊' },
};

function getCategory(slug, title, desc) {
  const s = (slug + ' ' + title + ' ' + desc).toLowerCase();
  if (/json|yaml|csv|xml|base64|hash|regex|uuid|jwt|html|css|sql|minif|formatter|validator|tester|previewer|converter/.test(s)) return 'developer-tools';
  if (/text|word|character|counter|duplicate|prefix|suffix|diff|slug|statistic|lorem/.test(s)) return 'text-tools';
  if (/convert|temperature|roman|binary|morse|ascii|unit|number|base/.test(s)) return 'converter-tools';
  if (/password|credit.card|caesar|encrypt|decrypt/.test(s)) return 'security-tools';
  if (/seo|schema|geo|keyword|meta|sitemap/.test(s)) return 'seo-tools';
  if (/calculator|math|percentage|bmi|loan|eta/.test(s)) return 'calculator-tools';
  if (/image|resizer/.test(s)) return 'image-tools';
  if (/color|palette|emoji|font/.test(s)) return 'design-tools';
  if (/bmi|health|heart/.test(s)) return 'health-tools';
  if (/stopwatch|timer|cron/.test(s)) return 'timer-tools';
  if (/speech|tts|audio/.test(s)) return 'audio-tools';
  if (/ip|ssl|user.agent|latency|screen|csv/.test(s)) return 'developer-tools';
  if (/random|list|lorem|picker/.test(s)) return 'text-tools';
  if (/qr|mermaid|n8n|workflow/.test(s)) return 'developer-tools';
  return 'developer-tools';
}

const sites = [
  { dir: 'sites/agentpro', domain: 'agentpro.pages.dev', title: 'AgentPro Tools', color: '#f472b6', desc: 'free online tools for developers, content creators, and SEO professionals' },
  { dir: 'sites/aitools', domain: 'aitools-a4r.pages.dev', title: 'AI Tools Hub', color: '#ef5350', desc: 'free online tools for developers and tech enthusiasts' },
];

for (const site of sites) {
  const toolsDir = path.join(site.dir, 'tools');
  if (!fs.existsSync(toolsDir)) continue;

  const entries = fs.readdirSync(toolsDir, { withFileTypes: true });
  const toolDirs = entries.filter(e => e.isDirectory());
  const toolFiles = entries.filter(e => e.isFile() && e.name.endsWith('.html') && e.name !== 'index.html');

  const cards = [];
  const catsUsed = new Set();

  for (const d of toolDirs) {
    const indexPath = path.join(toolsDir, d.name, 'index.html');
    if (!fs.existsSync(indexPath)) continue;
    const content = fs.readFileSync(indexPath, 'utf8');
    const title = (content.match(/<title>([^<]+)<\/title>/) || [, d.name])[1].replace(/\s*\|\s*.*$/, '').trim();
    const desc = (content.match(/<meta name="description" content="([^"]+)">/) || [,''])[1];
    const cat = getCategory(d.name, title, desc);
    catsUsed.add(cat);
    cards.push({ slug: `tools/${d.name}/`, title, desc, cat });
  }

  for (const f of toolFiles) {
    const filePath = path.join(toolsDir, f.name);
    const content = fs.readFileSync(filePath, 'utf8');
    const slug = f.name.replace(/\.html$/, '');
    const title = (content.match(/<title>([^<]+)<\/title>/) || [, slug])[1].replace(/\s*\|\s*.*$/, '').trim();
    const desc = (content.match(/<meta name="description" content="([^"]+)">/) || [,''])[1];
    const cat = getCategory(slug, title, desc);
    catsUsed.add(cat);
    cards.push({ slug: `tools/${slug}.html`, title, desc, cat });
  }

  cards.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));

  // Build category filter buttons
  const catButtons = ['all', ...Array.from(catsUsed).filter(c => CATEGORIES[c]).sort()].map(c => {
    if (c === 'all') return `<button class="cat-btn active" data-cat="all" onclick="filterTools('all')">All</button>`;
    const cat = CATEGORIES[c];
    return `<button class="cat-btn" data-cat="${c}" onclick="filterTools('${c}')">${cat.icon} ${cat.label}</button>`;
  }).join('\n');

  const idxHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Free Online Tools - ${site.title}</title>
<meta name="description" content="${cards.length} ${site.desc}.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://${site.domain}/tools/">
<style>
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a12;color:#e0e0e0;margin:0;padding:0;line-height:1.6}
.wrap{max-width:800px;margin:0 auto;padding:20px}
h1{font-size:2rem;color:#fff;margin:40px 0 8px;text-align:center}
.sub{text-align:center;color:#666;font-size:.9rem;margin-bottom:24px}
.cat-bar{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:24px}
.cat-btn{background:#1a1a2e;color:#888;border:1px solid #2a2a4a;padding:6px 14px;border-radius:100px;cursor:pointer;font-size:.8rem;transition:all .2s}
.cat-btn:hover{border-color:${site.color};color:#fff}
.cat-btn.active{background:${site.color};color:#000;border-color:${site.color};font-weight:bold}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;margin:24px 0}
.card{background:#16162a;border:1px solid #2a2a4a;border-radius:12px;padding:20px;text-decoration:none;color:#e0e0e0;display:block;transition:all .2s}
.card:hover{border-color:${site.color};transform:translateY(-2px)}
.card h3{font-size:1rem;color:#fff;margin:0 0 6px}
.card p{font-size:.8rem;color:#666;margin:0}
.card .cat-tag{display:inline-block;background:rgba(244,114,182,0.1);color:${site.color};font-size:.65rem;padding:1px 8px;border-radius:100px;margin-top:6px}
.footer{text-align:center;padding:32px 0;color:#555;font-size:.8rem;border-top:1px solid #2a2a4a;margin-top:60px}
.footer a{color:${site.color}}
</style>
</head>
<body>
<div class="wrap">
<h1>Free Online Tools</h1>
<p class="sub">${cards.length} ${site.desc}.</p>
<div class="cat-bar">${catButtons}</div>
<div class="grid" id="tool-grid">
${cards.map(c => `<a class="card" data-cat="${c.cat}" href="/${c.slug}"><h3>${esc(c.title)}</h3><p>${esc(c.desc || '')}</p></a>`).join('\n')}
</div>
<p style="color:#666;font-size:.8rem;text-align:center">Need more? Check our <a href="https://automoney-store.pages.dev">store</a> for premium products.</p>
</div>
<div class="footer">
<p>&copy; 2026 ${site.title} | <a href="https://${site.domain}">Home</a> | <a href="https://${site.domain}/tools/">Tools</a> | <a href="https://automoney-store.pages.dev">Store</a> | USDT (TRC-20): TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z</p>
</div>
<script>
function filterTools(cat){document.querySelectorAll('.cat-btn').forEach(b=>b.classList.toggle('active',b.dataset.cat===cat));document.querySelectorAll('#tool-grid .card').forEach(c=>c.style.display=cat==='all'||c.dataset.cat===cat?'block':'none')}
</script>
</body>
</html>`;

  fs.writeFileSync(path.join(toolsDir, 'index.html'), idxHtml, 'utf-8');
  const countDisplay = cards.length;
  console.log(`✓ ${site.domain} tools index: ${countDisplay} tools (${catsUsed.size} categories)`);
}

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

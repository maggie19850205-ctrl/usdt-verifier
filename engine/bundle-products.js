const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const DOWNLOADS_DIR = path.join(ROOT, 'output', 'downloads');
const WORKER_PATH = path.join(ROOT, 'output', '_worker.js');

fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });

const registry = JSON.parse(fs.readFileSync(path.join(ROOT, 'product-registry.json'), 'utf-8'));

const sourceDirs = fs.readdirSync(ROOT, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .reduce((acc, d) => {
    const base = d.name.replace(/^(agency-agents-main|n8n-workflows-main|seo-geo-claude-skills-main|book-to-skill-master|paperclip-master|claude-mem-main|Scrapling-main|TrendRadar-master).*/i, '$1');
    acc[base] = d.name;
    return acc;
  }, {});

const SOURCE_MAP = {
  'usdt-payment-gateway-self-hosted': { dir: null },
  'ai-workforce-pro': { dir: sourceDirs['agency-agents-main'] },
  'automation-empire': { dir: sourceDirs['n8n-workflows-main'] },
  'geo-dominance-toolkit': { dir: sourceDirs['seo-geo-claude-skills-main'] },
  'infinite-knowledge-factory': { dir: sourceDirs['book-to-skill-master'] },
  'ai-company-builder': { dir: sourceDirs['paperclip-master'] },
  'context-vault': { dir: sourceDirs['claude-mem-main'] },
  'anti-block-data-harvester': { dir: sourceDirs['Scrapling-main'] },
  'market-intelligence-engine': { dir: sourceDirs['TrendRadar-master'] },
};

const PRODUCT_DIR_MAP = {};
registry.products.forEach(p => { PRODUCT_DIR_MAP[p.id] = p; });

const zipEntries = {};

for (const [slug, info] of Object.entries(SOURCE_MAP)) {
  const zipName = `${slug}.zip`;
  const zipPath = path.join(DOWNLOADS_DIR, zipName);

  if (fs.existsSync(zipPath)) {
    zipEntries[slug] = zipName;
    continue;
  }

  if (info.dir) {
    const srcDir = path.join(ROOT, info.dir);
    if (!fs.existsSync(srcDir)) continue;
    console.log(`Zipping ${slug}...`);
    execSync(`tar -caf "${zipPath}" --format=zip -C "${ROOT}" "${info.dir}"`, { stdio: 'pipe' });
  } else {
    const readme = `# ${PRODUCT_DIR_MAP[slug]?.name || slug}\n\nComplete self-hosted USDT TRC-20 payment gateway.\n\n## What's Included\n- Cloudflare Worker with payment verification\n- Admin dashboard with revenue analytics\n- Affiliate tracking system\n- Email subscription management\n\n## Quick Start\n1. Deploy the worker to Cloudflare Pages\n2. Set your USDT wallet address\n3. Configure product catalog\n4. Start accepting payments\n`;
    const tmpDir = path.join(ROOT, 'output', '.bundle-tmp', slug);
    fs.mkdirSync(tmpDir, { recursive: true });
    fs.writeFileSync(path.join(tmpDir, 'README.md'), readme, 'utf-8');
    execSync(`tar -caf "${zipPath}" --format=zip -C "${path.join(ROOT, 'output', '.bundle-tmp')}" "${slug}"`, { stdio: 'pipe' });
  }

  if (fs.existsSync(zipPath)) {
    zipEntries[slug] = zipName;
    console.log(`  ${zipName} (${(fs.statSync(zipPath).size/1024).toFixed(0)} KB)`);
  }
}

if (Object.keys(zipEntries).length === 0) {
  console.log('No products to bundle');
  process.exit(0);
}

let worker = fs.readFileSync(WORKER_PATH, 'utf-8');

const startTag = 'const PRODUCT_FILES = {';
const startIdx = worker.indexOf(startTag);
const endIdx = worker.indexOf('\n};', startIdx);
const before = worker.substring(0, startIdx + startTag.length);
const after = worker.substring(endIdx);

let newBody = '\n';
for (const [slug, zipName] of Object.entries(zipEntries)) {
  newBody += `  '${slug}': '${zipName}',\n`;
}

worker = before + newBody + after;

worker = worker.replace(
  /directUrl: match \?.*?` : null/g,
  "directUrl: match ? `${SITE_URL}/downloads/${match}` : null"
);
worker = worker.replace(
  /const fileUrl = info\.file.*?` : null/g,
  "const fileUrl = info.file ? `${SITE_URL}/downloads/${info.file}` : null"
);

fs.writeFileSync(WORKER_PATH, worker, 'utf-8');
console.log(`Done: ${Object.keys(zipEntries).length} products, updated ${WORKER_PATH}`);

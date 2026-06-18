const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.join(ROOT, 'output');

console.log('=== Purchase Flow Audit ===\n');

// 1. Check _worker.js exists
const workerPath = path.join(OUTPUT, '_worker.js');
const hasWorker = fs.existsSync(workerPath);
console.log(`_worker.js: ${hasWorker ? 'OK' : 'MISSING'}`);

if (hasWorker) {
  const worker = fs.readFileSync(workerPath, 'utf-8');
  console.log(`  Size: ${(Buffer.byteLength(worker, 'utf-8') / 1024).toFixed(1)} KB`);

  // Check critical routes
  const routes = ['/api/verify-payment', '/api/track', '/api/orders', '/download/', '/api/stats'];
  for (const route of routes) {
    console.log(`  Route ${route}: ${worker.includes(route) ? 'OK' : 'MISSING'}`);
  }

  // Check KV binding
  console.log(`  KV_BINDING reference: ${worker.includes('KV_BINDING') ? 'OK' : 'MISSING'}`);

  // Check admin token
  if (worker.includes('automoney-admin-2026')) {
    console.log('  Admin token: OK');
  }
}

// 2. Check downloads directory
const downloadsDir = path.join(OUTPUT, 'downloads');
if (fs.existsSync(downloadsDir)) {
  const files = fs.readdirSync(downloadsDir).filter(f => f.endsWith('.html'));
  console.log(`\ndownloads/: ${files.length} files`);
} else {
  console.log('\ndownloads/: MISSING');
}

// 3. Check pages directory
const pagesDir = path.join(OUTPUT, 'pages');
if (fs.existsSync(pagesDir)) {
  const dirs = fs.readdirSync(pagesDir, { withFileTypes: true }).filter(d => d.isDirectory());
  console.log(`\npages/: ${dirs.length} product directories`);
} else {
  console.log('\npages/: MISSING');
}

// 4. Check USDT wallet address in worker
if (hasWorker) {
  const worker = fs.readFileSync(workerPath, 'utf-8');
  const addrMatch = worker.match(/USDT_ADDRESS\s*=\s*'([^']+)'/);
  if (addrMatch) {
    console.log(`\nUSDT Address: ${addrMatch[1]}`);
  }
}

// 5. Check sitemap
const sitemapPath = path.join(OUTPUT, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  const urls = (sitemap.match(/<loc>/g) || []).length;
  console.log(`\nsitemap.xml: ${urls} URLs`);
}

console.log('\n=== Audit Complete ===');

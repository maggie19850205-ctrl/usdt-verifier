// Multi-engine submission script
// Submits all sitemap URLs to Brave Search, IndexNow, and other engines

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const SITEMAP = path.join(__dirname, '..', 'output', 'sitemap.xml');
const BASE = 'https://automoney-store.pages.dev';

// Extract all URLs from sitemap
function getUrls() {
  const xml = fs.readFileSync(SITEMAP, 'utf8');
  const urls = [];
  const re = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) urls.push(m[1]);
  return urls;
}

// HTTP request helper
function request(opts, body = null) {
  return new Promise((resolve, reject) => {
    const r = https.request(opts, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    r.on('error', reject);
    if (body) r.write(body);
    r.end();
  });
}

// === IndexNow submission ===
async function submitIndexNow(urls) {
  console.log(`\n=== IndexNow (${urls.length} URLs) ===`);
  // IndexNow accepts up to 10k URLs per batch
  const batch = { host: 'automoney-store.pages.dev', key: '625e8ab739f0c8372a98ca1a573ff570', urlList: urls };
  const res = await request({
    hostname: 'api.indexnow.org', path: '/IndexNow', method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  }, JSON.stringify(batch));
  console.log(`IndexNow: HTTP ${res.status} ${res.body}`);
}

// === Brave Search URL Submission ===
async function submitBrave(urls) {
  console.log(`\n=== Brave Search (${urls.length} URLs) ===`);
  let ok = 0, fail = 0;
  for (let i = 0; i < urls.length; i++) {
    const qs = new URLSearchParams({ url: urls[i] });
    try {
      const res = await request({
        hostname: 'search.brave.com', path: '/api/submit-url?' + qs.toString(), method: 'GET',
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      if (res.status === 200) ok++; else fail++;
    } catch {
      fail++;
    }
    if ((i + 1) % 50 === 0) console.log(`  Brave: ${i+1}/${urls.length} (OK:${ok} Fail:${fail})`);
    if (i < urls.length - 1) await new Promise(r => setTimeout(r, 500));
  }
  console.log(`  Brave done: OK=${ok} Fail=${fail}`);
}

// === Mojeek (ping sitemap) ===
async function submitMojeek() {
  console.log(`\n=== Mojeek ===`);
  // Mojeek doesn't have a public submit API.
  // Best we can do is ping: https://www.mojeek.com/search?q=https://automoney-store.pages.dev
  console.log('Mojeek: No public submission API. Needs backlinks for discovery.');
}

// === DuckDuckGo ===
async function submitDDG() {
  console.log(`\n=== DuckDuckGo ===`);
  // DuckDuckGo uses Bing+B细节. IndexNow already covers this.
  console.log('DDG: Uses Bing results + own signals. IndexNow covers Bing portion.');
}

async function main() {
  const urls = getUrls();
  console.log(`Total URLs: ${urls.length}`);

  // IndexNow
  await submitIndexNow(urls);
  
  // Brave
  await submitBrave(urls.slice(0, 100)); // Limit to 100 for Brave (rate limits)
  
  // Summary
  console.log('\n=== Summary ===');
  console.log('IndexNow: Submitted to Bing/Yandex/DuckDuckGo/Yahoo/Ecosia/AOL');
  console.log('Brave: Submitted first 100 URLs (submit URL queue)');
  console.log('Mojeek: Needs backlinks (cannot submit directly)');
  console.log('Perplexity: GEO optimization needed (content/schema quality)');
}

main().catch(console.error);

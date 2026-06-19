# Baidu Push API Submission Script
# Usage:
#   1. Go to https://ziyuan.baidu.com/ and add your site (automoney-store.pages.dev)
#   2. Verify site ownership (choose HTML file verification, upload to output/ folder)
#   3. Go to "普通收录" → "资源提交" → "API提交" to get your token
#   4. Set the token and site in variables below
#   5. Run: node engine/baidu-submit.js

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const BAIDU_TOKEN = process.env.BAIDU_TOKEN || ''; // Set your Baidu API token here
const SITE = 'automoney-store.pages.dev';
const MAX_PER_BATCH = 20; // Baidu max 20 URLs per request
const DELAY_MS = 2000;    // Delay between batches

const SITEMAP_PATH = path.join(__dirname, '..', 'output', 'sitemap.xml');

function extractUrlsFromSitemap(xml) {
  const urls = [];
  const regex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    urls.push(match[1].trim());
  }
  return urls;
}

function submitBatch(urls, token) {
  return new Promise((resolve, reject) => {
    const body = urls.join('\n');
    const postData = JSON.stringify({ urls: urls });
    
    const req = http.request({
      hostname: 'data.zz.baidu.com',
      path: `/urls?site=${encodeURIComponent(SITE)}&token=${encodeURIComponent(token)}`,
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Content-Length': Buffer.byteLength(body),
        'User-Agent': 'curl/7.0',
      },
      timeout: 30000,
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  const token = BAIDU_TOKEN;
  if (!token) {
    console.log('ERROR: Set BAIDU_TOKEN environment variable.');
    console.log('  1. Go to https://ziyuan.baidu.com/');
    console.log('  2. Add site: ' + SITE);
    console.log('  3. Verify ownership (HTML file or DNS TXT)');
    console.log('  4. Get token from: 普通收录 → 资源提交 → API提交');
    console.log('  5. Run again with: $env:BAIDU_TOKEN = "your-token-here"');
    process.exit(1);
  }

  // Read sitemap
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.error('Sitemap not found at: ' + SITEMAP_PATH);
    process.exit(1);
  }
  
  const xml = fs.readFileSync(SITEMAP_PATH, 'utf-8');
  const allUrls = extractUrlsFromSitemap(xml);
  console.log(`Found ${allUrls.length} URLs in sitemap`);

  // Submit in batches of 20
  let totalSubmitted = 0;
  let successCount = 0;
  
  for (let i = 0; i < allUrls.length; i += MAX_PER_BATCH) {
    const batch = allUrls.slice(i, i + MAX_PER_BATCH);
    console.log(`\nBatch ${Math.floor(i/MAX_PER_BATCH)+1}/${Math.ceil(allUrls.length/MAX_PER_BATCH)}: ${batch.length} URLs`);
    
    try {
      const result = await submitBatch(batch, token);
      console.log(`  Status: ${result.status}`);
      
      if (result.body) {
        if (result.body.success) {
          console.log(`  Success: ${result.body.success} URLs`);
          successCount += parseInt(result.body.success);
        }
        if (result.body.remain) {
          console.log(`  Daily remaining: ${result.body.remain}`);
        }
        if (result.body.not_same_site) {
          console.log(`  Not same site: ${result.body.not_same_site.join(', ').slice(0, 100)}`);
        }
        if (result.body.not_valid) {
          console.log(`  Not valid URLs: ${result.body.not_valid.join(', ').slice(0, 100)}`);
        }
      }
      
      totalSubmitted += batch.length;
    } catch (err) {
      console.error(`  Error: ${err.message}`);
    }
    
    await delay(DELAY_MS);
  }

  console.log(`\n=== Done. ${successCount} URLs successfully submitted to Baidu ===`);
  console.log(`Total attempted: ${totalSubmitted}`);
  console.log(`Check Baidu Webmaster dashboard for indexing status.`);
}

main().catch(console.error);

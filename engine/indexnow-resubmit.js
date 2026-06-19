const https = require('https');
const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, '..', 'output', 'sitemap.xml');
const xml = fs.readFileSync(sitemapPath, 'utf8');
const urls = [];
const re = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
let m;
while ((m = re.exec(xml)) !== null) urls.push(m[1]);

console.log(`Total URLs: ${urls.length}`);

const batch = {
  host: 'automoney-store.pages.dev',
  key: '092e0e380fec4e3f9e317a373d0f6a4d',
  urlList: urls
};

const data = JSON.stringify(batch);
const req = https.request({
  hostname: 'api.indexnow.org',
  path: '/IndexNow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(data)
  }
}, res => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    console.log(`IndexNow: HTTP ${res.statusCode}`);
    console.log(`Response: ${body.substring(0, 200)}`);
  });
});

req.on('error', e => console.error('Error:', e.message));
req.write(data);
req.end();

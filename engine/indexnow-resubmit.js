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
  key: '625e8ab739f0c8372a98ca1a573ff570',
  keyLocation: 'https://automoney-store.pages.dev/625e8ab739f0c8372a98ca1a573ff570.txt',
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

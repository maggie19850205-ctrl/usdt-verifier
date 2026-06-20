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

const hostname = 'api.indexnow.org';
const key = '625e8ab739f0c8372a98ca1a573ff570';

let success = 0, fail = 0;

function submit(url) {
  return new Promise(resolve => {
    const path = `/IndexNow?url=${encodeURIComponent(url)}&key=${key}`;
    const req = https.get({ hostname, path }, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        if (res.statusCode === 202) success++;
        else fail++;
        if ((success + fail) % 100 === 0) console.log(`Progress: ${success + fail}/${urls.length} (OK: ${success}, Fail: ${fail})`);
        resolve();
      });
    });
    req.on('error', () => { fail++; resolve(); });
    req.end();
  });
}

(async () => {
  for (let i = 0; i < urls.length; i++) {
    await submit(urls[i]);
  }
  console.log(`\nDone: ${success} OK, ${fail} failed`);
})();

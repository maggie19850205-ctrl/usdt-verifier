const https = require('https');
const fs = require('fs');
const path = require('path');

const KEY = '625e8ab739f0c8372a98ca1a573ff570';
const SITES = [
  'automoney-store.pages.dev',
  'maomaolove.pages.dev',
  'aitools-a4r.pages.dev',
  'templatehub-d7b.pages.dev',
  'geoseo-bq9.pages.dev',
  'cryptopay-1dm.pages.dev',
  'sidehustle-bks.pages.dev',
  'agentpro.pages.dev'
];

function submitSite(host) {
  return new Promise((resolve, reject) => {
    const keyLocation = `https://${host}/${KEY}.txt`;
    const sitemapUrl = `https://${host}/sitemap.xml`;

    const body = JSON.stringify({
      host,
      key: KEY,
      keyLocation,
      urlList: [sitemapUrl]
    });

    const req = https.request({
      hostname: 'api.indexnow.org',
      path: '/IndexNow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(body)
      }
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        console.log(`${host}: HTTP ${res.statusCode} ${res.statusMessage}`);
        resolve({ host, status: res.statusCode });
      });
    });

    req.on('error', e => {
      console.error(`${host}: Error - ${e.message}`);
      resolve({ host, error: e.message });
    });
    req.write(body);
    req.end();
  });
}

(async () => {
  console.log(`Submitting IndexNow for ${SITES.length} sites (key: ${KEY})`);
  const results = await Promise.all(SITES.map(submitSite));
  const ok = results.filter(r => r.status === 200 || r.status === 202).length;
  console.log(`Done: ${ok}/${SITES.length} OK`);
  if (ok < SITES.length) {
    results.filter(r => r.status !== 200).forEach(r =>
      console.log(`  FAIL: ${r.host} (${r.status || r.error})`)
    );
  }
})();

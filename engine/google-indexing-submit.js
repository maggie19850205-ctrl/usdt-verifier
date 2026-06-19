const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

const SITEMAP = 'https://automoney-store.pages.dev/sitemap.xml';
const SITE = 'automoney-store.pages.dev';

// Config
const KEY_FILE = process.env.GOOGLE_SERVICE_ACCOUNT || path.join(__dirname, '..', 'gsc-service-account.json');
const STATE_FILE = path.join(__dirname, '..', 'indexing-state.json');

function loadState() {
  try { return JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8')); } catch { return { submitted: {}, total: 0, date: '' }; }
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function readSitemap() {
  return new Promise((resolve, reject) => {
    https.get(SITEMAP, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => {
        const urls = [];
        const re = /<loc>(.+?)<\/loc>/g;
        let m;
        while ((m = re.exec(data)) !== null) urls.push(m[1]);
        resolve(urls);
      });
    }).on('error', reject);
  });
}

async function getAccessToken() {
  const key = JSON.parse(fs.readFileSync(KEY_FILE, 'utf-8'));
  const { client_email, private_key } = key;

  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  function b64(s) {
    return Buffer.from(JSON.stringify(s)).toString('base64url');
  }

  const sign = crypto.createSign('RSA-SHA256');
  const message = `${b64(header)}.${b64(claim)}`;
  sign.update(message);
  const signature = sign.sign(private_key, 'base64url');

  const jwt = `${message}.${signature}`;

  return new Promise((resolve, reject) => {
    const postData = `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`;
    const req = https.request({
      hostname: 'oauth2.googleapis.com',
      path: '/token',
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => {
        const r = JSON.parse(data);
        if (r.access_token) resolve(r.access_token);
        else reject(new Error('Token error: ' + data));
      });
    });
    req.write(postData);
    req.end();
  });
}

function submitUrl(token, url) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ url, type: 'URL_UPDATED' });
    const req = https.request({
      hostname: 'indexing.googleapis.com',
      path: '/v3/urlNotifications:publish',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(body),
      },
    }, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => {
        if (res.statusCode === 200) resolve({ ok: true, url });
        else resolve({ ok: false, url, status: res.statusCode, body: data.substring(0, 200) });
      });
    });
    req.write(body);
    req.end();
  });
}

async function main() {
  if (!fs.existsSync(KEY_FILE)) {
    console.log('ERROR: Google service account key not found at:', KEY_FILE);
    console.log('');
    console.log('=== HOW TO CREATE THE KEY ===');
    console.log('1. Go to https://console.cloud.google.com/');
    console.log('2. Create a new project (or use existing)');
    console.log('3. Search for "Indexing API" and enable it');
    console.log('4. Go to IAM & Admin > Service Accounts');
    console.log('5. Create a service account, generate JSON key');
    console.log('6. Download the JSON and save as:', KEY_FILE);
    console.log('7. Go to https://search.google.com/search-console/');
    console.log('8. Settings > Users and permissions > Add user');
    console.log('9. Add the service account email as Owner');
    console.log('');
    console.log('Then run this script again.');
    return;
  }

  console.log('[1/4] Reading sitemap...');
  const allUrls = await readSitemap();
  console.log(`  Found ${allUrls.length} URLs`);

  const state = loadState();
  const today = new Date().toISOString().split('T')[0];

  if (state.date !== today) {
    state.date = today;
    state.submitted = {};
  }

  const submittedToday = Object.keys(state.submitted).length;
  const remaining = 200 - submittedToday;
  const toSubmit = allUrls.filter(u => !state.submitted[u]).slice(0, remaining);

  if (toSubmit.length === 0) {
    console.log('  No URLs to submit (quota used or all submitted)');
    console.log(`  Submitted today: ${submittedToday}/200`);
    console.log(`  Total unique: ${Object.keys(state.submitted).length}/${allUrls.length}`);
    return;
  }

  console.log(`[2/4] Getting OAuth token...`);
  const token = await getAccessToken();
  console.log(`  Token obtained`);

  console.log(`[3/4] Submitting ${toSubmit.length} URLs...`);
  let ok = 0, fail = 0;
  for (let i = 0; i < toSubmit.length; i++) {
    const r = await submitUrl(token, toSubmit[i]);
    if (r.ok) {
      state.submitted[toSubmit[i]] = today;
      ok++;
    } else {
      fail++;
      console.log(`  FAIL [${i+1}] ${r.status}: ${toSubmit[i].substring(0, 80)}`);
    }
    if ((i + 1) % 20 === 0) console.log(`  Progress: ${i+1}/${toSubmit.length} (ok:${ok} fail:${fail})`);
    await new Promise(r => setTimeout(r, 200));
  }

  saveState(state);
  console.log(`[4/4] Done! OK: ${ok}, Failed: ${fail}`);
  console.log(`  Today: ${Object.keys(state.submitted).length}/200`);
  console.log(`  Total unique: ${Object.keys(state.submitted).length}/${allUrls.length}`);

  if (Object.keys(state.submitted).length < allUrls.length) {
    const daysNeeded = Math.ceil((allUrls.length - Object.keys(state.submitted).length) / 200);
    console.log(`  Estimated remaining: ${daysNeeded} days`);
  }
}

main().catch(e => console.error('Error:', e.message));

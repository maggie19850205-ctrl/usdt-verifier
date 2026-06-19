const https = require('https');
const http = require('http');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const WORKER_URL = process.env.AI_WORKER_URL || 'https://automoney-store.pages.dev/api/ai-generate';
const MODEL = process.env.AI_MODEL || 'deepseek';

const CACHE_DIR = path.join(__dirname, '..', 'output', '.ai-cache');
try { fs.mkdirSync(CACHE_DIR, { recursive: true }); } catch {}

function cacheKey(system, user) {
  return crypto.createHash('md5').update(system + '|||' + user).digest('hex') + '.txt';
}

function httpPost(url, data) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const body = JSON.stringify(data);
    const mod = u.protocol === 'https:' ? https : http;
    const opts = {
      hostname: u.hostname,
      path: u.pathname,
      port: u.port,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
      timeout: 60000,
    };
    const req = mod.request(opts, res => {
      let chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(Buffer.concat(chunks).toString()) });
        } catch (e) {
          resolve({ status: res.statusCode, body: Buffer.concat(chunks).toString() });
        }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
    req.write(body);
    req.end();
  });
}

async function generate(system, user, maxTokens = 500) {
  const key = cacheKey(system, user);
  const cacheFile = path.join(CACHE_DIR, key);
  if (fs.existsSync(cacheFile)) {
    return fs.readFileSync(cacheFile, 'utf-8');
  }

  try {
    const resp = await httpPost(WORKER_URL, {
      system, user, model: MODEL, maxTokens,
    });
    if (resp.status === 200 && resp.body?.content) {
      const text = resp.body.content;
      fs.writeFileSync(cacheFile, text, 'utf-8');
      return text;
    }
    console.error(`[ai-provider] Worker returned ${resp.status}: ${JSON.stringify(resp.body).slice(0, 200)}`);
    return null;
  } catch (e) {
    console.error(`[ai-provider] Error calling Worker: ${e.message}`);
    return null;
  }
}

function seedRand(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1103515245 + 12345) >>> 0; return (s & 0x7fffffff) / 0x7fffffff; };
}

module.exports = { generate, seedRand };

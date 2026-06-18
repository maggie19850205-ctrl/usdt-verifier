const https = require('https');
const crypto = require('crypto');

const PROVIDERS = [
  {
    name: 'llm7',
    url: 'https://api.llm7.io/v1/chat/completions',
    model: 'codestral-latest',
    headers: {},
    rpm: 1,
    rph: 55,
  },
  {
    name: 'ovh',
    url: 'https://oai.endpoints.kepler.ai.cloud.ovh.net/v1/chat/completions',
    model: 'Mistral-7B-Instruct-v0.3',
    headers: {},
    rpm: 2,
    rph: 100,
  },
];

const RATE_WINDOW = 60 * 1000;
const callLog = [];

function checkRateLimit(provider) {
  const now = Date.now();
  const windowStart = now - RATE_WINDOW;
  const recent = callLog.filter(t => t > windowStart && t.provider === provider.name);
  if (recent.length >= provider.rph) return false;
  const lastSecond = callLog.filter(t => t > now - 1000 && t.provider === provider.name);
  if (lastSecond.length >= provider.rpm) return false;
  return true;
}

function httpsPost(url, data, headers) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const body = JSON.stringify(data);
    const opts = {
      hostname: u.hostname,
      path: u.pathname,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body), ...headers },
      timeout: 30000,
    };
    const req = https.request(opts, res => {
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

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function callProvider(provider, system, user, maxTokens = 300) {
  if (!checkRateLimit(provider)) {
    const waitMs = 61000 - (Date.now() - Math.max(...callLog.filter(t => t.provider === provider.name)));
    if (waitMs > 0 && waitMs < 60000) await sleep(waitMs + 100);
    if (!checkRateLimit(provider)) return null;
  }

  const payload = {
    model: provider.model,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
    max_tokens: maxTokens,
    temperature: 0.8,
  };

  try {
    const resp = await httpsPost(provider.url, payload, provider.headers);
    callLog.push({ time: Date.now(), provider: provider.name });
    if (resp.status === 200 && resp.body?.choices?.[0]?.message?.content) {
      return resp.body.choices[0].message.content.trim();
    }
    return null;
  } catch {
    return null;
  }
}

function seedRand(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1103515245 + 12345) >>> 0; return (s & 0x7fffffff) / 0x7fffffff; };
}

const VOCAB = [
  'implement','optimize','automate','streamline','integrate','leverage',
  'build','deploy','configure','analyze','monitor','scale','design',
  'develop','test','launch','track','measure','improve','transform',
  'system','workflow','pipeline','platform','solution','framework',
  'strategy','process','tool','resource','team','data','metric',
  'automation','integration','optimization','deployment','configuration',
  'efficient','scalable','reliable','robust','flexible','maintainable',
  'business','digital','automated','smart','intelligent','seamless',
  'productivity','efficiency','performance','quality','growth','revenue',
];

function rngText(rng, words) {
  const parts = [];
  for (let i = 0; i < words; i += 12) {
    const n = Math.min(12, words - i);
    const sentence = [];
    for (let j = 0; j < n; j++) sentence.push(VOCAB[Math.floor(rng() * VOCAB.length)]);
    parts.push(sentence.join(' '));
  }
  let text = parts.join('. ');
  return text.charAt(0).toUpperCase() + text.slice(1) + '.';
}

const CACHE_DIR = require('path').join(__dirname, '..', 'output', '.ai-cache');
const fs = require('fs');
try { fs.mkdirSync(CACHE_DIR, { recursive: true }); } catch {}

function cacheKey(system, user) {
  return crypto.createHash('md5').update(system + '|||' + user).digest('hex') + '.txt';
}

async function generate(system, user, maxTokens = 300, seed = null) {
  const key = cacheKey(system, user);
  const cacheFile = require('path').join(CACHE_DIR, key);
  if (fs.existsSync(cacheFile)) {
    return fs.readFileSync(cacheFile, 'utf-8');
  }

  for (const provider of PROVIDERS) {
    const result = await callProvider(provider, system, user, maxTokens);
    if (result) {
      fs.writeFileSync(cacheFile, result, 'utf-8');
      return result;
    }
  }

  const rng = seedRand(seed || Date.now());
  const fallback = rngText(rng, maxTokens > 100 ? 40 : 20);
  return fallback;
}

module.exports = { generate, seedRand, rngText };

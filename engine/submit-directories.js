const https = require('https');
const http = require('http');

const TARGET_URL = 'https://maomaolove.pages.dev/tools/';
const TIMEOUT = 15000;
const MAX_RETRIES = 2;
const DELAY_MS = 1000;

const DIRECTORIES = [
  { name: 'BestFreeWebTools', url: 'https://bestfreewebtools.com/submit', type: 'get', param: 'url' },
  { name: 'FreeWebTool', url: 'https://www.freewebtool.com/submit', type: 'get', param: 'url' },
  { name: 'WebToolsHub', url: 'https://webtoolshub.com/submit', type: 'get', param: 'site' },
  { name: 'ToolDirectory', url: 'https://tooldirectory.org/submit', type: 'get', param: 'url' },
  { name: 'FreeOnlineTools', url: 'https://freeonlinetools.info/submit', type: 'get', param: 'url' },
  { name: 'ToolSpot', url: 'https://toolspot.org/submit', type: 'get', param: 'url' },
  { name: 'WebAppList', url: 'https://webapplist.com/submit', type: 'get', param: 'url' },
  { name: 'ToolBox', url: 'https://toolbox.im/submit', type: 'get', param: 'url' },
  { name: 'AwesomeTools', url: 'https://awesometools.xyz/submit', type: 'get', param: 'url' },
  { name: 'DailyDevTools', url: 'https://dailydevtools.com/submit', type: 'get', param: 'site' },
  { name: 'SmallSEOTools', url: 'https://smallseotools.org/submit', type: 'manual' },
  { name: 'SEOChecklist', url: 'https://seochecklist.org/submit', type: 'manual' },
  { name: 'ToolPilot', url: 'https://toolpilot.ai/submit', type: 'manual' },
  { name: 'AlternativeTo', url: 'https://alternativeto.net/submit', type: 'manual' },
  { name: 'ProductHunt', url: 'https://www.producthunt.com/posts/maomaolove', type: 'manual' },
  { name: 'BetaList', url: 'https://betalist.com/submit', type: 'manual' },
  { name: 'SaaSHub', url: 'https://www.saashub.com/submit', type: 'manual' },
  { name: 'G2', url: 'https://www.g2.com/products/maomaolove', type: 'manual' },
  { name: 'Capterra', url: 'https://www.capterra.com/p/list/maomaolove', type: 'manual' },
  { name: 'GetApp', url: 'https://getapp.com/submit', type: 'manual' },
  { name: 'Similars', url: 'https://similars.net/submit', type: 'manual' },
  { name: 'TopTools', url: 'https://toptools.xyz/submit', type: 'manual' },
  { name: 'ToolKitHub', url: 'https://toolkithub.com/submit', type: 'manual' },
  { name: 'WebToolList', url: 'https://webtoolist.com/submit', type: 'manual' },
];

function fetch(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { timeout: TIMEOUT }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, data: data.slice(0, 200) }));
    });
    req.on('error', (err) => resolve({ status: 0, error: err.message }));
    req.on('timeout', () => { req.destroy(); resolve({ status: 0, error: 'timeout' }); });
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function trySubmit(entry, retries) {
  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    const submitUrl = `${entry.url}?${entry.param}=${encodeURIComponent(TARGET_URL)}`;
    const result = await fetch(submitUrl);
    if (result.status >= 200 && result.status < 400) {
      return { success: true, status: result.status, attempt };
    }
    if (attempt <= retries) {
      await sleep(DELAY_MS);
    }
  }
  return { success: false, status: 0 };
}

async function main() {
  console.log('=== Directory Submission Script ===');
  console.log(`Target: ${TARGET_URL}\n`);

  const results = { success: 0, failed: 0, manual: 0 };

  for (const entry of DIRECTORIES) {
    if (entry.type === 'manual') {
      console.log(`[MANUAL] ${entry.name.padEnd(25)} ${entry.url}`);
      results.manual++;
      continue;
    }

    process.stdout.write(`[SUBMIT] ${entry.name.padEnd(25)} `);
    const res = await trySubmit(entry, MAX_RETRIES);
    if (res.success) {
      console.log(`✓ (HTTP ${res.status}, attempt ${res.attempt})`);
      results.success++;
    } else {
      console.log(`✗ failed after ${MAX_RETRIES + 1} attempts`);
      results.failed++;
    }
    await sleep(300);
  }

  console.log('\n=== Summary ===');
  console.log(`  Successful: ${results.success}`);
  console.log(`  Failed:     ${results.failed}`);
  console.log(`  Manual:     ${results.manual}`);
  console.log(`  Total:      ${DIRECTORIES.length}`);
  console.log('\nManual submissions require browser form fills:');
  DIRECTORIES.filter(d => d.type === 'manual').forEach(d => {
    console.log(`  - ${d.name}: ${d.url}`);
  });
}

main().catch(console.error);
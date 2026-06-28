const fs = require('fs'), path = require('path');
const TOOLS = path.join(__dirname, '..', 'sites', 'agentpro', 'tools');
const OUT = path.join(__dirname, '..', 'output', 'devto-tutorials');
fs.mkdirSync(OUT, { recursive: true });

const SITE = 'https://agentpro.pages.dev';
const STORE = 'https://automoney-store.pages.dev';

// Tutorial templates per tool type
const templates = {
  converter: (t, desc) => `${desc} is a common task for developers and content creators. This free online tool makes it instant and accurate.

## How to Use

1. Open the tool at [${t.title}](${SITE}/tools/${t.slug}/)
2. Enter your input value
3. Get instant conversion results

## Example

\`\`\`
Input: 100
Output: Instant conversion in all formats
\`\`\`

## Why Use This Tool?

- **Free**: No registration, no ads, no limits
- **Fast**: Real-time conversion as you type
- **Accurate**: Precision calculations
- **Private**: Everything runs in your browser

Bookmark it for quick access whenever you need to ${desc.toLowerCase()}.`,

  generator: (t, desc) => `${desc} with this free browser-based tool. No downloads, no sign-ups.

## How to Use

1. Visit the [${t.title}](${SITE}/tools/${t.slug}/)
2. Configure your options
3. Generate instantly
4. Copy or download the result

## Use Cases

- **Developers**: Quick generation during coding
- **Designers**: Prototype assets and content
- **Content creators**: Generate placeholder content
- **Students**: Learn by generating examples

## Features

- Zero configuration needed
- Works offline (after first load)
- No data sent to servers
- Copy with one click

Try it now: [${t.title}](${SITE}/tools/${t.slug}/)`,

  checker: (t, desc) => `${desc} is essential for web development and security. This free tool gives you instant results.

## How to Check

1. Go to the [${t.title}](${SITE}/tools/${t.slug}/)
2. Enter the URL or value to check
3. View detailed results instantly

## Why You Need This

Whether you're a developer debugging an issue, a DevOps engineer monitoring infrastructure, or a security researcher performing analysis, having a quick ${desc.toLowerCase()} saves time.

## Key Benefits

| Feature | Benefit |
|---------|---------|
| Instant results | No waiting for page loads |
| Detailed output | More than just pass/fail |
| Free | No subscriptions or API keys |
| Privacy-first | Your data never leaves your browser |

Start using it: [${t.title}](${SITE}/tools/${t.slug}/)`,

  formatter: (t, desc) => `Formatting and validating ${desc} is a daily task for many developers. This free tool makes it painless.

## How to Format

1. Open [${t.title}](${SITE}/tools/${t.slug}/)
2. Paste your raw data
3. Get beautifully formatted output instantly

## The Problem It Solves

Raw, minified, or poorly formatted data is hard to read and debug. Instead of spending time manually indenting or searching for syntax errors, use this tool to:

- **Beautify** hard-to-read data
- **Validate** syntax in real-time
- **Debug** with clear error messages
- **Transform** between formats

## Example Workflow

\`\`\`
// Before: unreadable mess
// After: clean, indented, validated
\`\`\`

Start formatting: [${t.title}](${SITE}/tools/${t.slug}/)`,

  encoder: (t, desc) => `Encoding and decoding ${desc} is a fundamental skill for web developers. This tool handles it instantly.

## Quick Start

1. Visit [${t.title}](${SITE}/tools/${t.slug}/)
2. Type or paste your text
3. See the encoded/decoded result immediately

## Common Use Cases

- **API development**: Encode parameters for URLs
- **Data transfer**: Prepare data for transmission
- **Debugging**: Decode encoded strings to inspect content
- **Security**: Basic obfuscation for non-sensitive data

## Why Use This Instead of Command Line?

| This Tool | Terminal |
|-----------|----------|
| No installation | Requires tools installed |
| Copy-paste friendly | File-based or stdin |
| Real-time preview | Batch processing |
| Works on any device | Desktop only |

Try it: [${t.title}](${SITE}/tools/${t.slug}/)`,

  utility: (t, desc) => `This free browser-based tool helps you ${desc.toLowerCase()}. No installation required.

## How It Works

1. Navigate to [${t.title}](${SITE}/tools/${t.slug}/)
2. Enter your input
3. Get instant results

## Who Is This For?

- **Web developers**: Quick utility in your toolkit
- **Content creators**: Format and transform text
- **Students**: Learn by experimenting
- **Everyone**: Solve everyday problems fast

## Why Free Tools Matter

The best tools are the ones that are always accessible. No login, no paywall, no download — just paste and go. Bookmark this tool and it's always one click away.

[Try ${t.title} now](${SITE}/tools/${t.slug}/) — it's free and always will be.`,

  reference: (t, desc) => `Having a quick reference for ${desc} speeds up development and debugging. This tool puts the information at your fingertips.

## How to Use the Reference

1. Open [${t.title}](${SITE}/tools/${t.slug}/)
2. Browse or search through the reference data
3. Copy the values you need

## Why Keep a Reference Handy?

Instead of searching Google every time, bookmark this reference tool. Common use cases include:

- Looking up values during coding sessions
- Converting between formats quickly
- Verifying data against known standards
- Learning through exploration

## Features

- Complete data set
- Fast search and filter
- Copy-paste friendly
- Always up to date

Bookmark it: [${t.title}](${SITE}/tools/${t.slug}/)`
};

const toolTemplates = {
  'url-parser': { type: 'utility', desc: 'parse and analyze URL components including protocol, hostname, path, query parameters, and hash fragments' },
  'text-replacer': { type: 'utility', desc: 'find and replace text using exact matches or regular expressions' },
  'css-minifier': { type: 'formatter', desc: 'minify CSS code by removing whitespace, comments, and redundant syntax' },
  'emoji-picker': { type: 'reference', desc: 'browse, search, and copy emoji characters for your content' },
  'byte-converter': { type: 'converter', desc: 'convert between bytes, kilobytes, megabytes, gigabytes, and terabytes' },
  'roman-numeral': { type: 'converter', desc: 'convert between Roman numerals and Arabic numbers' },
  'binary-converter': { type: 'converter', desc: 'convert between binary, hexadecimal, and decimal number systems' },
  'list-sorter': { type: 'utility', desc: 'sort lists alphabetically, reverse, or by item length' },
  'text-statistics': { type: 'utility', desc: 'analyze text with character count, word count, sentence count, reading time, and speaking time' },
  'color-converter': { type: 'converter', desc: 'convert between HEX, RGB, HSL, and named color formats' },
  'json-to-xml': { type: 'converter', desc: 'convert JSON data structures to XML format' },
  'excel-to-json': { type: 'converter', desc: 'convert CSV and tabular data into JSON arrays' },
  'html-table-generator': { type: 'generator', desc: 'generate HTML table code from CSV data with headers' },
  'ascii-table': { type: 'reference', desc: 'ASCII character codes 0-127 with decimal, hex, and binary values' },
  'morse-code': { type: 'converter', desc: 'convert text to Morse code and decode Morse code back to text' },
  'duplicate-remover': { type: 'utility', desc: 'remove duplicate lines from text while preserving order' },
  'line-prefixer': { type: 'utility', desc: 'add custom prefix and suffix text to every line in a list' },
  'text-to-slug': { type: 'converter', desc: 'convert any text into a clean, SEO-friendly URL slug' },
  'markdown-to-html': { type: 'converter', desc: 'convert Markdown text into clean HTML code' },
  'text-to-base64': { type: 'encoder', desc: 'encode text to Base64 and decode Base64 back to readable text' },
  'math-evaluator': { type: 'utility', desc: 'evaluate mathematical expressions safely with support for basic arithmetic and parentheses' },
  'credit-card-validator': { type: 'checker', desc: 'validate credit card numbers using the Luhn algorithm and identify card type' },
  'caesar-cipher': { type: 'encoder', desc: 'encrypt and decrypt text using the classic Caesar cipher shift method' },
  'temperature-converter': { type: 'converter', desc: 'convert temperatures between Celsius, Fahrenheit, and Kelvin' },
  'email-extractor': { type: 'utility', desc: 'extract all email addresses from text content instantly' },
  'usdt-tx-verifier': { type: 'checker', desc: 'verify USDT TRC-20 transactions on the Tron blockchain using TXID' },
  'schema-generator': { type: 'generator', desc: 'generate JSON-LD schema markup for FAQPage, Product, Article, BreadcrumbList, and HowTo' },
  'json-formatter': { type: 'formatter', desc: 'format, validate, and beautify JSON data with error highlighting' },
  'json-formatter-v2': { type: 'formatter', desc: 'format and validate JSON data with syntax highlighting and error detection' },
  'password-generator': { type: 'generator', desc: 'generate strong, random passwords with customizable length and character types' },
  'password-strength': { type: 'checker', desc: 'check password strength with real-time analysis and improvement suggestions' },
  'qr-generator': { type: 'generator', desc: 'generate QR codes from any text or URL' },
  'hash-generator': { type: 'generator', desc: 'generate SHA-256 hash values for text strings' },
  'uuid-generator': { type: 'generator', desc: 'generate random UUID v4 identifiers for database keys and API IDs' },
  'timestamp-converter': { type: 'converter', desc: 'convert Unix timestamps to human-readable dates and vice versa' },
  'url-encoder': { type: 'encoder', desc: 'encode and decode URLs for safe web transmission' },
  'base64-encoder': { type: 'encoder', desc: 'encode and decode Base64 strings with UTF-8 support' },
  'base64-tool': { type: 'encoder', desc: 'encode and decode Base64 strings for data transfer and storage' },
  'case-converter': { type: 'converter', desc: 'convert text between uppercase, lowercase, title case, and camelCase' },
  'character-counter': { type: 'utility', desc: 'count characters, words, sentences, and paragraphs in any text' },
  'lorem-ipsum': { type: 'generator', desc: 'generate Lorem Ipsum placeholder text for design mockups and layouts' },
  'regex-tester': { type: 'utility', desc: 'test regular expressions against sample text with real-time matching' },
  'html-entity-converter': { type: 'converter', desc: 'encode and decode HTML entities for safe web rendering' },
  'html-stripper': { type: 'utility', desc: 'strip all HTML tags from text leaving only clean content' },
  'json-to-csv': { type: 'converter', desc: 'convert JSON data arrays into CSV format for spreadsheets' },
  'json-to-yaml': { type: 'converter', desc: 'convert JSON data to YAML format for configuration files' },
  'yaml-validator': { type: 'checker', desc: 'validate YAML syntax and format YAML content' },
  'csv-viewer': { type: 'formatter', desc: 'view and format CSV data in a readable table layout' },
  'color-picker': { type: 'utility', desc: 'pick colors visually and get HEX, RGB, and HSL values' },
  'color-contrast': { type: 'checker', desc: 'check color contrast ratios for WCAG accessibility compliance' },
  'credit-calculator': { type: 'utility', desc: 'calculate USDT credit payments and repayment schedules' },
  'crontab-generator': { type: 'generator', desc: 'generate cron expressions with a visual interface for scheduling tasks' },
  'jwt-debugger': { type: 'utility', desc: 'decode and inspect JWT tokens to view header, payload, and signature' },
  'keyword-cluster-tool': { type: 'utility', desc: 'analyze and group SEO keywords by topic for content strategy' },
  'n8n-workflow-builder': { type: 'generator', desc: 'generate n8n automation workflow JSON from natural language descriptions' },
  'user-agent-parser': { type: 'utility', desc: 'parse and identify browser user-agent strings with device details' },
  'ip-lookup': { type: 'checker', desc: 'look up IP address location, ISP, and network information' },
  'ssl-checker': { type: 'checker', desc: 'check SSL certificate status, expiry date, and chain validity' },
  'http-status': { type: 'reference', desc: 'look up HTTP status codes with descriptions and common causes' },
  'latency-tester': { type: 'checker', desc: 'test website latency and response time from your browser' },
  'screen-resolution': { type: 'reference', desc: 'check your screen resolution, viewport size, and device pixel ratio' },
  'seo-meta-preview': { type: 'utility', desc: 'preview how your page appears in Google search results' },
  'text-diff': { type: 'utility', desc: 'compare two blocks of text and highlight differences' },
  'markdown-previewer': { type: 'utility', desc: 'preview Markdown rendered as HTML in real-time' },
  'mermaid-generator': { type: 'generator', desc: 'create diagrams and flowcharts using Mermaid syntax' },
  'number-base-converter': { type: 'converter', desc: 'convert numbers between binary, octal, decimal, and hexadecimal' },
  'random-data': { type: 'generator', desc: 'generate random test data including names, emails, phone numbers, and addresses' },
  'list-randomizer': { type: 'utility', desc: 'randomize the order of items in a list randomly' },
  'eta-calculator': { type: 'utility', desc: 'calculate estimated time of arrival based on distance and speed' },
  'ai-agent-generator': { type: 'generator', desc: 'create custom AI agent personality configurations for Claude Code and Cursor' },
  'geo-readiness-checker': { type: 'checker', desc: 'check if your webpage is optimized for AI search engines like Perplexity and ChatGPT' },
};

const tags = {
  converter: ['webdev', 'tools', 'productivity', 'beginners'],
  generator: ['webdev', 'tools', 'productivity', 'javascript'],
  checker: ['webdev', 'devops', 'security', 'tutorial'],
  formatter: ['webdev', 'javascript', 'productivity', 'beginners'],
  encoder: ['webdev', 'security', 'javascript', 'tutorial'],
  utility: ['webdev', 'tools', 'productivity', 'beginners'],
  reference: ['webdev', 'beginners', 'reference', 'productivity']
};

const typeTitles = {
  converter: 'Online Converter',
  generator: 'Online Generator',
  checker: 'Online Checker Tool',
  formatter: 'Online Formatter',
  encoder: 'Online Encoder/Decoder',
  utility: 'Free Online Tool',
  reference: 'Quick Reference'
};

const toolDirs = fs.readdirSync(TOOLS).filter(f => fs.statSync(path.join(TOOLS, f)).isDirectory()).sort();

toolDirs.forEach(slug => {
  const info = toolTemplates[slug];
  if (!info) return;
  const type = info.type;
  const desc = info.desc;
  const htmlContent = fs.readFileSync(path.join(TOOLS, slug, 'index.html'), 'utf8');
  const title = (htmlContent.match(/<title>([^<]+)<\/title>/) || [,'Tool'])[1];
  const tagList = tags[type] || ['webdev', 'tools'];
  const typeTitle = typeTitles[type] || 'Free Tool';
  const template = templates[type] || templates.utility;
  const body = template({ title, slug }, desc);

  // Get 3 related tools
  const related = toolDirs.filter(d => d !== slug).sort(() => Math.random() - 0.5).slice(0, 3).map(d => {
    const c = fs.readFileSync(path.join(TOOLS, d, 'index.html'), 'utf8');
    const t = (c.match(/<title>([^<]+)<\/title>/) || [,'Tool'])[1];
    return `- [${t}](${SITE}/tools/${d}/)`;
  }).join('\n');

  const md = `---
title: "${title} - ${typeTitle}"
description: "${desc}. Free browser-based tool. No registration required."
tags: [${tagList.map(t => `"${t}"`).join(', ')}]
published: false
canonical_url: ${SITE}/tools/${slug}/
cover_image: 
---

# ${title} — ${typeTitle}

${body}

## Related Tools

${related}

---

*This is a free tool from [AgentPro](${SITE}). Check out our [premium digital products](${STORE}) for more advanced resources.*

*USDT (TRC-20): TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z*
`;

  const filePath = path.join(OUT, `${slug}.md`);
  fs.writeFileSync(filePath, md);
  console.log(`✓ ${slug}.md`);
});

// Generate index
let index = `# dev.to Tutorials for AgentPro Tools

Total: ${toolDirs.length} tutorials

## Instructions

1. Go to https://dev.to/new
2. Open one .md file from \`output/devto-tutorials/\`
3. Copy the entire content
4. Paste into dev.to editor
5. Add a cover image (optional)
6. Set \`published: true\` in front matter when ready
7. Click "Publish"

## Tutorials

`;

toolDirs.sort().forEach(slug => {
  const info = toolTemplates[slug];
  if (!info) return;
  const c = fs.readFileSync(path.join(TOOLS, slug, 'index.html'), 'utf8');
  const t = (c.match(/<title>([^<]+)<\/title>/) || [,'Tool'])[1];
  index += `- [${t}](${slug}.md) — ${info.desc}\n`;
});

fs.writeFileSync(path.join(OUT, 'README.md'), index);
console.log(`\nDone! ${toolDirs.length} tutorials generated in output/devto-tutorials/`);

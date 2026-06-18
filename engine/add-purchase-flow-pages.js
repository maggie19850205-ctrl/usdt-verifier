const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.resolve(__dirname, '..', 'output', 'pages');
const USDT_ADDR = 'TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z';

const PURCHASE_FLOW = `
<!-- Purchase Flow -->
<style>
.modal-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.7);z-index:1000;justify-content:center;align-items:center}
.modal-overlay.active{display:flex}
.modal{background:#1a1a2e;border:1px solid #2a2a4a;border-radius:16px;padding:32px;max-width:480px;width:90%;position:relative}
.modal h2{color:#00e676;font-size:1.3rem;margin-bottom:8px}
.modal .close{position:absolute;top:16px;right:16px;background:none;border:none;color:#666;font-size:1.5rem;cursor:pointer;line-height:1}
.modal .close:hover{color:#fff}
.modal p{color:#b0b0b0;font-size:.9rem;margin-bottom:16px}
.modal .addr{background:#0a0a12;border:1px solid #2a2a4a;border-radius:8px;padding:12px;font-family:monospace;font-size:.8rem;color:#f59e0b;word-break:break-all;margin-bottom:16px;user-select:all}
.modal .price-line{font-size:1.2rem;color:#00e676;font-weight:700;margin:12px 0}
.modal input{width:100%;padding:12px 16px;background:#0a0a12;border:1px solid #2a2a4a;border-radius:8px;color:#e0e0e0;font-size:.9rem;margin-bottom:12px;box-sizing:border-box}
.modal input:focus{outline:none;border-color:#00e676}
.modal .submit-btn{width:100%;padding:14px;background:linear-gradient(135deg,#00e676,#00bcd4);border:none;border-radius:8px;color:#0a0a12;font-weight:700;font-size:1rem;cursor:pointer}
.modal .submit-btn:disabled{opacity:.5;cursor:not-allowed}
.modal .error{color:#ef4444;font-size:.8rem;margin-top:8px;display:none}
.modal .success{color:#00e676;font-size:.9rem;margin-top:12px;display:none;text-align:center}
.modal .success a{color:#00bcd4;text-decoration:underline;font-weight:600}
.modal .step{color:#888;font-size:.8rem;margin-bottom:8px;padding-left:20px;position:relative}
.modal .step::before{content:attr(data-num);position:absolute;left:0;color:#00e676;font-weight:700}
.modal .copied{color:#00e676;font-size:.75rem;display:none;margin-top:4px}
</style>
<div class="modal-overlay" id="purchaseModal">
<div class="modal">
<button class="close" onclick="closeModal()">&times;</button>
<h2>Complete Your Purchase</h2>
<p id="modalProduct">Product</p>
<div class="price-line" id="modalPrice">$0.00 USDT</div>
<div class="step" data-num="1">Send <strong id="stepAmount">$0.00 USDT</strong> (TRC-20) to:</div>
<div class="addr" id="walletAddr">TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z</div>
<button onclick="copyAddr()" style="background:#16162a;border:1px solid #2a2a4a;border-radius:6px;color:#aaa;padding:6px 12px;font-size:.8rem;cursor:pointer;margin-bottom:16px">Copy Address</button>
<span class="copied" id="copiedMsg">Copied!</span>
<div class="step" data-num="2">Enter your email and transaction ID:</div>
<input type="email" id="emailInput" placeholder="Your email address" required>
<input type="text" id="txidInput" placeholder="TRC-20 Transaction ID (TXID)" required>
<div class="error" id="errorMsg"></div>
<button class="submit-btn" id="submitBtn" onclick="submitPayment()">Verify Payment</button>
<div class="success" id="successMsg"></div>
</div>
</div>
<script>
const USDT_ADDR='TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z';let curProd='';let curAmt=0;
function openModal(p,a){curProd=p;curAmt=a;document.getElementById('modalProduct').textContent=p;document.getElementById('modalPrice').textContent='$'+a.toFixed(2)+' USDT';document.getElementById('stepAmount').textContent='$'+a.toFixed(2)+' USDT';document.getElementById('errorMsg').style.display='none';document.getElementById('successMsg').style.display='none';document.getElementById('submitBtn').disabled=false;document.getElementById('submitBtn').textContent='Verify Payment';document.getElementById('emailInput').value='';document.getElementById('txidInput').value='';document.getElementById('purchaseModal').classList.add('active')}
function closeModal(){document.getElementById('purchaseModal').classList.remove('active')}
function copyAddr(){navigator.clipboard.writeText(USDT_ADDR).then(function(){var m=document.getElementById('copiedMsg');m.style.display='inline';setTimeout(function(){m.style.display='none'},2000)})}
async function submitPayment(){var e=document.getElementById('emailInput').value.trim();var t=document.getElementById('txidInput').value.trim();var er=document.getElementById('errorMsg');var sb=document.getElementById('submitBtn');if(!e||!e.includes('@')){er.textContent='Please enter a valid email';er.style.display='block';return}if(!t||t.length<20){er.textContent='Please enter a valid TRC-20 TXID';er.style.display='block';return}er.style.display='none';sb.disabled=true;sb.textContent='Verifying...';try{var r=await fetch('/api/verify-payment',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({txid:t,email:e,product:curProd,amount:curAmt})});var d=await r.json();if(d.valid){document.getElementById('successMsg').style.display='block';document.getElementById('successMsg').innerHTML='<p>Payment verified!</p><p style="margin-top:8px"><a href="'+(d.directUrl||d.downloadUrl||'')+'" target="_blank">Click here to download</a></p>';sb.textContent='Verified';if(d.directUrl)setTimeout(function(){window.location.href=d.directUrl},2000)}else{er.textContent=d.reason||'Payment not found';er.style.display='block';sb.disabled=false;sb.textContent='Verify Payment'}}catch(e){er.textContent='Network error';er.style.display='block';sb.disabled=false;sb.textContent='Verify Payment'}}
</script>`;

function extractProductInfo(html) {
  const ogTitle = html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/);
  const titleTag = html.match(/<title>([^<]+)<\/title>/);
  const priceMatch = html.match(/data-price="([^"]+)"/);
  const priceText = html.match(/5\.99|3\.99|4\.99|8\.99|\$\d+\.\d+/);
  const priceFromText = html.match(/产品价格|price["':][^0-9]*(\d+\.\d+)/i);

  // Try to find the product display price
  let price = 5.99;
  if (priceMatch) {
    price = parseFloat(priceMatch[1]);
  } else if (priceText) {
    const match = priceText[0].match(/\d+\.\d+/);
    if (match) price = parseFloat(match[0]);
  }

  return {
    name: ogTitle ? ogTitle[1] : (titleTag ? titleTag[1].replace(/ - AutoMoney Store$/, '') : 'Product'),
    price: price
  };
}

function hasPurchaseFlow(html) {
  return html.includes('verify-payment') || html.includes('purchaseModal');
}

function getBuyButton(html) {
  // Match various buy button patterns
  const patterns = [
    /<a[^>]*class="[^"]*cta-btn[^"]*"[^>]*>.*?Buy.*?<\/a>/i,
    /<a[^>]*class="[^"]*buy-btn[^"]*"[^>]*>.*?<\/a>/i,
    /<a[^>]*>立即购买<\/a>/,
    /<button[^>]*>立即购买<\/button>/,
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m) return m[0];
  }
  return null;
}

// Process all product pages
const dirs = fs.readdirSync(PAGES_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .sort();

let modified = 0, skipped = 0;

for (const dir of dirs) {
  const indexPath = path.join(PAGES_DIR, dir.name, 'index.html');
  if (!fs.existsSync(indexPath)) { skipped++; continue; }

  const html = fs.readFileSync(indexPath, 'utf-8');

  if (hasPurchaseFlow(html)) { skipped++; continue; }

  const info = extractProductInfo(html);
  const buyBtn = getBuyButton(html);

  let newHtml = html;

  // Replace buy button with modal trigger
  const simpleBtnPatterns = [
    /<a[^>]*class="[^"]*cta-btn[^"]*"[^>]*>.*?<\/a>/i,
    /<a[^>]*class="[^"]*buy-now[^"]*"[^>]*>.*?<\/a>/i,
  ];
  let replaced = false;
  for (const pattern of simpleBtnPatterns) {
    if (pattern.test(newHtml)) {
      const price = info.price;
      newHtml = newHtml.replace(pattern, `<a href="javascript:void(0)" onclick="openModal('${info.name.replace(/'/g, "\\'")}', ${price})" class="cta-btn">Buy Now - $${price.toFixed(2)}</a>`);
      replaced = true;
      break;
    }
  }

  if (!replaced) {
    // Try Chinese button
    const zhPattern = /(<a[^>]*>|)(立即购买|Buy Now)[^<]*(<\/a>|)/;
    if (zhPattern.test(newHtml)) {
      newHtml = newHtml.replace(zhPattern, `<a href="javascript:void(0)" onclick="openModal('${info.name.replace(/'/g, "\\'")}', ${info.price})" class="cta-btn">Buy Now - $${info.price.toFixed(2)}</a>`);
      replaced = true;
    }
  }

  if (!replaced) {
    // Inject a buy button before payment section
    newHtml = newHtml.replace(
      /<h2>Payment<\/h2>|<h2>购买方式<\/h2>/i,
      `<div style="text-align:center"><a href="javascript:void(0)" onclick="openModal('${info.name.replace(/'/g, "\\'")}', ${info.price})" class="cta-btn">Buy Now - $${info.price.toFixed(2)}</a></div>\n$&`
    );
  }

  // Inject purchase flow before </body>
  if (newHtml.includes('</body>')) {
    newHtml = newHtml.replace('</body>', PURCHASE_FLOW + '\n</body>');
    fs.writeFileSync(indexPath, newHtml, 'utf-8');
    modified++;
  } else {
    skipped++;
  }
}

console.log(`Product pages modified: ${modified}, Skipped: ${skipped}`);

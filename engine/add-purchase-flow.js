const fs = require('fs');
const path = require('path');

const DL_DIR = path.resolve(__dirname, '..', 'output', 'downloads');
const SITE_URL = 'https://automoney-store.pages.dev';
const USDT_ADDR = 'TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z';

const PURCHASE_FLOW = `
<!-- Purchase Flow -->
<style>
.modal-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.7);z-index:1000;justify-content:center;align-items:center}
.modal-overlay.active{display:flex}
.modal{background:#1a1a2e;border:1px solid #2a2a4a;border-radius:16px;padding:32px;max-width:480px;width:90%;position:relative}
.modal h2{color:#00e676;font-size:1.3rem;margin-bottom:8px}
.modal .close{position:absolute;top:16px;right:16px;background:none;border:none;color:#666;font-size:1.5rem;cursor:pointer}
.modal .close:hover{color:#fff}
.modal p{color:#b0b0b0;font-size:.9rem;margin-bottom:16px}
.modal .addr{background:#0a0a12;border:1px solid #2a2a4a;border-radius:8px;padding:12px;font-family:monospace;font-size:.8rem;color:#f59e0b;word-break:break-all;margin-bottom:16px;user-select:all}
.modal .qr{text-align:center;margin:16px 0;padding:16px;background:#0a0a12;border-radius:8px}
.modal .qr img{width:160px;height:160px}
.modal .qr .hint{color:#666;font-size:.75rem;margin-top:8px}
.modal input{width:100%;padding:12px 16px;background:#0a0a12;border:1px solid #2a2a4a;border-radius:8px;color:#e0e0e0;font-size:.9rem;margin-bottom:12px}
.modal input:focus{outline:none;border-color:#00e676}
.modal .price-line{font-size:1.2rem;color:#00e676;font-weight:700;margin:12px 0}
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
<p id="modalProduct">Product Name</p>
<div class="price-line" id="modalPrice">$0.00 USDT</div>
<div class="step" data-num="1">Send <strong id="stepAmount">$0.00 USDT</strong> (TRC-20) to:</div>
<div class="addr" id="walletAddr">TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z</div>
<button onclick="copyAddr()" style="background:#16162a;border:1px solid #2a2a4a;border-radius:6px;color:#aaa;padding:6px 12px;font-size:.8rem;cursor:pointer;margin-bottom:16px">Copy Address</button>
<span class="copied" id="copiedMsg">Copied!</span>
<div class="step" data-num="2">Enter your email and transaction ID:</div>
<input type="email" id="emailInput" placeholder="Your email address" required>
<input type="text" id="txidInput" placeholder="TRC-20 Transaction ID (TXID)" required>
<div class="error" id="errorMsg">Error message</div>
<button class="submit-btn" id="submitBtn" onclick="submitPayment()">Verify Payment</button>
<div class="success" id="successMsg">
<p>Payment verified! Redirecting to download...</p>
</div>
</div>
</div>
<script>
const USDT_ADDR = 'TRnz5Pi8R3hjCbBjnDuZo7ZvR57euo2q8Z';
let currentProduct = '';
let currentAmount = 0;
let currentFile = '';

function openModal(product, amount, file) {
  currentProduct = product;
  currentAmount = amount;
  currentFile = file;
  document.getElementById('modalProduct').textContent = product;
  document.getElementById('modalPrice').textContent = '$' + amount.toFixed(2) + ' USDT';
  document.getElementById('stepAmount').textContent = '$' + amount.toFixed(2) + ' USDT';
  document.getElementById('errorMsg').style.display = 'none';
  document.getElementById('successMsg').style.display = 'none';
  document.getElementById('submitBtn').disabled = false;
  document.getElementById('submitBtn').textContent = 'Verify Payment';
  document.getElementById('emailInput').value = '';
  document.getElementById('txidInput').value = '';
  document.getElementById('purchaseModal').classList.add('active');
}

function closeModal() {
  document.getElementById('purchaseModal').classList.remove('active');
}

function copyAddr() {
  navigator.clipboard.writeText(USDT_ADDR).then(function() {
    var m = document.getElementById('copiedMsg');
    m.style.display = 'inline';
    setTimeout(function(){ m.style.display = 'none'; }, 2000);
  });
}

async function submitPayment() {
  var email = document.getElementById('emailInput').value.trim();
  var txid = document.getElementById('txidInput').value.trim();
  var errorEl = document.getElementById('errorMsg');
  var submitBtn = document.getElementById('submitBtn');
  if (!email || !email.includes('@')) {
    errorEl.textContent = 'Please enter a valid email address';
    errorEl.style.display = 'block';
    return;
  }
  if (!txid || txid.length < 20) {
    errorEl.textContent = 'Please enter a valid TRC-20 transaction ID';
    errorEl.style.display = 'block';
    return;
  }
  errorEl.style.display = 'none';
  submitBtn.disabled = true;
  submitBtn.textContent = 'Verifying...';
  try {
    var res = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({txid: txid, email: email, product: currentProduct, amount: currentAmount})
    });
    var data = await res.json();
    if (data.valid) {
      document.getElementById('successMsg').style.display = 'block';
      document.getElementById('successMsg').innerHTML = '<p>Payment verified!</p><p style="margin-top:8px"><a href="' + (data.directUrl || data.downloadUrl || '') + '" target="_blank">Click here to download your product</a></p>';
      submitBtn.textContent = 'Verified';
      if (data.directUrl) {
        setTimeout(function(){ window.location.href = data.directUrl; }, 2000);
      }
    } else {
      errorEl.textContent = data.reason || 'Payment not found. Make sure your TXID is correct.';
      errorEl.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Verify Payment';
    }
  } catch(e) {
    errorEl.textContent = 'Network error. Please try again.';
    errorEl.style.display = 'block';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Verify Payment';
  }
}
</script>`;

function extractProductInfo(html) {
  const titleMatch = html.match(/<title>([^<]+?) - AutoMoney Store<\/title>/);
  const priceMatch = html.match(/<p class="price">\$(\d+\.\d+)<\/p>/);
  const nameMatch = html.match(/<h1>([^<]+)<\/h1>/);
  return {
    title: titleMatch ? titleMatch[1] : null,
    name: nameMatch ? nameMatch[1] : null,
    price: priceMatch ? parseFloat(priceMatch[1]) : 5.99,
  };
}

function hasPurchaseFlow(html) {
  return html.includes('verify-payment') || html.includes('purchaseModal');
}

// Process all download files
const files = fs.readdirSync(DL_DIR)
  .filter(f => f.endsWith('.html') && f !== 'index.html')
  .sort();

let modified = 0, skipped = 0;

for (const file of files) {
  const filePath = path.join(DL_DIR, file);
  const html = fs.readFileSync(filePath, 'utf-8');

  if (hasPurchaseFlow(html)) {
    skipped++;
    continue;
  }

  const info = extractProductInfo(html);
  if (!info.title) {
    skipped++;
    continue;
  }

  // Replace the simple Buy Now link with modal trigger
  let newHtml = html;
  const buyLinkRegex = /<a href="[^"]*" class="cta-btn">Buy Now - \$[^<]+<\/a>/;
  const buyMatch = newHtml.match(buyLinkRegex);
  if (buyMatch) {
    const productName = info.name || info.title;
    const price = info.price;
    newHtml = newHtml.replace(
      buyLinkRegex,
      `<a href="javascript:void(0)" onclick="openModal('${productName.replace(/'/g, "\\'")}', ${price}, '${file.replace(/\.html$/, '')}')" class="cta-btn">Buy Now - $${price.toFixed(2)}</a>`
    );
  }

  // Inject purchase flow before </body>
  if (newHtml.includes('</body>')) {
    newHtml = newHtml.replace('</body>', PURCHASE_FLOW + '\n</body>');
    fs.writeFileSync(filePath, newHtml, 'utf-8');
    modified++;
  } else {
    skipped++;
  }
}

console.log(`Purchase flow added: ${modified}, Skipped (already has / no match): ${skipped}`);
console.log(`Total download files: ${files.length}`);

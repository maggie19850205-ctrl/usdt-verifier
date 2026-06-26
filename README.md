# USDT TRC-20 Transaction Verifier

A simple, zero-dependency USDT TRC-20 transaction verification tool. Check any USDT transaction on the Tron blockchain from the command line.

## Features

- Verify USDT TRC-20 transactions by TXID
- Check amount, sender, recipient, and confirmation status
- No API keys required (uses public Tronscan API)
- Single file, zero dependencies
- Also available as a [web tool](https://maggie19850205-ctrl.github.io/usdt-verifier/)

## Files

| File | Description |
|------|-------------|
| `verify-usdt.py` | Command-line Python script |
| `index.html` | Web-based version (GitHub Pages) |

## Installation

```bash
# Download the script
curl -O https://raw.githubusercontent.com/maggie19850205-ctrl/usdt-verifier/main/verify-usdt.py

# Make it executable
chmod +x verify-usdt.py
```

## Usage

```bash
# Verify a transaction
python3 verify-usdt.py TXID_HERE

# Check with expected amount
python3 verify-usdt.py TXID_HERE --expected 99.00
```

### Example output

```
USDT TRC-20 Transaction Verification
====================================
TXID:         abc123def...
Status:       ✓ CONFIRMED (42 confirmations)
From:         Txxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
To:           Txxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Amount:       99.00 USDT
Block:        65432100
Timestamp:    2026-06-22 14:30:00 UTC
```

## How it works

Uses the public [Tronscan API](https://apilist.tronscanapi.com/api/transaction-info) to fetch transaction data. No authentication needed. The script parses the response and displays the relevant fields.

## Use Cases

- **Merchants**: Verify customer payments before delivering digital goods
- **Developers**: Integration test your USDT payment flow
- **Traders**: Confirm incoming transfers before releasing assets

## License

MIT

---

*Built by [AgentPro](https://agentpro.pages.dev). Need a complete self-hosted USDT payment gateway? [Check our store](https://automoney-store.pages.dev/?product=usdt-payment-gateway-self-hosted).*

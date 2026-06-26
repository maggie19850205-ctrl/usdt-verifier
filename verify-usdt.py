#!/usr/bin/env python3
"""USDT TRC-20 Transaction Verifier

Usage:
    python3 verify-usdt.py <TXID>
    python3 verify-usdt.py <TXID> --expected 99.00
"""

import json
import sys
import urllib.request

TRONSCAN_API = "https://apilist.tronscanapi.com/api/transaction-info?hash="


def fetch_tx(txid):
    url = TRONSCAN_API + txid
    req = urllib.request.Request(url, headers={"User-Agent": "usdt-verifier/1.0"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        return json.loads(resp.read())


def format_tx(data):
    token_info = data.get("tokenTransferInfo") or {}
    lines = []
    lines.append("USDT TRC-20 Transaction Verification")
    lines.append("=" * 40)
    lines.append(f"TXID:         {data.get('hash', 'N/A')}")
    confirmed = data.get("confirmed", False)
    status = f"\u2713 CONFIRMED ({data.get('confirmations', 0)} confirmations)" if confirmed else "\u23f3 Pending"
    lines.append(f"Status:       {status}")
    lines.append(f"From:         {token_info.get('from_address', 'N/A')}")
    lines.append(f"To:           {token_info.get('to_address', 'N/A')}")
    amount_str = token_info.get("amount_str", "N/A")
    lines.append(f"Amount:       {amount_str} USDT")
    lines.append(f"Block:        {data.get('block', 'N/A')}")
    ts = data.get("timestamp", 0)
    if ts:
        from datetime import datetime
        lines.append(f"Timestamp:    {datetime.utcfromtimestamp(ts / 1000).strftime('%Y-%m-%d %H:%M:%S')} UTC")
    else:
        lines.append("Timestamp:    N/A")
    return "\n".join(lines)


def main():
    if len(sys.argv) < 2:
        print(__doc__.strip())
        sys.exit(1)

    txid = sys.argv[1]
    expected = None
    if "--expected" in sys.argv:
        idx = sys.argv.index("--expected")
        if idx + 1 < len(sys.argv):
            expected = float(sys.argv[idx + 1])

    try:
        data = fetch_tx(txid)
    except Exception as e:
        print(f"Error fetching transaction: {e}")
        sys.exit(1)

    if "error" in data or not data.get("hash"):
        print("Transaction not found or invalid TXID.")
        sys.exit(1)

    print(format_tx(data))

    if expected is not None:
        token_info = data.get("tokenTransferInfo") or {}
        amount_str = token_info.get("amount_str", "0")
        try:
            amount = float(amount_str)
            if abs(amount - expected) < 0.01:
                print(f"\nAmount check: \u2713 Matches expected ${expected:.2f} USDT")
            else:
                print(f"\nAmount check: \u2717 Expected ${expected:.2f} USDT, got ${amount:.2f} USDT")
        except ValueError:
            print(f"\nAmount check: Could not parse amount")


if __name__ == "__main__":
    main()

#!/bin/bash
# USDT TRC-20 Transaction Verifier
# Usage: ./verify-usdt.sh <TXID>

if [ -z "$1" ]; then
  echo "Usage: ./verify-usdt.sh <TXID>"
  echo "Example: ./verify-usdt.sh abc123def456..."
  exit 1
fi

TXID="$1"
URL="https://apilist.tronscanapi.com/api/transaction-info?hash=$TXID"

RESPONSE=$(curl -s "$URL")

CONFIRMED=$(echo "$RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('confirmed', ''))" 2>/dev/null)
AMOUNT=$(echo "$RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tokenTransferInfo',{}).get('amount_str', 'N/A'))" 2>/dev/null)
SENDER=$(echo "$RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); t=d.get('tokenTransferInfo',{}); print(t.get('from_address','N/A'))" 2>/dev/null)
RECEIVER=$(echo "$RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); t=d.get('tokenTransferInfo',{}); print(t.get('to_address','N/A'))" 2>/dev/null)
BLOCK=$(echo "$RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('block', 'N/A'))" 2>/dev/null)
TIMESTAMP=$(echo "$RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('timestamp', 'N/A'))" 2>/dev/null)

echo "USDT TRC-20 Transaction Verification"
echo "===================================="
echo "TXID:         $TXID"
echo "Status:       $([ "$CONFIRMED" = "True" ] && echo '✓ CONFIRMED' || echo 'Pending')"
echo "Amount:       $AMOUNT USDT"
echo "From:         $SENDER"
echo "To:           $RECEIVER"
echo "Block:        $BLOCK"
echo "Timestamp:    $TIMESTAMP"

---
sidebar_label: Broadcast
id: broadcast
---

# Step 3 — Broadcast the Transaction

Broadcast the signed transaction to the target chain using your wallet or signing service. This step submits the payload produced by the swap call.

## Endpoint

Use the broadcast flow that matches your environment:

- EVM: sign and broadcast with your EVM wallet stack.
- Cosmos: sign and broadcast via Cosmos SDK/Keplr compatible tooling.

If you are using Euclid meta transactions, see:
- [Meta Transactions — Sign](/docs/API/API%20Reference/REST/Transactions/Meta%20Transactions/Sign)
- [Meta Transactions — Broadcast](/docs/API/API%20Reference/REST/Transactions/Meta%20Transactions/Broadcast)

## Minimal example (meta-tx broadcast)

```bash
curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/meta-txn/broadcast' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "call_data": {
      "call_data": [
        {
          "target": "euclid1...",
          "call_data": "{\"swap\":{...}}"
        }
      ],
      "expiry": 1768847836,
      "nonce": "1768847776",
      "signer_address": "0x...",
      "signer_chain_uid": "bsc",
      "signer_prefix": "0x"
    },
    "chain_uid": "bsc",
    "pub_key": "0x...",
    "signature": "0x...",
    "types": ["swap"],
    "wallet_address": "0x..."
  }'
```

Next: track the transaction.

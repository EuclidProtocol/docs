---
sidebar_label: Track Execution
id: track-execution
---

# Step 4 — Track Execution

After broadcast, track execution until terminal status.

## Endpoint

For swaps, use: [Track Swap Transaction](/docs/API/API%20Reference/REST/Transactions/Tracking/Track%20Swap%20Transaction)

```bash
https://testnet.api.euclidprotocol.com/api/v1/txn/track/swap
```

## Minimal request example

```bash
curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/txn/track/swap' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "chain": "base",
    "tx_hash": "0x..."
  }'
```

## Required checks in response

- Terminal status (`success` or `failed`).
- Progress status (`swap_status`) and release status.
- Final destination token amount and destination chain.


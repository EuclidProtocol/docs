---
sidebar_label: Track Execution
id: track-execution
---

# Step 4 — Track Execution

After broadcast, track execution until terminal status.

## Endpoint

For swaps, use: [Track Swap Transaction](/docs/API/API%20Reference/REST/Transactions/Tracking/Track%20Swap%20Transaction)

```bash
https://api.euclidprotocol.com/api/v1/txn/track/swap
```

## Minimal request example

```bash
curl -X 'POST' \
  'https://api.euclidprotocol.com/api/v1/txn/track/swap' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "chain": "ethereum",
    "tx_hash": "0x31604586b4844a82eb07116abccde69073d73fe8d9a364bda92d552588bfcff9"
}'
```

## Required checks in response

- Terminal status (`success` or `failed`).
- Progress status (`swap_status`) and release status.
- Final destination token amount and destination chain.

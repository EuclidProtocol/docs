---
sidebar_label: Track Execution
id: track-execution
---

# Step 4 — Track Execution

After broadcast, track the swap to confirm completion or handle retries. Your UI should surface pending, success, and failure states to the user.

## Endpoint

See the REST API reference: [Track Transactions](/docs/API/API%20Reference/REST/Transactions/Tracking/Track%20Transactions)

## Minimal request example

```bash
curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/track/transactions' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "tx_id": "0"
  }'
```

## What to look for

- Final status (success or failure).
- Partial execution details if any hop is pending.
- Final amounts and release chain information.

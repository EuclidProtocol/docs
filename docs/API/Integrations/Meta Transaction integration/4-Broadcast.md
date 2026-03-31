---
sidebar_label: Broadcast
id: meta-tx-broadcast
---

# Step 4 — Broadcast

Submit the signed payload for relay and on-chain execution.

## Endpoint

[Broadcast](/docs/API/API%20Reference/REST/Transactions/Meta%20Transactions/Broadcast)

## Request

```json
{
  "wallet_address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
  "chain_uid": "monad",
  "signature": "0x...",
  "pub_key": "0x...",
  "call_data": {
    "signer_address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
    "signer_prefix": "0x",
    "signer_chain_uid": "monad",
    "call_data": [
      {
        "target": "euclid1...",
        "call_data": "{...}"
      }
    ],
    "expiry": 1771849451,
    "nonce": "1771849151"
  },
  "types": ["swap"],
  "meta": [
    {
      "type": "swap",
      "token_in": "stt",
      "token_out": "euclid",
      "amount_in": "100000000000000000"
    }
  ]
}
```

## Response

```json
{
  "queue_id": "0x887e4aac216674d2c432798f851c1ea5d505b2e1-monad-20260120161734"
}
```

Use `queue_id` to track downstream transaction state in your pipeline.

## Final Checklist

- `call_data` comes from Step 2 `payload`.
- `types` comes from Step 2 `types`.
- `meta` comes from Step 2 `meta`.
- `signature`/`pub_key` come from Step 3.
- `wallet_address` and `chain_uid` match the signer.

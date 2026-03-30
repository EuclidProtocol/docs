---
sidebar_label: Generate Message
id: meta-tx-generate-message
---

# Step 1 — Generate Message

Create the contract `msg` that will later be signed and broadcast.

## Endpoint

Use one of these:

- [Swap](/docs/API/API%20Reference/REST/Transactions/Meta%20Transactions/Swap)
- [Transfer](/docs/API/API%20Reference/REST/Transactions/Meta%20Transactions/Transfer)
- [Withdraw](/docs/API/API%20Reference/REST/Transactions/Meta%20Transactions/Withdraw)

## Example (Swap)

```bash
curl -X POST \
  'https://api.euclidprotocol.com/api/v1/execute/meta-txn/swap' \
  -H 'Content-Type: application/json' \
  -d '{
  "amount_in": "100000000000000000",
  "asset_in": {
    "token": "stt",
    "token_type": { "voucher": {} }
  },
  "recipients": [
    {
      "user": {
        "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
        "chain_uid": "monad"
      },
      "amount": { "dynamic": "0" },
      "denom": { "voucher": {} },
      "unsafe_refund_as_voucher": false
    }
  ],
  "slippage": "5",
  "sender": {
    "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
    "chain_uid": "monad"
  },
  "swap_path": {
    "path": [
      {
        "route": ["stt", "euclid"],
        "dex": "euclid",
        "chain_uid": "vsl",
        "amount_in": "100000000000000000",
        "amount_out": "1206"
      }
    ]
  }
}'
```

## Example Response

```json
{
  "msg": {
    "target": "euclid1...",
    "call_data": "{...}"
  },
  "type": "swap",
  "token_in": "stt",
  "token_out": "euclid",
  "token": "",
  "amount_in": "100000000000000000",
  "amount_out": "1206"
}
```

## What You Keep For Step 2

From this response, keep the entire object and place it into `msgs[]` in the sign call.

Next: [Build Payload](./2-Build%20Payload.md)

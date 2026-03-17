---
sidebar_label: Build Payload
id: meta-tx-build-payload
---

# Step 2 — Build Payload

Send one or more Step 1 responses in `msgs` to get a signable payload.

## Endpoint

[Meta Sign](/docs/API/API%20Reference/REST/Transactions/Meta%20Transactions/Sign)

## Request

```json
{
  "msgs": [
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
  ],
  "sender_address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
  "sender_chain_uid": "monad"
}
```

## Response

```json
{
  "cosmos_raw_payload": "...",
  "evm_raw_payload": "...",
  "meta": [
    {
      "type": "swap",
      "token_in": "stt",
      "token_out": "euclid",
      "amount_in": "100000000000000000"
    }
  ],
  "payload": {
    "signer_address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
    "signer_prefix": "0x",
    "signer_chain_uid": "monad",
    "call_data": [
      {
        "target": "euclid1...",
        "call_data": "{...}"
      }
    ],
    "expiry": 1772797186,
    "nonce": "1772796886"
  },
  "types": ["swap"]
}
```

## How To Build Next Step Input

Use these response fields directly in Step 4 broadcast request:

- `payload` -> broadcast `call_data`
- `types` -> broadcast `types`
- `meta` -> broadcast `meta` (optional but recommended)

And use `payload` or raw payload string for signing in Step 3.

Next: [Sign Payload](./3-Sign%20Payload.md)

---
sidebar_label: Create Swap Payload
id: create-swap-payload
---

# Step 2 — Create Swap Payload

Build the swap payload using the route selected in Step 1.

## Endpoint

See the REST API reference: [Swap](/docs/API/API%20Reference/REST/Transactions/Swap)

## Minimal request example

```bash
curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/swap' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "amount_in": "1000000",
    "asset_in": {
      "token": "euclid",
      "token_type": { "native": { "denom": "ueuclid" } }
    },
    "slippage": "50",
    "recipients": [
      {
        "user": {
          "chain_uid": "neutron",
          "address": "neutron1..."
        },
        "amount": {
          "dynamic": "true"
        }
      }
    ],
    "sender": {
      "chain_uid": "neutron",
      "address": "neutron1..."
    },
    "swap_path": {
      "path": [
        {
          "route": ["euclid", "bnb"],
          "dex": "euclid",
          "chain_uid": "vsl",
          "amount_in": "1000000",
          "amount_out": "..."
        }
      ]
    }
  }'
```

## Required validation before submit

- `swap_path` is exactly the selected route from Step 1.
- `sender` matches the signing wallet context.
- `recipients` contains the intended destination chain and address.
- `recipients[].amount` is set for each recipient (`dynamic` is recommended when exact output is unknown before execution).

Next step: [Broadcast](./broadcast).

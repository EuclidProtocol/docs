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
  'https://api.euclidprotocol.com/api/v1/execute/swap' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "amount_in": "1000000",
    "asset_in": {
      "token": "usdc",
      "token_type": {
        "smart": {
          "contract_address": "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359"
        }
      }
    },
    "slippage": "100",
    "recipients": [
      {
        "user": {
          "chain_uid": "polygon",
          "address": "0x1111111111111111111111111111111111111111"
        },
        "amount": {
          "less_than_or_equal": "995000"
        },
        "denom": {
          "smart": {
            "contract_address": "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
          }
        },
        "forwarding_message": "",
        "unsafe_refund_as_voucher": false
      }
    ],
    "sender": {
      "chain_uid": "polygon",
      "address": "0x1111111111111111111111111111111111111111"
    },
    "swap_path": {
      "path": [
        {
          "route": ["usdc", "usdt"],
          "dex": "euclid",
          "chain_uid": "vsl",
          "amount_in": "1000000",
          "amount_out": "1003064"
        }
      ],
      "total_price_impact": "0.00"
    }
  }'
```

## Required validation before submit

- `swap_path` is exactly the selected route from Step 1.
- `sender` matches the signing wallet context.
- `recipients` contains the intended destination chain and address.
- `recipients[].amount` is set for each recipient (`dynamic` is recommended when exact output is unknown before execution).

Next step: [Broadcast](./broadcast).

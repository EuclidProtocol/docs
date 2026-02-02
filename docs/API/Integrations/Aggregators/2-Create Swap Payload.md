---
sidebar_label: Create Swap Payload
id: create-swap-payload
---

# Step 2 — Create the Swap Payload

Build the swap payload using the selected route. This is the signed transaction payload your system will broadcast on behalf of the user.

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
    "sender": {
      "chain_uid": "neutron",
      "address": "neutron1..."
    },
    "swap_path": {
      "path": [
        {
          "route": ["euclid", "bnb"],
          "dex": "euclid"
        }
      ]
    },
    "slippage": "50"
  }'
```

## Notes

- The `swap_path` should come directly from your chosen route.
- You can provide additional fields (limits, partner fee, or routing constraints) as needed.

Next: broadcast the transaction.

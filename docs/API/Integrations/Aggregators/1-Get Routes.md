---
sidebar_label: Get Routes
id: get-routes
unlisted: true
---

# Step 1 — Get Routes

Use the Routes endpoint to discover the best path for a swap. Routes can include multiple hops and multiple DEXes; you choose the best option based on price, latency, or other heuristics.

## Endpoint

See the REST API reference: [Get Routes](/docs/API/API%20Reference/REST/Routes/Get%20Routes)

## Minimal request example

```bash
curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/routes' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "external": true,
    "token_in": "euclid",
    "token_out": "bnb",
    "amount_in": "1000000",
    "chain_uids": []
  }'
```

## What to do with the response

- Select the best route.
- Persist the `swap_path` and any metadata you need for your quote.
- Pass the selected path into the swap call in the next step.

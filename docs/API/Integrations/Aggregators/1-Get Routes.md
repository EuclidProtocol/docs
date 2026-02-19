---
sidebar_label: Get Routes
id: get-routes
---

# Step 1 — Get Routes

Use the Routes endpoint to fetch candidate swap routes.

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

## Required output from this step

- Select one route from `paths`.
- Store the selected route as `swap_path` for Step 2.
- Keep quote metadata (output amount, price impact, timestamp) for UI/validation.

Next step: [Create Swap Payload](./create-swap-payload).

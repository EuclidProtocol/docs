---
sidebar_position: 1
---

# Get Routes 

Gets all swap routes available when swapping the specified asset_in to receive the specified asset_out.

### Request URL

```bash
https://api.euclidprotocol.com/api/v1/routes
```
### Curl
```bash
curl -X 'POST' \
  'https://api.euclidprotocol.com/api/v1/routes' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "amount_in": "100",
  "token_in": "usdt",
  "token_out": "nibi"
}'
```
| Field       | Type   | Description                        |
|-------------|--------|------------------------------------|
| `amount_in`  | String | The amount of tokens being swapped in. |
| `asset_in`  | String | The identifier of the asset being swapped in. |
| `asset_out` | String | The identifier of the desired asset out.|

### Example Response

```json
{
  "paths":[
    {
    "route":["usdt","nibi"],
    "amount_out":100
    },
    {
      "route":["usdt","usdc","eth","nibi"],
      "amount_out":100
    }
    ]
  }
```
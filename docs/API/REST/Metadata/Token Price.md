---
sidebar_position: 1
---

# Get Token Price

Gets the token price of the asset_out in reference to the asset_in.

### Request URL

```bash
https://testnet.api.euclidprotocol.com/api/v1/token/price
```
### Curl
```bash
curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/token/price' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "asset_in": "fundenom",
  "asset_out": "nibi"
}'
```
### Parameters

| Field       | Type   | Description                        |
|-------------|--------|------------------------------------|
| `asset_in`  | String | The identifier of the asset_in. |
| `asset_out` | String | The identifier of the asset_out.|

### Example Response

```json
{
 "amount":0.008118633378082513
}
```

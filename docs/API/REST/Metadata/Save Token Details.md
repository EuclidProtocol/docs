---
sidebar_position: 2
---

# Save Metadata

Save a token's metadata.

### Request URL

```bash
https://api.staging.euclidprotocol.com/dev/api/v1/tokens/details
```
### Curl
```bash
curl -X 'POST' \
  'https://api.staging.euclidprotocol.com/dev/api/v1/tokens/details' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "coinDecimal": 6,
  "coinGeckoId": "435",
  "description": "A native token in example chain",
  "displayName": "uexample",
  "image": "Image URL",
  "price": "10",
  "tokenId": "EXAMPLE"
}'
```

### Parameters

| Field          | Type   | Description                                     |
|----------------|--------|-------------------------------------------------|
| `coinDecimal`  | Number | The number of decimal places for the token.     |
| `coinGeckoId`  | String | The CoinGecko identifier for the token.         |
| `description`  | String | A description of the token.                     |
| `displayName`  | String | The display name of the token.                  |
| `image`        | String | The URL of the token's image.                   |
| `price`        | String | The price of the token in US dollars.                         |
| `tokenId`      | String | The unique identifier for the token.            |

### Example Response

```json
{
  "message": "Data saved successfully"
}
```

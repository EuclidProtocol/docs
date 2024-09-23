---
sidebar_position: 3
---

# Get Token Metadata

Fetches the metadata for all tokens.

### Request URL

```bash
https://testnet.api.euclidprotocol.com/api/v1/tokens/details
```

### Curl
```bash
curl -X 'GET' \
  'https://testnet.api.euclidprotocol.com/api/v1/tokens/details' \
  -H 'accept: application/json'
```

### Example Response

```json
{
  "data": [
    {
      "coinDecimal": 6,
      "displayName": "USDT",
      "description": "USD tether",
      "tokenId": "usdt",
      "image": "https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
      "price": "1"
    },
    {
      "coinDecimal": 6,
      "displayName": "ATOM",
      "description": "Cosmos Token",
      "tokenId": "atom",
      "image": "https://tokens.1inch.io/0x0eb3a705fc54725037cc9e008bdede697f62f335.png",
      "price": "1"
    },
    {
      "coinDecimal": 6,
      "displayName": "USDC",
      "description": "USD Coin",
      "tokenId": "usdc",
      "image": "https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
      "price": "1"
    },
    {
      "coinDecimal": 6,
      "displayName": "OSMO",
      "description": "Cosmos Token",
      "tokenId": "osmo",
      "image": "https://cryptologos.cc/logos/osmosis-osmo-logo.png",
      "price": "1"
    },
  ]
}
```
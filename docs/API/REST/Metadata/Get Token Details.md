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
      "displayName":"OSMO",
      "description":"Osmosis Token",
      "tokenId":"osmo",
      "image":"https://cryptologos.cc/logos/osmosis-osmo-logo.png",
      "price":"0.37"
   },
   {
      "coinDecimal":6,
      "displayName":"NTRN",
      "description":"NTRN Token",
      "tokenId":"ntrn",
      "image":"https://s3.coinmarketcap.com/static-gravity/image/04890a2811254e7d9f0f6a7116e71c67.png",
      "price":"4.67"
   },
   {
      "coinDecimal":6,
      "displayName":"TESTCORE",
      "description":"Testcore Token",
      "tokenId":"testcore",
      "image":"https://assets.coingecko.com/coins/images/28938/standard/file_589.jpg",
      "price":"1.5"
   },
   {
      "coinDecimal":6,
      "displayName":"STARS",
      "description":"Stars Token",
      "tokenId":"stars",
      "image":"https://s2.coinmarketcap.com/static/img/coins/64x64/16842.png",
      "price":"0.007853"
   }
  ]
}
```
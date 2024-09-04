---
sidebar_position: 1
---

# Get Chains 

Gets all chain information and configurations for all chains.

### Request URL
 
```bash
https://api.euclidprotocol.com/api/v1/chains
```
### Curl
```bash
curl -X 'GET' \
  'https://api.euclidprotocol.com/api/v1/chains' \
  -H 'accept: application/json'
```

### Example Response

```json
{
  "data": [
    {
      "CreatedAt": "0001-01-01T00:00:00Z",
      "UpdatedAt": "0001-01-01T00:00:00Z",
      "chainId": "localpoolb-2",
      "chainName": "Pool B",
      "rpc": "https://chains.euclid.sumitdhiman.in:20142",
      "rest": "https://chains.euclid.sumitdhiman.in:20242",
      "bip44": {
        "coinType": 118
      },
      "coinType": 118,
      "bech32Config": {
        "Bech32PrefixAccAddr": "wasm",
        "Bech32PrefixAccPub": "wasmpub",
        "Bech32PrefixValAddr": "wasmvaloper",
        "Bech32PrefixValPub": "wasmvaloperpub",
        "Bech32PrefixConsAddr": "wasmvalcons",
        "Bech32PrefixConsPub": "wasmvalconspub"
      },
      "currencies": [
        {
          "coinDenom": "STAKE",
          "coinMinimalDenom": "stake",
          "coinDecimals": 6,
          "gasPriceStep": {}
        },
        {
          "coinDenom": "ATOMB",
          "coinMinimalDenom": "uatomb",
          "coinDecimals": 6,
          "gasPriceStep": {}
        },
        {
          "coinDenom": "OSMOB",
          "coinMinimalDenom": "uosmob",
          "coinDecimals": 6,
          "gasPriceStep": {}
        },
        {
          "coinDenom": "POOLB",
          "coinMinimalDenom": "upoolb",
          "coinDecimals": 6,
          "gasPriceStep": {}
        },
        {
          "coinDenom": "USDCB",
          "coinMinimalDenom": "uusdcb",
          "coinDecimals": 6,
          "gasPriceStep": {}
        },
        {
          "coinDenom": "USDTB",
          "coinMinimalDenom": "uusdtb",
          "coinDecimals": 6,
          "gasPriceStep": {}
        }
      ],
      "feeCurrencies": [
        {
          "coinDenom": "POOLB",
          "coinMinimalDenom": "upoolb",
          "coinDecimals": 6,
          "coinGeckoId": "unknown",
          "gasPriceStep": {
            "low": 0.01,
            "average": 0.025,
            "high": 0.03
          }
        }
      ],
      "gasPriceStep": {
        "low": 0.01,
        "average": 0.025,
        "high": 0.03
      },
      "stakeCurrency": {
        "coinDenom": "POOLB",
        "coinMinimalDenom": "upoolb",
        "coinDecimals": 6,
        "coinGeckoId": "unknown",
        "gasPriceStep": {}
      }
    }
  ]
}

```
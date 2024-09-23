---
sidebar_position: 1
---

# Get Chains 

Gets all chain information and configurations for all chains.

### Request URL
 
```bash
https://testnet.api.euclidprotocol.com/api/v1/chains
```
### Curl
```bash
curl -X 'GET' \
  'https://testnet.api.euclidprotocol.com/api/v1/chains' \
  -H 'accept: application/json'
```

### Example Response

```json
{
  "data": [
   {
      "CreatedAt":"0001-01-01T00:00:00Z",
      "UpdatedAt":"0001-01-01T00:00:00Z",
      "chainId":"nibiru-testnet-1",
      "chainName":"nibirutestnet",
      "rpc":"https://rpc.testnet-1.nibiru.fi",
      "rest":"https://lcd.testnet-1.nibiru.fi",
      "bip44":{
         "coinType":118
      },
      "bech32Config":{
         "Bech32PrefixAccAddr":"nibi",
         "Bech32PrefixAccPub":"nibipub",
         "Bech32PrefixValAddr":"nibivaloper",
         "Bech32PrefixValPub":"nibivaloperpub",
         "Bech32PrefixConsAddr":"nibivalcons",
         "Bech32PrefixConsPub":"nibivalconspub"
      },
      "currencies":[
         {
            "coinDenom":"NIBI",
            "coinMinimalDenom":"unibi",
            "coinDecimals":6,
            "gasPriceStep":{
               
            }
         }
      ],
      "feeCurrencies":[
         {
            "coinDenom":"NIBI",
            "coinMinimalDenom":"unibi",
            "coinDecimals":6,
            "gasPriceStep":{
               "low":0.05,
               "average":0.125,
               "high":0.2
            }
         }
      ],
      "gasPriceStep":{
         "low":0.05,
         "average":0.125,
         "high":0.2
      },
      "stakeCurrency":{
         "coinDenom":"NIBI",
         "coinMinimalDenom":"unibi",
         "coinDecimals":6,
         "gasPriceStep":{
            "low":0.05,
            "average":0.125,
            "high":0.2
         }
      },
      "features":[
         "cosmwasm"
      ]
   },
   {
      "CreatedAt":"0001-01-01T00:00:00Z",
      "UpdatedAt":"0001-01-01T00:00:00Z",
      "chainId":"osmo-test-5",
      "chainName":"Osmosis Testnet",
      "rpc":"https://rpc.testnet.osmosis.zone",
      "rest":"https://lcd.testnet.osmosis.zone",
      "bip44":{
         "coinType":118
      },
      "bech32Config":{
         "Bech32PrefixAccAddr":"osmo",
         "Bech32PrefixAccPub":"osmopub",
         "Bech32PrefixValAddr":"osmovaloper",
         "Bech32PrefixValPub":"osmovaloperpub",
         "Bech32PrefixConsAddr":"osmovalcons",
         "Bech32PrefixConsPub":"osmovalconspub"
      },
      "currencies":[
         {
            "coinDenom":"OSMO",
            "coinMinimalDenom":"uosmo",
            "coinDecimals":6,
            "gasPriceStep":{
               
            }
         },
         {
            "coinDenom":"ION",
            "coinMinimalDenom":"uion",
            "coinDecimals":6,
            "gasPriceStep":{
               
            }
         }
      ],
      "feeCurrencies":[
         {
            "coinDenom":"OSMO",
            "coinMinimalDenom":"uosmo",
            "coinDecimals":6,
            "gasPriceStep":{
               "low":0.0025,
               "average":0.025,
               "high":0.04
            }
         }
      ],
      "gasPriceStep":{
         "low":0.0025,
         "average":0.025,
         "high":0.04
      },
      "stakeCurrency":{
         "coinDenom":"OSMO",
         "coinMinimalDenom":"uosmo",
         "coinDecimals":6,
         "gasPriceStep":{
            
         }
      }
   }
  ]
}

```
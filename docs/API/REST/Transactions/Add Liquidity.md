---
sidebar_position: 3 
---

# Add Liquidity Request 

Generates a transaction to add liquidity to a pool.

### Request URL
 
```bash
https://testnet.api.euclidprotocol.com/api/v1/execute/liquidity/add
```
### Curl
```bash
curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/liquidity/add' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "pair_info": {
    "token_1": {
      "token": "nibi",
      "token_type": {
        "native": {
          "denom": "unibi"
        }
      }
    },
    "token_2": {
      "token": "stars",
      "token_type": {
        "native": {
          "denom": "ustars"
        }
      }
    }
  },
  "sender": {
    "address": "nibi14hcxlnwlqtq75ttaxf674vk6mafspg8x3ky6ts",
    "chain_uid": "nibiru"
  },
  "slippage_tolerance": 5,
  "token_1_liquidity": "1000000000",
  "token_2_liquidity": "1000440192"
}'
```
### Parameters

| **Name**              | **Type**             | **Description**                                                                                                       |
|-----------------------|----------------------|-----------------------------------------------------------------------------------------------------------------------|
| `pair_info`        | [`PairWithDenom`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#pairwithdenom)      | The two tokens to add liquidity to.                                                                                   |
| `token_1_liquidity` | `Uint128`            | The amount of liquidity added for the first token of the pair.                                                        |
| `token_2_liquidity` | `Uint128`            | The amount of liquidity added for the second token of the pair.                                                       |
| `slippage_tolerance`| `u64`                | The amount of slippage tolerated. If the slippage amount surpasses the specified amount, the request will fail and the user receives back the tokens. Specified as a percentage between 1 and 100. |
| `timeout`          | `Option<u64>`        | Optional duration in seconds after which the message will be timed out. Can be set to a minimum of 30 seconds and a maximum of 240 seconds. Defaults to 60 seconds if not specified. |
| `sender`          | [`CrossChainUser`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#crosschainuser)  | The address performing the swap request.                                                       |

### Example Response

```json
{
   "sender":{
      "chain_uid":"nibiru",
      "address":"nibi14hcxlnwlqtq75ttaxf674vk6mafspg8x3ky6ts"
   },
   "contract":"nibi1rwrwsyny3ew703ru0k2tgscwktrqsw9kyg5ykaydrxy0fq7gz6ksuyqfnm",
   "chain_id":"nibiru-testnet-1",
   "rpc_url":"https://rpc.testnet-1.nibiru.fi",
   "rest_url":"https://lcd.testnet-1.nibiru.fi",
   "msgs":[
      {
        //factory address
         "contractAddress":"nibi1rwrwsyny3ew703ru0k2tgscwktrqsw9kyg5ykaydrxy0fq7gz6ksuyqfnm",
         "msg":{
            "add_liquidity_request":{
               "pair_info":{
                  "token_1":{
                     "token":"nibi",
                     "token_type":{
                        "native":{
                           "denom":"unibi"
                        }
                     }
                  },
                  "token_2":{
                     "token":"stars",
                     "token_type":{
                        "native":{
                           "denom":"ustars"
                        }
                     }
                  }
               },
               "slippage_tolerance":5,
               "token_1_liquidity":"1000000000",
               "token_2_liquidity":"1000440192"
            }
         },
         "funds":[
            {
               "denom":"unibi",
               "amount":"1000000000"
            },
            {
               "denom":"ustars",
               "amount":"1000440192"
            }
         ]
      }
   ]
}
```
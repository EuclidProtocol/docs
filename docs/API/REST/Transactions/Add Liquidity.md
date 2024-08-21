---
sidebar_position: 3 
---

# Add Liquidity Request 

Generates a transaction to add liquidity to a pool.

### Request URL
 
```bash
https://api.euclidprotocol.com/api/v1/execute/liquidity/add
```
### Curl
```bash
curl -X 'POST' \
  'https://api.euclidprotocol.com/api/v1/execute/liquidity/add' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "pair_info": {
    "token_1": {
      "token": "usdc",
      "token_type": {
        "native": {
          "denom": "uusdcb"
        }
      }
    },
    "token_2": {
      "token": "usdt",
      "token_type": {
        "native": {
          "denom": "uusdtb"
        }
      }
    }
  },
  "sender": {
    "address": "wasm14hcxlnwlqtq75ttaxf674vk6mafspg8xv03ktg",
    "chain_uid": "osmosis"
  },
  "slippage_tolerance": 70,
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
  "sender": {
    "chain_uid": "osmosis",
    "address": "wasm14hcxlnwlqtq75ttaxf674vk6mafspg8xv03ktg"
  },
  "contract": "wasm1zh2dlnjmr839t2dkgqclfq5893edt3agswa0kmhdznwrz4xjmyhs8walp0",
  "chain_id": "localpoolb-2",
  "rpc_url": "http://rpc.url",
  "rest_url": "http://rest.url",
  "msgs": [
    {
      "contractAddress": "wasm1zh2dlnjmr839t2dkgqclfq5893edt3agswa0kmhdznwrz4xjmyhs8walp0",
      "msg": {
        "add_liquidity_request": {
          "pair_info": {
            "token_1": {
              "token": "usdc",
              "token_type": {
                "native": {
                  "denom": "uusdcb"
                }
              }
            },
            "token_2": {
              "token": "usdt",
              "token_type": {
                "native": {
                  "denom": "uusdtb"
                }
              }
            }
          },
          "slippage_tolerance": 70,
          "token_1_liquidity": "1000000000",
          "token_2_liquidity": "1000440192"
        }
      },
      "funds": [
        {
          "denom": "uusdcb",
          "amount": "1000000000"
        },
        {
          "denom": "uusdtb",
          "amount": "1000440192"
        }
      ]
    }
  ]
}
```
---
sidebar_position: 4
---

# Remove Liquidity

Generates a transaction to remove liquidity from a pool.

### Request URL
 
```bash
https://testnet.api.euclidprotocol.com/api/v1/execute/liquidity/remove
```
### Curl
```bash
curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/liquidity/remove' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "cross_chain_addresses": [],
  "lp_allocation": "1000000000",
  "pair": {
    "token_1": "usdc",
    "token_2": "usdt"
  },
  "sender": {
    "address": "wasm14hcxlnwlqtq75ttaxf674vk6mafspg8xv03ktg",
    "chain_uid": "osmosis"
  },
  "timeout": null,
  "vlp_address": "wasm1zh2dlnjmr839t2dkgqclfq5893edt3agswa0kmhdznwrz4xjmyhs8walp0"
}'
```
### Parameters
| Field                    | Type   | Description                                                      |
|--------------------------|--------|------------------------------------------------------------------|
| `cross_chain_addresses` | [`Vec<CrossChainUserWithLimit>`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#crosschainuserwithlimit)  | A set of addresses to specify where the asset_out should be released. The first element specified in the vector has highest priority and so on. |
| `lp_allocation`          | String | The amount of liquidity pool allocation to be removed.           |
| `pair`               | [`PairWithDenom`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#tokenwithdenom)                      | The token pair to request creating a new pool for.                                                                       |
|`sender`         | [`CrossChainUser`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#crosschainuser)  | The address performing the swap request.|       
| `timeout`                | `Option<u64>`        | Optional duration in seconds after which the message will be timed out. Can be set to a minimum of 30 seconds and a maximum of 240 seconds. Defaults to 60 seconds if not specified. |
| `vlp_address`            | String | The address of the VLP contract that the pool is on.                      |

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
        {
            "remove_liquidity":{
                "cross_chain_addresses":[],
                "lp_allocation":"1000000000",
                "pair":{
                    "token_1":"usdc",
                    "token_2":"usdt"
                    },
            "timeout":null}}
      },
      "funds": []
    }
  ]
}
```
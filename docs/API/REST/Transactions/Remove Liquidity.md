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
    "token_1": "fundenom",
    "token_2": "nibi"
  },
  "sender": {
    "address": "nibi14hcxlnwlqtq75ttaxf674vk6mafspg8x3ky6ts",
    "chain_uid": "nibiru"
  },
  "timeout": null,
  "vlp_address": "nibi147sw04ts68nxe80946m332rr8j79qqvas386al8d76jhamnnr99qj6xnfs"
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
   "sender":{
      "chain_uid":"nibiru",
      "address":"nibi14hcxlnwlqtq75ttaxf674vk6mafspg8x3ky6ts"
   },
   // factory address
   "contract":"nibi1rwrwsyny3ew703ru0k2tgscwktrqsw9kyg5ykaydrxy0fq7gz6ksuyqfnm",
   "chain_id":"nibiru-testnet-1",
   "rpc_url":"https://rpc.testnet-1.nibiru.fi",
   "rest_url":"https://lcd.testnet-1.nibiru.fi",
   "msgs":[
      {
         // VLP address
         "contractAddress":"nibi1x7xu453v3vjq2ve65j66mtju7jsg93qzw55sktr7lvyl6gw7kuks4g0qem",
         "msg":{
            "send":{
               "amount":"1000000000",
               "contract":"nibi1rwrwsyny3ew703ru0k2tgscwktrqsw9kyg5ykaydrxy0fq7gz6ksuyqfnm",
               "msg":"eyJyZW1vdmVfbGlxdWlkaXR5Ijp7ImNyb3NzX2NoYWluX2FkZHJlc3NlcyI6W10sImxwX2FsbG9jYXRpb24iOiIxMDAwMDAwMDAwIiwicGFpciI6eyJ0b2tlbl8xIjoiZnVuZGVub20iLCJ0b2tlbl8yIjoibmliaSJ9LCJ0aW1lb3V0IjpudWxsfX0="
            }
         },
         "funds":[
            
         ]
      }
   ]
}
```
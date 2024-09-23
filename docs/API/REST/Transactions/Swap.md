---
sidebar_position: 1 
---
import Tabs from '@site/src/components/Tabs';

# Swap Request

Generates a transaction for a swap request.

### Request URL
 
```bash
https://testnet.api.euclidprotocol.com/api/v1/execute/swap
```
### Curl
```bash
curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/swap' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "amount_in":"1000000000",
  "asset_in": {
    "token": "usdt",
    "token_type": {
      "native": {
        "denom": "uusdta"
      }
    }
  },
  "asset_out": "osmo",
  "cross_chain_addresses": [],
  "min_amount_out": "1",
 "partner_fee":null,
  "sender": {
    "address": "wasm14hcxlnwlqtq75ttaxf674vk6mafspg8xv03ktg",
    "chain_uid": "nibiru"
  },
  "swaps":["usdt","osmo"],
  "timeout":null
}'
```
### Parameters

| Field                   | Type                            | Description                                                                                                               |
|-------------------------|---------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| `asset_in`              | [`TokenWithDenom`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#tokenwithdenom)               | The token being swapped in.                                                                                               |
| `asset_out`             | [`Token`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#token)                         | The token being swapped out.                                                                                              |
| `amount_in`             | `Uint128`                       | Amount of the input asset.                                                                                                |
| `min_amount_out`        | `Uint128`                       | Minimum amount of the output asset for the swap to be considered a success.                                               |
| `timeout`               | `Option<u64>`                   | Optional duration in seconds after which the message will be timed out. Can be set to a minimum of 30 seconds and a maximum of 240 seconds. Defaults to 60 seconds if not specified.|
| `swaps`                 | `Vec<String>`             | The different swaps to get from asset_in to asset_out. This could be a direct swap or multiple swaps. For example, if swapping from token A to B, the swaps can be A -> B directly, or A -> C then C-> D then D->B. Usually the most efficient route is used. |
| `cross_chain_addresses` | [`Vec<CrossChainUserWithLimit>`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#crosschainuserwithlimit)  | A set of addresses to specify where the asset_out should be released. The first element specified in the vector has highest priority and so on. |
| `partner_fee`           | [`Option<PartnerFee>`](#partnerfee)            | Optional partner fee information for swaps.                                                                     |
| `sender`           | [`CrossChainUser`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#crosschainuser)  | The address performing the swap request.                                                       |

### PartnerFee
<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub struct PartnerFee {
    // The percentage of the fee for platform 
    pub partner_fee_bps: u64,
    // The address to receive the fee.
    pub recipient: String,
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
partner_fee": {
    "partner_fee_bps": 50,
    "recipent": "nibi1..."
  },
`
}
]} />
```
### Example Response

```json
{
  "sender": {
    "chain_uid": "nibiru",
    "address": "wasm14hcxlnwlqtq75ttaxf674vk6mafspg8xv03ktg"
  },
  "contract": "wasm1fahenpmk3t0qyzdx77zqu0ah9kluv88hmf68fx5u56gh9927juxsz94c2n",
  "chain_id": "localpoola-1",
  "rpc_url": "http://rpc.url",
  "rest_url": "http://rest.url",
  "msgs": [
    {
      "contractAddress": "wasm1fahenpmk3t0qyzdx77zqu0ah9kluv88hmf68fx5u56gh9927juxsz94c2n",
      "msg": {
        "execute_swap_request": {
          "amount_in": "1000000000",
          "asset_in": {
            "token": "usdt",
            "token_type": {
              "native": {
                "denom": "uusdta"
              }
            }
          },
          "asset_out": "osmo",
          "cross_chain_addresses": [],
          "min_amount_out": "1",
          "partner_fee": null,
          "swaps": [
            {
              "token_in": "usdt",
              "token_out": "osmo"
            }
          ],
          "timeout": null
        }
      },
      "funds": [
        {
          "denom": "uusdta",
          "amount": "1000000000"
        }
      ]
    }
  ]
}
```
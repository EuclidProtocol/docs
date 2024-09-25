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
    "token": "fundenom",
    "token_type": {
      "smart": {
        "contract_address": "nibi1g9m9q9tntaejyu4sgy8n6uuqzeplwmeafzakx0y0kwh3xwu2hagsujjh5n"
      }
    }
  },
  "asset_out": "osmo",
  "cross_chain_addresses": [],
  "min_amount_out": "1",
 "partner_fee":null,
  "sender": {
    "address": "nibi14hcxlnwlqtq75ttaxf674vk6mafspg8x3ky6ts",
    "chain_uid": "nibiru"
  },
  "swaps":["fundenom","osmo"],
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
   "sender":{
      "chain_uid":"nibiru",
      "address":"nibi14hcxlnwlqtq75ttaxf674vk6mafspg8x3ky6ts"
   },
   //factory address
   "contract":"nibi1rwrwsyny3ew703ru0k2tgscwktrqsw9kyg5ykaydrxy0fq7gz6ksuyqfnm",
   "chain_id":"nibiru-testnet-1",
   "rpc_url":"https://rpc.testnet-1.nibiru.fi",
   "rest_url":"https://lcd.testnet-1.nibiru.fi",
   "msgs":[
      {
         // smart token address
         "contractAddress":"nibi1g9m9q9tntaejyu4sgy8n6uuqzeplwmeafzakx0y0kwh3xwu2hagsujjh5n",
         "msg":{
            "send":{
               "amount":"1000000000",
               "contract":"nibi1rwrwsyny3ew703ru0k2tgscwktrqsw9kyg5ykaydrxy0fq7gz6ksuyqfnm",
               "msg":"eyJzd2FwIjp7ImFzc2V0X2luIjp7InRva2VuIjoiZnVuZGVub20iLCJ0b2tlbl90eXBlIjp7InNtYXJ0Ijp7ImNvbnRyYWN0X2FkZHJlc3MiOiJuaWJpMWc5bTlxOXRudGFlanl1NHNneThuNnV1cXplcGx3bWVhZnpha3gweTBrd2gzeHd1MmhhZ3N1ampoNW4ifX19LCJhc3NldF9vdXQiOiJvc21vIiwiY3Jvc3NfY2hhaW5fYWRkcmVzc2VzIjpbXSwibWluX2Ftb3VudF9vdXQiOiIxIiwicGFydG5lcl9mZWUiOm51bGwsInN3YXBzIjpbeyJ0b2tlbl9pbiI6ImZ1bmRlbm9tIiwidG9rZW5fb3V0Ijoib3NtbyJ9XSwidGltZW91dCI6bnVsbH19"
            }
         },
         "funds":[]
      }
   ]
}
```
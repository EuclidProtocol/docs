---
sidebar_position: 2
---

# Simulate Swap

Simulates a swap given the swap parameters.

### Request URL
 
```bash
https://testnet.api.euclidprotocol.com/api/v1/simulate-swap
```
### Curl
```bash
curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/simulate-swap' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "amount_in": "10",
  "asset_in": "fundenom",
  "asset_out": "nibi",
  "contract": "nibi1vndyr364cmexy3qq8zx4x2v757purq4flt9mj4qe3z2s2wn29v5sdfc830",
  "min_amount_out": "1",
  "swaps": ["fundenom","nibi"]
}'
```
### Parameters

### Swap Transaction Details

| Field            | Type    | Description                                          |
|------------------|---------|------------------------------------------------------|
| `amount_in`      | String  | The amount of the asset being swapped in.              |
| `asset_in`       | String  | The Id of the input asset.                   |
| `asset_out`      | String  | The Id of the output asset.                  |
| `contract`       | String  | The address of the router contract.              |
| `min_amount_out` | String  | The minimum amount of the output asset for the swap to be considered a success.     |
| `swaps`          | Array   | A list of swaps to execute to get from asset_in to asset_out.|

### Example Response

```json
{
   "amount_out":"1232",
   "asset_out":"nibi"
}
```
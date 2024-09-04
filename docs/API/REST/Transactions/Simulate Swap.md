---
sidebar_position: 2
---

# Simulate Swap

Simulates a swap given the swap parameters.

### Request URL
 
```bash
https://api.euclidprotocol.com/api/v1/simulate-swap
```
### Curl
```bash
curl -X 'POST' \
  'https://api.euclidprotocol.com/api/v1/simulate-swap' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "amount_in": "10",
  "asset_in": "usdt",
  "asset_out": "nibi",
  "contract": "nibi1nsvx0s8kj2jn0smcrz4t0wga9dtrjkvsfd24ay5jrkw3jgrhjmeq8suvmz",
  "min_amount_out": "1",
  "swaps": ["usdt","nibi"]
  
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
 {"data":{"amount_out":"10","asset_out":"nibi"}}
```
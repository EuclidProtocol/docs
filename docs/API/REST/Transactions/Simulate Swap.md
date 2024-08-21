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
  "asset_out": "osmo",
  "contract": "wasm1xfvv67yrnrxdk3tkjlv772wcw5jukae5x233az9k3nf26lhxwu7sv62245",
  "min_amount_out": "1",
  "swaps": ["usdt","osmo"]
  
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
 {"data":{"amount_out":"10","asset_out":"osmo"}}
```
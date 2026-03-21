---
sidebar_position: 2
---

# Simulate Swap

Simulates a swap given the swap parameters.

### Request URL

**Method:** `POST`
 
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
  "amount_in": "100000000",
  "asset_in": "usdc",
  "asset_out": "eth",
  "contract": "euclid1yvgh8xeju5dyr0zxlkvq09htvhjj20fncp5g58np4u25g8rkpgjsy5hngy",
  "min_amount_out": "1",
  "swaps": ["usdc","eth"]
}'
```
### Parameters

### Swap Transaction Details

| Field            | Type    | Description                                          |
|------------------|---------|------------------------------------------------------|
| `amount_in`      | String  | The amount of the asset being swapped in, in micro denoms.              |
| `asset_in`       | String  | The Id of the input asset.                   |
| `asset_out`      | String  | The Id of the output asset.                  |
| `contract`       | String  | The address of the router contract.              |
| `min_amount_out` | String  | The minimum amount of the output asset for the swap to be considered a success, in micro denoms.     |
| `swaps`          | Array   | A list of swaps to execute to get from asset_in to asset_out. This is derived from the [Routes query](../Routes/Get%20Routes.md).|

### Example Response

```json
{"id":"","amount_out":"45377330596656764","asset_out":"eth"}
```

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
  "amount_in": "1000000000000000000",
  "asset_in": "stt",
  "asset_out": "bnb",
  "contract": "euclid1ywzqwvhmm58e02lvr579xlcn873kptl40a4teqnjd8t8kndfps7qdghdaq",
  "min_amount_out": "1",
  "swaps": ["stt","euclid","bnb"]
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
{"amount_out":"57810274463639","asset_out":"bnb"}
```

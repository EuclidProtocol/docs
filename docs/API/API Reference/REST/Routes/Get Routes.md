---
sidebar_position: 1
---

# Get Routes 

Gets all swap routes available when swapping the specified `token_in` to receive the specified `token_out`.

<details>
<summary><strong>Related Queries</strong></summary>

- [All Tokens](/docs/API/API%20Reference/GQL/Router/All%20Tokens): Use this query to fetch valid token IDs for `token_in` and `token_out`.
- [All Chains](/docs/API/API%20Reference/GQL/Router/All%20Chains): Use this query to fetch valid chain UIDs when populating `chain_uids`.

</details>

### Request URL

**Method:** `POST`

```bash
https://api.euclidprotocol.com/api/v1/routes
```
### Curl
```bash
curl -X 'POST' \
  'https://api.euclidprotocol.com/api/v1/routes' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "token_in": "usdc",
    "token_out": "eth",
    "amount_in": "100000000",
    "chain_uids": []
}'
```

### Parameters

| Parameter        | Type     | Description                                                                 |
|--------------|----------|-----------------------------------------------------------------------------|
| `amount_in`  | String   | The amount of tokens being swapped in.                                      |
| `token_in`   | String   | The identifier of the token being swapped in.                               |
| `token_out`  | String   | The identifier of the token desired to receive.                             |
| `external`   | Boolean  | Optional. If true, includes routes that may involve external Dexes.        |
| `chain_uids` | Array    | Optional list of specific chain UIDs to restrict routing paths.             |

### Example Response

```json
{
  "paths": [
    {
      "path": [
        {
          "route": [
            "usdc",
            "eth"
          ],
          "dex": "euclid",
          "amount_in": "100000000",
          "amount_out": "45377330596656768",
          "chain_uid": "vsl",
          "amount_out_for_hops": [
            "eth: 45377330596656768"
          ]
        }
      ],
      "total_price_impact": "10.58"
    }
  ]
}
```

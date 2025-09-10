---
sidebar_position: 1
---

# Get Routes 

Gets all swap routes available when swapping the specified `token_in` to receive the specified `token_out`.

### Request URL

```bash
https://testnet.api.euclidprotocol.com/api/v1/routes
```
### Curl
```bash
curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/routes' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "external": true,
    "token_in": "euclid",
    "token_out": "0g",
    "amount_in": "1000000",
    "chain_uids": []
}'


```
| Parameter        | Type     | Required | Description                                                                 |
|--------------|----------|----------|-----------------------------------------------------------------------------|
| `amount_in`  | String   | Yes      | The amount of tokens being swapped in.                                      |
| `token_in`   | String   | Yes      | The identifier of the token being swapped in.                               |
| `token_out`  | String   | Yes      | The identifier of the token desired to receive.                             |
| `external`   | Boolean  | No       | If true, includes routes that may involve external chains.                  |
| `chain_uids` | Array    | No       | Optional list of specific chain UIDs to restrict routing paths.             |

### Example Response

```json
{
  "paths": [
    {
      "path": [
        {
          "route": [
            "euclid",
            "0g"
          ],
          "dex": "euclid",
          "amount_in": "1000000",
          "amount_out": "47039472846823928",
          "chain_uid": "vsl",
          "amount_out_for_hops": [
            "0g: 47039472846823928"
          ]
        }
      ],
      "total_price_impact": "0.76"
    },
    {
      "path": [
        {
          "route": [
            "euclid",
            "gimo",
            "0g"
          ],
          "dex": "euclid",
          "amount_in": "1000000",
          "amount_out": "47196320447745512",
          "chain_uid": "vsl",
          "amount_out_for_hops": [
            "gimo: 992618817702689792",
            "0g: 47196320447745512"
          ]
        }
      ],
      "total_price_impact": "0.43"
    }
  ]
}
```
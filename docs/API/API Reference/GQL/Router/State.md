---
sidebar_position: 7
---
# State
Queries state information for the router.

```graphql
query State {
  router {
    state {
      id
      admin
      constant_product_vlp_code_id
      stable_vlp_code_id
      virtual_balance_address
      locked
    }
  }
}
```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.euclidprotocol.com/graphql' \
    --data '{"query":"query State {\n  router {\n    state {\n      id\n      admin\n      constant_product_vlp_code_id\n      stable_vlp_code_id\n      virtual_balance_address\n      locked\n    }\n  }\n}"}'

```

[Open in Playground](https://api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMooCGKCRwAOkkUXhDFXjfY4wM4VUcMujAJZhOQouTBxhScUKgQkvcqgD6AB2ZgYUFGoBuAGw1rFYBGtHyuKgEZHLx0%2BcvXBQg8LwoY5I2p2-qpQllJgeAjc3DaMRtAA1ghiHkQAvuIZSGkgADQgBuR4wuQOURggIGlAA)

### Example Response

```json
{
  "data": {
    "router": {
      "state": {
        "id": "ContractStateOfRouter:singleton",
        "admin": "euclid1z328t58xya5hw32a869n6hah33uaehw5zz9rj3",
        "constant_product_vlp_code_id": 8,
        "stable_vlp_code_id": 9,
        "virtual_balance_address": "euclid1zwv6feuzhy6a9wekh96cd57lsarmqlwxdypdsplw6zhfncqw6ftqw54q5a",
        "locked": false
      }
    }
  }
}
```


### Return Fields

| **Field**                  | **Type**   | **Description**                                             |
|------------------------|--------|---------------------------------------------------------|
| `id`                     | `String` | The singleton identifier for the router state object.    |
| `admin`                  | `String` | The admin address of the router.                        |
| `constant_product_vlp_code_id` | `Int` | The code ID used for constant product VLP deployments. |
| `stable_vlp_code_id`     | `Int`    | The code ID used for stable VLP deployments.            |
| `virtual_balance_address` | `String` | The address of the VBalance contract.                   |
| `locked`                 | `Boolean` | Whether the router is currently locked.                 |

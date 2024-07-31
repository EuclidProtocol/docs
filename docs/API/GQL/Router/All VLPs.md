---
sidebar_position: 5
---
## All VLPs

Queries all the VLP contract addresses and specifies the tokens for each.

```graphql
query Router {
  router {
    all_vlps {
      vlps {
        vlp
        token_1
        token_2
      }
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/graphql' \
    --data '{"query":"query Router {\n  router {\n    all_vlps {\n      vlps {\n        vlp\n        token_1\n        token_2\n      }\n    }\n  }\n}"}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAEoQwr5HAA6SRRe5le1dDDAhgDbcD6AN24AHAM5t6HBkLESpUme3kMUEANbI%2BARiXLVGpHwBMujgF9TFyVbMgANCAGc8AS04AjbglEYQIM0A)

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| vlps                   | [VLPInfo](#vlpinfo) | The VLP information within the router contract.         |

### VLPInfo

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| vlp                    | String | The VLP contract address.                                     |
| token_1                | String | The identifier of the first token in the pair.          |
| token_2                | String | The identifier of the second token in the pair.         |
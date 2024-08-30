---
sidebar_position: 7
---
# State
Queries state information for the router.

```graphql
query Router {
  router {
    state {
      admin
      vlp_code_id
      vcoin_address
    }
  }
}
```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.euclidprotocol.com/graphql' \
    --data '{"query":"query Router {\n  router {\n    state {\n      admin\n      vlp_code_id\n      vcoin_address\n    }\n  }\n}"}'

```

[Open in Playground](https://api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAEoQwr5HAA6SRRe5le1dDDAzigIaVv0ODHmDgBLJOyFEAbgBsADgH0oEMAiViwUoTNUSlIsHgSdOOogF8p1pJZAAaEDJ54xPAEZzTGECEtAA)


### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| admin                  | String | The admin address of the router.                        |
| vlp_code_id            | Int    | The code ID of the VLP.                                 |
| vcoin_address          | String | The address of the VBalance contract.                      |
---
sidebar_position: 7
---
# State
Queries state information for the router.

```graphql
query State {
  router {
    state {
      admin
      vlp_code_id
      virtual_balance_address
    }
  }
}
```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query State {\n  router {\n    state {\n      admin\n      vlp_code_id\n      virtual_balance_address\n    }\n  }\n}","variables":{}}'

```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMooCGKCRwAOkkUXhDFXjfY4wM4VUcMujcmDgBLJJyFEAbgBsADgH0oEMAiViwUoTLF4UMcnKUAjY%2BSRQNIsHgTduOogF8pbpC5AAaEDPJ4YuSmcg4YICAuQA)


### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| admin                  | String | The admin address of the router.                        |
| vlp_code_id            | Int    | The code ID of the VLP.                                 |
| virtual_balance_address| String | The address of the VBalance contract.         |
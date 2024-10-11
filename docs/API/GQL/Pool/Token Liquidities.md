---
sidebar_position: 2
---

# Token Liquidities

Queries the total amount of liquidity available for tokens.

```graphql
query Token_liquidities($page: Int!, $limit: Int!) {
  pool {
    token_liquidities(page: $page, limit: $limit) {
      token
      total_liquidity
      total_volume
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Token_liquidities($page: Int!, $limit: Int!) {\n  pool {\n    token_liquidities(page: $page, limit: $limit) {\n      token\n      total_liquidity\n      total_volume\n    }\n  }\n}","variables":{"page":1,"limit":5}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACoQDWyA%2BgDYCWOdYdKdCAzgBQAkADgIYBzBOiIBJVAEIANEW704LURJSSAlEWAAdJESK8IEGpp169KCtXqNmrDpwHDRfIQlkKlcjyg3bdZ80skUwCiCxR%2BGloGGCYWAhCA8MiqADcjeAREogBfELykHJBpEFT%2BPDp%2BACMaDgwQPz0tEEcsjCIARmkQ5u9m0QBWHSKcoA)

### Arguments

- **page** (Int!): The page number to start from. Used for pagination.
- **limit** (Int!): The number of items per page.

### Return Fields

| **Field**            | **Type**   | **Description**                       |
|------------------|--------|-----------------------------------|
| `token`            | `String` | The token symbol or identifier.   |
| `total_liquidity`  | `Float`  | The total liquidity of the token. |



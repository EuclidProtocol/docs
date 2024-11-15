---
sidebar_position: 2
---

# Token Liquidities

Queries the total amount of liquidity available for tokens.

```graphql
query Token_liquidities($page: Int!, $limit: Int!) {
  token {
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
    --data '{"query":"query Token_liquidities($page: Int!, $limit: Int!) {\n  token {\n    token_liquidities(page: $page, limit: $limit) {\n      token\n      total_liquidity\n      total_volume\n    }\n  }\n}","variables":{"page":1,"limit":5}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACoQDWyA%2BgDYCWOdYdKdCAzgBQAkADgIYBzBOiIBJVAEIANEW704LURJSSAlEWAAdJESIoKyTTr16DlJLQYwmLNlwHDRfIQlkKlcjyg3bdps0MkEwD9CBR%2BGitGZhQCEICDCKiANwgaeAQEogBfELykHJBpEBT%2BPDp%2BACMaDgwQPz0tEEcsjCIARmkQ5u9m0QBWbsKQHKA)

### Arguments

- **page** (Int!): The page number to start from. Used for pagination.
- **limit** (Int!): The number of items per page.

### Return Fields

| **Field**            | **Type**   | **Description**                       |
|------------------|--------|-----------------------------------|
| `token`            | `String` | The token symbol or identifier.   |
| `total_liquidity`  | `String`  | The total liquidity of the token. |
| `total_volume`  | `String`  | The total trading volume for the token.|




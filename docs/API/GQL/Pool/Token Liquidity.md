---
sidebar_position: 1
---

# Token Liquidity

Queries the total amount of liquidity available for the specified token.

```graphql
query Token_liquidity($token: String!) {
  pool {
    token_liquidity(token: $token) {
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
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Token_liquidity($token: String!) {\n  pool {\n    token_liquidity(token: $token) {\n      token\n      total_liquidity\n    }\n  }\n}","variables":{"token":"osmo"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACoQDWyA%2BgDYCWOdYdKBAFACQoXLpEDKKPHSQBzAIQBKIsAA6SIkQAOECDRnzFi7pSS0GMJi3Y7eRLjyTS5Crdsua7RbigCGNfY2atHigL6OAUh%2BIAA0IABursKuAEY0CADOGCA2irIgpkgZfBkQiXAQGfIhfkA)

### Arguments

- **token**: The token Id of the token to get the liquidity amount for.


### Return Fields

| **Field**            | **Type**   | **Description**                       |
|------------------|--------|-----------------------------------|
| `token`            | `String` | The token Id.   |
| `total_liquidity`  | `String`  | The total liquidity of the token. |
| `total_volume`  | `String`  | The total volume for the token. |



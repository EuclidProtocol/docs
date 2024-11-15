---
sidebar_position: 1
---

# Token Liquidity

Queries the total amount of liquidity available for the specified token.

```graphql
query Token_liquidity($token: String!) {
  token {
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
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Token_liquidity($token: String!) {\n  token {\n    token_liquidity(token: $token) {\n      token\n      total_liquidity\n      total_volume\n    }\n  }\n}","variables":{"token":"usdt"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACoQDWyA%2BgDYCWOdYdKBAFACQoXLpEDKKPHSQBzAIQBKIsAA6SIkW6UFchYqU8ktBjCYt2y3kS5bpajRqNJ5lxdxQBDGjsbNWtuw%2BdUAbhBp4BE9FAF9PcKRQkAAaEF9HYUcAIxoEAGcMEAsiWRBrPL48mHSwFDyY%2BWjQoA)

### Arguments

- **token**: The token Id of the token to get the liquidity amount for.


### Return Fields

| **Field**            | **Type**   | **Description**                       |
|------------------|--------|-----------------------------------|
| `token`            | `String` | The token Id.   |
| `total_liquidity`  | `String`  | The total liquidity of the token. |
| `total_volume`  | `String`  | The total trading volume for the token. |



---
sidebar_position: 1
---

# Token Liquidity

Queries the total amount of liquidity available for the specified token.

```graphql
query Pool($token: String!) {
  pool {
    token_liquidity(token: $token) {
      token
      total_liquidity
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Pool($token: String!) {\n  pool {\n    token_liquidity(token: $token) {\n      token\n      total_liquidity\n    }\n  }\n}","variables":{"token":"usdt"}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAAoQQA2AFACQoQDWy6RAyingJZIDmAhAEoiwADpIiRAA7kKwsRIn0mSAPoVOOTmE4oCVJcyJ1GyIaPELFJpPMtF6KAIYU1GmFp0FbEgL62-SD4gADQgAG6OXI4ARhQIAM4YIOYSIiAGNhhEaTDxYChpYkE%2BQA)

### Arguments

- **token**: The token Id of the token to get the liquidity amount for.


### Return Fields

| Field            | Type   | Description                       |
|------------------|--------|-----------------------------------|
| token            | String | The token symbol or identifier.   |
| total_liquidity  | Float  | The total liquidity of the token. |



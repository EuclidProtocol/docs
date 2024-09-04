---
sidebar_position: 2
---

# Token Liquidities

Queries the total amount of liquidity available for tokens.

```graphql
query Pool($page: Int!, $limit: Int!) {
  pool {
    token_liquidities(page: $page, limit: $limit) {
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
    --url 'https://api.euclidprotocol.com/graphql' \
    --data '{"query":"query Pool($page: Int!, $limit: Int!) {\n  pool {\n    token_liquidities(page: $page, limit: $limit) {\n      token\n      total_liquidity\n    }\n  }\n}","variables":{"page":1,"limit":10}}'
```

[Open in Playground](https://api.euclidprotocol.com?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAAoQQA2AFACQAOAhgOYLpECSqAhADRE0UAlnEEo2nFFwCURYAB0kRInXIVZCpUpQQA1sgD6QnILCjBCAM5VGLNvWYI%2BQkWP7PRM%2BYs1bdyDT5E2igMFIaCxqYoBAFKAL4BCUhxIDwgAG4MeIIMAEYUlhggXkpyIDYIZWwAjDwBZe4oVUTVAAx1ySBxQA)

### Arguments

- page (Int!): The page number to start from. Used for pagination.
- limit (Int!): The number of items per page.

### Return Fields

| Field            | Type   | Description                       |
|------------------|--------|-----------------------------------|
| token            | String | The token symbol or identifier.   |
| total_liquidity  | Float  | The total liquidity of the token. |



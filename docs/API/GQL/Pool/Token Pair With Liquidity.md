---
sidebar_position: 1
---

# Token Pair With Liquidity

Queries all the token pair pools, their VLP address, liquidity amount, and APR (Annual Percentage Rate).

```graphql
query Token_pair_with_liquidity {
  pool {
    token_pair_with_liquidity {
      pair {
        token_1
        token_2
      }
      vlp
      total_liquidity
      apr
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Token_pair_with_liquidity {\n  pool {\n    token_pair_with_liquidity {\n      pair {\n        token_1\n        token_2\n      }\n      vlp\n      total_liquidity\n      apr\n    }\n  }\n}","variables":{}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACoQDWyA%2BgA4CGAlnlQO4MoAWVANgzg2HbFgAHSREiNCBG5FR4iURQVq9Jq3Zde-QSmFjFitXjkHDi5ZSRUAjGfNKV1gEz3FAXzcSAbtxpfHFDpuHj4YASEAuho8N08FePcQABoQbzo8BjoAI24EAGcMEHkJERAoCFQ8OigUMvQiMqQGbIYbGgJ852cAKwQ4ADZubud8gA8OBDGEAHYwOABzBZQALwAOMfI4DjgAFgBOGhmVgGYWHoW8KDByE5RdgY4F-LyABjW1uDLkszKwZAgXwwjRA%2BSCeHy3zESXcQA)


### Return Fields

| **Field**        | **Type**   | **Description**                         |
|------------------|------------|-----------------------------------------|
| `token_1`        | `String`   | The first token in the pool.            |
| `token_2`        | `String`   | The second token in the pool.           |
| `vlp`            | `String`   | The contract address for the VLP that hosts this pool. |
| `total_liquidity`| `String`   | The total liquidity for the token pair. |
| `apr`            | `String`   | The annual percentage rate for providing liquidity to the pair.|



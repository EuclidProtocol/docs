---
sidebar_position: 1
---

# Token Pair With Liquidity

Queries all the token pair pools, their VLP address, liquidity amount, and APR (Annual Percentage Rate). Can specify a token Id as argument to only fetch pools containing that token.

```graphql
query Token_pair_with_liquidity($token: String, $limit: Int, $offset: Int) {
  pool {
    token_pair_with_liquidity(token: $token, limit: $limit, offset: $offset) {
      results {
        pair {
          token_1
          token_2
        }
        vlp
        total_liquidity
        apr
      }
      pagination {
        total_count
        limit
        offset
      }
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Token_pair_with_liquidity($token: String, $limit: Int, $offset: Int) {\n  pool {\n    token_pair_with_liquidity(token: $token, limit: $limit, offset: $offset) {\n      results {\n        pair {\n          token_1\n          token_2\n        }\n        vlp\n        total_liquidity\n        apr\n      }\n      pagination {\n        total_count\n        limit\n        offset\n      }\n    }\n  }\n}","variables":{"token":"euclid"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACoQDWyA%2BgA4CGAlnlQO4MoAWVANgzg2HYEAFABIUFZOiIBlFHgZIA5gBoio3nHbSAkqjWiIAMyMBnBCl2oAlEWAAdJESI0IEbncfPnEyklqMzGycPHwwAkLCvlLq0UhqmtrqiShqxmYW0oYm5ii2Dk7ezngIpjDcKKaehUXO9EzVtbVxVACMXk3eLQBMHU0Avn21AG7cNENFEih03KH8gigEE950NHjLgzXe9EqKdCgMEE4FnURTM1RQEDCoy84pd0TpuRtDm86b-SAqIMN0CnQAEbcUoYEAnIj2EBxKHoKEIGBQXhgKEqRxffpAA)

### Arguments

- **token** (String): The token Id of the token to get pools for.
- **limit** (Int): Optional limit to the number of results to return.
- **offset** (Int): Optional number of pools to skip before starting to return the result set. Used for pagination.

### Return Fields

| **Field**        | **Type**   | **Description**                         |
|------------------|------------|-----------------------------------------|
| `token_1`        | `String`   | The first token in the pool.            |
| `token_2`        | `String`   | The second token in the pool.           |
| `vlp`            | `String`   | The contract address for the VLP that hosts this pool. |
| `total_liquidity`| `String`   | The total liquidity for the token pair. |
| `apr`            | `String`   | The annual percentage rate for providing liquidity to the pair.|
| `total_count` | `Int`    | The total number of results available.      |
| `limit`       | `Int`    | The maximum number of results returned per query request. |
| `offset`      | `Int`    | The number of results to skip before starting to return the result set. |



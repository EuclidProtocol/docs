---
sidebar_position: 1
---

# Token Pair With Liquidity

Queries all the token pair pools, their VLP address, liquidity amount, and APR (Annual Percentage Rate). You can filter by a token ID, verified pools, and sort the results.

```graphql
query Token_pair_with_liquidity($token: String, $limit: Int, $offset: Int, $onlyShowVerified: Boolean, $sortBy: TokenPairSortBy, $sortOrder: SortOrder) {
  pool {
    token_pair_with_liquidity(token: $token, limit: $limit, offset: $offset, only_show_verified: $onlyShowVerified, sort_by: $sortBy, sort_order: $sortOrder) {
      pagination {
        total_count
        limit
        offset
      }
      results {
        pair {
          token_1
          token_2
        }
        vlp
        total_liquidity
        apr
        tags
        created_at
      }
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.euclidprotocol.com/graphql' \
    --data '{"query":"query Token_pair_with_liquidity($token: String, $limit: Int, $offset: Int, $onlyShowVerified: Boolean, $sortBy: TokenPairSortBy, $sortOrder: SortOrder) {\n  pool {\n    token_pair_with_liquidity(token: $token, limit: $limit, offset: $offset, only_show_verified: $onlyShowVerified, sort_by: $sortBy, sort_order: $sortOrder) {\n      pagination {\n        total_count\n        limit\n        offset\n      }\n      results {\n        pair {\n          token_1\n          token_2\n        }\n        vlp\n        total_liquidity\n        apr\n        tags\n        created_at\n      }\n    }\n  }\n}","variables":{"token":"euclid","limit":3,"offset":1,"onlyShowVerified":true,"sortBy":"CREATED_AT","sortOrder":"DESC"}}'
```

[Open in Playground](https://api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACoQDWyA%2BgA4CGAlnlQO4MoAWVANgzg2HYEAFABIUFZOiIBlFHgZIA5gBoio3nHbSAkqjWiIAMyMBnBCl371EJNwIyOEFgDV8DIwwRhpAIQgQ3Ah0SAamEHgovgTSZJRIAAqMeDIRUQRhaQDyeGD40qmROXl4AJREwAA6SERENAHcFdW1tRLxtMms7Fy8-IIoIm1S6kOhRJra6hMoasZmFtKGJuYzRLb2VKZOLFQAbu6e3ovrDttuCodgauGRVABGMeo36ddpVBEli8-F%2BOVVNS1avQlIo6CgGLYmgDAa0ICg6NwqFAIDBUM0YbVpuiMXMVtiWgBffG1PAIUwwbgoUxQjFA5I02mw9oARmJMNGVAATGzakToTDdtwaDyiBJ4YjejABEIRXQaHgRfClKYRVBSWDvFQwWy%2BYDdUQ%2BQSQCoQLs6Ao6HcgqYMCB-rVKiBRo7pI6EDAoLwwI6VOjHViMEQAMy%2BgGO3EWF1EZmhh0gE6OZznDxeb2B%2BS4WNER3PaIux0AYQASgBRACCJBLABEqBWfX6QN9cvgo46qyWZAXHdUjQSgA)

| **Argument**         | **Type**              | **Description**                                                                 |
|----------------------|-----------------------|---------------------------------------------------------------------------------|
| `token`              | `String`              | The token ID to filter pools by (optional).                                    |
| `limit`              | `Int`                 | Limit the number of results returned (optional).                               |
| `offset`             | `Int`                 | Number of pools to skip before starting to return results (for pagination).    |
| `onlyShowVerified`   | `Boolean`             | If true, only return verified pools.                                           |
| `sortBy`             | `TokenPairSortBy`     | Field to sort results by. Allowed values: `TOTAL_LIQUIDITY` or `CREATED_AT`.                  |
| `sortOrder`          | `SortOrder`           | Order of sorting: `ASC` or `DESC`.                                             |

### Return Fields

| **Field**            | **Type**     | **Description**                                                             |
|----------------------|--------------|-----------------------------------------------------------------------------|
| `pair.token_1`       | `String`     | The first token in the pool.                                                |
| `pair.token_2`       | `String`     | The second token in the pool.                                               |
| `vlp`                | `String`     | The VLP contract address that hosts this pool.                              |
| `total_liquidity`    | `String`     | The total liquidity of the pool.                                            |
| `apr`                | `String`     | The APR (Annual Percentage Rate) for providing liquidity to the pool.       |
| `tags`               | `[String]`   | Optional tags or labels associated with the pool.                           |
| `created_at`         | `String`     | Timestamp of when the pool was created.                                     |
| `pagination.total_count` | `Int`   | The total number of matching results across all pages.                      |
| `pagination.limit`       | `Int`   | The limit applied to this query.                                            |
| `pagination.offset`      | `Int`   | The offset applied to this query.                                           |


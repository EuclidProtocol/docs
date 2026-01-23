---
sidebar_position: 1
---

# Token Pair With Liquidity

Queries all the token pair pools, their VLP address, liquidity amount, and APR (Annual Percentage Rate). You can filter by a token ID, verified pools, and sort the results.

```graphql
query Token_pair_with_liquidity($token: String, $limit: Int, $offset: Int, $onlyShowVerified: Boolean, $sortBy: TokenPairSortBy, $sortOrder: SortOrder) {
  pool {
    token_pair_with_liquidity(token: $token, limit: $limit, offset: $offset, only_show_verified: $onlyShowVerified, sort_by: $sortBy, sort_order: $sortOrder) {
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
    --data '{"query":"query Token_pair_with_liquidity($limit: Int, $onlyShowVerified: Boolean, $sortOrder: SortOrder) {\n  pool {\n    token_pair_with_liquidity(limit: $limit, only_show_verified: $onlyShowVerified, sort_order: $sortOrder) {\n      results {\n        pair {\n          token_1\n          token_2\n        }\n        vlp\n        total_liquidity\n        apr\n        tags\n        created_at\n      }\n      pagination {\n        total_count\n        limit\n        offset\n      }\n    }\n  }\n}","variables":{"limit":"1000","onlyShowVerified":false,"sortOrder":"ASC"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACoQDWyA%2BgA4CGAlnlQO4MoAWVANgzg2HbFgAHSREiNCBG5FR4iURQVq9Jq3Zde-QSmFjFivAgDOMbihNyDhxWrzWFtxcspIqARhvOJr6gCZvWwBfIMMAN24aMJcIFDpuHj4YASEYiToaPHSlOgBzExyoYzoUBDAqUpjQpzt8hiRShghxeR8lOISqKAgYVBzeOHYciAAzUZMEFGqgmoka4JAAGhBwujwGOgAjblMMEDaiERBB4YwjkA8ABhvjpZtjlu4CAGUOCBYANXwGUYZy47oIijBKTe4KY4mCB4FAAeTwYHwgOOAEEXgBhY5iRbBIA)

| **Argument**         | **Type**              | **Description**                                                                 |
|----------------------|-----------------------|---------------------------------------------------------------------------------|
| `token`              | `String`              | The token ID to filter pools by (optional).                                    |
| `limit`              | `Int`                 | Limit the number of results returned (optional).                               |
| `offset`             | `Int`                 | Number of pools to skip before starting to return results (for pagination).    |
| `onlyShowVerified`   | `Boolean`             | If true, only return verified pools.                                           |
| `sortBy`             | `TokenPairSortBy`     | Field to sort the results by (e.g., `APR`, `Liquidity`, etc).                  |
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


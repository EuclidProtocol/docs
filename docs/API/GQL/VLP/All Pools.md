---
sidebar_position: 2
---
# All Pools
Queries all the LP reserves and shares on all the chains for the specified VLP.

```graphql
query All_pools($contract: String!, $limit: Int, $offset: Int) {
  vlp(contract: $contract) {
    all_pools(limit: $limit, offset: $offset) {
      pools {
        chain_uid
        pool {
          reserve_1
          reserve_2
          lp_shares
        }
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
    --data '{"query":"query Vlp($contract: String!, $limit: Int, $offset: Int) {\n  vlp(contract: $contract) {\n    all_pools(limit: $limit, offset: $offset) {\n      pools {\n        chain_uid\n        pool {\n          reserve_1\n          reserve_2\n          lp_shares\n        }\n      }\n      pagination {\n        total_count\n        limit\n        offset\n      }\n    }\n  }\n}","variables":{"contract":"nibi1ulj49aczcwsdk93mv0nar0c0k0ptqn9n3y6rqwaeslz5tlftlvcs5xvzxa","limit":null,"offset":null}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGoA2ADgBQAkUEqeAhlCukQMop4CWSA5gEIANERpkecHmyIBJVKJoQAZsoDOCGfJQBKIsAA6SIkQBulKvUYsZdBtxt7Dxk0SZkyAfQoQIZNVQSUrZB0qIq6prsSqoauvpGrq4%2BfmoJLkkmUAAWTHyeMDxgiZkmKWTppUl4CBp4pgieAIwlVUQ1dQ2eAEytVZSearkdfUkAvqNEExnJTPx8TCg8DJVVKBAo7p70MKiTJqEo%2B0QRcZPT4yXTYyDCIKZMvEwARmS1GCDOJgYgVg6sP3YPyQPGePCaMDIACsACwAThYAC8oAB3NRgADWcIAzHBTAAGJCPfFQfEY-EUFBYJBwpDYggANjwWBRTFqZERAFYUGRlDzTFA1JyAB6mRHCpg-YQlH6HQFEJCQsjSlw-U6aeWKjxGG5jIA)


### Arguments

- **contract** (String!): The contract address of the VLP.
- **limit** (Int): Optional limit to the number of results to return.
- **offset** (Int): Optional number of pools to skip before starting to return the result set. Used for pagination.

### Return Fields

| **Field**                  | **Type**   | **Description**                                             |
|------------------------|--------|---------------------------------------------------------|
| `chain_uid`   | `String` | The unique identifier (UID) of the chain.               |
| `pool`        | [`PoolInfo`](#poolinfo) | Detailed information about the pool.                   |
| `total_count` | `Int`    | The total number of token pairs (pools) available.      |
| `limit`       | `Int`    | The maximum number of pools returned per query request. |
| `offset`      | `Int`    | The number of pools to skip before starting to return the result set. |

### PoolInfo

| **Field**                  | **Type**   | **Description**                                             |
|------------------------|--------|---------------------------------------------------------|
| `reserve_1`              | `String` | The reserve amount of the first token.                  |
| `reserve_2`              | `String` | The reserve amount of the second token.                 |
| `lp_shares`              | `String` | The number of liquidity provider shares.                |


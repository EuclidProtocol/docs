---
sidebar_position: 2
---
# All Pools
Queries all the LP reserves and shares on all the chains for the specified VLP.

```graphql
query Vlp($contract: String, $pair: PairInput, $limit: Int, $offset: Int) {
  vlp(contract: $contract, pair: $pair) {
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
    --data '{"query":"query Vlp($contract: String!, $limit: Int, $offset: Int) {\n  vlp(contract: $contract) {\n    all_pools(limit: $limit, offset: $offset) {\n      pools {\n        chain_uid\n        pool {\n          reserve_1\n          reserve_2\n          lp_shares\n        }\n      }\n      pagination {\n        total_count\n        limit\n        offset\n      }\n    }\n  }\n}","variables":{"contract":"euclid12a4ecpxsz8pz75chryl6wda6fsnqdx8zgn4ykvp0u7v939m50tvswvnvw8","limit":null,"offset":null}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGoA2ADgBQAkUEqeAhlCukQMop4CWSA5gEIANERpkecHmyIBJVKJoQAZsoDOCGfJQBKIsAA6SIkQBulKvUYsZdBtxt7Dxk0SZkyAfQoQIZNVQSUrZB0qIq6prsSqoauvpGrq4%2BfmoJLkkmUAAWTHyeMDxgiZkmKWTppUl4CBp4pgieAIwlVUQ1dQ2eAEytVZSearkdfUkAvqNEExnJTPx8TCg8DJVVKBAo7p70MKiTJqEo%2B0QRcZPT4yXTYyDCIKZMvEwARmS1GCDOJgYgVg6sP3YPwQMCgEjATW6TAALAgoBQAB5qABeAA4KMiAOwAVhyhDIADYAO5gJgE9RILBgBGo5H8JDQggAa1MFAADDBMaYAJwAZm5cGxbJQpjURNMSFMRNRP2EJR%2Bh0BRCQMA8cpcP1OmiVKo8RhuYyAA)


### Arguments

| **Argument** | **Type**     | **Description**                                                                 |
|--------------|--------------|---------------------------------------------------------------------------------|
| `contract`   | `String`     | The contract address of the VLP. Required if `pair` is not provided.           |
| `pair`       | `PairInput`  | The token pair of the VLP. Required if `contract` is not provided.             |
| `limit`      | `Int`        | Limits the number of results returned.                                         |
| `offset`     | `Int`        | Number of results to skip (for pagination).                                    |

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


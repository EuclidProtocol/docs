---
sidebar_position: 1
---

# All Pools

Queries all pool information associated with a specified factory for a specific chain UID. It includes details about each pool, including the token pairs involved and their respective VLP address. 

```graphql
query All_pools($chainUid: String!, $limit: Int, $offset: Int) {
  factory(chain_uid: $chainUid) {
    all_pools(limit: $limit, offset: $offset) {
      pagination {
        total_count
        limit
        offset
      }
      pools {
        pair {
          token_1
          token_2
        }
        vlp
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
    --data '{"query":"query Factory($chainUid: String!, $limit: Int, $offset: Int) {\n  factory(chain_uid: $chainUid) {\n    all_pools(limit: $limit, offset: $offset) {\n      pools {\n        pair {\n          token_1\n          token_2\n        }\n        vlp\n      }\n      pagination {\n        total_count\n        limit\n        offset\n      }\n    }\n  }\n}","variables":{"chainUid":"stargaze","limit":7,"offset":null}}'
```
[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGICGUKEhAFACRQAWZAlkgKotjpEDKKeNgHMAhABoidADYs4LFDwCSqCXQgAzdQGcECospQBKIsAA6SIkXUUqtJqyQB9GFx4NmbTmGNmLlomRSUo4ADhAQUlo0MnJ60rLyEhraum7JOkYm5v7%2BYRFaWX45liGseIXFxVQA1siOAIzZlf41dQBMTZUAvp3FAG5SIb2WPUW5ZEJsZCgsEBa%2BzURUKIGOUBAwqMP%2BMfLblum626M5J0SjXSBiIH1kgmQARlIIWhggC0SmIPaeXF88Xy0KzwQjIAC8EF8xE0vrsUP8iAB2aF%2BL6HeEYIhIGBBcyXLpAA)

### Arguments

- **chainUid** (String!): The unique identifier of the chain.
- **limit** (Int): Optional limit to the number of results to return.
- **offset** (Int): Optional number of pools to skip before starting to return the result set. Used for pagination.

### Return Fields

| **Field**       | **Type**   | **Description**                             |
|-------------|--------|-----------------------------------------|
| `token_1`     | `String` | The first token in the pair.        |
| `token_2`     | `String` | The second token in the pair.       |
| `vlp`         | `String` | The contract address of the VLP for the pair.|
| `total_count` | `Int`    | The total number of token pairs (pools) available.      |
| `limit`       | `Int`    | The maximum number of pools returned per query request. |
| `offset`      | `Int`    | The number of pools to skip before starting to return the result set. |

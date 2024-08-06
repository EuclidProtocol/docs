---
sidebar_position: 1
---

# All Pools

Queries all pool information associated with a specified factory contract which is retrieved by a chain UID. It includes details about each pool, including the token pairs involved and their respective types. 

```graphql
query Factory($chainUid: String!) {
  factory(chain_uid: $chainUid) {
    all_pools {
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
    --url 'https://api.staging.euclidprotocol.com/graphql' \
    --data '{"query":"query Factory($chainUid: String!) {\n  factory(chain_uid: $chainUid) {\n    all_pools {\n      pools {\n        pair {\n          token_1\n          token_2\n        }\n        vlp\n      }\n    }\n  }\n}","variables":{"chainUid":"nibiru"}}'
```
[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGICGUKEhAFACRQAWZAlkgKotjpEDKKeNgHMAhAEoiwADpIiRAGYUqtJqyQB9GFx4NmbTmAnTZcomQA259QAcIEcwGdJM06dv2nx16%2Bus8zk29TKgBrZHUARhcg4IgwjQAmaKCAX2TvADdza3S5NMCifLyZFJAAGhAMskEyACNzBAcMEC8iKRBVfS52nnakFlqWPBh2kpAUoA)

### Arguments

- **chainUid** (String!): The unique identifier of the chain.

### Return Fields

| Field       | Type   | Description                             |
|-------------|--------|-----------------------------------------|
| pair        | [Pair](#pair) | Information about the token pairs.              |
| vlp         | String | The contract address of the VLP.                     |

### Pair

| Field       | Type   | Description                             |
|-------------|--------|-----------------------------------------|
| token_1     | String | The first token in the pair.        |
| token_2     | String | The second token in the pair.       |

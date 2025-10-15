---
sidebar_position: 1
---

# Pool 
Queries the LP reserves and shares for the specified VLP on the specified chain.

```graphql
query Vlp($contract: String, $pair: PairInput, $chainUid: String!) {
  vlp(contract: $contract, pair: $pair) {
    pool(chain_uid: $chainUid) {
      reserve_1
      reserve_2
      lp_shares
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Pool($chainUid: String!, $contract: String!) {\n  vlp(contract: $contract) {\n    pool(chain_uid: $chainUid) {\n      reserve_1\n      reserve_2\n      lp_shares\n    }\n  }\n}","variables":{"contract":"euclid1k463qf8vmdde9ynn42pahr0lgj09evc48q76gy93kg5wl8c2zthqhkcqae","chainUid":"stargaze"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAAoQQA2AFACRQAWAhgJZICqzY6RAyinqwDmAQgA0ROhFR5GUFNz4CkIgJRFgAHSREiANwoAHKlCn9Z8iSenm1m7TqIHy1BiyQB9GJ250mrDmC2Wg4OeAgAzvi6CO4AjMEhRGGReNHuAEwJIYbu4UzJWUQAvgklSEUgoiC6jAKMAEYUERggdjoaIFZmch3cHQgwUBScsQDWACwAbADMWABmABy6cGBgCACcBEhI4%2BkGjPR4AAwUggBWR%2BsIulDjC1gA7JOCBOvTo4IArADuFAtQ6QAXih6Fh6KMoFhGAgOqIEh1XP5OL0iB1EIJoSCOloKkUgA)

### Arguments

| **Argument**  | **Type**     | **Description**                                                                 |
|---------------|--------------|---------------------------------------------------------------------------------|
| `chainUid`    | `String!`    | The unique identifier of the chain that hosts the LP tokens.                   |
| `contract`    | `String`     | The contract address of the VLP. Required if `pair` is not provided.           |
| `pair`        | `PairInput`  | The token pair belonging to the VLP. Required if `contract` is not provided.   |

| **Field**                  | **Type**   | **Description**                                     |
|------------------------|--------|---------------------------------------------------------|
| `reserve_1`              | `String` | The reserve amount of the first token.                  |
| `reserve_2`              | `String` | The reserve amount of the second token.                 |
| `lp_shares`              | `String` | The number of liquidity provider shares.                |

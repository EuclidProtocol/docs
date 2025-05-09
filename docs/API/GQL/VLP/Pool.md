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
    --data '{"query":"query Pool($chainUid: String!, $contract: String!) {\n  vlp(contract: $contract) {\n    pool(chain_uid: $chainUid) {\n      reserve_1\n      reserve_2\n      lp_shares\n    }\n  }\n}","variables":{"contract":"nibi1pys22jem6l222sxhexe7dmggtz8xkmhm49p7z3wjgrcdk3t46hgsle088m","chainUid":"stargaze"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAAoQQA2AFACRQAWAhgJZICqzY6RAyinqwDmAQgA0ROhFR5GUFNz4CkIgJRFgAHSREiANwoAHKlCn9Z8iSenm1m7TqIHy1BiyQB9GJ250mrDmC2Wg4OeAgAzvi6CO4AjMEhRGGReNHuAEwJIYbu4UzJWUQAvgklSEUgoiC6jAKMAEYUERggdjoaIFZmch3cHUjM9cyxBgTh6ekAVghwAGwUE%2BnhAB70CMsIAOxgcIKCKABeABzLANZw9HAALACcBpsHAMwA7pOCeFBgp48oV7P0gnCTQADEcjnAOqIEh1XP5OL0iB1wihaoJGAcEB0tBUikA)

### Arguments

- **chainUid** (String!): The unique identifier of the chain that hosts the LP tokens.
- **contract** (String): The contract address of the VLP. The pair argument should be set if **contract** is not specified.
- **pair** (PairInput): The pair of tokens belonging to the VLP. The contract argument should be set if **pair** is not specified.

| **Field**                  | **Type**   | **Description**                                     |
|------------------------|--------|---------------------------------------------------------|
| `reserve_1`              | `String` | The reserve amount of the first token.                  |
| `reserve_2`              | `String` | The reserve amount of the second token.                 |
| `lp_shares`              | `String` | The number of liquidity provider shares.                |

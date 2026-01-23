---
sidebar_position: 5
---

# VLP 

Queries the VLP address for a specified token pair on the specified chain.

```graphql

query Factory($chainUid: String!, $pair: PairInput) {
  factory(chain_uid: $chainUid) {
    vlp(pair: $pair)
  }
}

```

### Example 

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Factory($chainUid: String!, $pair: PairInput) {\n  factory(chain_uid: $chainUid) {\n    vlp(pair: $pair)\n  }\n}","variables":{"chainUid":"osmosis","pair":{"token_1":"osmo","token_2":"euclid"}}}'
```
[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGICGUKEhAFACRQAWZAlkgKotjpEDKKeNgHMAhABoidAA6s8PAAqyAkkikwUASiLAAOkiJEAZhSq0mrJAH0YXHg2ZtOYLbv0GiANwA2UmjJZykv54GnoGAL564SBiIB5kgmQARl4IAM4YIK4GOiDmjly5PLkQaXClLGm5YmFEucFF2rU5IFQA1siWAIyNJWUQ1c11rRAdVgBMvSAIMFBehSC14TVuUSDhQA)

### Arguments

| **Argument** | **Type**      | **Description**                                                        |
|--------------|---------------|------------------------------------------------------------------------|
| `chainUid`   | `String!`     | The unique identifier of the chain.                                   |
| `pair`       | `PairInput`   | The token pair to query, including `token_1` and `token_2` values.     |

### Return Fields

Returns the contract address of the VLP in a string.
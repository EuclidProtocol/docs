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
    --url 'https://devnet-testing.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Factory($chainUid: String!, $pair: PairInput) {\n  factory(chain_uid: $chainUid) {\n    vlp(pair: $pair)\n  }\n}","variables":{"chainUid":"nibiru","pair":{"token_1":"nibi","token_2":"euclid"}}}'
```
[Open in Playground](https://devnet-testing.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGICGUKEhAFACRQAWZAlkgKotjpEDKKeNgHMAhAEoiwADpIiRAGYUqtJqyQB9GFx4NmbTmAnTZcogDcANgAcZcgL4y7IO0A)

### Arguments

- **chainUid** (String!): The unique identifier of the chain.
- **pair** (PairInput): The input for specifying the token pair by specifying token_1 and token_2.

### Return Fields

Returns the contract address of the VLP in a string.
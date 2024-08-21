---
sidebar_position: 5
---

# VLP 

Queries the VLP address for a specified token pair on the specified chain.

```graphql

query Factory($chainUid: String!, $pair: PairInput) {
  factory(chain_uid: $chainUid) {
    vlp(pair: $pair) {
      vlp_address
    }
  }
}

```

### Example 

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.euclidprotocol.com/graphql' \
    --data '{"query":"query Factory($chainUid: String!, $pair: PairInput) {\n  factory(chain_uid: $chainUid) {\n    vlp(pair: $pair) {\n      vlp_address\n    }\n  }\n}","variables":{"chainUid":"nibiru","pair":{"token_1":"atom","token_2":"usdc"}}}'
```
[Open in Playground](https://api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGICGUKEhAFACRQAWZAlkgKotjpEDKKeNgHMAhABoidAA6s8PAAqyAkkikwUASiLAAOkiJEAZhSq0mrJAH0YXHg2ZtOYLbv0GiANwA2UmjJZykv54Lnru7t5SlmRgYHgIAM4JYe4AvinpSKkgYiAeZIJkAEZeiRggrjog5o5cVTxVSCxFATBVYnpVwfXaKVVUANbIlgCMPVVkVHDtfSCDwwBM4yAwCWBQVXqZ2alAA)

### Arguments

- **chainUid** (String!): The unique identifier of the chain.
- **pair** (PairInput): The input for specifying the token pair by specifying token_1 and token_2.

### Return Fields

| Field            | Type   | Description                               |
|------------------|--------|-------------------------------------------|
| vlp_address      | String | The address of the VLP contract that contains the specified token pair.          |
---
sidebar_position: 4
---
# VLP 
Queries the VLP contract address for the specified token pair.

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
    --data '{"query":"query Factory($chainUid: String!, $pair: PairInput) {\n  factory(chain_uid: $chainUid) {\n    vlp(pair: $pair) {\n      vlp_address\n    }\n  }\n}","variables":{"chainUid":"nibiru","pair":{"token_1":"pepe","token_2":"usdt"}}}'

```

[Open in Playground](https://api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGICGUKEhAFACRQAWZAlkgKotjpEDKKeNgHMAhABoidAA6s8PAAqyAkkikwUASiLAAOkiJEAZhSq0mrJAH0YXHg2ZtOYLbv0GiANwA2UmjJZykv54Lnru7t5SlmRgYHgIAM4JYe4AvinpSKkgYiAeZIJkAEZeiRggrgY6IOaOXNU81UgsRQEw1WJ61cEN2ilVIFQA1siWAIy93QhSCB39RNXDowBMkyAwCWAo1Rl62alAA)

### Arguments

- **chainUid** (String!): The unique Id of the chain.
- **pair** (PairInput): The two tokens included in the token pair.


### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| vlp_address                    | String | The VLP contract address.                       |
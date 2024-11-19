---
sidebar_position: 4
---
# VLP 
Queries the VLP contract address for the specified token pair.

```graphql
query Vlp($pair: PairInput) {
  router {
    vlp(pair: $pair) {
      vlp
      token_1
      token_2
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Vlp($pair: PairInput) {\n  router {\n    vlp(pair: $pair) {\n      vlp\n      token_1\n      token_2\n    }\n  }\n}","variables":{"pair":{"token_1":"euclid","token_2":"nibi"}}}'

```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGoA2ADgBQAkFAhgJZ7pEAKTeAkkhTCgEoiwADpIiRPBH75hYiRIBulKg2as6nIaPEKlleXqIoIAa2QB9AIyG9J80gsAmW0QC%2Bhj0jcgANCEV6PEZ6ACMyBABnDBAdCREQNTwE1jiFBPtLGwwiBIQYKDJGMATfVwyzSxcchKRGUMYEzzEfNyA)

### Arguments

- **pair** (PairInput): The two tokens included in the token pair.


### Return Fields

| **Field**                  | **Type**   | **Description**                                             |
|------------------------|--------|---------------------------------------------------------|
| `vlp_address`            | `String` | The VLP contract address.                       |
| `token_1`                | `String` | The name of the first token in the pool.            |
| `token_2`                | `String` | The name of the second token in the pool.            |

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
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Vlp($chainUid: String!, $pair: PairInput) {\n  factory(chain_uid: $chainUid) {\n    vlp(pair: $pair) {\n      vlp_address\n    }\n  }\n}","variables":{"chainUid":"nibiru","pair":{"token_1":"nibi","token_2":"fundenom"}}}'
```
[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGoA2ADgBQAkUAFgIYCWSAqs2OkQMop6sA5gEIANERoUWebgAVpASSQUYKAJRFgAHSREiAM0ZQUEQlQYskAfRidudJqw5gN23XqIA3SlSnMZEn54rjoeHt4UVoxgYHgIAM7xoR4AvslpSCkgoiCejAKMAEZkCRggbnpaIBZOnFXcVUjMhf4wVaLJVUH1msmVICYA1shWAIw9jc3M7X1EVUMjAEwTIPowSGDIEHBV6TpZKUA)

### Arguments

- **chainUid** (String!): The unique identifier of the chain.
- **pair** (PairInput): The input for specifying the token pair by specifying token_1 and token_2.

### Return Fields

| Field            | Type   | Description                               |
|------------------|--------|-------------------------------------------|
| vlp_address      | String | The address of the VLP contract that contains the specified token pair.          |
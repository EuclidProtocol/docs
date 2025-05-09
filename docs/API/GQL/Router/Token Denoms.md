---
sidebar_position: 11
---
# Token Denoms
Queries the token pair for the specified VLP address. 

```graphql
query Token_denoms($token: String!) {
  router {
    token_denoms(token: $token) {
      denoms {
        chain_uid
        token_type {
          ... on NativeTokenType {
            native {
              denom
            }
          }
          ... on SmartTokenType {
            smart {
              contract_address
            }
          }
          ... on VoucherTokenType {
            voucher
          }
        }
      }
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://devnet-testing.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Token_denoms($token: String!) {\n  router {\n    token_denoms(token: $token) {\n      denoms {\n        chain_uid\n        token_type {\n          ... on NativeTokenType {\n            native {\n              denom\n            }\n          }\n          ... on SmartTokenType {\n            smart {\n              contract_address\n            }\n          }\n          ... on VoucherTokenType {\n            voucher\n          }\n        }\n      }\n    }\n  }\n}","variables":{"token":"usdt"}}'

```

[Open in Playground](https://devnet-testing.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACoQDWyA%2BmMhHAM4AUAJChcukQMop4CWSAOYBCAJRFgAHSREieCDBT5JMuXPaUkNOoyabORNhyQTps9XNpJ6DVRctyoACwCGgqjH5g1jjSaoUAgAHBHs-SwA6aKIIWQA5VxR%2BADcEMi0SELDzCMckJNSc3zzLEtKAX3K-KocI6MjY2W44VzwUDOQs0PDSuQZW9t6%2BuWqI2r6J0oamogA1RRd8TqRu4rq8lMXnfDHLKZqxg6Ip2oqQCqA)

### Arguments

- **token** (String!): The token to fetch denoms for.


### Return Fields

| **Field**                  | **Type**   | **Description**                                             |
|------------------------|--------|---------------------------------------------------------|
| `vlp_address`            | `String` | The VLP contract address.                       |
| `token_1`                | `String` | The Id of the first token in the pool.            |
| `token_2`                | `String` | The Id of the second token in the pool.            |

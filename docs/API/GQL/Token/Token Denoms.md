---
sidebar_position: 5
---

# Token Denoms

Queries the available token denoms for the specified token Id on the specified chains.

```graphql
query Token_denoms($denom: String, $tokenId: String, $chainUid: [String!]) {
  token {
    token_denoms(denom: $denom, token_id: $tokenId, chain_uid: $chainUid) {
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
      token_id
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Token_denoms($tokenId: String, $chainUid: [String!], $denom: String) {\n  token {\n    token_denoms(token_id: $tokenId, chain_uid: $chainUid, denom: $denom) {\n      denoms {\n        chain_uid\n        token_type {\n          ... on NativeTokenType {\n            native {\n              denom\n            }\n          }\n          ... on SmartTokenType {\n            smart {\n              contract_address\n            }\n          }\n          ... on VoucherTokenType {\n            voucher\n          }\n        }\n      }\n      token_id\n    }\n  }\n}","variables":{"denom":"0x41d722eeb7fd5283e82074e5e471648408604eac"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACoQDWyA%2BmMhHAM4AUAJLUvekQMop4CWSAOYAaIixQVkASTBdeA4WJZQAFgENBAVX5yiAbQWChAQgC6ASiLAAOkiJFJle7fsPHUpDTqMm7TuL%2BcGJO1LpcEp6yYmqaXjDh4rHaulau7u5BDNZ2GRnJ8bq5eQ6hXigEAA4IOW4lDgB0TUQQ9gBy6ij8AG4IZM4kVTXp9RlInT3DxaMZ0zMAvnMli3X1TQ0t9txw6ngo-ciD1bUz7gw7eyen7kv1K6f3M%2BubRABqEDBq%2BAdIR1Oro26Hy%2BeFuGUey1uEPcZSoRVWjxW8xAIhA3V2-HUACMADYIBgYEAjGzgHwk9AkgAMAA8ACwARjAAHYAEwshAILFMgBmYAArCyABwAZgQgpZlKZtIQfIQtKZ9IAbLTBbTKYLFZTpeooCS7Mj5kA)

### Arguments

| **Argument** | **Type**       | **Description**                                                                 |
|--------------|----------------|---------------------------------------------------------------------------------|
| `denom`      | `String`       | Optional filter to match a specific token denomination (`eth`,`0x41d722eeb7fd5283e82074e5e471648408604eac` etc...) |
| `tokenId`    | `String`       | Optional filter to match a specific token identifier.                          |
| `chainUid`   | `[String!]`    | Optional list of chain UIDs to filter the token denoms by chain.               |


### Return Fields

| **Field**            | **Type**   | **Description**                               |
|------------------|--------|-------------------------------------------|
| `tokenId`           | `String`   | The unique identifier for the token.                                      |
| `chain_uid`        | `[String]` |The chain UID where the token is available.                        |
| `native`           | [`Native`](#native) | Details of the native tokens (Denoms).                   |
| `smart`            | [`Smart`](#smart) | Details of the CW20 tokens (Contract addresses).            |
| `voucher`           | `String`        | Details about the Voucher token. |

| **Field**            | **Type**   | **Description**                               |
|------------------|--------|-------------------------------------------|
| `native`           | [`Native`](#native) | Details of the native tokens (Denoms).                   |
| `smart`            | [`Smart`](#smart) | Details of the CW20 tokens (Contract addresses).            |
| `voucher`           | `String`        | Details about the Voucher token. |

### Native

| **Field**            | **Type**   | **Description**                               |
|------------------|--------|-------------------------------------------|
| `denom`            | `String` | The denomination of the native token.     |

### Smart

| **Field**            | **Type**   | **Description**                               |
|------------------|--------|-------------------------------------------|
| `contractAddress`  | `String` | The contract address of the smart token.  |
---
sidebar_position: 5
---

# Token Denoms

Queries the available token denoms for the specified token Id on the specified chains.

```graphql
query Token_denoms($denom: String, $tokenId: String, $chainUids: [String!]) {
  token {
    token_denoms(denom: $denom, token_id: $tokenId, chain_uids: $chainUids) {
      denoms {
        id
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
        chain_type
      }
      id
      token_id
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.euclidprotocol.com/graphql' \
    --data '{"query":"query Token_denoms($denom: String, $tokenId: String, $chainUids: [String!]) {\n  token {\n    token_denoms(denom: $denom, token_id: $tokenId, chain_uids: $chainUids) {\n      denoms {\n        id\n        chain_uid\n        token_type {\n          ... on NativeTokenType {\n            native {\n              denom\n            }\n          }\n          ... on SmartTokenType {\n            smart {\n              contract_address\n            }\n          }\n          ... on VoucherTokenType {\n            voucher\n          }\n        }\n        chain_type\n      }\n      id\n      token_id\n    }\n  }\n}","variables":{"denom":"eth","tokenId":null,"chainUids":null}}'
```

[Open in Playground](https://api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACoQDWyA%2BmMhHAM4AUAJFABYCGAlkgKrcwDdEQDaAZRR5eAcwCEAXQCURYAB0kRIigrJVGrVp2UkNOoyYcepmIOFE2XXgKEr1mw1tpJ6DfR88tQQNArSteKlswENDjahQCAAcEf1DPADpMoghNADlOFG4ANwQyExIklPc0wKQC4qqYmsNveiaagF92wK6AtMz07M1xOE48FDLkCuTU5q0GUfHZubCcqU4oFCpOMDA8BAYGbtDeudPmgaGiADUIGA58SaRpxr6aoruHvGPDc5Of8KmBLJbp-QzBN7aXSmCGec69DogAA0ICKY24nAARgAbA4YEDVIhqcDmYkiYkIFDsYlIkLEuJIACS0QwRCQMGx2NpHmJgJcR1Z7M53MRHSAA)

### Example Response

```json
{
  "data": {
    "token": {
      "token_denoms": [
        {
          "denoms": [
            {
              "id": "TokenDenomWithChainType:ethereum:evm:native:eth",
              "chain_uid": "ethereum",
              "token_type": {
                "native": {
                  "denom": "eth"
                }
              },
              "chain_type": "evm"
            },
            {
              "id": "TokenDenomWithChainType:arbitrum:evm:native:eth",
              "chain_uid": "arbitrum",
              "token_type": {
                "native": {
                  "denom": "eth"
                }
              },
              "chain_type": "evm"
            },
            {
              "id": "TokenDenomWithChainType:optimism:evm:native:eth",
              "chain_uid": "optimism",
              "token_type": {
                "native": {
                  "denom": "eth"
                }
              },
              "chain_type": "evm"
            },
            {
              "id": "TokenDenomWithChainType:base:evm:native:eth",
              "chain_uid": "base",
              "token_type": {
                "native": {
                  "denom": "eth"
                }
              },
              "chain_type": "evm"
            }
          ],
          "id": "TokenDenomWithTokenIDResponse:eth",
          "token_id": "eth"
        }
      ]
    }
  }
}
```

### Arguments

| **Argument** | **Type**       | **Description**                                                                 |
|--------------|----------------|---------------------------------------------------------------------------------|
| `denom`      | `String`       | Optional filter to match a specific token denomination.                         |
| `tokenId`    | `String`       | Optional filter to match a specific token identifier.                           |
| `chainUids`  | `[String!]`    | Optional list of chain UIDs to filter the token denoms by chain.                |


### Return Fields

| **Field**            | **Type**   | **Description**                               |
|------------------|--------|-------------------------------------------|
| `id`                | `String`   | Unique identifier for the token denom response object. |
| `token_id`          | `String`   | The token identifier being queried. |
| `denoms`            | [`Denom[]`](#denom)  | Token representations available across the matching chains. |

### Denom

| **Field**            | **Type**   | **Description**                               |
|------------------|--------|-------------------------------------------|
| `id`                | `String` | Unique identifier for the denom entry. |
| `chain_uid`         | `String` | The chain UID where this token representation exists. |
| `token_type`        | [`TokenType`](#tokentype) | The token representation on that chain. |
| `chain_type`        | `String` | The chain family for this denom entry, for example `evm` or `cosmwasm`. |

### TokenType

| **Field**            | **Type**   | **Description**                               |
|------------------|--------|-------------------------------------------|
| `native`           | [`Native`](#native) | Details of native token denoms. |
| `smart`            | [`Smart`](#smart) | Details of smart-token contract addresses. |
| `voucher`          | `JSON` | Voucher marker payload for voucher token representations. |

### Native

| **Field**            | **Type**   | **Description**                               |
|------------------|--------|-------------------------------------------|
| `denom`            | `String` | The denomination of the native token.     |

### Smart

| **Field**            | **Type**   | **Description**                               |
|------------------|--------|-------------------------------------------|
| `contract_address` | `String!` | The contract address of the smart token. |

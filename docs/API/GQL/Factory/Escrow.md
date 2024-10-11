---
sidebar_position: 4
---

# Escrow

Queries escrow information for a factory contract on a specified blockchain, including the escrow address and details about the denominations.

```graphql
query Escrow($chainUid: String!, $tokenId: String) {
  factory(chain_uid: $chainUid) {
    escrow(token_id: $tokenId) {
      escrow_address
      denoms {
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
```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Escrow($chainUid: String!, $tokenId: String) {\n  factory(chain_uid: $chainUid) {\n    escrow(token_id: $tokenId) {\n      escrow_address\n      denoms {\n        ... on NativeTokenType {\n          native {\n            denom\n          }\n        }\n        ... on SmartTokenType {\n          smart {\n            contract_address\n          }\n        }\n        ... on VoucherTokenType {\n          voucher\n        }\n      }\n    }\n  }\n}","variables":{"chainUid":"stargaze","tokenId":"usdt"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAKIDOUeEA7gBQAkUAFgIYCWSAqm2OkQMoo8HAOYBCADRF6KCAGtkASV4ChogJRFgAHSREiAMxZRZhWs3ZIA%2BjB59GrDtzCade-UQQUqdWQut20n5KLlq6Hh5elDRWLGBgeF5k4RFEYMgQcGRh7qlEAHSFRBB6AHIsKGwAbggAKvLItQQADgg5eRFIFdVtbh2p6UiZKf0AviOp47mphfnFevxwLHgo9f5Nre39RGRLK1vbRFAlQsYosfGJZMnTeVNjExGz80QAahAwzPhrjS29j6kqh8vngAfp7pMJhCpqMQBIQFVlmwWAAjAA2XgwID6RG0IAsTh4eL4eLIKGWIhYAC8EHiJCk8cEkMpibiQDAyGAUHjdLDRkA)


### Arguments

- **chainUid** (String!): The unique identifier of the chain.
- **token_id** (String!): The Id of the token to get escrow information for. 

### Return Fields

| **Field**            | **Type**   | **Description**                               |
|------------------|--------|-------------------------------------------|
| `escrow_address`   | `String` | The contract address of the escrow contract. |
| `denoms`           | [Denoms](#denoms) | The denominations associated with the escrow.             |

### Denoms

| **Field**            | **Type**   | **Description**                               |
|------------------|--------|-------------------------------------------|
| `native`           | [`Native`](#native) | Details of the native tokens (Denoms).                   |
| `smart`            | [`Smart`](#smart) | Details of the CW20 tokens (Contract addresses).            |
| `Voucher`           | `String`        | Details about the Voucher token. |

### Native

| **Field**            | **Type**   | **Description**                               |
|------------------|--------|-------------------------------------------|
| `denom`            | `String` | The denomination of the native token.     |

### Smart

| **Field**            | **Type**   | **Description**                               |
|------------------|--------|-------------------------------------------|
| `contractAddress`  | `String` | The contract address of the smart token.  |
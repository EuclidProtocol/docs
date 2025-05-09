---
sidebar_position: 7
---

# Allowed Denoms

Queries the available denominations for the specified token Id found on the specified chain.

```graphql
query Allowed_denoms($chainUid: String!, $tokenId: String) {
  factory(chain_uid: $chainUid) {
    allowed_denoms(token_id: $tokenId) {
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
```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Allowed_denoms($chainUid: String!, $tokenId: String) {\n  factory(chain_uid: $chainUid) {\n    allowed_denoms(token_id: $tokenId) {\n      ... on NativeTokenType {\n        native {\n          denom\n        }\n      }\n      ... on SmartTokenType {\n        smart {\n          contract_address\n        }\n      }\n      ... on VoucherTokenType {\n        voucher\n      }\n    }\n  }\n}","variables":{"chainUid":"stargaze","tokenId":"usdt"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAIIA2ZEA7gmAPpjIRwDOAFACRQAWAhgJZIAqvzDoiAZRR5BAcwCEAGiIcUEANbIAkmMnS5ASiLAAOkiJEAZryhrCbHgKR0Yo8Vz6CRYI6fMWiXgpqWgYmVjY1TWc3FSjtH2MzAICAOnSiCHMAOV4UfgA3BAAVDWRiggAHBCT-FIskPMKav3r6xiRmZLaiAF9ulP66tIysyThePBRS6Irq2p6iFgmphcWiKCzpGxQ6XjAwPAQWFgH6obaL%2BvTUzPMANQgYHnwZ8qqWs5SCp5e8L76ZyuQ16IEUIAKk34vAARmRjhgQK0iCYQI4vKJUeJUSwUJNZLwAF4IVGKbqo%2BJIHRYlEgGAsMAoVFmUG9IA)


### Arguments

- **chainUid** (String!): The unique identifier of the chain.
- **token_id** (String!): The Id of the token to get all denominations for. 

### Return Fields

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
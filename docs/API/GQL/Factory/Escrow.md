---
sidebar_position: 4
---

# Escrow

Queries escrow information for a factory contract on a specified blockchain, including the escrow address and details about the denominations.

```graphql
query Factory($chainUid: String!, $tokenId: String) {
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
      }
    }
  }
}
```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.euclidprotocol.com/graphql' \
    --data '{"query":"query Factory($chainUid: String!, $tokenId: String) {\n  factory(chain_uid: $chainUid) {\n    escrow(token_id: $tokenId) {\n      escrow_address\n      denoms {\n        ... on NativeTokenType {\n          native {\n            denom\n          }\n        }\n        ... on SmartTokenType {\n          smart {\n            contract_address\n          }\n        }\n      }\n    }\n  }\n}","variables":{"chainUid":"nibiru","tokenId":"usdt"}}'
```

[Open in Playground](https://api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGICGUKEhAFACRQAWZAlkgKotjpEDKKeNgHMAhABoidKgGtkASW58BwgJRFgAHSREiAMwpVaTVkgD6MLjwbM2nMGs3adRBAGcoeCAHcaM5KctJPyQFBy1nZzcPb1MyMDA8N1dwiKIwZAg4V3UU1KIAOkKiCG0AOTIUFgA3BAAVCFkkWoIABwQcpzydJArq9scu1PSkTNyugF8xiMnO1ML84u1eODI8FHrG5raOwZ1XFbWd3Z0oEoEDWPjE12TZvJnBh9SnnSeZ8ZAxECrVljIAIwANm4MCABkQNCBjLYuJCeJCkCx-iw8DBIWIUpDggo4RCQDBXGAUJCtB9xkA)


### Arguments

- **chainUid** (String!): The unique identifier of the chain.
- **token_id** (String!): The Id of the token to query in the escrow. 

### Return Fields

| Field            | Type   | Description                               |
|------------------|--------|-------------------------------------------|
| escrow_address   | String | The contract address of the escrow contract.|
| denoms           | [Denoms](#denoms) | The denominations associated with the escrow.             |

### Denoms

| Field            | Type   | Description                               |
|------------------|--------|-------------------------------------------|
| native           | [Native](#native) | Details of the native tokens (Denoms).                   |
| smart            | [Smart](#smart) | Details of the CW20 tokens (Contract addresses).            |

### Native

| Field            | Type   | Description                               |
|------------------|--------|-------------------------------------------|
| denom            | String | The denomination of the native token.     |

### Smart

| Field            | Type   | Description                               |
|------------------|--------|-------------------------------------------|
| contractAddress  | String | The contract address of the smart token.  |
---
sidebar_position: 5
---
# Chain Id

Queries the chain ID and factory address for a specified chain using its unique identifier (UID).

```graphql
query Chain_id($chainUid: String!) {
  chains {
    chain_id(chain_uid: $chainUid) {
      chain_id
      factory_address
      display_name
      logo
    }
  }
}
```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Chain_id($chainUid: String!) {\n  chains {\n    chain_id(chain_uid: $chainUid) {\n      chain_id\n      factory_address\n      display_name\n      logo\n    }\n  }\n}","variables":{"chainUid":"nibiru"}}'
```
[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMIAWAhgJZID6VYAFACRSU0CqD6RAyinhoBzAIQBKIsAA6SIkTbUkAZ0ky5chTXpNNdGNyKt2SLmAnTZ6jce1qrRAGYUoKCIVoUwYPAiVK7VmBUSgAOADYUBLRIFIgB6mEQQhDxAL526UipIAA0IABuFIIUAEZhvhggFnJSILqmtTy1SFQlVHgwtTLZqUA)

### Arguments

- **chainUid** (String!): The unique identifier of the chain.

### Return Fields

| Field            | Type   | Description                               |
|------------------|--------|-------------------------------------------|
| chain_id         | String | The unique identifier of the chain.       |
| factory_address  | String | The address of the factory contract.      |
| display_name     | String | The display name of the chain.            |
| logo             | String | The URL or reference to the chain's logo image.    |

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
    }
  }
}
```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Chain_id($chainUid: String!) {\n  chains {\n    chain_id(chain_uid: $chainUid) {\n      chain_id\n      factory_address\n    }\n  }\n}","variables":{"chainUid":"nibiru"}}'
```
[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMIAWAhgJZID6VYAFACRSU0CqD6RAyinhoBzAIQBKIsAA6SIkTbUkAZ0ky5chTXpNNdGNyKt2SLmAnTZ6jce1qrRAGYUoKCIVoUwYPAiVK7cgC%2BdsFIgSAANCAAbhSCFABGADa%2BGCAWclIguqZZPFlIVAlUeDBZMuGBQA)

### Arguments

- **chainUid** (String!): The unique identifier of the chain.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| chain_id               | [ChainID](#chainid) | The chain ID and factory address for the specified chain. |

### ChainID

| Field            | Type   | Description                               |
|------------------|--------|-------------------------------------------|
| chain_id         | String | The unique identifier of the chain.       |
| factory_address  | String | The address of the factory contract.      |
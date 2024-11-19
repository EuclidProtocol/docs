---
sidebar_position: 3
---

# Contracts

Queries contract information for the specified chain Id and Type.

```graphql

query Contracts($type: String, $chainUId: String) {
  chains {
    contracts(type: $type, chainUId: $chainUId) {
      ContractAddress
      ChainUID
      Type
    }
  }
}

```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Contracts($chainUId: String, $type: String) {\n  chains {\n    contracts(chainUId: $chainUId, type: $type) {\n      ContractAddress\n      ChainUID\n      Type\n    }\n  }\n}","variables":{"chainUId":"coreum","type":"factory"}}'
```
[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMISp4CGUKAzgBQAkUAFpQJZICqAkmOkQDKKPJwDmAGiKMUBAA4IBw0UjEBKIsAA6SIkVYcktTTr16o5EdTr0DnXv2l3ufKbIUCZ8hBu26zemQU1gCCYGB4CLS0pgGkbPY8ACKxAQAq3qlEAL6xuUjZIBIgAG6UopQARgA2URggfnpaIM4OzQLNFpHwzRKxze4I7UTNAGbWEITNOoXZQA)

### Arguments

- **chainUId** (String): Optional chain to query for contracts. If not specified then all integrated chains are used.
- **type** (String): Optional type for the contracts. If not specified, all contract types are returned.

### Returned Fields

| **Field**           | **Type**   | **Description**                                             |
|-----------------|--------|---------------------------------------------------------|
| `ContractAddress` | `String` | The address of the contract on the blockchain.          |
| `ChainUID`         | `String` | The unique identifier of the chain where the contract is deployed. |
| `Type`            | `String` | The type of the contract.         |

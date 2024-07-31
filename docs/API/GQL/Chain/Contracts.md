---
sidebar_position: 1
---

# Contracts

Queries contract information for the specified chain Id and Type.

```graphql

query Contracts($chainUId: String!, $type: String!) {
  chains {
    contracts(chainUId: $chainUId, type: $type) {
      CreatedAt
      UpdatedAt
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
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Contracts($chainUId: String!, $type: String!) {\n  chains {\n    contracts(chainUId: $chainUId, type: $type) {\n      CreatedAt\n      UpdatedAt\n      ContractAddress\n      ChainUID\n      Type\n    }\n  }\n}","variables":{"chainUId":"vsl","type":"vlp"}}'
```
[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMISp4CGUKAzgBQAkUAFpQJZICqAkmOkQDKKPJwDmAQgA0RRigIAHBAOGikkgJRFgAHSREirDklra9Bg1HIjqdekc69%2Bsh9z4z5SgXMUItu-QsDEjwEShQEMABBFHMgoi4FMHDImLigsgpbKLAwUNpadIsSNkceABEigwAVXyKAXzjGpHqQKRAAN0pRSgAjABsEWgwQAIMdEFcnCYEJjtp%2Biak4ic8EGaI5-oUJvVb6oA)

### Arguments

- **chainUId** (String!): The unique identifier of the chain.
- **type** (String!): The type of the contract.

### Returned Fields

| Field           | Type   | Description                                             |
|-----------------|--------|---------------------------------------------------------|
| CreatedAt       | String | The date and time when the contract was created.        |
| UpdatedAt       | String | The date and time when the contract was last updated.   |
| ContractAddress | String | The address of the contract on the blockchain.          |
| ChainUID         | String | The unique identifier of the chain where the contract is deployed. |
| Type            | String | The type of the contract.         |
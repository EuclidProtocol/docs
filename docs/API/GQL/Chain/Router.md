---
sidebar_position: 8
---

# Router

Queries information on the router contract.

```graphql
query Chains {
  chains {
    router {
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
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Chains {\n  chains {\n    router {\n      CreatedAt\n      UpdatedAt\n      ContractAddress\n      ChainUID\n      Type\n    }\n  }\n}"}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMIAWAhgJZIDORwAOkkUVJTfUy60XhDBT4GzXrxJ4EFIWACCKUWKIBVAA5hpCOQp5iSEVHgpQUssGEm1aivRyTKAkgBEbvACoFVCVwF9FfpB8QABoQADcKPCoKACMAGwRaDBAQHyA)

### Arguments

- None

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| router                 | [Router](#router-1) | The router information for chains.                     |

### Router

| Field            | Type   | Description                               |
|------------------|--------|-------------------------------------------|
| CreatedAt        | String | The timestamp when the router was created. |
| UpdatedAt        | String | The timestamp when the router was last updated. |
| ContractAddress  | String | The address of the router contract.       |
| ChainUID         | String | The unique identifier (UID) of the chain. |
| Type             | String | The type of the router.                   |

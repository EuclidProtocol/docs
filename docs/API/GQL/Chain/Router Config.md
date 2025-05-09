---
sidebar_position: 4
---

# Router Config

Queries information on the router contract and virtual settlement layer.

```graphql
query Chains {
  chains {
    router_config {
      contract_address
      chain_uid
      type
      explorer_url
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
    --data '{"query":"query Router_config {\n  chains {\n    router_config {\n      contract_address\n      chain_uid\n      type\n      explorer_url\n      logo\n    }\n  }\n}","variables":{}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAEoQwr4D6UESAZgJYDmRwAOkkUVABYCGjJAGc2nbtzzlKeGnSasOXCd1qo8-KCir8wYPAmHDxKngKFUYjMCZUoCABwS2JCAB4OANhAOyYeTxdub2YIFwBfE0ikcJAAGhAAN348Rn4AI09DDBAQcKA)


### Return Fields

| **Field**            | **Type**   | **Description**                               |
|------------------|--------|-------------------------------------------|
| `ContractAddress`  | `String` | The address of the router contract.       |
| `ChainUID`         | `String` | The unique identifier (UID) of the chain. |
| `Type`             | `String` | The type of smart contract which is always "router" in this query.                  |
| `explorer_url`     | `String` | The URL of the blockchain explorer for the VSL.    |
| `logo`             | `String` | The URL or reference to the logo of the VSL chain.      |

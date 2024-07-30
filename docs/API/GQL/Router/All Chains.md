---
sidebar_position: 2
---

# All Chains
Queries all chain info within the router contract.

```graphql

query Router {
  router {
    all_chains {
      chain {
        factory_chain_id
        factory
        from_hub_channel
        from_factory_channel
      }
      chain_uid
    }
  }
}
```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Router {\n  router {\n    all_chains {\n      chain {\n        factory_chain_id\n        factory\n        from_hub_channel\n        from_factory_channel\n      }\n      chain_uid\n    }\n  }\n}","variables":{}}'

```

[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAEoQwr5HAA6SRRe5le1dDDAhgDbcD6UABacAlkgDObehwZDR9WtJkMAZpygoIhAcLF8RYdstXrNhI8ZVM4fQTABGOzkiQJuF5VYg21GrQScXNw8GAF8Qojk9GAMPcOl40JAAGhAAN048EU57bgRxDBBFBhoQKAhUPFNS9FKAd05xOABGAA8VNLSANgB2AjwkPFawAGsAZhQRgCtuNJ6egCY6qDqAVimYEc4EVdaFsbHOAC8ATnGkFQWu7kFWupge8W6FhYAWVdLkuiTQoA)

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| chain                  | [Chain](#chain) | Detailed information about the chain.                  |
| chain_uid              | String | The unique identifier (UID) of the chain.               |

### Chain

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| factory_chain_id       | String | The factory chain ID.                                   |
| factory                | String | The contract address of the factory.                             |
| from_hub_channel       | String | The channel from hub to factory.                   |
| from_factory_channel   | String | The channel from factory to hub.               |
---
sidebar_position: 2
---

# All Chains
Queries all chain info within the router contract.

```graphql

query Router {
  router {
    all_chains {
      factory
      chain_id
      chain_uid
    }
  }
}
```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Router {\n  router {\n    all_chains {\n      factory\n      chain_id\n      chain_uid\n    }\n  }\n}"}'

```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAEoQwr5HAA6SRRe5le1dDDAhgDbcD6UABacAlkgDObehwYAzTlBQRC7GUSGikfEWFUyNYvjB16iAX1UWkZkABoQAN054RnAEbcE4jCBBmgA)

### Return Fields

### Chain

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| factory                | String | The contract address of the factory.                    |
| chain_uid              | String | The chain UID we have queried.                          |
| chain_id               | String | The chain Id of the above chain UID.                    |
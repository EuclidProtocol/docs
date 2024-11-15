---
sidebar_position: 1
---

# All Chains
Queries information for each chains integrated with Euclid.

```graphql
query Chains($showAllChains: Boolean) {
  chains {
    all_chains(show_all_chains: $showAllChains) {
      chain_id
      factory_address
      display_name
      explorer_url
      chain_uid
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
    --data '{"query":"query Chains($showAllChains: Boolean) {\n  chains {\n    all_chains(show_all_chains: $showAllChains) {\n      chain_id\n      factory_address\n      display_name\n      explorer_url\n      chain_uid\n      logo\n    }\n  }\n}","variables":{"showAllChains":true}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMIAWAhgJZIDOAFACS1kQDuAggDZfnV3oiAIQgQuCCkgCURYAB0kRIlEo1ashUqUUeAfRX8GLdrp1d9qgUWatOPPmpnzFWpQZq6qYTa6IAzCigUCEJTMDA8BFpaH1cwKloABy4KAl0kCkRYrQQAD2SQ-F0YPC5st0tir3KiLggAcwhsgF8fVqRmkAAaEAA3CjwqCgAjcVoMEGclORBjO15LGIwiFDxcIgVO5qA)

### Arguments

- **token** (Boolean): If true, includes chains that will be integrated with Euclid soon. Otherwise, returns only the chains currently integrated.

### Return Fields

| **Field**          | **Type** | **Description**                                      |
|--------------------|----------|------------------------------------------------------|
| `factory_address`  | `String` | The contract address of the factory contract on that chain.                 |
| `chain_uid`        | `String` | The unique identifier (UID) of the chain.             |
| `display_name`     | `String` | The display name of the chain.                       |
| `logo`             | `String` | The URL or reference to the chain's logo image.      |
| `chain_id`         | `String` | The chain Id for the chain config. |
| `explorer_url`     | `String` | The URL to the blockchain explorer for this chain.   |
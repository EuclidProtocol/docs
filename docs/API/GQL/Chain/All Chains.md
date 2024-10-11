---
sidebar_position: 1
---

# All Chains
Queries information for each chains integrated with Euclid.

```graphql
query All_chains {
  chains {
    all_chains {
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
    --data '{"query":"query Chains {\n  chains {\n    all_chains {\n      chain_id\n      factory_address\n      display_name\n      explorer_url\n      chain_uid\n      logo\n    }\n  }\n}","variables":{}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMIAWAhgJZIDORwAOkkUVJTfUy60RQDb8A%2Bu2p0GzXr1E0hVMJKlEAZhSgoIhIRTBg8CWrUVSwVWgAd%2BFAkKQVEx3ggAelzfiEw8-R6xlJPeV8ifggAcwhHAF9FGKQokAAaEAA3CjwqCgAjfgMMEBAooA)


### Return Fields

| **Field**          | **Type** | **Description**                                      |
|--------------------|----------|------------------------------------------------------|
| `factory_address`  | `String` | The contract address of the factory contract on that chain.                 |
| `chain_uid`        | `String` | The unique identifier (UID) of the chain.             |
| `display_name`     | `String` | The display name of the chain.                       |
| `logo`             | `String` | The URL or reference to the chain's logo image.      |
| `chain_id`         | `String` | The chain Id for the chain config. |
| `explorer_url`     | `String` | The URL to the blockchain explorer for this chain.   |
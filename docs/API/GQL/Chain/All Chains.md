---
sidebar_position: 1
---

# All Chains

Queries information for each chain integrated with Euclid.

```graphql
query Chains($showAllChains: Boolean, $type: String) {
  chains {
    all_chains(show_all_chains: $showAllChains, type: $type) {
      chain_id
      factory_address
      token_factory_address
      display_name
      explorer_url
      chain_uid
      logo
      type
    }
  }
}

```

### Example

```bash
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://testnet.api.euclidprotocol.com/graphql' \
  --data '{
    "query": "query Chains($showAllChains: Boolean, $type: String) {\n  chains {\n    all_chains(show_all_chains: $showAllChains, type: $type) {\n      chain_id\n      factory_address\n      token_factory_address\n      display_name\n      explorer_url\n      chain_uid\n      logo\n      type\n    }\n  }\n}",
    "variables": {
      "showAllChains": true,
      "type": "evm"
    }
}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAIIA2ZA%2BlABYCGAlkgM4AUAJMzRAO7lkBhek2boiAIQgQyCOkgA0RdigIAHBGIDKKPEwDmASiLAAOkiJFajFsbMWLdCtWEtWXXpUdUrIsZ258FELWzIoq6n7hCEam5vYWPkiUDGB28UQAZnRQKBCEnmBgeAjMzGnxYAzMqmR0BJRIdIjl9ggAHjV5%2BJQweGQtCS49KQNEZBB6EKNR0xAA1siUWTl59XSFxaUtAL5pu0jbINtAA)

### Arguments

| **Name**         | **Type**  | **Description**                                                                 |
|------------------|-----------|---------------------------------------------------------------------------------|
| `showAllChains`  | Boolean   | If true, includes chains that are not yet integrated (but planned).             |
| `type`           | String    | Optional. Filters chains by type (e.g., `EVM`, `Cosmwasm`, etc).                |


### Return Fields

| **Field**               | **Type**   | **Description**                                                         |
|-------------------------|------------|-------------------------------------------------------------------------|
| `chain_id`              | `String`   | The chain ID used in the protocol.                                     |
| `chain_uid`             | `String`   | The unique identifier (UID) of the chain.                              |
| `display_name`          | `String`   | A user-friendly name for the chain.                                    |
| `factory_address`       | `String`   | The contract address of the main factory on that chain.                |
| `token_factory_address` | `String`   | *(New)* The contract address of the token factory on that chain.       |
| `explorer_url`          | `String`   | A URL to the block explorer for this chain.                            |
| `logo`                  | `String`   | The logo URL or path used in the UI.                                   |
| `type`                  | `String`   | The ecosystem the chain belongs to (e.g., `"EVM"`, `"Cosmwasm"`).      |
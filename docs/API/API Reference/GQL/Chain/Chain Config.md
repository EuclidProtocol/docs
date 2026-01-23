---
sidebar_position: 2
---

# Chain Config

Queries information for the specified Cosmos chain.

```graphql
query ChainConfig($chainUid: String, $chainId: String) {
  chains {
    chain_config(chain_uid: $chainUid, chain_id: $chainId) {
      chain_id
      chain_uid
      display_name
      explorer_url
      factory_address
      token_factory_address
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
    --data '{"query":"query Query($chainUid: String, $chainId: String) {\n  chains {\n    chain_config(chain_uid: $chainUid, chain_id: $chainId) {\n      chain_id\n      factory_address\n      display_name\n      explorer_url\n      chain_uid\n      logo\n      type\n      token_factory_address\n    }\n  }\n}","variables":{"chainUid":"coreum"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAIq6EAUAJFABYCGAlkgKqNjpEDKKezA5gBoiNBswCSHbrwEBKIsAA6SIkTpMkAZwXLVq9cwD6UCEgBmjfhQNJDMdp1Ea2YYTcMORNyfKUq9%2BmK27LoBRGb0UCgQhIb0YGB4CJqaoQFgjJoADgA29ASGSPSIaXoIAB65Mfh2eDmlgRp2If4BORD8EA1EKARZCN3RANbIhhFRMQXxicmprUQAvqFLSAsggiAAbvR89ABGOckYIH6qiiA2Lufo5yZJ8OfKawtAA)


### Arguments

| **Name**      | **Type** | **Description**                                                                 |
|---------------|----------|---------------------------------------------------------------------------------|
| `chainId`     | String   | The ID of the chain. If not provided, `chainUid` must be specified.            |
| `chainUid`    | String   | The unique identifier (UID) of the chain. If not provided, `chainId` must be specified.  |

### Return Fields

| **Field**               | **Type**   | **Description**                                                      |
|-------------------------|------------|----------------------------------------------------------------------|
| `chain_id`              | `String`   | The chain ID used in the protocol.                                   |
| `chain_uid`             | `String`   | The unique identifier (UID) of the chain.                            |
| `display_name`          | `String`   | A user-friendly name for the chain.                                  |
| `explorer_url`          | `String`   | A URL to the block explorer for this chain.                          |
| `factory_address`       | `String`   | The contract address of the main factory on that chain.              |
| `token_factory_address` | `String`   | The contract address for the token factory on this chain.    |
| `logo`                  | `String`   | The logo URL or path used in the UI.                                 |
| `type`                  | `String`   | The ecosystem the chain belongs to such as "EVM" or "Cosmwasm".      |
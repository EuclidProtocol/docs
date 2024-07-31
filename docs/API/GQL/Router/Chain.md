---
sidebar_position: 1
---
# Chain

Queries information about a specific chain within the router contract on a specified blockchain, including details about the factory chain ID, factory address, and channels.


```graphql

query Router($chainUid: String!) {
  router {
    chain(chain_uid: $chainUid) {
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
    --url 'https://api.staging.euclidprotocol.com/graphql' \
    --data '{"query":"query Router($chainUid: String!) {\n  router {\n    chain(chain_uid: $chainUid) {\n      chain {\n        factory_chain_id\n        factory\n        from_hub_channel\n        from_factory_channel\n      }\n      chain_uid\n    }\n  }\n}","variables":{"chainUid":"nibiru"}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAEoQwr4AUAJFABYCGAlkgKrNjpEDKKerAOYBCAJRFgAHSREiecpTwTps2QxZIq61gH0YnbnSasOYcVJmq1xmRatWAZoygoIhHdqQ7OK%2B7KcubgS%2Bfg7ycDr0MABGHkxISAgANiH2YRARAa7u6gnJqbIAvgVEnno%2BlkW%2BxUiFIAA0IABujAKM0UkIAM4YIBaSIJ6mA9wDSMzRzHgwA-XSdYVAA)

### Arguments

- **chainUid** (String!): The unique identifier of the chain.

### Return Fields

### ChainInfo

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| chain                  | [Chain](#chain-1) | Detailed information about the chain.                  |
| chain_uid              | String | The unique identifier (UID) of the chain.               |

### Chain

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| factory_chain_id       | String | The factory chain ID.                                   |
| factory                | String | The contract address of the factory.                    |
| from_hub_channel       | String | The channel from hub to factory.                        |
| from_factory_channel   | String | The channel from factory to hub.                        |
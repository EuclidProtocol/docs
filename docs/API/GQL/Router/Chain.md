---
sidebar_position: 1
---
# Chain

Queries information about a specific chain within the router contract on a specified blockchain, including details about the factory chain ID, factory address, and channels.


```graphql

query Chain($chainUid: String!) {
  router {
    chain(chain_uid: $chainUid) {
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
    --data '{"query":"query Chain($chainUid: String!) {\n  router {\n    chain(chain_uid: $chainUid) {\n      factory\n      chain_id\n      chain_uid\n    }\n  }\n}","variables":{"chainUid":"nibiru"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMIAWAhgJZIAUAJFJTQKpVjpEDKKeNA5gEIAlEWAAdJESJ4IMFPjGTp0ptTpqaAfRjtOjZkjZhREqSukAzClBQRCyi0U1It7RxZc7356QF9HAKQ-EAAaEAA3Cj4KACMAGwQAZwwQM2lxEBdjTM5MpCpYqjwYTMkQvyA)

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
| factory                | String | The contract address of the factory.                    |
| chain_uid              | String | The chain UID we have queried.                          |
| chain_id               | String | The chain Id of the above chain UID.                    |
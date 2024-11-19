---
sidebar_position: 1
---
# Chain

Queries information about a specific chain within the router contract, including details about the factory chain ID, factory address, and channels.


```graphql

query Chain($chainUid: String!) {
  router {
    chain(chain_uid: $chainUid) {
      chain_uid
      chain {
        factory_chain_id
        factory
        chain_type {
          ibc {
            from_hub_channel
            from_factory_channel
          }
        }
      }
    }
  }
}

```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Chain($chainUid: String!) {\n  router {\n    chain(chain_uid: $chainUid) {\n      chain_uid\n      chain {\n        factory_chain_id\n        factory\n        chain_type {\n          ibc {\n            from_hub_channel\n            from_factory_channel\n          }\n        }\n      }\n    }\n  }\n}","variables":{"chainUid":"osmosis"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMIAWAhgJZIAUAJFJTQKpVjpEDKKeNA5gEIAlEWAAdJESJ4IMFPjGTp0ptTpqaAfRjtOjZkjZhREqStWGd7ZRaKapZuyoBmFKCgiEtDrTfPObh5eBLbOvigEAA4ISgHORFQARlBxCXYusnBaZDBJPpRISAgANmHpRJkQ2UGe3mpFpeXOAL7NKm3x0p0WPUSdLSAANCAAbhR8FEklCADOGCBOROIgDsYrnCsQs3DbVLMrkoMtQA)

### Arguments

- **chainUid** (String!): The unique identifier of the chain.

### Return Fields

### ChainInfo

| **Field**                  | **Type**   | **Description**                                             |
|------------------------|--------|---------------------------------------------------------|
| `chain`                  | [`Chain`](#chain-1) | Detailed information about the chain.                  |
| `chain_uid`              | `String` | The unique identifier (UID) of the chain.               |

### Chain

| **Field**                  | **Type**   | **Description**                                             |
|------------------------|--------|---------------------------------------------------------|
| `factory_chain_id`      | `String` | The chain Id of the config used by the factory.                          |
| `factory`               | `String` | The contract address of the factory.                   |
| `chain_type`            | [`ChainType`](#chain-type) | IBC information used by the chain.         |

### Chain Type

| **Field**                  | **Type**   | **Description**                                             |
|------------------------|--------|---------------------------------------------------------|
| `from_hub_channel`      | `String` | The IBC channel from the router to the chain.              |
| `from_factory_channel`  | `String` | The IBC channel from the factory to the router.          |
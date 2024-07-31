---
sidebar_position: 2
---

# State

Queries the state information of a factory contract on a specified blockchain. It includes details about the factory's ID, chain ID, router contract, hub channel, and admin.

```graphql
query Factory($chainUid: String!) {
  factory(chain_uid: $chainUid) {
    state {
      chain_uid
      router_contract
      hub_channel
      admin
    }
  }
}
```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/graphql' \
    --data '{"query":"query Factory($chainUid: String!) {\n  factory(chain_uid: $chainUid) {\n    state {\n      chain_uid\n      router_contract\n      hub_channel\n      admin\n    }\n  }\n}","variables":{"chainUid":"nibiru"}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGICGUKEhAFACRQAWZAlkgKotjpEDKKeNgHMAhAEoiwADpIiRAGYUqtJqyQB9GFx4NmbTmAnTZcogGcUZFAkkzTp1W01c79onggxredVAio8JVd7RhgAI19mJCQEABtg0zIwODYEgF9XDKQ0kAAaEAA3MkEyMNiEMwwQYzkpEEcOFwwiOqQWMJY8GDqZHLSgA)

### Arguments

- **chainUid** (String!): The unique identifier of the chain.


### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| state                  | [State](#state-1) | The state information of the factory contract.         |

### State

| Field            | Type   | Description                               |
|------------------|--------|-------------------------------------------|
| chain_uid        | String | The unique identifier (UID) of the chain. |
| router_contract  | String | The address of the router contract.       |
| hub_channel      | String | The hub channel used by the factory.      |
| admin            | String | The admin address of the factory.         |
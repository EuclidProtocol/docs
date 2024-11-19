---
sidebar_position: 2
---

# Chain Config

Queries chain config information for wallets like Keplr, Leap etc...

```graphql
query Chain_config($chainUid: String, $chainId: String) {
  chains {
    chain_config(chain_uid: $chainUid, chain_id: $chainId) {
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
    --data '{"query":"query Chain_config($chainUid: String, $chainId: String) {\n  chains {\n    chain_config(chain_uid: $chainUid, chain_id: $chainId) {\n      chain_id\n      factory_address\n      display_name\n      explorer_url\n      chain_uid\n      logo\n    }\n  }\n}","variables":{"chainUid":"osmosis","chainId":"osmo-test-5"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMIAWAhgJZID6UESAZlQOYAUAJFJTQKpUw6IgGUUeGqwA0RbryQBJIaPGSAlEWAAdJESI9qSAM6adevQZr1GLDpboxBwuYYFgZ92k9n2lG7brmFvJeYGZBREwUUCgQhLQUYGB4CEZG4UFgVEYADgA2FAS0SBSIGeYIAB75cfi0MHh55cGG9YLNRHkQrBDlAL7hA0h9IFIgAG4UEhQARnmpGCABelog9m6rwqsQRnA72atS4au%2BYRhE27sQALQoqSjXAKyrOiN9QA)

### Arguments

- **chainId** (String!): The Id of the chain config being used.
- **chainUid** (String!): The unique Id for the chain. 


### Return Fields

| **Field**          | **Type** | **Description**                                      |
|--------------------|----------|------------------------------------------------------|
| `factory_address`  | `String` | The contract address of the factory contract on that chain.                 |
| `chain_uid`        | `String` | The unique identifier (UID) of the chain.             |
| `display_name`     | `String` | The display name of the chain.                       |
| `logo`             | `String` | The URL or reference to the chain's logo image.      |
| `chain_id`         | `String` | The chain Id for the chain config. |
| `explorer_url`     | `String` | The URL to the blockchain explorer for this chain.   |
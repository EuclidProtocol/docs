---
sidebar_position: 6
---
# Chain UIDs

Queries the factory address, unique identifier (UID), name and logo for a specified chain using its chain ID.

```graphql
query Chain_id($chainId: String!) {
  chains {
    chain_uids(chain_id: $chainId) {
      factory_address
      chain_uid
      display_name
      logo
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Chain_id($chainId: String!) {\n  chains {\n    chain_uids(chain_id: $chainId) {\n      factory_address\n      chain_uid\n      display_name\n      logo\n    }\n  }\n}","variables":{"chainId":"localpoola-1"}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMIAWAhgJZID6VYAFACRSU0CSY6RAyinhoBzAIQBKIsAA6SIkTbUkAZ0ky5chTVowGSxproMerdki4Tps9XIBmFKCgiFaFMGDwIlStdfmntDD7WYFRKAA4ANhQEtEgUiEHqERBCEIkAvj6ZSOkgADQgAG4UghQARhGeGCCWclIgBlz1PPXJUBQRYRAQUQC0AIz1MrnpQA)

### Arguments

- **chainId** (String!): The unique identifier of the chain.

### Return Fields

| **Field**          | **Type** | **Description**                                      |
|--------------------|----------|------------------------------------------------------|
| `factory_address`  | `String` | The address of the factory contract.                 |
| `chain_uid`        | `String` | The unique identifier (UID) of the chain.            |
| `display_name`     | `String` | The display name of the chain.                       |
| `logo`             | `String` | The URL or reference to the chain's logo image.      |
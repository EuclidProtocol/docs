---
sidebar_position: 7
---

# All Chain UIDs
Queries the factory address, unique identifier (UID), name and logo for a all chains.

```graphql
query All_chain_uids {
  chains {
    all_chain_uids {
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
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query All_chain_uids {\n  chains {\n    all_chain_uids {\n      factory_address\n      chain_uid\n      display_name\n      logo\n    }\n  }\n}","variables":{}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMIAWAhgJZIDORwAOkkUVJTfUy60RQDb8A%2Bu2pIhMKmC7NevAGYUoKCISEUwYPAlq1Zcth3GSw%2BuWCq0ADvwoEhSCojO9%2BEAOYQXAX32%2Bk3iAANCAAbhR4VBQARvw6GCAg3kA)


### Return Fields

| **Field**          | **Type** | **Description**                                      |
|--------------------|----------|------------------------------------------------------|
| `factory_address`  | `String` | The address of the factory contract.                 |
| `chain_uid`        | `String` | The unique identifier (UID) of the chain.            |
| `display_name`     | `String` | The display name of the chain.                       |
| `logo`             | `String` | The URL or reference to the chain's logo image.      |
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
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query All_chain_uids {\n  chains {\n    all_chain_uids {\n      factory_address\n      chain_uid\n      display_name\n      logo\n    }\n  }\n}","variables":{}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAIIA2ZA%2BlABYCGAlkpTA2AM5HAA6SRRtRkk48%2B-InQrV6TFmxG9x4gGZ0oKCIUp0wYPAnbtFSgTOaswxpWAbsADmToFKSOoiviyEAOYQPAX2NApH8QABoQADc6PAY6ACMyAwwQUVD-IA)


### Return Fields

| **Field**          | **Type** | **Description**                                      |
|--------------------|----------|------------------------------------------------------|
| `factory_address`  | `String` | The address of the factory contract.                 |
| `chain_uid`        | `String` | The unique identifier (UID) of the chain.            |
| `display_name`     | `String` | The display name of the chain.                       |
| `logo`             | `String` | The URL or reference to the chain's logo image.      |
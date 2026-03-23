---
sidebar_position: 4
description: "Virtual Balance Queries"
---

# Unified User Balance
Queries the unified virtual token balances for a user across multiple chains.

```graphql
query Unified_user_balance($address: String!, $limit: Int, $offset: Int, $chainUids: [String]) {
  vcoin {
    unified_user_balance(address: $address, limit: $limit, offset: $offset, chain_uids: $chainUids) {
      balances {
        amount
        token_id
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
    --url 'https://api.euclidprotocol.com/graphql' \
    --data '{"query":"query Unified_user_balance($address: String!, $limit: Int, $offset: Int, $chainUids: [String]) {\n  vcoin {\n    unified_user_balance(address: $address, limit: $limit, offset: $offset, chain_uids: $chainUids) {\n      balances {\n        amount\n        token_id\n      }\n      chain_uid\n    }\n  }\n}","variables":{"address":"0x887e4aac216674d2c432798f851c1ea5d505b2e1","limit":2,"offset":1,"chainUids":null}}'
```

[Open in Playground](https://api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAKpICWAZuQmAPowDO%2BdARgIYA27SUCAFABJ2YMHgSNG6IgGUUeckgDmAQgA0RQZ3JxyKaQElUGwREqVm%2BokZQmoAC3aKS5MFKIBtOQuUBdAJREwAA6SEREAG5QEIpBoeHhMBTUtAzMeGxcPHz8ImIS7sKi4pIa2rpWWjp6GmYWCJV1lhoOTkgMroWtzp2BIWEJ4RzcvBJxA4Ph7HAQSSjxk%2BEoEADWyHSuC4MAvlsJ3e0wmxNEuwNn2yBqIBHsCuysnBIYIP3hwSB5JYwf0h8ADAAPAAcwIA7AgACzsdhQABMAEYAGxIsGQsBwqCQgDMcLBAE5gZRgQBWBFQBEIdgksAk-4k1hwhAIj5qBYfcp6X5EOFsgYfJoNbkIvnvEAHFxublIGCcTihS7bIA)

### Arguments

| **Argument** | **Type**      | **Description**                                                                 |
|--------------|---------------|---------------------------------------------------------------------------------|
| `address`    | `String!`     | The user address to query balances for.                                         |
| `limit`      | `Int`         | Optional limit for pagination.                                                  |
| `offset`     | `Int`         | Optional offset for pagination.                                                 |
| `chainUids`  | `[String]`    | Optional list of chain UIDs to filter results.                                  |

### Return Fields

| **Field**    | **Type**     | **Description**                                                                 |
|--------------|--------------|---------------------------------------------------------------------------------|
| `chain_uid`  | `String`     | The chain UID for the returned balances.                                        |
| `balances`   | `[Object]`   | List of token balances for the chain.                                           |
| `amount`     | `String`     | The amount of the token in the user's balance.                                  |
| `token_id`   | `String`     | The identifier of the token.                                                    |

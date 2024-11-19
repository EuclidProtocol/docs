---
sidebar_position: 2
description: "Virtual Balance Queries"
---

# User Balance
Queries the balance of the specified user address on the specified chain.

```graphql
query Vcoin($user: CrossChainUserInput) {
  vcoin {
    user_balance(user: $user) {
      balances {
        amount
        token_id
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
    --data '{"query":"query Vcoin($user: CrossChainUserInput) {\n  vcoin {\n    user_balance(user: $user) {\n      balances {\n        amount\n        token_id\n      }\n    }\n  }\n}","variables":{"user":{"address":"nibi1...","chain_uid":"nibiru"}}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGpQQCWSAFACQwDO%2B6RAwnhAw6wBYCGVAKpM8ASSQAHGCgCURYAB0kRIgDdyVeUpUrG%2BAPoAjPgBs%2BSKAmp68LeiLmLlOlcbMWEDLc5cq%2BcCBhUbV8VFAgAa2R9CjAQlwBfeKIk51TUkAAaEFU%2BPAo%2BQxNPDBAnFQUQG0qWcp1KvjAwPE8GGqJKpApDCgBGADpByszkyqh%2BKn0YWPbO7oo8GEqQ9JAEoA)


- **user** (CrossChainUserInput): The input specifying the user for the balance query by specifying the user address and chain UID.

### Return Fields

| **Field**                  | **Type**   | **Description**                                             |
|------------------------|--------|---------------------------------------------------------|
| `amount`                 | `String` | The amount of tokens in the user's balance.                              |
| `token_id`               | `String` | The identifier of the token.                            |





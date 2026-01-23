---
sidebar_position: 1
description: "Virtual Balance Queries"
---

# Balance
Queries the the balance information for a token on the spcified chain. Only for voucher tokens.

```graphql
query Vcoin($balanceKey: BalanceKeyInput) {
  vcoin {
    balance(balance_key: $balanceKey) {
      amount
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Vcoin($balanceKey: BalanceKeyInput) {\n  vcoin {\n    balance(balance_key: $balanceKey) {\n      amount\n    }\n  }\n}","variables":{"balanceKey":{"cross_chain_user":{"address":"0x887e4aac216674d2c432798f851c1ea5d505b2e1","chain_uid":"ronin"},"token_id":"euclid"}}}'

```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGpQQCWSAFACQBGAhgDaNJQIDSCB6RAQizYduBAJJIADjBQBKIsAA6SIkQBu5KguWrVTVuwTV9whAH0A1jz4Mhh0fKUrdqxnAgxUO3QF9vfpB8QABoQNUY8CkZ6ZgQAZwwQJ1VFEBN7HlS%2BZN1UqDwIOLizKAALRiozGDj8LO1nF1TGMDA8eLi61IAGAA8ADj6AdgQAFkZGKAAmAEYANlnBkbBJqBGAZknBgE4%2BgDM%2BgFZpqGmERgOwA66D%2BkmEadTg70aQMoqkKoowTpACpCpUs8iD4ng0iKkUBArB8vj8EDAoMxYSB-Mogj4gA)

### Arguments

| **Argument**   | **Type**            | **Description**                                                                 |
|----------------|---------------------|---------------------------------------------------------------------------------|
| `balanceKey`   | `BalanceKeyInput`   | The input key for the balance query. Includes the user address, chain UID, and token ID. |

### Return Fields

| **Field**                  | **Type**   | **Description**                                             |
|------------------------|--------|---------------------------------------------------------|
| `amount`                 | `String` | The amount of virtual tokens in the balance for the specified user.                             |

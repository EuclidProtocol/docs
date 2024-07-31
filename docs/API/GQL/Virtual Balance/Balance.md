---
sidebar_position: 1
description: "Virtual Balance Queries"
---

# Balance
Queries the the balance information for a token on the spcified chain.

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
    --url 'https://api.staging.euclidprotocol.com/graphql' \
    --data '{"query":"query Vcoin($balanceKey: BalanceKeyInput) {\n  vcoin {\n    balance(balance_key: $balanceKey) {\n      amount\n    }\n  }\n}","variables":{"balanceKey":{"cross_chain_user":{"address":"nibi1...","chain_uid":"nibiru"},"token_id":"usdt"}}}'

```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGpQQCWSAFACQBGAhgDaNJQIDSCB6RAQizYduBAJJIADjBQBKIsAA6SIkQBu5KguWrVTVuwTV9whAH0A1jz4Mhh0fKUrdqxnAgxUO3QF9vfpB8QABoQNUY8CkZ6ZgQAZwwQJ1VFEBN7HlS%2BZN1UqDwIOLizKAALRiozGDj8LO1nF1TGMDA8eLi61KQKegoARgA6IdTg70aQMoqkKoowTpBu3rwYVLGiH1GGolSUCCtp2fnqsBRV5wCgnyA)

### Arguments

- **balanceKey** (BalanceKeyInput): The input key to specify the balance query. It includes the address of the user, the chain UID and the token Id for which we want to get the balance for.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| amount                 | String | The amount of tokens in the balance for the specified user.                             |

---
sidebar_position: 5
description: "Virtual Balance Queries"
---

:::danger
Change to non staging link when you get the chance. 
:::

:::note
You can test any of the queries in the [GraphQL Playground](https://api.staging.euclidprotocol.com/).  
:::


## Balance
Queries the the balance information for a token on the spcified chain.

:::danger
ask about this
:::

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
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Vcoin($balanceKey: BalanceKeyInput) {\n  vcoin {\n    balance(balance_key: $balanceKey) {\n      amount\n    }\n  }\n}","variables":{"balanceKey":{"cross_chain_user":{"address":"0xRecipientAddress1","chain_uid":"chaina"},"token_id":"usdt"}}}'

```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGpQQCWSAFACQBGAhgDaNJQIDSCB6RAQizYduBAJJIADjBQBKIsAA6SIkQBu5KguWrVTVuwTV9whAH0A1jz4Mhh0fKUrdqxnAgxUO3QF9vfpB8QABoQNUY8CkZ6ZgQAZwwQJ1VFEBN7HlS%2BZN1UqDwIOLizKAALRiozGDj8LO1nF1TGMDA8eLi61IAGAA8AJQQoCkkKZBQAQRa2ooBGVODvRpAyiqQqijBO5fKqRlTFoh8FhqJUlAgrNY2t6rAUfecAoJ8gA)

### Arguments

- **balanceKey** (BalanceKeyInput): The input key to specify the balance query. It includes the address of the user, the chain UID and the token Id for which we want to get the balance for.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| amount                 | String | The amount of tokens in the balance for the specified user.                             |


## State
Queries the state for the virtual balance contract.

```graphql
query Vcoin {
  vcoin {
    state {
      router
      admin
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Vcoin {\n  vcoin {\n    state {\n      router\n      admin\n    }\n  }\n}"}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGpQQCWSRwAOtUQG7lU31EdEDOKAhigjYNORPBBgC87EUV5g4VaRwC%2B01UmUgANCEa88FXgCMANgi4YQIZUA)

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| router                 | String | The contract address of the router.                              |
| admin                  | String | The address of the admin for the VBalance contract.                |

## User Balance
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
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Vcoin($user: CrossChainUserInput) {\n  vcoin {\n    user_balance(user: $user) {\n      balances {\n        amount\n        token_id\n      }\n    }\n  }\n}","variables":{"user":{"address":"0xSenderAddress","chain_uid":"chainb"}}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGpQQCWSAFACQwDO%2B6RAwnhAw6wBYCGVAKpM8ASSQAHGCgCURYAB0kRIgDdyVeUpUrG%2BAPoAjPgBs%2BSKAmp68LeiLmLlOlcbMWEDLc5cq%2BcCBhUbV8VFAgAa2R9CjAQlwBfeKIk51TUkAAaEFU%2BPAo%2BQxNPDBAnFQUQG0qWcp1KvjAwPE8GGqJKgAYADwBlZDB8AEEmlq5KzOTKqH4qfRhY9unZpENKkPSQBKA)


- **user** (CrossChainUserInput): The input specifying the user for the balance query by specifying the user address and chain UID.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| balances               | [BalanceInfo](#balanceinfo) | The balance information for the user.                    |

### BalanceInfo

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| amount                 | String | The amount of tokens in the balance.                              |
| token_id               | String | The identifier of the token.                            |





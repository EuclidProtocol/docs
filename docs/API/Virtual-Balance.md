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
:::dange
ask about this
:::
```graphql
query Vcoin($contract: String!, $balanceKey: BalanceKeyInput) {
  vcoin(contract: $contract) {
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
    --data '{"query":"query Vcoin($contract: String!, $balanceKey: BalanceKeyInput) {\n  vcoin(contract: $contract) {\n    balance(balance_key: $balanceKey) {\n      amount\n    }\n  }\n}","variables":{"contract":"wasm1vw93hy8tm3xekpz9286428gesmmc8dqxmw8cujsh3fcu3rt0hvdqhxejhj","balanceKey":{"cross_chain_user":{"address":"0xRecipientAddress1","chain_uid":"chaina"},"token_id":"usdt"}}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGpQQCWSAFACTmp4CGUK6RAyinlQOYCEAGiK0ARkwA2TJFAQBpBAXYAhSdNkKCASSQAHGCgCURYAB0kRIgDdyVag24s2Ih81bGzFy0XFSZCal91BAB9AGtFdjE1f00Pc29vJjgIGFQE7wBfDOykTJBBECsmHiZRCQQAZwwQT0tTEFcnBvQGgHcmSrgARis2gE4AZgALAgAOFDhBgA8EMN0AL36AJjGANgAWVd4quDgoMbAsabg2sdgAK0rhwYAzWEG8FAAGYasj4dmL4YuGwQyGkFYooWiYMvVGngIJVKiEoMMmFQQjBKvhQXVEkQGkwwGA8FVKqCGs9pgAlBBQCi6CjIFAAQVx%2BJh3T%2B4O8DXhiKQyIoYCJjQRVCYDTZmX%2BXghKAgEW5vP5KLAKBFXly%2BUyQA)

### Arguments

- **contract** (String!): The contract address of the vCoin to query.
- **balanceKey** (BalanceKeyInput): The input key to specify the balance query.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| amount                 | String | The amount of tokens in the balance.                              |


## State
Queries the state for the virtual balance contract.

```graphql
query Vcoin($contract: String!) {
  vcoin(contract: $contract) {
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
    --data '{"query":"query Vcoin($contract: String!) {\n  vcoin(contract: $contract) {\n    state {\n      router\n      admin\n    }\n  }\n}","variables":{"contract":"wasm1vw93hy8tm3xekpz9286428gesmmc8dqxmw8cujsh3fcu3rt0hvdqhxejhj"}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGpQQCWSAFACTmp4CGUK6RAyinlQOYCEASiLAAOkiJEAbuSrUG3FmyL0IjJcLETJRAM4omKBCPE6deCDCN5TZokzBwqtyQF9b7pK5AAaEFKYeJgAjABsEXQwQLVEQBWZWWPRYgHcmXTgARikUgE4AZgALAgAOFDh8gA8EAGsABwAvXIAmEoA2ABZW3gi4OCgSsCxKuBSS2AArXUL8gDNYfLwUAAZCqSHC6onCidjxb1cgA)

### Arguments

- **contract** (String!): The contract address of the vCoin to query.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| router                 | String | The contract address of the router.                              |
| admin                  | String | The address of the admin for the VBalance contract.                |

## User Balance
Queries the balance of the specified user address on the specified chain.

```graphql
query Vcoin($contract: String!, $user: CrossChainUserInput) {
  vcoin(contract: $contract) {
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
    --data '{"query":"query Vcoin($contract: String!, $user: CrossChainUserInput) {\n  vcoin(contract: $contract) {\n    user_balance(user: $user) {\n      balances {\n        amount\n        token_id\n      }\n    }\n  }\n}","variables":{"contract":"wasm1vw93hy8tm3xekpz9286428gesmmc8dqxmw8cujsh3fcu3rt0hvdqhxejhj","user":{"address":"0xSenderAddress","chain_uid":"chainb"}}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGpQQCWSAFACTmp4CGUK6RAyinlQOYCEAGiK0YAZ3zsAwnghixUgBZMqAVQl4AkkgAOMFAEoiwADpIiRAG7kq1BtxZsR95qyOnzFouPwB9AEZMADZMSFAI1D547KIa7mZeXoEhYQhixgmJXkxwEDComVlEKBAA1si%2BFGCFXgC%2BNfWejbUggiCWTDxM-kFpGCAeJiAujkPsQwDuTGJwAIyWEwCcAMyKBAAcKHDLAB4IpToAXosATOsAbAAsZ7xpcHBQ62BYO3AT67AAVmKKywBmsGWeBQAAZFJZnoo9p9FJ8hoIzEMomMMp4hkwwGA8GkxGMhiCdhxkGB8ABBTHY%2BTwzJDKDKKi%2BGBVFG0%2BlIfxDMzNEC1IA)


- **contract** (String!): The contract address of the VBalance contract.
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





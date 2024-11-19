---
sidebar_position: 1
---

# Balance

Queries the amount of CW20 tokens (LP tokens) held by the specified user for the specified address and chain.

```graphql
query Cw($contract: String!, $chainUid: String!, $address: String!) {
  cw(contract: $contract, chain_uid: $chainUid) {
    balance(address: $address) {
      balance
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Cw($contract: String!, $chainUid: String!, $address: String!) {\n  cw(contract: $contract, chain_uid: $chainUid) {\n    balance(address: $address) {\n      balance\n    }\n  }\n}","variables":{"chainUid":"stargaze","contract":"stars153umqx0alxjpckcrdkl06z5ysft6w5fjs5ydhtduu2jak4fzut9sx2wsu0","address":"stars14hcxlnwlqtq75ttaxf674vk6mafspg8xj0h7fj"}}'
```
[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMIDuAFACRQSp4CGUK6RAyingJZIDmAhABoiNABYMeAVS5hWHbnyEiGYMHgQBnDXM48BASiLAAOkiJEolWvSYsR1zreFRxPAPowZrMRKTSwhiZm5kQARgwANgxIUAgUKmqa2sqq6lqBpiEh4VExCJkhAL4FxUiFIIIgAG4M3AyhEZoYIEHmxiAuvv7trO0aKLW8DABe%2BRUF7Q6MzD1EfQN4GgCMAKwAzPBYAB4ADJFbAFYADlAA1lB4YKcROwBswysEGgBmKLdkK88HGo9goihgGAwABMBwYpwALM9hjAUABODRbYFkDQwHbtQQTEAJNIaWbzWrLCGiKBbCJIMgRLAoLAAdhWKAGW2et1pEKqp1ucAYzw0R14AA5DjtRLSvhjTOVCkA)

### Arguments

- **chainUid** (String!): The unique Id for the chain that the CW20 is deployed on. 
- **contract** (String!): The contract address of the CW20 contract.
- **address**  (String!): The user address to query the balance for.


### Return Fields

| **Field**         | **Type**   | **Description**                                     |
|---------------|--------|-------------------------------------------------|
| `balance`   | `String`    | The number of LP tokens held by the user.    |

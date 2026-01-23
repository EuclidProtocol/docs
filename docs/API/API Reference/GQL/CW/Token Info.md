---
sidebar_position: 1
---

# Token Info

Queries token information for the specified CW20 address and chain.

```graphql
query Cw($contract: String!, $chainUid: String!) {
  cw(contract: $contract, chain_uid: $chainUid) {
    token_info {
      name
      symbol
      decimals
      total_supply
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Cw($contract: String!, $chainUid: String!) {\n  cw(contract: $contract, chain_uid: $chainUid) {\n    token_info {\n      name\n      symbol\n      decimals\n      total_supply\n    }\n  }\n}","variables":{"chainUid":"stargaze","contract":"stars153umqx0alxjpckcrdkl06z5ysft6w5fjs5ydhtduu2jak4fzut9sx2wsu0"}}'
```
[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMIDuAFACRQSp4CGUK6RAyingJZIDmAhABoiNABYMeAVS5hWHbn34BKIsAA6SIkSiVa9JixF7OB4VHE8A%2BjBmsxEpNLAr1mrURQQA1sks8AZhCqGu7uSAyIIaFEAM4EcABGEAA2UaFgCFBccAzJMWnunii5ljEwAA7lyQQFAL5R9Ui1IIIgAG4M3AwJyQgxGCCuWmog5g5OI6wjMcV4vAwAXggjglEjxozMk0TTszEAjACsAMzwWAAeAAy55wBW5VBeUHhgXsmXAGwLhwQx-igfMiHfy3GI-MCiFBgGAwABMtwYXgALP4FjAUABOGLnWFkMqXFYaZq1IA)

### Arguments

- **chainUid** (String!): The unique Id for the chain that the CW20 is deployed on. 
- **contract** (String!): The contract address of the CW20 contract.

### Return Fields

| **Field**        | **Type**     | **Description**                          |
|--------------|----------|--------------------------------------|
| `name`         | `String` | The name of the token.          |
| `symbol`       | `String` | The symbol of the token.        |
| `decimals`     | `u8`     | The number of decimal places of the token. |
| `total_supply` | `Uint128`| The total supply of the token.  |
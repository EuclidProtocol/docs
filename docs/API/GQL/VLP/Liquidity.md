---
sidebar_position: 5
---

## Liquidity 

Queries liquidity information for the specified VLP address.

```graphql
query Liquidity($contract: String!) {
  vlp(contract: $contract) {
    liquidity {
      pair {
        token_1
        token_2
      }
      token_1_reserve
      token_2_reserve
      total_lp_tokens
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Liquidity($contract: String!) {\n  vlp(contract: $contract) {\n    liquidity {\n      pair {\n        token_1\n        token_2\n      }\n      token_1_reserve\n      token_2_reserve\n      total_lp_tokens\n    }\n  }\n}","variables":{"contract":"nibi1pys22jem6l222sxhexe7dmggtz8xkmhm49p7z3wjgrcdk3t46hgsle088m"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABADICWOZYZKBAFACRQSp4CGUK6RAyinmSQBzAIQBKIsAA6SIkQBuAGwAOdZqw5ciTFv00TpsuUUUUYVGsUPHjytmTySZNmyggBrZAH0AjM5dybp5IXgBM-jYAvhHGQd4%2BXngIAM748ggxgR7eoYkpaRlGrhAobIpeKl5xSMkx0Ub1kSAANCDybAJsAEaKKRgg1kRSIOp6nMPcw0hkXWQ%2BygTJoaEAVghwAGyKy6HJAB4AFgh7CADsYHBCQigAXgAce%2B5wB3AALACcyqc3AMwA7ishHgoGB3D8UK8NgchMlegAGO53ODDGRNSJAA)

### Arguments

- **contract** (String!): The contract address of the VLP to query.

### Return Fields

| **Field**                  | **Type**   | **Description**                                             |
|------------------------|--------|---------------------------------------------------------|
| `pair`                   | [`Pair`](#pair) | The token pair information.                            |
| `token_1_reserve`        | `String` | The reserve amount of the first token.                  |
| `token_2_reserve`        | `String` | The reserve amount of the second token.                 |
| `total_lp_tokens`        | `String` | The total number of liquidity provider tokens.          |

### Pair

| **Field**                  | **Type**   | **Description**                                             |
|------------------------|--------|---------------------------------------------------------|
| `token_1`                | `String` | The identifier of the first token in the pair.          |
| `token_2`                | `String` | The identifier of the second token in the pair.         |

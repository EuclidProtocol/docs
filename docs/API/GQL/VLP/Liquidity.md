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
    --data '{"query":"query Liquidity($contract: String!) {\n  vlp(contract: $contract) {\n    liquidity {\n      pair {\n        token_1\n        token_2\n      }\n      token_1_reserve\n      token_2_reserve\n      total_lp_tokens\n    }\n  }\n}","variables":{"contract":"nibi147sw04ts68nxe80946m332rr8j79qqvas386al8d76jhamnnr99qj6xnfs"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABADICWOZYZKBAFACRQSp4CGUK6RAyinmSQBzAIQBKIsAA6SIkQBuAGwAOdZqw5ciTFv00TpsuUUUUYVGsUPHjytmTySZNmyggBrZAH0AjM5dybp5IXgBM-jYAvhHGQd4%2BXngIAM748ggxgR7eoYkpaRlGrhAobIpeKl5xSMkx0Ub1kSAANCDybAJsAEaKKRgg1kRSIOp6nMPcw0hkXWQ%2BACwA7MkA7gAM8yjJAGwAHEgAHgi7awCc89twAMxXoXh4uwBWi6dYWO3JV7vbZbtgi9tHgALNhwJBIPCnV6PbYHJAAM1qIBkTUiQA)

### Arguments

- **contract** (String!): The contract address of the VLP to query.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| pair                   | [Pair](#pair) | The token pair information.                            |
| token_1_reserve        | String | The reserve amount of the first token.                  |
| token_2_reserve        | String | The reserve amount of the second token.                 |
| total_lp_tokens        | String | The total number of liquidity provider tokens.          |

### Pair

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| token_1                | String | The identifier of the first token in the pair.          |
| token_2                | String | The identifier of the second token in the pair.         |

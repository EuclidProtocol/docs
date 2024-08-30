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
    --url 'https://api.euclidprotocol.com/graphql' \
    --data '{"query":"query Vlp($contract: String!) {\n  vlp(contract: $contract) {\n    liquidity {\n      pair {\n        token_1\n        token_2\n      }\n      token_1_reserve\n      token_2_reserve\n      total_lp_tokens\n    }\n  }\n}","variables":{"contract":"nibi1m4ns69zvkk2zv0946mw298tlky5ckvu08rtxggtg29p784kc5sxqa9u8ly"}}'
```

[Open in Playground](https://api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGoA2ADgBQAkUEqeAhlCukQMop4CWSA5gEIAlEWAAdJESIA3SlXqMWbInQbdloiVOlEyPHDzA8Uxbbt0UmPPGMkWLKCAGtkAfQCM9h9KeukbgBM3hYAviG6fu4ebngIAM74MggRvi7ugbEJSSk6jhAoTGRulG5RSPER4TrVoSAANCAyTLxMAEZkCRgg5kTiIIoarP3s-Ug8bTwecAAsFQBsAJwAXjLOzoGrAAyLM-NwAO6BiwAcKGTOBACsUM4yMFsneCgAHvz8KPzHFADsJzPOKBXeIvLBMRYwE5kAj9eqSOqhIA)

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

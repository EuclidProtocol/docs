---
sidebar_position: 1
---

# Pool 
Queries the LP reserves and shares for the specified VLP on the specified chain.

```graphql
query Vlp($contract: String!, $chainUid: String!) {
  vlp(contract: $contract) {
    pool(chain_uid: $chainUid) {
      reserve_1
      reserve_2
      lp_shares
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.euclidprotocol.com/graphql' \
    --data '{"query":"query Vlp($contract: String!, $chainUid: String!) {\n  vlp(contract: $contract) {\n    pool(chain_uid: $chainUid) {\n      reserve_1\n      reserve_2\n      lp_shares\n    }\n  }\n}","variables":{"contract":"nibi1m4ns69zvkk2zv0946mw298tlky5ckvu08rtxggtg29p784kc5sxqa9u8ly","chainUid":"nibiru"}}'
```

[Open in Playground](https://api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGoA2ADgBQAkUEqeAhlCukQMop4CWSA5gEIAlEWAAdJESIA3SlXqMWbInQbdloiVOlEmZMgH0KECGQDOYybt0mzl7TZtQAFkz6GYPMNafS7ZFY6ftJ4COb4MgiGAIy%2BIURhEXhRhgBM8SGUhuZuSZk2AL4FRMXBpb5lhSAANCAyTLxMAEZk4RggjkTiIIoarD3sPUg8zTwxcAAsSOYAbACcAF4yANYracsADPOTs3AA7mnzABwoZCsEAKxQKzIwm8d4KAAe-Pwo-EcUAOzHkytQS7mZ5YJjzGDHMgEHo1STVQpAA)

### Arguments

- **chainUid** (String!): The unique identifier of the chain that hosts the LP tokens.
- **contract** (String!): The contract address of the VLP to query.

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| reserve_1              | String | The reserve amount of the first token.                  |
| reserve_2              | String | The reserve amount of the second token.                 |
| lp_shares              | String | The number of liquidity provider shares.                |

---
sidebar_position: 2
---
# All Pools
Queries all the LP reserves and shares on all the chains for the specified VLP.

```graphql
query Vlp($contract: String!) {
  vlp(contract: $contract) {
    all_pools {
      pools {
        chain_uid
        pool {
          reserve_1
          reserve_2
          lp_shares
        }
      }
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.euclidprotocol.com/graphql' \
    --data '{"query":"query Vlp($contract: String!) {\n  vlp(contract: $contract) {\n    all_pools {\n      pools {\n        chain_uid\n        pool {\n          reserve_1\n          reserve_2\n          lp_shares\n        }\n      }\n    }\n  }\n}","variables":{"contract":"nibi1m4ns69zvkk2zv0946mw298tlky5ckvu08rtxggtg29p784kc5sxqa9u8ly"}}'
```

[Open in Playground](https://api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGoA2ADgBQAkUEqeAhlCukQMop4CWSA5gEIAlEWAAdJESIA3SlXqMWbInQbdloiVOlEmZMgH0KECGQDOYybt0mzl7TZtQAFkz6GYPMNafS7ZFY6ftJ4COb4MgiGAIy%2BIURhEXhRhgBM8SGUhuZuSZk2AL4FRMXBpb5lhSAANCAyTLxMAEZk4RggjkTiIIoarD3sPQDuTOZwMQBeLi4AZsMuMAQEUAAcqwBWYHgArHhIUEgA7DswswAMZLMAzBQoTAAsZMMA1gBsq2BvBEcyBwRYAAegIMeBwSDek2QPRqkmqhSAA)


### Arguments

- **contract** (String!): The contract address of the VLP.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| chain_uid              | String | The unique identifier (UID) of the chain.               |
| pool                   | [PoolInfo](#poolinfo) | Detailed information about the pool.                   |

### PoolInfo

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| reserve_1              | String | The reserve amount of the first token.                  |
| reserve_2              | String | The reserve amount of the second token.                 |
| lp_shares              | String | The number of liquidity provider shares.                |

### Arguments

- **contract** (String!): The contract address of the VLP to query.
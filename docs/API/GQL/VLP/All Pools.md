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
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Vcoin($contract: String!) {\n  vlp(contract: $contract) {\n    all_pools {\n      pools {\n        chain_uid\n        pool {\n          reserve_1\n          reserve_2\n          lp_shares\n        }\n      }\n    }\n  }\n}","variables":{"contract":"nibi147sw04ts68nxe80946m332rr8j79qqvas386al8d76jhamnnr99qj6xnfs"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGpQQCWSAFACTmp4CGUK6RAyinlQOYCEASiLAAOkiJEAbgBsADtQbcWbIvQiMVwsRMlEmMmQH05ECDIDOI8Xr2nzVnbdtQAFkypGYFMDeeT7GWtdf0k8BAt8KQQjAEY-UKJwyLxoowAmBND5Iwt3ZKzbAF9CohKQsr9y8pAAGhApJh4mACMZCIwQJyJRECVmVl72XqQKFopYgBYAdgsAdwAGSZQLADYADiQADwR1hYBOSdW4AGYT9Lw8dYAraf2sLEaLE-XVg3WwadXr9zgkJDw%2B3u11WWyQADMLL1xEUQEUgA)


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
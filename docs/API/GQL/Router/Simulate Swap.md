---
sidebar_position: 8
---
# Simulate Swap
Simulates a swap operation and returns the amount to be received for the swap.

```graphql
query Query($assetIn: String!, $amountIn: String!, $assetOut: String!, $minAmountOut: String!, $swaps: [String!]) {
  router {
    simulate_swap(asset_in: $assetIn, amount_in: $amountIn, asset_out: $assetOut, min_amount_out: $minAmountOut, swaps: $swaps) {
      amount_out
      asset_out
    }
  }
}
```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/graphql' \
    --data '{"query":"query Query($assetIn: String!, $amountIn: String!, $assetOut: String!, $minAmountOut: String!, $swaps: [String!]) {\n  router {\n    simulate_swap(asset_in: $assetIn, amount_in: $amountIn, asset_out: $assetOut, min_amount_out: $minAmountOut, swaps: $swaps) {\n      amount_out\n      asset_out\n    }\n  }\n}","variables":{"assetIn":"osmo","amountIn":"10","assetOut":"atom","minAmountOut":"1","swaps":["osmo","usdt","usdc","atom"]}}'

```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAIq6EAUAJAIYDOdCKAkkukQMop4CWSA5gEIANEVpwIMVK3ZdeAkWPqMUAeRgpZ3PkNFU4fAIISpajVvm6xdAO40ADnXYBtOTsEBdAJRFgAHSQiIjxJFHxfAKCguh44GAAbGjCAfVsHCmUmZL52WgYmVlEaE1RstiUSliQi-JRk0NzMsxRRAyRk4slShrE24y7m0TTHXOG6H39AqKDO03qNSOmiJvmURaCAX0WtpA2QYRAANxpeGgAjeIQ6DBBJvxAm1nv2e4g6CXvhAPvZ6SRnoj3ACMAAZPt8HrV1GsMICHigIHBwf8QH1KtCAcDkUF7mMAc5Xu8IOCQDA6GAYV9SeSoCSkoj7h4AnsNkA)

### Arguments

- **assetIn** (String!): The identifier of the input asset.
- **amountIn** (String!): The amount of the input asset to swap.
- **assetOut** (String!): The identifier of the output asset.
- **minAmountOut** (String!): The minimum amount of the output asset expected from the swap.
- **swaps** ([String!]): The list of swaps to execute.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| amount_out             | String | The amount of the output asset received from the swap.  |
| asset_out              | String | The identifier of the output asset.                     |
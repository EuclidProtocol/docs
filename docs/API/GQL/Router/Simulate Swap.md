---
sidebar_position: 8
---
# Simulate Swap
Simulates a swap operation and returns the amount to be received for the swap.

```graphql
query Simulate_swap($assetIn: String!, $amountIn: String!, $assetOut: String!, $minAmountOut: String!, $swaps: [String!]) {
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
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Simulate_swap($assetIn: String!, $amountIn: String!, $assetOut: String!, $minAmountOut: String!, $swaps: [String!]) {\n  router {\n    simulate_swap(asset_in: $assetIn, amount_in: $amountIn, asset_out: $assetOut, min_amount_out: $minAmountOut, swaps: $swaps) {\n      amount_out\n      asset_out\n    }\n  }\n}","variables":{"assetIn":"euclid","amountIn":"1000","assetOut":"nibi","minAmountOut":"1","swaps":["euclid","nibi"]}}'

```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMoCWcMANgIYoID6AzgO40AOAFACQ1NMIUASSTpSKPGSQBzAIQAaIrzgQYqEWJISpcxb36CA8jBSbtMhUrhSAgirUpjp8ZIt7WHJmIDaW13IBdAEoiYAAdJCIiPFV6PFCIqKimCmo6Rg8uPgEUBikxfRyRRRp7VDzRJVLVdSQSg1zYguyjE0VrJAZqhwYmq1syxzaiTK8lUZDwyKSo7vLYxJmiFsaTRaiAX0WtpA2QeRAANxpJGgAjKgQmDBApqLCQFZEHsQeEGCgqMjAH%2BUWHubCJAvIgPACMAAYob9-o8Gk4QQ8kGQzmQYdMHh07DUhihESAwej7iBRiDvG8Pl8fvskSi0SAAhE9hsgA)

### Arguments

- **assetIn** (String!): The identifier of the input asset.
- **amountIn** (String!): The amount of the input asset to swap.
- **assetOut** (String!): The identifier of the output asset.
- **minAmountOut** (String!): The minimum amount of the output asset expected from the swap.
- **swaps** ([String!]): The list of swaps to execute.

### Return Fields

| **Field**                  | **Type**   | **Description**                                             |
|------------------------|--------|---------------------------------------------------------|
| `amount_out`             | `String` | The amount of the output asset received from the swap.  |
| `asset_out`              | `String` | The identifier of the output asset.                     |
---
sidebar_position: 3
---

# Fees Collected

Queries the total amount of fees collected by Euclid pools in USD.

```graphql
query Fees_collected {
  pool {
    fees_collected {
      total_overall
      breakdown {
        token1
        token2
        total_fee
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
    --data '{"query":"query Fees_collected {\n  pool {\n    fees_collected {\n      total_overall\n      breakdown {\n        token1\n        token2\n        total_fee\n      }\n    }\n  }\n}"}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGIIIDOA%2BlBADZ0JQoJhHAA6SRRADhPXZcePAGblqtBkxZtO3ETxQQUAQzpUIAN3zq6wxUQBGeBKoDWkAO7d5hkcvPIAjAfuPkAJjeHlajeIIPjwAvj5hChEhIAA0IFqqeACWqkaMFBggICFAA)


### Return Fields

| **Field**               | **Type**   | **Description**                          |
|-------------------------|--------|--------------------------------------|
| `total_overall`          | `String` | The total fees collected overall in USD from all pools.    |
| `breakdown`              | [`FeesBreakdown`](#breakdown) | A breakdown of the fees collected for each token pair. |


### Breakdown

| **Field**               | **Type**   | **Description**                          |
|-------------------------|--------|--------------------------------------|
| `token1`                | `String` | The first token in the pair.         |
| `token2`                | `String` | The second token in the pair.        |
| `total_fee`             | `String` | The total fee collected for this pair in USD. |

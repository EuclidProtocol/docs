---
sidebar_position: 3
---

# Volume

Queries the total and daily volume of transactions and swaps in dollars (USD) on the Eulcid layer.

```graphql
query Pool {
  pool {
    volume {
      volume_24hours
      total_liquidity
      total_volume
      volume_breakdown_24hours {
        pair
        volume
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
    --data '{"query":"query Pool {\n  pool {\n    volume {\n      volume_24hours\n      total_liquidity\n      total_volume\n      volume_breakdown_24hours {\n        pair\n        volume\n      }\n    }\n  }\n}"}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAAoQQA2RwAOkkUQA7lW30NEBul8C1dHDtwq8A%2BgCYALAAsIMPAGcBgoiggoAhhVEUAljl1hdKAssFrN24bzNCeiUQCM8CDQGtIAdyQSZcxfzsKkwauni2gtaIEUQAvrbx7ImxIAA0IJwaeLoajhQIChggILFAA)


### Return Fields

| **Field**               | **Type**   | **Description**                          |
|-------------------------|--------|--------------------------------------|
| `total_volume`           | `String` | The total volume in USD.                    |
| `volume_24hours`         | `String` | The total volume over the past 24 hours in USD.   |
| `total_liquidity`        | `String` | The total liquidity in USD.    |
| `volume_breakdown_24hours` | [`breakdown`](#breakdown) | A breakdown of the volume by token pairs over the past 24 hours. |


### Breakdown
| **Field**               | **Type**   | **Description**                          |
|-------------------------|--------|--------------------------------------|
| `pair`                  | `String` | The token pair being traded.          |
| `volume`                | `String` | The volume for the token pair over the past 24 hours in USD. |

---
sidebar_position: 3
---

# Total Fees Collected

Queries the total amount of fees collected by the specifeid VLP.

```graphql
query Vlp($contract: String!) {
  vlp(contract: $contract) {
    total_fees_collected {
      lp_fees {
        totals {
          denom
          amount
        }
      }
      euclid_fees {
        totals {
          denom
          amount
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
    --data '{"query":"query Vlp($contract: String!) {\n  vlp(contract: $contract) {\n    total_fees_collected {\n      lp_fees {\n        totals {\n          denom\n          amount\n        }\n      }\n      euclid_fees {\n        totals {\n          denom\n          amount\n        }\n      }\n    }\n  }\n}","variables":{"contract":"nibi1pys22jem6l222sxhexe7dmggtz8xkmhm49p7z3wjgrcdk3t46hgsle088m"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGoA2ADgBQAkUEqeAhlCukQMop4CWSA5gEIAlEWAAdJESIA3SlXqMWbInQbdloiVOlEUEFEzIB9AGYIEAZ2P0yZBKwRgxk3bspmLllzrfT9hmTe2n5%2BYMgQcK6hukxwEDCo0aEAvsm6ab66CDBQZDxgnlY%2BMXoGRsHpoeFIkVV%2BcQlJWW6ZqeltRJkpIAA0IDJMvEwARvaWGCAhROIgihqss%2ByzSDwjPACMFASWAEy7AFYIcABsZPu7lgAeABYIVwgA7GBw-PwoAF4AHFcA1nA3OAAFgAnBRHh8AMwAdwO-DwUDAv0hKCBJxu-Es9gADF8vlE%2BpIeikgA)

### Arguments

- **contract** (String!): The contract address of the VLP to query.

### Return Fields

| **Field**                  | **Type**   | **Description**                                             |
|------------------------|--------|---------------------------------------------------------|
| `lp_fees`              | [`LpFees`](#lpfees) | The total fees collected by liquidity providers.         |
| `euclid_fees`          | [`EuclidFees`](#euclidfees) | The total fees collected by Euclid protocol.                      |


### LpFees

| **Field**   | **Type**   | **Description**                       |
|-------------|------------|---------------------------------------|
| `denom`     | `String`   | The denomination of the fee.          |
| `amount`    | `String`   | The total amount of fees in that denomination. |

### EuclidFees

| **Field**   | **Type**   | **Description**                       |
|-------------|------------|---------------------------------------|
| `denom`     | `String`   | The denomination of the fee.          |
| `amount`    | `String`   | The total amount of fees in that denomination. |

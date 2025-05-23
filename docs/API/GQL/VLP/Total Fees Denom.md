---
sidebar_position: 3
---

# Total Fees Collected Per Denom

Queries the total amount of fees collected by the VLP for the specified token denomination.

```graphql
query Vlp($contract: String, $pair: PairInput, $denom: String!) {
  vlp(contract: $contract, pair: $pair) {
    total_fees_collected_per_denom(denom: $denom) {
      lp_fees
      euclid_fees
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Total_fees_collected_per_denom($denom: String!, $contract: String!) {\n  vlp(contract: $contract) {\n    total_fees_collected_per_denom(denom: $denom) {\n      lp_fees\n      euclid_fees\n    }\n  }\n}","variables":{"contract":"nibi1pys22jem6l222sxhexe7dmggtz8xkmhm49p7z3wjgrcdk3t46hgsle088m","denom":"stars"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACoQoCGANgPoBmCCAzjVBFVQlCgmDQA74aYZBDgAKACQikY9EQDKKPAEskAcwCEAGiKS2qPBW7ylqjZoCURYAB0kRIgDcq-cQeXGU8-RENfrOwdHIhRyanpGFjYOLh4%2BQTxhUQkZOT00uED7EJDXSOYc3KIEGCgqFT4GQuDHAF8ihqQ6kG0QJwpVCgAjTiYMECDHWxAPI24R%2BRGkFW6VAEZ%2BAiYAJhWAKwQ4ADYqNZWmAA8ACwRDhAB2MDh1dRQALwAOQ4BrOGO4ABYATn4L%2B4AzAB3dbqPBQMAvAEoT7bY7qJicAAMj0ecBG2iKI0ykyIIyYlDwTAx9hadSAA)

### Arguments

- **contract** (String): The contract address of the VLP. The pair argument should be set if **contract** is not specified.
- **pair** (PairInput): The pair of tokens belonging to the VLP. The contract argument should be set if **pair** is not specified.
- **denom** (String!): The token Id of the token to get the total fees for.

### Return Fields

| **Field**                  | **Type**   | **Description**                                             |
|------------------------|--------|---------------------------------------------------------|
| `lp_fees`              | `LpFees` | The total amount of fees collected by liquidity providers for this denom.         |
| `euclid_fees`          | `EuclidFees` | The total amount of fees collected by Euclid protocol for this denom.                      |


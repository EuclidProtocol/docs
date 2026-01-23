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
    --data '{"query":"query Total_fees_collected_per_denom($denom: String!, $contract: String!) {\n  vlp(contract: $contract) {\n    total_fees_collected_per_denom(denom: $denom) {\n      lp_fees\n      euclid_fees\n    }\n  }\n}","variables":{"contract":"euclid1y2t7uplrund64g3qc034j7pvfnq7udfqck6k5hxnq7gxtdm30zzsxuk8v9","denom":"0g"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACoQoCGANgPoBmCCAzjVBFVQlCgmDQA74aYZBDgAKACQikY9EQDKKPAEskAcwCEAGiKS2qPBW7ylqjZoCURYAB0kRIgDcq-cQeXGU8-RENfrOwdHIhRyanpGFjYOLh4%2BQTxhUQkZOT00uED7EJDXSOYc3KIEGCgqFT4GQuDHAF8ihqQ6kG0QJwpVCgAjTiYMECDHWxAPI24R%2BRHS8sqARgIAJhQAdhh%2BKjwYJDAANgAWdQBmLCgABiP9gCsV-ic6JCw1sDpTgGtdt4BWAAsAD0eK3UfxQYDgRzOAC9IUw-jA3gAOJwAThG2iKI0ykyIIzO6jR9hadSAA)

### Arguments

| **Argument**  | **Type**     | **Description**                                                                   |
|---------------|--------------|-----------------------------------------------------------------------------------|
| `contract`    | `String`     | The contract address of the VLP. Required if `pair` is not provided.             |
| `pair`        | `PairInput`  | The pair of tokens belonging to the VLP. Required if `contract` is not provided. |
| `denom`       | `String!`    | The token Id of the token to get the total fees for.                             |

### Return Fields

| **Field**                  | **Type**   | **Description**                                             |
|------------------------|--------|---------------------------------------------------------|
| `lp_fees`              | `LpFees` | The total amount of fees collected by liquidity providers for this denom.         |
| `euclid_fees`          | `EuclidFees` | The total amount of fees collected by Euclid protocol for this denom.                      |


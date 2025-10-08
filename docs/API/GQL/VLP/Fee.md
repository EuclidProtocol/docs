---
sidebar_position: 3
---

# Fee 
Queries the fees and fee recipients for the specified VLP.

```graphql
query Vlp($contract: String, $pair: PairInput) {
  vlp(contract: $contract, pair: $pair) {
    fee {
      lp_fee_bps
      euclid_fee_bps
      recipient {
        chain_uid
        address
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
    --data '{"query":"query Fee($contract: String!) {\n  vlp(contract: $contract) {\n    fee {\n      lp_fee_bps\n      euclid_fee_bps\n      recipient {\n        chain_uid\n        address\n      }\n    }\n  }\n}","variables":{"contract":"euclid12a4ecpxsz8pz75chryl6wda6fsnqdx8zgn4ykvp0u7v939m50tvswvnvw8"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGIIIAUAJFBKngIZQrpEDKKeAlkgOYCEASiLAAOkiJEAbgBsADhVr0mLIjTqcVwsRMlEAZuRHi9e%2BQH1DCcwCM5AZxOmiCGFBlcwl8rYdPTeAhQXHJcyCjGus5EUAAWDDzmMJ7%2BzgxgYIH2jlF6AL6pBbpFeSAANCBSDNwMNjII9hggOpKiIEqazG2sba7ungCMAEwMACxBcgAe9gBeABxyMwDsAKxxhDIAbADuYAyb%2BvZIWGCTczO8SKMEANZScgAMMEtSAJwAzK9wKw8oUvbbKRIKTbOZtMriUp5IA)

### Arguments

| **Argument** | **Type**     | **Description**                                                                 |
|--------------|--------------|---------------------------------------------------------------------------------|
| `contract`   | `String`     | The contract address of the VLP. Required if `pair` is not provided.           |
| `pair`       | `PairInput`  | The token pair of the VLP. Required if `contract` is not provided.             |

### Return Fields

| **Field**                  | **Type**   | **Description**                                             |
|------------------------|--------|---------------------------------------------------------|
| `lp_fee_bps`             | `Int`    | The liquidity provider fee in basis points (bps).       |
| `euclid_fee_bps`         | `Int`    | The Euclid fee in basis points (bps).                   |
| `recipient`              | [`Recipient`](#recipient) | The recipient details for the fees.    |

### Recipient

| **Field**                  | **Type**   | **Description**                                             |
|------------------------|--------|---------------------------------------------------------|
| `chain_uid`              | `String` | The unique identifier (UID) of the chain.               |
| `address`                | `String` | The address of the fee recipient.                       |
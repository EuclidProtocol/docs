---
sidebar_position: 5
---

# State
Queries information on the state of a VLP contract.

# State

Queries the state of a VLP contract.

```graphql
query Vlp($contract: String, $pair: PairInput) {
  vlp(contract: $contract, pair: $pair) {
    state {
      pair {
        token_1
        token_2
      }
      router
      vcoin
      fee {
        lp_fee_bps
        euclid_fee_bps
        recipient {
          chain_uid
          address
        }
      }
      last_updated
      total_lp_tokens
      pool_config {
        token_1_denom
        token_2_denom
        lp_token_denom
      }
      admin
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query State($contract: String) {\n  vlp(contract: $contract) {\n    state {\n      pair {\n        token_1\n        token_2\n      }\n      router\n      vcoin\n      fee {\n        lp_fee_bps\n        euclid_fee_bps\n        recipient {\n          chain_uid\n          address\n        }\n      }\n      last_updated\n      total_lp_tokens\n      admin\n      pool_config {\n        stable {\n          amp_factor\n        }\n        constant_product\n      }\n    }\n  }\n}","variables":{"contract":"euclid1y2t7uplrund64g3qc034j7pvfnq7udfqck6k5hxnq7gxtdm30zzsxuk8v9"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMooCGKCAFACRQSp7lQrqkp4CWSA5gJRFgAHSREiANwA2AB2oMmLNkXqNOSwSLHiiAZwpUhonTpnkueI9pPiUEANbIA%2BgEZjN2w%2BcAmdyYC%2Bfjp4EDBUeEHiEgw8kUQAZggIVh7isk6JCE4ARjK6ceIIMFBSXGAZSTl5BUR4CFBcMlzIKCmp4lAAFuZITjBlNeLkYGB1uvnWNoGT4tMeUuT6fTJglAhgcXYUUk7pdo5IEx7DcLEzRDIQEDsK8Vy8bR765NlSyVrtQ3AyGUoQEedZjUFM9UE4ZCEwMUUHE5jo4dN-CAADQgCTkbgvN66DAgD5EYQgBTqViE9CEoolMouAjeFAAdhgMikeBgSDAADYACy8ADMWCgAAZeVyAFb0mQSeJILCMsDxAX2Dn2ACsnQAHjL6bx1SgwHBeYKAF5G3TqmD2AAcEgAnITREj-EA)

### Arguments

| **Argument**  | **Type**     | **Description**                                                                   |
|---------------|--------------|-----------------------------------------------------------------------------------|
| `contract`    | `String`     | The contract address of the VLP. Required if `pair` is not provided.             |
| `pair`        | `PairInput`  | The pair of tokens belonging to the VLP. Required if `contract` is not provided. |

### Return Fields

### ContractStateOfVlp

| **Field**          | **Type**       | **Description**                    |
|--------------------|----------------|------------------------------------|
| `admin`            | `String`       | The admin address of the VLP.      |
| `fee`              | `FeeInfo`      | The fee structure of the VLP.      |
| `last_updated`     | `Int`          | Timestamp of the last update.      |
| `pair`             | `Pair`         | The token pair of the VLP.         |
| `pool_config`      | `PoolConfig`   | Pool configuration (token denoms). |
| `router`           | `String`       | The router contract address.       |
| `total_lp_tokens`  | `String`       | Total LP tokens issued.            |
| `vcoin`            | `String`       | Virtual balance token address.     |

### FeeInfo

| **Field**           | **Type**         | **Description**                                        |
|---------------------|------------------|--------------------------------------------------------|
| `lp_fee_bps`        | `Int`            | Fee for liquidity providers (in basis points).        |
| `euclid_fee_bps`    | `Int`            | Fee for Euclid treasury (in basis points).            |
| `recipient`         | [`CrossChainUser`](../../common%20types.md#crosschainuser) | The fee recipient's cross-chain details.              |


### Pair

| **Field**   | **Type**   | **Description**                        |
|-------------|------------|----------------------------------------|
| `token_1`   | `String`   | The identifier of the first token.     |
| `token_2`   | `String`   | The identifier of the second token.    |

### PoolConfig

| **Field**          | **Type**             | **Description**                            |
|--------------------|----------------------|--------------------------------------------|
| `constant_product` | `JSON`               | Configuration for constant product pools.  |
| `stable`           | `StablePoolConfig`   | Configuration for stable pools.            |

### StablePoolConfig

| **Field**     | **Type**   | **Description**                      |
|---------------|------------|--------------------------------------|
| `amp_factor`  | `String`   | Amplification factor for stable pools. |
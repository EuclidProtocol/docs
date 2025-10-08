---
sidebar_position: 11
---
# Token Denoms
Queries the token pair for the specified VLP address. 

```graphql
query Token_denoms($token: String!) {
  router {
    token_denoms(token: $token) {
      denoms {
        chain_uid
        token_type {
          ... on NativeTokenType {
            native {
              denom
            }
          }
          ... on SmartTokenType {
            smart {
              contract_address
            }
          }
          ... on VoucherTokenType {
            voucher
          }
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
    --data '{"query":"query Token_denoms($token: String!) {\n  router {\n    token_denoms(token: $token) {\n      denoms {\n        chain_uid\n        token_type {\n          ... on NativeTokenType {\n            native {\n              denom\n            }\n          }\n          ... on SmartTokenType {\n            smart {\n              contract_address\n            }\n          }\n          ... on VoucherTokenType {\n            voucher\n          }\n        }\n      }\n    }\n  }\n}","variables":{"token":"usdt"}}'

```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAEoQwr4AUAJChANbLpEDKKeAlkgOYCEASiLAAOkiJE85SnmFiJE%2BkyQB9MMghwAzlSXMidRsiGjxCieqSatcs%2BYlQAFgENuKmJzDz7io6pQEAA4Itj7mAHSRRBDiAHLOKJwAbggAKn6pQSGmYfZICcnZ3rnmxSUAvmU%2BlXZhkeHR4qxwzngo6cqZwaElElotbT29ElVhNb3jJfWNRABq5E74HchdRbW5SQuO%2BKPmk9Wj%2B0STNeUg5UA)

### Arguments
| **Name**  | **Type**   | **Description**                        |
|-----------|------------|----------------------------------------|
| `token`   | `String!`  | The token to fetch denoms for.         |


### Return Fields

| **Field**        | **Type**                | **Description**                                              |
|------------------|-------------------------|--------------------------------------------------------------|
| `denoms`         | `[Denom]`               | The list of token representations across different chains.   |

### Denom

| **Field**        | **Type**                | **Description**                                              |
|------------------|-------------------------|--------------------------------------------------------------|
| `chain_uid`      | `String`                | The UID of the chain.                                        |
| `token_type`     | `TokenType` (union)     | The type of token (Native, Smart, or Voucher).               |

### NativeTokenType

| **Field**        | **Type**     | **Description**                    |
|------------------|--------------|------------------------------------|
| `denom`          | `String`     | The native token's denom.          |

### SmartTokenType

| **Field**            | **Type**     | **Description**                        |
|----------------------|--------------|----------------------------------------|
| `contract_address`   | `String`     | The smart contract address of token.   |

### VoucherTokenType

| **Field**  | **Type** | **Description**                   |
|------------|----------|-----------------------------------|
| `voucher`  | `String` | The voucher denomination string.  |

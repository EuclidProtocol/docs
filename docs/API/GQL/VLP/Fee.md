---
sidebar_position: 3
---

# Fee 
Queries the fees and fee recipients for the specified VLP.

```graphql
query Vlp($contract: String!) {
  vlp(contract: $contract) {
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
    --url 'https://api.euclidprotocol.com/graphql' \
    --data '{"query":"query Fee($contract: String!) {\n  vlp(contract: $contract) {\n    fee {\n      lp_fee_bps\n      euclid_fee_bps\n      recipient {\n        chain_uid\n        address\n      }\n    }\n  }\n}","variables":{"contract":"nibi1m4ns69zvkk2zv0946mw298tlky5ckvu08rtxggtg29p784kc5sxqa9u8ly"}}'
```

[Open in Playground](https://api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGIIIAUAJFBKngIZQrpEDKKeAlkgOYCEASiLAAOkiJEAbgBsADhVr0mLIjTqcVwsRMlEAZuRHi9e%2BQH1DCcwCM5AZxOmiCGFBlcwl8rYdPTeAhQXHJcyCjGus5EUAAWDDzmMJ7%2BzgxgYIH2jlF6AL6pBbpFeSAANCBSDNwMNjII9hggOpKiIEqazG2sbUhcNlwAjHAALEj2AGwAnABeUgDW8wBMcwAMUyMTcADuS1MAHCgy8wQArFDzUjCr%2B3goAB68vCi8e3IA7Psj81Cn9vdYBhTGD7GQENplcSlPJAA)

### Arguments

- **contract** (String!): The contract address of the VLP to query.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| lp_fee_bps             | Int    | The liquidity provider fee in basis points (bps).       |
| euclid_fee_bps         | Int    | The Euclid fee in basis points (bps).                   |
| recipient              | [Recipient](#recipient) | The recipient details for the fees.                     |

### Recipient

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| chain_uid              | String | The unique identifier (UID) of the chain.               |
| address                | String | The address of the fee recipient.                       |
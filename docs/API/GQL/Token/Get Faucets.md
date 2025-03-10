---
sidebar_position: 7
---

# Get Faucets

Queries the link to the faucet for testnet for the chains integrated with euclid.
```graphql
query Get_all_faucets {
  token {
    get_all_faucets {
      token
      faucet_link
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://devnet-testing.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Get_all_faucets {\n  token {\n    get_all_faucets {\n      token\n      faucet_link\n    }\n  }\n}"}'
```

[Open in Playground](https://devnet-testing.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAOIIoD6AhgDY0UBmVMU5AzkcADpJFEoQA1sk48%2BfAOblqdRs1YoO3XuL4DhSMaqJMW0mgEskgrXwC%2BWi0jMgzQA)


### Return Fields

| **Field**      | **Type** | **Description**                                          |
|----------------|----------|----------------------------------------------------------|
| `token`        | String   | The identifier of the token associated with the faucet.|
| `faucet_link`  | String   | The URL link to the faucet for obtaining testnet tokens.       |



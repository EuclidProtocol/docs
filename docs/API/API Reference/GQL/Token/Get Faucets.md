---
sidebar_position: 7
---

# Get All Faucets

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
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Token {\n  token {\n    get_all_faucets {\n      faucet_link\n      token\n    }\n  }\n}"}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACoQDWyRwAOkkUShVbfQ0QOYIoD6AhgBsBPAGZ8YUbgGdqdduzETuPAQEsk5OfMbMkWhgF8tRpAZAAaEADc%2BeVXwBGAhFIwgQBoA)


### Return Fields

| **Field**      | **Type** | **Description**                                          |
|----------------|----------|----------------------------------------------------------|
| `token`        | String   | The identifier of the token associated with the faucet.|
| `faucet_link`  | String   | The URL link to the faucet for obtaining testnet tokens.       |



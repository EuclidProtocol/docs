---
sidebar_position: 9
---
# Simulate Escrow Release
Simulates the release of funds from an escrow.

```graphql
query Router($token: String!, $amount: Int, $crossChainAddresses: [CrossChainUserWithLimitInput]) {
  router {
    simulate_release_escrow(token: $token, amount: $amount, cross_chain_addresses: $crossChainAddresses) {
      release_amounts {
        amount
        cross_chain_user {
          limit
          user {
            address
            chain_uid
          }
        }
      }
      remaining_amount
    }
  }
}
```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Router($token: String!, $amount: Int, $crossChainAddresses: [CrossChainUserWithLimitInput]) {\n  router {\n    simulate_release_escrow(token: $token, amount: $amount, cross_chain_addresses: $crossChainAddresses) {\n      release_amounts {\n        amount\n        cross_chain_user {\n          limit\n          user {\n            address\n            chain_uid\n          }\n        }\n      }\n      remaining_amount\n    }\n  }\n}","variables":{"token":"nibi","amount":10,"crossChainAddresses":[{"limit":null,"user":{"address":"nibi14hcxlnwlqtq75ttaxf674vk6mafspg8x3ky6ts","chain_uid":"nibiru"}}]}}'

```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAEoQwr4AUAJChANbLpEDKKeAlkgOYCEAGiI0AhnHKoWASVRCaUPBADOSgMIALEdwCCYMHgQrDLANqrFKjVqQBVJfgDqnFOoAynOM5kAHCgF0ASiJgAB0kIiJFCnxgsIiIpQ8YABsRSgB9A2SEEXt0wwUIAHcqeiYkFjpGZCExCRRKuphZIkKVdKhNbnSRPQMjJUq2tS6kXX1DeyUg0PD4iKycvKbUJVi5%2BYiVlDjNiOGO0fSYezx1vfnkj2ddi6ITmNm7%2Bd6JlVvnzutjzjAPvYAvv94kCNiDgQY4NZuDweuJmjswaCIqCASABCAAG4iLgiABG2SUGBAsxCIDKyDJLDJSE4eM4ZKERDJ2ypRAAjAAGAS7MnDKw6PqTQxskwfJ6bMlXTw7DBEJApZI8sERMkPPBsiV7FlC95yml0zjsgAs6igAA9kkgisksCgsAB2ACsKBQInNADMAGwO42YhheqEepTeHgADnNAGYGAQvSglIzgaqQF9ujBfmyDfS8DAycDkeC5n4wmiAUA)

### Arguments

- **token** (String!): The token Id of the token to be released.
- **amount** (Int): The amount of tokens to be released from the escrows.
- **cross_chain_addresses** ([CrossChainUserWithLimit](../../../Euclid%20Smart%20Contracts/CosmWasm/overview.md#crosschainuserwithlimit)): The destination addresses and amount (for each address) for the tokens released.


### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| amount                  | String | The amount of tokens to release.                        |
| cross_chain_user         | [CrossChainUserWithLimit](../../../Euclid%20Smart%20Contracts/CosmWasm/overview.md#crosschainuserwithlimit)    | The address and limit for the receiving address of the funds.                                 |
| remaining_amount          | String | Any remaining tokens after the escrow releases.                    |
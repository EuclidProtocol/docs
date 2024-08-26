---
sidebar_position: 9
---
# Simulate Escrow Release
Simulates the release of funds from an escrow.

```graphql
query Router($token: String!, $amount: Int, $crossChainAddresses: [CrossChainUserWithLimitInput]) {
  router {
    simulate_release_escrow(token: $token, amount: $amount, cross_chain_addresses: $crossChainAddresses) {
      remaining_amount
      release_amounts {
        amount
        cross_chain_user {
          user {
            chain_uid
            address
          }
          limit
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
    --url 'https://api.euclidprotocol.com/graphql' \
    --data '{"query":"query Router($token: String!, $amount: Int, $crossChainAddresses: [CrossChainUserWithLimitInput]) {\n  router {\n    simulate_release_escrow(token: $token, amount: $amount, cross_chain_addresses: $crossChainAddresses) {\n      remaining_amount\n      release_amounts {\n        amount\n        cross_chain_user {\n          user {\n            chain_uid\n            address\n          }\n          limit\n        }\n      }\n    }\n  }\n}","variables":{"token":"usdc","amount":10,"crossChainAddresses":[{"limit":null,"user":{"address":"nibi14hcxlnwlqtq75ttaxf674vk6mafspg8x3ky6ts","chain_uid":"ethereum"}}]}}'

```

[Open in Playground](https://api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAEoQwr4AUAJChANbLpEDKKeAlkgOYCEAGiI0AhnHKoWASVRCaUPBADOSgMIALEdwCCYMHgQrDLANqrFKjVqQBVJfgDqnFOoAynOM5kAHCgF0ASiJgAB0kIiJFCnxgsIiIpQ8YABsRSgB9A2SEEXt0wwUIAHcqeiYkFjpGZCExCRRKuphZIkKVdKhNbnSRPQMjJUq2tS6kXX1DeyUg0PD4iKycvKbUJVi5%2BYiVlDjNiOGO0fSYezx1vfnkj2ddi6ITmNm7%2Bd6JlVvnzutjzjAPvYAvv94kCNiDgQY4NZuDweuJmjswaCIqCASABCAAG4iLgiABG2SUGBAsxCIDKyDJLDJJzAUDJQiIZO2VKIAEYAAwCXZk4ZWHR9SaGVkmD5PTZkq6eHYYIhIFLJblgiI006s8V7ZmC96yslITh4zhsgAs6igAA9kkgisksCgsAB2ACsKBQInNADMAGwO42YhheqEepTeHgADnNAGYGAQvSglAzgSqQF9ujBfqyyQgXPgEPAycDkeC5n4wmiAUA)

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
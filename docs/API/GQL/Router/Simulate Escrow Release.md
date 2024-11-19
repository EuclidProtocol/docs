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
    --data '{"query":"query Simulate_release_escrow($token: String!, $amount: Int, $crossChainAddresses: [CrossChainUserWithLimitInput]) {\n  router {\n    simulate_release_escrow(token: $token, amount: $amount, cross_chain_addresses: $crossChainAddresses) {\n      remaining_amount\n      release_amounts {\n        amount\n        cross_chain_user {\n          user {\n            chain_uid\n            address\n          }\n          limit\n        }\n      }\n    }\n  }\n}","variables":{"token":"euclid","amount":1000,"crossChainAddresses":[{"limit":800,"user":{"address":"nibi14hcxlnwlqtq75ttaxf674vk6mafspg8x3ky6ts","chain_uid":"nibiru"}}]}}'

```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMoCWcMANgIYoID6eCVCNAzowu1HhAO4AKACQoIAa2TpSKPGSQBzAIQAaIsJpwIMVNICSqNcN4R27AMIALGvICCYMMzPdpAbXN8zVm0gCqnPAB1MhRLABkKEIMABxgUAF0ASiJgAB0kIiI%2BOPwU9MzM9gpqOkZmVg4uHj4hMUkkaVEJZDVNbV11Np0UNRMzBihreQYaBydOdka%2BiyGke0duCeS0jILM5jgfeQURrW78tayWNk5d9pR2PNXDoi7UA5vpgdmGGACrm7W33JXPw8GfK8yGAHn9bmNFqCbgBfKGHKiRFBwzKw64FVFrDFEVHQkAqEAANxochoACNWOwMCBfkRUiA6sg6dI6QgYFAESC8Qc6XckRgiABGAAMIpU3JA028dghznYTKIrlBNLWdIRcBC8oAHKK4XTvnh5crDjyZXL%2BXSkGRSWQBQAWSxQAAeVCQ-CoWBQWAA7ABWFAoGiOgBmADYvbaCeIQ5sg%2BxogpNY6AMziAghi50sVolUSl4wYHyi1Wsh4GB0uFYlEHeL5dK46FAA)

### Arguments

- **token** (String!): The token Id of the token to be released.
- **amount** (Int): The amount of tokens to be released from the escrows.
- **cross_chain_addresses** ([CrossChainUserWithLimit](../../../Euclid%20Smart%20Contracts/CosmWasm/overview.md#crosschainuserwithlimit)): The destination addresses and amount (for each address) for the tokens released.


### Return Fields

| **Field**                  | **Type**   | **Description**                                             |
|------------------------|--------|---------------------------------------------------------|
| `amount`                  | `String` | The amount of tokens to release.                        |
| `cross_chain_user`         | [`CrossChainUserWithLimit`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview.md#crosschainuserwithlimit)    | The address and limit for the receiving address of the funds.                                 |
| `remaining_amount`          | `String` | Any remaining tokens after the escrow releases.                    |
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
          user {
            chain_uid
            address
          }
          limit
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
    --url 'https://api.euclidprotocol.com/graphql' \
    --data '{"query":"query Router($token: String!, $amount: Int, $crossChainAddresses: [CrossChainUserWithLimitInput]) {\n  router {\n    simulate_release_escrow(token: $token, amount: $amount, cross_chain_addresses: $crossChainAddresses) {\n      release_amounts {\n        amount\n        cross_chain_user {\n          user {\n            chain_uid\n            address\n          }\n          limit\n        }\n      }\n      remaining_amount\n    }\n  }\n}","variables":{"token":"euclid","amount":100000000000,"crossChainAddresses":[{"limit":null,"user":{"address":"0x6287a53c957F13BE3b79Ffc637A19fc2504C4D16","chain_uid":"monad"}}]}}'
```

[Open in Playground](https://api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAEoQwr4AUAJChANbLpEDKKeAlkgOYCEAGiI0AhnHKoWASVRCaUPBADOSgMIALEdwCCYMHgQrDLANqrFKjVqQBVJfgDqnFOoAynOM5kAHCgF0ASiJgAB0kIiJFCnxgsIiIpQ8YABsRSgB9A2SEEXt0wwUIAHcqeiYkFjpGZCExCRRKuphZIkKVdKhNbnSRPQMjJUq2tS6kXX1DeyUg0PD4iKycvKbUJVi5%2BYiVlDjNiOGO0fSYezx1vfmTmNmLzc7rY84wXdutvsmXi4BfT73kj2cv3iPw2wKBBjg1m4PB64maO1BIIiIK%2BIAEIAAbiIuCIAEbZJQYEA3IghEBlZBklhkhAwKD-Z5o3Zk7ZUogARgADNyebzOQJmSBhlYdO8BmyTJ8SfMyf9PDsMEQkClkgLQREyVc8GzpZsWWKlGyyZyAB4ANgATAAOADsIgArABmKAATntNoAYuzHQAhACijtxNpdHoAZlAzY6bdp2S7wxb7ZyACyqJMAEXZZrJatuZPu3RgTyNIHESF6ZKBSLBcz8YVRXyAA)


### Arguments

| **Name**                | **Type**                             | **Description**                                                    |
|-------------------------|--------------------------------------|--------------------------------------------------------------------|
| `token`                 | `String!`                            | Token ID to simulate escrow release for.                           |
| `amount`                | `Int`                                | Total amount to release from escrow.                               |
| `cross_chain_addresses` | `[CrossChainUserWithLimitInput]`     | Optional destination users and limits for release simulation.      |

### Return Fields

| **Field**           | **Type**                     | **Description**                                        |
|---------------------|------------------------------|--------------------------------------------------------|
| `remaining_amount`  | `String`                     | Amount left after applying release simulation.         |
| `release_amounts`   | `[ReleaseAmounts]`           | Per-destination simulated release amounts.             |

### `ReleaseAmounts`

| **Field**           | **Type**                     | **Description**                                        |
|---------------------|------------------------------|--------------------------------------------------------|
| `amount`            | `String`                     | Simulated amount to release to this destination.       |
| `cross_chain_user`  | `CrossChainUserWithLimit`    | Destination user and limit details.                    |

### `CrossChainUserWithLimit`

| **Field**           | **Type**             | **Description**                                        |
|---------------------|----------------------|--------------------------------------------------------|
| `user`              | `CrossChainUser`     | Destination chain/address.                             |
| `limit`             | `String`             | Optional limit used by the simulation.                 |

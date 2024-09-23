---
sidebar_position: 5
---

# State
Queries the state of a VLP contract.

```graphql
query Vlp($contract: String!) {
  vlp(contract: $contract) {
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
    --data '{"query":"query State($contract: String!) {\n  vlp(contract: $contract) {\n    state {\n      pair {\n        token_1\n        token_2\n      }\n      router\n      vcoin\n      fee {\n        lp_fee_bps\n        euclid_fee_bps\n        recipient {\n          chain_uid\n          address\n        }\n      }\n      last_updated\n      total_lp_tokens\n      admin\n    }\n  }\n}","variables":{"contract":"nibi147sw04ts68nxe80946m332rr8j79qqvas386al8d76jhamnnr99qj6xnfs"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMooCGKCAFACRQSp7lQrqkp4CWSA5gIQBKIsAA6SIkQBuAGwAO1BkxZsi9RpxXCxEyUQDOFKiPF69c8lzwndZySggBrZAH0AjKbv2nrgEyezAF8AvTwIGCo8EMkpBh5oogAzBAQbL0l5F2SEFwAjOX0EyQQYKBkuMCyUvIKiojwEKC45LmQUNPTJKAALSyQXGAq6yXIwMAb9Qts7YOnJWa8ZckMBuTBKBDAEhwoZF0yHZyQpr1G4eOmFolnAkAAaEClybnJcmQR9DBAdSVEQJU0rD%2B7D%2BSC4uS4bgALAB2fQAdwADFCUPoAGwADiQAA8EBjEQBOKFouAAZlJvjweAxACsYQSsFgnvpSRi0eQZBiwDC0TTenAkEg8ASGTS0dikIlCiBxLdAkA)

### Arguments

- **contract** (String!): The contract address of the VLP to query.

### Return Fields

| Field            | Type          | Description                                                     |
|------------------|---------------|-----------------------------------------------------------------|
| pair             | [`Pair`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#pair)        | The token pair of the VLP.                                  |
| router           | `String`      | The router contract address used by the VLP.                             |
| vcoin            | `String`      | The contract address of the Virtual Balance contract used by the VLP.                              |
| fee              | [`Fee`](#fee)         | The fee structure of the VLP.                                   |
| last_updated     | `String`      | The timestamp of the last update to the VLP state.                    |
| total_lp_tokens  | `Uint128`     | The total amount of LP tokens in the VLP.                       |
| admin            | `String`      | The admin address of the VLP.                                   |

### Fee

```rust
pub struct Fee {
    pub lp_fee_bps: u64,
    pub euclid_fee_bps: u64,
    pub recipient: CrossChainUser,
}

```
| **Name**          | **Type**          | **Description**                                                                                     |
|-------------------|-------------------|-----------------------------------------------------------------------------------------------------|
| **lp_fee_bps**    | `u64`             | Fee for liquidity providers, in basis points.  Can be set to a maximum of 10%.                                                      |
| **euclid_fee_bps**| `u64`             | Fee for Euclid treasury, distributed among stakers and other Euclid-related rewards, in basis points e. 1 = 0.01% 10000 = 100%. Can be set to a maximum of 10%. |
| **recipient**     | [`CrossChainUser`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#crosschainuser)  | The recipient for the fee. Can be an address on any chain.                                                                       |
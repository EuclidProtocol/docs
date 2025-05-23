---
sidebar_position: 5
---

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
    --data '{"query":"query Vlp($contract: String!) {\n  vlp(contract: $contract) {\n    state {\n      pair {\n        token_1\n        token_2\n      }\n      router\n      vcoin\n      fee {\n        lp_fee_bps\n        euclid_fee_bps\n        recipient {\n          chain_uid\n          address\n        }\n      }\n      last_updated\n      total_lp_tokens\n      admin\n    }\n  }\n}","variables":{"contract":"nibi1pys22jem6l222sxhexe7dmggtz8xkmhm49p7z3wjgrcdk3t46hgsle088m"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGoA2ADgBQAkUEqeAhlCukQMop4CWSA5gEIAlEWAAdJESIA3SlXqMWbInQbdloiVOlEAziiYoEYybt0UmPPKZ3npKCAGtkAfQCMZ%2Bw%2BduATF7mAL6BungQMMZ4odIy9HwxRABmCCba3tKUrikIrgBGFHqJ0ggwUGQ8YNmp%2BYXFRHgIUDwUPMgothm6UAAWVkiuMJX10kxgYI16RXb2ITPSc95kTAaDFGBGCGCJjoZkrlmOLkjT3mNwCTOLRHNBIAA0IDJMvEx5ZAh6GCDpROIgig0rH%2B7H%2BSB4eR47goBD0fj8ACsEHAAGxkeF%2BPQADx6CCxCAA7GA4Px%2BCgAF4ADixTjgPTgABYAJwUAnkgDMAHcEfw8FAwE52SgGSievw9B8AAyUylwf73SR3IJAA)

### Arguments

- **contract** (String): The contract address of the VLP. The pair argument should be set if **contract** is not specified.
- **pair** (PairInput): The pair of tokens belonging to the VLP. The contract argument should be set if **pair** is not specified.

### Return Fields

| **Field**            | **Type**          | **Description**                                                     |
|------------------|---------------|-----------------------------------------------------------------|
| `pair`             | [`Pair`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#pair)        | The token pair of the VLP.                                  |
| `router`           | `String`      | The router contract address used by the VLP.                             |
| `vcoin`            | `String`      | The contract address of the Virtual Balance contract used by the VLP.                              |
| `fee`              | [`Fee`](#fee)         | The fee structure of the VLP.                                   |
| `last_updated`     | `String`      | The timestamp of the last update to the VLP state.                    |
| `total_lp_tokens`  | `Uint128`     | The total amount of LP tokens in the VLP.                       |
| `admin`            | `String`      | The admin address of the VLP.                                   |

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
| **euclid_fee_bps**| `u64`             | Fee for Euclid treasury, distributed among stakers and other Euclid-related rewards, in basis points e. 1 = 0.01% 10000 = 100%. Can be set to a maximum of 3%. |
| **recipient**     | [`CrossChainUser`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#crosschainuser)  | The recipient for the fee. Can be an address on any chain.                                                                       |
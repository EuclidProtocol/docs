---
sidebar_position: 2
description: "The Virtual Liquidity Pool Smart Contract"
---
import Tabs from '@site/src/components/Tabs';

## Query Messages 
:::note
We will only go through the queries for this contract, as users are not allowed to execute any messages on the VLP contract.
You can read about the VLP architecture [here](../Architecture%20Overview/Architecture/Virtual%20Settlement%20Layer/virtual-pools.md)
:::
List of queries that can be performed on the VLP contract.

### State
Queries the state of the VLP contract.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
   #[returns(GetStateResponse)]
    State {},
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{"state":{}}
`
}
]} />

The query returns the following response:

```rust
pub struct GetStateResponse {
    pub pair: Pair,
    pub router: String,
    pub vcoin: String,
    pub fee: Fee,
    pub last_updated: u64,
    pub total_lp_tokens: Uint128,
    pub admin: String,
}
```

| Field            | Type            | Description                                                           |
|------------------|-----------------|-----------------------------------------------------------------------|
| `pair`           | [`Pair`](../Euclid%20Smart%20Contracts/overview#pair)           | The token pair of the VLP.                            |
| `router`         | `String`        | The address of the router contract.                                   |
| `vcoin`          | `String`        | The address of the Virtual balance contract.                                    |
| `fee`            | [`Fee`](#fee)           | The fee structure for the transactions.                               |
| `last_updated`   | `u64`           | The timestamp of the last update to the state.                        |
| `total_lp_tokens`| `Uint128`       | The total amount of liquidity pool tokens.                            |
| `admin`          | `String`        | The address of the admin of the contract.                             |


### SimulateSwap
Simulates a swap for the specified asset in the VLP.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
    #[returns(GetSwapResponse)]
    SimulateSwap {
        asset: Token,
        asset_amount: Uint128,
        swaps: Vec<NextSwapVlp>,
    },
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "simulate_swap": {
    "asset": {
      "id": "token-id"
    },
    "asset_amount": "1000000",
    "swaps": [
      {
        "vlp_address": "nibi1..."
      },
      {
        "vlp_address": "nibi1..."
      }
    ]
  }
}
`
}
]} />

| **Name**        | **Type**            | **Description**                               |
|-----------------|---------------------|-----------------------------------------------|
| **asset**       | [`Token`](../Euclid%20Smart%20Contracts/overview#token)              | The asset being swapped.                      |
| **asset_amount**| `Uint128`           | The amount of the asset being swapped.        |
| **swaps**       | `Vec<NextSwapVlp>`  | A vector of VLP addresses that will be used for the swap.       |

```rust
pub struct NextSwapVlp {
    pub vlp_address: String,
}
```

The query returns the following response:

```rust
#[cw_serde]
pub struct GetSwapResponse {
    pub amount_out: Uint128,
    pub asset_out: Token,
}
```
| Name          | Type       | Description                                              |
|---------------|------------|----------------------------------------------------------|
| `amount_out`  | `Uint128`  | The amount of asset_out that will be released.           |
| `asset_out`   | [`Token`](../Euclid%20Smart%20Contracts/overview#token)     | The token Id of the asset going out of the VLP.          |

### Liquidity
Queries the total liquidity reserves for the token pair in the VLP.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
#[returns(GetLiquidityResponse)]
    Liquidity { height: Option<u64> },
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "liquidity": {
    "height": 324673284
  }
}
`
}
]} />

| **Name** | **Type**      | **Description**                         |
|----------|---------------|-----------------------------------------|
| **height** | `Option<u64>` | Optional block height to query liquidity at a specific block. |

The query returns the following response:

```rust
pub struct GetLiquidityResponse {
    pub pair: Pair,
    pub token_1_reserve: Uint128,
    pub token_2_reserve: Uint128,
    pub total_lp_tokens: Uint128,
}

```
| **Name**          | **Type**        | **Description**                                                                                                                   |
|-------------------|-----------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `pair`            | [`Pair`](../Euclid%20Smart%20Contracts/overview#pair)          | The token pair involved in the liquidity. The token Id for each token is returned.                                                |
| `token_1_reserve` | `Uint128`       | The reserve amount of the first token.                                                                                            |
| `token_2_reserve` | `Uint128`       | The reserve amount of the second token.                                                                                           |
| `total_lp_tokens` | `Uint128`       | The total amount of liquidity pool tokens. These tokens are given to a user whenever they add liquidity to a pool and can be returned to the VLP to withdraw the added liquidity later on. |

### Fee
Queries the distribution structure for any applied fees on the VLP.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
  #[returns(FeeResponse)]
    Fee {},
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{"fee":{}}
`
}
]} />

The query returns the following response:

```rust
#[cw_serde]
pub struct FeeResponse {
    pub fee: Fee,
}
```
With the following Fee struct:

```rust
pub struct Fee {
    pub lp_fee_bps: u64,
    pub euclid_fee_bps: u64,
    pub recipient: CrossChainUser,
}

```
| **Name**          | **Type**          | **Description**                                                                                     |
|-------------------|-------------------|-----------------------------------------------------------------------------------------------------|
| **lp_fee_bps**    | `u64`             | Fee for liquidity providers, in basis points.                                                       |
| **euclid_fee_bps**| `u64`             | Fee for Euclid treasury, distributed among stakers and other Euclid-related rewards, in basis points e. 1 = 0.01% 10000 = 100%.|
| **recipient**     | [`CrossChainUser`](../Euclid%20Smart%20Contracts/overview#crosschainuser)  | The recipient for the fee. Can be an address on any chain.                                                                       |

### Pool
Queries the pool information for the VLP pair on the specified chain.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
   #[returns(PoolResponse)]
    Pool { chain_uid: String },
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "pool": {
    "chain_uid": "chainA"
  }
}
`
}
]} />

| Name          | Description                       |
|---------------|-----------------------------------|
| `chain_uid`       | The unique Id of the chain to retrieve the pool information from for the pair. |

The query returns the following response:

```rust
#[cw_serde]
pub struct PoolResponse {
    pub lp_shares: Uint128,
    pub reserve_1: Uint128,
    pub reserve_2: Uint128,
}
```
| **Name**     | **Type**  | **Description**                                 |
|--------------|-----------|-------------------------------------------------|
| `lp_shares`  | `Uint128` | The total amount of liquidity pool shares.      |
| `reserve_1`  | `Uint128` | The total reserve amount of the first token.    |
| `reserve_2`  | `Uint128` | The total reserve amount of the second token.   |


### GetAllPools
Queries all the pools for the token pair of the VLP on all chains.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
      #[returns(AllPoolsResponse)]
    GetAllPools {},
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{"get_all_pools":{}}
`
}
]} />

The query returns the following response:

```rust 
pub struct AllPoolsResponse {
    /// A vector containing information on the pool for each chain it is found on.
    pub pools: Vec<PoolInfo>,
}

pub struct PoolInfo {
    pub chain_uid: String,
    pub pool: PoolResponse,
}
```
| **Name**   | **Type**       | **Description**                                                                 |
|------------|----------------|-------------------------------------------------------------------------------|
| `chain_uid`| `String`       | The unique Id of the chain where the pool is deployed.                        |
| `pool`     | `PoolResponse` | The information on the pool. Same as the struct returned by the **Pool** query.|

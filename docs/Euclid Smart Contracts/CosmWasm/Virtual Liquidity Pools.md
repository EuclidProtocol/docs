---
sidebar_position: 2
description: "The Virtual Liquidity Pool Smart Contract"
---
import Tabs from '@site/src/components/Tabs';

## Query Messages 
:::note
We will only go through the queries for this contract, as users are not allowed to execute any messages on the VLP contract.
You can read about the VLP architecture [here](../../Architecture%20Overview/Architecture/Virtual%20Settlement%20Layer/virtual-pools.md).
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
    pub virtual_balance: String,
    pub fee: Fee,
    pub total_fees_collected: TotalFees,
    pub last_updated: u64,
    pub total_lp_tokens: Uint128,
    pub admin: String,
     pub pool_config: PoolConfig,
}
```
With the following TotalFees stuct:

```rust
pub struct TotalFees {
    // Fee for lp providers
    pub lp_fees: DenomFees,
    // Fee for euclid treasury, distributed among stakers and other euclid related rewards
    pub euclid_fees: DenomFees,
}
 
pub struct DenomFees {
    // A map to store the total fees per denomination
    pub totals: HashMap<String, Uint128>,
}

```

#### PoolConfig

Defines the configuration type for a liquidity pool. It can either be a **Stable Pool** (with an optional amplification factor) or a **Constant Product Pool** (normal XYK pool).

```rust
pub enum PoolConfig {
    Stable { amp_factor: Option<Uint64> },
    ConstantProduct {},
}
```

| Field            | Type            | Description                                                           |
|------------------|-----------------|-----------------------------------------------------------------------|
| `pair`           | [`Pair`](overview#pair)           | The token pair of the VLP.                            |
| `router`         | `String`        | The address of the router contract.                                   |
| `virtual_balance`          | `String`        | The address of the Virtual Balance contract.                                    |
| `fee`            | [`Fee`](#fee)           | The fee structure for the transactions.                               |
| `total_fees_collected`            | `TotalFees`          | The total amount of fees collected from the VLP.                           |
| `last_updated`   | `u64`           | The timestamp of the last update to the state.                        |
| `total_lp_tokens`| `Uint128`       | The total amount of liquidity pool tokens.                            |
| `admin`          | `String`        | The address of the admin of the contract.                             |
| `pool_config` | `PoolConfig` | Configuration of the pool. |

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
    "asset": "nibi",
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
| **asset**       | [`Token`](overview#token)              | The token Id of the asset being swapped.                      |
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
| `amount_out`  | `Uint128`  | The amount of asset_out that will be released from the swap.           |
| `asset_out`   | [`Token`](overview#token)     | The token Id of the asset going out of the VLP.          |

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
    Liquidity {},
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "liquidity": {}
}
`
}
]} />

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
| `pair`            | [`Pair`](overview#pair)          | The token pair involved in the liquidity. The token Id for each token is returned.                                                |
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
| **lp_fee_bps**    | `u64`             | Fee for liquidity providers, in basis points.  Can be set to a maximum of 10%.                                                      |
| **euclid_fee_bps**| `u64`             | Fee for Euclid treasury, distributed among stakers and other Euclid-related rewards, in basis points e. 1 = 0.01% 10000 = 100%. Can be set to a maximum of 3%. |
| **recipient**     | [`CrossChainUser`](overview#crosschainuser)  | The recipient for the fee. Can be an address on any chain.                                                                       |

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
    Pool { chain_uid: ChainUid },
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

| Name          | Type          | Description                                                                                 |
|---------------|---------------|---------------------------------------------------------------------------------------------|
| `chain_uid`   | [`ChainUid`](overview#crosschainuser)    | The unique ID of the chain to retrieve the pool information from for the pair.              |

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
    pub chain_uid: ChainUid,
    pub pool: PoolResponse,
}
```
| **Name**   | **Type**       | **Description**                                                                 |
|------------|----------------|-------------------------------------------------------------------------------|
| `chain_uid`| [`ChainUid`](overview#crosschainuser)       | The unique Id of the chain where the pool is deployed.                        |
| `pool`     | `PoolResponse` | The information on the pool. Same as the struct returned by the **Pool** query.|

### TotalFeesCollected

Queries the total amount of fees collected by the VLP.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
   #[returns(TotalFeesResponse)]
    TotalFeesCollected {},
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "total_fees_collected": {}
}
`
}
]} />

The query returns the following response:

```rust
pub struct TotalFeesResponse {
    pub total_fees: TotalFees,
}

pub struct TotalFees {
    // Fee for lp providers
    pub lp_fees: DenomFees,
    // Fee for euclid treasury, distributed among stakers and other euclid related rewards
    pub euclid_fees: DenomFees,
}

pub struct DenomFees {
    // A map to store the total fees per denomination
    pub totals: HashMap<String, Uint128>,
}
```
| **Field**       | **Type**           | **Description**                                      |
|-----------------|--------------------|------------------------------------------------------|
| `lp_fees`       | `DenomFees`          | The total fees allocated to liquidity providers (LPs). |
| `euclid_fees`   | `DenomFees`​          | Fee for euclid treasury, distributed among stakers and other euclid related rewards                                                  | 

### TotalFeesPerDenom

Queries the total amount of fees collected by the VLP for the specified denom of funds.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
    #[returns(TotalFeesPerDenomResponse)]
    TotalFeesPerDenom { denom: String },
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "total_fees_per_denom": {
    "denom":"nibi"
  }
}
`
}
]} />

| **Field** | **Type**  | **Description**                              |
|-----------|-----------|----------------------------------------------|
| `denom`   | `String`  | The denom of the fees to get the total for. |

The query returns the following response:

```rust
pub struct TotalFeesPerDenomResponse {
    pub lp_fees: Uint128,
    pub euclid_fees: Uint128,
}
```
| **Field**       | **Type**           | **Description**                                      |
|-----------------|--------------------|------------------------------------------------------|
| `lp_fees`       | `Uint128`          | The total fees allocated to liquidity providers (LPs). |
| `euclid_fees`   | `Uint128`​          | Fee for euclid treasury, distributed among stakers and other euclid related rewards                                                  | 

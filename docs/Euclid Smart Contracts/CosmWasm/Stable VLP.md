---
sidebar_position: 6
description: "The Stable Virtual Liquidity Pool Smart Contract"
---
import Tabs from '@site/src/components/Tabs';

## Query Messages 
:::note
We will only go through the queries for this contract, as users are not allowed to execute any messages on the Stable VLP contract directly.
You can read about the Stable VLP architecture [here](../../Architecture%20Overview/Architecture/Virtual%20Settlement%20Layer/virtual-pools.md).
:::
List of queries that can be performed on the Stable VLP contract.

### State
Queries the full state of the Stable VLP contract.
 
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

With the following stucts:

#### TotalFees

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

| **Field** | **Type** | **Description** |
|------|------|-------------|
| `pair` | [`Pair`](overview#pair) | The token pair in the Stable VLP. |
| `router` | `String` | The address of the Router contract. |
| `virtual_balance` | `String` | The address of the Virtual Balance contract. |
| `fee` | [`Fee`](#fee) | The fee structure applied to the pool. |
| `total_fees_collected` | `TotalFees` | Total fees collected by the pool. |
| `last_updated` | `u64` | Last timestamp the pool state was updated. |
| `total_lp_tokens` | `Uint128` | Total LP tokens issued. |
| `admin` | `String` | Admin address managing the contract. |
| `pool_config` | `PoolConfig`| Configuration of the pool (stable, amp factor, etc.). |


### SimulateSwap
Simulates a swap within the Stable VLP.

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
    "asset": "usdc",
    "asset_amount": "1000000",
    "swaps": [
      { "vlp_address": "nibi1..." }
    ]
  }
}
`
}
]} />

| **Field** | **Type** | **Description** |
|-----------|----------|-----------------|
| `asset` | [`Token`](overview#token) | The input token for the swap simulation. |
| `asset_amount` | `Uint128` | The amount of the asset being swapped. |
| `swaps` | `Vec<NextSwapVlp>` | The swap path across multiple VLPs. |

The query returns the following response:

```rust
pub struct GetSwapResponse {
    pub amount_out: Uint128,
    pub asset_out: Token,
    pub spread_amount: Uint128,
}
```

| **Field** | **Type** | **Description** |
|-----------|----------|-----------------|
| `amount_out` | `Uint128` | The expected output amount from the swap. |
| `asset_out` | [`Token`](overview#token) | The token received after the swap. |
| `spread_amount` | `Uint128` | The amount lost due to spread (difference from ideal price). |


### Liquidity
Queries the total liquidity reserves for the Stable VLP.

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

| **Field** | **Type** | **Description** |
|-----------|----------|-----------------|
| `pair` | [`Pair`](overview#pair) | The token pair involved in the liquidity. The token Id for each token is returned. |
| `token_1_reserve` | `Uint128` | Reserve amount for token 1. |
| `token_2_reserve` | `Uint128` | Reserve amount for token 2. |
| `total_lp_tokens` | `Uint128` | The total amount of liquidity pool tokens. These tokens are given to a user whenever they add liquidity to a pool and can be returned to the VLP to withdraw the added liquidity later on. |


### Fee
Queries the fee distribution configuration for the Stable VLP.

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


### TotalFeesCollected
Queries the total fees collected across all operations.

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

The query returns:

```rust
pub struct TotalFeesResponse {
    pub total_fees: TotalFees,
}
```

| **Field** | **Type** | **Description** |
|-----------|----------|-----------------|
| `total_fees` | `TotalFees` | Aggregated fees for LPs and protocol. |

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

### TotalFeesPerDenom
Queries the total fees collected for a specific token denom.

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
language:`json`,
content: `
{
  "total_fees_per_denom": {
    "denom": "usdc"
  }
}
`
}
]} />

| **Field** | **Type** | **Description** |
|-----------|----------|-----------------|
| `denom` | `String` | The token denomination to query for. |

The query returns:

```rust
pub struct TotalFeesPerDenomResponse {
    pub lp_fees: Uint128,
    pub euclid_fees: Uint128,
}
```

| **Field** | **Type** | **Description** |
|-----------|----------|-----------------|
| `lp_fees` | `Uint128` | Total fees collected for liquidity providers. |
| `euclid_fees` | `Uint128` | Total fees collected for Euclid Treasury. |


### Pool
Queries pool-specific info for a particular chain.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
    #[returns(StablePoolResponse)]
    Pool { chain_uid: ChainUid },
}
`
},
{
id: 'json-example',
label: 'JSON',
language:`json`,
content: `
{
  "pool": {
    "chain_uid": "injective"
  }
}
`
}
]} />

The query returns:

```rust
pub struct StablePoolResponse {
    pub lp_shares: Uint128,
    pub reserve_1: Uint128,
    pub reserve_2: Uint128,
}
```

| **Field** | **Type** | **Description** |
|-----------|----------|-----------------|
| `lp_shares` | `Uint128` | The total amount of liquidity pool shares. |
| `reserve_1` | `Uint128` |  The total reserve amount of the first token.  |
| `reserve_2` | `Uint128` |  The total reserve amount of the second token.  |



### GetAllPools
Queries all pools across all chains.
<Tabs tabs={[
{
id: 'rust-example',
label:`Rust`,
language: 'rust',
content: `
pub enum QueryMsg {
    #[returns(AllStablePoolsResponse)]
    GetAllPools {},
}
`
},
{
id: 'json-example',
label: 'JSON',
language:`json`,
content: `
{
  "get_all_pools": {}
}
`
}
]} />

The query returns:

```rust
pub struct AllStablePoolsResponse {
    pub pools: Vec<StablePoolInfo>,
}

pub struct StablePoolInfo {
    pub chain_uid: ChainUid,
    pub pool: StablePoolResponse,
}

```

| **Name**   | **Type**       | **Description**                                                                 |
|------------|----------------|-------------------------------------------------------------------------------|
| `chain_uid`| [`ChainUid`](overview#crosschainuser)       | The unique Id of the chain where the pool is deployed.                        |
| `pool`     | `StablePoolResponse` | The information on the pool. Same as the struct returned by the **Pool** query.|


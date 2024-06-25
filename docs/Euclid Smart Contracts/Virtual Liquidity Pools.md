---
sidebar_position: 2
description: "The Virtual Liquidity Pool Smart Contract"
---

## Query Messages 
:::note
We will only go through the queries for this contract as users are not allowed to execute any messages on the VLP contract.
:::
List of queries that can be performed on the VLP contract.

### SimulateSwap
Simulates a swap for the specified asset in the VLP.

```rust
pub enum QueryMsg {
    // Query to simulate a swap for the asset
    #[returns(GetSwapResponse)]
    SimulateSwap {
        asset: Token,
        asset_amount: Uint128,
        swaps: Vec<NextSwap>,
    },
}
```
| Name          | Description                       |
|---------------|-----------------------------------|
| `asset`       | The token being swapped in. Provide the token Id for the token. Needs to be one of the two tokens in the VLP.|
| `asset_amount`| The amount of the asset provided.          |
| `swaps`       | A vector of the addresses of the VLPs for next swaps. Used in case of multi-hop swaps.  |

JSON Example:
```JSON
{
  "simulate_swap": {
    "asset": {
      "id": "token-id"
    },
    "asset_amount": "1000",
    "swaps": [
      {
        "vlp_address": "cosmo1..."
      },
      {
        "vlp_address": "comso1..."
      }
    ]
  }
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
| Name          | Description                       |
|---------------|-----------------------------------|
| `amount_out`       | The amount of asset_out that will be released.    |
| `asset_out`| The token Id of the asset going out of the VLP. |

### Liquidity
Queries the total liquidity reserves for the token pair in the VLP.

```rust 
pub enum QueryMsg {
    #[returns(GetLiquidityResponse)]
    Liquidity {},
}
```
JSON Example:
```JSON
{
  "liquidity": {}
}
```
The query returns the following response:

```rust
pub struct GetLiquidityResponse {
    pub pair: Pair,
    pub token_1_reserve: Uint128,
    pub token_2_reserve: Uint128,
    pub total_lp_tokens: Uint128,
}

pub struct Pair {
    pub token_1: Token,
    pub token_2: Token,
}
```
| Name              | Description                                 |
|-------------------|---------------------------------------------|
| `pair`            | The token pair involved in the liquidity. The token Id for each token is returned. |
| `token_1_reserve` | The reserve amount of the first token.      |
| `token_2_reserve` | The reserve amount of the second token.     |
| `total_lp_tokens` | The total amount of liquidity pool tokens. These tokens are given to a user whenever they add liquidity to a pool and can be returned to the VLP to withdraw the added liquidity later on.  |

### Fee
Queries the distribution structure for any applied fees on the VLP.

```rust
pub enum QueryMsg {
  #[returns(FeeResponse)]
    Fee {},
}
```
JSON Example:

```JSON
{"fee":{}}
```
The query returns the following response:

```rust
#[cw_serde]
pub struct FeeResponse {
    pub fee: Fee,
}
```

There are three main parties that get a percentage of the fees.

```rust
pub struct Fee {
    pub lp_fee: u64,
    pub treasury_fee: u64,
    pub staker_fee: u64,
}
```
- **vlp_fee**: The percentage of the fee for LP providers.
- **treasury_fee**: The percentage of the fee for the treasury.
- **staker_fee**: The percentage of the fee for the stakers.

### Pool
Queries the pool information for the VLP pair on the specified chain.

```rust
pub enum QueryMsg {
   #[returns(PoolResponse)]
    Pool { chain_id: String },
}
```

| Name          | Description                       |
|---------------|-----------------------------------|
| `chain_id`       | The Id of the chain to get pool info from for the pair. |

JSON Example:

```JSON
{"pool":{}}
```
The query returns the following response:

```rust
#[cw_serde]
pub struct PoolResponse {
    pub pool: Pool,
}

#[cw_serde]
pub struct Pool {
    pub chain: String,
    pub pair: PairInfo,
    pub reserve_1: Uint128,
    pub reserve_2: Uint128,
}
```
| Name         | Description                                 |
|--------------|---------------------------------------------|
| `chain`      | The chain where the pool is deployed.       |
| `pair`       | The token Id of each and type of each token of the pool.  |
| `reserve_1`  | The total reserve of the first token in the VLP on the specified chain.       |
| `reserve_2`  | The total reserve of the second token in the VLP on the specified chain.      |

### GetAllPools
Queries all the pools for the token pair of the VLP on all chains.

```rust 
pub enum QueryMsg {
      #[returns(AllPoolsResponse)]
    GetAllPools {},
}
```
JSON Example:

```JSON
{"get_all_pools":{}}
```

The query returns the following response:

```rust 
pub struct AllPoolsResponse {
    /// A vector containing information on the pool for each chain it is found on.
    pub pools: Vec<PoolInfo>,
}

pub struct PoolInfo {
    pub chain: String,
    pub pool: Pool,
}
```
| Name         | Description                                 |
|--------------|---------------------------------------------|
| `chain`      | The chain where the pool is deployed.       |
| `pool`       | The information on the pool. Same as the struct returned by the **Pool** query.  |

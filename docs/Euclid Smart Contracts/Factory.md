---
sidebar_position: 2
description: "The Factory Smart Contract"
---

import Tabs from '@site/src/components/Tabs';

## Instantiate Message

:::note
Each integrated chain has its own factory contract. These contracts will be created by Euclid whenever an integration with a new chain occurs.
:::


```rust
pub struct InstantiateMsg {
    pub router_contract: String,
    pub chain_id: String,
    pub escrow_code_id: u64,
}
```

| **Name** | Description |
|---|---|
| **router_contract** | The address of the router contract to forward messages to and from the VSL. |
| **chain_id** | The Id of the chain the factory is deployed on. |
| **ecrow_code_id** | The code Id to be used to instantiate new escrows for new token pairs. |

## Execute Messages

List of execute messages that can be performed on the Factory contract.

### ExecuteSwapRequest

Requests a swap for the specified token pair.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content:`
pub enum ExecuteMsg {
  ExecuteSwapRequest {
        asset_in: TokenInfo,
        asset_out: TokenInfo,
        amount_in: Uint128,
        min_amount_out: Uint128,
        timeout: Option<u64>,
        swaps: Vec<NextSwap>,
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
  "execute_swap_request":{
    "asset_in": {
        "token": {
            "id": "tokenA"
        },
        "token_type": {
            "native": {
                "denom": "utokenA"
            }
        }
    },
    "asset_out": {
        "token": {
            "id": "tokenB"
        },
        "token_type": {
            "native": {
                "denom": "utokenB"
            }
        }
    },
    "amount_in": "1000000",
    "min_amount_out": "950000",
    "timeout": 120,
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

| Name | Description |
|---|---|
| **asset_in** |  The asset being swapped in. |
| **asset_out** | The asset being swapped out. |
| **amount_in** | The amount of asset_in being swapped. An equal amount of funds need to be attached to the message. |
| **min_amount_out** |  The minimum amount of asset_out that needs to be obtained for the swap to be considered successful. If the amount is not achieved, the swap will fail, and the attached funds are returned to the user. |
| **timeout** |  Duration in seconds after which the swap will be timed out. Can be set to a minimum of 30 seconds and a maximum of 240 seconds. Defaults to 60 seconds if not specified. |
| **swaps** | A vector containing all the VLP addresses needed for the requested swap path. In case of a multi-hop swap, more than one VLP needs to be specified. |

:::note
- The swap paths are calculated on the backend when using the Eulcid API and the most efficient path is used for the **swaps** field.
- Each token has a unique token Id that is used to identify it. Same tokens with different denominations (IBC) share the same token Id.
:::

With the following structs:

```rust
/// Struct holding information about a specific token.
pub struct TokenInfo {
    token: Token,
    token_type: TokenType,
}

pub struct Token {
/// Unique Id that points to the token.
    pub id: String,
}

pub enum TokenType {
    /// Native tokens
    Native { denom: String },
    /// CW20 tokens
    Smart { contract_address: String },
}
/// The address of the VLP contract needed for the next swap.
pub struct NextSwap {
    pub vlp_address: String,
}
```



### AddLiquidityRequest

Send a message to the VLP requesting the addition of liquidity to the specified token pair.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum ExecuteMsg {
 AddLiquidityRequest {
        vlp_address: String,
        token_1_liquidity: Uint128,
        token_2_liquidity: Uint128,
        slippage_tolerance: u64,
        timeout: Option<u64>,
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
  "add_liquidity_request": {
    "vlp_address": "nibi1...",
    "token_1_liquidity": "10000",  
    "token_2_liquidity": "40000",  
    "slippage_tolerance": 500,        
    "timeout": 120                    
  }
}
`
}
]} />

| **Name** | Description |
|---|---|
| **vlp_address** | The address of the virtual liquidity pool for the token pair. |
| **token_1_liquidity** | The amount of liquidity added for the first token of the pair. |
| **token_2_liquidity** | The amount of liquidity added for the second token of the pair. |
| **slippage_tolerance** | The amount of slippage tolerated. If the slippage amount surpasses the specified amount, the request will fail and the user receives back the tokens. Specified as a percentage between 1 and 100. |
| **timeout** | Optional duration in seconds after which the message will be timed out. Can be set to a minimum of 30 seconds and a maximum of 240 seconds. Defaults to 60 seconds if not specified. | 

### RequestPoolCreation

Sends a request to the VSL to create a new pool.
<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum ExecuteMsg {
     RequestPoolCreation {
        pair_info: PairInfo,
        timeout: Option<u64>,
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
  "request_pool_creation": {
    "pair_info": {
      "token_1": {
          "token": {
              "id": "token_1_id_value"
        },
          "token_type": {
              "native": {
                "denom": "native_denom_value"
          }
        }
      },
      "token_2": {
          "token": {
              "id": "token_2_id_value"
        },
        "token_type": {
          "native": {
            "denom": "native_denom_value"
          }
        }
      }
    },
    "timeout": 120
  }
}
`
}
]} />

| **Name** | Description |
|---|---|
| **pair_info** | Key information needed about the 2 tokens to be able to create a new pool. |
| **timeout** | Optional duration in seconds after which the message will be timed out. Can be set to a minimum of 30 seconds and a maximum of 240 seconds. Defaults to 60 seconds if not specified. | 

With the following struct:
:::note
TokenInfo struct was defined for the **ExecuteSwapRequest** message. Refer back to it if needed.
:::
```rust
/// Provides needed information for the two tokens
pub struct PairInfo {
    pub token_1: TokenInfo,
    pub token_2: TokenInfo,
}
```

### RequestRegisterDenom

Requests the addition of a denomination for a token. 

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum ExecuteMsg {
  RequestRegisterDenom {
        denom: String,
        token_id: Token,
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
  "request_register_denom": {
    "denom": "uatom",
    "token_id": {
      "id": "atom" 
    }
  }
}
`
}
]} />

| Name | Description |
|---|---|
| denom | The new denomination to be added for the specified token Id.|
| token_id | The Id that points to the token and all of its denominations.  |

### RequestDeregisterDenom 
Requests the removal of a specific denomination for a token. 

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum ExecuteMsg {
  RequestDeregisterDenom {
        denom: String,
        token_id: Token,
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
  "request_deregister_denom": {
    "denom": "uatom",
    "token_id": {
      "id": "atom" 
    }
  }
}
`
}
]} />

| Name | Description |
|---|---|
| denom | The denomination to be removed for the specified token Id.|
| token_id | The Id that points to the token and all of its denominations.  |

## Query Messages 

List of queries that can be performed on the Factory contract.

### GetState 

Queries the information related to the Factory setup.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
#[returns(StateResponse)]
    GetState {},
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{"get_state":{}}
`
}
]} />

The query returns the following response:

```rust
pub struct StateResponse {
    pub chain_id: String,
    pub router_contract: String,
    pub hub_channel: Option<String>,
    pub admin: String,
}
```

| **Name**           | **Description**                                           |
|--------------------|-----------------------------------------------------------|
| **chain_id**       | The ID of the blockchain the factory is deployed on.                                |
| **router_contract**| The address of the router contract used to relay messages from and to the factory                      |
| **hub_channel**    | The IBC channel used to forward messages to and from the hub.                  |
| **admin**          | The address of the admin of the factory.                        |

### GetEscrow
Queries the Escrow address for the specified token Id.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
    #[returns(GetEscrowResponse)]
    GetEscrow { token_id: String },
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{"get_escrow":{"token_id":"id_1"}}
`
}
]} />

| **Name** | **Description** |
|---|---|
| **token_id** | The token Id of the token we want to get the escrow for. |

The query returns the following response:
```rust
#[cw_serde]
pub struct GetEscrowResponse {
    pub escrow_address: Option<Addr>,
}
```
| **Name** | **Description** |
|---|---|
| **escrow_address** | The contract address of the escrow smart contract that holds the specified token.|

### GetPool

Queries the token pair information for the specified VLP address.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
    #[returns(GetPoolResponse)]
    GetPool { vlp: String },
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "get_pool":{
    "vlp":"nibi1..."
  }
}
`
}
]} />

| **Name** | **Description** |
|---|---|
| **vlp** | The address of the virtual liquidity pool. |

The query returns the following response:

```rust
#[cw_serde]
pub struct GetPoolResponse {
    pub pair_info: PairInfo,
}

pub struct PairInfo {
    //Contains the token Id and type for each token
    pub token_1: TokenInfo,
    pub token_2: TokenInfo,
}
```

### GetAllPools

Queries all the pools registered in the factory, returning the VLP address for the pool and the token information for the pair.

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
{
"get_all_pools":{}
}
`
}
]} />

The query returns the following response:

```rust
pub struct AllPoolsResponse {
    pub pools: Vec<PoolVlpResponse>, 
}

pub struct PoolVlpResponse {
    // Token Id and type of each token in the pool
    pub pair_info: PairInfo,
    // Address of the vlp hosting the pair.
    pub vlp: String,
}
```

### PendingSwapsUser
Queries the swaps that are pending for the specified user address.
<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
    #[returns(GetPendingSwapsResponse)]
    PendingSwapsUser {
        user: String,
        lower_limit: Option<u128>,
        upper_limit: Option<u128>,
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
  "pending_swaps_user": {
    "user": "cosmo1...",
    "lower_limit": 3,
    "upper_limit": 15
  }
}
`
}
]} />

| **Name**       | **Description**                                 |
|----------------|-------------------------------------------------|
| **user**       | The address of the user to query swaps for.                     |
| **lower_limit**| Optional lower limit for pagination.            |
| **upper_limit**| Optional upper limit for pagination.            |

The query returns the following response:

```rust
pub struct GetPendingSwapsResponse {
    pub pending_swaps: Vec<SwapInfo>,
}

#[cw_serde]
pub struct SwapInfo {
    pub asset_in: TokenInfo,
    pub asset_out: TokenInfo,
    pub amount_in: Uint128,
    pub min_amount_out: Uint128,
    pub swaps: Vec<NextSwap>,
    pub timeout: IbcTimeout,
    pub swap_id: String,
}
```
| **Name**          | **Description**                                      |
|-------------------|------------------------------------------------------|
| **asset_in**      | The asset being swapped.                             |
| **asset_out**     | The asset being received.                            |
| **amount_in**     | The amount of the asset being swapped.               |
| **min_amount_out**| The minimum amount of the asset being received.      |
| **swaps**         | A vector containing all the VLP addresses needed for the swap.|
| **timeout**       | The timeout specified for the swap.                  |
| **swap_id**       | The unique Id for the swap.                           |

### PendingLiquidity

Queries the liquidity that is pending for the specified user address.
<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
  #[returns(GetPendingLiquidityResponse)]
    PendingLiquidity {
        user: String,
        lower_limit: Option<u128>,
        upper_limit: Option<u128>,
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
  "pending_liquidity": {
    "user": "cosmo1...",
    "lower_limit": 20,
    "upper_limit": 30
  }
}
`
}
]} />

| **Name**       | **Description**                                 |
|----------------|-------------------------------------------------|
| **user**       | The address of the user to query liquidity for.                       |
| **lower_limit**| Optional lower limit for pagination.            |
| **upper_limit**| Optional upper limit for pagination.            |

The query returns the following response:

```rust
pub struct GetPendingLiquidityResponse {
    pub pending_liquidity: Vec<LiquidityTxInfo>,
}
pub struct LiquidityTxInfo {
    pub sender: String,
    pub token_1_liquidity: Uint128,
    pub token_2_liquidity: Uint128,
    pub liquidity_id: String,
    pub vlp_address: String,
    pub pair_info: PairInfo,
}
```
| **Name**             | **Description**                                      |
|----------------------|------------------------------------------------------|
| **sender**           | The address of the user with pending liquidity                         |
| **token_1_liquidity**| The amount of liquidity for the first token.         |
| **token_2_liquidity**| The amount of liquidity for the second token.        |
| **liquidity_id**     | The unique Id for the liquidity transaction. |
| **vlp_address**      | The address of the virtual liquidity pool where liquidity is being added.           |
| **pair_info**        | Information about the token pair (Token Id and type for each token).                 |

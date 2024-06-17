---
sidebar_position: 2
description: "The Factory Smart Contract"
---

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

### ExecuteSwapRequest

Requests a swap for the specified token pair.
```rust
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
```
| Name | Description |
|---|---|
| **asset_in** |  The asset being swapped in. |
| **asset_out** | The asset being swapped out. |
| **amount_in** | The amount of asset_in being swapped. An equal amount of funds need to be attached to the message. |
| **min_amount_out** |  The minimum amount of asset_out that needs to be obtained for the swap to be considered successful. If the amount is not achieved, the swap will fail and the attached funds are returned to the user. |
| **timeout** |  Duration in seconds after which the swap will be timed out. Can be set to a minimum of 30 seconds and a maximum of 240 seconds. Defaults to 60 seconds if not specified. |
| **swaps** | A vector containing all the VLP addresses needed for the requested swap path. In case of a multi-hop swap, more than one VLP needs to be specified. |

:::note
- The swap paths are calculated on the backend and the most efficient path is used for a swap.
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
/// Unique Id that points to the token type.
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
JSON Example:
```JSON
{
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
            "vlp_address": "nibi2..."
        }
    ]
}
```

### AddLiquidityRequest

Send a message to the VLP requesting the addition of liquidity to the specified token pair.

```rust
pub enum ExecuteMsg {
 AddLiquidityRequest {
        vlp_address: String,
        token_1_liquidity: Uint128,
        token_2_liquidity: Uint128,
        slippage_tolerance: u64,
        timeout: Option<u64>,
    },
}
```
| **Name** | Description |
|---|---|
| **vlp_address** | The address of the virtual liquidity pool for the token pair. |
| **token_1_liquidity** | The amount of liquidity added for the first token of the pair. |
| **token_2_liquidity** | The amount of liquidity added for the second token of the pair. |
| **slippage_tolerance** | The amount of slippage tolerated. If the slippage amount surpasses the specified amount, the request will fail and the user receives back the tokens. Specified as a percentage between 1 and 100. |
| **timeout** | Optional duration in seconds after which the message will be timed out. Can be set to a minimum of 30 seconds and a maximum of 240 seconds. Defaults to 60 seconds if not specified. | 

JSON Example:

```JSON
{
  "AddLiquidityRequest": {
    "vlp_address": "string_value_here",
    "token_1_liquidity": "10000",  
    "token_2_liquidity": "40000",  
    "slippage_tolerance": 500,        
    "timeout": 120                    
  }
}
```

### RequestPoolCreation

Sends a request to the VSL to create a new pool.

```rust
pub enum ExecuteMsg {
     RequestPoolCreation {
        pair_info: PairInfo,
        timeout: Option<u64>,
    },
}
```
| **Name** | Description |
|---|---|
| **pair_info** | Key information needed about the 2 tokens to be able to create a new pool. |
| **timeout** | Optional duration in seconds after which the message will be timed out. Can be set to a minimum of 30 seconds and a maximum of 240 seconds. Defaults to 60 seconds if not specified. | 

With the following struct:
:::note
TokenInfo struct was defined for the first Execute message. Refer back to it if needed.
:::
```rust
/// Provides needed information for the two tokens
pub struct PairInfo {
    pub token_1: TokenInfo,
    pub token_2: TokenInfo,
}
```


JSON Example:

```JSON

{
  "RequestPoolCreation": {
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
```

### RequestAddAllowedDenom

Requests the addition of a denomination for a token. 
```rust
pub enum ExecuteMsg {
  RequestAddAllowedDenom {
        denom: String,
        token_id: Token,
    },
}
```
| Name | Description |
|---|---|
| denom | The new denomination to be added for the speicified token Id.|
| token_id | The Id that points to the token and all of its denominations.  |

JSON Example:

```JSON
{
  "request_add_allowed_denom": {
    "denom": "uatom",
    "token_id": {
      "id": "atom" 
    }
  }
}
```
### RequestDeregisterDenom 
Requests the removal of a specific denomination for a token. 

```rust
pub enum ExecuteMsg {
  RequestDeregisterDenom {
        denom: String,
        token_id: Token,
    },
}
```
| Name | Description |
|---|---|
| denom | The denomination to be removed for the speicified token Id.|
| token_id | The Id that points to the token and all of its denominations.  |

JSON Example:
```JSON
{
  "request_deregister_denom": {
    "denom": "uatom",
    "token_id": {
      "id": "atom" 
    }
  }
}
```

## Query Messages 
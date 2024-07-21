---
sidebar_position: 2
description: "The Factory Smart Contract"
---

import Tabs from '@site/src/components/Tabs';

:::note
Each integrated chain has its own factory contract. These contracts will be created by Euclid whenever an integration with a new chain occurs.
:::

## Execute Messages

List of execute messages that can be performed on the Factory contract.

### ExecuteSwapRequest

Performs a swap taking the asset_in and releasing asset_out. The tokens can be released on multiple chains if specified by cross_chain_addresses. 

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content:`
  pub enum ExecuteMsg {
    ExecuteSwapRequest {
        asset_in: TokenWithDenom,
        asset_out: Token,
        amount_in: Uint128,
        min_amount_out: Uint128,
        timeout: Option<u64>,
        swaps: Vec<NextSwapPair>,
        cross_chain_addresses: Vec<CrossChainUserWithLimit>,
        partner_fee: Option<PartnerFee>,
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
"execute_swap_request": {
  "asset_in": {
    "token": "tokenA",
    "token_type": {
      "native": {
        "denom": "tokenA"
      }
    }
  },
  "asset_out": "tokenB",
  "amount_in": "1000000",
  "min_amount_out": "950000",
  "timeout": 120,
  "swaps": [
    {
      "token_in": "tokenA",
      "token_out": "tokenC"
    },
    {
      "token_in": "tokenC",
      "token_out": "tokenB"
    }
  ],
  "cross_chain_addresses": [
    {
      "user": {
        "chain_uid": "chain1",
        "address": "cosmo1..."
      },
      "limit": "150000"
    },
    {
      "user": {
        "chain_uid": "chain2",
        "address": "nibi1..."
      },
      "limit": "200000"
    }
  ],
  "partner_fee": {
    "partner_fee_bps": 50,
    "recipient": "nibi1..."
  }
 } 
}
`
}
]} />

| Field                   | Type                            | Description                                                                                                               |
|-------------------------|---------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| `asset_in`              | [`TokenWithDenom`](../Euclid%20Smart%20Contracts/overview#tokenwithdenom)               | The token being swapped in.                                                                                               |
| `asset_out`             | [`Token`](../Euclid%20Smart%20Contracts/overview#token)                         | The token being swapped out.                                                                                              |
| `amount_in`             | `Uint128`                       | Amount of the input asset.                                                                                                |
| `min_amount_out`        | `Uint128`                       | Minimum amount of the output asset for the swap to be considered a success.                                               |
| `timeout`               | `Option<u64>`                   | Optional timeout for the swap. Can be set up to 240 seconds and defaults to 60 if not specified.                          |
| `swaps`                 | `Vec<NextSwapPair>`             | The different swaps to get from asset_in to asset_out. This could be a direct swap or multiple swaps. For example, if swapping from token A to B, the swaps can be A -> B directly, or A -> C then C-> D then D->B. Usually the most efficient route is used. |
| `cross_chain_addresses` | `Vec<CrossChainUserWithLimit>`  | A set of addresses to specify where the asset_out should be released. The first element specified in the vector has highest priority and so on. |
| `partner_fee`           | `Option<PartnerFee>`            | Optional partner fee information for swaps.                                                                               |

:::note
- The swap paths are calculated on the backend when using the Eulcid API and the most efficient path is used by default for the **swaps** field.
:::

With the following structs:

```rust

/// The next token pair in the swap route
pub struct NextSwapPair {
    pub token_in: Token,
    pub token_out: Token,
}
// List of user addresses to receive the asset_out 
pub struct CrossChainUserWithLimit {
    pub user: CrossChainUser,
    // A limit to the amount of asset_out to receive for the specified user address.
    pub limit: Option<Uint128>,
}

// The chain unique Id and user address on that chain to receive the tokens.
pub struct CrossChainUser {
    pub chain_uid: ChainUid,
    pub address: String,
}

// The unique Identifier for the chain.
pub struct ChainUid(String);

// The percentage of the fee for platform. Specified in basis points ie. 1 = 0.01% 10000 = 100%
pub struct PartnerFee {
    pub partner_fee_bps: u64,
    pub recipient: String,
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
        pair_info: PairWithDenom,
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
   "pair_info": {
    "token_1": {
      "token": "token-1-id",
      "token_type": {
        "native": {
          "denom": "native-denom-1"
        }
      }
    },
    "token_2": {
      "token": "token-2-id",
      "token_type": {
        "native": {
          "denom": "native-denom-2"
        }
      }
    }
  },
    "token_1_liquidity": "10000",  
    "token_2_liquidity": "40000",  
    "slippage_tolerance": 500,        
    "timeout": 120                    
  }
}
`
}
]} />

| **Name**              | **Type**             | **Description**                                                                                                       |
|-----------------------|----------------------|-----------------------------------------------------------------------------------------------------------------------|
| **pair_info**         | [`PairWithDenom`](../Euclid%20Smart%20Contracts/overview#pairwithdenom)      | The two tokens to add liquidity to.                                                                                   |
| **token_1_liquidity** | `Uint128`            | The amount of liquidity added for the first token of the pair.                                                        |
| **token_2_liquidity** | `Uint128`            | The amount of liquidity added for the second token of the pair.                                                       |
| **slippage_tolerance**| `u64`                | The amount of slippage tolerated. If the slippage amount surpasses the specified amount, the request will fail and the user receives back the tokens. Specified as a percentage between 1 and 100. |
| **timeout**           | `Option<u64>`        | Optional duration in seconds after which the message will be timed out. Can be set to a minimum of 30 seconds and a maximum of 240 seconds. Defaults to 60 seconds if not specified. |

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
        pair: PairWithDenom,
        timeout: Option<u64>,
        lp_token_name: String,
        lp_token_symbol: String,
        lp_token_decimal: u8,
        lp_token_marketing: Option<cw20_base::msg::InstantiateMarketingInfo>,
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
    "pair": {
    "token_1": {
      "token": "token-1-id",
      "token_type": {
        "native": {
          "denom": "native-denom-1"
        }
      }
    },
    "token_2": {
      "token": "token-2-id",
      "token_type": {
        "native": {
          "denom": "native-denom-2"
        }
      }
    }
  },
  "timeout": 600,
  "lp_token_name": "Liquidity Pool Token",
  "lp_token_symbol": "LPT",
  "lp_token_decimal": 18,
  "lp_token_marketing": {
    "project": "Project Name",
    "description": "Description of the project",
    "marketing_url": "https://marketing.url",
    "logo": {
      "url": "https://logo.url"
    }
   }
  }
}
`
}
]} />

| Field                | Type                                | Description                                                                                                              |
|----------------------|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| `pair`               | [`PairWithDenom`](../Euclid%20Smart%20Contracts/overview#tokenwithdenom)                      | The token pair to request creating a new pool for.                                                                       |
| `timeout`            | `Option<u64>`                       | Optional timeout for the request. Can be set to a max of 240 seconds and is set to 60 seconds by default.                |
| `lp_token_name`      | `String`                            | Name of the liquidity pool token.                                                                                        |
| `lp_token_symbol`    | `String`                            | Symbol of the liquidity pool token.                                                                                      |
| `lp_token_decimal`   | `u8`                                | Decimal places for the liquidity pool token.                                                                             |
| `lp_token_marketing` | `Option<cw20_base::msg::InstantiateMarketingInfo>` | Optional marketing information for the liquidity pool token (following `cw20_base` standards).                            |

With the following struct:

```rust
/// Provides information on the LP token for the pool.
pub struct InstantiateMarketingInfo {
    pub project: Option<String>,
    pub description: Option<String>,
    pub marketing: Option<String>,
    pub logo: Option<Logo>,
}
```
| Field         | Description                          |
|---------------|--------------------------------------|
| `project`     | Optional name of the project.        |
| `description` | Optional description of the project. |
| `marketing`   | Optional marketing URL.              |
| [`logo`](https://docs.rs/cw20/latest/cw20/enum.Logo.html)        | Optional logo information.           |

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
        token: TokenWithDenom,
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
    "token": {
      "token": "token-id",
      "token_type": {
        "native": {
          "denom": "native-denom"
        }
      }
    }
  }
}
}
`
}
]} />

| Field  | Type              | Description                                |
|--------|-------------------|--------------------------------------------|
| `token`| [`TokenWithDenom`](../Euclid%20Smart%20Contracts/overview#tokenwithdenom)  | Information about the token to register.|

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
        token: TokenWithDenom,
    }
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
    "token": {
      "token": "token-id",
      "token_type": {
        "native": {
          "denom": "native-denom"
        }
      }
    }
  }
}
`
}
]} />

| Field  | Type              | Description                                |
|--------|-------------------|--------------------------------------------|
| `token`| [`TokenWithDenom`](../Euclid%20Smart%20Contracts/overview#tokenwithdenom)  | Information about the token to deregister.  |


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
    pub chain_uid: ChainUid,
    pub router_contract: String,
    pub hub_channel: Option<String>,
    pub admin: String,
}
```

| **Name**           | **Type**        | **Description**                                           |
|--------------------|-----------------|-----------------------------------------------------------|
| **chain_uid**      | `ChainUid`      | The unique Id of the blockchain the factory is deployed on.                                |
| **router_contract**| `String`        | The address of the router contract used to relay messages from and to the factory           |
| **hub_channel**    | `Option<String>`| The IBC channel used to forward messages to and from the hub.                               |
| **admin**          | `String`        | The address of the admin of the factory.                                                      |

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

| **Name** |**Type**| **Description** |
|---|---|---|
| **token_id** | String |The token Id of the token we want to get the escrow for. |

The query returns the following response:
```rust
#[cw_serde]
pub struct GetEscrowResponse {
    pub escrow_address: Option<Addr>,
    pub denoms: Vec<TokenType>,
}
```
| **Name**         | **Type**            | **Description**                                                                   |
|------------------|---------------------|-----------------------------------------------------------------------------------|
| **escrow_address** | `Option<Addr>`    | The contract address of the escrow smart contract that holds the specified token. |
| **denoms**       | [`Vec<TokenType>`](../Euclid%20Smart%20Contracts/overview#tokentype)    | A list of token types associated with the escrow.                                 |

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
    // Token Id of each token in the pool
    pub pair_info: Pair,
    // Address of the vlp hosting the pair.
    pub vlp: String,
}

pub struct Pair {
    pub token_1: Token,
    pub token_2: Token,
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
        user: Addr,
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

| **Name**       | **Type**         | **Description**                                 |
|----------------|------------------|-------------------------------------------------|
| **user**       | `Addr`           | The address of the user to query swaps for.     |
| **lower_limit**| `Option<u128>`   | Optional lower limit for pagination.            |
| **upper_limit**| `Option<u128>`   | Optional upper limit for pagination.            |

The query returns the following response:

```rust
pub struct GetPendingSwapsResponse {
    pub pending_swaps: Vec<SwapRequest>,
}

pub struct SwapRequest {
    pub sender: String,
    pub tx_id: String,
    pub asset_in: TokenWithDenom,
    pub asset_out: Token,
    pub amount_in: Uint128,
    pub min_amount_out: Uint128,
    pub swaps: Vec<NextSwapPair>,
    pub timeout: IbcTimeout,
    pub cross_chain_addresses: Vec<CrossChainUserWithLimit>,
    pub partner_fee_amount: Uint128,
    pub partner_fee_recipient: Option<Addr>,
}
```
| **Name**               | **Type**                           | **Description**                                      |
|------------------------|------------------------------------|------------------------------------------------------|
| **sender**             | `String`                           | The address of the user initiating the swap.         |
| **tx_id**              | `String`                           | The transaction Id for the swap.                     |
| **asset_in**           | [`TokenWithDenom`](../Euclid%20Smart%20Contracts/overview#tokenwithdenom)                  | The asset being swapped.                             |
| **asset_out**          | `Token`                            | The asset being received.                            |
| **amount_in**          | `Uint128`                          | The amount of the asset being swapped.               |
| **min_amount_out**     | `Uint128`                          | The minimum amount of the asset being received for the swap to be a success.      |
| **swaps**              | `Vec<NextSwapPair>`                | The different swaps to get from asset_in to asset_out. |
| **timeout**            | `IbcTimeout`                       | The timeout time for the swap. Returned as a timestamp.                 |
| **cross_chain_addresses** | `Vec<CrossChainUserWithLimit>` |  A set of addresses to specify where the asset_out should be released. The first element specified in the vector has highest priority and so on.      |
| **partner_fee_amount** | `Uint128`                          | The amount of the partner fee.                       |
| **partner_fee_recipient** | `Option<Addr>`                 | The recipient of the partner fee.                    |

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
        user: Addr,
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
    pub pending_add_liquidity: Vec<AddLiquidityRequest>,
}

pub struct AddLiquidityRequest {
    pub sender: String,
    pub tx_id: String,
    pub token_1_liquidity: Uint128,
    pub token_2_liquidity: Uint128,
    pub pair_info: PairWithDenom,
}
```
| **Name**             | **Type**           | **Description**                                      |
|----------------------|--------------------|------------------------------------------------------|
| **sender**           | `String`           | The address of the user with pending liquidity.      |
| **tx_id**            | `String`           | The unique Id for the liquidity transaction.         |
| **token_1_liquidity**| `Uint128`          | The amount of liquidity for the first token.         |
| **token_2_liquidity**| `Uint128`          | The amount of liquidity for the second token.        |
| **pair_info**        | [`PairWithDenom`](../Euclid%20Smart%20Contracts/overview#pairwithdenom)     | Information about the token pair (Token Id and type for each token). |

### PendingRemoveLiquidity

Queries the liquidity that is pending removal for the specified user address.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
  #[returns(GetPendingLiquidityResponse)]
    PendingLiquidity {
        user: Addr,
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
pub struct GetPendingRemoveLiquidityResponse {
    pub pending_remove_liquidity: Vec<RemoveLiquidityRequest>,
}

pub struct RemoveLiquidityRequest {
    pub sender: String,
    pub tx_id: String,
    pub lp_allocation: Uint128,
    pub pair: Pair,
    pub cw20: Addr,
}
```
| **Name**          | **Type**           | **Description**                                             |
|-------------------|--------------------|-------------------------------------------------------------|
| **sender**        | `String`           | The address of the user requesting to remove liquidity.     |
| **tx_id**         | `String`           | The unique Id for the liquidity removal transaction.        |
| **lp_allocation** | `Uint128`          | The amount of liquidity pool tokens allocated for removal.  |
| **pair**          | [`Pair`](../Euclid%20Smart%20Contracts/overview#pair)             | Information about the token pair.                           |
| **cw20**          | `Addr`             | The address of the CW20 token contract.                     | 


### GetVlp
Queries the VLP address for the specified token pair.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
   #[returns(GetVlpResponse)]
    GetVlp { pair: Pair },
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "get_vlp": {
    "pair": {
      "token_1": {
        "id": "token-1-id"
      },
      "token_2": {
        "id": "token-2-id"
      }
    }
  }
}
`
}
]} />

| **Name**   | **Type** | **Description**                |
|------------|----------|--------------------------------|
| **pair**   | [`Pair`](../Euclid%20Smart%20Contracts/overview#pair)    | The pair of tokens to get the VLP address for. |

The query returns the following response:

```rust
pub struct GetVlpResponse {
    pub vlp_address: String,
}
```

| **Name**      | **Type** | **Description**                          |
|---------------|----------|------------------------------------------|
| **vlp_address** | `String` | The address of the VLP for the specified pair. |


### GetLPToken

Queries the LP token for the specified virtual liquidity pool address.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
    #[returns(GetLPTokenResponse)]
    GetLPToken { vlp: String },
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "get_lp_token": {
    "vlp": "nibi1..."
  }
}
`
}
]} />

| **Name** | **Type** | **Description**                          |
|----------|----------|------------------------------------------|
| **vlp**  | `String` | The address of the virtual liquidity pool to get the LP token for.|

The query returns the following response:

```rust
pub struct GetLPTokenResponse {
    pub token_address: Addr,
}
```

| **Name**      | **Type** | **Description**                          |
|---------------|----------|------------------------------------------|
| **token_address** | `Addr` | The address of the CW20 contract of the LP token for the VLP. |


### GetAllTokens 
Queries all the token Id assosiated with the factory.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
  #[returns(AllTokensResponse)]
    GetAllTokens {},
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "get_all_tokens": {}
}
`
}
]} />

The query returns the following response:

```rust
pub struct AllTokensResponse {
    pub tokens: Vec<Token>,
}
```

| **Name** | **Type**      | **Description**                        |
|----------|---------------|----------------------------------------|
| **tokens** | [`Vec<Token>`](../Euclid%20Smart%20Contracts/overview#token)  | A list of tokens. |

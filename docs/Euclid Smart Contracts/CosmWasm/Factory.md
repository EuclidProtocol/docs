---
sidebar_position: 2
description: "The Factory Smart Contract"
---

import Tabs from '@site/src/components/Tabs'; 

:::note
Each integrated chain has its own factory contract. These contracts will be created by Euclid whenever an integration with a new chain occurs.
You can read about the factory architecture [here](../../Architecture%20Overview/Architecture/Integrated%20Chains%20Layer/factory.md).
:::

## Execute Messages

List of execute messages that can be performed on the Factory contract.

### ExecuteSwapRequest
:::note
The `asset_in` in this case is always a native token that is attached as funds to the message. To perform a swap on CW20 tokens refer to [`Swap`](#swap).
:::

Performs a swap taking the `asset_in` and releasing `asset_out`. The tokens can be released on multiple chains if specified by `cross_chain_addresses`. 

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content:`
  pub enum ExecuteMsg {
    ExecuteSwapRequest(ExecuteSwapRequest),
  }

  pub struct ExecuteSwapRequest {
    pub sender: Option<CrossChainUser>,
    pub asset_in: TokenWithDenom,
    pub amount_in: Uint128,
    pub asset_out: Token,
    pub min_amount_out: Uint128,
    pub timeout: Option<u64>,
    pub swaps: Vec<NextSwapPair>,
    // First element in array has highest priority
    pub cross_chain_addresses: Vec<CrossChainUserWithLimit>,
    pub partner_fee: Option<PartnerFee>,
    pub meta: Option<String>,
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
        "chain_uid": "osmosis",
        "address": "osmo1..."
      },
      "limit":{
          "equal":"1000"
        }
    },
    {
      "user": {
        "chain_uid": "nibiru",
        "address": "nibi1..."
      },
      "limit": "200000"
    }
  ],
  "partner_fee": {
    "partner_fee_bps": 30,
    "recipient": "nibi1..."
  }
 } 
}
`
}
]} />

| Field                   | Type                            | Description                                                                                                               |
|-------------------------|---------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| `sender`              | [`Option<CrossChainUser>`](overview.md#crosschainuser)               |Optional user to execute the swap on behalf of. Typically, you do **not** need to specify a `sender` field. Users send tokens directly with their transaction. However, in cross-chain transactions involving **IBC** (where asynchronous behavior happens), external contracts may want to trigger swaps and have **vouchers minted directly to a user** instead of the contract itself. In these cases, setting `sender` allows the final minted vouchers to be credited properly.                                                                                                |
| `asset_in`              | [`TokenWithDenom`](overview.md#tokenwithdenom)               | The token being swapped in.                                                                                               |
| `asset_out`             | [`Token`](overview#token)                         | The token being swapped out.                                                                                              |
| `amount_in`             | `Uint128`                       | Amount of the input asset.                                                                                                |
| `min_amount_out`        | `Uint128`                       | Minimum amount of the output asset for the swap to be considered a success. Used to specify maximum slippage accepted.                                               |
| `timeout`               | `Option<u64>`                   | Optional duration in seconds after which the message will be timed out. Can be set to a minimum of 30 seconds and a maximum of 240 seconds. Defaults to 60 seconds if not specified.|
| `swaps`                 | `Vec<NextSwapPair>`             | The different swaps to get from asset_in to asset_out. This could be a direct swap or multiple swaps. For example, if swapping from token A to B, the swaps can be A -> B directly, or A -> C then C-> D then D->B. Usually the most efficient route is used. |
| `cross_chain_addresses` | [`Vec<CrossChainUserWithLimit>`](overview#crosschainuserwithlimit)  | A set of addresses to specify where the asset_out should be released. The first element specified in the vector has highest priority and so on. User specifies a limit for each provided address which indicates the amount of funds that should be released to that address. In case there are any leftover funds, they are added to the user's virtual balance for the address that initiated the swap. If limit is not specified, then the maximum amount is taken.  |
| `partner_fee`           | `Option<PartnerFee>`            | Optional partner fee information for swaps.  The maximum fee that can be set is 30 (0.3%).                                                                       |
| `meta`             | `Option<String>`                       |  An optional metadata field for events. This field is used to capture information such as the sequence of swap hops to facilitate the tracking API without the need for backend storage.                          |


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

// The percentage of the fee for the platform. Specified in basis points ie. 1 = 0.01% 10000 = 100%
pub struct PartnerFee {
    // Cannot be set greater than 30 (0.3%)
    pub partner_fee_bps: u64,
    //address to receive the fee.
    pub recipient: String,
}

```

### WithdrawVirtualBalance

Withdraws funds from the user's virtual balance (Voucher tokens) to the specified chains.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
 pub enum ExecuteMsg{
 WithdrawVirtualBalance {
        token: Token,
        amount: Uint128,
        cross_chain_addresses: Vec<CrossChainUserWithLimit>,
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
    "withdraw_virtual_balance": {
        "token": "usdt",
        "amount": "10000",
        "cross_chain_addresses": [
            {
                "user": {
                    "chain_uid": "nibiru",
                    "address": "nibi1..."
                },
               "limit":{
                 "equal":"1000"
                  }
            },
            {
                "user": {
                    "chain_uid": "osmosis",
                    "address": "osmo1..."
                }
            }
        ],
        "timeout": 100
    }
}
`
}
]} />

| **Field**                      | **Type**                                    | **Description**                                                                                           |
|----------------------------|-----------------------------------------|-------------------------------------------------------------------------------------------------------|
| `token`                    | [`Token`](overview#token)                                  | The token to withdraw.                                                                                |
| `amount`                   | `Uint128`                               | The amount of voucher tokens to withdraw.                                                                      |
| `cross_chain_addresses`    |[`Vec<CrossChainUserWithLimit>`](overview#crosschainuserwithlimit)         |       A set of addresses to specify where the funds should be released. The first element specified in the vector has highest priority and so on. User specifies a limit for each provided address which indicates the amount of funds that should be released to that address. If limit is not specified, then the maximum amount is taken.                                          |
| `timeout`                  | `Option<u64>`                           | Optional duration in seconds after which the message will be timed out. Can be set to a minimum of 30 seconds and a maximum of 240 seconds. Defaults to 60 seconds if not specified.

### TransferVirtualBalance
Transfers tokens from the sender's virtual balance tokens to another address.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
 pub enum ExecuteMsg{
 TransferVirtualBalance {
        token: Token,
        amount: Uint128,
        recipient_address: CrossChainUser,
        timeout: Option<u64>,
    },
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "transfer_virtual_balance": {
    "token": "Euclid",
    "amount": "10000000",
    "recipient_address": {
      "chain_uid": "nibiru",
      "address": "nibi1..."
    },
    "timeout": 60
  }
}
`
}
]} />

| **Field**              | **Type**                                         | **Description**                                                                                           |
|------------------------|--------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| `token`                | [`Token`](overview#token)                        | The token Id of the token to transfer.                                                                                    |
| `amount`               | `Uint128`                                        | The amount of virtual balance tokens to transfer.                                                                          |
| `recipient_address`    | [`CrossChainUser`](overview#crosschainuser)       | The address on the target chain to which the funds should be sent.                                        |
| `timeout`              | `Option<u64>`                                    | Optional duration in seconds after which the message will be timed out. Can be set to a minimum of 30 seconds and a maximum of 240 seconds. Defaults to 60 seconds if not specified. |

### AddLiquidityRequest

:::note
The user will receive LP tokens representing their share of liquidity in the pool. These tokens can be then used to withdraw the added liquidity later on.
:::

Send a message to the VLP requesting the addition of liquidity to the specified token pair. There are two types of tokens that can be used:
- **Native:** For native, funds should be attached along with the message.
- **CW20:** For CW20, the tokens should be provided to the factory contract as a CW20 allowance before calling `AddLiquidityRequest`. The factory will then handle the transfer of the tokens to the pool.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum ExecuteMsg {
  AddLiquidityRequest {
        pair_info: PairWithDenomAndAmount,
        slippage_tolerance_bps: u64,
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
        "amount": "10000",
        "token_type": {
          "native": {
            "denom": "native-denom-1"
          }
        }
      },
      "token_2": {
        "token": "token-2-id",
        "amount": "40000",
        "token_type": {
          "native": {
            "denom": "native-denom-2"
          }
        }
      }
    },
    "slippage_tolerance_bps": 300,
    "timeout": 120
  }
}
`
}
]} />

| **Field**              | **Type**             | **Description**                                                                                                       |
|-----------------------|----------------------|-----------------------------------------------------------------------------------------------------------------------|
| **pair_info**         | [`PairWithDenomAndAmount`](overview#pairwithdenomandamount)      | The tokens to add liquidity to, with the amount for each.                                                                                   |
| **slippage_tolerance_bps**| `u64`                | The amount of slippage tolerated. If the slippage amount surpasses the specified amount, the request will fail and the user receives back the tokens. Specified as a percentage between 1 and 100 using basis points (100bps=1%). |
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
        pair: PairWithDenomAndAmount,
        pool_config: PoolConfig,
        slippage_tolerance_bps: u64,
        timeout: Option<u64>,
        lp_token_name: String,
        lp_token_symbol: String,
        lp_token_decimal: u8,
        lp_token_marketing: Option<cw20_base::msg::InstantiateMarketingInfo>,
     }
 pub enum PoolConfig {
    Stable { amp_factor: Option<Uint64> }, ///used to create a stable pool. *amp_factor* defaults to 1000.
    ConstantProduct {}, ///Used to create constant product pools (x*y=k)
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
      "amount": "10000",
      "token_type": {
        "native": {
          "denom": "native-denom-1"
        }
      }
    },
    "token_2": {
      "token": "token-2-id",
      "amount": "400000",
      "token_type": {
        "native": {
          "denom": "native-denom-2"
        }
      }
    }
  },
  "pool_config": {
      "stable": {
        "amp_factor": "1200"
      }
    },
  "slippage_tolerance_bps": 100,
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

| **Field**                | **Type**                                | **Description**                                                                                                              |
|----------------------|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| `pair`               | [`PairWithDenomAndAmount`](overview#pairwithdenomandamount)                      | The token pair to request creating a new pool for.                                                                       |
| `pool_config`             | `PoolConfig`    | The pool configuration type (e.g., Stable with amplification factor, or ConstantProduct). |
| `slippage_tolerance_bps` | `u64`                                   | Allowed slippage amount in basis points (bps) during pool creation.                                                       |
| `timeout`            | `Option<u64>`                       | Optional duration in seconds after which the message will be timed out. Can be set to a minimum of 30 seconds and a maximum of 240 seconds. Defaults to 60 seconds if not specified.                |
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
| **Field**         | **Description**                          |
|---------------|--------------------------------------|
| `project`     | Optional name of the LP token.        |
| `description` | Optional description of the project. |
| `marketing`   | Optional marketing URL (links to website etc...).              |
| [`logo`](https://docs.rs/cw20/latest/cw20/enum.Logo.html)        | Optional logo for the LP token.           |


### DepositToken
Exchange attached funds for voucher tokens. 

:::tip
Voucher tokens can be swapped on any chain allowing users to swap them using the chains with lowest gas fees.
:::

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
 pub enum ExecuteMsg{
   DepositToken {
        asset_in: TokenWithDenom,
        amount_in: Uint128,
        timeout: Option<u64>,
        recipient: Option<CrossChainUser>,
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
  "deposit_token": {
    "asset_in": {
      "token": "token-id",
      "amount": "5000",
      "token_type": {
        "native": {
          "denom": "native-denom-1"
        }
      }
    },
    "amount_in": "5000",
    "timeout": 100,
    "recipient": {
      "chain_uid": "osmosis",
      "address": "osmo1..."
    }
  }
}
`
}
]} />

| **Field**       | **Type**              | **Description**                        |
|----------------|-----------------------|----------------------------------------|
| `asset_in`     | [`TokenWithDenom`](overview#tokenwithdenom)      | The asset being exchanged. Should be native in this case.  |
| `amount_in`    | `Uint128`             | The amount of tokens being exchanged. Should match attached funds to the message.        |
| `timeout`      | `Option<u64>`         | Optional duration in seconds after which the message will be timed out. Can be set to a minimum of 30 seconds and a maximum of 240 seconds. Defaults to 60 seconds if not specified.      |
| `recipient`    | [`Option<CrossChainUser>`](overview#crosschainuser) | Optional recipient to receive the voucher tokens. Defaults to the sender if not specified.      |

## CW20 Messages

### CW20 Receive

Handles the case of receiving CW20 tokens from a CW20 contract.

```rust
Receive(Cw20ReceiveMsg),

pub struct Cw20ReceiveMsg {
    pub sender: String,
    pub amount: Uint128,
    pub msg: Binary,
}

```
The `msg` needs to be a FactoryCW20HookMsg encoded in base64.

```rust
#[cw_serde]
pub enum FactoryCw20HookMsg {
    Deposit {
        token: Token,
        timeout: Option<u64>,
        recipient: Option<CrossChainUser>,
    },
    Swap {
        asset_in: TokenWithDenom,
        asset_out: Token,
        min_amount_out: Uint128,
        swaps: Vec<NextSwapPair>,
        timeout: Option<u64>,
        cross_chain_addresses: Vec<CrossChainUserWithLimit>,
        partner_fee: Option<PartnerFee>,
        meta: Option<String>,
    },
    RemoveLiquidity {
        pair: Pair,
        lp_allocation: Uint128,
        timeout: Option<u64>,
        // First element in array has highest priority
        cross_chain_addresses: Vec<CrossChainUserWithLimit>,
    },
}
```

:::note
These messages are not called directly on the factory. They are attached as a `msg` when sending CW20 tokens to this contract. The CW20 `Send` message is the following:
```rust
pub enum Cw20ExecuteMsg {
  /// Send is a base message to transfer tokens to a contract and trigger an action
  /// on the receiving contract.
 Send {
        contract: String,
        amount: Uint128,
        // Base64 encoded message of the JSON representation for the message (In our case either Swap or RemoveLiquidity).
        msg: Binary,
    },
}
```
- The `msg` field here should be the Binary encoded representation of the JSON message of a  `FactoryCW20HookMsg` (Swap,RemoveLiquidity, or DepositToken).
:::


### Swap

Perform a swap on the sent CW20 tokens.

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
        meta: Option<String>,
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
      "smart": {
        "contract_address": "nibi1..."
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
      "limit":{
          "equal":"1000"
        }
    },
    {
      "user": {
        "chain_uid": "chain2",
        "address": "nibi1..."
      },
      "limit":{
          "equal":"1000"
        }
    }
  ],
  "partner_fee": {
    "partner_fee_bps": 30,
    "recipient": "nibi1..."
  }
 } 
}
`
}
]} />

:::note
The fields are the same for a native [swap](#executeswaprequest). 
:::

### Remove Liquidity

:::note
You can only call RemoveLiquidity if you have previously added liquidity to the pool by calling AddLiquidity.
:::

Receives the sent CW20 LP tokens and withdraws liquidity originally added into the pool by the sender.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
 RemoveLiquidity {
        pair: Pair,
        lp_allocation: Uint128,
        timeout: Option<u64>,
        cross_chain_addresses: Vec<CrossChainUserWithLimit>,
    },
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `

{ "remove_liquidity":{
    "pair": {
        "token_1": "udst",
        "token_2": "nibi"
    },
    "lp_allocation": "100000000000",  
    "timeout": 120,  
    "cross_chain_addresses": [
        {
            "user": {
                "chain_uid": "chainA",
                "address": "cosmo1..."
            },
            "limit":{
          "equal":"1000"
             }  
        },
        {
            "user": {
                "chain_uid": "ChainB",
                "address": "nibi1..."
            },
            "limit": null  
        }
    ]
 }
}
`
}
]} />

| Field                 | Type                            | Description                                                   |
|-----------------------|---------------------------------|---------------------------------------------------------------|
| pair                  | [`Pair`](overview#pair)                 | The pair of tokens for which liquidity is being removed. |
| lp_allocation         | `Uint128`                       | The amount of LP tokens being returned to the pool.          |
| timeout               | `Option<u64>`                   | Optional duration in seconds after which the message will be timed out. Can be set to a minimum of 30 seconds and a maximum of 240 seconds. Defaults to 60 seconds if not specified.|
| cross_chain_addresses | [`Vec<CrossChainUserWithLimit>`](overview#crosschainuserwithlimit) |  A set of addresses to specify where the liquidity should be released. The first element specified in the vector has highest priority and so on. User specifies a limit for each provided address which indicates the amount of funds that should be released to that address. In case there are any leftover funds, they are added to the user's virtual balance for the address that initiated the message. If limit is not specified, then the maximum amount is taken.       |


### Deposit
Exchange the sent CW20 tokens for voucher tokens. 

:::tip
Voucher tokens can be swapped on any chain allowing users to swap them using the chains with lowest gas fees.
:::

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
 Deposit {
        token: Token,
        timeout: Option<u64>,
        recipient: Option<CrossChainUser>,
    },
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "deposit": {
    "token": "token-id",
    "timeout": 100,
    "recipient": {
      "chain_uid": "nibiru",
      "address": "nibi1..."
    }
  }
}
`
}
]} />

| **Field**      | **Type**              | **Description**                        |
|----------------|-----------------------|----------------------------------------|
| `token`        | [`Token`](overview#token)               | Token Id of the CW20 token.                |
| `timeout`      | `Option<u64>`         |  Optional duration in seconds after which the message will be timed out. Can be set to a minimum of 30 seconds and a maximum of 240 seconds. Defaults to 60 seconds if not specified.      |
| `recipient`    | [`Option<CrossChainUser>`](overview#crosschainuser) | Optional recipient to receive the voucher tokens. Defaults to the sender if not specified.        |


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
#[cw_serde]
pub struct StateResponse {
    pub chain_uid: ChainUid,
    pub router_contract: String,
    pub hub_channel: Option<String>,
    pub admin: String,
    // Escrow Code ID
    pub escrow_code_id: u64,
    // CW20 Code ID
    pub cw20_code_id: u64,
    pub is_native: bool,
    pub partner_fees_collected: DenomFees,
}

pub struct DenomFees {
    // A map to store the total fees per denomination
    pub totals: HashMap<String, Uint128>,
}

```
| **Field**              | **Type**        | **Description**                                                                                   |
|------------------------|-----------------|---------------------------------------------------------------------------------------------------|
| `chain_uid`            | [`ChainUid`](overview#crosschainuser)     | The unique Id of the blockchain the factory is deployed on.                                       |
| `router_contract`      | `String`        | The address of the router contract used to relay messages from and to the factory.                |
| `hub_channel`          | `Option<String>`| The IBC channel used to forward messages to and from the hub.                                     |
| `admin`                | `String`        | The address of the admin of the factory.                                                          |
| `escrow_code_id`       | `u64`           | Code code Id used for escrow contracts.                                                                 |
| `cw20_code_id`         | `u64`           | Code code Id used for LP token contracts.                                                                    |
| `is_native`            | `bool`          | Indicates whether the factory is native to the blockchain.                                        |
| `partner_fees_collected` | `DenomFees`    | Total amount of fees collected by the partner fee. Each denom and amount is returned.                                        |

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
| **denoms**       | [`Vec<TokenType>`](overview#tokentype)    | A list of token types associated with the escrow.                                 |

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
    pub pair: Pair,
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
        pagination: Pagination<Uint128>,
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
    "pagination": {
      "min": "3",  
      "max": "15"   
    }
  }
}
`
}
]} />

| **Name**       | **Type**         | **Description**                                 |
|----------------|------------------|-------------------------------------------------|
| **user**       | `Addr`           | The address of the user to query swaps for.     |
| **pagination**| [`Pagination<Uin128>`](../CosmWasm/overview.md#pagination)   | Pagination parameters.          |


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
    pub partner_fee_recipient: Addr,
}
```
| **Name**               | **Type**                           | **Description**                                      |
|------------------------|------------------------------------|------------------------------------------------------|
| **sender**             | `String`                           | The address of the user initiating the swap.         |
| **tx_id**              | `String`                           | The transaction Id for the swap.                     |
| **asset_in**           | [`TokenWithDenom`](overview#tokenwithdenom)                  | The asset being swapped.                             |
| **asset_out**          | `Token`                            | The asset being received.                            |
| **amount_in**          | `Uint128`                          | The amount of the asset being swapped.               |
| **min_amount_out**     | `Uint128`                          | The minimum amount of the asset being received for the swap to be a success.      |
| **swaps**              | `Vec<NextSwapPair>`                | The different swaps to get from asset_in to asset_out. |
| **timeout**            | `IbcTimeout`                       | The timeout time for the swap. Returned as a timestamp.                 |
| **cross_chain_addresses** | [`Vec<CrossChainUserWithLimit>`](overview#crosschainuserwithlimit)  |  A set of addresses to specify where the asset_out should be released. The first element specified in the vector has highest priority and so on.      |
| **partner_fee_amount** | `Uint128`                          | The amount of the partner fee taken for this swap.                       |
| **partner_fee_recipient** | `Addr`                 | The recipient of the partner fee.                    |

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
        pagination: Pagination<Uint128>,
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
    "pagination": {
      "min": "2",  
      "max": "7"  
  }
}
`
}
]} />

| **Name**       | **Description**                                 |
|----------------|-------------------------------------------------|
| **user**       | The address of the user to query liquidity for.                       |
| **pagination**| [`Pagination<Uin128>`](../CosmWasm/overview.md#pagination)   | Pagination parameters.          |

The query returns the following response:

```rust
pub struct GetPendingLiquidityResponse {
    pub pending_add_liquidity: Vec<AddLiquidityRequest>,
}

pub struct AddLiquidityRequest {
    pub sender: String,
    pub tx_id: String,
    pub pair_info: PairWithDenomAndAmount,
}
```
| **Name**             | **Type**           | **Description**                                      |
|----------------------|--------------------|------------------------------------------------------|
| **sender**           | `String`           | The address of the user with pending liquidity.      |
| **tx_id**            | `String`           | The unique Id for the liquidity transaction.         |
| **pair_info**        | [`PairWithDenomAndAmount`](overview#pairwithdenomandamount)     | Information about the token pair (Token Id, type, and amount for each token). |

### PendingRemoveLiquidity

Queries the liquidity that is pending removal for the specified user address.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
  #[returns(GetPendingRemoveLiquidityResponse)]
    PendingRemoveLiquidity {
        user: Addr,
        pagination: Pagination<Uint128>,
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
  "pending_remove_liquidity": {
    "user": "cosmo1...",
    "pagination": {
      "min": "5",  
      "max": "15"  
  }
  }
}
`
}
]} />

| **Name**       | **Description**                                 |
|----------------|-------------------------------------------------|
| **user**       | The address of the user to query liquidity for.                       |
| **pagination**| [`Pagination<Uin128>`](../CosmWasm/overview.md#pagination)   | Pagination parameters.          |

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
| **pair**          | [`Pair`](overview#pair)             | Information about the token pair.                           |
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
      "token_1":"token-1-id",
      "token_2":"token-2-id"
    }
  }
}
`
}
]} />

| **Name**   | **Type** | **Description**                |
|------------|----------|--------------------------------|
| **pair**   | [`Pair`](overview#pair)    | The pair of tokens to get the VLP address for. |

The query returns the following response:

```rust
pub struct GetVlpResponse {
    pub vlp_address: String,
}
```

| **Name**      | **Type** | **Description**                          |
|---------------|----------|------------------------------------------|
| **vlp_address** | `String` | The contract address of the VLP for the specified pair. |

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
| **tokens** | [`Vec<Token>`](overview#token)  | A list of tokens. |

### GetPartnerFeesCollected
Queries the total amount of fees collected by the set partner fee.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
  #[returns(PartnerFeesCollectedResponse)]
  GetPartnerFeesCollected {},
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "get_partner_fees_collected": {}
}
`
}
]} />

The query returns the following response:

```rust
pub struct PartnerFeesCollectedResponse {
    pub total: DenomFees,
}

pub struct DenomFees {
    pub totals: HashMap<String, Uint128>,
}

```
| **Field**  | **Type**                         | **Description**                                         | 
|------------|----------------------------------|---------------------------------------------------------|
| `totals`   | `HashMap<String, Uint128>`       | A map that stores the total fees collected for each denomination. | 

### GetLPToken
Queries the CW20 contract address of the LP token for the specified pool.

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
  "get_l_p_token": {
    "vlp": "nibi1..."
  }
}
`
}
]} />

The query returns the following response:

```rust
pub struct GetLPTokenResponse {
    pub token_address: Addr,
}

```
| **Field**  | **Type**                         | **Description**                                         | 
|------------|----------------------------------|---------------------------------------------------------|
| `token_address`   | `Addr`       | The contract address of the CW20 contract that issues the LP tokens.| 
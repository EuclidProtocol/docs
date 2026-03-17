---
sidebar_position: 2
description: "The Factory Smart Contract"
---

import Tabs from '@site/src/components/Tabs';

:::note
Each integrated chain has its own Factory contract. These contracts are created by Euclid when a chain integration is added.
Read more about Factory architecture [here](../../Architecture%20Overview/Architecture/Integrated%20Chains%20Layer/factory.md).
:::

## Execute Messages

The Factory is the main user-facing contract on integrated chains.

### ExecuteSwapRequest

Performs a swap taking `asset_in` and releasing `asset_out`.

<Tabs tabs={[
{
id: 'factory-exec-swap-rust',
label: 'Rust',
language: 'rust',
content: `
pub enum ExecuteMsg {
    ExecuteSwapRequest(ExecuteSwapRequest),
}

pub struct ExecuteSwapRequest {
    pub asset_in: TokenWithDenom,
    pub amount_in: Uint128,
    pub asset_out: Token,
    pub min_amount_out: Uint128,
    pub swaps: Vec<NextSwapPair>,
    pub recipients: Vec<Recipient>,
    pub partner_fee: Option<PartnerFee>,
    pub cross_chain_config: CrossChainConfig,
}
`
},
{
id: 'factory-exec-swap-json',
label: 'JSON',
language: 'json',
content: `
{
  "execute_swap_request": {
    "asset_in": {
      "token": "usdc",
      "token_type": {
        "smart": { "contract_address": "0xaf88d065e77c8cc2239327c5edb3a432268e5831" }
      }
    },
    "asset_out": "usdt",
    "amount_in": "1000000",
    "min_amount_out": "950000",
    "swaps": [
      { "token_in": "usdc", "token_out": "eth" },
      { "token_in": "eth", "token_out": "usdt" }
    ],
    "recipients": [
      {
        "recipient": {
          "chain_uid": "arbitrum",
          "address": "0x4e2F45d2E0a93d0A6F4dA8036a1b7A9a2E7C6D1F"
        },
        "amount": { "less_than_or_equal": "1000000" },
        "denom": {
          "smart": { "contract_address": "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9" }
        }
      }
    ],
    "partner_fee": {
      "partner_fee_bps": 30,
      "recipient": "0x8B9fF3A6a74E920b8a7C4f3a6D6F0A6d13B3E7f2"
    },
    "cross_chain_config": {
      "timeout": 120,
      "meta": "route=usdc-eth-usdt"
    }
  }
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `asset_in` | [`TokenWithDenom`](overview.md#tokenwithdenom) | The token being swapped in. |
| `asset_out` | [`Token`](overview.md#token) | The token being swapped out. |
| `amount_in` | `Uint128` | Amount of the input asset. |
| `min_amount_out` | `Uint128` | Minimum amount of the output asset for the swap to be considered a success. Used to specify maximum slippage accepted. |
| `swaps` | `Vec<NextSwapPair>` | The different swaps to get from asset_in to asset_out. This could be a direct swap or multiple swaps. For example, if swapping from token A to B, the swaps can be A -> B directly, or A -> C then C -> D then D -> B. Usually the most efficient route is used. |
| `recipients` | [`Vec<Recipient>`](overview.md#recipient) | A set of recipients that specifies where and how the output should be released. This replaces the old cross-chain address limit list and supports priority/amount behavior through `Recipient.amount`. |
| `partner_fee` | `Option<PartnerFee>` | Optional partner fee information for swaps. The maximum fee that can be set is 30 (0.3%). |
| `cross_chain_config` | [`CrossChainConfig`](#crosschainconfig) | Cross-chain timeout/ack/meta controls for this request. |

With the following structs:

<Tabs tabs={[
{
id: 'factory-nextswappair-rust',
label: 'Rust',
language: 'rust',
content: `
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
`
},
{
id: 'factory-nextswappair-json',
label: 'JSON',
language: 'json',
content: `
{
  "next_swap_pair": {
    "token_in": "usdc",
    "token_out": "usdt"
  },
  "partner_fee": {
    "partner_fee_bps": 30,
    "recipient": "0x8B9fF3A6a74E920b8a7C4f3a6D6F0A6d13B3E7f2"
  }
}
`
}
]} />

### DepositToken

Exchanges deposited token funds for vouchers/releases based on recipients.

<Tabs tabs={[
{
id: 'factory-exec-deposit-rust',
label: 'Rust',
language: 'rust',
content: `
pub enum ExecuteMsg {
    DepositToken {
        asset_in: TokenWithDenom,
        amount_in: Uint128,
        recipients: Vec<Recipient>,
        cross_chain_config: CrossChainConfig,
    },
}
`
},
{
id: 'factory-exec-deposit-json',
label: 'JSON',
language: 'json',
content: `
{
  "deposit_token": {
    "asset_in": {
      "token": "usdc",
      "token_type": { "smart": { "contract_address": "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359" } }
    },
    "amount_in": "5000",
    "recipients": [
      {
        "recipient": { "chain_uid": "base", "address": "0x2B6fE2C04c9b7B1E2E4A4f8bD4bE9A7F0f7B00D2" },
        "amount": { "equal": "5000" },
        "denom": { "voucher": {} }
      }
    ],
    "cross_chain_config": {
      "timeout": 100
    }
  }
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `asset_in` | [`TokenWithDenom`](overview.md#tokenwithdenom) | The asset being exchanged. |
| `amount_in` | `Uint128` | The amount of tokens being exchanged. Should match attached funds to the message when native funds are used. |
| `recipients` | [`Vec<Recipient>`](overview.md#recipient) | Recipients that define who should receive resulting vouchers/releases and under what constraints. |
| `cross_chain_config` | [`CrossChainConfig`](#crosschainconfig) | Cross-chain timeout/ack/meta controls for this request. |

### TransferVoucher

Transfers voucher balance to one or more recipients.

<Tabs tabs={[
{
id: 'factory-exec-transfervoucher-rust',
label: 'Rust',
language: 'rust',
content: `
pub enum ExecuteMsg {
    TransferVoucher {
        token_id: Token,
        amount: Uint128,
        from: Option<CrossChainUser>,
        recipients: Vec<Recipient>,
        cross_chain_config: CrossChainConfig,
    },
}
`
},
{
id: 'factory-exec-transfervoucher-json',
label: 'JSON',
language: 'json',
content: `
{
  "transfer_voucher": {
    "token_id": "usdc",
    "amount": "100000",
    "from": {
      "chain_uid": "base",
      "address": "0x7A93d4Bc1f1e51D3b8A912B1E6D2a5a13C44B9F1"
    },
    "recipients": [
      {
        "recipient": { "chain_uid": "arbitrum", "address": "0x4e2F45d2E0a93d0A6F4dA8036a1b7A9a2E7C6D1F" },
        "amount": { "less_than_or_equal": "100000" },
        "denom": { "voucher": {} }
      }
    ],
    "cross_chain_config": {
      "timeout": 120
    }
  }
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `token_id` | [`Token`](overview.md#token) | Token id of the voucher balance to transfer. |
| `amount` | `Uint128` | Amount of voucher balance to transfer. |
| `from` | [`Option<CrossChainUser>`](overview.md#crosschainuser) | Optional source user when using approved transfer flow (allowance-style behavior). |
| `recipients` | [`Vec<Recipient>`](overview.md#recipient) | Destination recipients and release constraints. |
| `cross_chain_config` | [`CrossChainConfig`](#crosschainconfig) | Cross-chain timeout/ack/meta controls for this request. |

### RequestPoolCreation

Sends a request to create a new pool.

<Tabs tabs={[
{
id: 'factory-exec-requestpool-rust',
label: 'Rust',
language: 'rust',
content: `
pub enum ExecuteMsg {
    RequestPoolCreation {
        pair_with_denom_and_amount: PairWithDenomAndAmount,
        pool_config: PoolConfig,
        lp_token_name: String,
        lp_token_symbol: String,
        lp_token_decimal: u8,
        slippage_tolerance_bps: u64,
        lp_token_marketing: Option<cw20_base::msg::InstantiateMarketingInfo>,
        cross_chain_config: CrossChainConfig,
    },
}
`
},
{
id: 'factory-exec-requestpool-json',
label: 'JSON',
language: 'json',
content: `
{
  "request_pool_creation": {
    "pair_with_denom_and_amount": {
      "token_1": {
        "token": "usdc",
        "amount": "10000",
        "token_type": { "smart": { "contract_address": "0xaf88d065e77c8cc2239327c5edb3a432268e5831" } }
      },
      "token_2": {
        "token": "usdt",
        "amount": "10000",
        "token_type": { "smart": { "contract_address": "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9" } }
      }
    },
    "pool_config": { "constant_product": {} },
    "lp_token_name": "USDC-USDT LP",
    "lp_token_symbol": "UU-LP",
    "lp_token_decimal": 18,
    "slippage_tolerance_bps": 100,
    "cross_chain_config": {
      "timeout": 180
    }
  }
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `pair_with_denom_and_amount` | [`PairWithDenomAndAmount`](overview.md#pairwithdenomandamount) | The token pair and amounts for pool creation. |
| `pool_config` | `PoolConfig` | Pool configuration type (Stable or ConstantProduct). |
| `lp_token_name` | `String` | Name of the LP token. |
| `lp_token_symbol` | `String` | Symbol of the LP token. |
| `lp_token_decimal` | `u8` | Decimal precision of the LP token. |
| `slippage_tolerance_bps` | `u64` | Allowed slippage in basis points. |
| `lp_token_marketing` | `Option<cw20_base::msg::InstantiateMarketingInfo>` | Optional CW20 marketing metadata for LP token. |
| `cross_chain_config` | [`CrossChainConfig`](#crosschainconfig) | Cross-chain timeout/ack/meta controls for this request. |

### AddLiquidity

Adds liquidity to an existing pool.

<Tabs tabs={[
{
id: 'factory-exec-addliquidity-rust',
label: 'Rust',
language: 'rust',
content: `
pub enum ExecuteMsg {
    AddLiquidity {
        pair_with_denom_and_amount: PairWithDenomAndAmount,
        slippage_tolerance_bps: u64,
        cross_chain_config: CrossChainConfig,
    },
}
`
},
{
id: 'factory-exec-addliquidity-json',
label: 'JSON',
language: 'json',
content: `
{
  "add_liquidity": {
    "pair_with_denom_and_amount": {
      "token_1": {
        "token": "usdc",
        "amount": "2500",
        "token_type": { "smart": { "contract_address": "0xaf88d065e77c8cc2239327c5edb3a432268e5831" } }
      },
      "token_2": {
        "token": "usdt",
        "amount": "2500",
        "token_type": { "smart": { "contract_address": "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9" } }
      }
    },
    "slippage_tolerance_bps": 150,
    "cross_chain_config": {
      "timeout": 120
    }
  }
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `pair_with_denom_and_amount` | [`PairWithDenomAndAmount`](overview.md#pairwithdenomandamount) | Token pair and amounts to add as liquidity. |
| `slippage_tolerance_bps` | `u64` | Slippage tolerance for add-liquidity operation. |
| `cross_chain_config` | [`CrossChainConfig`](#crosschainconfig) | Cross-chain timeout/ack/meta controls for this request. |

#### CrossChainConfig

Common cross-chain settings reused by Factory execute and CW20 hook messages.

<Tabs tabs={[
{
id: 'factory-crosschainconfig-rust',
label: 'Rust',
language: 'rust',
content: `
pub struct CrossChainConfig {
    pub timeout: Option<u64>,
    pub ack_response: Option<Binary>,
    pub meta: Option<String>,
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `timeout` | `Option<u64>` | Timeout for the cross chain message. |
| `ack_response` | `Option<Binary>` | Ack response for the cross chain message. Will be used to trigger a euclid receive message on sender when ack is received. |
| `meta` | `Option<String>` | Meta data for the cross chain message. Will be used to store any additional data needed for the cross chain message as event attributes. |

## CW20 Messages

### CW20 Receive

Handles the case of receiving CW20 tokens from a CW20 contract.

<Tabs tabs={[
{
id: 'factory-cw20-receive-rust',
label: 'Rust',
language: 'rust',
content: `
Receive(Cw20ReceiveMsg),

pub struct Cw20ReceiveMsg {
    pub sender: String,
    pub amount: Uint128,
    pub msg: Binary,
}
`
}
]} />

The `msg` needs to be a `FactoryCw20HookMsg` encoded in base64.

<Tabs tabs={[
{
id: 'factory-cw20-hook-rust',
label: 'Rust',
language: 'rust',
content: `
pub enum FactoryCw20HookMsg {
    Deposit {
        token: Token,
        recipients: Vec<Recipient>,
        cross_chain_config: CrossChainConfig,
    },
    RemoveLiquidity {
        pair: Pair,
        recipient: CrossChainUser,
        cross_chain_config: CrossChainConfig,
    },
    Swap {
        asset_in: TokenWithDenom,
        asset_out: Token,
        min_amount_out: Uint128,
        swaps: Vec<NextSwapPair>,
        recipients: Vec<Recipient>,
        partner_fee: Option<PartnerFee>,
        cross_chain_config: CrossChainConfig,
    },
}
`
}
]} />

:::note
These messages are not called directly on the factory. They are attached as a `msg` when sending CW20 tokens to this contract. The CW20 `Send` message is:

<Tabs tabs={[
{
id: 'factory-cw20-send-rust',
label: 'Rust',
language: 'rust',
content: `
pub enum Cw20ExecuteMsg {
  /// Send is a base message to transfer tokens to a contract and trigger an action
  /// on the receiving contract.
  Send {
    contract: String,
    amount: Uint128,
    // Base64 encoded message of the JSON representation for the message
    // (in our case either Deposit, Swap, or RemoveLiquidity).
    msg: Binary,
  },
}
`
}
]} />

- The `msg` field should be the `Binary`-encoded JSON message of `FactoryCw20HookMsg`.
:::

### Swap

Performs a swap on sent CW20 tokens.

<Tabs tabs={[
{
id: 'factory-cw20-swap-rust',
label: 'Rust',
language: 'rust',
content: `
pub enum FactoryCw20HookMsg {
    Swap {
        asset_in: TokenWithDenom,
        asset_out: Token,
        min_amount_out: Uint128,
        swaps: Vec<NextSwapPair>,
        recipients: Vec<Recipient>,
        partner_fee: Option<PartnerFee>,
        cross_chain_config: CrossChainConfig,
    },
}
`
},
{
id: 'factory-cw20-swap-json',
label: 'JSON',
language: 'json',
content: `
{
  "swap": {
    "asset_in": {
      "token": "usdc",
      "token_type": {
        "smart": { "contract_address": "0xaf88d065e77c8cc2239327c5edb3a432268e5831" }
      }
    },
    "asset_out": "usdt",
    "min_amount_out": "950000",
    "swaps": [
      { "token_in": "usdc", "token_out": "eth" },
      { "token_in": "eth", "token_out": "usdt" }
    ],
    "recipients": [
      {
        "recipient": {
          "chain_uid": "arbitrum",
          "address": "0x4e2F45d2E0a93d0A6F4dA8036a1b7A9a2E7C6D1F"
        },
        "amount": { "less_than_or_equal": "1000000" },
        "denom": {
          "smart": { "contract_address": "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9" }
        }
      }
    ],
    "partner_fee": {
      "partner_fee_bps": 30,
      "recipient": "0x8B9fF3A6a74E920b8a7C4f3a6D6F0A6d13B3E7f2"
    },
    "cross_chain_config": {
      "timeout": 120,
      "meta": "route=usdc-eth-usdt"
    }
  }
}
`
}
]} />

:::note
- For CW20 swap, the input amount is provided by the CW20 `Send.amount`. So the hook message does not include `amount_in`.
- Other than `amount_in`, the swap fields are the same as native [`ExecuteSwapRequest`](#executeswaprequest).
:::

### Remove Liquidity

Receives sent LP CW20 tokens and removes liquidity for the sender.

<Tabs tabs={[
{
id: 'factory-cw20-removeliquidity-rust',
label: 'Rust',
language: 'rust',
content: `
pub enum FactoryCw20HookMsg {
    RemoveLiquidity {
        pair: Pair,
        recipient: CrossChainUser,
        cross_chain_config: CrossChainConfig,
    },
}
`
},
{
id: 'factory-cw20-removeliquidity-json',
label: 'JSON',
language: 'json',
content: `
{
  "remove_liquidity": {
    "pair": {
      "token_1": "usdc",
      "token_2": "usdt"
    },
    "recipient": {
      "chain_uid": "base",
      "address": "0x2B6fE2C04c9b7B1E2E4A4f8bD4bE9A7F0f7B00D2"
    },
    "cross_chain_config": {
      "timeout": 120
    }
  }
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `pair` | [`Pair`](overview.md#pair) | The pair of tokens for which liquidity is being removed. |
| `recipient` | [`CrossChainUser`](overview.md#crosschainuser) | Recipient that should receive released liquidity. |
| `cross_chain_config` | [`CrossChainConfig`](#crosschainconfig) | Cross-chain timeout/ack/meta controls for this request. |

### Deposit

Exchanges sent CW20 tokens for vouchers.

<Tabs tabs={[
{
id: 'factory-cw20-deposit-rust',
label: 'Rust',
language: 'rust',
content: `
pub enum FactoryCw20HookMsg {
    Deposit {
        token: Token,
        recipients: Vec<Recipient>,
        cross_chain_config: CrossChainConfig,
    },
}
`
},
{
id: 'factory-cw20-deposit-json',
label: 'JSON',
language: 'json',
content: `
{
  "deposit": {
    "token": "usdc",
    "recipients": [
      {
        "recipient": {
          "chain_uid": "base",
          "address": "0x2B6fE2C04c9b7B1E2E4A4f8bD4bE9A7F0f7B00D2"
        },
        "amount": { "equal": "5000" },
        "denom": { "voucher": {} }
      }
    ],
    "cross_chain_config": {
      "timeout": 100
    }
  }
}
`
}
]} />

:::note
- For CW20 deposit, the input amount is provided by the CW20 `Send.amount`. So the hook message does not include `amount_in`.
- Other than `amount_in`, the deposit fields are the same as native [`DepositToken`](#deposittoken).
:::

## Query Messages

List of queries that can be performed on the Factory contract.

### GetState

Queries the information related to the Factory setup.

<Tabs tabs={[
{
id: 'factory-query-getstate-rust',
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
id: 'factory-query-getstate-json',
label: 'JSON',
language: 'json',
content: `
{
  "get_state": {}
}
`
}
]} />

The query returns the following response:

<Tabs tabs={[
{
id: 'factory-query-getstate-response-rust',
label: 'Rust',
language: 'rust',
content: `
#[cw_serde]
pub struct StateResponse {
    pub chain_uid: ChainUid,
    pub router_contract: String,
    pub relayer_contract: Addr,
    pub admin: String,
    pub escrow_code_id: u64,
    pub lp_code_id: u64,
    pub is_native: bool,
}
`
},
{
id: 'factory-query-getstate-response-json',
label: 'JSON',
language: 'json',
content: `
{
  "chain_uid": "arbitrum",
  "router_contract": "euclid1router9a3w2s5n6k7m8q9r0t1v2x3y4z5u6",
  "relayer_contract": "euclid1relayer7p8q9r0s1t2u3v4w5x6y7z8a9b0",
  "admin": "euclid1admin3l4m5n6p7q8r9s0t1u2v3w4x5y6z7",
  "escrow_code_id": 74,
  "lp_code_id": 75,
  "is_native": false
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `chain_uid` | [`ChainUid`](overview.md#crosschainuser) | The unique id of the blockchain the factory is deployed on. |
| `router_contract` | `String` | The address of the router contract used to relay messages from and to the factory. |
| `relayer_contract` | `Addr` | Relayer contract address used by this factory. |
| `admin` | `String` | The address of the admin of the factory. |
| `escrow_code_id` | `u64` | Code id used for escrow contracts. |
| `lp_code_id` | `u64` | Code id used for LP token contracts. |
| `is_native` | `bool` | Indicates whether the factory is native to the blockchain. |

### GetEscrow

Queries the escrow address and allowed denoms for the specified token id.

<Tabs tabs={[
{
id: 'factory-query-getescrow-rust',
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
id: 'factory-query-getescrow-json',
label: 'JSON',
language: 'json',
content: `
{
  "get_escrow": {
    "token_id": "usdc"
  }
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `token_id` | `String` | The token id of the token we want to get the escrow for. |

The query returns the following response:

<Tabs tabs={[
{
id: 'factory-query-getescrow-response-rust',
label: 'Rust',
language: 'rust',
content: `
#[cw_serde]
pub struct GetEscrowResponse {
    pub escrow_address: Option<Addr>,
    pub denoms: Vec<TokenType>,
}
`
},
{
id: 'factory-query-getescrow-response-json',
label: 'JSON',
language: 'json',
content: `
{
  "escrow_address": "euclid1escrow8n7m6l5k4j3h2g1f0e9d8c7b6a5",
  "denoms": [
    {
      "native": {
        "denom": "eth"
      }
    },
    {
      "smart": {
        "contract_address": "0xaf88d065e77c8cc2239327c5edb3a432268e5831"
      }
    }
  ]
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `escrow_address` | `Option<Addr>` | The contract address of the escrow smart contract that holds the specified token. |
| `denoms` | [`Vec<TokenType>`](overview.md#tokentype) | A list of token types associated with the escrow. |

### GetAllPools

Queries all pools registered in the factory.

<Tabs tabs={[
{
id: 'factory-query-getallpools-rust',
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
id: 'factory-query-getallpools-json',
label: 'JSON',
language: 'json',
content: `
{
  "get_all_pools": {}
}
`
}
]} />

The query returns the following response:

<Tabs tabs={[
{
id: 'factory-query-getallpools-response-rust',
label: 'Rust',
language: 'rust',
content: `
pub struct AllPoolsResponse {
    pub pools: Vec<PoolVlpResponse>,
}

pub struct PoolVlpResponse {
    pub pair: Pair,
    pub vlp: String,
}
`
},
{
id: 'factory-query-getallpools-response-json',
label: 'JSON',
language: 'json',
content: `
{
  "pools": [
    {
      "pair": {
        "token_1": "usdc",
        "token_2": "usdt"
      },
      "vlp": "euclid1vlp4h5j6k7l8m9n0p1q2r3s4t5u6v7w8"
    },
    {
      "pair": {
        "token_1": "eth",
        "token_2": "usdc"
      },
      "vlp": "euclid1vlp9z8y7x6w5v4u3t2s1r0q9p8n7m6l5"
    }
  ]
}
`
}
]} />

### PendingSwapsUser

Queries swaps that are pending for the specified user address.

<Tabs tabs={[
{
id: 'factory-query-pendingswaps-rust',
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
id: 'factory-query-pendingswaps-json',
label: 'JSON',
language: 'json',
content: `
{
  "pending_swaps_user": {
    "user": "0x7A93d4Bc1f1e51D3b8A912B1E6D2a5a13C44B9F1",
    "pagination": {
      "min": "1",
      "max": "50",
      "skip": 0,
      "limit": 10
    }
  }
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `user` | `Addr` | The address of the user to query swaps for. |
| `pagination` | [`Pagination<Uint128>`](overview.md#pagination) | Pagination parameters. |

The query returns the following response:

<Tabs tabs={[
{
id: 'factory-query-pendingswaps-response-rust',
label: 'Rust',
language: 'rust',
content: `
pub struct GetPendingSwapsResponse {
    pub pending_swaps: Vec<SwapRequest>,
}

pub struct SwapRequest {
    pub sender: String,
    pub tx_id: String,
    pub asset_in: TokenWithDenom,
    pub amount_in: Uint128,
    pub asset_out: Token,
    pub min_amount_out: Uint128,
    pub swaps: Vec<NextSwapPair>,
    pub recipients: Vec<Recipient>,
    pub partner_fee_amount: Uint128,
    pub partner_fee_recipient: Addr,
}
`
},
{
id: 'factory-query-pendingswaps-response-json',
label: 'JSON',
language: 'json',
content: `
{
  "pending_swaps": [
    {
      "sender": "0x7A93d4Bc1f1e51D3b8A912B1E6D2a5a13C44B9F1",
      "tx_id": "swap-1741593001-42",
      "asset_in": {
        "token": "usdc",
        "token_type": {
          "smart": {
            "contract_address": "0xaf88d065e77c8cc2239327c5edb3a432268e5831"
          }
        }
      },
      "amount_in": "1000000",
      "asset_out": "usdt",
      "min_amount_out": "998000",
      "swaps": [
        {
          "token_in": "usdc",
          "token_out": "usdt"
        }
      ],
      "recipients": [
        {
          "address": {
            "chain_uid": "arbitrum",
            "address": "0x7A93d4Bc1f1e51D3b8A912B1E6D2a5a13C44B9F1"
          },
          "limit": {
            "dynamic": {}
          }
        }
      ],
      "partner_fee_amount": "300",
      "partner_fee_recipient": "0x4F2a8cC4B36A1dE5f5dF9B3A1B09C2D893A8E11F"
    }
  ]
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `sender` | `String` | The address of the user initiating the swap. |
| `tx_id` | `String` | The transaction id for the swap. |
| `asset_in` | [`TokenWithDenom`](overview.md#tokenwithdenom) | The asset being swapped. |
| `amount_in` | `Uint128` | The amount of the asset being swapped. |
| `asset_out` | [`Token`](overview.md#token) | The asset being received. |
| `min_amount_out` | `Uint128` | The minimum amount required for the swap to be successful. |
| `swaps` | `Vec<NextSwapPair>` | The route used to get from `asset_in` to `asset_out`. |
| `recipients` | [`Vec<Recipient>`](overview.md#recipient) | Recipient instructions for released output. |
| `partner_fee_amount` | `Uint128` | The amount of partner fee taken for this swap. |
| `partner_fee_recipient` | `Addr` | The recipient of the partner fee. |

### PendingLiquidity

Queries add-liquidity operations that are pending for the specified user address.

<Tabs tabs={[
{
id: 'factory-query-pendingliquidity-rust',
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
id: 'factory-query-pendingliquidity-json',
label: 'JSON',
language: 'json',
content: `
{
  "pending_liquidity": {
    "user": "0x7A93d4Bc1f1e51D3b8A912B1E6D2a5a13C44B9F1",
    "pagination": {
      "min": "1",
      "max": "50",
      "skip": 0,
      "limit": 10
    }
  }
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `user` | `Addr` | The address of the user to query liquidity for. |
| `pagination` | [`Pagination<Uint128>`](overview.md#pagination) | Pagination parameters. |

The query returns the following response:

<Tabs tabs={[
{
id: 'factory-query-pendingliquidity-response-rust',
label: 'Rust',
language: 'rust',
content: `
pub struct GetPendingLiquidityResponse {
    pub pending_add_liquidity: Vec<AddLiquidityRequest>,
}

pub struct AddLiquidityRequest {
    pub sender: String,
    pub tx_id: String,
    pub pair_info: PairWithDenomAndAmount,
}
`
},
{
id: 'factory-query-pendingliquidity-response-json',
label: 'JSON',
language: 'json',
content: `
{
  "pending_add_liquidity": [
    {
      "sender": "0x7A93d4Bc1f1e51D3b8A912B1E6D2a5a13C44B9F1",
      "tx_id": "addliq-1741593001-7",
      "pair_info": {
        "token_1": {
          "token": "usdc",
          "amount": "5000000",
          "token_type": {
            "smart": {
              "contract_address": "0xaf88d065e77c8cc2239327c5edb3a432268e5831"
            }
          }
        },
        "token_2": {
          "token": "usdt",
          "amount": "5000000",
          "token_type": {
            "smart": {
              "contract_address": "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"
            }
          }
        }
      }
    }
  ]
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `sender` | `String` | The address of the user with pending liquidity. |
| `tx_id` | `String` | The unique id for the liquidity transaction. |
| `pair_info` | [`PairWithDenomAndAmount`](overview.md#pairwithdenomandamount) | Information about the token pair (token id, type, and amount for each token). |

### PendingRemoveLiquidity

Queries remove-liquidity operations that are pending for the specified user address.

<Tabs tabs={[
{
id: 'factory-query-pendingremove-rust',
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
id: 'factory-query-pendingremove-json',
label: 'JSON',
language: 'json',
content: `
{
  "pending_remove_liquidity": {
    "user": "0x7A93d4Bc1f1e51D3b8A912B1E6D2a5a13C44B9F1",
    "pagination": {
      "min": "1",
      "max": "50",
      "skip": 0,
      "limit": 10
    }
  }
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `user` | `Addr` | The address of the user to query remove-liquidity operations for. |
| `pagination` | [`Pagination<Uint128>`](overview.md#pagination) | Pagination parameters. |

The query returns the following response:

<Tabs tabs={[
{
id: 'factory-query-pendingremove-response-rust',
label: 'Rust',
language: 'rust',
content: `
pub struct GetPendingRemoveLiquidityResponse {
    pub pending_remove_liquidity: Vec<RemoveLiquidityRequest>,
}

pub struct RemoveLiquidityRequest {
    pub sender: String,
    pub tx_id: String,
    pub lp_allocation: Uint128,
    pub pair: Pair,
    pub lp_token: Addr,
}
`
},
{
id: 'factory-query-pendingremove-response-json',
label: 'JSON',
language: 'json',
content: `
{
  "pending_remove_liquidity": [
    {
      "sender": "0x7A93d4Bc1f1e51D3b8A912B1E6D2a5a13C44B9F1",
      "tx_id": "remliq-1741593001-3",
      "lp_allocation": "1000000000000000000",
      "pair": {
        "token_1": "usdc",
        "token_2": "usdt"
      },
      "lp_token": "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359"
    }
  ]
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `sender` | `String` | The address of the user requesting to remove liquidity. |
| `tx_id` | `String` | The unique id for the liquidity removal transaction. |
| `lp_allocation` | `Uint128` | The amount of LP tokens allocated for removal. |
| `pair` | [`Pair`](overview.md#pair) | Information about the token pair. |
| `lp_token` | `Addr` | The LP token contract address. |

### GetVlp

Queries the VLP address for the specified token pair.

<Tabs tabs={[
{
id: 'factory-query-getvlp-rust',
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
id: 'factory-query-getvlp-json',
label: 'JSON',
language: 'json',
content: `
{
  "get_vlp": {
    "pair": {
      "token_1": "usdc",
      "token_2": "usdt"
    }
  }
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `pair` | [`Pair`](overview.md#pair) | The pair of tokens to get the VLP address for. |

The query returns the following response:

<Tabs tabs={[
{
id: 'factory-query-getvlp-response-rust',
label: 'Rust',
language: 'rust',
content: `
pub struct GetVlpResponse {
    pub vlp_address: String,
}
`
},
{
id: 'factory-query-getvlp-response-json',
label: 'JSON',
language: 'json',
content: `
{
  "vlp_address": "euclid1vlp4h5j6k7l8m9n0p1q2r3s4t5u6v7w8"
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `vlp_address` | `String` | The contract address of the VLP for the specified pair. |

### GetAllTokens

Queries all token ids associated with the factory.

<Tabs tabs={[
{
id: 'factory-query-getalltokens-rust',
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
id: 'factory-query-getalltokens-json',
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

<Tabs tabs={[
{
id: 'factory-query-getalltokens-response-rust',
label: 'Rust',
language: 'rust',
content: `
pub struct AllTokensResponse {
    pub tokens: Vec<Token>,
}
`
},
{
id: 'factory-query-getalltokens-response-json',
label: 'JSON',
language: 'json',
content: `
{
  "tokens": [
    "usdc",
    "usdt",
    "eth"
  ]
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `tokens` | [`Vec<Token>`](overview.md#token) | A list of token ids. |

### GetPartnerFeesCollected

Queries the total amount of partner fees collected by the factory.

<Tabs tabs={[
{
id: 'factory-query-getpartnerfees-rust',
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
id: 'factory-query-getpartnerfees-json',
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

<Tabs tabs={[
{
id: 'factory-query-getpartnerfees-response-rust',
label: 'Rust',
language: 'rust',
content: `
pub struct PartnerFeesCollectedResponse {
    pub total: DenomFees,
}

pub struct DenomFees {
    pub totals: HashMap<String, Uint128>,
}
`
},
{
id: 'factory-query-getpartnerfees-response-json',
label: 'JSON',
language: 'json',
content: `
{
  "total": {
    "totals": {
      "eth": "1250000000000000",
      "0xaf88d065e77c8cc2239327c5edb3a432268e5831": "4500000"
    }
  }
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `totals` | `HashMap<String, Uint128>` | A map that stores the total fees collected for each denomination. |

### GetLPToken

Queries the LP token contract address for the specified VLP.

<Tabs tabs={[
{
id: 'factory-query-getlptoken-rust',
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
id: 'factory-query-getlptoken-json',
label: 'JSON',
language: 'json',
content: `
{
  "get_l_p_token": {
    "vlp": "0x9f3A31B1A08E2b10f65d68eDcA1D1A4956b4F6D1"
  }
}
`
}
]} />

The query returns the following response:

<Tabs tabs={[
{
id: 'factory-query-getlptoken-response-rust',
label: 'Rust',
language: 'rust',
content: `
pub struct GetLPTokenResponse {
    pub token_address: Addr,
}
`
},
{
id: 'factory-query-getlptoken-response-json',
label: 'JSON',
language: 'json',
content: `
{
  "token_address": "0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `token_address` | `Addr` | The contract address of the CW20 contract that issues LP tokens. |

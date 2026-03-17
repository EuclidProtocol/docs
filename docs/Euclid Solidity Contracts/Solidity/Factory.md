---
sidebar_position: 2
description: "The Factory Smart Contract (EVM)"
---

import Tabs from '@site/src/components/Tabs';

:::note
Each integrated chain has its own factory contract. These contracts are created by Euclid whenever an integration with a new chain occurs.
You can read about the factory architecture [here](../../Architecture%20Overview/Architecture/Integrated%20Chains%20Layer/factory.md).
:::

## Execute Messages

List of user-facing execute methods that can be called on the Solidity Factory contract.

### Swap

Performs a swap from `asset_in` into `asset_out`, optionally distributing the output across one or more recipients.

<Tabs tabs={[
{
id: 'solidity-factory-swap-sol',
label: 'Solidity',
language: 'solidity',
content: `
function swap(
    TokenWithDenom calldata asset_in,
    uint256 amount_in,
    string calldata asset_out,
    uint256 min_amount_out,
    NextSwapPair[] calldata swaps,
    Recipient[] memory recipients,
    PartnerFee memory partner_fee,
    CrossChainConfig calldata cross_chain_config
) external payable;
`
},
{
id: 'solidity-factory-swap-json',
label: 'JSON',
language: 'json',
content: `
{
  "swap": {
    "asset_in": {
      "token": "usdc",
      "token_type": {
        "token_type": "smart",
        "native_denom": "",
        "erc20_address": "0xaf88d065e77c8cc2239327c5edb3a432268e5831"
      }
    },
    "amount_in": "1000000",
    "asset_out": "usdt",
    "min_amount_out": "998000",
    "swaps": [
      {
        "token_in": "usdc",
        "token_out": "usdt",
        "test_fail": false
      }
    ],
    "recipients": [
      {
        "recipient": {
          "chain_uid": "arbitrum",
          "sender": "0x7a93d4bc1f1e51d3b8a912b1e6d2a5a13c44b9f1"
        },
        "amount": {
          "limit_type": "dynamic",
          "value": "0"
        },
        "denom": {
          "token_type": "smart",
          "native_denom": "",
          "erc20_address": "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"
        },
        "forwarding_message": "0x",
        "unsafe_refund_as_voucher": false
      }
    ],
    "partner_fee": {
      "partner_fee_bps": 30,
      "recipient": "0x4f2a8cc4b36a1de5f5df9b3a1b09c2d893a8e11f"
    },
    "cross_chain_config": {
      "timeout": 60,
      "ack_response": "0x",
      "meta": "swap-route-usdc-usdt"
    }
  }
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `asset_in` | [`TokenWithDenom`](overview.md#tokenwithdenom) | The token being swapped in. |
| `amount_in` | `uint256` | Amount of the input asset. |
| `asset_out` | `string` | The token id being swapped out. |
| `min_amount_out` | `uint256` | Minimum amount of the output asset for the swap to be considered a success. Used to specify maximum slippage accepted. |
| `swaps` | `NextSwapPair[]` | The different swaps to get from asset_in to asset_out. This could be a direct swap or multiple swaps. For example, if swapping from token A to B, the swaps can be A -> B directly, or A -> C then C -> D then D -> B. Usually the most efficient route is used. |
| `recipients` | [`Recipient[]`](overview.md#recipient) | A set of recipients to specify where the asset_out should be released. Recipient amount constraints define how much should be released to each destination. |
| `partner_fee` | [`PartnerFee`](overview.md#partnerfee) | Optional partner fee information for swaps. The maximum fee that can be set is 30 (0.3%). |
| `cross_chain_config` | [`CrossChainConfig`](overview.md#crosschainconfig) | Cross-chain timeout/ack/meta controls for this request. |

:::note
- Swap paths are usually determined off-chain (for example by routing services) and passed in `swaps`.
:::

With the following structs:

<Tabs tabs={[
{
id: 'solidity-factory-swap-structs',
label: 'Solidity',
language: 'solidity',
content: `
/// The next token pair in the swap route
struct NextSwapPair {
    string token_in;
    string token_out;
    // Internal testing flag, keep false in production usage.
    bool test_fail;
}

/// The percentage of the fee for the platform. Specified in basis points:
/// 1 = 0.01%, 10000 = 100%
struct PartnerFee {
    // Cannot be set greater than 30 (0.3%)
    uint64 partner_fee_bps;
    // Address to receive the fee.
    address recipient;
}
`
}
]} />

### DepositToken

Exchanges deposited native/ERC20 tokens for voucher balances/releases using recipient rules.

<Tabs tabs={[
{
id: 'solidity-factory-deposit-sol',
label: 'Solidity',
language: 'solidity',
content: `
function depositToken(
    TokenWithDenom calldata asset_in,
    uint256 amount_in,
    Recipient[] memory recipients,
    CrossChainConfig calldata cross_chain_config
) external payable;
`
},
{
id: 'solidity-factory-deposit-json',
label: 'JSON',
language: 'json',
content: `
{
  "depositToken": {
    "asset_in": {
      "token": "eth",
      "token_type": {
        "token_type": "native",
        "native_denom": "eth",
        "erc20_address": ""
      }
    },
    "amount_in": "1000000000000000000",
    "recipients": [
      {
        "recipient": {
          "chain_uid": "base",
          "sender": "0x1111222233334444555566667777888899990000"
        },
        "amount": {
          "limit_type": "equal",
          "value": "1000000000000000000"
        },
        "denom": {
          "token_type": "voucher",
          "native_denom": "",
          "erc20_address": ""
        },
        "forwarding_message": "0x",
        "unsafe_refund_as_voucher": false
      }
    ],
    "cross_chain_config": {
      "timeout": 60,
      "ack_response": "0x",
      "meta": "deposit-eth"
    }
  }
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `asset_in` | [`TokenWithDenom`](overview.md#tokenwithdenom) | The asset being exchanged. |
| `amount_in` | `uint256` | The amount of tokens being exchanged. Should match attached funds to the message when native funds are used. |
| `recipients` | [`Recipient[]`](overview.md#recipient) | Recipients that define who should receive resulting vouchers/releases and under what constraints. |
| `cross_chain_config` | [`CrossChainConfig`](overview.md#crosschainconfig) | Cross-chain timeout/ack/meta options. |

### TransferVoucher

Transfers voucher balances and optionally releases them based on recipient settings.

<Tabs tabs={[
{
id: 'solidity-factory-transfervoucher-sol',
label: 'Solidity',
language: 'solidity',
content: `
function transferVoucher(
    string calldata token_id,
    uint256 amount,
    CrossChainUser memory from,
    Recipient[] memory recipients,
    CrossChainConfig calldata cross_chain_config
) external payable;
`
},
{
id: 'solidity-factory-transfervoucher-json',
label: 'JSON',
language: 'json',
content: `
{
  "transferVoucher": {
    "token_id": "usdc",
    "amount": "500000",
    "from": {
      "chain_uid": "arbitrum",
      "sender": "0x7a93d4bc1f1e51d3b8a912b1e6d2a5a13c44b9f1"
    },
    "recipients": [
      {
        "recipient": {
          "chain_uid": "optimism",
          "sender": "0x2222333344445555666677778888999900001111"
        },
        "amount": {
          "limit_type": "less_than_or_equal",
          "value": "500000"
        },
        "denom": {
          "token_type": "smart",
          "native_denom": "",
          "erc20_address": "0x754704bc059f8c67012fed69bc8a327a5aafb603"
        },
        "forwarding_message": "0x",
        "unsafe_refund_as_voucher": false
      }
    ],
    "cross_chain_config": {
      "timeout": 60,
      "ack_response": "0x",
      "meta": "transfer-voucher"
    }
  }
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `token_id` | `string` | Token id of the voucher balance to transfer. |
| `amount` | `uint256` | Amount of voucher balance to transfer. |
| `from` | [`CrossChainUser`](overview.md#crosschainuser) | Source user for this transfer flow. |
| `recipients` | [`Recipient[]`](overview.md#recipient) | Destination recipients and release constraints. |
| `cross_chain_config` | [`CrossChainConfig`](overview.md#crosschainconfig) | Cross-chain timeout/ack/meta options. |

### Add Liquidity

Requests adding liquidity for a pair using token amounts and denom details.

<Tabs tabs={[
{
id: 'solidity-factory-addliq-sol',
label: 'Solidity',
language: 'solidity',
content: `
function add_liquidity(
    PairWithDenomAndAmount calldata pair_with_denom_and_amount,
    uint64 slippage_tolerance_bps,
    CrossChainConfig calldata cross_chain_config
) external payable;
`
},
{
id: 'solidity-factory-addliq-json',
label: 'JSON',
language: 'json',
content: `
{
  "add_liquidity": {
    "pair_with_denom_and_amount": {
      "token_1": {
        "token": "usdc",
        "amount": "1000000",
        "token_type": {
          "token_type": "smart",
          "native_denom": "",
          "erc20_address": "0xaf88d065e77c8cc2239327c5edb3a432268e5831"
        }
      },
      "token_2": {
        "token": "usdt",
        "amount": "1000000",
        "token_type": {
          "token_type": "smart",
          "native_denom": "",
          "erc20_address": "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"
        }
      }
    },
    "slippage_tolerance_bps": 300,
    "cross_chain_config": {
      "timeout": 60,
      "ack_response": "0x",
      "meta": "add-liquidity"
    }
  }
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `pair_with_denom_and_amount` | [`PairWithDenomAndAmount`](overview.md#pairwithdenomandamount) | The tokens to add liquidity to, with the amount for each. |
| `slippage_tolerance_bps` | `uint64` | The amount of slippage tolerated. If the slippage amount surpasses the specified amount, the request will fail and the user receives back the tokens. Specified as basis points. |
| `cross_chain_config` | [`CrossChainConfig`](overview.md#crosschainconfig) | Cross-chain timeout/ack/meta options. |

### Remove Liquidity

Requests removing liquidity from a pool and releasing output to a target recipient.

<Tabs tabs={[
{
id: 'solidity-factory-remliq-sol',
label: 'Solidity',
language: 'solidity',
content: `
function remove_liquidity(
    Pair calldata pair,
    uint256 lp_allocation,
    CrossChainUser memory recipient,
    CrossChainConfig calldata cross_chain_config
) external payable;
`
},
{
id: 'solidity-factory-remliq-json',
label: 'JSON',
language: 'json',
content: `
{
  "remove_liquidity": {
    "pair": {
      "token_1": "usdc",
      "token_2": "usdt"
    },
    "lp_allocation": "1000000000000000000",
    "recipient": {
      "chain_uid": "base",
      "sender": "0x3333444455556666777788889999000011112222"
    },
    "cross_chain_config": {
      "timeout": 60,
      "ack_response": "0x",
      "meta": "remove-liquidity"
    }
  }
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `pair` | [`Pair`](overview.md#pair) | The pair of tokens for which liquidity is being removed. |
| `lp_allocation` | `uint256` | The amount of LP tokens being returned to the pool. |
| `recipient` | [`CrossChainUser`](overview.md#crosschainuser) | Destination user/chain for release. |
| `cross_chain_config` | [`CrossChainConfig`](overview.md#crosschainconfig) | Cross-chain timeout/ack/meta options. |

### Request Pool Creation

Requests creation of a new pool with pair settings, pool config, and LP token metadata.

<Tabs tabs={[
{
id: 'solidity-factory-createpool-sol',
label: 'Solidity',
language: 'solidity',
content: `
function request_pool_creation(
    PairWithDenomAndAmount calldata pair_with_denom_and_amount,
    PoolConfig calldata pool_config,
    string calldata lp_token_name,
    string memory lp_token_symbol,
    uint8 lp_token_decimals,
    uint64 slippage_tolerance_bps,
    CrossChainConfig calldata cross_chain_config
) external payable;
`
},
{
id: 'solidity-factory-createpool-json',
label: 'JSON',
language: 'json',
content: `
{
  "request_pool_creation": {
    "pair_with_denom_and_amount": {
      "token_1": {
        "token": "usdc",
        "amount": "2000000",
        "token_type": {
          "token_type": "smart",
          "native_denom": "",
          "erc20_address": "0xaf88d065e77c8cc2239327c5edb3a432268e5831"
        }
      },
      "token_2": {
        "token": "usdt",
        "amount": "2000000",
        "token_type": {
          "token_type": "smart",
          "native_denom": "",
          "erc20_address": "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"
        }
      }
    },
    "pool_config": {
      "pool_type": "stable",
      "amp_factor": "1200"
    },
    "lp_token_name": "USDC-USDT LP",
    "lp_token_symbol": "USDCUSDT-LP",
    "lp_token_decimals": 18,
    "slippage_tolerance_bps": 200,
    "cross_chain_config": {
      "timeout": 120,
      "ack_response": "0x",
      "meta": "create-pool"
    }
  }
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `pair_with_denom_and_amount` | [`PairWithDenomAndAmount`](overview.md#pairwithdenomandamount) | The token pair to request creating a new pool for. |
| `pool_config` | [`PoolConfig`](overview.md#poolconfig) | The pool configuration type (for example stable with amplification factor, or constant product). |
| `lp_token_name` | `string` | LP token name. |
| `lp_token_symbol` | `string` | LP token symbol. |
| `lp_token_decimals` | `uint8` | LP token decimals. |
| `slippage_tolerance_bps` | `uint64` | Allowed slippage amount in basis points (bps) during pool creation. |
| `cross_chain_config` | [`CrossChainConfig`](overview.md#crosschainconfig) | Cross-chain timeout/ack/meta options. |

## Query Messages

List of read-only methods exposed by the Solidity Factory contract.

### get_factory_state

Returns the factory state configuration.

<Tabs tabs={[
{
id: 'solidity-factory-q-getstate-sol',
label: 'Solidity',
language: 'solidity',
content: `
function get_factory_state() external pure returns (FactoryStorage.Layout memory);
`
},
{
id: 'solidity-factory-q-getstate-json',
label: 'JSON',
language: 'json',
content: `
{
  "method": "get_factory_state",
  "params": []
}
`
}
]} />

The query returns the following response:

<Tabs tabs={[
{
id: 'solidity-factory-q-getstate-res-sol',
label: 'Solidity',
language: 'solidity',
content: `
struct Layout {
    string chain_uid;
    string router_address;
    string native_denom;
    address fund_manager;
    address relayer;
}
`
},
{
id: 'solidity-factory-q-getstate-res-json',
label: 'JSON',
language: 'json',
content: `
{
  "chain_uid": "arbitrum",
  "router_address": "vsl.router",
  "native_denom": "eth",
  "fund_manager": "0x8f8c6f1f7f9f4d7f8a7a9f8b6a6b4e3d2c1b0a9f",
  "relayer": "0x1234567890abcdef1234567890abcdef12345678"
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `chain_uid` | `string` | Chain UID where this factory is deployed. |
| `router_address` | `string` | Router address/port identifier used for cross-chain relay. |
| `native_denom` | `string` | Native denom configured for this chain. |
| `fund_manager` | `address` | Fund manager contract address. |
| `relayer` | `address` | Relayer contract address. |

### get_factory_modules

Returns the module implementation addresses configured in factory.

<Tabs tabs={[
{
id: 'solidity-factory-q-getmodules-sol',
label: 'Solidity',
language: 'solidity',
content: `
function get_factory_modules() external view returns (FactoryModules memory);
`
},
{
id: 'solidity-factory-q-getmodules-json',
label: 'JSON',
language: 'json',
content: `
{
  "method": "get_factory_modules",
  "params": []
}
`
}
]} />

The query returns the following response:

<Tabs tabs={[
{
id: 'solidity-factory-q-getmodules-res-sol',
label: 'Solidity',
language: 'solidity',
content: `
struct FactoryModules {
    address cross_chain_module;
    address pool_module;
    address swap_module;
    address token_module;
}
`
},
{
id: 'solidity-factory-q-getmodules-res-json',
label: 'JSON',
language: 'json',
content: `
{
  "cross_chain_module": "0x1111111111111111111111111111111111111111",
  "pool_module": "0x2222222222222222222222222222222222222222",
  "swap_module": "0x3333333333333333333333333333333333333333",
  "token_module": "0x4444444444444444444444444444444444444444"
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `cross_chain_module` | `address` | Cross-chain module implementation address. |
| `pool_module` | `address` | Pool module implementation address. |
| `swap_module` | `address` | Swap module implementation address. |
| `token_module` | `address` | Token module implementation address. |

### get_token_escrow

Returns escrow contract address for a token id.

<Tabs tabs={[
{
id: 'solidity-factory-q-getescrow-sol',
label: 'Solidity',
language: 'solidity',
content: `
function get_token_escrow(string calldata token_id) external view returns (address);
`
},
{
id: 'solidity-factory-q-getescrow-json',
label: 'JSON',
language: 'json',
content: `
{
  "method": "get_token_escrow",
  "params": ["usdc"]
}
`
}
]} />

The query returns the following response:

<Tabs tabs={[
{
id: 'solidity-factory-q-getescrow-res-sol',
label: 'Solidity',
language: 'solidity',
content: `
address escrow_address;
`
},
{
id: 'solidity-factory-q-getescrow-res-json',
label: 'JSON',
language: 'json',
content: `
"0x5555555555555555555555555555555555555555"
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `token_id` | `string` | Token id used to fetch escrow. |
| `escrow_address` | `address` | Escrow contract address for that token id. |

### get_pool_vlp

Returns VLP key/address string for a pool key.

<Tabs tabs={[
{
id: 'solidity-factory-q-getpoolvlp-sol',
label: 'Solidity',
language: 'solidity',
content: `
function get_pool_vlp(string calldata pool_key) public view returns (string memory);
`
},
{
id: 'solidity-factory-q-getpoolvlp-json',
label: 'JSON',
language: 'json',
content: `
{
  "method": "get_pool_vlp",
  "params": ["usdc:usdt"]
}
`
}
]} />

The query returns the following response:

<Tabs tabs={[
{
id: 'solidity-factory-q-getpoolvlp-res-sol',
label: 'Solidity',
language: 'solidity',
content: `
string vlp_key;
`
},
{
id: 'solidity-factory-q-getpoolvlp-res-json',
label: 'JSON',
language: 'json',
content: `
"arbitrum.0x9f3a31b1a08e2b10f65d68edca1d1a4956b4f6d1"
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `pool_key` | `string` | Pool key (for example `token_1:token_2`). |
| `vlp_key` | `string` | VLP key/address string mapped to that pool. |

### get_vlp_lp_address

Returns LP token contract address for a VLP key.

<Tabs tabs={[
{
id: 'solidity-factory-q-getvlplp-sol',
label: 'Solidity',
language: 'solidity',
content: `
function get_vlp_lp_address(string calldata vlp_key) public view returns (address);
`
},
{
id: 'solidity-factory-q-getvlplp-json',
label: 'JSON',
language: 'json',
content: `
{
  "method": "get_vlp_lp_address",
  "params": ["arbitrum.0x9f3a31b1a08e2b10f65d68edca1d1a4956b4f6d1"]
}
`
}
]} />

The query returns the following response:

<Tabs tabs={[
{
id: 'solidity-factory-q-getvlplp-res-sol',
label: 'Solidity',
language: 'solidity',
content: `
address lp_token_address;
`
},
{
id: 'solidity-factory-q-getvlplp-res-json',
label: 'JSON',
language: 'json',
content: `
"0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d"
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `vlp_key` | `string` | VLP key string returned by `get_pool_vlp`. |
| `lp_token_address` | `address` | LP token contract address. |

---
sidebar_position: 2
description: "The Factory Smart Contract (EVM)"
---

import Tabs from '@site/src/components/Tabs';

:::note
Each integrated chain has its own factory contract. These contracts will be created by Euclid whenever an integration with a new chain occurs.
You can read about the factory architecture [here](../../Architecture%20Overview/Architecture/Integrated%20Chains%20Layer/factory.md).
:::

## Execute Messages

List of execute messages that can be performed on the Factory contract.


### Swap Request

:::note
The `asset_in` is the token being swapped from, and `asset_out` is the token you want to receive. Cross-chain support is built in via the `cross_chain_addresses` field.
:::

<Tabs tabs={[
{
id: 'solidity-example',
label: 'Solidity',
language: 'solidity',
content: `
function swap_request(
    CrossChainUser memory sender,
    TokenWithDenom memory asset_in,
    uint256 amount_in,
    string memory asset_out,
    uint256 min_amount_out,
    NextSwapPair[] memory swaps,
    CrossChainUserWithLimit[] memory cross_chain_addresses,
    PartnerFee memory partnerFee,
    string memory meta
) external;
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "swap_request": {
    "sender": {
      "chain_uid": "ethereum",
      "address": "0xabc123abc123abc123abc123abc123abc123abcd"
    },
    "asset_in": {
      "token": "usdc",
      "token_type": {
        "native": {
          "denom": "usdc"
        }
      }
    },
    "amount_in": "1000000",
    "asset_out": "dai",
    "min_amount_out": "990000",
    "swaps": [
      {
        "token_in": "usdc",
        "token_out": "weth"
      },
      {
        "token_in": "weth",
        "token_out": "dai"
      }
    ],
    "cross_chain_addresses": [
      {
        "user": {
          "chain_uid": "arbitrum",
          "address": "0xdef456def456def456def456def456def456abcd"
        },
        "limit": "800000"
      }
    ],
    "partner_fee": {
      "partner_fee_bps": 25,
      "recipient": "0xgkhj33..."
    }
  }
}
`
}
]} />

| **Field**               | **Type**                                | **Description**                                                                                  |
|------------------------|------------------------------------------|--------------------------------------------------------------------------------------------------|
| `sender`               | [`CrossChainUser`](overview.md#crosschainuser)      | Optional user to execute the swap on behalf of.                                                  |
| `asset_in`             | [`TokenWithDenom`](overview.md#tokenwithdenom)      | The token being used as input for the swap.                                                      |
| `amount_in`            | `uint256`                                | Amount of `asset_in` to swap. For native assets, this is overridden by `msg.value`.                                                                   |
| `asset_out`            | `string`                                 | Target token the user wants to receive.                                                          |
| `min_amount_out`       | `uint256`                                | Minimum amount of the output asset for the swap to be considered a success. Used to specify maximum slippage accepted.                             |
| `swaps`                | `NextSwapPair[]`                         |  The different swaps to get from asset_in to asset_out. This could be a direct swap or multiple swaps. For example, if swapping from token A to B, the swaps can be A -> B directly, or A -> C then C-> D then D->B. Usually the most efficient route is used.                                                   |
| `cross_chain_addresses`| [`CrossChainUserWithLimit[]`](overview.md#crosschainuserwithlimit) |A set of addresses to specify where the asset_out should be released. The first element specified in the vector has highest priority and so on. User specifies a limit for each provided address which indicates the amount of funds that should be released to that address. In case there are any leftover funds, they are added to the user's virtual balance for the address that initiated the swap. If limit is not specified, then the maximum amount is taken.                                               |
| `partner_fee`          | `PartnerFee`              | Optional partner fee information for swaps.  The maximum fee that can be set is 30 (0.3%).                                                  |
| `meta`                 | `string`                                 | Optional metadata field for tracking or sequencing.                                              |

With the following structs:

<Tabs tabs={[
{
id: 'solidity-example',
label: 'Solidity',
language: 'solidity',
content: `
struct NextSwapPair {
    string token_in;
    string token_out;
}

// The percentage of the fee for the platform. Specified in basis points (bps)
// Example: 1 = 0.01%, 30 = 0.3%, 10000 = 100%
struct PartnerFee {
    uint64 partner_fee_bps;    // Max 30 (0.3%)
    address recipient;         // Address to receive the fee
}
`
}
]} />

| **Struct**    | **Field**           | **Type**   | **Description**                                                               |
|---------------|---------------------|------------|-------------------------------------------------------------------------------|
| `NextSwapPair`| `token_in`          | `string`   | The input token in the swap segment.                                          |
|               | `token_out`         | `string`   | The output token in the swap segment.                                         |
| `PartnerFee`  | `partner_fee_bps`   | `uint64`   | Fee percentage in basis points (max 30 = 0.3%).                               |
|               | `recipient`         | `address`  | Address that receives the partner/referral fee.                              |

### Deposit Token

:::tip
Used to deposit tokens into the protocol and receive voucher tokens in return. Supports native and smart tokens.
:::

<Tabs tabs={[
{
id: 'solidity-example',
label: 'Solidity',
language: 'solidity',
content: `
function depositToken(
  TokenWithDenom memory asset_in,
  uint256 amount_in,
  CrossChainUser memory recipientOpt
) external;
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
      "token": "usdc",
      "token_type": {
        "native": {
          "denom": "usdc"
        }
      }
    },
    "amount_in": "500000",
    "recipient": {
      "chain_uid": "amoy",
      "address": "0xfeed123feed123feed123feed123feed123abcd"
    }
  }
}
`
}
]} />

| **Field**     | **Type**                             | **Description**                                                                 |
|---------------|--------------------------------------|---------------------------------------------------------------------------------|
| `asset_in`    | [`TokenWithDenom`](overview.md#tokenwithdenom)  | The asset being exchanged into vouchers.                                      |
| `amount_in`   | `uint256`                            | Amount of the token to deposit.                                                |
| `recipient`   | [`CrossChainUser`](overview.md#crosschainuser)  | Optional recipient for the voucher tokens. Defaults to the sender if omitted.  |


### Withdraw Virtual Balance

:::note
This message lets users withdraw voucher tokens and release them to one or more cross-chain addresses.
:::

<Tabs tabs={[
{
id: 'solidity-example',
label: 'Solidity',
language: 'solidity',
content: `
function withdrawVirtualBalance(
  string memory token,
  uint128 amount,
  CrossChainUserWithLimit[] memory cross_chain_addresses
) external;
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "withdraw_virtual_balance": {
    "token": "dai",
    "amount": "250000",
    "cross_chain_addresses": [
      {
        "user": {
          "chain_uid": "ethereum",
          "address": "0x00112233445566778899aabbccddeeff00112233"
        },
        "limit": "200000"
      },
      {
        "user": {
          "chain_uid": "optimism",
          "address": "0x445566778899aabbccddeeff0011223344556677"
        }
      }
    ]
  }
}
`
}
]} />

| **Field**                | **Type**                                | **Description**                                                                                   |
|--------------------------|-----------------------------------------|---------------------------------------------------------------------------------------------------|
| `token`                  | `string`                                | ID of the voucher token to withdraw.                                                              |
| `amount`                 | `uint128`                               | The amount of voucher tokens to withdraw.                                           |
| `cross_chain_addresses` | [`CrossChainUserWithLimit[]`](overview.md#crosschainuserwithlimit) | List of destination addresses to receive the withdrawn funds.                                    |


### Transfer Virtual Balance

Transfers voucher tokens from the sender’s virtual balance to another user on a specific chain.

<Tabs tabs={[
{
id: 'solidity-example',
label: 'Solidity',
language: 'solidity',
content: `
function transferVirtualBalance(
  string memory token,
  uint256 amount,
  CrossChainUser memory recipient_address
) external;
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "transfer_virtual_balance": {
    "token": "dai",
    "amount": "150000",
    "recipient_address": {
      "chain_uid": "amoy",
      "address": "0xaabbccddeeff0011223344556677889900aabbcc"
    }
  }
}
`
}
]} />

| **Field**            | **Type**                           | **Description**                                                        |
|----------------------|------------------------------------|------------------------------------------------------------------------|
| `token`              | `string`                           | The voucher token ID to transfer.                                      |
| `amount`             | `uint256`                          | Amount of virtual balance to transfer.                                 |
| `recipient_address`  | [`CrossChainUser`](overview.md#crosschainuser) | Target address and chain to receive the tokens.                         |


### Add Liquidity Request

Adds liquidity to a pool using a pair of tokens. User receives LP tokens representing their share in the pool. Supports native and smart tokens.

<Tabs tabs={[
{
id: 'solidity-example',
label: 'Solidity',
language: 'solidity',
content: `
function addLiquidityRequest(
  PairWithDenomAndAmount memory pair_info,
  uint64 slippage_tolerance_bps
) external;
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
        "token": "usdc",
        "amount": "1000000",
        "token_type": {
          "native": {
            "denom": "usdc"
          }
        }
      },
      "token_2": {
        "token": "dai",
        "amount": "1000000",
        "token_type": {
          "smart": {
            "contract_address": "0x5f123abc123abc123abc123abc123abc123abcde"
          }
        }
      }
    },
    "slippage_tolerance_bps": 300
  }
}
`
}
]} />

| **Field**                 | **Type**                                      | **Description**                                                                 |
|--------------------------|-----------------------------------------------|---------------------------------------------------------------------------------|
| `pair_info`              | [`PairWithDenomAndAmount`](overview.md#pairwithdenomandamount) | Token pair and amounts to add as liquidity.                                     |
| `slippage_tolerance_bps` | `uint64`                                      | Max slippage tolerated in basis points (e.g., `300` = 3%).                      |

### Remove Liquidity Request

Removes liquidity from a pool and sends the tokens to one or more cross-chain addresses based on the user's allocation preferences.

<Tabs tabs={[
{
id: 'solidity-example',
label: 'Solidity',
language: 'solidity',
content: `
function removeLiquidityRequest(
  Pair memory pair,
  uint256 lp_allocation,
  CrossChainUserWithLimit[] memory cross_chain_addresses
) external;
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "remove_liquidity_request": {
    "pair": {
      "token_1": "usdc",
      "token_2": "dai"
    },
    "lp_allocation": "100000000000",
    "cross_chain_addresses": [
      {
        "user": {
          "chain_uid": "amoy",
          "address": "0xfeed123feed123feed123feed123feed123abcd"
        },
        "limit": "500000"
      },
      {
        "user": {
          "chain_uid": "arbitrum",
          "address": "0xdef456def456def456def456def456def456abcd"
        }
      }
    ]
  }
}
`
}
]} />

| **Field**                | **Type**                                      | **Description**                                                                                   |
|--------------------------|-----------------------------------------------|---------------------------------------------------------------------------------------------------|
| `pair`                   | [`Pair`](overview.md#pair)                    | The token pair for the pool you want to remove liquidity from.                                   |
| `lp_allocation`          | `uint256`                                     | Amount of LP tokens to redeem.                                                                    |
| `cross_chain_addresses`  | [`CrossChainUserWithLimit[]`](overview.md#crosschainuserwithlimit) | Where to send the redeemed tokens. First entry has the highest priority.                         |

### Request Pool Creation

Sends a request to create a new liquidity pool for a given token pair. The user defines the pool configuration and LP token metadata.

<Tabs tabs={[
{
id: 'solidity-example',
label: 'Solidity',
language: 'solidity',
content: `
function request_pool_creation(
  PairWithDenomAndAmount memory pair,
  uint64 slippage_tolerance_bps,
  string memory lp_token_name,
  string memory lp_token_symbol,
  uint8 lp_token_decimal
) external;
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
        "token": "usdc",
        "amount": "500000",
        "token_type": {
          "native": {
            "denom": "usdc"
          }
        }
      },
      "token_2": {
        "token": "dai",
        "amount": "500000",
        "token_type": {
          "smart": {
            "contract_address": "0x9876543210abcdef9876543210abcdef98765432"
          }
        }
      }
    },
    "slippage_tolerance_bps": 200,
    "lp_token_name": "USDC-DAI Pool Token",
    "lp_token_symbol": "USDCDAI-LP",
    "lp_token_decimal": 18
  }
}
`
}
]} />

| **Field**                 | **Type**                                      | **Description**                                                                                   |
|--------------------------|-----------------------------------------------|---------------------------------------------------------------------------------------------------|
| `pair`                   | [`PairWithDenomAndAmount`](overview.md#pairwithdenomandamount) | Token pair and amounts used to initialize the pool.                                               |
| `slippage_tolerance_bps` | `uint64`                                      | Max slippage allowed when creating the pool (in basis points).                                   |
| `lp_token_name`          | `string`                                      | Full name of the LP token.                                                                        |
| `lp_token_symbol`        | `string`                                      | Symbol (ticker) of the LP token.                                                                  |
| `lp_token_decimal`       | `uint8`                                       | Number of decimals used by the LP token.                                                          |



## Query Messages 

List of queries that can be performed on the Factory contract.

### Get State

Queries the configuration and current status of the Factory contract.

#### Query Call

<Tabs tabs={[
{
id: 'solidity-example',
label: 'Solidity',
language: 'solidity',
content: `
function getState() external view returns (State memory);
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "get_state": {}
}
`
}
]} />

#### Response

<Tabs tabs={[
{
id: 'solidity-response',
label: 'Solidity',
language: 'solidity',
content: `
struct State {
    string chain_uid;
    address router;
    address admin;
    uint256 escrow_code_id;
    uint256 voucher_token_code_id;
    bool is_native;
    DenomFees partner_fees_collected;
}

struct DenomFees {
    string[] denoms;
    uint256[] amounts;
}
`
}
]} />

| **Field**                | **Type**         | **Description**                                                              |
|--------------------------|------------------|------------------------------------------------------------------------------|
| `chain_uid`              | `string`         | Unique chain ID (e.g., "amoy", "ethereum").                                  |
| `router`                 | `address`        | Address of the router contract.                                              |
| `admin`                  | `address`        | Address of the factory admin.                                                |
| `escrow_code_id`         | `uint256`        | Code ID for escrow contract deployment.                                      |
| `voucher_token_code_id`  | `uint256`        | Code ID for voucher token contracts.                                         |
| `is_native`              | `bool`           | Whether the factory is native to this chain.                                 |
| `partner_fees_collected` | `DenomFees`      | Fee totals per denom collected from partner fees.                            |



### Get All Tokens

Returns a list of all token IDs registered in the factory.

#### Query Call

<Tabs tabs={[
{
id: 'solidity-example',
label: 'Solidity',
language: 'solidity',
content: `
function getAllTokens() external view returns (string[] memory);
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

#### Response

<Tabs tabs={[
{
id: 'solidity-response',
label: 'Solidity',
language: 'solidity',
content: `
string[] tokens;
`
}
]} />

| **Field** | **Type**    | **Description**                    |
|-----------|-------------|------------------------------------|
| `tokens`  | `string[]`  | List of registered token IDs.      |


### Get Partner Fees Collected

Returns the total amount of partner fees collected by the protocol, grouped by token denomination.

#### Query Call

<Tabs tabs={[
{
id: 'solidity-example',
label: 'Solidity',
language: 'solidity',
content: `
function getPartnerFeesCollected() external view returns (DenomFees memory);
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

#### Response

<Tabs tabs={[
{
id: 'solidity-response',
label: 'Solidity',
language: 'solidity',
content: `
struct DenomFees {
    string[] denoms;
    uint256[] amounts;
}
`
}
]} />

| **Field** | **Type**      | **Description**                                |
|-----------|---------------|------------------------------------------------|
| `denoms`  | `string[]`    | Array of token denoms (e.g., `usdc`, `dai`).   |
| `amounts` | `uint256[]`   | Total amount collected for each corresponding denom. |

### Get LP Token

Returns the address of the LP (liquidity provider) token for the specified VLP contract.

#### Query Call

<Tabs tabs={[
{
id: 'solidity-example',
label: 'Solidity',
language: 'solidity',
content: `
function getLPToken(address vlp) external view returns (address);
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "get_l_p_token": {
    "vlp": "nibi..."
  }
}
`
}
]} />

#### Input Parameters

| **Field** | **Type**  | **Description**                              |
|-----------|-----------|----------------------------------------------|
| `vlp`     | `address` | The address of the liquidity pool (VLP).     |

#### Response

<Tabs tabs={[
{
id: 'solidity-response',
label: 'Solidity',
language: 'solidity',
content: `
address lp_token_address;
`
}
]} />

| **Field**          | **Type**   | **Description**                         |
|--------------------|------------|-----------------------------------------|
| `lp_token_address` | `address`  | The ERC20 contract address of the LP token. |

### Get VLP

Returns the VLP contract address for a given token pair.

#### Query Call

<Tabs tabs={[
{
id: 'solidity-example',
label: 'Solidity',
language: 'solidity',
content: `
function getVlp(Pair memory pair) external view returns (address);
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
      "token_1": "usdc",
      "token_2": "dai"
    }
  }
}
`
}
]} />

#### Input Parameters

| **Field**   | **Type**   | **Description**                         |
|-------------|------------|-----------------------------------------|
| `token_1`   | `string`   | ID of the first token in the pair.      |
| `token_2`   | `string`   | ID of the second token in the pair.     |

#### Response

<Tabs tabs={[
{
id: 'solidity-response',
label: 'Solidity',
language: 'solidity',
content: `
address vlp_address;
`
}
]} />

| **Field**      | **Type**   | **Description**                                   |
|----------------|------------|---------------------------------------------------|
| `vlp_address`  | `address`  | Address of the VLP contract for the given pair.   |

### Get VLP

Returns the VLP contract address for a given token pair.

#### Query Call

<Tabs tabs={[
{
id: 'solidity-example',
label: 'Solidity',
language: 'solidity',
content: `
function getVlp(Pair memory pair) external view returns (address);
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
      "token_1": "usdc",
      "token_2": "dai"
    }
  }
}
`
}
]} />

#### Input Parameters

| **Field**   | **Type**   | **Description**                         |
|-------------|------------|-----------------------------------------|
| `token_1`   | `string`   | ID of the first token in the pair.      |
| `token_2`   | `string`   | ID of the second token in the pair.     |

#### Response

<Tabs tabs={[
{
id: 'solidity-response',
label: 'Solidity',
language: 'solidity',
content: `
address vlp_address;
`
}
]} />

| **Field**      | **Type**   | **Description**                                   |
|----------------|------------|---------------------------------------------------|
| `vlp_address`  | `address`  | Address of the VLP contract for the given pair.   |

### Get All Pools

Returns all registered liquidity pools and their associated token pairs.

#### Query Call

<Tabs tabs={[
{
id: 'solidity-example',
label: 'Solidity',
language: 'solidity',
content: `
function getAllPools() external view returns (PoolVlpResponse[] memory);

struct PoolVlpResponse {
    Pair pair;
    address vlp;
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "get_all_pools": {}
}
`
}
]} />

#### Response

<Tabs tabs={[
{
id: 'solidity-response',
label: 'Solidity',
language: 'solidity',
content: `
struct PoolVlpResponse {
    Pair pair;
    address vlp;
}

struct Pair {
    string token_1;
    string token_2;
}
`
}
]} />

| **Field**     | **Type**    | **Description**                                 |
|---------------|-------------|-------------------------------------------------|
| `pair.token_1`| `string`    | First token in the liquidity pair.              |
| `pair.token_2`| `string`    | Second token in the liquidity pair.             |
| `vlp`         | `address`   | The address of the corresponding VLP contract.  |


### Get Escrow

Returns the escrow contract address and token types for a given token ID.

#### Query Call

<Tabs tabs={[
{
id: 'solidity-example',
label: 'Solidity',
language: 'solidity',
content: `
function getEscrow(string memory token_id) external view returns (EscrowResponse memory);

struct EscrowResponse {
    address escrow_address;
    TokenType[] token_types;
}
`
},
{
id: 'json-example',
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

#### Input Parameters

| **Field**   | **Type**   | **Description**                         |
|-------------|------------|-----------------------------------------|
| `token_id`  | `string`   | The token ID to look up escrow for.     |

#### Response

<Tabs tabs={[
{
id: 'solidity-response',
label: 'Solidity',
language: 'solidity',
content: `
struct EscrowResponse {
    address escrow_address;
    TokenType[] token_types;
}
`
}
]} />

| **Field**           | **Type**              | **Description**                                    |
|---------------------|-----------------------|----------------------------------------------------|
| `escrow_address`    | `address`             | Address of the escrow contract (if any).           |
| `token_types`       | `TokenType[]`         | Supported token types backing this token ID.       |


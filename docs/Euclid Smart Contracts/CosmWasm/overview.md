---
sidebar_position: 1
description: "Learn about Euclid's Smart Contract Set"
---
import Tabs from '@site/src/components/Tabs';

# Overview

In the [Architecture Overview](../../Architecture%20Overview/General%20Overview.md), we took a look at the different components that make up the Euclid Unified Liquidity layer. In this section, we will be looking at each of the Euclid smart contracts and their respective messages. 

Factory is still the primary entry point for user-facing flows, so we provide a detailed breakdown of its execute and query messages. Other Euclid contracts also expose execute messages, but many are protocol/admin/internal integration paths.


## Common Types 
A list of structs that are used in many of our contracts.

### PairWithDenom
Specifies a token pair. The name and type for each token is specified.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub struct PairWithDenom {
    pub token_1: TokenWithDenom,
    pub token_2: TokenWithDenom,
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "pair_with_denom": {
    "token_1": {
      "token": "nibiru",
      "token_type": {
        "native": {
          "denom": "unibi"
        }
      }
    }, 
    "token_2": {
      "token": "injective",
      "token_type": {
        "native": {
          "denom": "uinj"
        }
      }
    }
  }
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `token_1` | [`TokenWithDenom`](#tokenwithdenom) | Information about the first token. |
| `token_2` | [`TokenWithDenom`](#tokenwithdenom) | Information about the second token. |

### PairWithDenomAndAmount
Struct that specifies a token pair, their denoms, and an amount for each. Used when adding liquidity to a pool.

<Tabs tabs={[
{
id: 'rust-example-pairwithdenomandamount',
label: 'Rust',
language: 'rust',
content: `
pub struct PairWithDenomAndAmount {
    pub token_1: TokenWithDenomAndAmount,
    pub token_2: TokenWithDenomAndAmount,
}

#[cw_serde]
pub struct TokenWithDenomAndAmount {
    pub token: Token,
    pub amount: Uint128,
    pub token_type: TokenType,
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `token_1` | [`TokenWithDenomAndAmount`](#tokenwithdenomandamount) | Information about the first token in the pair. |
| `token_2` | [`TokenWithDenomAndAmount`](#tokenwithdenomandamount) | Information about the second token in the pair. |

### TokenWithDenomAndAmount

| Field | Type | Description |
|---|---|---|
| `token` | [`Token`](#token) | The token id. |
| `amount` | `Uint128` | The amount for this token. |
| `token_type` | [`TokenType`](#tokentype) | The denomination/type of this token. |



### TokenWithDenom
Specifies information on one token. The name of the token and type is specified.

<Tabs tabs={[
{
id: 'rust-example-tokenwithdenom',
label: 'Rust',
language: 'rust',
content: `
pub struct TokenWithDenom {
    pub token: Token,
    pub token_type: TokenType,
}
`
}
]} />
| Field | Type | Description |
|---|---|---|
| `token` | [`Token`](#token) | The token id. |
| `token_type` | [`TokenType`](#tokentype) | The token type (native, smart, or voucher). |

### Token
<Tabs tabs={[
{
id: 'rust-example-token',
label: 'Rust',
language: 'rust',
content: `
pub struct Token(String);
`
}
]} />

### TokenType
The type of token. Can be either:
- **Native**: Specify the denomination of the token.
- **Smart**: CW20 token. Specify the contract address for the token.
- **Voucher**: Euclid voucher tokens.

<Tabs tabs={[
{
id: 'rust-example-tokentype',
label: 'Rust',
language: 'rust',
content: `
pub enum TokenType {
    Native { denom: String },
    Smart { contract_address: String },
    Voucher {},
}
`
}
]} />

| Variant | Payload | Description |
|---|---|---|
| `Native` | `{ denom: String }` | Native token denom. |
| `Smart` | `{ contract_address: String }` | CW20 contract address. |
| `Voucher` | `{}` | Euclid voucher token. |

### Pair
The token Id for each token in a token pair.
<Tabs tabs={[
{
id: 'rust-example-pair',
label: 'Rust',
language: 'rust',
content: `
pub struct Pair {
    pub token_1: Token,
    pub token_2: Token,
}
`
}
]} />
| Field | Type | Description |
|---|---|---|
| `token_1` | [`Token`](#token) | Id of the first token in the pair. |
| `token_2` | [`Token`](#token) | Id of the second token in the pair. |

### Recipient

Defines where funds should be released, how much should be released, and in what denomination.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub struct Recipient {
    pub recipient: CrossChainUser,
    pub amount: Limit,
    pub denom: TokenType,
    pub forwarding_message: Option<String>,
    pub unsafe_refund_as_voucher: Option<bool>,
}


`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "recipient": {
    "chain_uid": "osmosis",
    "address": "osmo1..."
  },
  "amount": {
    "less_than_or_equal": "1000000"
  },
  "denom": {
    "native": {
      "denom": "uosmo"
    }
  },
  "forwarding_message": "eyJzd2FwX2hvb2siOnsicGFpciI6eyJ0b2tlbl8xIjoidXNkdCIsInRva2VuXzIiOiJ1c2RjIn19fQ==",
  "unsafe_refund_as_voucher": false
}
`
}

]} />

| Field | Type | Description |
|---|---|---|
| `recipient` | [`CrossChainUser`](#crosschainuser) | Destination cross-chain user receiving funds. |
| `amount` | [`Limit`](#limit) | Release amount constraint for this recipient. |
| `denom` | [`TokenType`](#tokentype) | Denomination/type to release for this recipient. |
| `forwarding_message` | `Option<String>` | Optional encoded message for downstream integrations. |
| `unsafe_refund_as_voucher` | `Option<bool>` | If true, vouchers are refunded to the recipient when release fails. This is unsafe because the router cannot validate whether the recipient address is valid. If false, the sender receives the refund. |

### Limit

Defines how much a recipient is allowed or required to receive during distribution.

<Tabs tabs={[
{
id: 'rust-example-limit',
label: 'Rust',
language: 'rust',
content: `
pub enum Limit {
    LessThanOrEqual(Uint128),
    Equal(Uint128),
    GreaterThanOrEqual(Uint128),
    Dynamic(Uint128),
}
`
}
]} />

| Variant | Payload | Description |
|---|---|---|
| `Dynamic` | `Uint128` | Use when final output is unknown before execution (for example swaps). It forces release of the full computed amount to this recipient; if full release is not possible, the transaction fails. |
| `Equal` | `Uint128` | Enforces an exact release amount. Useful when expected output is known beforehand. |
| `GreaterThanOrEqual` | `Uint128` | Sets a minimum amount that must be released. Execution can still release more than this threshold. |
| `LessThanOrEqual` | `Uint128` | Sets a maximum amount that may be released to this recipient. |

Example behavior:
- Swap from token A to token B where exact output is unknown: use `Dynamic` to force all actual output to be released to the recipient.
- Using `GreaterThanOrEqual(1)` only sets a floor, so partial release above that floor can still pass.
- Using `Equal` is best when exact output is known in advance.

### CrossChainConfig
Common cross-chain options for timeout, acknowledgements, and metadata.

<Tabs tabs={[
{
id: 'rust-example-crosschainconfig',
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
| `timeout` | `Option<u64>` | Optional timeout in seconds for cross-chain flow. |
| `ack_response` | `Option<Binary>` | Optional acknowledgement payload returned to sender side. |
| `meta` | `Option<String>` | Optional metadata emitted/logged for integrations. |

### EuclidReceive
Wrapper used for protocol receive hooks.

<Tabs tabs={[
{
id: 'rust-example-euclidreceive',
label: 'Rust',
language: 'rust',
content: `
pub struct EuclidReceive {
    pub msg: Binary,
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `msg` | `Binary` | Binary payload forwarded to receive hook target. |

### CrossChainUser

The chain UID and address of the user.

<Tabs tabs={[
{
id: 'rust-example-crosschainuser',
label: 'Rust',
language: 'rust',
content: `
pub struct CrossChainUser {
    pub chain_uid: ChainUid,
    pub address: String,
}

pub struct ChainUid(String);
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `chain_uid` | `ChainUid` | Unique identifier of the chain. |
| `address` | `String` | User address on that chain. |

### Pagination
Struct used to define pagination parameters.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub struct Pagination<T> {
    pub min: Option<T>,
    pub max: Option<T>,
    pub skip: Option<u64>,
    pub limit: Option<u64>,
}

`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `


"pagination": {
  "min": "3",       
  "max": "15",      
  "skip": 2,       
  "limit": 10       
    }
`
}

]} />

| Field | Type | Description |
|---|---|---|
| `min` | `Option<T>` | Lower bound filter. |
| `max` | `Option<T>` | Upper bound filter. |
| `skip` | `Option<u64>` | Number of results to skip (default 0). |
| `limit` | `Option<u64>` | Maximum results to return (default 10). |

---
sidebar_position: 1
description: "Learn about Euclid's Solidity Smart Contract Set"
---

import Tabs from '@site/src/components/Tabs';

# Overview

In the [Architecture Overview](../../Architecture%20Overview/General%20Overview.md), we explored the core components that make up the Euclid Unified Liquidity layer. This section covers the Solidity (EVM) smart contracts that power Euclid on EVM-compatible chains.

Since the Factory smart contract is the main entry point for users/projects to interact with the Euclid layer, this page focuses on the common Solidity types used across Factory methods.

## Common Types

### TokenType

Defines the type and source of a token used in the Euclid protocol.

<Tabs tabs={[
{
id: 'solidity-overview-tokentype',
label: 'Solidity',
language: 'solidity',
content: `
struct TokenType {
    string token_type;
    string native_denom;
    string erc20_address;
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `token_type` | `string` | The token type (native, smart, or voucher). |
| `native_denom` | `string` | Native token denom. |
| `erc20_address` | `string` | ERC20 contract address. |

### TokenWithDenom

Represents a token identifier along with its token type.

<Tabs tabs={[
{
id: 'solidity-overview-tokenwithdenom',
label: 'Solidity',
language: 'solidity',
content: `
struct TokenWithDenom {
    string token;
    TokenType token_type;
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `token` | `string` | The token id. |
| `token_type` | [`TokenType`](#tokentype) | The token type (native, smart, or voucher). |

### TokenWithDenomAndAmount

Represents a token id, amount, and token type.

<Tabs tabs={[
{
id: 'solidity-overview-tokenwithdenomandamount',
label: 'Solidity',
language: 'solidity',
content: `
struct TokenWithDenomAndAmount {
    string token;
    uint256 amount;
    TokenType token_type;
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `token` | `string` | The token id. |
| `amount` | `uint256` | The amount for this token. |
| `token_type` | [`TokenType`](#tokentype) | The denomination/type of this token. |

### Pair

Token pair consisting of two token ids.

<Tabs tabs={[
{
id: 'solidity-overview-pair',
label: 'Solidity',
language: 'solidity',
content: `
struct Pair {
    string token_1;
    string token_2;
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `token_1` | `string` | Id of the first token in the pair. |
| `token_2` | `string` | Id of the second token in the pair. |

### PairWithDenomAndAmount

Token pair including amount and denomination details for each side.

<Tabs tabs={[
{
id: 'solidity-overview-pairwithdenomandamount',
label: 'Solidity',
language: 'solidity',
content: `
struct PairWithDenomAndAmount {
    TokenWithDenomAndAmount token_1;
    TokenWithDenomAndAmount token_2;
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `token_1` | [`TokenWithDenomAndAmount`](#tokenwithdenomandamount) | Information about the first token in the pair. |
| `token_2` | [`TokenWithDenomAndAmount`](#tokenwithdenomandamount) | Information about the second token in the pair. |

### CrossChainUser

Represents a user on a specific chain.

<Tabs tabs={[
{
id: 'solidity-overview-crosschainuser',
label: 'Solidity',
language: 'solidity',
content: `
struct CrossChainUser {
    string chain_uid;
    string sender;
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `chain_uid` | `string` | Unique identifier of the chain. |
| `sender` | `string` | User address on that chain. |

### EuclidReceive

Message payload forwarded to destination integrations.

<Tabs tabs={[
{
id: 'solidity-overview-euclidreceive',
label: 'Solidity',
language: 'solidity',
content: `
struct EuclidReceive {
    bytes data;
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `data` | `bytes` | Binary payload forwarded to receive hook target. |

### Limit

Defines a per-recipient release policy.

<Tabs tabs={[
{
id: 'solidity-overview-limit',
label: 'Solidity',
language: 'solidity',
content: `
struct Limit {
    string limit_type;
    uint256 value;
}
`
},
{
id: 'solidity-overview-limit-json',
label: 'JSON',
language: 'json',
content: `
{
  "equal": {
    "limit_type": "equal",
    "value": "1000000"
  },
  "less_than_or_equal": {
    "limit_type": "less_than_or_equal",
    "value": "1000000"
  },
  "greater_than_or_equal": {
    "limit_type": "greater_than_or_equal",
    "value": "1000000"
  },
  "dynamic": {
    "limit_type": "dynamic",
    "value": "0"
  }
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `limit_type` | `string` | One of: `equal`, `less_than_or_equal`, `greater_than_or_equal`, `dynamic`. |
| `value` | `uint256` | Value for limit evaluation. For `dynamic`, this should be `0`. |

`limit_type` options:

| Option | Description |
|---|---|
| `dynamic` | Use when final output is unknown before execution (for example swaps).<br/>Forces release of the full computed amount to this recipient.<br/>If full release is not possible, the transaction fails. |
| `equal` | Enforces an exact release amount.<br/>Useful when expected output is known beforehand. |
| `greater_than_or_equal` | Sets a minimum amount that must be released.<br/>Execution can still release more than this threshold. |
| `less_than_or_equal` | Sets a maximum amount that may be released to this recipient.<br/>Useful for capped distribution across recipients. |

### Recipient

Defines destination release instructions for swap/deposit/transfer outputs.

<Tabs tabs={[
{
id: 'solidity-overview-recipient',
label: 'Solidity',
language: 'solidity',
content: `
struct Recipient {
    CrossChainUser recipient;
    Limit amount;
    TokenType denom;
    bytes forwarding_message;
    bool unsafe_refund_as_voucher;
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `recipient` | [`CrossChainUser`](#crosschainuser) | Destination cross-chain user receiving funds. |
| `amount` | [`Limit`](#limit) | Release amount constraint for this recipient. |
| `denom` | [`TokenType`](#tokentype) | Denomination/type to release for this recipient. |
| `forwarding_message` | `bytes` | Optional encoded message for downstream integrations. |
| `unsafe_refund_as_voucher` | `bool` | If true, failed release refunds vouchers to `recipient` (unsafe because router cannot validate destination address). If false, refund goes back to sender. |

### CrossChainConfig

Cross-chain transport options attached to execute messages.

<Tabs tabs={[
{
id: 'solidity-overview-crosschainconfig',
label: 'Solidity',
language: 'solidity',
content: `
struct CrossChainConfig {
    uint256 timeout;
    bytes ack_response;
    string meta;
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `timeout` | `uint256` | Timeout for the cross chain message. |
| `ack_response` | `bytes` | Ack response for the cross chain message. Will be used to trigger a receive message on sender when ack is received. |
| `meta` | `string` | Meta data for the cross chain message. Will be used to store any additional data needed for the cross chain message as event attributes. |

### PoolConfig

Pool configuration used during pool creation.

<Tabs tabs={[
{
id: 'solidity-overview-poolconfig',
label: 'Solidity',
language: 'solidity',
content: `
struct PoolConfig {
    string pool_type;
    uint256 amp_factor;
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `pool_type` | `string` | Pool type literal: `stable` or `cp` (constant product). |
| `amp_factor` | `uint256` | Amplification factor used for `stable` pools. |

### NextSwapPair

Describes a hop in a swap route.

<Tabs tabs={[
{
id: 'solidity-overview-nextswappair',
label: 'Solidity',
language: 'solidity',
content: `
struct NextSwapPair {
    string token_in;
    string token_out;
    bool test_fail;
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `token_in` | `string` | Input token id for this route step. |
| `token_out` | `string` | Output token id for this route step. |
| `test_fail` | `bool` | Testing flag used in module tests. Keep `false` for normal usage. |

### PartnerFee

Partner fee settings for swap transactions.

<Tabs tabs={[
{
id: 'solidity-overview-partnerfee',
label: 'Solidity',
language: 'solidity',
content: `
struct PartnerFee {
    uint64 partner_fee_bps;
    address recipient;
}
`
}
]} />

| Field | Type | Description |
|---|---|---|
| `partner_fee_bps` | `uint64` | Partner fee in basis points. Max supported value is `30` (0.3%). |
| `recipient` | `address` | Address receiving the partner fee. |

---
sidebar_position: 2
description: "Common Types"
Title: "Common Types"
---
import Tabs from '@site/src/components/Tabs';

# Common Types

## Overview

These are shared request structures used across REST API calls.

## Types

### `CrossChainUser`

```ts
type CrossChainUser = {
  chain_uid?: string
  address?: string
}
```

| Field | Type | Description |
|---|---|---|
| `chain_uid` | `string` | Unique chain identifier for the user address. |
| `address` | `string` | User address on the specified chain. |

### `CrossChainUserInput`

Alias of `CrossChainUser`, used by some GQL queries.
See [`CrossChainUser`](#crosschainuser) for the full field breakdown.

```ts
type CrossChainUserInput = CrossChainUser
```

### `CrossChainUserWithAmount`

<Tabs
  tabs={[
    {
      id: 'crosschainuserwithamount-ts',
      label: 'TypeScript',
      language: 'ts',
      content: `type CrossChainUserWithAmount = {
  chain_uid?: string
  address?: string
  amount?: string
  social?: {
    email?: string
    telegram?: string
    twitter?: string
  }
}`
    },
    {
      id: 'crosschainuserwithamount-json',
      label: 'JSON',
      language: 'json',
      content: `{
  "chain_uid": "base",
  "address": "0xB0b123456789abcdef123456789abcdef1234567",
  "amount": "1000000"
}`
    }
  ]}
/>

| Field | Type | Description |
|---|---|---|
| `chain_uid` | `string` | Unique chain identifier for the user address. |
| `address` | `string` | User address on the specified chain. |
| `amount` | `string` | Optional amount associated with this user. |
| `social` | `object` | Optional social recipient descriptor (email/telegram/twitter). |

### `CrossChainAddressWithLimit`

<Tabs
  tabs={[
    {
      id: 'crosschainaddresswithlimit-ts',
      label: 'TypeScript',
      language: 'ts',
      content: `type CrossChainAddressWithLimit = {
  user: CrossChainUserWithAmount
  amount?: {
    dynamic?: string
    equal?: string
    greater_than_or_equal?: string
    less_than_or_equal?: string
  }
  denom?: TokenType
  forwarding_message?: string
  unsafe_refund_as_voucher?: boolean
}`
    },
    {
      id: 'crosschainaddresswithlimit-json',
      label: 'JSON',
      language: 'json',
      content: `{
  "user": {
    "chain_uid": "base",
    "address": "0xB0b123456789abcdef123456789abcdef1234567",
    "amount": "1000000"
  },
  "amount": {
    "less_than_or_equal": "950000"
  },
  "denom": {
    "native": { "denom": "base" }
  },
  "forwarding_message": "",
  "unsafe_refund_as_voucher": false
}`
    }
  ]}
/>

| Field | Type | Description |
|---|---|---|
| `user` | [`CrossChainUserWithAmount`](#crosschainuserwithamount) | Target recipient user object. |
| `amount` | [`Limit`](#limit) | Optional amount constraints for this recipient. |
| `denom` | [`TokenType`](#tokentype-variants) | Optional preferred output denomination/type. |
| `forwarding_message` | `string` | Optional forwarding payload. |
| `unsafe_refund_as_voucher` | `boolean` | If true, refunds are returned as vouchers. |

### `Limit`

Use `Limit` to control how much should be released to a recipient when output amount handling matters.

<Tabs
  tabs={[
    {
      id: 'limit-ts',
      label: 'TypeScript',
      language: 'ts',
      content: `type Limit = {
  dynamic?: string
  equal?: string
  greater_than_or_equal?: string
  less_than_or_equal?: string
}`
    },
    {
      id: 'limit-json',
      label: 'JSON',
      language: 'json',
      content: `{
  "dynamic": "true"
}`
    }
  ]}
/>

| Field | Type | Description |
|---|---|---|
| `dynamic` | `string` | Use when final output is unknown before execution (for example swaps). It forces release of the full computed amount to this recipient; if full release is not possible, the transaction fails. |
| `equal` | `string` | Enforces an exact release amount. Useful when the expected output is known beforehand. |
| `greater_than_or_equal` | `string` | Sets a minimum amount that must be released. Execution can still release more than this threshold. |
| `less_than_or_equal` | `string` | Sets a maximum amount that may be released to this recipient. |

Example behavior:
- Swap from `euclid` to `mon` where exact output is unknown: use `dynamic` to force all actual output to be released on `mon`.
- Using `greater_than_or_equal: "1"` only sets a floor, so partial release can still pass.
- Using `equal` is only valid when exact output is known in advance.

### `TokenWithDenom`

Represents a token and how it should be interpreted on-chain.

<Tabs
  tabs={[
    {
      id: 'tokenwithdenom-ts',
      label: 'TypeScript',
      language: 'ts',
      content: `type TokenWithDenom = {
  token: string
  token_type?: TokenType
  amount?: string
}`
    },
    {
      id: 'tokenwithdenom-json',
      label: 'JSON',
      language: 'json',
      content: `{
  "token": "usdc",
  "amount": "10000000",
  "token_type": {
    "smart": {
      "contract_address": "0xA1b2C3d4E5F67890123456789abcdef123456789"
    }
  }
}`
    }
  ]}
/>

| Field | Type | Description |
|---|---|---|
| `token` | `string` | Token identifier (for example `usdc`). |
| `token_type` | [`TokenType`](#tokentype-variants) | Specifies whether the token is native, smart, or voucher. |
| `amount` | `string` | Optional token amount when used in amount-bearing payloads. |

### `TokenType Variants`

<Tabs
  tabs={[
    {
      id: 'tokentype-ts',
      label: 'TypeScript',
      language: 'ts',
      content: `type TokenType =
  | { native: { denom: string } }
  | { smart: { contract_address: string } }
  | { voucher: {} }`
    },
    {
      id: 'tokentype-json-native',
      label: 'JSON (native)',
      language: 'json',
      content: `{
  "native": {
    "denom": "uusdc"
  }
}`
    }
  ]}
/>

| Variant | Shape | Description |
|---|---|---|
| `native` | `{ native: { denom: string } }` | Uses a native chain denomination for routing and settlement. |
| `smart` | `{ smart: { contract_address: string } }` | Uses a smart-token contract address for contract-based assets. |
| `voucher` | `{ voucher: {} }` | Marks voucher form with no nested fields. |

### `PairWithDenomAndAmount`

Used in add-liquidity requests (`pair_info`).

<Tabs
  tabs={[
    {
      id: 'pairwithdenomandamount-ts',
      label: 'TypeScript',
      language: 'ts',
      content: `type PairWithDenomAndAmount = {
  token_1: {
    token: string
    amount: string
    token_type?: TokenType
  }
  token_2: {
    token: string
    amount: string
    token_type?: TokenType
  }
}`
    },
    {
      id: 'pairwithdenomandamount-json',
      label: 'JSON',
      language: 'json',
      content: `{
  "token_1": {
    "token": "usdc",
    "amount": "1000000",
    "token_type": { "native": { "denom": "uusdc" } }
  },
  "token_2": {
    "token": "eth",
    "amount": "500000000000000",
    "token_type": { "smart": { "contract_address": "0xA1b2C3d4E5F67890123456789abcdef123456789" } }
  }
}`
    }
  ]}
/>

| Field | Type | Description |
|---|---|---|
| `token_1` | `object` | First token entry with `token`, `amount`, and optional `token_type`. |
| `token_2` | `object` | Second token entry with `token`, `amount`, and optional `token_type`. |
| `token_1.token_type` | [`TokenType`](#tokentype-variants) | Optional type metadata for the first token. |
| `token_2.token_type` | [`TokenType`](#tokentype-variants) | Optional type metadata for the second token. |

### `PairWithDenom`

Used in pool-creation requests (`pair`).

<Tabs
  tabs={[
    {
      id: 'pairwithdenom-ts',
      label: 'TypeScript',
      language: 'ts',
      content: `type PairWithDenom = {
  token_1: TokenWithDenom
  token_2: TokenWithDenom
}`
    },
    {
      id: 'pairwithdenom-json',
      label: 'JSON',
      language: 'json',
      content: `{
  "token_1": {
    "token": "usdc",
    "token_type": { "native": { "denom": "uusdc" } }
  },
  "token_2": {
    "token": "eth",
    "token_type": { "smart": { "contract_address": "0xA1b2C3d4E5F67890123456789abcdef123456789" } }
  }
}`
    }
  ]}
/>

| Field | Type | Description |
|---|---|---|
| `token_1` | [`TokenWithDenom`](#tokenwithdenom) | First token definition in the pair. |
| `token_2` | [`TokenWithDenom`](#tokenwithdenom) | Second token definition in the pair. |

### `PairToken`

Used in remove-liquidity requests (`pair`).

<Tabs
  tabs={[
    {
      id: 'pairtoken-ts',
      label: 'TypeScript',
      language: 'ts',
      content: `type PairToken = {
  token_1: string
  token_2: string
}`
    },
    {
      id: 'pairtoken-json',
      label: 'JSON',
      language: 'json',
      content: `{
  "token_1": "usdc",
  "token_2": "eth"
}`
    }
  ]}
/>

| Field | Type | Description |
|---|---|---|
| `token_1` | `string` | First token identifier in the pair (for example `usdc`). |
| `token_2` | `string` | Second token identifier in the pair (for example `eth`). |

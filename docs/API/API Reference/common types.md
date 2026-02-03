---
sidebar_position: 2
description: "Common Types"
Title: "Common Types"
---
import Tabs from '@site/src/components/Tabs';

# Common Types

## CrossChainRecipient

Euclid enables the movement of assets and execution of actions across multiple chains within a unified routing system. In this context, it's very common for developers to work with recipients that exist on different chains. Whether you're sending tokens, triggering a remote swap, or executing logic across chains, you need to define who the recipient is and what chain they belong to.

Whether you’re sending funds, executing a remote contract call, or initiating a swap that settles elsewhere, you’ll often need to define **who** the receiver is, **what chain** they’re on, and **how much** they can receive.

This is where the `CrossChainUser` family of types comes into play.


## Common Use Case: Cross-Chain Funds Delivery

Let's say you're building a swap mechanism where tokens from Ethereum are swapped and sent to a Cosmos chain. You’ll need to specify:

-  The recipient address
-  The destination chain (`chain_uid`)
-  A limit (optional) to cap the amount being sent

All of this is covered by the types below, used in our APIs.

## Types

### `CrossChainUser`

```ts
type CrossChainUser = {
  chain_uid?: string
  address?: string
}
```

#### Fields

| **Field**     | **Type**   | **Description**                          |
|---------------|------------|------------------------------------------|
| `address`     | `string`  | The user’s address on the given chain.   |
| `chain_uid`   | `string`  | The unique identifier of the chain.      |


### `CrossChainUserInput`

<Tabs
  tabs={[
    {
      id: 'crosschainuser-ts',
      label: 'TypeScript',
      language: 'ts',
      content: `type CrossChainUserInput = {
  chain_uid?: string
  address?: string
}`
    },
    {
      id: 'crosschainuser-json',
      label: 'JSON',
      language: 'json',
      content: `{
  "address": "0xB0b123456789abcdef123456789abcdef1234567",
  "chain_uid": "base"
}`
    }
  ]}
/>

#### Input Fields

| **Field**     | **Type**   | **Description**                          |
|---------------|------------|------------------------------------------|
| `address`     | `string?`  | The user’s address to look up or act on. |
| `chain_uid`   | `string?`  | The chain UID of the user.               |


### `CrossChainAddressWithLimit`

<Tabs
tabs={[
{
id: 'crosschainaddresswithlimit-ts',
label: 'TypeScript',
language: 'ts',
content: `type CrossChainAddressWithLimit = {
\
user: CrossChainUserWithAmount 
limit?: {
   less_than_or_equal?: string
   greater_than_or_equal?: string
   equal?: string }
preferred_denom?: TokenType
forwarding_message?: {
   data?: string 
   meta?: string } 
   }`
},
{
id: 'crosschainaddresswithlimit-json',
label: 'JSON',
language: 'json',
content: `{ "user": { "chain_uid": "base", "address": "0xB0b123456789abcdef123456789abcdef1234567", "amount": "1000000" }, "limit": { "greater_than_or_equal": "950000" }, "preferred_denom": { "native": { "denom": "base" } }, "forwarding_message": { "data": "0x", "meta": "forward" } }`
}
]}
/>

| Field                  | Type                      | Description |
|-----------------------|----------------------------|-------------|
| `user`                | [`CrossChainUserWithAmount`](#crosschainuserwithamount) | The target recipient on a specific chain, including the chain UID, address, and optionally an amount or social identity for routing/claims. |
| `limit`               | [Limit](#limit)                      | Optional delivery constraints that define acceptable amount bounds for this recipient. |
| `preferred_denom`     | [`TokenType`](#tokentype-variants)                   | Optional preference for how the asset should be represented on the destination chain (native vs smart vs voucher). |
| `forwarding_message`  | object                       | Optional forwarding payload (data/meta) passed along to downstream handlers or contracts when the cross-chain delivery executes. |


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

| Field       | Type     | Description |
|------------|----------|-------------|
| `chain_uid` | `string` | Unique chain identifier for the user’s address. |
| `address`   | `string` | User address on the specified chain. |
| `amount`    | `string` | Amount associated with the user for this request (as a string). |


### `Limit`

<Tabs
  tabs={[
    {
      id: 'limit-ts',
      label: 'TypeScript',
      language: 'ts',
      content: `export type Limit =
  | { less_than_or_equal: string }
  | { equal: string }
  | { greater_than_or_equal: string };`
    },
    {
      id: 'limit-json',
      label: 'JSON Example',
      language: 'json',
      content: `{
  "less_than_or_equal": "1000000000000000000"
}`
    }
  ]}
/>

### TokenWithDenom

Represents a token and how it should be interpreted on-chain. The `token_type` determines if it's a native chain token, a smart contract token, or a voucher.

### Structure

<Tabs
  tabs={[
    {
      id: 'tokenwithdenom-ts',
      label: 'TypeScript',
      language: 'ts',
      content: `type TokenWithDenom = {
  token: string
  token_type: TokenType
  amount?: string
}
`
    },
    {
      id: 'tokenwithdenom-json',
      label: 'JSON',
      language: 'json',
      content: `{
  "token": "usdc",
  "amount":"10000000",
  "token_type": {
    "smart": {
      "contract_address": "0xA1b2C3d4E5F67890123456789abcdef123456789"
    }
  }
}`
    }
  ]}
/>

### `TokenType Variants`

<Tabs
  tabs={[
    {
      id: 'tokentype-variants-ts',
      label: 'TypeScript',
      language: 'ts',
      content: `
type TokenType =
  | { native: { denom: string } }
  | { smart: { contract_address: string } }
  | { voucher: {} }
`
    }
  ]}
/>

### `PairWithDenomAndAmount`

Used when representing a pair of tokens along with their amounts and token type. Commonly used in swaps and pool-related contexts.

### Structure

<Tabs
  tabs={[
    {
      id: 'pairwithdenomandamount-ts',
      label: 'TypeScript',
      language: 'ts',
      content: `

type PairWithDenomAndAmount = {
  token_1: TokenWithDenomAndAmount
  token_2: TokenWithDenomAndAmount
}

type TokenWithDenomAndAmount = {
  token: string
  amount: string
  token_type: TokenType
}

type TokenType =
  | { native: { denom: string } }
  | { smart: { contract_address: string } }
  | { voucher: {} };`
    },
    {
      id: 'pairwithdenomandamount-json',
      label: 'JSON',
      language: 'json',
      content: `{
  "token_1": {
    "token": "usdt",
    "amount": "1000000",
    "token_type": {
      "native": {
        "denom": "usdt"
      }
    }
  },
  "token_2": {
    "token": "weth",
    "amount": "500000000000000000",
    "token_type": {
      "smart": {
        "contract_address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
      }
    }
  }
}`
    }
  ]}
/>


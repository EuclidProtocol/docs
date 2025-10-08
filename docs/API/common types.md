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
export interface CrossChainUser {
  address: string | null;
  chain_uid: string | null;
}
```

#### Return Fields

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
      content: `export interface CrossChainUser {
  address: string | null;
  chain_uid: string | null;
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


### `CrossChainUserWithLimit`

```ts
export interface CrossChainUserWithLimit {
  limit?: Limit | null;
  user: CrossChainUser;
}
```

#### Return Fields

| **Field**     | **Type**                             | **Description**                                      |
|---------------|--------------------------------------|------------------------------------------------------|
| `limit`       | `Limit?`                            | Optional token limit for the user (e.g., escrow cap). |
| `user`        | [`CrossChainUser`](#crosschainuser) | The user address and chain metadata.                |



### Limit



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

## TokenWithDenom

Represents a token and how it should be interpreted on-chain. The `token_type` determines if it's a native chain token, a smart contract token, or a voucher.

### Structure

<Tabs
  tabs={[
    {
      id: 'tokenwithdenom-ts',
      label: 'TypeScript',
      language: 'ts',
      content: `interface TokenWithDenom {
  token: string;
  token_type: TokenType;
}

type TokenType =
  | { native: { denom: string } }
  | { smart: { contract_address: string } }
  | { voucher: {} };`
    },
    {
      id: 'tokenwithdenom-json',
      label: 'JSON',
      language: 'json',
      content: `{
  "token": "usdc",
  "token_type": {
    "smart": {
      "contract_address": "0xA1b2C3d4E5F67890123456789abcdef123456789"
    }
  }
}`
    }
  ]}
/>

### TokenType Variants

```ts
type TokenType =
  | { native: { denom: string } }
  | { smart: { contract_address: string } }
  | { voucher: {} }
```

## PairWithDenomAndAmount

Used when representing a pair of tokens along with their amounts and token type. Commonly used in swaps and pool-related contexts.

### Structure

<Tabs
  tabs={[
    {
      id: 'pairwithdenomandamount-ts',
      label: 'TypeScript',
      language: 'ts',
      content: `interface PairWithDenomAndAmount {
  token_1: TokenWithDenomAndAmount;
  token_2: TokenWithDenomAndAmount;
}

interface TokenWithDenomAndAmount {
  token: string;
  amount: string;
  token_type: TokenType;
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




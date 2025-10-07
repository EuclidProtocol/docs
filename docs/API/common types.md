---
sidebar_position: 2
description: "Common Types"
Title: "Common Types"
---

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

```ts
export interface CrossChainUserInput {
  address: string;
  chain_uid: string;
}
```

#### Input Fields

| **Field**     | **Type**   | **Description**                          |
|---------------|------------|------------------------------------------|
| `address`     | `string?`  | The user’s address to look up or act on. |
| `chain_uid`   | `string?`  | The chain UID of the user.               |


### `CrossChainUserWithLimit`

```ts
export interface CrossChainUserWithLimit {
  limit?: string | null;
  user: CrossChainUser;
}
```

#### Return Fields

| **Field**     | **Type**                             | **Description**                                      |
|---------------|--------------------------------------|------------------------------------------------------|
| `limit`       | `string?`                            | Optional token limit for the user (e.g., escrow cap). |
| `user`        | [`CrossChainUser`](#crosschainuser) | The user address and chain metadata.                |



## Developer Tip

- If you're building a flow where a user receives something **on another chain**, you’ll almost always be dealing with one of these types.
- `chain_uid` is used internally across the protocol to refer to chain IDs in a standardized way.
- Always validate the `chain_uid` matches what your front-end or wallet expects.



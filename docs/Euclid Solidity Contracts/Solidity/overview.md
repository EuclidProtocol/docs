---
sidebar_position: 1
description: "Learn about Euclid's Solidity Smart Contract Set"
---

import Tabs from '@site/src/components/Tabs';

# Overview

In the [Architecture Overview](../../Architecture%20Overview/General%20Overview.md), we explored the core components that make up the Euclid Unified Liquidity layer. This section covers the Solidity (EVM) smart contracts that power Euclid on EVM-compatible chains.

Since the Factory contract is the **only public entry point** for interacting with the Euclid stack, it is the only contract that exposes execute messages. The rest of the contracts in the system are internal and expose only queryable state, which will be covered individually.


## Common Types
A list of structs that are used in many of our contracts.


### TokenWithDenom

Represents a token identifier along with its token type (native, smart, or voucher).

<Tabs tabs={[
{
id: 'solidity-example',
label: 'Solidity',
language: 'solidity',
content: `
struct TokenWithDenom {
    string token;        // Token ID used by Euclid
    TokenType token_type; // Describes token's source (native, smart, or voucher)
}
`
}
]} />

| **Field**     | **Type**     | **Description**                                                   |
|---------------|--------------|-------------------------------------------------------------------|
| `token`       | `string`     | The internal token ID (e.g., `"usdc"`, `"weth"`, `"voucher-dai"`). |
| `token_type`  | [`TokenType`](#tokentype) | The token's type (native, smart contract, or voucher).           |

### PairWithDenom

Defines a token pair. Each token includes its name and token type.

<Tabs tabs={[
{
id: 'solidity-example',
label: 'Solidity',
language: 'solidity',
content: `
struct PairWithDenom {
    TokenWithDenom token_1;
    TokenWithDenom token_2;
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
      "token": "amoy",
      "token_type": {
        "native": {
          "denom": "pol"
        }
      }
    },
    "token_2": {
      "token": "euclid",
      "token_type": {
        "smart": {
          "contract_address": "0x1e..."
        }
      }
    }
  }
}
`
}
]} />

| Field     | Description                          |
|-----------|--------------------------------------|
| `token_1` | Information about the first token.   |
| `token_2` | Information about the second token.  |




### PairWithDenomAndAmount

Used when adding liquidity to a pool. Includes token ID, token type, and amount for each asset.

<Tabs tabs={[
{
id: 'solidity-example',
label: 'Solidity',
language: 'solidity',
content: `
struct PairWithDenomAndAmount {
    TokenWithDenomAndAmount token_1;
    TokenWithDenomAndAmount token_2;
}

struct TokenWithDenomAndAmount {
    string token;
    uint256 amount;
    TokenType token_type;
}
`
}
]} />

| **Field**     | **Type**                     | **Description**                             |
|---------------|------------------------------|---------------------------------------------|
| `token_1`     | `TokenWithDenomAndAmount`    | First token in the pair.                    |
| `token_2`     | `TokenWithDenomAndAmount`    | Second token in the pair.                   |


### TokenType
Defines the type and source of a token used in the Euclid protocol.

<Tabs tabs={[
{
id: 'solidity-example',
label: 'Solidity',
language: 'solidity',
content: `
enum TokenTypeEnum {
    Native,
    Smart,
    Voucher
}
struct TokenType {
    TokenTypeEnum tokenType;
    string denom;           
    address contractAddress; 
}
`
}
]} />

| **Field**         | **Type**           | **Description**                                      |
|-------------------|--------------------|------------------------------------------------------|
| `tokenType`       | `TokenTypeEnum`    | The type of token: Native, Smart, or Voucher.        |
| `denom`           | `string`           | The denomination (only used for native tokens).      |
| `contractAddress` | `address`          | The ERC20 contract address (only used for smart tokens). |



### TokenWithDenomAndAmount

Used when providing liquidity or other functions that require a token, amount, and type.

<Tabs tabs={[
{
id: 'solidity-example',
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

| **Field**     | **Type**     | **Description**                             |
|---------------|--------------|---------------------------------------------|
| `token`       | `string`     | The token ID/name.                          |
| `amount`      | `uint256`    | Amount of the token.                        |
| `token_type`  | [`TokenType`](#tokentype)  | Whether the token is native, smart-based, or voucher.|


### Pair

Token pair consisting of two token IDs.

<Tabs tabs={[
{
id: 'solidity-example',
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

| Field     | Type     | Description                          |
|-----------|----------|--------------------------------------|
| `token_1` | `string` | ID of the first token in the pair.   |
| `token_2` | `string` | ID of the second token in the pair.  |

---

### CrossChainUser

Represents a user address on a different blockchain.

<Tabs tabs={[
{
id: 'solidity-example',
label: 'Solidity',
language: 'solidity',
content: `
struct CrossChainUser {
    string chain_uid;
    string address;
}
`
}
]} />

| Field       | Type     | Description                            |
|-------------|----------|----------------------------------------|
| `chain_uid` | `string` | Unique identifier of the target chain. |
| `address`   | `string` | The user’s address on that chain.      |

---

### CrossChainUserWithLimit

An extension of `CrossChainUser` that adds an optional withdrawal limit, refund fallback, and optional message forwarding.

<Tabs tabs={[
{
id: 'solidity-example',
label: 'Solidity',
language: 'solidity',
content: `f
struct CrossChainUserWithLimit {
    CrossChainUser user;
    uint256 limit;
    TokenType preferred_denom;
    string refund_address;
    EuclidReceive forwarding_message;
}

 struct EuclidReceive {
     //Encoded message to be executed on the destination
    bytes data;
    // Optional metadata to log with the transaction
    string meta;
    }
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "user": {
    "chain_uid": "chainA",
    "address": "cosmo1..."
  },
  "limit": "500",
  "preferred_denom": {
    "native": {
      "denom": "uusdc"
    }
  },
  "refund_address": "cosmo1...",
  "forwarding_message": {
    "data": "0xabcdef123456...", 
    "meta": "callback=deposit"
  }
}
`
}
]} />

| Field                | Type            | Description                                                                 |
|---------------------|-----------------|-----------------------------------------------------------------------------|
| `user`              | [`CrossChainUser`](#crosschainuser)| The destination user + chain.                                               |
| `limit`             | `uint256`       | An optional limit to the amount of asset to be received by the user address. Will take the maximum amount if not specified.                              |
| `preferred_denom`   | [`TokenType`](#tokentype)     | The user's preferred token type to receive.                                           |
| `refund_address`    | `string`        | An optional address where refunds should be sent in case the transaction fails. Defaults to the sender.                            |
| `forwarding_message`| `EuclidReceive` | Optional message to execute on destination.                           |


### Pagination

Used in query messages to paginate responses.

<Tabs tabs={[
{
id: 'solidity-example',
label: 'Solidity',
language: 'solidity',
content: `
struct Pagination {
    uint256 min;
    uint256 max;
    uint64 skip;
    uint64 limit;
}
`
}
]} />

| Field     | Type     | Description                                      |
|-----------|----------|--------------------------------------------------|
| `min`     | `uint256`| Lower bound filter (inclusive).                  |
| `max`     | `uint256`| Upper bound filter (inclusive).                  |
| `skip`    | `uint64` | How many records to skip.                        |
| `limit`   | `uint64` | Max number of results to return.                 |
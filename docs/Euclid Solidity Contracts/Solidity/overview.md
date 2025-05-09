---
sidebar_position: 1
description: "Learn about Euclid's Solidity Smart Contract Set"
---

import Tabs from '@site/src/components/Tabs';

# Overview

In the [Architecture Overview](../../Architecture%20Overview/General%20Overview.md), we explored the core components that make up the Euclid Unified Liquidity layer. This section covers the Solidity (EVM) smart contracts that power Euclid on EVM-compatible chains.

Since the Factory smart contract is the only entry point for users/projects to interact with the Euclid layer, we will be providing a breakdown of the execute messages as well as the queries. For the rest of the contracts, no messages can be called directly on them so we are only interested in the available queries.


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
    string token;        
    TokenType token_type; 
}
`
}
]} />

| **Field**     | **Type**     | **Description**                                                   |
|---------------|--------------|-------------------------------------------------------------------|
| `token`       | `string`     | The token Id for the token (e.g., `"usdc"`, `"weth"`, `"dai"`). |
| `token_type`  | [`TokenType`](#tokentype) | The token's type (native, smart, or voucher).           |

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

Specifies a token pair, their denoms, and an amount for each. Used when adding liquidity to a pool.

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


#### TokenWithDenomAndAmount
| **Field**       | **Type**       | **Description**                                              |
|-----------------|----------------|--------------------------------------------------------------|
| `token`         | `string`       | The internal token ID (e.g., `"usdc"`, `"eth"`).             |
| `amount`        | `uint256`      | The amount of the token being added to the pool.             |
| `token_type`    | [`TokenType`](#tokentype) | Specifies if the token is native, smart contract, or voucher. |

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
content: `
struct CrossChainUserWithLimit {
    CrossChainUser user;
    Limit limit;
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

struct Limit {
    LimitType limitType;
    uint256 value;
}

    enum LimitType {
    LessThanOrEqual,
    Equal,
    GreaterThanOrEqual
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
    "chain_uid": "amoy",
    "address": "0x123abc..."
  },
  "limit": {
    "limitType": "LessThanOrEqual",
    "value": "1000000"
  },
  "preferred_denom": {
    "native": {
      "denom": "usdc"
    }
  },
  "refund_address": "0x123abc...",
  "forwarding_message": {
    "data": "0xabcdef123456...",
    "meta": "some-meta"
  }
}
`
}
]} />

| **Field**              | **Type**                            | **Description**                                                                 |
|------------------------|-------------------------------------|---------------------------------------------------------------------------------|
| `user`                 | [`CrossChainUser`](#crosschainuser) | The destination user and their chain UID.                                       |
| `limit`                | `Limit`                   | Optional constraint on how much to release to the user.                         |
| `preferred_denom`      | [`TokenType`](#tokentype)           | Preferred token format/type for receiving assets (native, smart, or voucher).             |
| `refund_address`       | `string`                            | Optional refund address if transaction fails. Defaults to sender if omitted.    |
| `forwarding_message`   | `EuclidReceive`  | Optional message to be executed on the receiver's side post-transfer.           |

#### `LimitType`

Defines how much a cross-chain recipient is allowed or required to receive during fund distribution. This enum is used inside the `limit` field of a `CrossChainUserWithLimit`.

- `LessThanOrEqual`: This is the most flexible option. It allows the recipient to receive up to the specified amount, but not more. If the total available is less than the limit, the contract will still send whatever it can. This is useful when distributing across multiple recipients. For example, if two addresses both have a limit of 1000 and 1500 is available, firt one will receive 1000, and the other 500.

- `Equal`: This enforces that the recipient must receive exactly the specified amount. If that exact amount isn’t available, the transaction will fail. This is used when an exact value is required and partial delivery is not acceptable.

- `GreaterThanOrEqual`: This option guarantees that the recipient receives at least the specified amount. If the amount available is less than the specified minimum, the transaction fails. It’s useful for recipients that need a minimum amount to trigger a downstream action (like a forwarding message). Typically, this is used on the last or only recipient in the list.

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
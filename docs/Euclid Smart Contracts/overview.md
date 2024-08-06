---
sidebar_position: 1
description: "Learn about Euclid's Smart Contract Set"
---
import Tabs from '@site/src/components/Tabs';

# Overview

In the [Architecture Overview](../Architecture%20Overview/General%20Overview.md), we took a look at the different components that make up the Euclid Unified Liquidity layer. In this section, we will be looking at each of the Euclid smart contracts and their respective messages. 

Since the Factory smart contract is the only entry point for users/projects to interact with the Euclid layer, we will be providing a breakdown of the execute messages as well as the queries. For the rest of the contracts, no messages can be called directly on them so we are only interested in the available queries.


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
      "token": "token-1-id",
      "token_type": {
        "Native": {
          "denom": "native-denom-1"
        }
      }
    },
    "token_2": {
      "token": "token-2-id",
      "token_type": {
        "Native": {
          "denom": "native-denom-2"
        }
      }
    }
  }
}
`
}
]} />

| Field    | Description                          |
|----------|--------------------------------------|
| `token_1`| Information about the first token.   |
| `token_2`| Information about the second token.  |

### TokenWithDenom
Specifies information on one token. The name of the token and type is specified.

```rust
pub struct TokenWithDenom {
    pub token: Token,
    pub token_type: TokenType,
}

```
| Field        | Description                          |
|--------------|--------------------------------------|
| `token`      | The name of the token.        |
| `token_type` | Type of the token (native or smart). |

### Token
```rust
pub struct Token(String);
```

### TokenType
Whether the token in native or CW20.
```rust
pub enum TokenType {
    Native { denom: String },
    Smart { contract_address: String },
}
```
| Variant      | Fields                    | Description                         |
|--------------|---------------------------|-------------------------------------|
| `Native`     | `denom: String`           | Native token with a denomination.   |
| `Smart`      | `contract_address: String`| Smart contract token with contract address.  |


### Pair
The token Id for each token in a token pair.
```rust
pub struct Pair {
    pub token_1: Token,
    pub token_2: Token,
}
```
| **Name**   | **Type** | **Description**                |
|------------|----------|--------------------------------|
| **token_1**| [`Token`](#token)  | Id of the first token in the pair. |
| **token_2**| [`Token`](#token)  | Id of the second token in the pair.|

### CrossChainUserWithLimit

Struct that defines a user address and limit on a specified chain. Used to define the amount of funds an address on a specific chain should receive.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub struct CrossChainUserWithLimit {
    pub user: CrossChainUser,
    pub limit: Option<Uint128>,
}

`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `

"cross_chain_addresses":{
        "user": {
              "chain_uid": "chainA",
              "address": "comso1..."
                },
        "limit": "500"
    }
`
}

]} />

| Field       | Type                            | Description                                                            |
|-------------|---------------------------------|------------------------------------------------------------------------|
| `user`      | [`CrossChainUser`](#crosschainuser) | Information on the cross chain user including the address and chain UID.          |
| `limit`     | `Option<Uint128>`               | An optional limit to the amount of asset to be received by the user address. Will take the maximum amount if not specified. |

### CrossChainUser

The chain UID and address of the user.

```rust
pub struct CrossChainUser {
    pub chain_uid: ChainUid,
    pub address: String,
}


pub struct ChainUid(String);
```

| Field       | Type                | Description                            |
|-------------|---------------------|----------------------------------------|
| `chain_uid` | `ChainUid` | The unique identifier of the chain.    |
| `address`   | `String`            | The address of the user on the chain.  |
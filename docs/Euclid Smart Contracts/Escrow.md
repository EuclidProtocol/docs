---
sidebar_position: 3
description: "The Escrow Smart Contract"
---
import Tabs from '@site/src/components/Tabs';

## Query Messages 
:::note
We will only go through the queries for this contract, as users are not allowed to execute any messages on the Escrow contract.
:::
List of queries that can be performed on the VLP contract.

### TokenId
Queries the token Id of the token being held in the escrow.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
    #[returns(TokenIdResponse)]
    TokenId {},
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{"token_id":{}}
`
}
]} />

The query returns the following response:

```rust
pub struct TokenIdResponse {
    pub token_id: String,
}
```
| Name          | Description                       |
|---------------|-----------------------------------|
| `token_id`       | The unique Id for the token type held in the escrow.|

### TokenAllowed

Checks if the specified token is allowed to be stored in this escrow.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
    #[returns(AllowedTokenResponse)]
    TokenAllowed { token: TokenInfo },
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
JSON Example: 
{
  "token_allowed": {
    "token": {
      "token": {
        "id": "unique_token_id"
      },
      "token_type": {
        "native": {
          "denom": "native_denom"
        }
      }
    }
  }
}
`
}
]} />
&nbsp;

***TokenInfo***

 Struct holding information about a token, including the token Id and the type.

 ```rust
 pub struct TokenInfo {
    token: Token,
    token_type: TokenType,
}
pub struct Token {
    /// Unique token Id.
    pub id: String,
}

pub enum TokenType {
    Native { denom: String },
    Smart { contract_address: String },
}
```
The query returns the following response:

```rust

pub struct AllowedTokenResponse {
    pub allowed: bool,
}
```
| Name          | Description                       |
|---------------|-----------------------------------|
| `allowed`       | Set to true if the specified token is allowed in this escrow and false otherwise. |
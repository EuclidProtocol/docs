---
sidebar_position: 3
description: "The Escrow Smart Contract"
---
import Tabs from '@site/src/components/Tabs';

## Query Messages 
:::note
We will only go through the queries for this contract, as users are not allowed to execute any messages on the Escrow contract directly.
:::
List of queries that can be performed on the Escrow contract.

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
| Name          | Type |Description                       |
|---------------|-----------------------------------|-------|
| `token_id`       | String| The unique Id for the token type held in the escrow.|

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
    TokenAllowed { denom: TokenType },
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
    "denom": {
      "native": {
        "denom": "native-denom"
      }
    }
  }
}
`
}
]} />
&nbsp;

| **Name** | **Type**      | **Description**                   |
|----------|---------------|-----------------------------------|
| `denom`  | [`TokenType`](../Euclid%20Smart%20Contracts/overview#tokentype)   | The type of token. Returns the denom for native and CW20 contract address for CW20 token.   |

The query returns the following response:

```rust

pub struct AllowedTokenResponse {
    pub allowed: bool,
}
```
| Name          | Description                       |
|---------------|-----------------------------------|
| `allowed`       | Set to true if the specified token is allowed in this escrow and false otherwise. |

### AllowedDenoms
Queries all the tokens allowed to be stored in the escrow.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
     #[returns(AllowedDenomsResponse)]
    AllowedDenoms {},
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
  "allowed_denoms": {}
}
`
}
]} />

The query returns the following response:

```rust
pub struct AllowedDenomsResponse {
    pub denoms: Vec<TokenType>,
}
```
| **Name** | **Type**            | **Description**                              |
|----------|---------------------|----------------------------------------------|
| `denoms` | [`Vec<TokenType>`](../Euclid%20Smart%20Contracts/overview#tokentype)    | A list of allowed token types . |
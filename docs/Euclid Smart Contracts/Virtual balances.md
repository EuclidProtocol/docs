---
sidebar_position: 3
description: "The Virtual Balance Smart Contract"
---
import Tabs from '@site/src/components/Tabs';

## Query Messages 
:::note
We will only go through the queries for this contract, as users are not allowed to execute any messages on the Virtual Balance contract directly.
:::
List of queries that can be performed on the VLP contract.

### GetState
Queries the state returning the address of the router and admin of the contract.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
    #[returns(GetStateResponse)]
    GetState {},
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{"get_state"{}}
`
}
]} />

The query returns the following response:

```rust
#[cw_serde]
pub struct GetStateResponse {
    pub state: State,
}
pub struct State {
    pub router: String,
    pub admin: Addr,
}
```

| **Name** | **Type**  | **Description**                                                                     |
|----------|-----------|-------------------------------------------------------------------------------------|
| `router` | `String`  | The contract address of the router that relays to and from this contract.            |
| `admin`  | `Addr`    | The contract address of the admin of the contract.                                   |

### GetBalance 
Queries the balance of the specified user on the specified chain for the specified token.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
 #[returns(GetBalanceResponse)]
 GetBalance { balance_key: BalanceKey },
}

pub struct BalanceKey {
    pub cross_chain_user: CrossChainUser,
    pub token_id: TokenId,
}

pub struct CrossChainUser {
    pub chain_uid: ChainUid,
    pub address: String,
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "get_balance": {
    "balance_key": {
      "cross_chain_user": {
        "chain_uid": "chainC",
        "address": "comso1..."
      },
      "token_id": "token-id"
    }
  }
}
`
}
]} />

| **Name**       | **Type**         | **Description**                              |
|----------------|------------------|----------------------------------------------|
| `balance_key`  | `BalanceKey`     | The key used to get the balance.             |

BalanceKey:

| **Name**            | **Type**          | **Description**   |
|---------------------|-------------------|-----------------------------------------------------------|
| `cross_chain_user`  | `CrossChainUser`  | The user on the specified chain.                          |
| `token_id`          | `TokenId`         | The identifier of the token.                              |



The query returns the following response:

```rust 
pub struct GetBalanceResponse {
    pub amount: Uint128,
}
```
| Name          | Description                       |
|---------------|-----------------------------------|
| `amount`       | The amount of tokens in the specified user's balance. |

### GetUserBalances

Queries all the balances for the specified user on the specified chain.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
    #[returns(GetUserBalancesResponse)]
    GetUserBalances { user: CrossChainUser },
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "get_user_balances": {
    "user": {
      "chain_uid": "chainA",
      "address": "nibi1..."
    }
  }
}
`
}
]} />

| Name          | Description                       |
|---------------|-----------------------------------|
| `chain_uid`       | The unique Id of the chain we want to get the balances on.|
| `address`       | Address of the user we are getting the balances for.|

The query returns a vector of **GetBalanceResponse** with each belonging to the balance of a token.
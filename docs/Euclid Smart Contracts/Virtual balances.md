---
sidebar_position: 3
description: "The Virtual Balance Smart Contract"
---
import Tabs from '@site/src/components/Tabs';

## Query Messages 
:::note
We will only go through the queries for this contract, as users are not allowed to execute any messages on the Virtual Balance contract.
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

| Name          | Description                       |
|---------------|-----------------------------------|
| `router`       | The contract address of the router that relays to and from this contract.|
| `admin`       | The contract address of the admin of the contract.|

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
    pub chain_id: ChainId,
    pub address: AnyChainAddress,
    pub token_id: TokenId,
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "get_balance":{
    "balance_key":{
    "chain_id": "chain_id_value",
    "address": "cosmo1...",
    "token_id": {
      "id": "token_id_value"
    }
    }
  }
}
`
}
]} />

| Name          | Description                       |
|---------------|-----------------------------------|
| `chain_id`       | The unique Id of the chain we want to get the balance on. Specified as a string.|
| `address`       | The address of the user to query the balance for. Specified as a string.|
| `token_id`       | The Id of the token to get the balance of.|

The query returns the following response:

```rust 
pub struct GetBalanceResponse {
    pub amount: Uint128,
    pub balance_key: BalanceKey,
}
```
| Name          | Description                       |
|---------------|-----------------------------------|
| `amount`       | The amount of tokens in the specified user's balance. |
| `balance_key`       | The chain Id, address of user, and token_id.|

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
    GetUserBalances { chain_id: String, address: String },
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `

{
    "get_user_balances":{
    "chain_id":"chain_id_value",
    "address":"cosmos1..."
    }
}
`
}
]} />

| Name          | Description                       |
|---------------|-----------------------------------|
| `chain_id`       | The unique Id of the chain we want to get the balances on.|
| `address`       | Address of the user we are getting the balances for.|

The query returns a vector of **GetBalanceResponse** with each belonging to the balance of a token.
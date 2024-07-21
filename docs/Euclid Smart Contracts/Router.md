---
sidebar_position: 5
description: "The Virtual Balance Smart Contract"
---
import Tabs from '@site/src/components/Tabs';

## Query Messages 
:::note
We will only go through the queries for this contract, as users are not allowed to execute any messages on the Router contract directly.
:::

List of queries that can be performed on the Router contract.

### GetState
Quries the state of the contract.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
    #[returns(StateResponse)]
    GetState {},
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `

{"get_state":{}}
`
}
]} />

The query returns the following response:

```rust
pub struct StateResponse {
    pub admin: String,
    pub vlp_code_id: u64,
    pub vcoin_address: Option<Addr>,
}
```
| **Name**         | **Type**          | **Description**                                                                                 |
|------------------|-------------------|-------------------------------------------------------------------------------------------------|
| **admin**        | `String`          | The admin address, which is the only address allowed to call messages on the contract.          |
| **vlp_code_id**  | `u64`             | The code_id used to instantiate new VLP contracts on the hub chain.                             |
| **vcoin_address**| `Option<Addr>`    | The address of the Virtual Balance contract used by the router.                                 |


### GetChain
Queries information about the specified chain.
<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
    #[returns(ChainResponse)]
    GetChain { chain_uid: ChainUid },
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `

{"get_chain":{"chain_uid":"chainA"}}
`
}
]} />

| **Name**       | String| **Description**                                 |
|----------------|-------------------------------------------------|
| **chain_uid**       |ChainUid| The unique Id of the chain to get info for.|


The query returns the following response:

```rust
pub struct ChainResponse {
    pub chain: Chain,
    pub chain_uid: ChainUid,
}

pub struct Chain {
    pub factory_chain_id: String,
    pub factory: String,
    pub from_hub_channel: String,
    pub from_factory_channel: String,
}
```
| **Name**              | **Type**   | **Description**                                                             |
|-----------------------|------------|-----------------------------------------------------------------------------|
| **factory_chain_id**  | `String`   | The chain Id of the factory.                                                |
| **factory**           | `String`   | The contract address of the factory contract on the specified chain.         |
| **from_hub_channel**  | `String`   | The channel Id that connects the hub to the router.                         |
| **from_factory_channel** | `String` | The channel Id that connects the factory to the router.                     |



### GetAllChains
Queries information about all the chains connected to the router.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `

pub enum QueryMsg {
#[returns(AllChainResponse)]
GetAllChains {},
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{"get_all_chains":{}}
`
}
]} />

The query returns a vector of **ChainResponse** each containing information about one chain. 

### GetVlp
Queries the VLP address for the specified token pair.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
pub enum QueryMsg {
   #[returns(VlpResponse)]
    GetVlp { pair: Pair },
}
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "get_vlp": {
    "pair": {
      "token_1": "atom",
      "token_2": "osmo"
    }
  }
}
`
}
]} />

| **Name**  | **Type** | **Description**                      |
|-----------|----------|--------------------------------------|
| `pair`    | [`Pair`](../Euclid%20Smart%20Contracts/overview#pair)   | The pair of tokens for the query.    |

The query returns the following response:

```rust
pub struct VlpResponse {
    pub vlp: String,
    pub token_1: Token,
    pub token_2: Token,
}
```
| **Name**       | **Description**                                 |
|----------------|-------------------------------------------------|
| **vlp**| The contract address of the VLP holding the token pair.|
| **token_1** | The Id of the first token in the VLP to fetch.|
| **token_2**| The Id of the second token in the VLP to fetch.|


### GetAllVlps
Queries all the VLP addresses for all token pairs.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content: `
  #[returns(AllVlpResponse)]
    GetAllVlps {
        start: Option<(Token, Token)>,
        end: Option<(Token, Token)>,
        skip: Option<usize>,
        limit: Option<usize>,
    },
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{"get_all_vlps":{}}
`
}
]} />

| **Name**  | **Type**                       | **Description**                                              |
|-----------|--------------------------------|--------------------------------------------------------------|
| `start`   | `Option<(Token, Token)>`       | Optional start pair of tokens for pagination.                |
| `end`     | `Option<(Token, Token)>`       | Optional end pair of tokens for pagination.                  |
| `skip`    | `Option<usize>`                | Optional number of pairs to skip. Defaults to 0.                            |
| `limit`   | `Option<usize>`                | Optional limit on the number of pairs to return. Limit defaults to 10.            |

The query returns a vector of **VlpResponse** each containing information about on VLP.

### SimulateSwap
Simulates a swap based on the specified info.

<Tabs tabs={[
{
id: 'rust-example',
label: 'Rust',
language: 'rust',
content:`
   #[returns(SimulateSwapResponse)]
    SimulateSwap(QuerySimulateSwap),

    pub struct QuerySimulateSwap {
    pub asset_in: Token,
    pub amount_in: Uint128,
    pub asset_out: Token,
    pub min_amount_out: Uint128,
    pub swaps: Vec<NextSwapPair>,
}

`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `

{
  "simulate_swap": {
    "asset_in": "tokenA",
    "amount_in": "1000000",
    "asset_out": "tokenB",
    "min_amount_out": "950000",
    "swaps": [
      {
        "token_in": "tokenA",
        "token_out": "tokenC"
      },
      {
        "token_in": "tokenC",
        "token_out": "tokenB"
      }
    ]
  }
}
`
}
]} />

| **Name**         | **Type**            | **Description**                                             |
|------------------|---------------------|-------------------------------------------------------------|
| `asset_in`       | [`Token`](../Euclid%20Smart%20Contracts/overview#token)             | The identifier for the input asset token.                   |
| `amount_in`      | `Uint128`           | The amount of the input asset token.                        |
| `asset_out`      | `Token`             | The identifier for the output asset token.                  |
| `min_amount_out` | `Uint128`           | The minimum amount of the output asset token.               |
| `swaps`          | `Vec<NextSwapPair>` | A list of swap pairs needed to complete the swap.           |

With the following struct:

```rust

/// The next token pair in the swap route
pub struct NextSwapPair {
    pub token_in: Token,
    pub token_out: Token,
}
```
| **Name**   | **Type**  | **Description**                                   |
|------------|-----------|---------------------------------------------------|
| `token_in` |[`Token`](../Euclid%20Smart%20Contracts/overview#token)   | The token Id for the input token in the swap.   |
| `token_out`| [`Token`](../Euclid%20Smart%20Contracts/overview#token)   | The token Id for the output token in the swap.  |

The query returns the following response:
```rust
pub struct SimulateSwapResponse {
    pub amount_out: Uint128,
    pub asset_out: Token,
}
```
| **Name**     | **Type**  | **Description**                               |
|--------------|-----------|-----------------------------------------------|
| `amount_out` | `Uint128` | The amount of the output asset.               |
| `asset_out`  | [`Token`](../Euclid%20Smart%20Contracts/overview#token)   | The identifier for the output asset token.    |
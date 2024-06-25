---
sidebar_position: 5
description: "The Virtual Balance Smart Contract"
---

## Query Messages 
:::note
We will only go through the queries for this contract as users are not allowed to execute any messages on the Router contract.
:::

List of queries that can be performed on the Router contract.

### GetState
Quries the state of the contract.

```rust 
pub enum QueryMsg {
    #[returns(StateResponse)]
    GetState {},
}
```
JSON Example:

```JSON
{"get_state":{}}
```

The query returns the following response:

```rust
pub struct StateResponse {
    pub admin: String,
    pub vlp_code_id: u64,
    pub vcoin_address: Option<Addr>,
}
```
| **Name**       | **Description**                                 |
|----------------|-------------------------------------------------|
| **admin**       | The admin address which is the only address allowed to call messages on the contract.|
| **vlp_code_id**| The code_id used to instantiate new vlp contracts on the hub chain.|
| **vcoin_address**| The address of the Virtual Balance contract used by the router.     |


### GetChain
Queries information about the specified chain.

```rust 
pub enum QueryMsg {
    #[returns(ChainResponse)]
    GetChain { chain_id: String },
}
```
| **Name**       | **Description**                                 |
|----------------|-------------------------------------------------|
| **chain_id**       | The unique Id of the chain to get info for.|

JSON Example:
```JSON
{"get_chain"{"chain_id":"chain-1"}}
```

The query returns the following response:
```rust
pub struct ChainResponse {
    pub chain: Chain,
}

pub struct Chain {
    pub factory_chain_id: String,
    pub factory: String,
    pub from_hub_channel: String,
    pub from_factory_channel: String,
}
```
| **Name**       | **Description**                                 |
|----------------|-------------------------------------------------|
| **factory_chain_id**       | The chain Id of the factory. |
| **factory**| The contract address of the factory contract on the specified chain.|
| **from_hub_channel**| The channel Id that connects the hub to the router.     |
| **from_factory_channel**| The channel Id that connnects the factory to the router.    |



### GetAllChains
Queries information about all the chains connected to the router.

```rust 
pub enum QueryMsg {
#[returns(AllChainResponse)]
    GetAllChains {},
}
```
JSON Example:
```JSON
{"get_all_chains"{}}
```
The query returns a vector of **ChainResponse** each containing information about one chain. 

### GetVlp
```rust 
pub enum QueryMsg {
   #[returns(VlpResponse)]
    GetVlp { token_1: Token, token_2: Token },
}
```
| **Name**       | **Description**                                 |
|----------------|-------------------------------------------------|
| **token_1**       | The Id of the first token in the VLP to fetch.|
| **token_2**| The Id of the second token in the VLP to fetch.|

JSON Example:
```JSON
{
  "get_vlp": {
    "token_1": {
      "id": "token_1_id_value"
    },
    "token_2": {
      "id": "token_2_id_value"
    }
  }
}
```

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

```rust 
pub enum QueryMsg {
  #[returns(AllVlpResponse)]
    GetAllVlps {},
}
```
JSON Example:
```JSON
{"get_all_vlps":{}}
```
The query returns a vector of **VlpResponse** each containing information about on VLP.

### SimulateSwap
Simulates a specified swap.
```rust 
pub enum QueryMsg {
    #[returns(SimulateSwapResponse)]
    SimulateSwap(QuerySimulateSwap),

    pub struct QuerySimulateSwap {
    pub factory_chain: String,
    pub to_address: String,
    pub to_chain_id: String,
    pub asset_in: Token,
    pub amount_in: Uint128,
    pub min_amount_out: Uint128,
    pub swaps: Vec<NextSwap>,
}
}
```
| Name             | Description                                       |
|------------------|---------------------------------------------------|
| `factory_chain`  | The address of the factory contract.          |
| `to_address`     | The address to send the swapped assets to.        |
| `to_chain_id`    | The chain Id where the assets will be sent.       |
| `asset_in`       | The token being swapped.                          |
| `amount_in`      | The amount of the asset being swapped.            |
| `min_amount_out` | The minimum amount of the output asset expected for the swap to be considered a success.  |
| `swaps`          | A vector of addresses of VLPs that the swap will go through. Used in case of multi-hop swaps.                      |


JSON Example:

```JSON
{
  "simulate_swap": {
    "factory_chain": "cosmo1...",
    "to_address": "cosmo1...",
    "to_chain_id": "destination_chain_id_value",
    "asset_in": {
      "id": "input_token_id_value"
    },
    "amount_in": "1000",
    "min_amount_out": "900",
    "swaps": [
      {
        "vlp_address": "address1"
      },
      {
        "vlp_address": "address2"
      }
    ]
  }
}
```
The query returns the following response:

```rust
pub struct SimulateSwapResponse {
    pub amount_out: Uint128,
    pub asset_out: Token,
    pub out_chains: Vec<SwapOutChain>,

    pub struct SwapOutChain {
    pub chain: Chain,
    // amount of tokens releasd on the above chain.
    pub amount: Uint128,
}

}
```
| Name             | Description                                       |
|------------------|---------------------------------------------------|
| `amount_out`  | The amount of tokens that the user will recieve         |
| `asset_out`     | The token Id of the token that will be received by the user after the swap. |
| `out_chains`    | A vector of chains and amounts where the tokens will be released.  |
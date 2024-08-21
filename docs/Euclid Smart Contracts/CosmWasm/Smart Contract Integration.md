---
sidebar_position: 6
description: "The Factory Smart Contract"
---


# Smart Contract Integration

This guide aims to help developers integrate their smart contracts with the existing Euclid contract set. Whether you are building on top of existing functionalities or interacting with the contracts, this guide will provide you with the necessary knowledge and examples to get started.

## Executing on a Euclid Contract

Each contract has a set of execute messages. These messages are called on a contract to change its state. We will be looking at the process of calling an execute message on a Euclid smart contract using another contract. 

CosmWasm provides the basic structure needed to perform these calls: 

```rust
pub enum WasmMsg {
    Execute {
        contract_addr: String,
        #[derivative(Debug(format_with = "binary_to_string"))]
        msg: Binary,
        funds: Vec<Coin>,
    },
}
```
| Name     | Description                                                             |
|----------------|-------------------------------------------------------------------------|
| contract_addr  | The address of the contract you wish to call.                           |
| msg            | The JSON-encoded ExecuteMsg struct (as raw Binary).                     |
| funds          | The coins you wish to transfer to the contract as part of the call.     |

### Example

Let us assume a contract A is looking to call swaps on the Factory contract. The factory execute message is the following:

```rust
ExecuteSwapRequest {
        asset_in: TokenInfo,
        asset_out: TokenInfo,
        amount_in: Uint128,
        min_amount_out: Uint128,
        timeout: Option<u64>,
        swaps: Vec<NextSwap>,
    },
```

To be able to call this message from contract A, we need a duplicate function for it in A's execute messages.This way, the same fields are provided in contract A and then sent to the Factory to perform the swap. 

In contract A:

```rust
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    mut deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {

        ExecuteMsg::ExecuteSwapRequest {
            asset_in,
            asset_out,
            amount_in,
            min_amount_out,
            timeout,
            swaps,
        } => execute_swap_request(
            &mut deps,
            info,
            env,
            asset_in,
            asset_out,
            amount_in,
            min_amount_out,
            swaps,
            None,
            timeout,
        ),
    }

```
Then in the function call, we need to do the following:

```rust 

//Construct the msg to be passed to the Factory
let swap_msg = to_binary(&ExecuteSwapRequest{
    asset_in,
    asset_out,
    amount_in,
    min_amount_out,
    timeout,
    swaps,
})?;

//Construct the Wasm Execute message
let msg = WasmMsg::Execute {
    contract_addr: factory_addr.to_string(),
    msg: swap_msg,
    funds: info.funds.clone(),
}

//Return the WasmMsg in the Response
Ok(Response::new()
    .add_attribute("action", "swap_from_factory")
    .add_message(msg))
```

## Querying a Euclid Contract

The logic of querying a Euclid contract from another smart contract is similar to execution, but here we use WasmQuery:

```rust 
pub enum WasmQuery {
    /// Return value is whatever the contract returns (caller should know), wrapped in a ContractResult that is JSON encoded.
    Smart {
        contract_addr: String,
        msg: Binary,
    },
```

| Name     | Description                                             |
|----------------|---------------------------------------------------------|
| contract_addr  | The address of the contract you wish to query.          |
| msg            | The JSON-encoded QueryMsg struct (as raw Binary).       |

### Example

Let us assume a contract A is looking to call the following query from the Router contract to get the chain for the provided chain Id:

```rust
pub enum QueryMsg {
    #[returns(ChainResponse)]
    GetChain { chain_id: String },
}
```

:::note
Here we are assuming contract A is looking to implement this inside its own query. You can also use cross-contract queries to fetch data inside execute messages. 
:::

In contract A:

```rust
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> Result<Binary, ContractError> {
    match msg {
        QueryMsg::QueryChainFromB { chain_id, router_addr } => {
            to_binary(&query_chain_info(deps, chain_id, router_addr)?)
        }
    }
}
```


Then, in our function call:

```rust
pub fn query_chain_info(
    deps: Deps,
    chain_id: String,
    router_addr: String,
) -> StdResult<ChainResponse> {
    // Construct the msg to be passed to the Router
    let query_msg = to_binary(&QueryMsgB::GetChain { chain_id })?;

    // Construct the WasmQuery message
    let wasm_query = WasmQuery::Smart {
        contract_addr: router_addr,
        msg: query_msg,
    };
    // Wrap the WasmQuery::Smart message in a QueryRequest::Wasm
    let query_request = QueryRequest::Wasm(wasm_query);

    // Send the query request using the querier and deserialize the response into a ChainResponse struct
    let response: ChainResponse = deps.querier.query(&query_request)?;

    Ok(response)
}
```
---
sidebar_position: 2
---

# Swap
To perform a swap, a swap transaction needs to be generated by calling the `Swap` endpoint in the Rest API and then broadcast to a chain. 

The [swap](../REST/Transactions/Swap.md) parameters are the following:

```bash
asset_in
asset_out
amount_in
min_amount_out
timeout
swaps
cross_chain_addresses
partner_fee
```
We will go through all the steps needed to get each of the parameters.

## Steps

The following steps describe the workflow to perform a swap using the Euclid Layer:

### 1. Get all available tokens

 The first step will be getting all the available tokens and selecting the input and output tokens. This ensures that the tokens involved in the swap are supported by the Euclid Layer. This can be done using the [`All Tokens`](../GQL/Router/All%20Tokens.md) query:

```graphql
query Router {
  router {
    all_tokens {
      tokens
    }
  }
}
```
This will return a response similar to the following:

```JSON
{
  "data": {
    "router": {
      "all_tokens": {
        "tokens": [
          "INJC",
          "INJD",
          "INJU",
          "SP500",
          "aura",
          "coin50",
          "const",
          "euclid",
          "inj",
          "nibi",
          "ntrn",
          "sp500",
          "stars",
          "testcore",
          "usdt"
        ]
      }
    }
  }
}
```
Once fetched, they can be displayed for the user who can select the desired tokens for the swap.

### 2. Get all the chains for `token_in`
Get the chains that have escrows for token in and then select the one to use. This can be done using the [`Escrows`](../GQL/Router/Escrows.md) query:
 :::tip
 - The connected wallet needs to be the same as the selected chain.
 - For the `$token` parameter, use the `token_in` selected in the previous step.
 :::

```graphql
query Escrows($token: String!) {
  router {
    escrows(token: $token) {
      chain_uid
      balance
      chain_id
    }
  }
}
```
Here is a response for a "usdt" token in:
```JSON
{
  "data": {
    "router": {
      "escrows": [
        {
          "chain_uid": "ethereum",
          "balance": "10056388656303",
          "chain_id": "localwasma-1"
        },
        {
          "chain_uid": "nibiru",
          "balance": "20000304703107",
          "chain_id": "localnibirua-1"
        },
        {
          "chain_uid": "osmosis",
          "balance": "20000519999280",
          "chain_id": "localwasma-1"
        }
      ]
    }
  }
}
```
You can then prompt the user to select the chain of their choice. 

### 3. Retrieve the allowed denoms

Check the allowed denoms for the token in. This can be done using the [`Escrow`](../GQL/Factory/Escrow.md) query:
 :::tip
 Use the Chain UID and token Id from previous steps for the chain selected.
 :::
```graphql
query Escrow($chainUid: String!, $tokenId: String) {
  factory(chain_uid: $chainUid) {
    escrow(token_id: $tokenId) {
      escrow_address
      denoms {
        ... on NativeTokenType {
          native {
            denom
          }
        }
        ... on SmartTokenType {
          smart {
            contract_address
          }
        }
      }
    }
  }
}
```
This will return the denom to be used in the swap based on the parameters passed by the user (`usdt` on `ethereum` in this example):
```JSON
{
  "data": {
    "factory": {
      "escrow": {
        "escrow_address": "wasm1hdgaz7707rwfsnm8clj440d4qzj88czvu9fqyv3m8v0z4vkw08fqz98ena",
        "denoms": [
          {
            "native": {
              "denom": "uusdta"
            }
          }
        ]
      }
    }
  }
}
```

### 4. Specify token in amount
Next, we need to select the amount of `token_in` to swap. This would be specified by the user.

### 5. Get swap routes

In many cases, multiple routes can be taken to perform the desired swap. In this step, we will fetch these routes and select the one we want to use. This can be done using the [`Get Routes`](../REST/Routes/Get%20Routes.md) query:
```bash
curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/routes' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "amount_in": "100",
  "token_in": "usdt",
  "token_out": "usdc"
}'
```

Here is a result for `usdt` in and `usdc` out:

```JSON
{
    "paths":[
        {
        "route":["usdt","nibi","eth","usdc"],
        "amount_out":100
        },
        {
        "route":["usdt","usdc"],
        "amount_out":100
        }
            ]
}
```
### 6. Simulate the swap

Now that we have all the parameters required, we can simulate the swap. This can be done using the [`Simulate Swap`](../GQL/Router/Simulate%20Swap.md) query:
 :::tip
 For simulate swap, specify the `min_amount_out` as 1. We are only interested in getting the expected amount out and do not care about slippage here.
 :::

```graphql
query Simulate_swap($assetIn: String!, $amountIn: String!, $assetOut: String!, $minAmountOut: String!, $swaps: [String!]) {
  router {
    simulate_swap(asset_in: $assetIn, amount_in: $amountIn, asset_out: $assetOut, min_amount_out: $minAmountOut, swaps: $swaps) {
      amount_out
      asset_out
    }
  }
}
```
The following parameters are used in the above example:
```JSON
  "assetIn": "usdt",
  "amountIn": "1002",
  "assetOut": "usdc",
  "minAmountOut": "1",
  "swaps": ["usdt","usdc"]
```
The response will return the expected `amount_out` for the swap:
```JSON
{
  "data": {
    "router": {
      "simulate_swap": {
        "amount_out": "1000",
        "asset_out": "usdc"
      }
    }
  }
}
```
### 7. Calculate `min_amount_out` based on slippage tolerance
Using the `amount_out` from the result of the last step, we can set the `min_amount_out` for the actual swap, depending on the slippage amount to be tolerated. The formula is the following:  

$$
\text{min\_amount\_out} = \text{simulated\_amount\_out} \times (1 - \text{\%slippage})
$$

 **Example**

 Assuming simulate swap returned an expected 1000 tokens and you want the slippage to be a maximum of 3%, then `min_amount_out` = 1000 * (1-0.03) = 970. 
 
 :::note
- Setting `min_amount_out` as 1 means that the swap will go through no matter the slippage amount.
- The above defines the maximum amount of slippage that is accepted and not the actual amount that will be used. 
:::
### 8. Generate swap transaction

:::note
- Use the responses we got in all the previous steps for the swap fields.
- For sender address and chain_uid use the ones from the connected chain. In the example below we are using a Keplr wallet.
- You can include a specific `timeout`. Excluding it will take the default of 60 seconds.
- You can include a `partner_fee` if you wish to include a fee for your application.
- The `cross_chain_addresses` are taken as an input from the user. The addresses for different chains can be fetched from the wallet using the chain Id.
:::

We now have everything needed to generate the swap transaction message:

```javascript
 const msg = await REST_AXIOS.post("/execute/swap", {
        amount_in: data.amountIn, // amount of asset in being swapped 
        asset_in: data.assetIn, // the type of asset in
        asset_out: data.assetOut, // the type of asset out
        cross_chain_addresses: data.crossChainAddresses, // the chains and addresses to release asset out
        min_amount_out: data.minAmountOut, // the minimum asset out accepted. Used to specify slippage.
        sender: {
          address: wallet!.bech32Address,
          chain_uid: chain!.chain_uid,
        },
        swaps: data.swaps,
      }).then((res) => res.data as TxResult);
```

### 9. Broadcast the transaction to chain

The final step will be broadcasting this transaction to the chain and signing it with the connected wallet:

```javascript
const tx = await client!.executeMultiple(
        wallet!.bech32Address,
        msg.msgs,
        "auto",
        "Swap"
      );
      return tx;
```


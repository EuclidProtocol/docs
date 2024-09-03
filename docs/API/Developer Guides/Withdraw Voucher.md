---
sidebar_position: 5
---

# Withdraw Voucher
In this example, we will be taking a look at the steps required to withdraw voucher tokens from a user's virtual balance.
The [Withdraw](../REST/Transactions/Withdraw%20Virtual%20Balance.md) parameters are the following:

```bash
token
amount
cross_chain_addresses
timeout
```
We will go through all the steps needed to get each of the parameters.

## Steps

The following steps describe the workflow to successfully withdraw voucher tokens from a user's virtual balance:

### 1. Select the chain to withdraw from

To select the chain to withdraw from, simply let the user connect their wallet address for that chain.

### 2. Select the token to withdraw
Next, we need to let the user select which voucher tokens they want to withdraw. To do this, we need to get all the available virtual balances for the user. We can do this using the [User Balance](../GQL/Virtual%20Balance/User%20Balance.md) query:

:::tip
You need to specify the chain_uid and address of the connected wallet.
:::
```graphql
query Vcoin($user: CrossChainUserInput) {
  vcoin {
    user_balance(user: $user) {
      balances {
        amount
        token_id
      }
    }
  }
}
```

The response will return all the voucher coins types and amounts:

```JSON
{
  "data": {
    "vcoin": {
      "user_balance": {
        "balances": [
          {
            "amount": "14948819981",
            "token_id": "eth"
          },
          {
            "amount": "15051408993",
            "token_id": "nibi"
          },
          {
            "amount": "0",
            "token_id": "pepe"
          },
          {
            "amount": "9960024",
            "token_id": "sol"
          },
          {
            "amount": "52119815540",
            "token_id": "usdc"
          },
          {
            "amount": "6501496",
            "token_id": "usdt"
          }
        ]
      }
    }
  }
}
```
### 3. Select the chain to withdraw to

Now we need to fetch the chains that have escrows containing the token to withdraw. We can use the [Escrows](../GQL/Router/Escrows.md) query:

```graphql
query Router($token: String!) {
  router {
    escrows(token: $token) {
      chain_uid
      balance
      chain_id
    }
  }
}
```

The response will be similar to the following:

```JSON
{
  "data": {
    "router": {
      "escrows": [
        {
          "chain_uid": "ethereum",
          "balance": "10056427356303",
          "chain_id": "localwasma-1"
        },
        {
          "chain_uid": "nibiru",
          "balance": "20000344703107",
          "chain_id": "localnibirua-1"
        },
        {
          "chain_uid": "osmosis",
          "balance": "20001528299054",
          "chain_id": "localwasma-1"
        }
      ]
    }
  }
}
```
The user can then slect the chain they want to redeem the voucher tokens on.

### 4. Specify the amount to withdraw

Prompt the user to select the amount of tokens to withdraw.

### 5. Generate the transaction

:::note
- Use the responses we got in all the previous steps for the fields.
- For sender address and chain_uid use the ones from the connected chain. In the example below, we are using a Keplr wallet.
- The `cross_chain_addresses` are taken as an input from the user. The addresses for different chains can be fetched from the wallet using the chain Id. Specify addresses on chains that have escrows with the required token (step 3).
:::

```javascript

const msg = await REST_AXIOS.post("/execute/vcoin/withdraw", {
        token: data.token, // token to withdraw
        amount: data.amount, //amount to withdraw
        cross_chain_addresses: data.crossChainAddresses, //addresses to withdraw to
        sender: {
          address: wallet!.bech32Address, //wallet address
          chain_uid: chain!.chain_uid,
        },
      }).then((res) => res.data as TxResult);

```

### 6. Broadcast the transaction to chain

The final step will be broadcasting this transaction to the chain and signing it with the connected wallet:

```javascript
 const tx = await client!.executeMultiple(
        wallet!.bech32Address, 
        msg.msgs,
        "auto",
        "Remove Liquidity"
      );
      return tx;
```
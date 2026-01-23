---
sidebar_position: 8
title: "Get Liquidity Provider Position"
description: "Fetch a user's liquidity provider (LP) token balance in a specific pool."
---

import Tabs from '@site/src/components/Tabs';

# Get Liquidity Provider Position

In order to retrieve a user’s position in a liquidity pool (i.e., how much liquidity they've added), we need to:

1. Identify the pool via its VLP address.
2. Fetch the LP token contract associated with that pool.
3. Query the LP token balance for the user.

This process allows your dApp to show users how much liquidity they currently hold in a given pool.


## 1. Get LP Token Address

Each liquidity pool has an associated LP token contract. These LP tokens are minted to users when they add liquidity and represent their share of the pool.

To fetch the LP token contract address for a given pool, use the following query:

:::note
This guide assumes you already know the pool’s `chainUid` and `vlpAddress`. If you only know the token pair, fetch the VLP address first and then the chain:

```graphql
query Router($pair: PairInput) {
  router {
    vlp(pair: $pair) {
      vlp
    }
  }
}
```

With the VLP address in hand, retrieve the chain UID:

```graphql
query All_pools($contract: String) {
  vlp(contract: $contract) {
    all_pools {
      pools {
        chain_uid
      }
    }
  }
}
```

Once you have both values, proceed with the LP token query below.
:::

```graphql
query Factory($chainUid: String!, $vlpAddress: String!) {
  factory(chain_uid: $chainUid) {
    get_LpToken_address(vlp_address: $vlpAddress) {
      token_address
    }
  }
}
```

The response returns the CW20 contract address for the LP token:

```json
{
  "data": {
    "factory": {
      "get_LpToken_address": {
        "token_address": "0x03Ed5843ED3BB20268b5e437CfeFfa571C66b7fA"
      }
    }
  }
}
```

You’ll use this contract address in the next step to fetch the user’s balance.


## 2. Fetch the User’s LP Balance

With the LP token contract in hand, query the user’s LP balance to see how many shares they currently hold.

:::tip
Use the connected wallet address for the `address` field so the balance reflects the active user.
:::

```graphql
query Cw($contract: String!, $chainUid: String!, $address: String!) {
  cw(contract: $contract, chain_uid: $chainUid) {
    balance(address: $address) {
      balance
    }
  }
}
```

The response returns the user’s LP token balance:

```json
{
  "data": {
    "cw": {
      "balance": {
        "balance": "10000019998932"
      }
    }
  }
}
```

Always validate any requested withdrawal or redemption amount against this balance so users cannot withdraw more than they own.


## 3. Derive the Underlying Token Amounts (Optional)

If you want to translate LP shares into the underlying token amounts, compute the user’s share of the pool and apply it to each reserve:

```
user_share = user_lp_balance / total_lp_shares
user_token_A = user_share * pool_reserve_token_A
user_token_B = user_share * pool_reserve_token_B
```

Fetch `total_lp_shares` and the reserves from the pool’s on-chain state. For example:

```graphql
query Vlp($contract: String) {
  vlp(contract: $contract) {
    liquidity {
      token_1_reserve
      token_2_reserve
      total_lp_tokens
    }
  }
}
```

Multiplying the user share by each reserve yields the notional amount of each asset attributable to the user (subject to accrued fees, slippage, or external price changes).

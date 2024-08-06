---
sidebar_position: 4
---

# My Pools

Queries information of the pools created by the specified user.

```graphql
query Chains($userAddress: String!) {
  chains {
    my_pools(user_address: $userAddress) {
      height
      tx_id
      vlp
      pair {
        token_1
        token_2
      }
      liquidity {
        token_1_liquidity
        token_2_liquidity
      }
      user {
        sender
        chain_uid
      }
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Chains($userAddress: String!) {\n  chains {\n    my_pools(user_address: $userAddress) {\n      height\n      tx_id\n      vlp\n      pair {\n        token_1\n        token_2\n      }\n      liquidity {\n        token_1_liquidity\n        token_2_liquidity\n      }\n      user {\n        sender\n        chain_uid\n      }\n    }\n  }\n}","variables":{"userAddress":"wasm14hcxlnwlqtq75ttaxf674vk6mafspg8xv03ktg"}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMIAWAhgJZIDOAFACQy34CCYYeCtt6RAZRR4aAcwCEASiLAAOkiJEolGrRnzFiuAQD6ABwgQANgxb4dFTt179mrPBy49a0uQs2KyCKqLIoNHkQoAB46VGABHgBuRnqRmnrUeOrugUEQANbIOgCM8R4omdkATPlEAL5lRlQ44VQoxG5pioVZSLk61bVg9QRlLUXtxZ01MHUNZZWpmmbJTc2sSGD4-Uoq7WMR04pTHrsV8uUgADQgURQiFABGRjwYIG6yILOO1rRP-E8A7hS0cDkAFjIUGCRiQXyMWBQWAA7ABWFAoCjBABmADYYQCohk0XAKCjaHpRAAOYJRAAMAGYMihRE9DiBykA)


### Return Fields

| Field             | Type                  | Description                                    |
|-------------------|-----------------------|------------------------------------------------|
| height            | Int                   | The block height when the pool was created.                        |
| tx_id             | String                | The transaction ID for the pool creation.                            |
| vlp               | String                | The contract address of the VLP of the pool.                                 |
| pair              | [Pair](../../../Euclid%20Smart%20Contracts/overview#pair)         | The pair of tokens in the pool.                |
| liquidity         | Liquidity| The amount of liquidity available for each token in the pair.             |
| user              | [User](../../../Euclid%20Smart%20Contracts/overview#crosschainuser)         | The user details associated with the pool.     |





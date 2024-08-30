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
    --url 'https://api.euclidprotocol.com/graphql' \
    --data '{"query":"query Pool($userAddress: String!, $chainUid: String) {\n  pool {\n    my_pools(user_address: $userAddress, chain_uid: $chainUid) {\n      height\n      vlp\n      user {\n        sender\n        chain_uid\n      }\n      pair {\n        token_1\n        token_2\n      }\n    }\n  }\n}","variables":{"userAddress":"nibi14hcxlnwlqtq75ttaxf674vk6mafspg8x3ky6ts","chainUid":"nibiru"}}'
```

[Open in Playground](https://api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGICGUKEhAFACRQAWZAlkgKotjpEDKKeNgHMAhABoidAG4AbAA4BBMGDwIAzmp79BSUQEoiwADpIiRAGYUqtJqyQB9GFx4NmbTmAPHTZokIQo9lQA1sj2ZMqqGjSycuGR6pqSsUoqiV4mvr4hYRFpGpm%2BAL6FJUhFIEVAA)


### Return Fields

| Field             | Type                  | Description                                    |
|-------------------|-----------------------|------------------------------------------------|
| height            | Int                   | The block height when the pool was created.                        |
| tx_id             | String                | The transaction ID for the pool creation.                            |
| vlp               | String                | The contract address of the VLP of the pool.                                 |
| pair              | [Pair](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#pair)         | The pair of tokens in the pool.                |
| liquidity         | Liquidity| The amount of liquidity available for each token in the pair.             |
| user              | [User](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#crosschainuser)         | The user details associated with the pool.     |





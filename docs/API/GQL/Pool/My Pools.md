---
sidebar_position: 4
---

# My Pools

Queries information of the pools created by the specified user.

```graphql
query Pool($userAddress: String!) {
  pool {
    my_pools(user_address: $userAddress) {
      height
      vlp
      user {
        address
        chain_uid
      }
      pair {
        token_1
        token_2
      }
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Pool($userAddress: String!, $chainUid: String) {\n  pool {\n    my_pools(user_address: $userAddress, chain_uid: $chainUid) {\n      height\n      vlp\n      user {\n        chain_uid\n        address\n      }\n      pair {\n        token_1\n        token_2\n      }\n    }\n  }\n}","variables":{"chainUid":"stargze","userAddress":"stars14hcxlnwlqtq75ttaxf674vk6mafspg8xj0h7fj"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAAoQQA2AFACQwDO%2BAgmGHgvfekQMop4BLJAHMAhABoiNKAAsAhkICqAsNz6CRASiLAAOkiJEADuQo79hw3AIB9E5XpUG%2BG3NbtO3Oozws2HeklZBSQbGBUvYKUVbT0DS0MZBAFhGRQLBKIANwojDITnPHN4zKIo0PCwfMy3f05qwwBfBuMFIrjSwxQIAGtkGwBGFq7e-oAmFuaSoimm-UaQcRAsuUE5ACMKDgwQDqJdEHLlKox9kHoUVeEALwQD8QyDwr8PegPuA4vV%2BgGAFhkoAAPChIADuFCwKCwAHYAKwoS6AgBmADZob8sj0UXA5Ej6EZhAAOQEAKwADDJoUiSQd5iBGkA)

### Arguments

- **userAddress** (String!): The address to check the pools for.

### Return Fields

| **Field**             | **Type**                  | **Description**                                    |
|-------------------|-----------------------|------------------------------------------------|
| `height`            | `Int`                   | The block height when the pool was created.                        |
| `vlp`               | `String`                | The contract address of the VLP of the pool.                                 |
| `pair`              | [`Pair`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#pair)         | The pair of tokens in the pool.                |
| `user`              | [`User`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#crosschainuser)         | The user details associated with the pool.     |





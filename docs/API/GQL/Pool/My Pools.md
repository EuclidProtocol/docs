---
sidebar_position: 4
---

# My Pools

Queries information of the pools created by the specified user.

```graphql
query Pool($userAddress: String!, $chainUid: String) {
  pool {
    my_pools(user_address: $userAddress, chain_uid: $chainUid) {
      height
      vlp
      user {
        chain_uid
        address
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
    --data '{"query":"query Pool($userAddress: String!, $chainUid: String) {\n  pool {\n    my_pools(user_address: $userAddress, chain_uid: $chainUid) {\n      height\n      vlp\n      user {\n        chain_uid\n        address\n      }\n      pair {\n        token_1\n        token_2\n      }\n    }\n  }\n}","variables":{"chainUid":"somnia","userAddress":"0x887e4aac216674d2c432798f851c1ea5d505b2e1"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAAoQQA2AFACQwDO%2BAgmGHgvfekQMop4BLJAHMAhABoiNKAAsAhkICqAsNz6CRASiLAAOkiJEADuQo79hw3AIB9E5XpUG%2BG3NbtO3Oozws2HeklZBSQbGBUvYKUVbT0DS0MZBAFhGRQLBKIANwojDITnPHN4zKIo0PCwfMy3f05qwwBfBuMFIrjSwxQIAGtkGwBGFq7e-oAmFuaSoimm-UaQcRAsuUE5ACMKDgwQDqJdEHLlKox9kHoIOCQBOQPxDIPCvw96A%2B4DgAYADwAOH4B2BAAFjkcigYwGADZIf8gWAxlAgQBmMb-ACcPwAZj8AKwDKADBByHFgHEfHHrMYIIYgeYgRpAA)

| **Argument**   | **Type**   | **Description**                      |
|----------------|------------|--------------------------------------|
| `userAddress`  | `String!`  | The address to check the pools for.  |


### Return Fields

| **Field**             | **Type**                  | **Description**                                    |
|-------------------|-----------------------|------------------------------------------------|
| `height`            | `Int`                   | The block height when the pool was created.                        |
| `vlp`               | `String`                | The contract address of the VLP of the pool.                                 |
| `pair`              | [`Pair`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#pair)         | The pair of tokens in the pool.                |
| `user`              | [`User`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#crosschainuser)         | The user details associated with the pool.     |





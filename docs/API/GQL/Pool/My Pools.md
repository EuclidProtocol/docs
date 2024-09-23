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
        sender
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
    --data '{"query":"query Pool($userAddress: String!, $chainUid: String) {\n  pool {\n    my_pools(user_address: $userAddress, chain_uid: $chainUid) {\n      height\n      vlp\n      user {\n        sender\n        chain_uid\n      }\n      pair {\n        token_1\n        token_2\n      }\n    }\n  }\n}","variables":{"userAddress":"nibi14hcxlnwlqtq75ttaxf674vk6mafspg8x3ky6ts","chainUid":"nibiru"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAAoQQA2AFACQwDO%2BAgmGHgvfekQMop4BLJAHMAhABoiNKAAsAhkICqAsNz6CRASiLAAOkiJEADuQo79hw3AIB9E5XpUG%2BG3NbtO3Oozws2HeklZBSQbGBUvYKUVbT0DS0MZBAFhGRQLBKIANwojDITnPHN4zKJGJDB8fMyo0PCwasMAX0bjBSK40sMUCABrZBsARlbuvoGAJlaWkqJp5v0mkHEQLLlBOQAjCg4MEE6iXRBCvw96Q%2B5DpAENgUGAFhkoAA8KJAB3CiwULAB2AFYUCg5E8AGYANh%2BdyyvTBcDkIPoRmEAA4ngBmXoEMEoM5LDKHWrKBoYA4gK43PAwQ4LEBNIA)


### Return Fields

| Field             | Type                  | Description                                    |
|-------------------|-----------------------|------------------------------------------------|
| height            | Int                   | The block height when the pool was created.                        |
| vlp               | String                | The contract address of the VLP of the pool.                                 |
| pair              | [Pair](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#pair)         | The pair of tokens in the pool.                |
| user              | [User](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#crosschainuser)         | The user details associated with the pool.     |





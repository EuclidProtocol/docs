---
sidebar_position: 3
description: "Router Queries"
---

:::danger
Change to non staging link when you get the chance. 
:::

:::note
You can test any of the queries in the [GraphQL Playground](https://api.staging.euclidprotocol.com/).  
:::

## Chain

Queries information about a specific chain within the router contract on a specified blockchain, including details about the factory chain ID, factory address, and channels.


```graphql

query Router($contract: String!, $chainUid: String!) {
  router(contract: $contract) {
    chain(chain_uid: $chainUid) {
      chain {
        factory_chain_id
        factory
        from_hub_channel
        from_factory_channel
      }
      chain_uid
    }
  }
}

```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Router($contract: String!, $chainUid: String!) {\n  router(contract: $contract) {\n    chain(chain_uid: $chainUid) {\n      chain {\n        factory_chain_id\n        factory\n        from_hub_channel\n        from_factory_channel\n      }\n      chain_uid\n    }\n  }\n}","variables":{"contract":"wasm1f5djultkcmtxwyyadkjjjjmcncxf5yxz5qkz4qfjnkwqggrw7pdqxkvm82","chainUid":"chaine"}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAEoQwr4AUAJFBKngIZQrpEDKKeAlkgOYBCADRE6ACyZ8AqjzDsuvAYICURYAB0kRInnKU8VeoxZsxx7qbWbtOolEl8jjpAH0Yc9hKlJZYa1p2dg4%2B6oFBdgBmphCEriF8rnLhEUTRrLEEKRGRenCu4jAARvGSSEgIADbZQbkQ%2BekomaVM5VU1RAC%2BHQluHmDZ3bZDnSDCIABuTLxMRZUIAM4YIDY6GiAWzKzr6OsA7kwLcACMkQCsYABWMJUoANZQcCgAHnsEBExgd5c-l3BQSCgz3OBGeAC8zlg7mCACxYSKXJB3PZYfj8PB7ADsAAcwFhnncJnAABwAJnWwnC616fh2RGpLgQ6y0o06QA)

### Arguments

- **chainUid** (String!): The unique identifier of the chain.
- **contract** (String!): The contract address of the router to query.

### Return Fields

### ChainInfo

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| chain                  | [Chain](#chain) | Detailed information about the chain.                  |
| chain_uid              | String | The unique identifier (UID) of the chain.               |

### Chain

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| factory_chain_id       | String | The factory chain ID.                                   |
| factory                | String | The contract address of the factory.                             |
| from_hub_channel       | String | The channel from hub to factory.                   |
| from_factory_channel   | String | The channel from factory to hub.               |

## All Chains
Queries all chain info within the router contract.

```graphql

query Router($contract: String!) {
  router(contract: $contract) {
    all_chains {
      chain {
        factory_chain_id
        factory
        from_hub_channel
        from_factory_channel
      }
      chain_uid
    }
  }
}
```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Router($contract: String!) {\n  router(contract: $contract) {\n    all_chains {\n      chain {\n        factory_chain_id\n        factory\n        from_hub_channel\n        from_factory_channel\n      }\n      chain_uid\n    }\n  }\n}","variables":{"contract":"wasm1f5djultkcmtxwyyadkjjjjmcncxf5yxz5qkz4qfjnkwqggrw7pdqxkvm82"}}'

```

[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAEoQwr4AUAJFBKngIZQrpEDKKeAlkgOYBCAJRFgAHSREiecpTxV6jFmyJ0G3FaIlTpRJgBsDAfSgALJnwDOYyXr3nLUnffsAzFREKmLfYzzA7V2kPVi8CIOC3WThjMxgAIx8mJCQEA0jXaIhY0JRw5NT0zOkAXxKiRz8YAMzy3XrSkAAaEAA3Jl4mBIMEKwwQFyJxECVNVhH0EYB3Jis4AEY3AFYwACsYAxQAayg4FAAPaYICJjBttcu1uCgkKAOVggOAL2WsbeeAFiw3NaRt6ZYfj8PDTADsAAcwFgDts2nAABwAJhGzUkTVKQA)

### Arguments

- **contract** (String!): The contract address of the router to query.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| chain                  | [Chain](#chain) | Detailed information about the chain.                  |
| chain_uid              | String | The unique identifier (UID) of the chain.               |

### Chain

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| factory_chain_id       | String | The factory chain ID.                                   |
| factory                | String | The contract address of the factory.                             |
| from_hub_channel       | String | The channel from hub to factory.                   |
| from_factory_channel   | String | The channel from factory to hub.               |



## All Tokens
Queries all the tokens and their respective chain UIDs within the router.

```graphql
query Router($contract: String!, $start: String, $end: String, $skip: Int, $limit: Int) {
  router(contract: $contract) {
    all_tokens(start: $start, end: $end, skip: $skip, limit: $limit) {
      tokens {
        token
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
    --data '{"query":"query Router($contract: String!, $start: String, $end: String, $skip: Int, $limit: Int) {\n  router(contract: $contract) {\n    all_tokens(start: $start, end: $end, skip: $skip, limit: $limit) {\n      tokens {\n        token\n        chain_uid\n      }\n    }\n  }\n}","variables":{"contract":"wasm1f5djultkcmtxwyyadkjjjjmcncxf5yxz5qkz4qfjnkwqggrw7pdqxkvm82","start":null,"end":null,"skip":null,"limit":null}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAEoQwr4AUAJFBKngIZQrpEDKKeAlkgOYBCADREaAZxRM8bTtz79RNZGHZdeApeIDWPAA7sAkqiUAbHnB6zjKAJRFgAHSREiecpTxV6jFrLoM3H72Ti6uREympgD6KBDayOJUktL%2BKTKiKuzKSGCiOvrZBXqi5pb%2BZVYhzuHhcQlI4g41tXXxyC2tRFAAFkx80TA8YJ3hAL6jE2FTYyDCIABu0jxMAEamCOIYIKGujiA%2BQaz77PsA7kzicACMAGYArGAAVjCmKNpQcCgAHmcEBEwwNoniCnnAoEgoN8HgRvgAve5YbRwgAsWFuTyQ2jOWH4-DwZwA7HowFhvtoFnAABwAJn2wha%2B3SKBORCQr1MDLC%2BxUrPZUS5exAxT5HMFRH2lRZGDZYucszGQA)


### Arguments

- **contract** (String!): The contract address of the router to query.
- **start** (String): The starting token identifier. Used for pagination.
- **end** (String): The ending token identifier. Used for pagination.
- **skip** (Int): The number of tokens to skip in the result set.
- **limit** (Int): The maximum number of tokens to return.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| tokens                 | [TokenInfo](#tokeninfo) | The tokens within the router contract.                  |

### TokenInfo

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| token                  | String | The identifier of the token.                            |
| chain_uid              | String | The unique identifier (UID) of the chain.               |


## VLP 
Queries the VLP contract address for the specified token pair.

```graphql
query Router($contract: String!, $pair: PairInput) {
  router(contract: $contract) {
    vlp(pair: $pair) {
      vlp
      token_1
      token_2
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Router($contract: String!, $pair: PairInput) {\n  router(contract: $contract) {\n    vlp(pair: $pair) {\n      vlp\n      token_1\n      token_2\n    }\n  }\n}","variables":{"contract":"wasm1f5djultkcmtxwyyadkjjjjmcncxf5yxz5qkz4qfjnkwqggrw7pdqxkvm82","pair":{"token_1":"osmo","token_2":"usdt"}}}'

```

[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAEoQwr4AUAJFBKngIZQrpEDKKeAlkgOYBCADREaAByY887AApS8ASSTiKASiLAAOkiJE85Snir1GLNmNPdzG7br1EAbgBtxVSdPYSFtnQ4cu4n7%2BRCgQANbIAPoAjMH%2BYZFIUQBM8UQAvsFZSBkgwiCOTLxMAEbOCADOGCB2elogVsysDegNAO5MlXAxAGYArGAAVjDOKOFQcCgAHu0EBExg4UMrQ3BQSFDTAwTTAF79WOF7ACxYvUNI4e1Y-Px47QDs4mBY0%2BGOcAAcafnBDR48K1NOkGolonEMEQGhBuhAGsJQSBwclfuwGjBKmAUA1sjo8hkgA)

### Arguments

- **contract** (String!): The contract address of the router to query.
- **pair** (PairInput): The two tokens included in the token pair.


### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| vlp                    | String | The VLP contract address.                                     |
| token_1                | String | The identifier of the first token in the pair.          |
| token_2                | String | The identifier of the second token in the pair.         |

## All VLPs

Queries all the VLP contract addresses and specifies the tokens for each.

```graphql
query Router($contract: String!) {
  router(contract: $contract) {
    all_vlps {
      vlps {
        vlp
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
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Router($contract: String!) {\n  router(contract: $contract) {\n    all_vlps {\n      vlps {\n        vlp\n        token_1\n        token_2\n      }\n    }\n  }\n}","variables":{"contract":"wasm1f5djultkcmtxwyyadkjjjjmcncxf5yxz5qkz4qfjnkwqggrw7pdqxkvm82"}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAEoQwr4AUAJFBKngIZQrpEDKKeAlkgOYBCAJRFgAHSREiecpTxV6jFmyJ0G3FaIlTpRJgBsDAfQBuBgA4BnMZL17z127vvTHd19JQQA1smMAjB6e3n5IxgBMwXoAvtFxugkxIAA0IKZMvEwARgYIVhggOuIgSpqsJeglAO5MVnABAGYArGAAVjAGKD5QcCgAHtUEBExgPm0TbXBQSFD9LQT9AF7NWD5LACxYjW1IPtVY-Px41QDsFmBY-T6mcAAcUamSyTFAA)

### Arguments

- **contract** (String!): The contract address of the router to query.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| vlps                   | [VLPInfo](#vlpinfo) | The VLP information within the router contract.         |

### VLPInfo

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| vlp                    | String | The VLP contract address.                                     |
| token_1                | String | The identifier of the first token in the pair.          |
| token_2                | String | The identifier of the second token in the pair.         |

## Escrows
Queries the chain UID that contain an escrow with the specified token.
```graphql
query Router($contract: String!, $token: String!, $start: String, $end: String, $skip: Int, $limit: Int) {
  router(contract: $contract) {
    escrows(token: $token, start: $start, end: $end, skip: $skip, limit: $limit)
  }
}
```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Router($contract: String!, $token: String!, $start: String, $end: String, $skip: Int, $limit: Int) {\n  router(contract: $contract) {\n    escrows(token: $token, start: $start, end: $end, skip: $skip, limit: $limit)\n  }\n}","variables":{"contract":"wasm1f5djultkcmtxwyyadkjjjjmcncxf5yxz5qkz4qfjnkwqggrw7pdqxkvm82","token":"usdc","start":null,"end":null,"skip":null,"limit":null}}'

```

[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAEoQwr4AUAJFBKngIZQrpEDKKeAlkgOYBCADREaKCAGtk7LrwEixAZxRM8bTtz79RNZGFlaBupZJ4AHdgElUugDY84PDTZQBKIsAA6SIkTzklHhU9IwsGnQM3OEe3r5%2BRAhKUAEA7kpUEtJI7OJSyKIqahFF6qL6ufqFZpbKNaIOThGNzm4%2BfgC%2BPh0gwiAAbmo8TABGdkkYIHFeIKHRrDPsM6lMSnAAjABmAKxgAFYwdiiSUHAoAB6pBARMYJJ7D3twUEhQ5zsE5wBe21iSXwAWLCbPZISSpLD8fh4VIAdnMYCw50k-TgAA4AEwzYQ%2BGZZZCLIgzGBKMBQbG4kClFCEpCHOw4pAzfS0%2BmMmamCysuwMyktGkYIh0nmMnodIA)

### Arguments

- **contract** (String!): The contract address of the router to query.
- **token** (String!): The identifier of the token.
- **start** (String): The starting escrow identifier. Used for pagination.
- **end** (String): The ending escrow identifier. Used for pagination.
- **skip** (Int): The number of escrows to skip in the result set.
- **limit** (Int): The maximum number of escrows to return.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| escrows                | [String] | The list of escrow identifiers.                           |

## State
Queries state information for the router.

```graphql
query Router($contract: String!) {
  router(contract: $contract) {
    state {
      admin
      vlp_code_id
      vcoin_address
    }
  }
}
```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Router($contract: String!) {\n  router(contract: $contract) {\n    state {\n      admin\n      vlp_code_id\n      vcoin_address\n    }\n  }\n}","variables":{"contract":"wasm1f5djultkcmtxwyyadkjjjjmcncxf5yxz5qkz4qfjnkwqggrw7pdqxkvm82"}}'

```

[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAEoQwr4AUAJFBKngIZQrpEDKKeAlkgOYBCAJRFgAHSREiecpTxV6jFmyJ0G3FaIlTpRAM4omlMZL16mYOHzPmiANwA2ABwD69MAlc8wt8-fo%2BV0swPAR9fT8iAF9bWKRokAAaEHsmXiYAI0dwjBAdcRAlTVZC9kKAdyZ9OABGADMAVjAAKxhHFABrKDgUAA8KggJLTpaxlrgoJCg%2BpoI%2BgC9GrE6FgBYsepakToqsfn48CoB2ZzAsPs77OAAOACZCpMlE6KA)

### Arguments

- **contract** (String!): The contract address of the router to query.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| admin                  | String | The admin address of the router.                        |
| vlp_code_id            | Int    | The code ID of the VLP.                                 |
| vcoin_address          | String | The address of the VBalance contract.                      |


## Simulate Swap
Simulates a swap operation and returns the amount to be received for the swap.
```graphql
query Router($contract: String!, $assetIn: String!, $amountIn: String!, $assetOut: String!, $minAmountOut: String!, $swaps: [NextSwapPair]) {
  router(contract: $contract) {
    simulate_swap(asset_in: $assetIn, amount_in: $amountIn, asset_out: $assetOut, min_amount_out: $minAmountOut, swaps: $swaps) {
      amount_out
      asset_out
    }
  }
}
```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Router($contract: String!, $assetIn: String!, $amountIn: String!, $assetOut: String!, $minAmountOut: String!, $swaps: [NextSwapPair]) {\n  router(contract: $contract) {\n    simulate_swap(asset_in: $assetIn, amount_in: $amountIn, asset_out: $assetOut, min_amount_out: $minAmountOut, swaps: $swaps) {\n      amount_out\n      asset_out\n    }\n  }\n}","variables":{"contract":"wasm1crsvm4qddplxhag29nd2zyw6k6jzh06hlcctya4ynfvuhhu3yt4q58gge7","assetIn":"osmo","amountIn":"10","assetOut":"atom","minAmountOut":"1","swaps":[{"token_in":"osmo","token_out":"usdt"},{"token_in":"usdt","token_out":"usdc"},{"token_in":"usdc","token_out":"atom"}]}}'

```

[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAEoQwr4AUAJFBKngIZQrpEDKKeAlkgOYBCADREaTAM4SEKAJJJ2XXgJFimccqnmLufIaPFSZAeQo7l%2BsXD4BBDTFSm2nXSoMSA7kwAOE9gG0AOQQADxQOL28ABSYePABdAEoiYAAdJCIiPHJKPCp6RhZnOgZuIuS0jMyiCR44GAAbJkoAfU8fKklpFBa%2BdkNu%2BVF1TR6%2BtXstJGGjHpz%2BrpMKUWskFpGHObMrW0mUJ1F2336jiQr06uqN1Baci8uiRa2Ue8yAX3uPpDeQYRAANyYvCYACMGggJBgQJVUiACmVWLD0LCvBI4ABGKB4CT-OAAFiwYDA3gaIQAFkx%2BAAmACcSDAVIAXgQPAA2ADWrIAVoyyQAGVlkhpQVgEJh4ghIABm-xgZLJMAAzAQUASAKwADn4-AQAHZYcJ0rCnvIkURYRA0RADUaQNc5EgzbD0XybY67bMnE67SgIHA3bDVnZRl6MOaQOiAyBTmb-K8UvHMrDfezkL13ewLVa3Q9wym03cw7CYBIwC9fkaqu9RJVc8mIKm1nxvSWyzmHvXG7cKC3S1B2-G3sJax2QPmmxnw63%2BxWq9VOwWe0WfX6B3Ovpl4obviA3kA)

### Arguments

- **contract** (String!): The contract address of the router to query.
- **assetIn** (String!): The identifier of the input asset.
- **amountIn** (String!): The amount of the input asset to swap.
- **assetOut** (String!): The identifier of the output asset.
- **minAmountOut** (String!): The minimum amount of the output asset expected from the swap.
- **swaps** ([NextSwapPair]): The list of swap pairs to execute.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| amount_out             | String | The amount of the output asset received from the swap.  |
| asset_out              | String | The identifier of the output asset.                     |
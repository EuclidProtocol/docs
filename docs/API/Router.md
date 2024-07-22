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

query Router($chainUid: String!) {
  router {
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
    --url 'https://api.staging.euclidprotocol.com/graphql' \
    --data '{"query":"query Router($chainUid: String!) {\n  router {\n    chain(chain_uid: $chainUid) {\n      chain {\n        factory_chain_id\n        factory\n        from_hub_channel\n        from_factory_channel\n      }\n      chain_uid\n    }\n  }\n}","variables":{"chainUid":"chaine"}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAEoQwr4AUAJFABYCGAlkgKrNjpEDKKerAOYBCAJRFgAHSREiecpTwTps2QxZIq61gH0YnbnSasOYcVJmq1xmRatWAZoygoIhHdqQ7OK%2B7KcubgS%2Bfg7ycDr0MABGHkxISAgANiH2YRARAa7u6gnJqbIAvgVEnno%2BlkW%2BxUiFIAA0IABujAKM0UkIAM4YIBaSIJ6mA9wDnggD9dJ1hUA)

### Arguments

- **chainUid** (String!): The unique identifier of the chain.

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
query Router($start: String, $end: String, $skip: Int, $limit: Int) {
  router {
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
    --url 'https://api.staging.euclidprotocol.com/graphql' \
    --data '{"query":"query Router($start: String, $end: String, $skip: Int, $limit: Int) {\n  router {\n    all_tokens(start: $start, end: $end, skip: $skip, limit: $limit) {\n      tokens {\n        token\n        chain_uid\n      }\n    }\n  }\n}","variables":{"start":null,"end":null,"skip":null,"limit":null}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAEoQwr4AUAJAM4oCGeK6RAyingJZIDmAGiI1kYNpx78h9ANbcADmwCSqaQBtucbqyIqUASiLAAOkiJE85SniOnz5xmrUB9FBBnI6VBsx30mLEKibCJIYEJ0corCkQpCGlp%2BCdqGJmb25m4eSHS26RmZ7sh2BeZQABaMvM4w3GAlGQC%2BDUTN6W2NIAIgAG7M3IwARmoIdBggacYgFVVIAKp1U2xTM7wIUwKmUz4sS0RIME6bSFOiewdHWyCx8ueHasdTySh3l0idjUA)


### Arguments

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
query Factory($chainUid: String!, $pair: PairInput) {
  factory(chain_uid: $chainUid) {
    vlp(pair: $pair) {
      vlp_address
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Factory($chainUid: String!, $pair: PairInput) {\n  factory(chain_uid: $chainUid) {\n    vlp(pair: $pair) {\n      vlp_address\n    }\n  }\n}","variables":{"chainUid":"chaine","pair":{"token_1":"osmo","token_2":"usdt"}}}'

```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGICGUKEhAFACRQAWZAlkgKotjpEDKKeNgHMAhABoidAA6s8PAAqyAkkikwUASiLAAOkiJEAZhSq0mrJAH0YXHg2ZtOYLbv0GiANwA2UmjJZykv54Lnru7t5SlmRgYHgIAM4JYe4AvinpSKkgYiAeZIJkAEZeiRggrgY6IOaOXNU81bVICNVietXBDdopVSBUANbIlgCM3dUQCXAQbb1E1YPDAEzjIDAJYCjVGXrZqUA)

### Arguments

- **chainUid** (String!): The unique Id of the chain.
- **pair** (PairInput): The two tokens included in the token pair.


### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| vlp_address                    | String | The VLP contract address.                       |

## All VLPs

Queries all the VLP contract addresses and specifies the tokens for each.

```graphql
query Router {
  router {
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
    --data '{"query":"query Router {\n  router {\n    all_vlps {\n      vlps {\n        vlp\n        token_1\n        token_2\n      }\n    }\n  }\n}","variables":{}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAEoQwr5HAA6SRRe5le1dDDAhgDbcD6AN24AHAM5t6HBkLESpUme3kMUEANbI%2BARiXLVGpHwBMujgF9TFyVbMgANCAGc8AS04AjbglEYQtSTQgUAAWnC5IAKouYIHoRIEhYUgIgXZ0gcJheLFyHIH6mjoY8SAQonAQqab56pomxYEwomAogUo2IGZAA)

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
query Router($token: String!, $start: String, $end: String, $skip: Int, $limit: Int) {
  router {
    escrows(token: $token, start: $start, end: $end, skip: $skip, limit: $limit)
  }
}
```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Router($token: String!, $start: String, $end: String, $skip: Int, $limit: Int) {\n  router {\n    escrows(token: $token, start: $start, end: $end, skip: $skip, limit: $limit)\n  }\n}","variables":{"token":"usdt","start":null,"end":null,"skip":null,"limit":null}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAEoQwr4AUAJChANbLpEDKKeAlkgOYCEAGiI0AzigCGeFC3ZdeQmsjAyO3HgpENOABxYBJVAoA2nOJ2lEDKAJRFgAHSREiecpTx3Hz5whFRXAO4iVPRMSCx0jMhCYpIWohJSQkoRSjFausKaOkImZvF55tZeRAC%2BjqUgAiAAbpKc4gBGRr4YIA5ORPYgUAAW4twAqpxg3SzdfQNICN0Cjt3aA3hjnp3O3aHIAPoAjCvdECJwELMl6yCbSFsATPsgMCJgKN0lpXOdG1FIdw9Ppx8gWJSFZIGBGIzvc5KEFgiElbrZbQw8GQrogQrPDBEUHgiogUpAA)

### Arguments

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
query Router {
  router {
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
    --data '{"query":"query Router {\n  router {\n    state {\n      admin\n      vlp_code_id\n      vcoin_address\n    }\n  }\n}","variables":{}}'

```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAEoQwr5HAA6SRRe5le1dDDAzigIaVv0ODHmDgBLJOyFEAbgBsADgH0oEMAiViwUoTNUSlIsHgSdOOogF8p1pJZAAaEDJ54xPAEZzTGELUE0IFAAFjwSAKpagehEgSFhSAiBDnSBCmF40QJCgSgQANbISgCMWYEQnHAQyRa5BUUATGUgMJxgKIE2KQEgeYWSGLEtbR2OUoHcrqMxSDByct0Mgcjag7Pzi0Oc%2BWIKWesL4yByYuLTRAd09pZAA)


### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| admin                  | String | The admin address of the router.                        |
| vlp_code_id            | Int    | The code ID of the VLP.                                 |
| vcoin_address          | String | The address of the VBalance contract.                      |


## Simulate Swap
Simulates a swap operation and returns the amount to be received for the swap.

```graphql
query Router($assetIn: String!, $amountIn: String!, $assetOut: String!, $minAmountOut: String!, $swaps: [NextSwapPair]) {
  router {
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
    --data '{"query":"query Router($assetIn: String!, $amountIn: String!, $assetOut: String!, $minAmountOut: String!, $swaps: [NextSwapPair]) {\n  router {\n    simulate_swap(asset_in: $assetIn, amount_in: $amountIn, asset_out: $assetOut, min_amount_out: $minAmountOut, swaps: $swaps) {\n      amount_out\n      asset_out\n    }\n  }\n}","variables":{"assetIn":"osmo","amountIn":"10","assetOut":"atom","minAmountOut":"1","swaps":[{"token_in":"osmo","token_out":"usdt"},{"token_in":"usdt","token_out":"usdc"},{"token_in":"usdc","token_out":"atom"}]}}'

```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAEoQwr4AUAJAIYDODCKAkkukQMop4CWSAOYBCADRF6ccqnace-IWImNmKAPIU5vASPE04AgIJSYqDSi0LdEhgHc6ABwacA2gDkEADxRd7DgAp0fHgAugCURMAAOkhERHjklHiRMXFxDHxwMAA2dJQA%2BnaOVCos%2BQKc9Ews7OJ0JqjlHMoNbEh11Sj5iZWl6hTiBkj59dJdPRJDxmPm4kVOlfMMEdGxaXGjpuMUqetEfd07a3EAvrtnSCcgoiAAbnT8dABG2QgMGCCrUSB97N%2Bc3wgDCk31EMW%2BmxkSH%2BRG%2BAEYAAyg8E-TrmGEQlAQODI6EgKatdEYWEgOG475LGEuXZxVZ7ElYgDWyCaGJAQJB1xpaW%2BTJZiTZMAYYBQ5OORBO4jpe15EGZwwEguFoq54risvlhxVAJAQrAUFx6vFkul6w1LMVxO%2BeoNqvp5uGAqtPyxOLtsONuxCYMuIBOQA)

### Arguments

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
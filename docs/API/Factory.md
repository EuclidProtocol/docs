---
sidebar_position: 3
description: "Factory Queries"
---

# Factory

:::note
You can test any of the queries in the [GraphQL Playground](https://api.staging.euclidprotocol.com/).  
:::

## All Pools

Queries all pool information associated with a specified factory contract which is retrieved by a chain UID. It includes details about each pool, including the token pairs involved and their respective types. 

```graphql
query Factory($chainUid: String!) {
  factory(chain_uid: $chainUid) {
    all_pools {
      pools {
        pair {
          token_1
          token_2
        }
        vlp
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
    --data '{"query":"query Factory($chainUid: String!) {\n  factory(chain_uid: $chainUid) {\n    all_pools {\n      pools {\n        pair {\n          token_1\n          token_2\n        }\n        vlp\n      }\n    }\n  }\n}","variables":{"chainUid":"nibiru"}}'
```
[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGICGUKEhAFACRQAWZAlkgKotjpEDKKeNgHMAhAEoiwADpIiRAGYUqtJqyQB9GFx4NmbTmAnTZcomQA259QAcIEcwGdJM06dv2nx16%2Bus8zk29TKgBrZHUARhcg4IgwjQAmaKCAX2TvADdza3S5NMCifLyZFJAAGhAMskEyACNzBAcMEC8iKRBVfS52nnakFlqWPBh2kpAUoA)

### Arguments

- **chainUid** (String!): The unique identifier of the chain.

### Return Fields

| Field       | Type   | Description                             |
|-------------|--------|-----------------------------------------|
| pools       | [PoolDetails](#pooldetails) | Details of the individual pools.             |

### PoolDetails

| Field       | Type   | Description                             |
|-------------|--------|-----------------------------------------|
| pair        | [Pair](#pair) | Information about the token pairs.              |
| vlp         | String | The contract address of the VLP.                     |

### Pair

| Field       | Type   | Description                             |
|-------------|--------|-----------------------------------------|
| token_1     | String | The first token in the pair.        |
| token_2     | String | The second token in the pair.       |

## State

Queries the state information of a factory contract on a specified blockchain. It includes details about the factory's ID, chain ID, router contract, hub channel, and admin.

```graphql
query Factory($chainUid: String!) {
  factory(chain_uid: $chainUid) {
    state {
      chain_uid
      router_contract
      hub_channel
      admin
    }
  }
}
```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/graphql' \
    --data '{"query":"query Factory($chainUid: String!) {\n  factory(chain_uid: $chainUid) {\n    state {\n      chain_uid\n      router_contract\n      hub_channel\n      admin\n    }\n  }\n}","variables":{"chainUid":"nibiru"}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGICGUKEhAFACRQAWZAlkgKotjpEDKKeNgHMAhAEoiwADpIiRAGYUqtJqyQB9GFx4NmbTmAnTZcogGcUZFAkkzTp1W01c79onggxredVAio8JVd7RhgAI19mJCQEABtg0zIwODYEgF9XDKQ0kAAaEAA3MkEyMNiEMwwQYzkpEEcOFwwiOqQWMJY8GDqZHLSgA)

### Arguments

- **chainUid** (String!): The unique identifier of the chain.


### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| state                  | [State](#state) | The state information of the factory contract.         |

### State

| Field            | Type   | Description                               |
|------------------|--------|-------------------------------------------|
| chain_uid        | String | The unique identifier (UID) of the chain. |
| router_contract  | String | The address of the router contract.       |
| hub_channel      | String | The hub channel used by the factory.      |
| admin            | String | The admin address of the factory.         |


## All Tokens

Queries all tokens associated with a factory contract on a specified blockchain.


```graphql
query Factory($chainUid: String!) {
  factory(chain_uid: $chainUid) {
    all_tokens {
      tokens
    }
  }
}
```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/graphql' \
    --data '{"query":"query Factory($chainUid: String!) {\n  factory(chain_uid: $chainUid) {\n    all_tokens {\n      tokens\n    }\n  }\n}","variables":{"chainUid":"nibiru"}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGICGUKEhAFACRQAWZAlkgKotjpEDKKeNgHMAhAEoiwADpIiRAGYUqtJqyQB9GFx4NmbTmAnTZcomQA259VQDWyAM6SZp07YfPTAXw-eknkAA0IABuZIJkAEbmCPYYIMZyUiCq%2BlxJPElILBEseDBJMv6eQA)


### Arguments

- **chainUid** (String!): The unique identifier of the chain.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| all_tokens             | [AllTokens](#alltokens) | All token information associated with the factory.       |

### AllTokens

| Field       | Type   | Description                             |
|-------------|--------|-----------------------------------------|
| tokens      | [String] | The list of tokens.        |

## Escrow

Queries escrow information for a factory contract on a specified blockchain, including the escrow address and details about the denominations.

```graphql
query Factory($chainUid: String!, $tokenId: String) {
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
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/graphql' \
    --data '{"query":"query Factory($chainUid: String!, $tokenId: String) {\n  factory(chain_uid: $chainUid) {\n    escrow(token_id: $tokenId) {\n      escrow_address\n      denoms {\n        ... on NativeTokenType {\n          native {\n            denom\n          }\n        }\n        ... on SmartTokenType {\n          smart {\n            contract_address\n          }\n        }\n      }\n    }\n  }\n}","variables":{"chainUid":"nibiru","tokenId":"usdt"}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGICGUKEhAFACRQAWZAlkgKotjpEDKKeNgHMAhABoidKgGtkASW58BwgJRFgAHSREiAMwpVaTVkgD6MLjwbM2nMGs3adRBAGcoeCAHcaM5KctJPyQFBy1nZzcPb1MyMDA8N1dwiKIwZAg4V3UU1KIAOkKiCG0AOTIUFgA3BAAVCFkkWoIABwQcpzydJArq9scu1PSkTNyugF8xiMnO1ML84u1eODI8FHrG5raOwZ1XFbWd3Z0oEoEDWPjE12TZvJnBh9SnnSeZ8ZAxECrVljIAIwANm4MCABkQNCBjLYuJCeJCkCx-iw8DBIWIUpDggo4RCQDBXGAUJCtB9xkA)


### Arguments

- **chainUid** (String!): The unique identifier of the chain.
- **token_id** (String!): The Id of the token to query in the escrow. 

### Return Fields

| Field            | Type   | Description                               |
|------------------|--------|-------------------------------------------|
| escrow_address   | String | The contract address of the escrow contract.|
| denoms           | [Denoms](#denoms) | The denominations associated with the escrow.             |

### Denoms

| Field            | Type   | Description                               |
|------------------|--------|-------------------------------------------|
| native           | [Native](#native) | Details of the native tokens (Denoms).                   |
| smart            | [Smart](#smart) | Details of the CW20 tokens (Contract addresses).            |

### Native

| Field            | Type   | Description                               |
|------------------|--------|-------------------------------------------|
| denom            | String | The denomination of the native token.     |

### Smart

| Field            | Type   | Description                               |
|------------------|--------|-------------------------------------------|
| contractAddress  | String | The contract address of the smart token.  |

## VLP 

Queries the VLP address for a specified token pair on the specified chain.

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
    --url 'https://api.staging.euclidprotocol.com/graphql' \
    --data '{"query":"query Factory($chainUid: String!, $pair: PairInput) {\n  factory(chain_uid: $chainUid) {\n    vlp(pair: $pair) {\n      vlp_address\n    }\n  }\n}","variables":{"chainUid":"nibiru","pair":{"token_1":"atom","token_2":"usdc"}}}'
```
[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGICGUKEhAFACRQAWZAlkgKotjpEDKKeNgHMAhABoidAA6s8PAAqyAkkikwUASiLAAOkiJEAZhSq0mrJAH0YXHg2ZtOYLbv0GiANwA2UmjJZykv54Lnru7t5SlmRgYHgIAM4JYe4AvinpSKkgYiAeZIJkAEZeiRggrjog5o5cVTxVSCxFATBVYnpVwfXaKVVUANbIlgCMPVVkVHDtfSCDwwBM4yAwCWBQVXqZ2alAA)

### Arguments

- **chainUid** (String!): The unique identifier of the chain.
- **pair** (PairInput): The input for specifying the token pair by specifying token_1 and token_2.

### Return Fields

| Field            | Type   | Description                               |
|------------------|--------|-------------------------------------------|
| vlp_address      | String | The address of the VLP contract that contains the specified token pair.          |

## Get Token Address

Queries the contract address for the LP token of the specified VLP on the specified chain.

```graphql

query Factory($chainUid: String!, $vlpAddress: String!) {
  factory(chain_uid: $chainUid) {
    get_token_address(vlp_address: $vlpAddress) {
      token_address
    }
  }
}

```

### Example 

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/graphql' \
    --data '{"query":"query Factory($chainUid: String!, $vlpAddress: String!) {\n  factory(chain_uid: $chainUid) {\n    get_token_address(vlp_address: $vlpAddress) {\n      token_address\n    }\n  }\n}","variables":{"chainUid":"nibiru","vlpAddress":"wasm1zhhfwhuyyc88jdr5rncn75uf0lf3pta4lwk68d6y7vncyqxxllrqun6zen"}}'
```
[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGICGUKEhAFACRQAWZAlkgKotjpEDKKeNgHMAhABoidAG4AbAA4BBMGDwIAzmp79BSUQEoiwADpIiRAGYUqtJqyQB9GFx4NmbTmAPHTZokIQo9lQA1sj2ZMqqGjSycuGR6pqSsUoqiV4mvr4hYRFpGpm%2BAL6FJUhFIGIgUmSCZABGMuoYIN5GILbuXO087Ugs9Sx4MO1iJu0pCQUY7QDuZGpwAIwAXoyM5rOMMAQEUAAc%2BwBWKgCseEhQSADspzDmAAwy5gDMcihkACwys8EAbPswH8CNcpJcCFgAB6QmQyPA4JB-FbIdomCpFIA)

### Arguments

- **chainUid** (String!): The unique identifier of the chain to get the address from.
- **vlp_address** (String!): The address of the VLP whose LP token we are fetching.

### Return Fields

| Field            | Type   | Description                               |
|------------------|--------|-------------------------------------------|
| token_address      | String | The contract address of the LP token of the specified VLP.      |
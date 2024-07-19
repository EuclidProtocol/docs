---
sidebar_position: 3
description: "Factory Queries"
---

# Factory
:::danger
Change to non staging link when you get the chance. 
:::

:::note
You can test any of the queries in the [GraphQL Playground](https://api.staging.euclidprotocol.com/).  
:::

## All Pools

Queries all pool information associated with a specified factory contract on a given blockchain. It includes details about each pool, including the token pairs involved and their respective types.

```graphql
query Factory($contract: String!, $chainId: String!) {
  factory(contract: $contract, chain_id: $chainId) {
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
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Factory($contract: String!, $chainId: String!) {\n  factory(contract: $contract, chain_id: $chainId) {\n    all_pools {\n      pools {\n        pair {\n          token_1\n          token_2\n        }\n        vlp\n      }\n    }\n  }\n}","variables":{"contract":"wasm1m8rqysrhhxj2zyvr9k4um7fcgmke72rnqtvfssasw4lat5pdna8sd0z7mz","chainId":"localpoola-1"}}'
```
[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGICGUKEhAFACRQSp4UrpEDKKeAlkgOYBCADREGACzJ8AkmHZdeAwQEoiwADpIiRAGatqBGo2at2DJt1aiokvgH0ecsTalJZqjVu1EyAG192AA4QEL4Azmqa3t7BoRGe0dGBUniRXoneVADWyHYAjFEZmRA5SHYATIUZAL5ViQBuvoF12rXpRG2tmtUgwiD1ZLxkAEa%2BCGEYIAlE6iDGlpSz6LMA7mRhcHlwABx4WARheOLiAB4AVuUAXgT1eACcWQAs8ADsOlD8cDkv5XhIWCh6jowmF1itHr4yCgAKyBMBIMjbMJgAAMlxecEus2EhVmLhkYCWMxAvmgflikIAtAUQN0QNUgA)

### Arguments

- **chainId** (String!): The identifier of the chain.
- **contract** (String!): The contract address of the factory to query.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| all_pools              | [AllPools](#allpools) | All pool information associated with the specified factory.        |

### AllPools

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
query Factory($contract: String!, $chainId: String!) {
  factory(contract: $contract, chain_id: $chainId) {
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
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Factory($contract: String!, $chainId: String!) {\n  factory(contract: $contract, chain_id: $chainId) {\n    state {\n      chain_uid\n      router_contract\n      hub_channel\n      admin\n    }\n  }\n}","variables":{"contract":"wasm1m8rqysrhhxj2zyvr9k4um7fcgmke72rnqtvfssasw4lat5pdna8sd0z7mz","chainId":"localpoola-1"}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGICGUKEhAFACRQSp4UrpEDKKeAlkgOYBCADREGACzJ8AkmHZdeAwQEoiwADpIiRAGatqBGo2at2DJt1aiokvgH0ecsTalJZqjVu1EAzijIoCGqa3t4u9jCOIaFEeBAwgXh2xpaU0aHiMABGyZJISAgANuneZGBwfCUAvtE1SFUgwiAAbmS8ZFmFCD4YIJ7a6iApLGkYgwDuZD5wAIxwABx4WAQ%2BeOLiAB4AVgBMAF4EzXgAnADWACzwAOw6UPxwpwhXO3hIWCjNOj4%2BU%2BPnhQEAKwABzASDI8x8YAADHsrnA9oNhNFBuE3GBBuxBoVoGRCsCIBAAQBaGaDTQNKpAA)

### Arguments

- **chainId** (String!): The identifier of the chain.
- **contract** (String!): The contract address of the factory to query.

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
query Factory($contract: String!, $chainId: String!) {
  factory(contract: $contract, chain_id: $chainId) {
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
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Factory($contract: String!, $chainId: String!) {\n  factory(contract: $contract, chain_id: $chainId) {\n    all_tokens {\n      tokens\n    }\n  }\n}","variables":{"contract":"wasm1m8rqysrhhxj2zyvr9k4um7fcgmke72rnqtvfssasw4lat5pdna8sd0z7mz","chainId":"localpoola-1"}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGICGUKEhAFACRQSp4UrpEDKKeAlkgOYBCADREGACzJ8AkmHZdeAwQEoiwADpIiRAGatqBGo2at2DJt1aiokvgH0ecsTalJZqjVu1EyAG192VADWyADOapre3sFhkd4AvnGJSPEgwiAAbmS8ZABGvgihGCCe2uogxpaU5ejlAO5koXAAjHAAHHhYBKF44uIAHgBWAEwAXgQZeACcQQAs8ADsOlD8cCELw3hIWCgZOqGhjXWzvmQoAKwADmBIZG2hYAAMowtwo%2BXCceUuMmA1ROVfNA-JcIBBTgBaZrlTSpeJAA)


### Arguments

- **chainId** (String!): The identifier of the chain.
- **contract** (String!): The contract address of the factory to query.

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
query Factory($contract: String!, $chainId: String!, $tokenId: String) {
  factory(contract: $contract, chain_id: $chainId) {
    escrow(token_id: $tokenId) {
      escrow_address
      denoms {
        native {
          denom
        }
        smart {
          contractAddress
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
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Factory($contract: String!, $chainId: String!, $tokenId: String) {\n  factory(contract: $contract, chain_id: $chainId) {\n    escrow(token_id: $tokenId) {\n      escrow_address\n      denoms {\n        native {\n          denom\n        }\n        smart {\n          contractAddress\n        }\n      }\n    }\n  }\n}","variables":{"contract":"wasm1m8rqysrhhxj2zyvr9k4um7fcgmke72rnqtvfssasw4lat5pdna8sd0z7mz","chainId":"localpoola-1","tokenId":"osmo"}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGICGUKEhAFACRQSp4UrpEDKKeAlkgOYBCADREGACzJ8AkmHZdeAkWKoBrZLPnc%2B-AJRFgAHSREiAM1bUCNRs1bsGTbq1FRJfAPo85Yt1KSy%2BkYmpkQIAM5QeBAA7jRqyF4%2BdAkBYEHGoaERUbEeZGBgeBHhmVlEYMgQcOEGZeVESGQoPABuCHUhDaaVSNX15QC%2BA1nhcGR4KJ3dobbOlACChcXhpV1DI0TD69um24MgwiCtEzxkAEYANhEYIMGmhiBzLJSP6I8xZGMAjHAAHHgsARwnhxOIAB4AKwATAAvAitPAATlUABZ4AB2MxQfhwdQY6F4JBYFCtMyrL4xVGXZoAVgADmAmn9wmAAAywjFwWGPYTGR5%2BGRgN5ER6XaBkS70iAQGkAWm%2BvP5IFSshFjwgYwgj2MB0GQA)


### Arguments

- **chainId** (String!): The identifier of the chain.
- **contract** (String!): The contract address of the factory to query.
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

Queries the VLP address for a specified token pair.

```graphql

query Factory($contract: String!, $chainId: String!, $pair: PairInput) {
  factory(contract: $contract, chain_id: $chainId) {
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
    --data '{"query":"query Factory($contract: String!, $chainId: String!, $pair: PairInput) {\n  factory(contract: $contract, chain_id: $chainId) {\n    vlp(pair: $pair) {\n      vlp_address\n    }\n  }\n}","variables":{"contract":"wasm1m8rqysrhhxj2zyvr9k4um7fcgmke72rnqtvfssasw4lat5pdna8sd0z7mz","chainId":"localpoola-1","pair":{"token_1":"osmo","token_2":"usdt"}}}'
```
[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGICGUKEhAFACRQSp4UrpEDKKeAlkgOYBCADREGACzJ8AkmHZdeAkWIAOUvOwAK66UhUwUASiLAAOkiJEAZq2oEajZq3YMm3VqKiS%2BAfR5yxLykkWWMzC0siADcAGxUaNR4NVXUw80jI2JUfMjAwPAQAZ0L0yIBfUoqkMpBhECiyXjIAIxiijBBwy1MQR3dKHvQegHcyQrgARjgADjwsAkK8cXEADwArACYALwIovABOAGsAFngAdisofjhDhDONvCQsFCirYrHh45iyFABWFTASDI00KYAADFsznAtj1hOYekEZGBBkQejFoGQ4hAIN8ALQTWHwkCJPAorqokBUW5IHwEjAUiDjCCEiI9KnIHwbFE9GCglA9cxVGplIA)

### Arguments

- **chainId** (String!): The identifier of the chain.
- **contract** (String!): The contract address of the factory to query.
- **pair** (PairInput): The input for specifying the token pair by specifying token_1 and token_2.

### Return Fields

| Field            | Type   | Description                               |
|------------------|--------|-------------------------------------------|
| vlp_address      | String | The address of the VLP contract that contains the specified token pair.          |
---
sidebar_position: 4
description: "VLP Queries"
---
:::danger
Change to non staging link when you get the chance. 
:::

:::note
You can test any of the queries in the [GraphQL Playground](https://api.staging.euclidprotocol.com/).  
:::

## Pool 
Queries the LP reserves and shares for the specified VLP on the specified chain.

```graphql
query Vlp($contract: String!, $chainUid: String!) {
  vlp(contract: $contract) {
    pool(chain_uid: $chainUid) {
      reserve_1
      reserve_2
      lp_shares
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Vlp($contract: String!, $chainUid: String!) {\n  vlp(contract: $contract) {\n    pool(chain_uid: $chainUid) {\n      reserve_1\n      reserve_2\n      lp_shares\n    }\n  }\n}","variables":{"contract":"wasm1s2lr8u69xammmg3s8hemegcz57y07ae0wa7c7d2adupp6du3neyqk7ee4n","chainUid":"chaine"}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGoA2ADgBQAkUEqeAhlCukQMop4CWSA5gEIANEToALJnwCqPMOy68BggJRFgAHSREiAN0pV6jFmzFHuJtZu06iFCBDKHJfAPow57CVKSywVrVtbPAQAZ3xdBFcARkCgohDwvEjXACY4oMpXUMlEjKIAXziipAKQYRBdJl4mACMyMIwQax0NEHNmVjb0NoB3JlC4aNDUsjwADhgANgBOAA8mOCX%2BAGZQ8fEERH4oAC8AVgB2AgAGQ6YEE-7DqEOwVKYwGAoKKaeVpAQCLABrQ4QEAAWJBtYRxNpQFy%2BOTdIgQqEINpaMoFIA)

### Arguments

- **chainUid** (String!): The unique identifier of the chain that hosts the VLP.
- **contract** (String!): The contract address of the VLP to query.

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| reserve_1              | String | The reserve amount of the first token.                  |
| reserve_2              | String | The reserve amount of the second token.                 |
| lp_shares              | String | The number of liquidity provider shares.                |

## All Pools
Queries all the LP reserves and shares on all the chains for the specified VLP.

```graphql
query Vlp($contract: String!) {
  vlp(contract: $contract) {
    all_pools {
      pools {
        chain_uid
        pool {
          reserve_1
          reserve_2
          lp_shares
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
    --data '{"query":"query Vlp($contract: String!) {\n  vlp(contract: $contract) {\n    all_pools {\n      pools {\n        chain_uid\n        pool {\n          reserve_1\n          reserve_2\n          lp_shares\n        }\n      }\n    }\n  }\n}","variables":{"contract":"wasm1s2lr8u69xammmg3s8hemegcz57y07ae0wa7c7d2adupp6du3neyqk7ee4n"}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGoA2ADgBQAkUEqeAhlCukQMop4CWSA5gEIAlEWAAdJESIA3SlXqMWbInQbdloiVOlEmZMgH0KECGQDOYybt0mzl7TZtQAFkz6GYPMNafS7ZFY6ftJ4COb4MgiGAIy%2BIURhEXhRhgBM8SGUhuZuSZk2AL4FRMXBpb5lhSAANCAyTLxMAEZk4RggjkTiIIoarD3oPQDuTOZwMeZpZHgAHDAAbACcAB5McBv8AMzmsy4IiPxQAF4ArADsBAAM50wIV6PnUOdgaUxgMBQUCx9bSAgELAAa3OCAQABYkD0apJqoUgA)


### Arguments

- **contract** (String!): The contract address of the VLP.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| chain_uid              | String | The unique identifier (UID) of the chain.               |
| pool                   | [PoolInfo](#poolinfo) | Detailed information about the pool.                   |

### PoolInfo

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| reserve_1              | String | The reserve amount of the first token.                  |
| reserve_2              | String | The reserve amount of the second token.                 |
| lp_shares              | String | The number of liquidity provider shares.                |

### Arguments

- **contract** (String!): The contract address of the VLP to query.

## Fee 
Queries the fees and fee recipients for the specified VLP.

```graphql
query Vlp($contract: String!) {
  vlp(contract: $contract) {
    fee {
      lp_fee_bps
      euclid_fee_bps
      recipient {
        chain_uid
        address
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
    --data '{"query":"query Vlp($contract: String!) {\n  vlp(contract: $contract) {\n    fee {\n      lp_fee_bps\n      euclid_fee_bps\n      recipient {\n        chain_uid\n        address\n      }\n    }\n  }\n}","variables":{"contract":"wasm1s2lr8u69xammmg3s8hemegcz57y07ae0wa7c7d2adupp6du3neyqk7ee4n"}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGoA2ADgBQAkUEqeAhlCukQMop4CWSA5gEIAlEWAAdJESIA3SlXqMWbInQbdloiVOlEAZggRjJu3ZQD6BhOYBGFAM4nTRBDChkeYS4dsOnpvAQoHgoeZBRjHWciKAALJj5zGE9-ZyYwMED7RyjdAF9Ugp0ivJAAGhAZJl4mGzIEewwQbWlxEEUNVjb0NoB3Jns4AEZ7ACYyPAAOGAA2AE4ADyY4Ff4AZntJ2IREfigALwBWAHYCAAZjpgQz-uOoY7BR9JgKChmwGDWkBAIsAGtjoYACxINplSSlPJAA)

### Arguments

- **contract** (String!): The contract address of the VLP to query.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| lp_fee_bps             | Int    | The liquidity provider fee in basis points (bps).       |
| euclid_fee_bps         | Int    | The Euclid fee in basis points (bps).                   |
| recipient              | [Recipient](#recipient) | The recipient details for the fees.                     |

### Recipient

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| chain_uid              | String | The unique identifier (UID) of the chain.               |
| address                | String | The address of the fee recipient.                       |

## Liquidity 

Queries liquidity information for the specified VLP address.

```graphql
query Liquidity($contract: String!) {
  vlp(contract: $contract) {
    liquidity {
      pair {
        token_1
        token_2
      }
      token_1_reserve
      token_2_reserve
      total_lp_tokens
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Liquidity($contract: String!) {\n  vlp(contract: $contract) {\n    liquidity {\n      pair {\n        token_1\n        token_2\n      }\n      token_1_reserve\n      token_2_reserve\n      total_lp_tokens\n    }\n  }\n}","variables":{"contract":"wasm1s2lr8u69xammmg3s8hemegcz57y07ae0wa7c7d2adupp6du3neyqk7ee4n"}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABADICWOZYZKBAFACRQSp4CGUK6RAyinmSQBzAIQBKIsAA6SIkQBuAGwAOdZqw5ciTFv00TpsuUUUUYVGsUPHjytmTySZNmyggBrZAH0AjM5dybp5IXgBM-jYAvhHGQd4%2BXngIAM748ggxgR7eoYkpaRlGrhAobIpeKl5xSMkx0Ub1kSAANCDybAJsAEaKKRgg1kRSIOp6nMPowwDubMlwPsmhingAHDAAbACcAB5scPtCAMzJKwAWCIhCUABeAKwA7AQADPdsCE8z91D3YKFsYDBlMp1gDDkgEAQsO57ggEAAWJDDZoyJqRIA)

### Arguments

- **contract** (String!): The contract address of the VLP to query.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| pair                   | [Pair](#pair) | The token pair information.                            |
| token_1_reserve        | String | The reserve amount of the first token.                  |
| token_2_reserve        | String | The reserve amount of the second token.                 |
| total_lp_tokens        | String | The total number of liquidity provider tokens.          |

### Pair

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| token_1                | String | The identifier of the first token in the pair.          |
| token_2                | String | The identifier of the second token in the pair.         |

## Simulate Swap

:::danger
ASK ABOUT THIS 
:::

```graphql

```

### Example

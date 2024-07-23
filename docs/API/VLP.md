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
    --data '{"query":"query Vlp($contract: String!, $chainUid: String!) {\n  vlp(contract: $contract) {\n    pool(chain_uid: $chainUid) {\n      reserve_1\n      reserve_2\n      lp_shares\n    }\n  }\n}","variables":{"contract":"wasm1gg6f95cymcfrfzhpek7cf5wl53t5kng52cd2m0krgdlu8k58vd8q4qm6wj","chainUid":"chaine"}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGoA2ADgBQAkUEqeAhlCukQMop4CWSA5gEIANEToALJnwCqPMOy68BggJRFgAHSREiAN0pV6jFmzFHuJtZu06iFCBDKHJfAPow57CVKSywVrVtbPAQAZ3xdBFcARkCgohDwvEjXACY4oMpXUMlEjKIAXziipAKQYRBdJl4mACMyMIwQax0NEHNmVjb2NoB3JlC4aP5%2BADYAMwBOAFYoAjgocbxxgC9xCgQAawB2RenesmmAZhRpzYFp1KgwVLgABk28fjAyGAAOTem33TA3rAAWLBwUa9ABWbWEcTaUBcvjk3SI0NhCAhWjKBSAA)

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
    --data '{"query":"query Vlp($contract: String!) {\n  vlp(contract: $contract) {\n    all_pools {\n      pools {\n        chain_uid\n        pool {\n          reserve_1\n          reserve_2\n          lp_shares\n        }\n      }\n    }\n  }\n}","variables":{"contract":"wasm1gg6f95cymcfrfzhpek7cf5wl53t5kng52cd2m0krgdlu8k58vd8q4qm6wj"}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGoA2ADgBQAkUEqeAhlCukQMop4CWSA5gEIAlEWAAdJESIA3SlXqMWbInQbdloiVOlEmZMgH0KECGQDOYybt0mzl7TZtQAFkz6GYPMNafS7ZFY6ftJ4COb4MgiGAIy%2BIURhEXhRhgBM8SGUhuZuSZk2AL4FRMXBpb5lhSAANCAyTLxMAEZk4RggjkTiIIoarD3sPQDuTOZwMfz8AGwAZgCcAKxQBHBQs3izAF4uFAgA1gDs64vDZIsAzCiL%2BwKLaVBgaXAADPt4-GBkMAAc%2B4s-GRgH5YAAsWDg02GACsejVfD1XO4kABVbyDbq9Nx8BBwyTVQpAA)


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
    --data '{"query":"query Fee($contract: String!) {\n  vlp(contract: $contract) {\n    fee {\n      lp_fee_bps\n      euclid_fee_bps\n      recipient {\n        chain_uid\n        address\n      }\n    }\n  }\n}","variables":{"contract":"wasm1gg6f95cymcfrfzhpek7cf5wl53t5kng52cd2m0krgdlu8k58vd8q4qm6wj"}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGIIIAUAJFBKngIZQrpEDKKeAlkgOYCEASiLAAOkiJEAbgBsADhVr0mLIjTqcVwsRMlEAZuRHi9e%2BQH1DCcwCM5AZxOmiCGFBlcwl8rYdPTeAhQXHJcyCjGus5EUAAWDDzmMJ7%2BzgxgYIH2jlF6AL6pBbpFeSAANCBSDNwMNjII9hggOpKiIEqazG2sbQDuDPZwAIy8vABs%2BgCcAKxQBHBQ%2Bnj6AF6xcggA1gDsi9O9MtMAzCjTm3zTAExQYJdwAAybeLxgMjAAHJvT71Jg71gAFiwcDGvQAVm0yk42nEEkgAKopDBEGHxHgISHiUp5IA)

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
    --data '{"query":"query Vlp($contract: String!) {\n  vlp(contract: $contract) {\n    liquidity {\n      pair {\n        token_1\n        token_2\n      }\n      token_1_reserve\n      token_2_reserve\n      total_lp_tokens\n    }\n  }\n}","variables":{"contract":"wasm1gg6f95cymcfrfzhpek7cf5wl53t5kng52cd2m0krgdlu8k58vd8q4qm6wj"}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGoA2ADgBQAkUEqeAhlCukQMop4CWSA5gEIAlEWAAdJESIA3SlXqMWbInQbdloiVOlEyPHDzA8Uxbbt0UmPPGMkWLKCAGtkAfQCM9h9KeukbgBM3hYAviG6fu4ebngIAM74MggRvi7ugbEJSSk6jhAoTGRulG5RSPER4TrVoSAANCAyTLxMAEZkCRgg5kTiIIoarP3s-QDuTPFwHvz8AGwAZgCcAKxQBHBQC3gLAF4AFhQIzgDsWytjZCsAzCgrzgIrgVBggXAADM54-GBkMAAczhW-xkYH%2BWAALFg4HMxgArfr1SR1UJAA)

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

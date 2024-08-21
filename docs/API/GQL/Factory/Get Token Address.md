---
sidebar_position: 6
---

# Get Token Address

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
    --url 'https://api.euclidprotocol.com/graphql' \
    --data '{"query":"query Factory($chainUid: String!, $vlpAddress: String!) {\n  factory(chain_uid: $chainUid) {\n    get_token_address(vlp_address: $vlpAddress) {\n      token_address\n    }\n  }\n}","variables":{"chainUid":"nibiru","vlpAddress":"nibi1m4ns69zvkk2zv0946mw298tlky5ckvu08rtxggtg29p784kc5sxqa9u8ly"}}'
```
[Open in Playground](https://api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGICGUKEhAFACRQAWZAlkgKotjpEDKKeNgHMAhABoidAG4AbAA4BBMGDwIAzmp79BSUQEoiwADpIiRAGYUqtJqyQB9GFx4NmbTmAPHTZokIQo9lQA1sj2ZMqqGjSycuGR6pqSsUoqiV4mvr4hYRFpGpm%2BAL6FJUhFIGIgUmSCZABGMuoYIN5GILbuXO087Ugs9Sx4MO1iJu0pCQUYfQMsAIxwACxIagBsAJwAXlLBwQBMOwAMG0trcADu%2BxsAHCgywQQArFDBUjBHN3goAB5CQighNc5AB2G5LYJQJ5qH5YMgbGA3GQEdomCpFIA)

### Arguments

- **chainUid** (String!): The unique identifier of the chain to get the address from.
- **vlp_address** (String!): The address of the VLP whose LP token we are fetching.

### Return Fields

| Field            | Type   | Description                               |
|------------------|--------|-------------------------------------------|
| token_address      | String | The contract address of the LP token of the specified VLP.      |
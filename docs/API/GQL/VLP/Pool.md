---
sidebar_position: 1
---

# Pool 
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
    --url 'https://api.staging.euclidprotocol.com/graphql' \
    --data '{"query":"query Vlp($contract: String!, $chainUid: String!) {\n  vlp(contract: $contract) {\n    pool(chain_uid: $chainUid) {\n      reserve_1\n      reserve_2\n      lp_shares\n    }\n  }\n}","variables":{"contract":"wasm1zhhfwhuyyc88jdr5rncn75uf0lf3pta4lwk68d6y7vncyqxxllrqun6zen","chainUid":"nibiru"}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGoA2ADgBQAkUEqeAhlCukQMop4CWSA5gEIANEToALJnwCqPMOy68BggJRFgAHSREiAN0pV6jFmzFHuJtZu06iFCBDKHJfAPow57CVKSywVrVtbPAQAZ3xdBFcARkCgohDwvEjXACY4oMpXUMlEjKIAXziipAKQYRBdJl4mACMyMIwQax0NEHNmVjb2NoB3JlC4aIAvcXEAM17xGAICKAAOeYArMDwAVjwkKCQAdjWYcYAGMnGAZgoUJgAWMl6AawA2ebAHgh3dLYIsAA9vsjI8DgkA9hsg2sI4m0oC5fHJukQ2kgeLUeHgYOCtGUCkA)

### Arguments

- **chainUid** (String!): The unique identifier of the chain that hosts the LP tokens.
- **contract** (String!): The contract address of the VLP to query.

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| reserve_1              | String | The reserve amount of the first token.                  |
| reserve_2              | String | The reserve amount of the second token.                 |
| lp_shares              | String | The number of liquidity provider shares.                |

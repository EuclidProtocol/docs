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
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Get_token_address($vlpAddress: String!, $chainUid: String!) {\n  factory(chain_uid: $chainUid) {\n    get_token_address(vlp_address: $vlpAddress) {\n      token_address\n    }\n  }\n}","variables":{"chainUid":"nibiru","vlpAddress":"nibi147sw04ts68nxe80946m332rr8j79qqvas386al8d76jhamnnr99qj6xnfs"}}'
```
[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAOIIoD6KEA1shQIZhh4IDObAFACQBuANgAcAgs1Yd0RAMoo8ASyQBzAIQAaItygALBgoCqcsJJnylygJRFgAHSREiAMwZRqhTtt1IKMQ5M079Q0sbO3siRXIqWnomFnYuAUFGMXi-RNE4jmDbMLDqOi9Y8TYcsIBfUoqkMpBVEF4GeQYAI352DBAQ%2B2sQD0CwHskepDlmuTwYHtVSnvSUjkGiYdG5AEYAFgB2NgB3AAZ1lDYANgAOJAAPBFO9gE5147gAZieAJjw8U4ArTdusLAabCep2ODH4pzAm2OXx0cCQSDwtz%2BX2OFyQDhKIFsNTKQA)

### Arguments

- **chainUid** (String!): The unique identifier of the chain to get the address from.
- **vlp_address** (String!): The address of the VLP whose LP token we are fetching.

### Return Fields

| Field            | Type   | Description                               |
|------------------|--------|-------------------------------------------|
| token_address      | String | The contract address of the LP token for the specified VLP.      |
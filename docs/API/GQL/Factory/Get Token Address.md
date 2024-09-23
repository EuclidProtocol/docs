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
    --data '{"query":"query Token_info($contract: String!, $chainUid: String!) {\n  cw(contract: $contract, chain_uid: $chainUid) {\n    token_info {\n      name\n      symbol\n      decimals\n      total_supply\n    }\n  }\n}","variables":{"chainUid":"nibiru","contract":"nibi1mn6wlzm9hz72yyz09u98j54k6ceagy6tjnpl4n3k29f6zdsnc8xsthffg6"}}'
```
[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACoQDWyA%2BgJZIBmEAFACRQSp4CGUK6RAZRR46AcwCEAGiJsAFlzoBVGmH5CRSCQEoiwADpIiRKAHcm7Tjz4yLwq9Kjy6VGCv5yFSZWB37DRohQKajpGXQMAgKQuRAjIogBnAjgAIwgAGzjIsAQoGjgudISsgKCUQqoEmAAHavSCEoBfOOakRpBJEAA3LhEuFPSEBIwQPyM9EEdPbwn%2BCaQaFJo8GAnJOInbbl5ZonnFmgBGOCQANhN0gC84AE5ZS4B2ACYCAkuABhuYG4AOACsAKwAFnIpygCC4ogIpxQfyQdSBSAAzOQnjd6KdLmAEkgoD8AB4JFCyej0USnCYGdqNIA)

### Arguments

- **chainUid** (String!): The unique identifier of the chain to get the address from.
- **vlp_address** (String!): The address of the VLP whose LP token we are fetching.

### Return Fields

| Field            | Type   | Description                               |
|------------------|--------|-------------------------------------------|
| token_address      | String | The contract address of the LP token of the specified VLP.      |
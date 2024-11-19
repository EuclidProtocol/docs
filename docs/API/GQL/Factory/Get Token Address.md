---
sidebar_position: 6
---

# Get LP Token Address

Queries the contract address for the LP token of the specified VLP on the specified chain.

```graphql

query Get_LpToken_address($vlpAddress: String!, $chainUid: String!) {
  factory(chain_uid: $chainUid) {
    get_LpToken_address(vlp_address: $vlpAddress) {
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
    --data '{"query":"query Factory($chainUid: String!, $vlpAddress: String!) {\n  factory(chain_uid: $chainUid) {\n    get_LpToken_address(vlp_address: $vlpAddress) {\n      token_address\n    }\n  }\n}","variables":{"chainUid":"stargaze","vlpAddress":"nibi1wqnpwmumkgj4sn36mz7r2m3mwh057ekadn2f3lqu8h2qhmqr2cysapy926"}}'
```
[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGICGUKEhAFACRQAWZAlkgKotjpEDKKeNgHMAhABoidAG4AbAA4BBMGDwIAzmp79BSUQEoiwADpIiRAGYUqtJqyQB9GFx4NmbTmAPHTZokIQo9gAycgAqEADWyPZkyqoaNLJyMXHqmpJJSippXia%2BvlRRDrHZGnm%2BAL7lVUgVIGIgUmSCZABGMuoYIN5mRiC27lx9PH1qKM1CZABeCH1i5X2ZqWUYRH1ILK0sAIwA7lhIcrtw8BFCAFYALGpIAMwAbHBTAOx4AExwt3C7jAAMAKzPBARWJIN7mW4yHAADkYbywjDgWHeUAIajIcgIAE43vc%2BiY6hUgA)

### Arguments

- **chainUid** (String!): The unique identifier of the chain to get the address from.
- **vlp_address** (String!): The address of the VLP whose LP token address we are fetching.

### Return Fields

| **Field**            | **Type**   | **Description**                               |
|------------------|--------|-------------------------------------------|
| `token_address`      | `String` | The contract address of the LP token for the specified VLP.      |
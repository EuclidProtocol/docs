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
    --data '{"query":"query Factory($chainUid: String!, $vlpAddress: String!) {\n  factory(chain_uid: $chainUid) {\n    get_LpToken_address(vlp_address: $vlpAddress) {\n      token_address\n    }\n  }\n}","variables":{"chainUid":"injective","vlpAddress":"euclid1uzvynexu8yk43njlk2uw9ezywandc4ru8tqyekurxcqwfja8t8kqy7gtll"}}'
```
[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGICGUKEhAFACRQAWZAlkgKotjpEDKKeNgHMAhABoidAG4AbAA4BBMGDwIAzmp79BSUQEoiwADpIiRAGYUqtJqyQB9GFx4NmbTmAPHTZokIQo9gAycgAqEADWyPZkyqoaNLJyMXHqmpJJSippXia%2BvlRRDrHZGnm%2BAL7lVUgVIGIgUmSCZABGMuoYIN5mRiC27lx9PH1sAFYIlCxSCH1i5X2ZqWUYRH0IMFAyXACMMABeUgRICAAeMAAcBBEALADMSGMyEQBMMADuAJwI%2BwTvZEgwFAbnhLigsAQEBEYHhTlAsO9zGMyBcUBcIhCAOxCFAyGR9Ex1CpAA)

### Arguments

| **Argument**   | **Type**   | **Description**                                                      |
|----------------|------------|----------------------------------------------------------------------|
| `chainUid`     | `String!`  | The unique identifier of the chain to get the address from.         |
| `vlpAddress`   | `String!`  | The address of the VLP whose LP token address we are fetching.      |

### Return Fields

| **Field**            | **Type**   | **Description**                               |
|------------------|--------|-------------------------------------------|
| `token_address`      | `String` | The contract address of the LP token for the specified VLP.      |
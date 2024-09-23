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
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Pool($chainUid: String!, $contract: String!) {\n  vlp(contract: $contract) {\n    pool(chain_uid: $chainUid) {\n      reserve_1\n      reserve_2\n      lp_shares\n    }\n  }\n}","variables":{"chainUid":"nibiru","contract":"nibi147sw04ts68nxe80946m332rr8j79qqvas386al8d76jhamnnr99qj6xnfs"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAAoQQA2AFACRQAWAhgJZICqzY6RAyinqwDmAQgA0ROhFR5GUFNz4CkIgJRFgAHSREiANwoAHKlCn9Z8iSenm1m7TqIHy1BiyQB9GJ250mrDmC2Wg4OeAgAzvi6CO4AjMEhRGGReNHuAEwJIYbu4UzJWUQAvgklSEUgoiC6jAKMAEYUERggdjoaIK7%2BnB3cHUjM9cx4MB2iCR1WZnK9RP2DzLEALADs4QDuAAxLKOEAbAAcSAAeCAebAJxLe3AAzLfpeHgHAFYrF1hYNeG3B3uMFAOYBWexeTDgSCQeAuHxee2OSAAZuEOloKkUgA)

### Arguments

- **chainUid** (String!): The unique identifier of the chain that hosts the LP tokens.
- **contract** (String!): The contract address of the VLP to query.

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| reserve_1              | String | The reserve amount of the first token.                  |
| reserve_2              | String | The reserve amount of the second token.                 |
| lp_shares              | String | The number of liquidity provider shares.                |

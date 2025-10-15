---
sidebar_position: 1
---

# Token Metadatas

Queries a list of tokens and their metadata, including price, volume, tags, DEX listings, and more. Supports filters like verification, chains, DEXs, and text search.

```graphql
query Token(
  $limit: Int,
  $offset: Int,
  $verified: Boolean,
  $dex: [String!],
  $chainUids: [String!],
  $showVolume: Boolean,
  $search: String
) {
  token {
    token_metadatas(
      limit: $limit,
      offset: $offset,
      verified: $verified,
      dex: $dex,
      chain_uids: $chainUids,
      show_volume: $showVolume,
      search: $search
    ) {
      coinDecimal
      displayName
      tokenId
      description
      image
      price
      price_change_24h
      price_change_7d
      dex
      chain_uids
      total_volume
      total_volume_24h
      tags
      min_swap_value
      social
      is_verified
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Token($dex: [String!], $limit: Int, $chainUids: [String!]) {\n  token {\n    token_metadatas(dex: $dex, limit: $limit, chain_uids: $chainUids) {\n      coinDecimal\n      displayName\n      tokenId\n      description\n      image\n      price\n      price_change_24h\n      price_change_7d\n      dex\n      chain_uids\n      total_volume\n      total_volume_24h\n      tags\n      min_swap_value\n      social\n      is_verified\n    }\n  }\n}","variables":{"dex":["euclid","osmosis"],"limit":100,"chainUids":["archway","osmosis","megaeth","bsc"]}}'
```
[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACoQDWyAFACRQAWAhgJZICqzYAzukQNoBlFHlYBzAIQBdADREaAG2ZxmKXgElUsmmAQAPXoOFipASiLAAOkiJEUFZOas2bdykgD6iFIzCNvXKgYWDxhOHjkg1g5uWUVlVTk4lVkdfTlUs0trZxsoCFYAEQQoJUZ5JxyiMGYuAAd5RgIAOUZECpzXZDUwducdLigRWpRmCCRem1LRBAmiWpEoGeyc%2BeZF9yCkafcAJgAWelnV9c3tgHYe5b69WciQsNm7b3l3ADcIeXglytsIZ7ePl9dgdHoxRFxZsoPFwAO6MWpvMq4WZcaDMMqzGpvfDMABmzAQlxyAF8KqSkMSQNIQK9GCJGAAjeQILgYEBZGwWcA3DD8LkIGBQRQ9KlciBcODimpcmQVLlJFBc3gARgADKrpHKQHdohDeXwuXSGHCCFzNSBxZKuNLRSBEKJGAgUIdbQyBjKrJTiUA)

### Arguments

| **Argument**      | **Type**         | **Description**                                                      |
|-------------------|------------------|----------------------------------------------------------------------|
| `limit`           | `Int`            | Optional limit for pagination.                                       |
| `offset`          | `Int`            | Optional offset for pagination.                                      |
| `verified`        | `Boolean`        | If true, only return verified tokens.                                |
| `dex`             | `[String!]`      | Filter tokens by DEX identifiers. Currently `euclid`, `osmosis` and `astroport.neutron` dexes exist.                                    |
| `chainUids`       | `[String!]`      | Filter tokens by the chains they're deployed on.                     |
| `showVolume`      | `Boolean`        | Whether to include volume-related fields in the result.              |
| `search`          | `String`         | Search by token name or symbol.                                      |

### Return Fields

| **Field**            | **Type**        | **Description**                                                  |
|----------------------|-----------------|------------------------------------------------------------------|
| `coinDecimal`        | `Int`           | Number of decimal places for the token.                          |
| `displayName`        | `String`        | Human-readable token name.                                       |
| `tokenId`            | `String`        | Unique token ID used internally.                                 |
| `description`        | `String`        | Token description.                                               |
| `image`              | `String`        | Image URL for the token icon.                                    |
| `price`              | `String`        | Current price of the token.                                      |
| `price_change_24h`   | `Float`         | Percentage change in price over the last 24 hours.               |
| `price_change_7d`    | `Float`         | Percentage change in price over the last 7 days.                 |
| `dex`                | `[String]`      | List of DEXs where the token is traded.                          |
| `chain_uids`         | `[String]`      | List of chain identifiers the token is available on.             |
| `total_volume`       | `Float`         | Total trading volume of the token.                               |
| `total_volume_24h`   | `Float`         | 24-hour trading volume of the token.                             |
| `tags`               | `[String]`      | Any associated tags (e.g., "unverified").                        |
| `min_swap_value`     | `Float`         | Minimum value required for swapping the token.                   |
| `social`             | `Object`        | Social metadata (e.g., links to Twitter, Discord, etc.).         |
| `is_verified`        | `Boolean`       | Indicates whether the token is verified.                         |
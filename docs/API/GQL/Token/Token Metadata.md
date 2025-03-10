---
sidebar_position: 1
---

# Token Metadatas

Queries token metadata information for all tokens.

```graphql
query Token($limit: Int, $offset: Int, $dex: [String!], $chainUids: [String!]) {
  token {
    token_metadatas(limit: $limit, offset: $offset, dex: $dex, chain_uids: $chainUids) {
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
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://devnet-testing.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Token($limit: Int, $offset: Int, $dex: [String!], $chainUids: [String!]) {\n  token {\n    token_metadatas(limit: $limit, offset: $offset, dex: $dex, chain_uids: $chainUids) {\n      coinDecimal\n      displayName\n      tokenId\n      description\n      image\n      price\n      price_change_24h\n      price_change_7d\n      dex\n      chain_uids\n    }\n  }\n}","variables":{"limit":null,"offset":null,"dex":null,"chainUids":"injective"}}'
```
[Open in Playground](https://devnet-testing.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACoQDWyAFACQA2AlnAyukQJKoA0RNEAZvwDOCVh268wCAB5sA2gGUUeBkgDmAQgC6PGlAAWAQ1UBVBmCHylK9doCURYAB0kRIigrJHLt24%2BUkAH1EFEMwQ1ChKkZmMXomFh4BYVE2PkERFB4pWUkZHgNjIJhzS15C01KHZ1dfNygIVQARBCgmQzofOqIwBiEABzpDAgA5Q0Quuv9kdjBJ3ykhKBV%2BlAYIJHm3drUELaJ%2BlSg92rrDhmPAwvUEQIAmABZ9ffPL693AgHY504WZfYqxVK8wAvl0wUgQSAQUA)

### Arguments

- **limit** (Int): Optional limit to the number of results to return.
- **offset** (Int): Optional number of tokens to skip before starting to return the result set. Used for pagination.
- **dex** ([String!]): Optional list of DEX identifiers to filter the token metadata.
- **chainUids** ([String!]): Optional list of chain UIDs to filter the token metadata.

### Return Fields

| **Field**           | **Type**   | **Description**                                                           |
|---------------------|------------|---------------------------------------------------------------------------|
| `coinDecimal`       | `Int`      | The number of decimal places used by the token.                           |
| `displayName`       | `String`   | The display name of the token.                                            |
| `tokenId`           | `String`   | The unique identifier for the token.                                      |
| `description`       | `String`   | A brief description of the token.                                         |
| `image`             | `String`   | URL to the token's image.                                                 |
| `price`             | `Float`    | The current price of the token in USD.                                           |
| `price_change_24h`  | `Float`    | The token's price change over the past 24 hours.                          |
| `price_change_7d`   | `Float`    | The token's price change over the past 7 days.                            |
| `dex`               | `String`   | The decentralized exchanges where the token is traded.                   |
| `chain_uids`        | `[String]` | A list of chain UIDs where the token is available.                        |
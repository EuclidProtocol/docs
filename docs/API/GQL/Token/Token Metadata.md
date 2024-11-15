---
sidebar_position: 1
---

# Token Metadata

Queries token metadata information for all tokens.

```graphql
query Token_metadatas($limit: Int, $offset: Int) {
  token {
    token_metadatas(limit: $limit, offset: $offset) {
      coinDecimal
      displayName
      tokenId
      description
      image
      price
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Token {\n  token {\n    token_metadatas {\n      coinDecimal\n      displayName\n      tokenId\n      description\n      image\n      price\n    }\n  }\n}"}'
```
[Open in Playground](https://testnet.api.euclidprotocol.com?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACoQDWyRwAOkkUShVbfQ480gPqIoCGYPvwDO1Ou3ZQIASyQARBFGlw%2BAG3ESiYacIAOqvgQByfRBolNKSAJJhz7MAmFQ803SmkQk9hsr4BzBB8iXVcoILYGAF8NGKQokAAaEAA3Plc%2BACNVJwwQECigA)

### Arguments

- **limit** (Int): Optional limit to the number of results to return.
- **offset** (Int): Optional number of tokens to skip before starting to return the result set. Used for pagination.

### Return Fields

| **Field**         | **Type**   | **Description**                                     |
|---------------|--------|-------------------------------------------------|
| `coinDecimal`   | `Int`    | The number of decimal places for the token.     |
| `displayName`   | `String` | The display name of the token.                  |
| `tokenId`       | `String` | The unique identifier of the token.             |
| `description`   | `String` | A brief description of the token.               |
| `image`         | `String` | URL to an image representing the token.         |
| `price`         | `String`  | The current price of the token in USD.                 |
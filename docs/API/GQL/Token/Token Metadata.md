---
sidebar_position: 1
---

# Token Metadata

Queries token metadata information for all tokens.

```graphql
query Token {
  token {
    token_metadatas {
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

### Return Fields

| Field         | Type   | Description                                     |
|---------------|--------|-------------------------------------------------|
| coinDecimal   | Int    | The number of decimal places for the token.     |
| displayName   | String | The display name of the token.                  |
| tokenId       | String | The unique identifier of the token.             |
| description   | String | A brief description of the token.               |
| image         | String | URL to an image representing the token.         |
| price         | Float  | The current price of the token.                 |
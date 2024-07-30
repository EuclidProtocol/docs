---
sidebar_position: 3
---

# Token Metadata

Queries token metadata information for all tokens.

```graphql
query Chains {
  chains {
    token_metadata {
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
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Chains {\n  chains {\n    token_metadata {\n      coinDecimal\n      displayName\n      tokenId\n      description\n      image\n      price\n    }\n  }\n}"}'
```
[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMIAWAhgJZIDORwAOkkUVJTfUy60ShAGtkAfUQoKYCuIbNevKBBoARBFCpwKAG1lyiYKrQAOmigQByFRDrn8hSAJJhrvMAlpQ8VQyioQkz1nUKAHMEAKJDTygwnlYAXx0EpDiQABoQADcKTwoAI003DBAQOKA)

### Return Fields

| Field         | Type   | Description                                     |
|---------------|--------|-------------------------------------------------|
| coinDecimal   | Int    | The number of decimal places for the token.     |
| displayName   | String | The display name of the token.                  |
| tokenId       | String | The unique identifier of the token.             |
| description   | String | A brief description of the token.               |
| image         | String | URL to an image representing the token.         |
| price         | Float  | The current price of the token.                 |
---
sidebar_position: 2
---
# Token Metadata by Id

Queries token metadata information for the specified token Id.

```graphql
query Token($tokenId: String!) {
  token {
    token_metadata_by_id(token_id: $tokenId) {
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
    --data '{"query":"query Token($tokenId: String!) {\n  token {\n    token_metadata_by_id(token_id: $tokenId) {\n      coinDecimal\n      displayName\n      tokenId\n      description\n      image\n      price\n    }\n  }\n}","variables":{"tokenId":"usdt"}}'
```
[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACoQDWyAFACQoXICSY6RAyingJZIDmAhAEoiwADpIiRepQliJkqQyQB9RCgCGYdRuUAjAsq5gq05IZZE6S5sLkKFUCDwAiCKFzjqANuPuSwXADOAA5e6gQAcuqIvn6mSMyx9mAIgVDcwShcEEhJCh7qvAh5ksHcUMXykgC%2BsbVI1SAANCAAburc6rpeqRggdkSiIPGJGIMgMIFgKEPijdVAA)

### Return Fields

| Field         | Type   | Description                                     |
|---------------|--------|-------------------------------------------------|
| coinDecimal   | Int    | The number of decimal places for the token.     |
| displayName   | String | The display name of the token.                  |
| tokenId       | String | The unique identifier of the token.             |
| description   | String | A brief description of the token.               |
| image         | String | URL to an image representing the token.         |
| price         | Float  | The current price of the token in dollars.                |
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
    --data '{"query":"query Token($tokenId: String!) {\n  token {\n    token_metadata_by_id(token_id: $tokenId) {\n      coinDecimal\n      displayName\n      tokenId\n      description\n      image\n      price\n      price_change_24h\n      price_change_7d\n      dex\n      chain_uids\n    }\n  }\n}","variables":{"tokenId":"usdc"}}'
```
[Open in Playground](https://devnet-testing.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACoQDWyAFACQoXICSY6RAyingJZIDmAhAEoiwADpIiRepQliJkqQyQB9RCgCGYdRuUAjAsq5gq05IZZE6S5sLkKFUCDwAiCKFzjqANuPuSwXADOAA5e6gQAcuqIvn6mSMyx9mAIgVDcwShcEEhJCh7qvAh5ksHcUMXy9mVcFcpQABbqfAjKAEwALA0lRDV1jc1FygDsYD0pAB49AzzKMEaBeQC%2BsStISyBLQA)

### Arguments

- **tokenId** (String!): The unique identifier for the token.

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
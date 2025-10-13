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
    --data '{"query":"query Token($tokenId: String!) {\n  token {\n    token_metadata_by_id(token_id: $tokenId) {\n      coinDecimal\n      displayName\n      tokenId\n      description\n      image\n      price\n      price_change_24h\n      price_change_7d\n      dex\n      chain_uids\n      total_volume\n      total_volume_24h\n      tags\n      min_swap_value\n      social\n      is_verified\n    }\n  }\n}","variables":{"tokenId":"euclid"}}'
```
[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACoQDWyAFACQoXICSY6RAyingJZIDmAhAEoiwADpIiRepQliJkqQyQB9RCgCGYdRuUAjAsq5gq05IZZE6S5sLkKFUCDwAiCKFzjqANuPuSwXADOAA5e6gQAcuqIvn6mSMyx9mAIgVDcwShcEEhJCh7qvAh5ksHcUMXy9mVcFcpQABbqfAjKAEwALA0lRDV1jc1FygDsYD0pAB49AzzKMEaBPfQaXsoAbhBe8JV%2Biivrm9vtXUuFi1UKcLOBAO7qweveuD2B0FzePUHr%2BFwAZlwIMYXAC%2BsVBSGBIAANCA1upuOpdF5UhgQHYiKIQPFEhgMSAEDAoF4jJjxJDgUA)

### Arguments

| **Argument**   | **Type**      | **Description**                                 |
|----------------|---------------|-------------------------------------------------|
| `tokenId`      | `String!`     | The unique ID of the token.                    |
| `verified`     | `Boolean`     | Whether to query verified token metadata only. |

### Return Fields

| **Field**            | **Type**            | **Description**                                             |
|----------------------|---------------------|-------------------------------------------------------------|
| `coinDecimal`        | `Int`               | The number of decimals for the token.                      |
| `displayName`        | `String`            | Human-readable name of the token.                          |
| `tokenId`            | `String`            | Internal identifier of the token.                          |
| `description`        | `String`            | Description of the token.                                  |
| `image`              | `String`            | URL to the token's image.                                  |
| `price`              | `String`            | Current price of the token.                                |
| `price_change_24h`   | `Float`             | Price change percentage in the last 24 hours.              |
| `price_change_7d`    | `Float`             | Price change percentage in the last 7 days.                |
| `dex`                | `[String]`          | List of DEXs where this token is available.                |
| `chain_uids`         | `[String]`          | Chains on which the token exists.                          |
| `total_volume`       | `Float`             | Lifetime trade volume of the token.                        |
| `total_volume_24h`   | `Float`             | Trade volume in the last 24 hours.                         |
| `tags`               | `[String]`          | Associated tags for the token.                             |
| `min_swap_value`     | `Float`             | Minimum value required for a swap.                         |
| `social`             | `JSON/Object`       | Social links or metadata (structure may vary).             |
| `is_verified`        | `Boolean`           | Whether the token is verified by the protocol.             |
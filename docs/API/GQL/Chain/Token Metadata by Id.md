---
sidebar_position: 4
---
# Token Metadata by Id

Queries token metadata information for the specified token Id.

```graphql
query Token_metadata_by_Id($tokenId: String!) {
  chains {
    token_metadata_by_Id(token_id: $tokenId) {
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
    --data '{"query":"query Token_metadata_by_Id($tokenId: String!) {\n  chains {\n    token_metadata_by_Id(token_id: $tokenId) {\n      coinDecimal\n      displayName\n      tokenId\n      description\n      image\n      price\n    }\n  }\n}","variables":{"tokenId":"usdt"}}'
```
[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACoQDWyA%2BoigIZh31UBGBVAkmABQAkKFZF3REAyijwBLJAHMAhAEoiwADpIiRKAAs60gM7K1GjQMpIaCeo2ZtOPU9UlgR-QUi5LV64xqgRpACIIUJJwdAA2Rj5EYJJ6AA7hdAQAcnSIUT4O7mCZxmAIelBS8SiSEEh5GqF0MghVRPFSUPXeGgC%2BUZ1I7SAANCAAbnRSdCzhhRggXhoqINlccyJzMHpgKHNqve1AA)

### Return Fields

| Field         | Type   | Description                                     |
|---------------|--------|-------------------------------------------------|
| coinDecimal   | Int    | The number of decimal places for the token.     |
| displayName   | String | The display name of the token.                  |
| tokenId       | String | The unique identifier of the token.             |
| description   | String | A brief description of the token.               |
| image         | String | URL to an image representing the token.         |
| price         | Float  | The current price of the token in dollars.                |
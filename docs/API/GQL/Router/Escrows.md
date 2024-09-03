---
sidebar_position: 6
---
# Escrows
Queries the chain UID that contain an escrow with the specified token.
```graphql
query Escrows($token: String!, $max: String, $min: String, $skip: Int, $limit: Int) {
  router {
    escrows(token: $token, max: $max, min: $min, skip: $skip, limit: $limit) {
      chain_uid
      balance
      chain_id
    }
  }
}
```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.euclidprotocol.com/graphql' \
    --data '{"query":"query Escrows($token: String!, $max: String, $min: String, $skip: Int, $limit: Int) {\n  router {\n    escrows(token: $token, max: $max, min: $min, skip: $skip, limit: $limit) {\n      chain_uid\n      balance\n      chain_id\n    }\n  }\n}","variables":{"token":"usdt","limit":3,"max":null,"min":"nibiru","skip":null}}'
```

[Open in Playground](https://api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAKIDOUeEA7mQBQAkKEA1sukQMop4CWSAcwCEAGiIM4AQwAeHbn0FiJ-OT34ClZFrwAOHAJKolAG15xeKA6gCURYAB0kRIlRgp8dx8%2BcIKVWnTMbEgcTKzIYlKy4lGRKjH8Ylq6ock6YqbmluKZFrYOTt7OUAAWkvwA%2BjC8YF5FRABGksaSSFAIdUWl5UgVNZ1EAL51w0iDICIgAG6SfJINxr4YIAXO9iBByOsc6zBkYCjrInXruYcYRADMx4XrUdtESDDGxjdrIOZID%2BtIvA28eBgRxOIDSDyeL0c40GQA)

### Arguments

- **token** (String!): The identifier of the token.
- **max** (ChainUID): The upper limit chain UID that should be returned. Does not include the specified max value.
- **min** (ChainUID): The lower limit chain UID to start from. Includes the specified min value.
- **skip** (Int): The number of results to skip in the resonse.
- **limit** (Int): The maximum number of results to return.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| escrows                | [String] | The list of escrow identifiers.                           |
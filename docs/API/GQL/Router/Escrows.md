---
sidebar_position: 6
---
# Escrows
Queries the chain UID that contain an escrow with the specified token. Returns information on the escrow if found.

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
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Escrows($token: String!) {\n  router {\n    escrows(token: $token) {\n      chain_uid\n      balance\n      chain_id\n    }\n  }\n}","variables":{"token":"euclid"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAKIDOUeEA7mQBQAkKEA1sukQMop4CWSAcwCEASiLAAOkiJEqMFPnFSZMhBSq06zNkg5NWyMZOkqZUABYBDfgH0YvMMtNEARpYA2lpFARPTF6yQbBz8iAF8nCKQwkAAaEAA3Sz5LF3c1DBBjGQkQbWRcjlyEGCh3EJApGLCgA)

### Arguments

- **token** (String!): The identifier of the token.
- **max** (ChainUID): The upper limit chain UID that should be returned. Does not include the specified max value.
- **min** (ChainUID): The lower limit chain UID to start from. Includes the specified min value.
- **skip** (Int): The number of results to skip in the resonse.
- **limit** (Int): The maximum number of results to return.

### Return Fields

| Field Name  | Type     | Description                                      |
|-------------|----------|--------------------------------------------------|
| `chain_uid` | `String` | The UID of the chain that has an escrow for the specified token. |
| `balance`   | `String`  | The current amount of tokens held in the escrow.   |
| `chain_id`  | `String`    | The Id of the chain that has an escrow for the specified token.   |
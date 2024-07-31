---
sidebar_position: 6
---
# Escrows
Queries the chain UID that contain an escrow with the specified token.
```graphql
query Router($token: String!, $start: String, $end: String, $skip: Int, $limit: Int) {
  router {
    escrows(token: $token, start: $start, end: $end, skip: $skip, limit: $limit)
  }
}
```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/graphql' \
    --data '{"query":"query Router($token: String!) {\n  router {\n    escrows(token: $token) {\n      chain_id\n      chain_uid\n    }\n  }\n}","variables":{"token":"usdt"}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAEoQwr4AUAJChANbLpEDKKeAlkgOYCEASiLAAOkiJE85SnmFiJEhAGcoUgO5Kq9JkhZ1GyIaPEKJUABYBDbgH1OYeaaIXrSGzHuOJAX0e%2Bk3iAANCAAbpZclgBGADbKGCDGEiIg2sgpLCkwSmAoKUFigd5AA)

### Arguments

- **token** (String!): The identifier of the token.
- **start** (String): The starting escrow identifier. Used for pagination.
- **end** (String): The ending escrow identifier. Used for pagination.
- **skip** (Int): The number of escrows to skip in the result set.
- **limit** (Int): The maximum number of escrows to return.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| escrows                | [String] | The list of escrow identifiers.                           |
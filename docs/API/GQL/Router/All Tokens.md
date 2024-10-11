---
sidebar_position: 3
---
# All Tokens
Queries all the tokens availabe in the Euclid layer.

```graphql
query All_tokens($max: String, $min: String, $skip: Int, $limit: Int) {
  router {
    all_tokens(max: $max, min: $min, skip: $skip, limit: $limit) {
      tokens
    }
  }
}
```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query All_tokens($max: String, $min: String, $skip: Int, $limit: Int) {\n  router {\n    all_tokens(max: $max, min: $min, skip: $skip, limit: $limit) {\n      tokens\n    }\n  }\n}","variables":{"max":"stars","min":"euclid","skip":null,"limit":7}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAIIA2ZA%2BihANbIDOAFACRwCGAHukQMop4AlkgDmAGiJthPfkNESWDWoIAOPAJKoFZQXEEoNqAJRFgAHSREieCDBT5TFq1fYVqdRkw7dJ3iXqQeKSQJJVUgsJUJHT0DSRj9E3NLZysaeiQGJ2cAX2y8pByQMRAAN3YhdgAjMgQGDBBkqzMQbxaeFoYUCqzi7JaA9qIWhBgoHTAWsX6QSKGkGApplJaElCGAdgsinKA)


### Arguments

- **max** (Token Id): The upper limit token Id that should be returned. Does not include the specified max value.
- **min** (Token Id): The lower limit token Id to start from. Includes the specified min value.
- **skip** (Int): The number of results to skip in the response.
- **limit** (Int): The maximum number of results to return.

### Return Fields

| **Field**                  | **Type**   | **Description**                                             |
|------------------------|--------|---------------------------------------------------------|
| `token`                  | `String` | The Id of the token.                            |

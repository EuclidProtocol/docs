---
sidebar_position: 3
---
# All Tokens
Queries all the tokens and their respective chain UIDs within the router.

```graphql
query Router($start: String, $end: String, $skip: Int, $limit: Int) {
  router {
    all_tokens(start: $start, end: $end, skip: $skip, limit: $limit) {
      tokens {
        token
        chain_uid
      }
    }
  }
}
```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query All_tokens($max: String, $min: String, $skip: Int, $limit: Int) {\n  router {\n    all_tokens(max: $max, min: $min, skip: $skip, limit: $limit) {\n      tokens {\n        token\n        chain_uid\n      }\n    }\n  }\n}","variables":{"limit":null,"max":"stars","min":"nibi","skip":1}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAIIA2ZA%2BihANbIDOAFACRwCGAHukQMop4AlkgDmAGiJthPfkNESWDWoIAOPAJKoFZQXEEoNqAJRFgAHSREieCDBT5TFq1fYVqdRkw7dJ3iXqQeKSQJJVUgsJUJHT0DSRj9E3NLZysaeiQGRxTUtI8kJ1yrKAALdmFKGEEwQtSAX1qiBpTmupAxEAA3diF2ACMyBAYMEGSrMxAElAmeJBgKMUKJ7xmiCYYUHoYJxZTl4VWJpEE%2BwR2lkEjVgEYLNrqgA)


### Arguments

- **max** (Token Id): The upper limit token Id that should be returned. Does not include the specified max value.
- **min** (Token Id): The lower limit token Id to start from. Includes the specified min value.
- **skip** (Int): The number of results to skip in the response.
- **limit** (Int): The maximum number of results to return.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| tokens                 | [TokenInfo](#tokeninfo) | The tokens within the router contract.                  |

### TokenInfo

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| token                  | String | The identifier of the token.                            |
| chain_uid              | String | The unique identifier (UID) of the chain.               |
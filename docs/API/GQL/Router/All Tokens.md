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
    --url 'https://api.staging.euclidprotocol.com/graphql' \
    --data '{"query":"query Router($start: String, $end: String, $skip: Int, $limit: Int) {\n  router {\n    all_tokens(start: $start, end: $end, skip: $skip, limit: $limit) {\n      tokens {\n        token\n        chain_uid\n      }\n    }\n  }\n}","variables":{"start":null,"end":null,"skip":null,"limit":null}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAEoQwr4AUAJAM4oCGeK6RAyingJZIDmAGiI1kYNpx78h9ANbcADmwCSqaQBtucbqyIqUASiLAAOkiJE85SniOnz5xmrUB9FBBnI6VBsx30mLEKibCJIYEJ0corCkQpCGlp%2BCdqGJmb25m4eSHS26RmZ7sh2BeZQABaMvM4w3GAlGQC%2BDUTN6W2NIAIgAG7M3IwARmoIdBggacYgPixTbEgwTgKmU6JzRAtLK9NR65tqy0hTySh7iwemnY1AA)


### Arguments

- **start** (String): The starting token identifier. Used for pagination.
- **end** (String): The ending token identifier. Used for pagination.
- **skip** (Int): The number of tokens to skip in the result set.
- **limit** (Int): The maximum number of tokens to return.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| tokens                 | [TokenInfo](#tokeninfo) | The tokens within the router contract.                  |

### TokenInfo

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| token                  | String | The identifier of the token.                            |
| chain_uid              | String | The unique identifier (UID) of the chain.               |
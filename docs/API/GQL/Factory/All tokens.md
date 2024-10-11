---
sidebar_position: 3
---

# All Tokens

Queries all tokens associated with a factory contract for a specific chain UID.


```graphql
query All_tokens($chainUid: String!, $limit: Int, $offset: Int) {
  factory(chain_uid: $chainUid) {
    all_tokens(limit: $limit, offset: $offset) {
      tokens
      pagination {
        total_count
        limit
        offset
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
    --data '{"query":"query All_tokens($chainUid: String!, $limit: Int, $offset: Int) {\n  factory(chain_uid: $chainUid) {\n    all_tokens(limit: $limit, offset: $offset) {\n      tokens\n      pagination {\n        total_count\n        limit\n        offset\n      }\n    }\n  }\n}","variables":{"chainUid":"nibiru","limit":7,"offset":null}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAIIA2ZA%2BihANbIDOAFACRQAWAhgJZICq3MOiIBlFHl4BzAIQAaIizLc43FMICSqeSwgAzXQwRqimlAEoiwADpIiRXZyg1CTDjySUYg4Wy68BYBbWtnZEnBTUdIxMSirGisqq8noGRj4phuaWNqGhNPRIDDm5RAAOnJK8nCjcELbBJXkQKOGUUBAwqMWNsardJRlG-XYAvv1jIRMjILIgAG6cEpwARmQIDBggDURWIG7%2BgrvCu0jcy9x4MLuyxbu9KEdEAOw3IbuDDxhESDAUNtMjIA)


### Arguments

- **chainUid** (String!): The unique identifier of the chain.
- **limit** (Int): Optional limit to the number of results to return.
- **offset** (Int): Optional number of tokens to skip before starting to return the result set. Used for pagination.

### Return Fields

| **Field**       | **Type**   | **Description**                             |
|-------------|--------|-----------------------------------------|
| `tokens`      | `[String]` | The list of tokens.        |
| `total_count` | `Int`    | The total number of token pairs (pools) available.      |
| `limit`       | `Int`    | The maximum number of pools returned per request. |
| `offset`      | `Int`    | The number of pools to skip before starting to return the result set. |
---
sidebar_position: 3
---

# All Tokens

Queries all tokens associated with a factory contract on a specified blockchain.


```graphql
query Factory($chainUid: String!) {
  factory(chain_uid: $chainUid) {
    all_tokens {
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
    --data '{"query":"query Factory($chainUid: String!) {\n  factory(chain_uid: $chainUid) {\n    all_tokens {\n      tokens\n    }\n  }\n}","variables":{"chainUid":"nibiru"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGICGUKEhAFACRQAWZAlkgKotjpEDKKeNgHMAhAEoiwADpIiRAGYUqtJqyQB9GFx4NmbTmAnTZcomQA259VQDWyAM6SZp07YfPTAXw-eknkAA0IABuZIJkAEbmCPYYIMZyUiCq%2BlxJPElILBEseDBJMv6eQA)


### Arguments

- **chainUid** (String!): The unique identifier of the chain.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| all_tokens             | [AllTokens](#alltokens) | All token information associated with the factory.       |

### AllTokens

| Field       | Type   | Description                             |
|-------------|--------|-----------------------------------------|
| tokens      | [String] | The list of tokens.        |
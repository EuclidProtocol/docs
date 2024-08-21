---
sidebar_position: 1
---

# Balance

Queries the amount of CW20 tokens held by the specified user for the specified contract address and chain.

```graphql
query Cw($contract: String!, $chainUid: String!, $address: String!) {
  cw(contract: $contract, chain_uid: $chainUid) {
    balance(address: $address) {
      balance
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.euclidprotocol.com/graphql' \
    --data '{"query":"query Cw($contract: String!, $chainUid: String!, $address: String!) {\n  cw(contract: $contract, chain_uid: $chainUid) {\n    balance(address: $address) {\n      balance\n    }\n  }\n}","variables":{"contract":"wasm1rluylt6fnh5a55szyuh2qsg69nfsgcwm5faq8ujesdtd0yfugnkq2ft2ax","chainUid":"ethereum","address":"wasm14hcxlnwlqtq75ttaxf674vk6mafspg8xv03ktg"}}'
```
[Open in Playground](https://api.euclidprotocol.com?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMIDuAFACRQSp4CGUK6RAyingJZIDmAhABoiNABYMeAVS5hWHbnyEiGYMHgQBnDXM48BASiLAAOkiJEolWvSYsR1zreFRxPAPowZrMRKTSwhiZm5kQARgwANgxIUAgUKmqa2sqq6lqBpiEh4VExCJkhAL4FxUiFIIIgAG4M3AyhEZoYIEHmxiAOjMztrO1kDBpwAIx4ETAEESgAbABmSKIArAwLCxoAXgQwogBMWBq8UwCcSDP7lnALMwxYABwwAFaaYChgAAwEMzC8SADWWNszFDbBgAD3aggK7Rcvn8PSI7QQKFE%2BAQ8HBkJACTSGjhfQGwwALKIoCCIkgyBEsCgsAB2BYoFCgmZTGkEqo-KZwBinAAOvBuIKqrwAzD8ULx2qZyoUgA)

### Return Fields

| Field         | Type   | Description                                     |
|---------------|--------|-------------------------------------------------|
| Balance   | String    | The number of LP tokens held by the user.    |

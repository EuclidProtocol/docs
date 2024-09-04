---
sidebar_position: 1
---

# Token Info

Queries token information for the specified CW20 address and chain.

```graphql
query Cw($contract: String!, $chainUid: String!) {
  cw(contract: $contract, chain_uid: $chainUid) {
    token_info {
      name
      symbol
      decimals
      total_supply
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.euclidprotocol.com/graphql' \
    --data '{"query":"query Cw($contract: String!, $chainUid: String!) {\n  cw(contract: $contract, chain_uid: $chainUid) {\n    token_info {\n      name\n      symbol\n      decimals\n      total_supply\n    }\n  }\n}","variables":{"contract":"wasm1rluylt6fnh5a55szyuh2qsg69nfsgcwm5faq8ujesdtd0yfugnkq2ft2ax","chainUid":"ethereum"}}'
```
[Open in Playground](https://api.euclidprotocol.com?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMIDuAFACRQSp4CGUK6RAyingJZIDmAhABoiNABYMeAVS5hWHbn34BKIsAA6SIkSiVa9JixF7OB4VHE8A%2BjBmsxEpNLAr1mrURQQA1sks8AZhCqGu7uSAyIIaFEAM4EcABGEAA2UaFgCFBccAzJMWnunii5ljEwAA7lyQQFAL5R9Ui1IIIgAG4M3AwJyQgxGCCuWmogxozMI6wjZAwxcACMeMkwBMkoAGz%2BSKIArAw7OzEAXgQwogBMWDG86wCcSP7XOnA7-gxYABwwAFZ9YChgAAMBH8MF4SC8WHO-hQ5wYAA8RoIoiNzA4nJMiCMEChRPgEPAkRpmrUgA)

### Return Fields

| Field        | Type     | Description                          |
|--------------|----------|--------------------------------------|
| name         | `String` | The name of the token.          |
| symbol       | `String` | The symbol of the token.        |
| decimals     | `u8`     | The number of decimal places of the token. |
| total_supply | `Uint128`| The total supply of the token.  |
---
sidebar_position: 1
---

# Balance

Queries the amount of CW20 tokens held by the specified user for the specified address and chain.

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
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Cw($contract: String!, $chainUid: String!) {\n  cw(contract: $contract, chain_uid: $chainUid) {\n    token_info {\n      name\n      symbol\n      decimals\n      total_supply\n    }\n  }\n}","variables":{"contract":"nibi16wdq5rux5p2fd7kyv2fq0yxus7z3axtm509w6f97fs0an9lemmdstzg69p","chainUid":"nibiru"}}'
```
[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMIDuAFACRQSp4CGUK6RAyingJZIDmAhABoiNABYMeAVS5hWHbn34BKIsAA6SIkSiVa9JixF7OB4VHE8A%2BjBmsxEpNLAr1mrURQQA1sks8AZhCqGu7uSAyIIaFEAM4EcABGEAA2UaFgCFBccAzJMWnunii5ljEwAA7lyQQFAL5R9Ui1IIIgAG4M3AwJyQgxGCCuWmogxozMI6wjSFwJXACMAGxkYFgArHgwAB5r5QBM-mAA7F4EbQdYAAwEWzAxRwBeAMwMWyhwa5cAnGSL-l9HfwxS4MJBfXpwOBgGIoB68RZfcojQRREbmBxOSZEaazLibZEaZq1IA)

### Return Fields

| Field         | Type   | Description                                     |
|---------------|--------|-------------------------------------------------|
| Balance   | String    | The number of LP tokens held by the user.    |

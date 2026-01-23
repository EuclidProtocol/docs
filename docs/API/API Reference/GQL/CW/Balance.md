---
sidebar_position: 1
---

# Balance

Queries the amount of CW20 tokens (LP tokens) held by the specified user for the specified address and chain.

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
    --data '{"query":"query Cw($contract: String!, $chainUid: String!, $address: String!) {\n  cw(contract: $contract, chain_uid: $chainUid) {\n    balance(address: $address) {\n      balance\n    }\n  }\n}","variables":{"chainUid":"injective","contract":"inj16kxz36d9r9l3lsh9c6lkl50ta8fcamkgasht9q","address":"inj1y2n2fysm3r9t09kw9gmgfnpu746g8yu0pl24en"}}'
```
[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMIDuAFACRQSp4CGUK6RAyingJZIDmAhABoiNABYMeAVS5hWHbnyEiGYMHgQBnDXM48BASiLAAOkiJEolWvSYsR1zreFRxPAPowZrMRKTSwhiZm5kQARgwANgxIUAgUKmqa2sqq6lqBpiEh4VExCJkhAL4FxUiFIIIgAG4M3AyhEZoYIEHmxiAuvv7trO08AFYIzFxV%2BRUF7Q6MzD1EfUj9AIwAbADWAB4AXgDMy2AAnHj7EdsRGqL7UMsRqxEArAAMKAwAHABmUAxwq7wM5yj7LDtQQTEAJNIaWbzJYEABMSFhbwIGjg2yOKAe%2B1WZH2vDgvDeSAADjAAOwAFmWvBeBBgDyJEVh5OQwNM5UKQA)

| **Argument**  | **Type**     | **Description**                                             |
|---------------|--------------|-------------------------------------------------------------|
| `chainUid`    | `String!`    | The unique ID for the chain that the CW20 is deployed on.   |
| `contract`    | `String!`    | The contract address of the CW20 contract. Can be fetched using the [Factory GetLPTokenAddress](../Factory/Get%20Token%20Address.md)               |
| `address`     | `String!`    | The user address to query the balance for.                  |


### Return Fields

| **Field**         | **Type**   | **Description**                                     |
|---------------|--------|-------------------------------------------------|
| `balance`   | `String`    | The number of LP tokens held by the user.    |

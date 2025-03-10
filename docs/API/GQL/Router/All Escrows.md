---
sidebar_position: 6
---
# All Escrows
Queries all escrows for their chain UID, token, and total balance.

```graphql
query All_escrows($max: String, $min: String, $skip: Int, $limit: Int) {
  router {
    all_escrows(max: $max, min: $min, skip: $skip, limit: $limit) {
      chain_uid
      balance
      token
    }
  }
}
```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query All_escrows($max: String, $min: String, $skip: Int, $limit: Int) {\n  router {\n    all_escrows(max: $max, min: $min, skip: $skip, limit: $limit) {\n      chain_uid\n      balance\n      token\n    }\n  }\n}","variables":{"max":null,"min":null,"skip":null,"limit":null}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAIIA2ZA%2BggM5R4QDuNAFACRwCGAHukQMoo8ASyQBzADREOovoJHipbGgGthABz4BJVErLC4wlNtQBKIsAA6SIkQYwU%2BC9du3OFanQbMWXXtL8pQyQ%2BGSQpVQ1QyPUpfUNjaXijcysbV1soAAtOUUoYYTAXDKIAI3dOJCgEYoyUCBVkWqIAX2K2pBaQCRAAN04RTlKyWgwQNNtLED8pviQYCgliqeDZonnF5ZAYtY2yJfSp5JRdhbJrLpagA)

### Arguments

- **max** (ChainUID): The upper limit chain UID that should be returned. Does not include the specified max value.
- **min** (ChainUID): The lower limit chain UID to start from. Includes the specified min value.
- **skip** (Int): The number of results to skip in the resonse.
- **limit** (Int): The maximum number of results to return.

### Return Fields

| Field Name  | Type     | Description                                      |
|-------------|----------|--------------------------------------------------|
| `chain_uid` | `String` | The UID of the chain that hosts the escrow. |
| `balance`   | `String`  | The current amount of tokens held in the escrow.   |
| `token`  | `String`    | The tokne Id for the token stored in the escrow.  |
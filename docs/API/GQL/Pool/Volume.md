---
sidebar_position: 3
---

# Volume

Queries the total and daily volume of transactions and swaps in dollars on the Eulcid layer.

```graphql
query Pool {
  pool {
    volume {
      total_volume
      daily_volume
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Pool {\n  pool {\n    volume {\n      total_volume\n      daily_volume\n    }\n  }\n}","variables":{}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAAoQQA2RwAOkkUQA7lW30NEBul8C1dHDiggoAhhQD63CrwGCiYUQEsKBKT0RyGAXzm6k2kABoQnUXiWiARhQQBnDCDYMaIRqIDmCV%2BiIBGIzlXCiU4JRQffwAGQIMQbSA)


### Return Fields

| Field         | Type   | Description                          |
|---------------|--------|--------------------------------------|
| total_volume  | String | The total volume.       |
| daily_volume  | String | The daily volume.     |

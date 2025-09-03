---
sidebar_position: 3
---

# All DEXes

Queries a paginated list of all DEXes supported by the Euclid Protocol. Each DEX includes chain ID, name, logo, and styling metadata.

```graphql
query Token($limit: Int, $offset: Int) {
  token {
    all_dexes(limit: $limit, offset: $offset) {
      bg_color
      logo
      dex_name
      fg_color
      chain_uid
      display_name
    }
  }
}
```
### Example


```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Token($limit: Int, $offset: Int) {\n  token {\n    all_dexes(limit: $limit, offset: $offset) {\n      bg_color\n      logo\n      dex_name\n      fg_color\n      chain_uid\n      display_name\n    }\n  }\n}","variables":{"limit":null,"offset":null}}'
```
[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACoQDWyAFACQA2AlnAyukQJKoA0RNEAZvwDOCVh1QBKIsAA6SIkRQVk0uQoUBDOnQD6YBAA8EQqo2Zj6TFjwHDRbPoJEops%2BeoUAjAOY6oEOgg8NQ8iQO8IEI99Ax0kDUQo9X5ff0Dg9w8oAAsNBiQdGAYwJIUwBiEABzoNAjiEhCSAXxCWpCaQJqA)

### Arguments 

| **Argument** | **Type** | **Description**                           |
|--------------|----------|-------------------------------------------|
| `limit`      | `Int`    | Optional maximum number of results to return. |
| `offset`     | `Int`    | Optional number of results to skip (for pagination). |

### Return Fields

| **Field**       | **Type**  | **Description**                                  |
|------------------|-----------|--------------------------------------------------|
| `bg_color`       | `String`  | Background color (for UI rendering).             |
| `fg_color`       | `String`  | Foreground color (for UI rendering).             |
| `logo`           | `String`  | Image URL for the DEX's logo.                    |
| `dex_name`       | `String`  | Internal identifier for the DEX.                 |
| `chain_uid`      | `String`  | The chain ID the DEX is deployed on.             |
| `display_name`   | `String`  | Human-readable name of the DEX.                  |
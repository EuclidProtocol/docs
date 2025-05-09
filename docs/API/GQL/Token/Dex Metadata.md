---
sidebar_position: 6
---

# Dex Metadata

Queries the information on the specified Dex's logo.
```graphql
query Dex_metadata($dex: String!) {
  token {
    dex_metadata(dex: $dex) {
      bg_color
      logo
      dex_name
      fg_color
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://devnet-testing.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Dex_metadata($dex: String!) {\n  token {\n    dex_metadata(dex: $dex) {\n      bg_color\n      logo\n      dex_name\n      fg_color\n    }\n  }\n}","variables":{"dex":"osmosis"}}'
```

[Open in Playground](https://devnet-testing.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACIIAeA%2BoigIZi10AUAJGBekQMop4CWSAOYBCAJRFgAHSREiKCAGtkE6bNnsqNeo1pMNnNhXFSZa2QCNBlKBAA2EPKrNF7giE7MbKSWog9qAMysbe0dTWQBfJyikCJAIoA)

### Arguments

- **dex** (String!): The Dex to query.


### Return Fields

| **Field**  | **Type** | **Description**                                         |
|------------|----------|---------------------------------------------------------|
| `bg_color` | String   | The background color associated with the DEX logo.         |
| `logo`     | String   | The URL of the DEX's logo.                              |
| `dex_name` | String   | The name of the decentralized exchange.               |
| `fg_color` | String   | The foreground color associated with the DEX logo.         |



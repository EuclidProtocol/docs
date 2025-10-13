---
sidebar_position: 6
---

# Dex Metadata

Queries the information on the specified Dex's logo.
```graphql
query Token($dex: String!) {
  token {
    dex_metadata(dex: $dex) {
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
    --data '{"query":"query Token($dex: String!) {\n  token {\n    dex_metadata(dex: $dex) {\n      bg_color\n      logo\n      dex_name\n      fg_color\n      chain_uid\n      display_name\n    }\n  }\n}","variables":{"dex":"euclid"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACoQDWyAFACRgIAe6RAyingJZIDmAhAJRFgAHSREiKCsiGjx4%2BgwD6iFAEMwqtVQXM6jQSLFzxAI26KoEADYQ8s40RvcI94wsVJViV3IBm5yxs7I2MoAAtVLkUYDjAfeQ4AZwAHK1UCDy8EHwBfezykHJAAGhAAN1VOVRMrBESMEENxYXBGFuYWhBgoK1iW0SKcoA)


### Arguments

| **Argument** | **Type**   | **Description**         |
|--------------|------------|-------------------------|
| `dex`        | `String!`  | The Dex to query.       |


### Return Fields

| **Field**       | **Type**   | **Description**                          |
|------------------|------------|------------------------------------------|
| `bg_color`       | `String`   | The background color used for the DEX.   |
| `logo`           | `String`   | The URL of the DEX logo image.           |
| `dex_name`       | `String`   | The internal name of the DEX.            |
| `fg_color`       | `String`   | The foreground color used for the DEX.   |
| `chain_uid`      | `String`   | The chain UID associated with the DEX.   |
| `display_name`   | `String`   | The human-readable name of the DEX.      |


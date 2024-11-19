---
sidebar_position: 2
---

# Partner Fees Collected

Queries the total amount of fees collected from swaps on the specified chain. Returns fees for all denoms.

```graphql
query Partner_fees_collected($chainUid: String!) {
  factory(chain_uid: $chainUid) {
    partner_fees_collected {
      total {
        totals {
          denom
          amount
        }
      }
    }
  }
}
```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Partner_fees_collected($chainUid: String!) {\n  factory(chain_uid: $chainUid) {\n    partner_fees_collected {\n      total {\n        totals {\n          denom\n          amount\n        }\n      }\n    }\n  }\n}","variables":{"chainUid":"archway"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAAoCGeKS%2BA%2BgGYIIDONUEANuwlCgmABQASKAAsyASyQBVcWHREAyijySA5gEIAlEWAAdJESJ0yPCIX6iJSGjFnzhYyTLDa9Bw0QAOFKrQbNWDi4ePh19Dw8UCBQydjD3CMMomPYmeMTEsGQIOHCMjzI4CBhUPIyAXzKPSoSiGsMa8pAAGhAANwpxMgAjLiYMEDdDXRBLJ1kR%2BRGKUQB3MgIR5v0m8qA)

### Arguments

- **chainUid** (String!): The unique identifier of the chain.


### Return Fields

| **Field**            | **Type**   | **Description**                               |
|------------------|--------|-------------------------------------------|
| `denom`            | `String` | The denomination of the token.                   |
| `amount`           | `String` | The total of fees collected for the above denomination.                  |
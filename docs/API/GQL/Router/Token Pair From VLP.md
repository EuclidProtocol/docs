---
sidebar_position: 10
---
# Token Pair From VLP
Queries the token pair for the specified VLP address. 

```graphql
query Vlp($vlp: String!) {
  router {
    token_pairs_from_vlp(vlp: $vlp) {
      vlp
      token_1
      token_2
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Token_pairs_from_vlp($vlp: String!) {\n  router {\n    token_pairs_from_vlp(vlp: $vlp) {\n      vlp\n      token_1\n      token_2\n    }\n  }\n}","variables":{"vlp":"nibi1pys22jem6l222sxhexe7dmggtz8xkmhm49p7z3wjgrcdk3t46hgsle088m"}}'

```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACoQDWyA%2BgA4CGAlngM5UBmeEcVAbgDY0AFABJ%2BNdEQDKKPAyQBzAIQBKIsAA6SIkU4wU%2BNZu3aUFavSasOXXgMFiJogao1bj2sUfdFTlJFQBGL3dfagAmYKIAXy8YpCiQABoQHjpZOgAjPgRmDBBXbXUUgSKJIqQGDIYAmgJmMLCAKwQ4ADY%2BBrDmAA8ACwRuhAB2MDh5eRQALwAObvI4XrgAFgBOGiHJgGYAd0b5PCgwck2UJdbe%2BWZsgAZp6bgizQSooA)

### Arguments

- **vlp** (String!): The contract address of the VLP to get the token pair for.


### Return Fields

| **Field**                  | **Type**   | **Description**                                             |
|------------------------|--------|---------------------------------------------------------|
| `vlp_address`            | `String` | The VLP contract address.                       |
| `token_1`                | `String` | The Id of the first token in the pool.            |
| `token_2`                | `String` | The Id of the second token in the pool.            |

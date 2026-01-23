---
sidebar_position: 6
---

# EVM Chain Config


Queries information for the specified EVM chain.

```graphql

query Evm_chain_config($chainUid: String, $chainId: String) {
  chains {
    evm_chain_config(chain_uid: $chainUid, chain_id: $chainId) {
      chain_id
      chain_uid
      explorer_url
      name
      native_currency {
        decimals
        name
        symbol
      }
      rpc_urls {
        default {
          http
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
    --data '{"query":"query Evm_chain_config($chainUid: String, $chainId: String) {\n  chains {\n    evm_chain_config(chain_uid: $chainUid, chain_id: $chainId) {\n      chain_id\n      chain_uid\n      explorer_url\n      name\n      native_currency {\n        decimals\n        name\n        symbol\n      }\n      rpc_urls {\n        default {\n          http\n        }\n      }\n    }\n  }\n}","variables":{"chainUid":"megaeth"}}'
```
[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAKIBucA%2BlABYCGAlktREgGYMDmAFACS2MkAVQZh0RAMoo8TTgBoi-ekwCSYydNkBKIsAA6SIkQFMAzroNGjCCtWXMorDjxPMYo8UsEiwC15Q9FVzUdfUMrI39RSwjje0p3MBiIhAAPAAcAGwg8fAS8TOSrJDpEIqMSlAYyBGoYPFykKGIw2KswBCgGODpM03Li0oQBo1MCOAAjCELwiIBfAbx0qHy%2Bi1nYjrY6GEyUdbaImhQUdJGiBY2jS-mYy7mQORAyOhk6CcyEUwwQVqI9ECuHwA9AAxCcOgIFA0AEGB5zIA)

### Arguments

| **Name**      | **Type** | **Description**                                                                 |
|---------------|----------|---------------------------------------------------------------------------------|
| `chainId`     | String   | Optional ID of the chain. If not provided, `chainUid` must be specified.       |
| `chainUid`    | String   | Optional UID of the chain. If not provided, `chainId` must be specified.       |


### Returned Fields

| **Field**             | **Type**                                | **Description**                                                                          |
|-----------------------|-----------------------------------------|------------------------------------------------------------------------------------------|
| `chain_id`            | `String`                                | The identifier of the EVM chain.                                                  |
| `chain_uid`           | `String`                                | The unique UID (usually same as the name) for the chain used for integration purposes.                              |
| `explorer_url`        | `String`                                | The URL for the blockchain explorer associated with this chain.                          |
| `name`                | `String`                                | The common name of the chain.                                                    |
| `native_currency`     | [`NativeCurrency`](#nativecurrency)     | Details about the chain's native currency.                                               |
| `rpc_urls`            | [`RpcURLs`](#rpcurl)                    | The RPC URL configuration for connecting to the chain.                                   |

## Nested Fields

### NativeCurrency

| **Field**  | **Type**   | **Description**                                            |
|------------|------------|------------------------------------------------------------|
| `decimals` | `Int`      | The number of decimal places for the native currency.      |
| `name`     | `String`   | The name of the native currency.                           |
| `symbol`   | `String`   | The symbol of the native currency.                         |


### RpcUrl

| **Field** | **Type**   | **Description**                                           |
|-----------|------------|-----------------------------------------------------------|
| `http`    | [`String`]   | The list of default HTTP RPC endpoints for the chain.
            |

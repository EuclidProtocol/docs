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
    --url 'https://devnet-testing.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Evm_chain_config($chainUid: String, $chainId: String) {\n  chains {\n    evm_chain_config(chain_uid: $chainUid, chain_id: $chainId) {\n      chain_id\n      chain_uid\n      explorer_url\n      name\n      native_currency {\n        decimals\n        name\n        symbol\n      }\n      rpc_urls {\n        default {\n          http\n        }\n      }\n    }\n  }\n}","variables":{"chainUid":"monad","chainId":null}}'
```
[Open in Playground](https://devnet-testing.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAKIBucA%2BlABYCGAlktREgGYMDmRwAOkkSK1GSAM49%2BgwQgrV6TFuy4SBUwcIUMwktUPnMYWnWoQAPAA4AbCHnyUYeS8alI6iZ4NcoGZBNQe2SFDEfKq6RGAIUAxwdJaiHi5uCImCogRwAEYQTmFSAL6JeOZQ9o7ioeGCkWx0MJYoKlVSqUSFeYLtal1t-Pkg%2BUA)

### Arguments

- **chainId** (String): Optional Id of the chain config being queried. In case it is not specified, the chain UID needs to be set.
- **chainUid** (String): The unique Id for the chain. In case it is not specified, the chain Id needs to be set.

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
| `http`    | `String`   | The default HTTP RPC endpoint for the chain.            |

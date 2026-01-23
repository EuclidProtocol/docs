---
sidebar_position: 7
---

# All EVM Chains

Queries configuration information for all EVM chains integrated with Euclid.

```graphql
query AllEvmChains {
  chains {
    all_evm_chains {
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
    --data '{"query":"query Chains {\n  chains {\n    all_evm_chains {\n      chain_id\n      chain_uid\n      explorer_url\n      name\n      native_currency {\n        decimals\n        name\n        symbol\n      }\n      rpc_urls {\n        default {\n          http\n        }\n      }\n    }\n  }\n}"}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMIAWAhgJZIDORwAOkkUVJTfUy60RQDb8A%2BggBucIe2p0GzXryk0hVMHPlsOSITBVr5CAB4AHfhDz5tefnt5IKiG6zsoqohJJh5zSKMW7reMAQoKjgBWkdbewRI1loCOAAjCGseeQBfSLwjKEt%2BLliiIIAzChh%2BFFk0gKJCzOrWeoy1evSQABoQUQo8KgpE-gRaDBAQdKA)


  ### Return Fields

| **Field**           | **Type**         | **Description**                                                            |
|---------------------|------------------|----------------------------------------------------------------------------|
| `chain_id`          | `String`         | The identifier of the EVM chain.                                           |
| `chain_uid`         | `String`         | The unique UID for the chain used for integration purposes.               |
| `explorer_url`      | `String`         | The URL for the blockchain explorer associated with this chain.           |
| `name`              | `String`         | The common name of the chain.                                              |
| `native_currency`   | `NativeCurrency` | Details about the chain's native currency.                                |
| `rpc_urls`          | `RpcUrls`        | The RPC URL configuration for connecting to the chain.                    |

### NativeCurrency

| **Field**  | **Type** | **Description**                                     |
|-----------|----------|-----------------------------------------------------|
| `decimals`| `Int`    | The number of decimal places for the native currency.|
| `name`    | `String` | The name of the native currency.                    |
| `symbol`  | `String` | The symbol of the native currency.                  |

### RpcUrls

| **Field** | **Type**    | **Description**                                |
|----------|-------------|------------------------------------------------|
| `http`   | `String[]`  | The list of default HTTP RPC endpoints for the chain. |
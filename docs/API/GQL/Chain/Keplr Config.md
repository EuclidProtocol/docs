---
sidebar_position: 5
---

# Keplr Config

Queries information on the Keplr config for the specified chain Id and UID.

```graphql
query Keplr_config($chainId: String, $chainUid: String) {
  chains {
    keplr_config(chain_id: $chainId, chain_uid: $chainUid) {
      chainID
      chainName
      rpc
      rest
      explorer_url
      coinType
      features
      stakeCurrency {
        coinDenom
        coinMinimalDenom
        coinDecimals
        coinGeckoID
      }
      gasPriceStep {
        low
        average
        high
      }
      feeCurrencies {
        coinDenom
        coinMinimalDenom
        coinDecimals
        coinGeckoID
        gasPriceStep {
          low
          average
          high
        }
      }
      currencies {
        coinDenom
        coinMinimalDenom
        coinDecimals
        coinGeckoID
      }
      bech32Config {
        bech32PrefixAccAddr
        bech32PrefixAccPub
        bech32PrefixValAddr
        bech32PrefixValPub
        bech32PrefixConsAddr
        bech32PrefixConsPub
      }
      bip44 {
        coinType
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
    --data '{"query":"query Keplr_config($chainId: String, $chainUid: String) {\n  chains {\n    keplr_config(chain_id: $chainId, chain_uid: $chainUid) {\n      chainID\n      chainName\n      rpc\n      rest\n      explorer_url\n      coinType\n      features\n      stakeCurrency {\n        coinDenom\n        coinMinimalDenom\n        coinDecimals\n        coinGeckoID\n      }\n      gasPriceStep {\n        low\n        average\n        high\n      }\n      feeCurrencies {\n        coinDenom\n        coinMinimalDenom\n        coinDecimals\n        coinGeckoID\n        gasPriceStep {\n          low\n          average\n          high\n        }\n      }\n      currencies {\n        coinDenom\n        coinMinimalDenom\n        coinDecimals\n        coinGeckoID\n      }\n      bech32Config {\n        bech32PrefixAccAddr\n        bech32PrefixAccPub\n        bech32PrefixValAddr\n        bech32PrefixValPub\n        bech32PrefixConsAddr\n        bech32PrefixConsPub\n      }\n      bip44 {\n        coinType\n      }\n    }\n  }\n}","variables":{"chainId":"osmo-test-5"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABANIIAOANngPpQRIBmAlgOYAUAJFABYCGzJAEkw6IgGUUeQawA0Rbv0EBVZqIlSZASiLAAOkiJFeApAGddBo0YDWFanQYsOJwTTVjFpkfNdIaMB4KfqpgOvqG1kZ%2BQgAiVlHGSkgAcnyICVF45FCZ1ngIZih5RggAHlQQBbQweJQlxhCCACoE5AgNjAh8KLWFDUV8dgDCtQVIUMQRidb0grHIEHAN0U1IALKCzHB8lAtISyuN8whQ27tmR3NIAOKnNhBxDQC%2BDax8ZgAK0lAIkhSWSIzSgQADuRz4ADd8HxWB0gYkeGweC9OggEKM8OMzoVATNVicDssEVFrpskOc9otifjjkgFmcdpRLiTZms7lAHk9WUZ3l8fn8UADprSiCDwTzrFCYXCjkYkawUZLXqyVTNYFjkDiLCL1Wt9odJWStkyDTT8dcGZSWbTrhyufFVQ0AEanHgAZgATMMnGw8fjXbwvd8ECwygBBKBQcNgMB4I6Bj2ekNhyNQT4wZ0Jt3BgphgBquxjcezQeTeeYZULlAzWclidzocrPvMxfj9Zz5abZRbX0zqNZzuY5AALCP-XqWm14TM1dY5yrniBZCBIXxpHxnZRChgQCK9CAQiID2IDxAzHBz8xLsuEgeYmAT0QzxeIABaIVFN8AVgPsgMS7PEAA)


### Arguments

- **chainId** (String): Optional Id of the chain config being used. In case it is not specified, the chain UID needs to be set.
- **chainUid** (String): The unique Id for the chain. In case it is not specified, the chain Id needs to be set.

### Return Fields

| **Field**                  | **Type**   | **Description**                                             |
|------------------------|--------|---------------------------------------------------------|
| `chainID`                | `String` | The identifier of the chain.                     |
| `chainName`              | `String` | The name of the chain.                                  |
| `rpc`                    | `String` | The RPC URL for the chain.                              |
| `rest`                   | `String` | The REST URL for the chain.                             |
| `coinType`               | `String` | BIP44 coin type for address derivation.                 |
| `features`               | `String` | Indicate the features supported by this chain. Ex, cosmwasm, secretwasm ...           |
| `stakeCurrency`          | [`StakeCurrency`](#stakecurrency) | The staking currency details.                          |
| `gasPriceStep`           | [`GasPriceStep`](#gaspricestep)` | The gas price steps for the chain.                       |
| `feeCurrencies`          | [`[FeeCurrency]`](#feecurrency) | The fee currencies details.                             |
| `currencies`             | [`[Currencies]`](#currencies) | The currencies supported by the chain.                 |
| `bech32Config`           | [`Bech32Config`](#bech32config) | The bech32 configuration for the chain.                 |
| `bip44`                  | [`Bip44`](#bip44) | The bip44 configuration for the chain.                  |
| `explorer_url`     | `String` | The URL to the blockchain explorer for config   |

## Nested Fields

### StakeCurrency

| **Field**              | **Type**        | **Description**                                             |
|--------------------|-------------|---------------------------------------------------------|
| `coinDenom`          | `String`      | The denomination of the coin.                          |
| `coinMinimalDenom`   | `String`      | The minimal denomination of the coin.                 |
| `coinDecimals`       | `Int`         | The number of decimal places of the coin.               |
| `coinGeckoID`        | `String`      | The CoinGecko ID for the coin.                          |

### GasPriceStep

| **Field**              | **Type**        | **Description**                                             |
|--------------------|-------------|---------------------------------------------------------|
| `low`                | `Float`       | The low gas price step.                                 |
| `average`            | `Float`       | The average gas price step.                             |
| `high`               | `Float`       | The high gas price step.                                |

### FeeCurrency

| **Field**              | **Type**        | **Description**                                             |
|--------------------|-------------|---------------------------------------------------------|
| `coinDenom`          | `String`      | The denomination of the fee currency.                   |
| `coinMinimalDenom`   | `String`      | The minimal denomination of the fee currency.           |
| `coinDecimals`       | `Int`         | The number of decimal places of the fee currency.       |
| `coinGeckoID`        | `String`      | The CoinGecko ID for the fee currency.                  |
| `gasPriceStep`       | [`GasPriceStep`](#gaspricestep) | The gas price steps for the fee currency.                |

### Currencies

| **Field**              | **Type**        | **Description**                                             |
|--------------------|-------------|---------------------------------------------------------|
| `coinDenom`          | `String`      | The denomination of the currency.                       |
| `coinMinimalDenom`   | `String`      | The minimal denomination of the currency.               |
| `coinDecimals`       | `Int`         | The number of decimal places of the currency.           |
| `coinGeckoID`        | `String`      | The CoinGecko ID for the currency.                      |

#### Bech32Config
| **Field**              | **Type**        | **Description**                                             |
|--------------------|-------------|---------------------------------------------------------|
| `bech32PrefixAccAddr` | `String`      | The bech32 prefix for account addresses.                |
| `bech32PrefixAccPub`  | `String`      | The bech32 prefix for account public keys.              |
| `bech32PrefixValAddr` | `String`      | The bech32 prefix for validator addresses.              |
| `bech32PrefixValPub`  | `String`      | The bech32 prefix for validator public keys.            |
| `bech32PrefixConsAddr` | `String`     | The bech32 prefix for consensus node addresses.         |
| `bech32PrefixConsPub`  | `String`     | The bech32 prefix for consensus node public keys.       |

### Bip44

| **Field**              | **Type**        | **Description**                                             |
|--------------------|-------------|---------------------------------------------------------|
| `coinType`           | `Int`         | BIP44 coin type for address derivation.                 |
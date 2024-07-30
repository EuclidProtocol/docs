---
sidebar_position: 2
---

# Keplr Config

Queries keplr config information.

```graphql
query Chains($chainId: String!) {
  chains {
    keplr_config(chainId: $chainId) {
      chainID
      chainName
      rpc
      rest
      coinType
      features
      stakeCurrency {
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
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Chains($chainId: String!) {\n  chains {\n    keplr_config(chainId: $chainId) {\n      chainID\n      chainName\n      rpc\n      rest\n      coinType\n      features\n      stakeCurrency {\n        coinDenom\n        coinMinimalDenom\n        coinDecimals\n        coinGeckoID\n        gasPriceStep {\n          low\n          average\n          high\n        }\n      }\n      gasPriceStep {\n        low\n        average\n        high\n      }\n      feeCurrencies {\n        coinDenom\n        coinMinimalDenom\n        coinDecimals\n        coinGeckoID\n        gasPriceStep {\n          low\n          average\n          high\n        }\n      }\n      currencies {\n        coinDenom\n        coinMinimalDenom\n        coinDecimals\n        coinGeckoID\n      }\n      bech32Config {\n        bech32PrefixAccAddr\n        bech32PrefixAccPub\n        bech32PrefixValAddr\n        bech32PrefixValPub\n        bech32PrefixConsAddr\n        bech32PrefixConsPub\n      }\n      bip44 {\n        coinType\n      }\n    }\n  }\n}","variables":{"chainId":"localpoola-1"}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMIAWAhgJZIDOAFACRSU0CSY6RAyinjQHMAhAEoiwADpIiRFtTripMmQGsEABwA2eAPpQISAGZUB9Oe05FmrJBzGTpymedsARJU9k2AchUQenPHUoAOU8BFoUUOcIGgAVAnUEaKJDBAoUGHDaFMiKNRIs8KQoYgdPZX0aV2QIOBSYmgBZGio4Ck0apDqG2VikGqg2jpzHCqqkAHEEKBUINncxzwEKWgAFfigEXg1FJYrNCAB3XpkKADd8CgFk-c8yEzJegF8U17uV9c3tlF3yiqIhxOdzOlzw11uAKIDwETzu7wqaQQhTwxSGET2UImXR6IL6zVa7U6tXqeOxM2GmlGWP601m80WUM%2BGyoWx26kxUMBx1ORAuVxuvJhcKhCM8YqcsFRyHRtE5436ONJNIJSEpSt65KGROpAImdLmCzeKQARjMyABmABMJAMxgE8s8ZpY1o2CGMAA8AIJQKBesBgPC9Z2Wq1uz0%2BqBrGAm4Pm13hT0ANQ6-sDcZdYcTVA9Kc00djeJDCfdOdtdDTQaL8azpY95fWMeNdxNVHUABZ247Jf0Eklm04xe9niAADQgc4UfgUE2aCIYED-CQgFwcZdcZeHKAddQQCCaCgAWgAjMvR1IR88gA)

### Arguments

- **chainId** (String!): The unique identifier of the chain.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| chainID                | String | The identifier of the chain.                     |
| chainName              | String | The name of the chain.                                  |
| rpc                    | String | The RPC URL for the chain.                              |
| rest                   | String | The REST URL for the chain.                             |
| coinType               | String | BIP44 coin type for address derivation.                 |
| features               | [String] | Indicate the features supported by this chain. Ex, cosmwasm, secretwasm ...           |
| stakeCurrency          | [StakeCurrency](#stakecurrency) | The staking currency details.                          |
| gasPriceStep           | [GasPriceStep](#gaspricestep) | The gas price steps for the chain.                       |
| feeCurrencies          | [[FeeCurrency]](#feecurrency) | The fee currencies details.                             |
| currencies             | [[Currencies]](#currencies) | The currencies supported by the chain.                 |
| bech32Config           | [Bech32Config](#bech32config) | The bech32 configuration for the chain.                 |
| bip44                  | [Bip44](#bip44) | The bip44 configuration for the chain.                  |

## Nested Fields

### StakeCurrency

| Field              | Type        | Description                                             |
|--------------------|-------------|---------------------------------------------------------|
| coinDenom          | String      | The denomination of the coin.                          |
| coinMinimalDenom   | String      | The minimal denomination of the coin.                 |
| coinDecimals       | Int         | The number of decimal places of the coin.               |
| coinGeckoID        | String      | The CoinGecko ID for the coin.                          |
| gasPriceStep       | [GasPriceStep](#gaspricestep) | The gas price steps for the stake currency.            |

### GasPriceStep

| Field              | Type        | Description                                             |
|--------------------|-------------|---------------------------------------------------------|
| low                | Float       | The low gas price step.                                 |
| average            | Float       | The average gas price step.                             |
| high               | Float       | The high gas price step.                                |

### FeeCurrency

| Field              | Type        | Description                                             |
|--------------------|-------------|---------------------------------------------------------|
| coinDenom          | String      | The denomination of the fee currency.                   |
| coinMinimalDenom   | String      | The minimal denomination of the fee currency.           |
| coinDecimals       | Int         | The number of decimal places of the fee currency.       |
| coinGeckoID        | String      | The CoinGecko ID for the fee currency.                  |
| gasPriceStep       | [GasPriceStep](#gaspricestep) | The gas price steps for the fee currency.                |

### Currencies

| Field              | Type        | Description                                             |
|--------------------|-------------|---------------------------------------------------------|
| coinDenom          | String      | The denomination of the currency.                       |
| coinMinimalDenom   | String      | The minimal denomination of the currency.               |
| coinDecimals       | Int         | The number of decimal places of the currency.           |
| coinGeckoID        | String      | The CoinGecko ID for the currency.                      |

#### Bech32Config

| Field              | Type        | Description                                             |
|--------------------|-------------|---------------------------------------------------------|
| bech32PrefixAccAddr | String      | The bech32 prefix for account addresses.                |
| bech32PrefixAccPub  | String      | The bech32 prefix for account public keys.              |
| bech32PrefixValAddr | String      | The bech32 prefix for validator addresses.              |
| bech32PrefixValPub  | String      | The bech32 prefix for validator public keys.            |
| bech32PrefixConsAddr | String     | The bech32 prefix for consensus node addresses.         |
| bech32PrefixConsPub  | String     | The bech32 prefix for consensus node public keys.       |

### Bip44

| Field              | Type        | Description                                             |
|--------------------|-------------|---------------------------------------------------------|
| coinType           | Int         | BIP44 coin type for address derivation.                 |

## Keplr Configs

Returns an array of Keplr Config. The return fields are the same as the ones described above.

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Chains($chainId: String!) {\n  chains {\n    keplr_config(chainId: $chainId) {\n      chainID\n      chainName\n      rpc\n      rest\n      coinType\n      features\n      stakeCurrency {\n        coinDenom\n        coinMinimalDenom\n        coinDecimals\n        coinGeckoID\n        gasPriceStep {\n          low\n          average\n          high\n        }\n      }\n      gasPriceStep {\n        low\n        average\n        high\n      }\n      feeCurrencies {\n        coinDenom\n        coinMinimalDenom\n        coinDecimals\n        coinGeckoID\n        gasPriceStep {\n          low\n          average\n          high\n        }\n      }\n      currencies {\n        coinDenom\n        coinMinimalDenom\n        coinDecimals\n        coinGeckoID\n      }\n      bech32Config {\n        bech32PrefixAccAddr\n        bech32PrefixAccPub\n        bech32PrefixValAddr\n        bech32PrefixValPub\n        bech32PrefixConsAddr\n        bech32PrefixConsPub\n      }\n      bip44 {\n        coinType\n      }\n    }\n  }\n}","variables":{"chainId":"localpoola-1"}}''
```

[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMIAWAhgJZIDOAFACRSU0CSY6RAyinjQHMAhAEoiwADpIiRFtTripMmQGsEABwA2eAPpQISAGZUB9Oe05FmrJBzGTpymedsARJU9k2AchUQenPHUoAOU8BFoUUOcIGgAVAnUEaKJDBAoUGHDaFMiKNRIs8KQoYgdPZX0aV2QIOBSYmgBZGio4Ck0apDqG2VikGqg2jpzHCqqkAHEEKBUINncxzwEKWgAFfigEXg1FJYrNCAB3XpkKADd8CgFk-c8yEzJegF8U17uV9c3tlF3yiqIhxOdzOlzw11uAKIDwETzu7wqaQQhTwxSGET2UImXR6IL6zVa7U6tXqeOxM2GmlGWP601m80WUM%2BGyoWx26kxUMBx1ORAuVxuvJhcKhCM8YqcsFRyHRtE5436ONJNIJSEpSt65KGROpAImdLmCzeKQARjMyABmABMJAMxgE8s8ZpY1o2CGMAA8AIJQKBesBgPC9Z2Wq1uz0%2BqBrGAm4Pm13hT0ANQ6-sDcZdYcTVA9Kc00djeJDCfdOdtdDTQaL8azpY95fWMeNdxNVHUABZ247Jf0Eklm04xe9niAADQgc4UfgUE2aCIYED-CQgFwcZdcZeHKAddQQCCaCgAWgAjMvR1IR88gA)
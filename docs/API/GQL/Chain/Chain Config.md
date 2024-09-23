---
sidebar_position: 2
---

# Chain Config

Queries chain config information for wallets like Keplr, Leap etc...

```graphql
query Query($chainId: String!) {
  chains {
    chain_config(chainId: $chainId) {
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
    --data '{"query":"query Query($chainId: String!) {\n  chains {\n    chain_config(chainId: $chainId) {\n      chainID\n      chainName\n      rpc\n      rest\n      coinType\n      features\n      stakeCurrency {\n        coinDenom\n        coinMinimalDenom\n        coinDecimals\n        coinGeckoID\n      }\n      gasPriceStep {\n        low\n        average\n        high\n      }\n      feeCurrencies {\n        coinDenom\n        coinMinimalDenom\n        coinDecimals\n        coinGeckoID\n        gasPriceStep {\n          low\n          average\n          high\n        }\n      }\n      currencies {\n        coinDenom\n        coinMinimalDenom\n        coinDecimals\n        coinGeckoID\n      }\n      bech32Config {\n        bech32PrefixAccAddr\n        bech32PrefixAccPub\n        bech32PrefixValAddr\n        bech32PrefixValPub\n        bech32PrefixConsAddr\n        bech32PrefixConsPub\n      }\n      bip44 {\n        coinType\n      }\n    }\n  }\n}","variables":{"chainId":"nibiru-testnet-1"}}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAIq6EAUAJFABYCGAlkgJJjpEDKKezA5gEIAlEWAAdJESJ0mSAM6iJUqTOYB9KBCQAzRnwqrW7IjQbM2I8ZOUqzrACJKb0uwDl6iJzbwAHKF%2BU8BDkUAJUIZgAVAh8EMKJtBHoUGCC5eJD6AGsEAGFUoKQoYitnZU1me2QIOHjw5gBZZkY4egAbKqQauukIpCqoFvb06zKKpABxBCgsiBZHUeUAX3i%2BejkABV4oBG4EH0VFmzaIAHce%2BgA3fHo%2BOKPlWj1aeJWHxLyC5EHgw7L6-rVWoPAFNJBDDpAnrjAYQkb-XrMKYzOYLBFrTbbXYofZ-BFEE7nEHKK43O49KRPPgvYlvMp05ywPCFH4KUr-GFQ4njMEQzrdbl9WGtNrwjl9ZGzeaveIAI2mtAAzAAmXJaXR8PFleV0FVbBC6AAeAEEoFBjWAwHgejqlcr9UbTVANjBZTaFXqgkaAGrtC1W926%2B1exiG31tF1u4m2z0G0Nq%2BT%2B63Rj3BuOGhObV0yh6yxg%2BAAsBa1jL60ViOZsDLeSxAABoQJd6Lx6LK2sEMCArGIQIY2D2OD3wXm8DAALQ4kJIBAoMcARh7ElrSyAA)

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
| features               | String | Indicate the features supported by this chain. Ex, cosmwasm, secretwasm ...           |
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

## Chain Configs

Returns an array of Keplr Config. The return fields are the same as the ones described above.

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://testnet.api.euclidprotocol.com/graphql' \
    --data '{"query":"query Chain_configs {\n  chains {\n    chain_configs {\n      chainID\n      chainName\n      rpc\n      rest\n      coinType\n      features\n      stakeCurrency {\n        coinDenom\n        coinMinimalDenom\n        coinDecimals\n        coinGeckoID\n      }\n      gasPriceStep {\n        low\n        average\n        high\n      }\n      feeCurrencies {\n        coinDenom\n        coinMinimalDenom\n        coinDecimals\n        coinGeckoID\n        gasPriceStep {\n          low\n          average\n          high\n        }\n      }\n      currencies {\n        coinDenom\n        coinMinimalDenom\n        coinDecimals\n        coinGeckoID\n      }\n      bech32Config {\n        bech32PrefixAccAddr\n        bech32PrefixAccPub\n        bech32PrefixValAddr\n        bech32PrefixValPub\n        bech32PrefixConsAddr\n        bech32PrefixConsPub\n      }\n      bip44 {\n        coinType\n      }\n    }\n  }\n}"}'
```

[Open in Playground](https://testnet.api.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMIAWAhgJZID6UESAZlQOYDORwAOkkUVEo1OPPvwFC6DZmxG9x4wdSQBJACLyFE5QDkKiTQrwAHKIfF4E7FOf4MaAFQLGEtokwQUUMS%2BzfWKAGsEEh9LJChiUS1FCBo1ZAg4Nzs4pABZGio4CgAbBKQklIE0hKhsvL8xGPskAHEEKECIdTcAXzdWCnYABTwqKAQAZRQEYy5i3IgAd2KKADd8ClZXaq0yNjJ2tw8QsORyqwm1hVqCopPYmkykCvzE5MvU%2BMa7qpjn%2Bsbm1qeiLt6-UGIzGxw%2B4imsz%2B-AWSxWxX4G1YWz%2BHUuaJq%2BwiVCO0Q%2BZwexVqNzu50e4IJ5RyuXe%2BLSDSaLQ06LcACNGmQAMwAJhIjBYrDBH3Zgh5fQQLAAHgBBKBQaVgMB4Yoirnc8VS2VQHowVkqjliyxSgBqeQVSv1ovVRqoktNuR1er%2BqsNEttfKQ7HNyudButbslHt6uu2l1ZVGMABZI0KamknC5QwoMUQ0W0QAAaEDzCj9Cis3JWDAgEBtIA)
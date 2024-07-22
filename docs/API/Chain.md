---
sidebar_position: 2
description: "Introduction Into Euclid's API"
---

# Chains

:::danger
Change to non staging link when you get the chance. 
:::

:::note
You can test any of the queries in the [GraphQL Playground](https://api.staging.euclidprotocol.com/).  
:::

## Contracts

Queries contract information for the specified chain Id and Type.

```graphql

query Contracts($chainUId: String!, $type: String!) {
  chains {
    contracts(chainUId: $chainUId, type: $type) {
      CreatedAt
      UpdatedAt
      ContractAddress
      ChainUID
      Type
    }
  }
}

```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Contracts($chainUId: String!, $type: String!) {\n  chains {\n    contracts(chainUId: $chainUId, type: $type) {\n      CreatedAt\n      UpdatedAt\n      ContractAddress\n      ChainUID\n      Type\n    }\n  }\n}","variables":{"chainUId":"vsl","type":"vlp"}}'
```
[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMISp4CGUKAzgBQAkUAFpQJZICqAkmOkQDKKPJwDmAQgA0RRigIAHBAOGikkgJRFgAHSREirDklra9Bg1HIjqdekc69%2Bsh9z4z5SgXMUItu-QsDEjwEShQEMABBFHMgoi4FMHDImLigsgpbKLAwUNpadIsSNkceABEigwAVXyKAXzjGpHqQKRAAN0pRSgAjABsEWgwQAIMdEFcnCYEJjtp%2Biak4ic8EGaI5-oUJvVb6oA)

### Arguments

- **chainUId** (String!): The unique identifier of the chain.
- **type** (String!): The type of the contract.

### Returned Fields

| Field           | Type   | Description                                             |
|-----------------|--------|---------------------------------------------------------|
| CreatedAt       | String | The date and time when the contract was created.        |
| UpdatedAt       | String | The date and time when the contract was last updated.   |
| ContractAddress | String | The address of the contract on the blockchain.          |
| ChainUID         | String | The unique identifier of the chain where the contract is deployed. |
| Type            | String | The type of the contract.         |

## Keplr Config

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

## Token Metadata

Queries token metadata information for all tokens.

```graphql
query Chains {
  chains {
    token_metadata {
      coinDecimal
      displayName
      tokenId
      description
      image
      price
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Chains {\n  chains {\n    token_metadata {\n      coinDecimal\n      displayName\n      tokenId\n      description\n      image\n      price\n    }\n  }\n}"}'
```
[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMIAWAhgJZIDORwAOkkUVJTfUy60ShAGtkAfUQoKYCuIbNevKBBoARBFCpwKAG1lyiYKrQAOmigQByFRDrn8hSAJJhrvMAlpQ8VQyioQkz1nUKAHMEAKJDTygwnlYAXx0EpDiQABoQADcKTwoAI003DBAQOKA)

### Return Fields

| Field         | Type   | Description                                     |
|---------------|--------|-------------------------------------------------|
| coinDecimal   | Int    | The number of decimal places for the token.     |
| displayName   | String | The display name of the token.                  |
| tokenId       | String | The unique identifier of the token.             |
| description   | String | A brief description of the token.               |
| image         | String | URL to an image representing the token.         |
| price         | Float  | The current price of the token.                 |

## Token Metadata by Id

Queries token metadata information for the specified token Id.

```graphql
query Token_metadata_by_Id($tokenId: String!) {
  chains {
    token_metadata_by_Id(token_id: $tokenId) {
      coinDecimal
      displayName
      tokenId
      description
      image
      price
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Token_metadata_by_Id($tokenId: String!) {\n  chains {\n    token_metadata_by_Id(token_id: $tokenId) {\n      coinDecimal\n      displayName\n      tokenId\n      description\n      image\n      price\n    }\n  }\n}","variables":{"tokenId":"usdt"}}'
```
[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABACoQDWyA%2BoigIZh31UBGBVAkmABQAkKFZF3REAyijwBLJAHMAhAEoiwADpIiRKAAs60gM7K1GjQMpIaCeo2ZtOPU9UlgR-QUi5LV64xqgRpACIIUJJwdAA2Rj5EYJJ6AA7hdAQAcnSIUT4O7mCZxmAIelBS8SiSEEh5GqF0MghVRPFSUPXeGgC%2BUZ1I7SAANCAAbnRSdCzhhRggXhoqINlccyJzMHpgKHNqve1AA)

### Return Fields

| Field         | Type   | Description                                     |
|---------------|--------|-------------------------------------------------|
| coinDecimal   | Int    | The number of decimal places for the token.     |
| displayName   | String | The display name of the token.                  |
| tokenId       | String | The unique identifier of the token.             |
| description   | String | A brief description of the token.               |
| image         | String | URL to an image representing the token.         |
| price         | Float  | The current price of the token in dollars.                |


## Chain Id

Queries the chain ID and factory address for a specified chain using its unique identifier (UID).

```graphql
query Chain_id($chainUid: String!) {
  chains {
    chain_id(chain_uid: $chainUid) {
      chain_id
      factory_address
    }
  }
}
```
### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Chain_id($chainUid: String!) {\n  chains {\n    chain_id(chain_uid: $chainUid) {\n      chain_id\n      factory_address\n    }\n  }\n}","variables":{"chainUid":"chaine"}}'
```
[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMIAWAhgJZID6VYAFACRSU0CqD6RAyinhoBzAIQBKIsAA6SIkTbUkAZ0ky5chTXpNNdGNyKt2SLmAnTZ6jce1qrRAGYUoKCIVoUwYPAiVK7cgC%2BdsFIgSAANCAAbhSCFABGADa%2BGCAWclIguqZZPFm6CFky4YFAA)

### Arguments

- **chainUid** (String!): The unique identifier of the chain.

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| chain_id               | [ChainID](#chainid) | The chain ID and factory address for the specified chain. |

### ChainID

| Field            | Type   | Description                               |
|------------------|--------|-------------------------------------------|
| chain_id         | String | The unique identifier of the chain.       |
| factory_address  | String | The address of the factory contract.      |


## Chain UIDs

Queries the factory address, unique identifier (UID), name and logo for a specified chain using its chain ID.

```graphql
query Chain_id($chainId: String!) {
  chains {
    chain_uids(chain_id: $chainId) {
      factory_address
      chain_uid
      display_name
      logo
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Chain_id($chainId: String!) {\n  chains {\n    chain_uids(chain_id: $chainId) {\n      factory_address\n      chain_uid\n      display_name\n      logo\n    }\n  }\n}","variables":{"chainId":"localpoola-1"}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMIAWAhgJZID6VYAFACRSU0CSY6RAyinhoBzAIQBKIsAA6SIkTbUkAZ0ky5chTVowGSxproMerdki4Tps9XIBmFKCgiFaFMGDwIlStdfmntDD7WYFRKAA4ANhQEtEgUiEHqERBCEIkAvj6ZSOkgADQgAG4UghQARhGeGCCWclIgBlz1PPXJUBQRYRAQUQC0AIz1MrnpQA)

### Arguments

- **chainId** (String!): The unique identifier of the chain.

### Return Fields

| **Field**          | **Type** | **Description**                                      |
|--------------------|----------|------------------------------------------------------|
| `factory_address`  | `String` | The address of the factory contract.                 |
| `chain_uid`        | `String` | The unique identifier (UID) of the chain.            |
| `display_name`     | `String` | The display name of the chain.                       |
| `logo`             | `String` | The URL or reference to the chain's logo image.      |


## All Chain UIDs
Queries the factory address, unique identifier (UID), name and logo for a all chains.

```graphql
query All_chain_uids {
  chains {
    all_chain_uids {
      factory_address
      chain_uid
      display_name
      logo
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query All_chain_uids {\n  chains {\n    all_chain_uids {\n      factory_address\n      chain_uid\n      display_name\n      logo\n    }\n  }\n}","variables":{}}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAIIA2ZA%2BlABYCGAlkpTA2AM5HAA6SRRtRkk48%2B-InQrV6TFmxG9x4gGZ0oKCIUp0wYPAnbtFSgTOaswxpWAbsADmToFKSOoiviyEAOYQPAX2NApH8QABoQADc6PAY6ACMyAwwQUVD-IA)


### Return Fields

| **Field**          | **Type** | **Description**                                      |
|--------------------|----------|------------------------------------------------------|
| `factory_address`  | `String` | The address of the factory contract.                 |
| `chain_uid`        | `String` | The unique identifier (UID) of the chain.            |
| `display_name`     | `String` | The display name of the chain.                       |
| `logo`             | `String` | The URL or reference to the chain's logo image.      |


## Router

Queries information on the router contract.

```graphql
query Chains {
  chains {
    router {
      CreatedAt
      UpdatedAt
      ContractAddress
      ChainUID
      Type
    }
  }
}

```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Chains {\n  chains {\n    router {\n      CreatedAt\n      UpdatedAt\n      ContractAddress\n      ChainUID\n      Type\n    }\n  }\n}"}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/dev/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAMIAWAhgJZIDORwAOkkUVJTfUy60XhDBT4GzXrxJ4EFIWACCKUWKIBVAA5hpCOQp5iSEVHgpQUssGEm1aivRyTKAkgBEbvACoFVCVwF9FfpB8QABoQADcKPCoKACMAGwRaDBAQHyA)

### Arguments

- None

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| router                 | [Router](#router) | The router information for chains.                     |

### Router

| Field            | Type   | Description                               |
|------------------|--------|-------------------------------------------|
| CreatedAt        | String | The timestamp when the router was created. |
| UpdatedAt        | String | The timestamp when the router was last updated. |
| ContractAddress  | String | The address of the router contract.       |
| ChainUID         | String | The unique identifier (UID) of the chain. |
| Type             | String | The type of the router.                   |

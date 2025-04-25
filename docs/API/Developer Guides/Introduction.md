---
sidebar_position: 1
---
# Introduction

In the following sections, we’ll walk you through the steps needed to integrate the Euclid layer to your project using the Euclid API. You’ll learn how to perform tasks such as:
- Querying data 
- Executing transactions
- Managing assets and balances

 Each guide includes examples, code snippets, and explanations to ensure you can get up and running quickly.

 :::tip 
 - You can find all our API calls in the [previous sections](../Intro.md).
 :::

## Prerequisites 

### Wallet Connection
Euclid supports multiple wallets. Please refer to their docs to learn how to integrate these wallets into your application:
- [Keplr](https://docs.keplr.app/api/)
- [Leap](https://docs.leapwallet.io/cosmos/for-dapps-connect-to-leap/api-reference)
- [MetaMask](https://docs.metamask.io/wallet/)
- [Rabby](https://rabby.io/docs/integrating-rabby-wallet/)

### Using GQL Queries
You will need to know how to call a GQL query. If unfamiliar with the process, you can find examples [here](../GQL/GQL%20Calls.md).

### Fetching a Chain Config 

It’s essential to have a solid understanding of how to interact with blockchain configurations. One of the recurring tasks you’ll need to accomplish is Fetching a Chain Config. This is a critical step because the chain config provides all the necessary information required to interact with a specific blockchain network, such as its RPC endpoints.

Fetching the chain config is a two step process:

	1. **Retrieving All Chain UIDs/IDs**: To be able to get a chain’s configuration, we first need to retrieve either its chain UID or chain ID. We can do this using the [`All Chain`](../GQL/Chain/All%20Chains.md) GQL query.
  :::tip
  - You can set the `type` to `"evm"` or `"cosmwasm"` to filter the results. 
  :::

```graphql
query Chains($type: String) {
  chains {
    all_chains(type: $type) {
      chain_uid
      display_name
      chain_id
    }
  }
}
```

2. **Fetching the Full Chain Config**: Using either the chain UID or chain ID retrieved in the previous step, you can fetch the full configuration for that chain. For CosmWasm chains, use the [`Keplr Config`](../GQL/Chain/Keplr%20Config.md) query. For EVM chains, use the [`EVM Chain Config`](../GQL/Chain/EVM%20Chain%20Config.md) query.
  :::tip
  You can specify what info to return inside the query.
  :::

  ```graphql
query Chains($chainUid: String) {
  chains {
    keplr_config(chain_uid: $chainUid) {
      rpc
      rest
      chainID
    }
  }
}
  ```
  Example Response:

  ```graphql
{
  "data": {
    "chains": {
      "keplr_config": {
        "rpc": "https://injective-testnet-rpc.publicnode.com",
        "rest": "https://testnet.sentry.lcd.injective.network",
        "chainID": "injective-888"
      }
    }
  }
}
  ```

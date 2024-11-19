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
As of now, Euclid supports Keplr and Leap wallets. Please refer to their docs to learn how to integrate these wallets into your application:
- [Keplr](https://docs.keplr.app/api/)
- [Leap](https://docs.leapwallet.io/cosmos/for-dapps-connect-to-leap/api-reference)

### Using GQL Queries
You will need to know how to call a GQL query. If unfamiliar with the process, you can find examples [here](../GQL/GQL%20Calls.md).

### Fetching a Chain Config 

It’s essential to have a solid understanding of how to interact with blockchain configurations. One of the recurring tasks you’ll need to accomplish is Fetching a Chain Config. This is a critical step because the chain config provides all the necessary information required to interact with a specific blockchain network, such as its RPC endpoints.

Fetching the chain config is a three step process:

	1.	**Retrieving All Chain UIDs**: This step allows you to gather all available chain unique identifiers (UIDs). We can do this using the [`All Chain`](../GQL/Chain/All%20Chains.md) GQL query.
```graphql
query Chains {
  chains {
    all_chains {
      chain_uid
      display_name
    }
  }
}
```
	2.	**Obtaining the Chain ID for a Specific UID**: Once you have the list of UIDs, the next step is to get the specific chain ID associated with the UID you’re interested in. We can do this using the [`Chain Config`](../GQL/Chain/Chain%20Config.md) GQL query:
  :::tip
  Use the chain UID you want the config for as the parameter.
  :::

```graphql
query Chain_config($chainUid: String) {
  chains {
    chain_config(chain_uid: $chainUid) {
      chain_id
    }
  }
}
``` 
	3.	**Fetching the Full Chain Config**: Finally, with the chain ID in hand, you can fetch the complete configuration details for that chain using the [`Keplr Config`](../GQL/Chain/Keplr%20Config.md) query:
  :::tip
  You can specify what info to return inside the query.
  :::

  ```graphql
query Keplr_config($chainId: String) {
  chains {
    keplr_config(chain_id: $chainId) {
      rest
      rpc
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
        "rest": "https://lcd.testnet-1.nibiru.fi",
        "rpc": "https://rpc.testnet-1.nibiru.fi",
        "chainID": "nibiru-testnet-1"
      }
    }
  }
}
  ```

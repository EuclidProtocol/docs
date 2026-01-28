---
sidebar_position: 1
description: "Introduction Into Euclid's API"
---

# Overview

The Euclid API is designed to facilitate interactions with the Euclid platform, enabling users to perform a variety of actions such as querying data, executing transactions, and more. This documentation aims to provide comprehensive information on how to use the API, including details on available endpoints, request and response formats, and example usages.

The Euclid API is built using GraphQL, a powerful query language for APIs that allows clients to request exactly the data they need. This approach avoids both the problems of over and under-fetching data, while also allowing for a more powerful and flexible API.

:::note
- Before reading these docs and using the API, it is recommended you familiarise yourself with [GraphQL](https://graphql.org/learn/) by reading the official GraphQL documentation.
:::

In addition to the GraphQL API, Euclid also provides a REST API, a traditional and widely-used approach for accessing web services. The REST API is mostly used to generate transactions that can be signed by a wallet and broadcast to chains.



## Available Queries

In the following sections, we will be covering all the available queries for the following:
:::note
Factory queries are only applicable to Cosmos-based chains. For EVM chains, use the corresponding router query as an alternative.
:::

- [Chains](./GQL/Chain/All%20Chains.md): Query chain information.
- [Factory](./GQL/Factory/All%20Pools.md): Query information from the factory contract.
- [Router](./GQL/Router/All%20Chains.md): Query information from the router contract.
- [VLP](./GQL/VLP/All%20Pools.md): Query information from VLP contracts.
- [VCoin](./GQL/Virtual%20Balance/Balance.md): Query information from the Virtual Balance contract.
- [Pool](./GQL/Pool/My%20Pools.md): Get information on Euclid pools such as liquidity and volume.
- [Token](./GQL/Token/Token%20Metadata.md): Get token metadata for tokens.
- [CW](./GQL/CW/Balance.md): Get information on a LP Tokens. 

### GraphQL Endpoints

**Testnet**: [`https://testnet.api.euclidprotocol.com`](https://testnet.api.euclidprotocol.com)



## REST API

In addition to the GraphQL API, the Euclid platform also provides a REST API for various operations. Below are the available REST API sections we will cover:

- [Routes](./REST/Routes/Get%20Routes.md): Get the available routes for a swap.
- [Transaction](./REST/Transactions/Swap.md): Generate transactions for various calls such as making swaps and adding/removing liquidity.

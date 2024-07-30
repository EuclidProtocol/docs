---
sidebar_position: 1
description: "Introduction Into Euclid's API"
---

# Introduction

The Euclid API is designed to facilitate interactions with the Euclid platform, enabling users to perform a variety of actions such as querying data, executing transactions, and more. This documentation aims to provide comprehensive information on how to use the API, including details on available endpoints, request and response formats, and example usages.


The Euclid API is built using GraphQL, a powerful query language for APIs that allows clients to request exactly the data they need. This approach avoids both the problems of over and under-fetching data, while also allowing for a more powerful and flexible Api.

:::note
Before reading these docs and using the Api, it is recommended you familiarise yourself with [GraphQL](https://graphql.org/learn/) by reading the official GraphQL documentation.
:::

## Available Queries

In the following sections, we will be covering all the available queries for the following:

- [Chain](../API/GQL/Chain/All%20Chain%20UIDs.md)
- [Factory](../API/GQL/Factory/All%20Pools.md)
- [Router](../API/GQL/Router/All%20Chains.md)
- [VLP](../API/GQL/VLP/All%20Pools.md)
- [VCoin](../API/GQL/Virtual%20Balance/Balance.md)

## API Endpoints

Here is a list of the available API endpoints:

### GET

- https://api.staging.euclidprotocol.com/api/v1/chains
- https://api.staging.euclidprotocol.com/api/v1/contracts 
- https://api.staging.euclidprotocol.com/api/v1/tokens
- https://api.staging.euclidprotocol.com/api/v1/tokens/details 

### POST

- https://api.staging.euclidprotocol.com/api/v1/routes 
- https://api.staging.euclidprotocol.com/api/v1/simulate_swap 
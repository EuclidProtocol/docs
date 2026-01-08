---
sidebar_position: 1
title: "Fetch All Tradeable Assets with Prices"
description: "Learn how to retrieve a list of all assets that can be traded through the Euclid protocol, including their IDs and prices."
---

import Tabs from '@site/src/components/Tabs';

# Fetch All Tradeable Assets with Prices

To build any trading interface or integrate with Euclid’s swap engine, you’ll likely want to start by fetching a complete list of tradeable tokens available on the protocol. This query gives you access to all tokens recognized by Euclid’s router, including their **tokenId** and **current price** in USD.

> **Tip:** The `token_metadatas` query also supports powerful filtering (verified only, specific chains, DEX names, pagination, etc.). For a full list of available fields and parameters, see the [Full Token Metadata Query](../../../GQL/Token/Token%20Metadata.md).

## GraphQL Query

<Tabs tabs={[
  {
    id: 'query-token-metadatas',
    label: 'Query',
    language: 'graphql',
    content: `
query Token_metadatas {
  token {
    token_metadatas {
      tokenId
      price
    }
  }
}
`
  },
  {
    id: 'response-token-metadatas',
    label: 'Response',
    language: 'json',
    content: `
{
  "data": {
    "token": {
      "token_metadatas": [
        {
          "tokenId": "pol",
          "price": "302.398686"
        },
        {
          "tokenId": "avax",
          "price": "784175.829278"
        },
        {
          "tokenId": "teth",
          "price": "412243.861452"
        },
        {
          "tokenId": "elys",
          "price": "7264.809695"
        },
        {
          "tokenId": "usdc.p",
          "price": "341025442719.642090"
        },
        {
          "tokenId": "0g",
          "price": "6033829.245428"
        },
        {
          "tokenId": "usdt",
          "price": "1.000000"
        },
        {
          "tokenId": "usdt.p",
          "price": "4281.590882"
        },
        {
          "tokenId": "usdc",
          "price": "1.000000"
        },
        {
          "tokenId": "orai",
          "price": "41.776128"
        },
        {
          "tokenId": "gimo",
          "price": "173936.051809"
        },
        {
          "tokenId": "plume",
          "price": "2732.463496"
        },
        {
          "tokenId": "nibi",
          "price": "149.838356"
        },
        {
          "tokenId": "inj",
          "price": "18.544231"
        },
        {
          "tokenId": "euclid",
          "price": "234423.080976"
        }
      ]
    }
  }
}
`
  }
]} />

<Tabs tabs={[
  {
    id: 'gql-curl',
    label: 'curl',
    language: 'bash',
    content: `
# fetch-assets.sh
curl --request POST \\
  --header 'content-type: application/json' \\
  --url 'https://testnet.api.euclidprotocol.com/graphql' \\
  --data '{"query":"query Token_metadatas { token { token_metadatas { tokenId price } } }"}'
`
  },
  {
    id: 'gql-apollo-react',
    label: 'Apollo (React)',
    language: 'javascript',
    content: `
// App.js
import React, { useEffect } from 'react';
import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://testnet.api.euclidprotocol.com/graphql' }),
  cache: new InMemoryCache(),
});

const TOKENS_QUERY = gql\`
  query Token_metadatas {
    token {
      token_metadatas {
        tokenId
        price
      }
    }
  }
\`;

function App() {
  useEffect(() => {
    client.query({ query: TOKENS_QUERY })
      .then((result) => console.log(result.data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return <h1>Check the browser console for the token list</h1>;
}

export default App;
`
  },
  {
    id: 'gql-apollo-node',
    label: 'Apollo (Node.js)',
    language: 'javascript',
    content: `
// index.js
const { ApolloClient, InMemoryCache, HttpLink, gql } = require('@apollo/client/core');
const fetch = require('cross-fetch');

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://testnet.api.euclidprotocol.com/graphql',
    fetch
  }),
  cache: new InMemoryCache(),
});

client.query({
  query: gql\`
    query Token_metadatas {
      token {
        token_metadatas {
          tokenId
          price
        }
      }
    }
  \`
}).then(result => {
  console.log(JSON.stringify(result.data, null, 2));
}).catch(err => {
  console.error('Error:', err);
});
`
  },
  {
    id: 'gql-playground',
    label: 'GraphQL Playground',
    language: 'graphql',
    content: `
# Use this in your GraphQL playground

query Token_metadatas {
  token {
    token_metadatas {
      tokenId
      price
    }
  }
}
`
  }
]} />

- Returns a list of all tradeable tokens with their IDs and prices.
- Supports additional filters like `verified`, `chain_uids`, `dex`, `limit`, `offset` and more.
- For full field list and parameters see [Full Token Metadata Query](../../../GQL/Token/Token%20Metadata.md).

## Verified vs. Unverified Tokens

Tokens returned by the Euclid API can have either a `true` or `false` value for the `is_verified` field.

- **Verified tokens** are manually reviewed and approved by the Euclid team. These are considered **legitimate, audited, or widely-recognized assets**.
- **Unverified tokens** are not necessarily malicious or scams. Many of them are user-generated assets created through **[Euclid Launch](https://launch.euclidprotocol.io/)**, a permissionless platform where anyone can deploy their own token.

 :::tip
 You can use the `verified` parameter in the `token_metadatas` query to filter only verified tokens:
:::

 ```graphql
 query VerifiedTokens {
   token {
     token_metadatas(verified: true) {
       tokenId
       price
     }
   }
 }
 ```

This distinction helps developers:
- Prioritize known/trusted assets in frontends
- Warn users when interacting with unknown tokens
- Maintain full control over the types of tokens they choose to showcase or support

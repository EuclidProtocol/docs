---
sidebar_position: 2
title: "Fetch All Supported Chains"
description: "Learn how to retrieve all supported chains in the Euclid protocol, including chain IDs, unique identifiers, and factory addresses."
---

import Tabs from '@site/src/components/Tabs';

# Fetch All Supported Chains

Euclid supports trading across multiple blockchains, including both Cosmos and EVM-based chains. To fetch the list of all currently supported chains, use the `all_chains` query via the `router` object.

Each chain includes:
- `chain_id`: The native chain ID used for on-chain interactions
- `chain_uid`: A unique identifier used within the Euclid API and routing layer
- `factory_address`: The contract responsible for managing pools or trades on that chain

## GraphQL Query
<!-- no toc -->

**Example Requests**

<Tabs tabs={[
  {
    id: 'query-all-chains',
    label: 'Query',
    language: 'graphql',
    content: `
query Router {
  router {
    all_chains {
      chain_id
      chain_uid
      factory_address
    }
  }
}
`
  },
  {
    id: 'response-all-chains',
    label: 'Response',
    language: 'json',
    content: `
{
  "data": {
    "router": {
      "all_chains": [
        {
          "chain_id": "16602",
          "chain_uid": "0g",
          "factory_address": "0x171931f5670037173b9db13ab83186adab350cf2"
        },
        {
          "chain_id": "constantine-3",
          "chain_uid": "archway",
          "factory_address": "archway1p7wukzdarjnt092ed6x4rkxv3k22evd5m36tpq3rcxvln0uzugesxds9tk"
        },
        {
          "chain_id": "84532",
          "chain_uid": "base",
          "factory_address": "0x00a739e4479c97289801654ec1a52a67077613c0"
        },
        {
          "chain_id": "coreum-testnet-1",
          "chain_uid": "coreum",
          "factory_address": "testcore1x2mr6lpjdd2xzk8cgsq88lp4xgthnr85e5qeamrmrl8zf3lu522qx3yxsj"
        },
        {
          "chain_id": "injective-888",
          "chain_uid": "injective",
          "factory_address": "inj1mhk96ahzy54hjdw8xu9wug89yeg5y8dgm2g35q"
        },
        {
          "chain_id": "3441006",
          "chain_uid": "manta",
          "factory_address": "0x30edc073c7c9ce02cba22895020c7f2f8f897007"
        }
        // ... more chains
      ]
    }
  }
}
`
  }
]} />

**Example Requests**

<Tabs tabs={[
  {
    id: 'gql-curl',
    label: 'curl',
    language: 'bash',
    content: `
curl --request POST \\
  --header 'content-type: application/json' \\
  --url 'https://api.euclidprotocol.com/graphql' \\
  --data '{"query":"query Router { router { all_chains { chain_id chain_uid factory_address } } }"}'
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
  link: new HttpLink({ uri: 'https://api.euclidprotocol.com/graphql' }),
  cache: new InMemoryCache(),
});

const CHAINS_QUERY = gql\\\`
  query Router {
    router {
      all_chains {
        chain_id
        chain_uid
        factory_address
      }
    }
  }
\\\`;

function App() {
  useEffect(() => {
    client.query({ query: CHAINS_QUERY })
      .then((result) => console.log(result.data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return <h1>Check the browser console for the list of supported chains</h1>;
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
    uri: 'https://api.euclidprotocol.com/graphql',
    fetch
  }),
  cache: new InMemoryCache(),
});

client.query({
  query: gql\\\`
    query Router {
      router {
        all_chains {
          chain_id
          chain_uid
          factory_address
        }
      }
    }
  \\\`
}).then(result => {
  console.log(JSON.stringify(result.data, null, 2));
}).catch(err => {
  console.error('Error:', err);
});
`
  }
]} />



## Get Chain RPC Configuration

For wallet integrations or on-chain signing, you may need access to chain-specific configuration such as RPC URLs, explorer URLs, and native currency metadata. The Euclid API provides separate queries for EVM and Cosmos-based chains. Below are minimal examples to retrieve just the most essential fields.


### EVM Chain Configuration

Use this query to fetch the default RPC URL and explorer URL for an EVM-compatible chain using either `chain_uid` or `chain_id`.

```graphql
query Evm_chain_config($chainUid: String, $chainId: String) {
  chains {
    evm_chain_config(chain_uid: $chainUid, chain_id: $chainId) {
      rpc_urls {
        default {
          http
        }
      }
      explorer_url
      name
    }
  }
}
```

<Tabs tabs={[
  {
    id: 'evm-curl',
    label: 'curl',
    language: 'bash',
    content: `
curl --request POST \\
  --header 'content-type: application/json' \\
  --url 'https://api.euclidprotocol.com/graphql' \\
  --data '{
    "query": "query Evm_chain_config($chainUid: String, $chainId: String) { chains { evm_chain_config(chain_uid: $chainUid, chain_id: $chainId) { rpc_urls { default { http } } explorer_url name } } }",
    "variables": {
      "chainUid": "somnia",
      "chainId": null
    }
  }'
`
  },
  {
    id: 'evm-apollo-react',
    label: 'Apollo (React)',
    language: 'javascript',
    content: `
// App.js
import React, { useEffect } from 'react';
import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://api.euclidprotocol.com/graphql' }),
  cache: new InMemoryCache(),
});

const EVM_QUERY = gql\\\`
  query Evm_chain_config($chainUid: String, $chainId: String) {
    chains {
      evm_chain_config(chain_uid: $chainUid, chain_id: $chainId) {
        rpc_urls {
          default {
            http
          }
        }
        explorer_url
        name
      }
    }
  }
\\\`;

function App() {
  useEffect(() => {
    client.query({
      query: EVM_QUERY,
      variables: {
        chainUid: "somnia",
        chainId: null
      }
    })
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
  }, []);

  return <h1>Check the console for EVM chain config</h1>;
}

export default App;
`
  },
  {
    id: 'evm-apollo-node',
    label: 'Apollo (Node.js)',
    language: 'javascript',
    content: `
// index.js
const { ApolloClient, InMemoryCache, HttpLink, gql } = require('@apollo/client/core');
const fetch = require('cross-fetch');

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.euclidprotocol.com/graphql',
    fetch
  }),
  cache: new InMemoryCache(),
});

const EVM_QUERY = gql\\\`
  query Evm_chain_config($chainUid: String, $chainId: String) {
    chains {
      evm_chain_config(chain_uid: $chainUid, chain_id: $chainId) {
        rpc_urls {
          default {
            http
          }
        }
        explorer_url
        name
      }
    }
  }
\\\`;

client.query({
  query: EVM_QUERY,
  variables: {
    chainUid: "somnia",
    chainId: null
  }
})
.then(res => console.log(JSON.stringify(res.data, null, 2)))
.catch(err => console.error(err));
`
  }
]} />



### Cosmos (Keplr) Chain Configuration

For Cosmos-based chains, the Euclid API exposes Keplr-compatible configuration including RPC and REST URLs, chain metadata, and explorer links. These values are essential for setting up wallet connections, broadcasting transactions, and displaying chain information in your frontend.

Use the following query to retrieve RPC endpoints, REST endpoints, and explorer details using either the `chain_id` or `chain_uid`.


**Example Requests**

<Tabs tabs={[
  {
    id: 'keplr-curl',
    label: 'curl',
    language: 'bash',
    content: `
curl --request POST \\
  --header 'content-type: application/json' \\
  --url 'https://api.euclidprotocol.com/graphql' \\
  --data '{
    "query": "query Keplr_config($chainId: String, $chainUid: String) { chains { keplr_config(chain_id: $chainId, chain_uid: $chainUid) { chainID chainName rpc rest explorer_url } } }",
    "variables": {
      "chainUid": "injective",
      "chainId": null
    }
  }'
`
  },
  {
    id: 'keplr-apollo-react',
    label: 'Apollo (React)',
    language: 'javascript',
    content: `
// App.js
import React, { useEffect } from 'react';
import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://api.euclidprotocol.com/graphql' }),
  cache: new InMemoryCache(),
});

const KEPLR_QUERY = gql\\\`
  query Keplr_config($chainId: String, $chainUid: String) {
    chains {
      keplr_config(chain_id: $chainId, chain_uid: $chainUid) {
        chainID
        chainName
        rpc
        rest
        explorer_url
      }
    }
  }
\\\`;

function App() {
  useEffect(() => {
    client.query({
      query: KEPLR_QUERY,
      variables: {
        chainUid: "cosmos:osmosis",
        chainId: null
      }
    })
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
  }, []);

  return <h1>Check the console for Keplr chain config</h1>;
}

export default App;
`
  },
  {
    id: 'keplr-apollo-node',
    label: 'Apollo (Node.js)',
    language: 'javascript',
    content: `
// index.js
const { ApolloClient, InMemoryCache, HttpLink, gql } = require('@apollo/client/core');
const fetch = require('cross-fetch');

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.euclidprotocol.com/graphql',
    fetch
  }),
  cache: new InMemoryCache(),
});

const KEPLR_QUERY = gql\\\`
  query Keplr_config($chainId: String, $chainUid: String) {
    chains {
      keplr_config(chain_id: $chainId, chain_uid: $chainUid) {
        chainID
        chainName
        rpc
        rest
        explorer_url
      }
    }
  }
\\\`;

client.query({
  query: KEPLR_QUERY,
  variables: {
    chainUid: "injective",
    chainId: null
  }
})
.then(res => console.log(JSON.stringify(res.data, null, 2)))
.catch(err => console.error(err));
`
  }
]} />

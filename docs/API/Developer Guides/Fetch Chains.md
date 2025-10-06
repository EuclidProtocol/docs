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

```graphql
query Router {
  router {
    all_chains {
      chain_id
      chain_uid
      factory_address
    }
  }
}
```

<Tabs tabs={[
  {
    id: 'gql-curl',
    label: 'curl',
    language: 'bash',
    content: `
# fetch-chains.sh
curl --request POST \\
  --header 'content-type: application/json' \\
  --url 'https://testnet.api.euclidprotocol.com/graphql' \\
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
  link: new HttpLink({ uri: 'https://testnet.api.euclidprotocol.com/graphql' }),
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
    uri: 'https://testnet.api.euclidprotocol.com/graphql',
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
  },
  {
    id: 'gql-playground',
    label: 'GraphQL Playground',
    language: 'graphql',
    content: `
# Paste this into the GraphQL Playground

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
# fetch-evm-config.sh
curl --request POST \\
  --header 'content-type: application/json' \\
  --url 'https://testnet.api.euclidprotocol.com/graphql' \\
  --data '{
    "query": "query Evm_chain_config($chainUid: String, $chainId: String) { chains { evm_chain_config(chain_uid: $chainUid, chain_id: $chainId) { rpc_urls { default { http } } explorer_url name } } }",
    "variables": {
      "chainUid": "evm:0g",
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
  link: new HttpLink({ uri: 'https://testnet.api.euclidprotocol.com/graphql' }),
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
        chainUid: "evm:0g",
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
    uri: 'https://testnet.api.euclidprotocol.com/graphql',
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
    chainUid: "evm:0g",
    chainId: null
  }
})
.then(res => console.log(JSON.stringify(res.data, null, 2)))
.catch(err => console.error(err));
`
  },
  {
    id: 'evm-playground',
    label: 'GraphQL Playground',
    language: 'graphql',
    content: `
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
`
  }
]} />



### Cosmos (Keplr) Chain Configuration

For Cosmos-based chains, the Euclid API exposes Keplr-compatible configuration including RPC and REST URLs, chain metadata, and explorer links. These values are essential for setting up wallet connections, broadcasting transactions, and displaying chain information in your frontend.

Use the following query to retrieve RPC endpoints, REST endpoints, and explorer details using either the `chain_id` or `chain_uid`.


<Tabs tabs={[
  {
    id: 'keplr-curl',
    label: 'curl',
    language: 'bash',
    content: `
# fetch-keplr-config.sh
curl --request POST \\
  --header 'content-type: application/json' \\
  --url 'https://testnet.api.euclidprotocol.com/graphql' \\
  --data '{
    "query": "query Keplr_config($chainId: String, $chainUid: String) { chains { keplr_config(chain_id: $chainId, chain_uid: $chainUid) { chainID chainName rpc rest explorer_url } } }",
    "variables": {
      "chainUid": "cosmos:osmosis",
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
  link: new HttpLink({ uri: 'https://testnet.api.euclidprotocol.com/graphql' }),
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
    uri: 'https://testnet.api.euclidprotocol.com/graphql',
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
    chainUid: "cosmos:osmosis",
    chainId: null
  }
})
.then(res => console.log(JSON.stringify(res.data, null, 2)))
.catch(err => console.error(err));
`
  },
  {
    id: 'keplr-playground',
    label: 'GraphQL Playground',
    language: 'graphql',
    content: `
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
`
  }
]} />
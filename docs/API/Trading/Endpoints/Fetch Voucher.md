---
sidebar_position: 5
title: "Fetch All Voucher Balances for a Certain Address and Network"
description: "Query the voucher balances for a specific user on a specific chain using the Euclid API."
---

import Tabs from '@site/src/components/Tabs';

## Fetch voucher balances for a single chain

To retrieve all voucher balances for a specific user on a specific chain, use the `user_balance` query. This is commonly used to display the assets a user holds across different chains within the Euclid protocol.

This query takes a `CrossChainUserInput` object, which includes:
- `address`: The user's wallet address
- `chain_uid`: The identifier for the chain (e.g. `ronin`, `sepolia`, `bsc`, etc.)

The result includes:
- `token_id`: Identifier for the voucher or token
- `amount`: The user's balance of that token, represented as a stringified number (typically in base units)

**GraphQL Query**

<Tabs tabs={[
  {
    id: 'query-user-balance',
    label: 'Query',
    language: 'graphql',
    content: `
query User_balance($user: CrossChainUserInput) {
  vcoin {
    user_balance(user: $user) {
      balances {
        amount
        token_id
      }
    }
  }
}
`
  },
  {
    id: 'response-user-balance',
    label: 'Response',
    language: 'json',
    content: `
{
  "data": {
    "vcoin": {
      "user_balance": {
        "balances": [
          {
            "amount": "85018000",
            "token_id": "euclid"
          },
          {
            "amount": "390694453532477",
            "token_id": "mon"
          },
          {
            "amount": "1373394103192839",
            "token_id": "stt"
          }
        ]
      }
    }
  }
}
`
  }
]} />

**Example Requests**

<Tabs tabs={[
  {
    id: 'vouchers-curl',
    label: 'curl',
    language: 'bash',
    content: `
# fetch-vouchers.sh
curl --request POST \\
  --header 'content-type: application/json' \\
  --url 'https://api.euclidprotocol.com/graphql' \\
  --data '{
    "query": "query User_balance($user: CrossChainUserInput) { vcoin { user_balance(user: $user) { balances { amount token_id } } } }",
    "variables": {
      "user": {
        "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
        "chain_uid": "ronin"
      }
    }
  }'
`
  },
  {
    id: 'vouchers-apollo-react',
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

const VOUCHER_QUERY = gql\\\`
  query User_balance($user: CrossChainUserInput) {
    vcoin {
      user_balance(user: $user) {
        balances {
          amount
          token_id
        }
      }
    }
  }
\\\`;

function App() {
  useEffect(() => {
    client.query({
      query: VOUCHER_QUERY,
      variables: {
        user: {
          address: "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
          chain_uid: "ronin"
        }
      }
    })
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
  }, []);

  return <h1>Check the console for voucher balances</h1>;
}

export default App;
`
  },
  {
    id: 'vouchers-apollo-node',
    label: 'Apollo (Node.js)',
    language: 'javascript',
    content: `
// index.js
const { ApolloClient, InMemoryCache, HttpLink, gql } = require('@apollo/client/core');
const fetch = require('cross-fetch');

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://api.euclidprotocol.com/graphql', fetch }),
  cache: new InMemoryCache(),
});

const VOUCHER_QUERY = gql\\\`
  query User_balance($user: CrossChainUserInput) {
    vcoin {
      user_balance(user: $user) {
        balances {
          amount
          token_id
        }
      }
    }
  }
\\\`;

client.query({
  query: VOUCHER_QUERY,
  variables: {
    user: {
      address: "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
      chain_uid: "ronin"
    }
  }
})
.then(res => console.log(JSON.stringify(res.data, null, 2)))
.catch(err => console.error(err));
`
  }
]} />

## Fetch voucher balances for all chains

To retrieve all voucher balances for a specific user across multiple chains, use the `unified_user_balance` query. This is commonly used to display the assets a user holds across all chains within the Euclid protocol.

This query takes:
- `address`: The user's wallet address
- `limit` (optional): Max number of chains to return
- `offset` (optional): Offset for pagination
- `chainUids` (optional): List of chain UIDs to filter results

The result includes:
- `chain_uid`: The chain identifier
- `balances`: A list of balances for each chain, each containing:
  - `token_id`: Identifier for the voucher or token
  - `amount`: The user's balance of that token, represented as a stringified number (typically in base units)

**GraphQL Query**

<Tabs tabs={[
  {
    id: 'query-unified-user-balance',
    label: 'Query',
    language: 'graphql',
    content: `
query Unified_user_balance($address: String!, $limit: Int, $offset: Int, $chainUids: [String]) {
  vcoin {
    unified_user_balance(address: $address, limit: $limit, offset: $offset, chain_uids: $chainUids) {
      balances {
        amount
        token_id
      }
      chain_uid
    }
  }
}
`
  },
  {
    id: 'response-unified-user-balance',
    label: 'Response',
    language: 'json',
    content: `
{
  "data": {
    "vcoin": {
      "unified_user_balance": [
        {
          "balances": [
            {
              "amount": "1853517775174948",
              "token_id": "inj"
            }
          ],
          "chain_uid": "arbitrum"
        },
        {
          "balances": [],
          "chain_uid": "avalanchefuji"
        },
        {
          "balances": [
            {
              "amount": "3206614370631",
              "token_id": "0g"
            },
            {
              "amount": "3",
              "token_id": "bnb"
            },
            {
              "amount": "7",
              "token_id": "eth"
            },
            {
              "amount": "14000000",
              "token_id": "euclid"
            },
            {
              "amount": "90044203832",
              "token_id": "inj"
            },
            {
              "amount": "949949949949949950",
              "token_id": "meta.eucl"
            },
            {
              "amount": "17478911",
              "token_id": "mon"
            }
          ],
          "chain_uid": "base"
        },
        {
          "balances": [
            {
              "amount": "800000000000000010",
              "token_id": "bnb"
            }
          ],
          "chain_uid": "bsc"
        },
        {
          "balances": [],
          "chain_uid": "hyperliquid"
        },
        {
          "balances": [],
          "chain_uid": "linea"
        },
        {
          "balances": [],
          "chain_uid": "manta"
        },
        {
          "balances": [
            {
              "amount": "10000000",
              "token_id": "euclid"
            }
          ],
          "chain_uid": "mantle"
        },
        {
          "balances": [],
          "chain_uid": "megaeth"
        },
        {
          "balances": [
            {
              "amount": "159652001435611",
              "token_id": "0g"
            },
            {
              "amount": "15137555323575",
              "token_id": "inj"
            },
            {
              "amount": "20927150763492209",
              "token_id": "phrs"
            },
            {
              "amount": "1",
              "token_id": "usdc"
            }
          ],
          "chain_uid": "pharos"
        },
        {
          "balances": [
            {
              "amount": "7453807838060",
              "token_id": "0g"
            },
            {
              "amount": "1380562451",
              "token_id": "euclid"
            }
          ],
          "chain_uid": "plume"
        },
        {
          "balances": [
            {
              "amount": "4519066231475348125",
              "token_id": "dnl.eucl"
            },
            {
              "amount": "60018000",
              "token_id": "euclid"
            },
            {
              "amount": "233056",
              "token_id": "inj"
            },
            {
              "amount": "390694453532477",
              "token_id": "mon"
            },
            {
              "amount": "35000000000000000000",
              "token_id": "ron"
            },
            {
              "amount": "1373394103192839",
              "token_id": "stt"
            }
          ],
          "chain_uid": "ronin"
        },
        {
          "balances": [],
          "chain_uid": "scroll"
        },
        {
          "balances": [
            {
              "amount": "13",
              "token_id": "eth"
            },
            {
              "amount": "1042493",
              "token_id": "euclid"
            },
            {
              "amount": "2515362757496583909",
              "token_id": "stt"
            },
            {
              "amount": "5136119019",
              "token_id": "usdc"
            }
          ],
          "chain_uid": "sepolia"
        },
        {
          "balances": [
            {
              "amount": "1377336598873070",
              "token_id": "0g"
            },
            {
              "amount": "8",
              "token_id": "avax"
            },
            {
              "amount": "4",
              "token_id": "bnb"
            },
            {
              "amount": "848877197389",
              "token_id": "const"
            },
            {
              "amount": "72985",
              "token_id": "euclid"
            },
            {
              "amount": "956970",
              "token_id": "mnt"
            },
            {
              "amount": "1044021433751218343",
              "token_id": "mon"
            },
            {
              "amount": "12663336",
              "token_id": "nibi"
            },
            {
              "amount": "3",
              "token_id": "phrs"
            },
            {
              "amount": "247",
              "token_id": "stars"
            },
            {
              "amount": "4556874054263",
              "token_id": "stt"
            },
            {
              "amount": "994994994994994995",
              "token_id": "testnameleng.eucl"
            },
            {
              "amount": "480669361",
              "token_id": "usdc"
            }
          ],
          "chain_uid": "somnia"
        },
        {
          "balances": [],
          "chain_uid": "soneium"
        },
        {
          "balances": [],
          "chain_uid": "sonic"
        },
        {
          "balances": [
            {
              "amount": "5000000",
              "token_id": "andr"
            }
          ],
          "chain_uid": "taiko"
        },
        {
          "balances": [
            {
              "amount": "1000001",
              "token_id": "euclid"
            }
          ],
          "chain_uid": "unichain"
        }
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
    id: 'unified-vouchers-curl',
    label: 'curl',
    language: 'bash',
    content: `
# fetch-vouchers-all-chains.sh
curl --request POST \\
  --header 'content-type: application/json' \\
  --url 'https://api.euclidprotocol.com/graphql' \\
  --data '{
    "query": "query Unified_user_balance($address: String!, $limit: Int, $offset: Int, $chainUids: [String]) { vcoin { unified_user_balance(address: $address, limit: $limit, offset: $offset, chain_uids: $chainUids) { balances { amount token_id } chain_uid } } }",
    "variables": {
      "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
      "limit": 2,
      "offset": 1,
      "chainUids": null
    }
  }'
`
  },
  {
    id: 'unified-vouchers-apollo-react',
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

const UNIFIED_VOUCHER_QUERY = gql\\\`
  query Unified_user_balance($address: String!, $limit: Int, $offset: Int, $chainUids: [String]) {
    vcoin {
      unified_user_balance(address: $address, limit: $limit, offset: $offset, chain_uids: $chainUids) {
        balances {
          amount
          token_id
        }
        chain_uid
      }
    }
  }
\\\`;

function App() {
  useEffect(() => {
    client.query({
      query: UNIFIED_VOUCHER_QUERY,
      variables: {
        address: "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
        limit: 2,
        offset: 1,
        chainUids: null
      }
    })
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
  }, []);

  return <h1>Check the console for voucher balances</h1>;
}

export default App;
`
  },
  {
    id: 'unified-vouchers-apollo-node',
    label: 'Apollo (Node.js)',
    language: 'javascript',
    content: `
// index.js
const { ApolloClient, InMemoryCache, HttpLink, gql } = require('@apollo/client/core');
const fetch = require('cross-fetch');

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://api.euclidprotocol.com/graphql', fetch }),
  cache: new InMemoryCache(),
});

const UNIFIED_VOUCHER_QUERY = gql\\\`
  query Unified_user_balance($address: String!, $limit: Int, $offset: Int, $chainUids: [String]) {
    vcoin {
      unified_user_balance(address: $address, limit: $limit, offset: $offset, chain_uids: $chainUids) {
        balances {
          amount
          token_id
        }
        chain_uid
      }
    }
  }
\\\`;

client.query({
  query: UNIFIED_VOUCHER_QUERY,
  variables: {
    address: "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
    limit: 2,
    offset: 1,
    chainUids: null
  }
})
.then(res => console.log(JSON.stringify(res.data, null, 2)))
.catch(err => console.error(err));
`
  }
]} />

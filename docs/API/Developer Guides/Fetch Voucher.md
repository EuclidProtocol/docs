---
sidebar_position: 5
title: "Fetch All Vouchers for a Certain Address and Network"
description: "Query the voucher balances for a specific user on a specific chain using the Euclid API."
---

import Tabs from '@site/src/components/Tabs';

# Fetch All Vouchers for a Address and Network

To retrieve all voucher balances for a specific user on a specific chain, use the `user_balance` query. This is commonly used to display the assets a user holds across different chains within the Euclid protocol.

This query takes a `CrossChainUserInput` object, which includes:
- `address`: The user's wallet address
- `chain_uid`: The identifier for the chain (e.g. `ronin`, `sepolia`, `bsc`, etc.)

The result includes:
- `token_id`: Identifier for the voucher or token
- `amount`: The user's balance of that token, represented as a stringified number (typically in base units)

## GraphQL Query

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

<Tabs tabs={[
  {
    id: 'vouchers-curl',
    label: 'curl',
    language: 'bash',
    content: `
# fetch-vouchers.sh
curl --request POST \\
  --header 'content-type: application/json' \\
  --url 'https://testnet.api.euclidprotocol.com/graphql' \\
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
  link: new HttpLink({ uri: 'https://testnet.api.euclidprotocol.com/graphql' }),
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
  link: new HttpLink({ uri: 'https://testnet.api.euclidprotocol.com/graphql', fetch }),
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
  },
  {
    id: 'vouchers-playground',
    label: 'GraphQL Playground',
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
  }
]} />
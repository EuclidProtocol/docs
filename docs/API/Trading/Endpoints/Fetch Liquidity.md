---
sidebar_position: 4
title: "Fetch All VLPs"
description: "Retrieve VLPs from the Euclid protocol. Supports optional pagination with limit, skip, and min/max filters."
hide_table_of_contents: true
---

import Tabs from '@site/src/components/Tabs';

# Fetch All VLPs

Fetching all VLPs is a common requirement when building features like liquidity provisioning, swap routing, or displaying available token pairs in your interface. This query returns a list of VLPs from the Euclid protocol, where each entry includes a unique `vlp` identifier along with the associated `token_1` and `token_2`. You can use this data to power user interfaces for adding or removing liquidity to pools.

:::note
All VLPs are returned including VLPs for unverfied tokens.
:::

You can optionally use the following parameters to paginate or filter the results:
- `limit`: Maximum number of VLPs to return (default is `10`)
- `skip`: Number of results to skip (for pagination)
- `min`: Filter VLPs with liquidity greater than or equal to these token values
- `max`: Filter VLPs with liquidity less than or equal to these token values

## GraphQL Query
<!-- no toc -->

<Tabs tabs={[
  {
    id: 'query-all-vlps',
    label: 'Query',
    language: 'graphql',
    content: `
query All_vlps($max: [String], $min: [String], $skip: Int, $limit: Int) {
  router {
    all_vlps(max: $max, min: $min, skip: $skip, limit: $limit) {
      vlps {
        vlp
        token_1
        token_2
      }
    }
  }
}
`
  },
  {
    id: 'response-all-vlps',
    label: 'Response',
    language: 'json',
    content: `
{
  "data": {
    "router": {
      "all_vlps": {
        "vlps": [
          {
            "vlp": "euclid19g5hy30md85trta4j4g5t02v8rtefkfvrrd2j9fqcxjwwfnah6asyuljdv",
            "token_1": "0g",
            "token_2": "0glabs.eucl"
          },
          {
            "vlp": "euclid1p0wva70n5ypwrka7nagwft5yxtl8amgsyku4vfc8h7hkccquu5nsnm7lnl",
            "token_1": "0g",
            "token_2": "0gmn.eucl"
          },
          {
            "vlp": "euclid1jdq73nn5x5cetrwzd9gxzxg8drsdvyy6jax5a7uh72g2p9kqzcaqs9ymf6",
            "token_1": "0g",
            "token_2": "0gxbase.eucl"
          },
          {
            "vlp": "euclid12a4ecpxsz8pz75chryl6wda6fsnqdx8zgn4ykvp0u7v939m50tvswvnvw8",
            "token_1": "0g",
            "token_2": "0gxbillions.eucl"
          },
          {
            "vlp": "euclid1y2t7uplrund64g3qc034j7pvfnq7udfqck6k5hxnq7gxtdm30zzsxuk8v9",
            "token_1": "0g",
            "token_2": "0gxcat.eucl"
          },
          {
            "vlp": "euclid1d9zk7059mmdjhfeh3aurh7ap0lvrwvzvalw2a9lwq90x9aftm7hqk36ctr",
            "token_1": "0g",
            "token_2": "0gxgimo.eucl"
          },
          {
            "vlp": "euclid10p40zvcpsw669sxhekl5garn20pyu42sv3fq9a9m9zsd56qdjkksq9h0qp",
            "token_1": "0g",
            "token_2": "0gxpanda.eucl"
          },
          {
            "vlp": "euclid1exl8u9s4hdp677u309qq4wmsswt8qr655qtzznpf388233xxx9xsr9m5n0",
            "token_1": "0g",
            "token_2": "0gxsomnia.eucl"
          },
          {
            "vlp": "euclid10w2r5clte0lg00wqgpxkfllehjt7sy7kqg9x6c3945qqyfjd3e9ssm5rzx",
            "token_1": "0g",
            "token_2": "0t.eucl"
          },
          {
            "vlp": "euclid12rm6zpgnusdt6y8pwt6nds7tmqrxd4e7ww6r0wwxxpvexdk4y5dsv3u8ae",
            "token_1": "0g",
            "token_2": "0xb.eucl"
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
    id: 'vlps-curl',
    label: 'curl',
    language: 'bash',
    content: `
# fetch-vlps.sh
curl --request POST \\
  --header 'content-type: application/json' \\
  --url 'https://testnet.api.euclidprotocol.com/graphql' \\
  --data '{
    "query": "query All_vlps($max: [String], $min: [String], $skip: Int, $limit: Int) { router { all_vlps(max: $max, min: $min, skip: $skip, limit: $limit) { vlps { vlp token_1 token_2 } } } }",
    "variables": {
      "limit": 20,
      "skip": 0
    }
  }'
`
  },
  {
    id: 'vlps-apollo-react',
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

const VLP_QUERY = gql\\\`
  query All_vlps($max: [String], $min: [String], $skip: Int, $limit: Int) {
    router {
      all_vlps(max: $max, min: $min, skip: $skip, limit: $limit) {
        vlps {
          vlp
          token_1
          token_2
        }
      }
    }
  }
\\\`;

function App() {
  useEffect(() => {
    client.query({
      query: VLP_QUERY,
      variables: {
        limit: 20,
        skip: 0
      }
    })
    .then((result) => console.log(result.data))
    .catch((error) => console.error("Error:", error));
  }, []);

  return <h1>Check the console for VLP data</h1>;
}

export default App;
`
  },
  {
    id: 'vlps-apollo-node',
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

client.query({
  query: gql\\\`
    query All_vlps($max: [String], $min: [String], $skip: Int, $limit: Int) {
      router {
        all_vlps(max: $max, min: $min, skip: $skip, limit: $limit) {
          vlps {
            vlp
            token_1
            token_2
          }
        }
      }
    }
  \\\`,
  variables: {
    limit: 20,
    skip: 0
  }
}).then(res => {
  console.log(JSON.stringify(res.data, null, 2));
}).catch(err => console.error("Error:", err));
`
  }
]} />

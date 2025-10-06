---
sidebar_position: 6
description: "Learn how to send your first GraphQL and REST requests to the Euclid API."
---
import Tabs from '@site/src/components/Tabs';

# Send Your First API Request

Once your environment is set up, you’re ready to send your first request to the Euclid API. This page covers both GraphQL and REST examples using common tools and languages.


## GraphQL Example

Let’s fetch a list of all tokens available through the Euclid router.

### GraphQL Query

```graphql
query Router {
  router {
    all_tokens {
      tokens
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
# index.sh
curl -X POST https://testnet.api.euclidprotocol.com/graphql \\
  -H "Content-Type: application/json" \\
  -d '{"query":"query Router { router { all_tokens { tokens } } }"}'
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

function App() {
  useEffect(() => {
    client
      .query({
        query: gql\`
          query Router {
            router {
              all_tokens {
                tokens
              }
            }
          }
        \`,
      })
      .then((result) => {
        console.log('API Response:', result.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return <h1>Check the browser console for the API response</h1>;
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
const { ApolloClient, InMemoryCache, gql, HttpLink } = require('@apollo/client/core');
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
    query Router {
      router {
        all_tokens {
          tokens
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
# Use this directly in your GraphQL playground

query Router {
  router {
    all_tokens {
      tokens
    }
  }
}
`
  }
]} />


## REST Example

Let’s track the status of a transaction on the `0g` chain using the REST API.

### Endpoint

```
POST https://testnet.api.euclidprotocol.com/api/v1/txn/track
```

<Tabs tabs={[
  {
    id: 'rest-curl',
    label: 'curl',
    language: 'bash',
    content: `
# index.sh
curl -X 'POST' \\
  'https://testnet.api.euclidprotocol.com/api/v1/txn/track' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "chain": "0g",
    "tx_hash": "0x9bfa76b64264c641d8d37b3ec46ba05d3f39442d817b95e9aff294bb56f2f31a"
}'
`
  },
  {
    id: 'rest-fetch',
    label: 'fetch (JavaScript)',
    language: 'javascript',
    content: `
// index.js
fetch('https://testnet.api.euclidprotocol.com/api/v1/txn/track', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json'
  },
  body: JSON.stringify({
    chain: '0g',
    tx_hash: '0x9bfa76b64264c641d8d37b3ec46ba05d3f39442d817b95e9aff294bb56f2f31a'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
`
  },
  {
    id: 'rest-axios',
    label: 'Axios (JavaScript)',
    language: 'javascript',
    content: `
// index.js
const axios = require('axios');

axios.post('https://testnet.api.euclidprotocol.com/api/v1/txn/track', {
  chain: '0g',
  tx_hash: '0x9bfa76b64264c641d8d37b3ec46ba05d3f39442d817b95e9aff294bb56f2f31a'
}, {
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json'
  }
})
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
`
  },
  {
    id: 'rest-python',
    label: 'Python (requests)',
    language: 'python',
    content: `
# index.py
import requests

url = "https://testnet.api.euclidprotocol.com/api/v1/txn/track"
headers = {
  "accept": "application/json",
  "Content-Type": "application/json"
}
data = {
  "chain": "0g",
  "tx_hash": "0x9bfa76b64264c641d8d37b3ec46ba05d3f39442d817b95e9aff294bb56f2f31a"
}

response = requests.post(url, headers=headers, json=data)
print(response.json())
`
  },
  {
    id: 'rest-postman',
    label: 'Postman (Sample Request)',
    language: 'json',
    content: `
# Use this as a Postman raw JSON body

{
  "method": "POST",
  "url": "https://testnet.api.euclidprotocol.com/api/v1/txn/track",
  "headers": [
    {
      "key": "Content-Type",
      "value": "application/json"
    },
    {
      "key": "accept",
      "value": "application/json"
    }
  ],
  "body": {
    "mode": "raw",
    "raw": "{\\n  \\"chain\\": \\"0g\\",\\n  \\"tx_hash\\": \\"0x9bfa76b64264c641d8d37b3ec46ba05d3f39442d817b95e9aff294bb56f2f31a\\"\\n}"
  }
}
`
  }
]} />
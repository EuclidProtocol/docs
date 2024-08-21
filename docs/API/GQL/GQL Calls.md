---
sidebar_position: 1
---
import Tabs from '@site/src/components/Tabs';

# Usage Examples

In this guide, we’ll walk you through how to interact with a GraphQL API using some popular languages. 
### JavaScript (Apollo Client)
:::note
- You can read more about the Apollo Client and its features in their [docs](https://www.apollographql.com/docs/).
- You can find the all the GQL queries in the [previous section](../Intro.md)
:::

Apollo Client is a comprehensive and popular state management library that allows you to manage both local and remote data with GraphQL. It is designed to work seamlessly with your GraphQL server, providing a powerful and flexible way to query, cache, and manipulate data in your application.

```javascript
const { ApolloClient, InMemoryCache, gql, HttpLink } = require('@apollo/client/core');
const fetch = require('cross-fetch');

// Initialize the Apollo Client and define the GQL endpoint
const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://api.euclidprotocol.com/graphql', fetch }),
  cache: new InMemoryCache(),
});

// Define the GraphQL query 
const query = gql`
  query Chains($chainUId: String!, $type: String!) {
    chains {
      contracts(chainUId: $chainUId, type: $type) {
        CreatedAt
        UpdatedAt
        ContractAddress
        ChainUID
        Type
      }
    }
  }
`;

// Execute the query
client
  .query({
    query,
    variables: { chainUId: 'nibiru', type: 'factory' },
  })
  .then((result) => {
    // Print the JSON response
    console.log(JSON.stringify(result.data, null, 2));
  })
  .catch((error) => console.error(error));
```

- Finall run `node <filename>.js` to run the script:

Output:
```bash
{
  "chains": {
    "__typename": "Chains",
    "contracts": [
      {
        "__typename": "Contracts",
        "CreatedAt": "0001-01-01T00:00:00Z",
        "UpdatedAt": "0001-01-01T00:00:00Z",
        "ContractAddress": "nibi16jzpxp0e8550c9aht6q9svcux30vtyyyyxv5w2l2djjra46580wswu40v9",
        "ChainUID": "nibiru",
        "Type": "factory"
      }
    ]
  }
}
```

### TypeScript (Apollo)

```typescript
import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client/core';
import fetch from 'cross-fetch';

// Initialize the Apollo Client
const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://api.euclidprotocol.com/graphql', fetch }),
  cache: new InMemoryCache(),
});

// Define the GraphQL query
const query = gql`
  query Chains($chainUId: String!, $type: String!) {
    chains {
      contracts(chainUId: $chainUId, type: $type) {
        CreatedAt
        UpdatedAt
        ContractAddress
        ChainUID
        Type
      }
    }
  }
`;

// Execute the query
client.query({
  query,
  variables: { chainUId: 'ethereum', type: 'factory' },
})
.then(result => console.log(JSON.stringify(result.data, null, 2)))
.catch(error => console.error(error));
```
Output:
```bash
{
  "chains": {
    "__typename": "Chains",
    "contracts": [
      {
        "__typename": "Contracts",
        "CreatedAt": "0001-01-01T00:00:00Z",
        "UpdatedAt": "0001-01-01T00:00:00Z",
        "ContractAddress": "wasm1hrpna9v7vs3stzyd4z3xf00676kf78zpe2u5ksvljswn2vnjp3ys8c5wp9",
        "ChainUID": "ethereum",
        "Type": "factory"
      }
    ]
  }
}
```

### Python

```python
from gql import gql, Client
from gql.transport.requests import RequestsHTTPTransport

# Configure the transport
transport = RequestsHTTPTransport(
    url='https://api.euclidprotocol.com/graphql',
    use_json=True,
)

# Initialize the Apollo Client
client = Client(transport=transport, fetch_schema_from_transport=True)

# Define the GraphQL query
query = gql('''
    query Chains($chainUId: String!, $type: String!) {
      chains {
        contracts(chainUId: $chainUId, type: $type) {
          CreatedAt
          UpdatedAt
          ContractAddress
          ChainUID
          Type
        }
      }
    }
''')

# Execute the query
variables = {"chainUId": "nibiru", "type": "factory"}
response = client.execute(query, variable_values=variables)
print(response)
```
Output:
```bash
{'chains': {'contracts': [
    {'CreatedAt': '0001-01-01T00:00:00Z',
     'UpdatedAt': '0001-01-01T00:00:00Z',
     'ContractAddress': 'wasm1qg5ega6dykkxc307y25pecuufrjkxkaggkkxh7nad0vhyhtuhw3sq29c3m', 
     'ChainUID': 'osmosis', 
     'Type': 'factory'}]}}
```
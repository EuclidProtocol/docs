---
sidebar_position: 2
description: "Virtual Balance Queries"
---
# State
Queries the state for the virtual balance contract.

```graphql
query Vcoin {
  vcoin {
    state {
      router
      admin
    }
  }
}
```

### Example

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.staging.euclidprotocol.com/dev/graphql' \
    --data '{"query":"query Vcoin {\n  vcoin {\n    state {\n      router\n      admin\n    }\n  }\n}"}'
```

[Open in Playground](https://api.staging.euclidprotocol.com/?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeABAGpQQCWSRwAOtUQG7lU31EdEDOKAhigjYNORPBBgC87EUV5g4VaRwC%2B01UmUgANCEa88FXgCMANgi4YQIZUA)

### Return Fields

| Field                  | Type   | Description                                             |
|------------------------|--------|---------------------------------------------------------|
| router                 | String | The contract address of the router.                              |
| admin                  | String | The address of the admin for the VBalance contract.                |

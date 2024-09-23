---
sidebar_position: 1
---

# Get Contracts
Fetches all the deployed smart contracts along with their chain Ids and types. 

### Request URL

```bash
 https://testnet.api.euclidprotocol.com/api/v1/contracts
```
### Curl
```bash
curl -X 'GET' \
  'https://testnet.api.euclidprotocol.com/api/v1/contracts' \
  -H 'accept: application/json'
```

### Example Response
```JSON
{
  "data": [
    {
      "CreatedAt": "0001-01-01T00:00:00Z",
      "UpdatedAt": "0001-01-01T00:00:00Z",
      "contractAddress": "wasm1ugur7zueugs63ndnm9423gtmqyjrq5qwef0q83e66cefjt692gnsw323f4",
      "chainUId": "vsl",
      "type": "vlp"
    },
    {
      "CreatedAt": "0001-01-01T00:00:00Z",
      "UpdatedAt": "0001-01-01T00:00:00Z",
      "contractAddress": "wasm1xk5uqjmechk8rn58dqzvp8pehwxddl0x0wag7kpv7xjunt2vhuvqqu9fkc",
      "chainUId": "vsl",
      "type": "vlp"
    },
    {
      "CreatedAt": "0001-01-01T00:00:00Z",
      "UpdatedAt": "0001-01-01T00:00:00Z",
      "contractAddress": "wasm1zk7y73ecdk9yz9q300xerc9s58eq84ygzwm927xgahl9vgkpmxdqc8vrdy",
      "chainUId": "vsl",
      "type": "vlp"
    },
    {
      "CreatedAt": "0001-01-01T00:00:00Z",
      "UpdatedAt": "0001-01-01T00:00:00Z",
      "contractAddress": "wasm1zhhfwhuyyc88jdr5rncn75uf0lf3pta4lwk68d6y7vncyqxxllrqun6zen",
      "chainUId": "vsl",
      "type": "vlp"
    },
    {
      "CreatedAt": "0001-01-01T00:00:00Z",
      "UpdatedAt": "0001-01-01T00:00:00Z",
      "contractAddress": "wasm1lafs2c9w3yptncv25fc85s3264wu7m4sem5vpsegun6jkt5nzfzq0asczj",
      "chainUId": "vsl",
      "type": "vlp"
    },
    {
      "CreatedAt": "0001-01-01T00:00:00Z",
      "UpdatedAt": "0001-01-01T00:00:00Z",
      "contractAddress": "wasm1x623ehq3gqx9m9t8asyd9cgehf32gy94mhsw8l99cj3l2nvda2fqnxq0t8",
      "chainUId": "vsl",
      "type": "vcoin"
    },
    {
      "CreatedAt": "0001-01-01T00:00:00Z",
      "UpdatedAt": "0001-01-01T00:00:00Z",
      "contractAddress": "wasm1zh2dlnjmr839t2dkgqclfq5893edt3agswa0kmhdznwrz4xjmyhs8walp0",
      "chainUId": "osmosis",
      "type": "factory"
    },
    {
      "CreatedAt": "0000-12-31T23:47:00Z",
      "UpdatedAt": "0001-01-01T00:00:00Z",
      "contractAddress": "wasm1xfvv67yrnrxdk3tkjlv772wcw5jukae5x233az9k3nf26lhxwu7sv62245",
      "chainUId": "vsl",
      "type": "router"
    }
  ]
}
```
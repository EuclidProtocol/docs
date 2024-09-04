---
sidebar_position: 6
---

# Withdraw Virtual Balance Tokens

Generates a transaction to withdraw virtual balance tokens for a user.

### Request URL
```bash
http://api.staging.euclidprotocol.com:0/api/v1/execute/vcoin/withdraw
```
### Curl
```bash
curl -X 'POST' \
  'http://api.staging.euclidprotocol.com:0/api/v1/execute/vcoin/withdraw' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "sender": {
    "chain_uid": "ethereum",
    "address": "0xSenderAddress"
  },
  "amount": "19917",
  "token": "usdc",
  "timeout": "",
  "cross_chain_addresses": [
    {
      "user": {
        "chain_uid": "nibiru",
        "address": "0xSenderAddress"
      },
      "limit": ""
    }
  ]
}'
```
### Parameters

| Field     | Type   | Description                                   |
|-----------|--------|-----------------------------------------------|
| `sender`   | [CrossChainUser](../../../Euclid%20Smart%20Contracts/CosmWasm/overview.md#crosschainuser) | The address sending the transaction request.  |
| `amount` | String | The amount of tokens to withdraw. |
| `token` | String | The token Id of the token being withdrawn. |
| `timeout` | String | Optional duration in seconds after which the message will be timed out. Can be set to a minimum of 30 seconds and a maximum of 240 seconds. Defaults to 60 seconds if not specified. |
| `cross_chain_addresses` | [[CrossChainUserWithLimit](../../../Euclid%20Smart%20Contracts/CosmWasm/overview.md#crosschainuserwithlimit)] | A set of addresses to specify where the tokens should be released. The first element specified in the vector has highest priority and so on. | 

### Example Response

```json
{
  "sender": {
    "chain_uid": "ethereum",
    "address": "0xSenderAddress"
  },
  "contract": "wasm1hrpna9v7vs3stzyd4z3xf00676kf78zpe2u5ksvljswn2vnjp3ys8c5wp9",
  "chain_id": "localwasma-1",
  "rpc_url": "http://rpc.url",
  "rest_url": "http://rest.url",
  "msgs": [
    {
      "contractAddress": "wasm1hrpna9v7vs3stzyd4z3xf00676kf78zpe2u5ksvljswn2vnjp3ys8c5wp9",
      "msg": {
        "withdraw_vcoin": {
          "amount": "19917",
          "cross_chain_addresses": [],
          "timeout": null,
          "token": "usdc"
        }
      },
      "funds": []
    }
  ]
}

```
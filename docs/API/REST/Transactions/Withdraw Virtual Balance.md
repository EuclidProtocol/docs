---
sidebar_position: 6
---

# Withdraw Virtual Balance Tokens

Generates a transaction to withdraw virtual balance tokens for a user.

### Request URL
```bash
http://testnet.api.euclidprotocol.com/api/v1/execute/vcoin/withdraw
```
### Curl
```bash
curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/vcoin/withdraw' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "sender": {
    "chain_uid": "nibiru",
    "address": "nibi14hcxlnwlqtq75ttaxf674vk6mafspg8x3ky6ts"
  },
  "amount": "19917",
  "token": "nibi",
  "timeout": null,
  "cross_chain_addresses": [
    {
      "user": {
        "chain_uid": "ethereum",
        "address": "0xSenderAddress"
      },
      "limit": null
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
   "sender":{
      "chain_uid":"nibiru",
      "address":"nibi14hcxlnwlqtq75ttaxf674vk6mafspg8x3ky6ts"
   },
   "contract":"nibi1rwrwsyny3ew703ru0k2tgscwktrqsw9kyg5ykaydrxy0fq7gz6ksuyqfnm",
   "chain_id":"nibiru-testnet-1",
   "rpc_url":"https://rpc.testnet-1.nibiru.fi",
   "rest_url":"https://lcd.testnet-1.nibiru.fi",
   "msgs":[
      {
         "contractAddress":"nibi1g9m9q9tntaejyu4sgy8n6uuqzeplwmeafzakx0y0kwh3xwu2hagsujjh5n",
         "msg":{
            "send":{
               "amount":"1000000000",
               "contract":"nibi1rwrwsyny3ew703ru0k2tgscwktrqsw9kyg5ykaydrxy0fq7gz6ksuyqfnm",
               "msg":"eyJzd2FwIjp7ImFzc2V0X2luIjp7InRva2VuIjoiZnVuZGVub20iLCJ0b2tlbl90eXBlIjp7InNtYXJ0Ijp7ImNvbnRyYWN0X2FkZHJlc3MiOiJuaWJpMWc5bTlxOXRudGFlanl1NHNneThuNnV1cXplcGx3bWVhZnpha3gweTBrd2gzeHd1MmhhZ3N1ampoNW4ifX19LCJhc3NldF9vdXQiOiJvc21vIiwiY3Jvc3NfY2hhaW5fYWRkcmVzc2VzIjpbXSwibWluX2Ftb3VudF9vdXQiOiIxIiwicGFydG5lcl9mZWUiOm51bGwsInN3YXBzIjpbeyJ0b2tlbl9pbiI6ImZ1bmRlbm9tIiwidG9rZW5fb3V0Ijoib3NtbyJ9XSwidGltZW91dCI6bnVsbH19"
            }
         },
         "funds":[
            
         ]
      }
   ]
}

```
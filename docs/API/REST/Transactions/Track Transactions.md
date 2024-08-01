---
sidebar_position: 5
---

# Track Transactions

Gets all information on the specified transaction.

### Request URL
 
```bash
curl -X 'POST' \
  'https://api.staging.euclidprotocol.com/dev/api/v1/txn/track' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "chain": "nibiru",
  "tx_hash": "CA57152F074449247DEA7BB51627DE58DF74DE91EA33CA563CC5A98549AC484E"
}'
```
### Parameters

| Field     | Type   | Description                                   |
|-----------|--------|-----------------------------------------------|
| `chain`   | String | The chain UID of the chain where the transaction was instantiated.  |
| `tx_hash` | String | The transaction hash of the transaction to track. |

### Example Response

```json
{
  "is_completed": true,
  "tx_hash": "",
  "tx_id": "ethereum:wasm14hcxlnwlqtq75ttaxf674vk6mafspg8xv03ktg:localpoola-1:685818:0:40",
  "sequence": "40",
  "source_chain_uid": "nibiru",
  "source_chain_id": "localpoola-1",
  "source_factory": "wasm1fahenpmk3t0qyzdx77zqu0ah9kluv88hmf68fx5u56gh9927juxsz94c2n",
  "sender": "",
  "status": [
    {
      "chain_uid": "nibiru",
      "status": "success",
      "msg": "ok",
      "tx_hash": "CA57152F074449247DEA7BB51627DE58DF74DE91EA33CA563CC5A98549AC484E"
    },
    {
      "chain_uid": "vsl",
      "status": "success",
      "msg": "{\"ok\":{\"mint_lp_tokens\":\"100021995\",\"vlp_address\":\"wasm1lafs2c9w3yptncv25fc85s3264wu7m4sem5vpsegun6jkt5nzfzq0asczj\"}}",
      "tx_hash": "9161F6E63B00B1597F472E0A3A19B94BA475CEBAC9398DC769CA2EBE30D974CB"
    },
    {
      "chain_uid": "nibiru",
      "status": "success",
      "msg": "Success",
      "tx_hash": "FE8F8FF9522AB32A5D8BEFD42B1ABF029F8EACE3EEFFB694784366F6F44678A5"
    }
  ]
}
```
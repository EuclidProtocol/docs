---
sidebar_position: 7
---
import Tabs from '@site/src/components/Tabs';

# Track Transaction

Checks the current status of a transaction by providing the `tx_hash` and the chain it was submitted on.
:::tip
If you're looking to track a **cross-chain swap**, use the [Track Swap Transaction](./Track%20Swap%20Transaction) endpoint instead. This endpoint is designed specifically to provide detailed status updates and IBC event traces for swap transactions.
:::

<details>
<summary><strong>Related Queries</strong></summary>

- [All Chains](/docs/API/API%20Reference/GQL/Router/All%20Chains): Use this query to fetch valid chain UIDs for `chain`.

</details>

### Request URL

**Method:** `POST`

```bash
https://api.euclidprotocol.com/api/v1/txn/track
```

### Examples

<Tabs
  tabs={[
    {
      id: 'evm-track-request',
      label: 'EVM Request',
      language: 'bash',
      content: `curl -X 'POST' \
  'https://api.euclidprotocol.com/api/v1/txn/track' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "chain": "polygon",
    "tx_hash": "0x49aa5637570c11fd33c19e62b03a62d09e8ec622e14019defb780d875d59fd63"
}'`
    },
    {
      id: 'evm-track-response',
      label: 'EVM Response',
      language: 'json',
      content: `{
  "response": {
    "is_completed": true,
    "is_release": false,
    "tx_hash": "0x49aa5637570c11fd33c19e62b03a62d09e8ec622e14019defb780d875d59fd63",
    "asset_in_type": "",
    "type": "deposit_token",
    "source_token_id": "",
    "tx_status": "success",
    "tx_id": "polygon:0x09851e1de798af7e1ad04a72a04b59f4e0009b05:137:84441196:2786",
    "voucher_minted": null,
    "sequence": "2786",
    "source_chain_uid": "polygon",
    "source_chain_id": "137",
    "source_factory": "0x08E6604931E9c2a978D4861b912f7894CC6063F7",
    "sender": "0x09851e1de798af7e1ad04a72a04b59f4e0009b05",
    "total_duration": "11.831s",
    "total_estimated_duration": "",
    "status": [
      {
        "chain_uid": "polygon",
        "status": "success",
        "msg": "success",
        "timestamp": "2026-03-20 10:27:06 +0000 UTC",
        "tx_hash": "0x49aa5637570c11fd33c19e62b03a62d09e8ec622e14019defb780d875d59fd63"
      },
      {
        "chain_uid": "vsl",
        "status": "success",
        "msg": "eyJkZXBvc2l0X3Rva2VuIjp7ImFtb3VudF9pbiI6IjI1NTAwMDAwMCIsImFzc2V0X2luIjp7InRva2VuIjoidXNkYyIsInRva2VuX3R5cGUiOnsic21hcnQiOnsiY29udHJhY3RfYWRkcmVzcyI6IjB4M2M0OTljNTQyY2VmNWUzODExZTExOTJjZTcwZDhjYzAzZDVjMzM1OSJ9fX0sInJlY2lwaWVudHMiOltdLCJzZW5kZXIiOnsiYWRkcmVzcyI6IjB4MDk4NTFlMWRlNzk4YWY3ZTFhZDA0YTcyYTA0YjU5ZjRlMDAwOWIwNSIsImNoYWluX3VpZCI6InBvbHlnb24ifSwidHhfaWQiOiJwb2x5Z29uOjB4MDk4NTFlMWRlNzk4YWY3ZTFhZDA0YTcyYTA0YjU5ZjRlMDAwOWIwNToxMzc6ODQ0NDExOTY6Mjc4NiJ9fQ==",
        "timestamp": "2026-03-20 10:27:10.992 +0000 UTC",
        "tx_hash": "831AD6D86EC2EFD710D304E9EFF00ACA81F611C6E0FD87F1907F1F95FF42AFA7"
      },
      {
        "chain_uid": "polygon",
        "status": "success",
        "msg": "Success",
        "timestamp": "2026-03-20 10:27:17.831 +0000 UTC",
        "tx_hash": "0xe99feebf0fddf414bd550bc5b1f391a62c902d7961eda96e78bae0e935149a58"
      }
    ],
    "deposit_token_response": {
      "token": "usdc",
      "amount": "255000000",
      "sender_address": "0x09851e1de798af7e1ad04a72a04b59f4e0009b05",
      "sender_chain_uid": "polygon",
      "recieve_address": "0x09851e1de798af7e1ad04a72a04b59f4e0009b05"
    }
  }
}`
    },
    {
      id: 'cosmos-track-request',
      label: 'Cosmos Request',
      language: 'bash',
      content: `curl -X 'POST' \\
  'https://api.euclidprotocol.com/api/v1/txn/track' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "chain": "injective",
    "tx_hash": "8CF90E30D820DB1B700EBA86A54A5748BC37B0244489BD95F2F64E96A39071B6"
}'`
    },
    {
      id: 'cosmos-track-response',
      label: 'Cosmos Response',
      language: 'json',
      content: `{
  "response": {
    "is_completed": true,
    "tx_hash": "8CF90E30D820DB1B700EBA86A54A5748BC37B0244489BD95F2F64E96A39071B6",
    "asset_in_type": "",
    "type": "add_liquidity",
    "source_token_id": "",
    "tx_status": "success",
    "tx_id": "injective:inj1epptslyy5mlvr4m238v0z0954nf9m6lly7v7pu:injective-888:72808079:1:2323",
    "voucher_minted": null,
    "sequence": "2322",
    "source_chain_uid": "injective",
    "source_chain_id": "injective-888",
    "source_factory": "inj1sdmz25644p2nn2zse5ntrkw7cf6g7th0amtdpu",
    "sender": "inj1epptslyy5mlvr4m238v0z0954nf9m6lly7v7pu",
    "total_duration": "2m59.414170628s",
    "total_estimated_duration": "",
    "status": [
      {
        "chain_uid": "injective",
        "status": "success",
        "msg": "Success",
        "timestamp": "2025-04-23 14:34:47.806 +0000 UTC",
        "tx_hash": "8CF90E30D820DB1B700EBA86A54A5748BC37B0244489BD95F2F64E96A39071B6"
      },
      {
        "chain_uid": "vsl",
        "status": "success",
        "msg": "eyJvayI6eyJtaW50X2xw...",
        "timestamp": "2025-04-23 14:35:06.579811852 +0000 UTC",
        "tx_hash": "8BB553DF2A6DE34478A7F1CDBC5F1CCC8761A79F5CD1E4B3CCF46C9DA410DFE4"
      },
      {
        "chain_uid": "injective",
        "status": "success",
        "msg": "Success",
        "timestamp": "2025-04-23 14:37:47.220170628 +0000 UTC",
        "tx_hash": "6209EF3E571AA67C8B13ABD792CCCBCA829E4BB39029F615592CC1E4BCBEAC72"
      }
    ],
    "liquidity_response": {
      "add_liquidity": {
        "token_1_added_liquidity": "10000000",
        "token_2_added_liquidity": "28072809",
        "lp_allocation": "16924547"
      },
      "pair": {
        "token_1": "usdc",
        "token_2": "usdt"
      }
    }
  }
}`
    }
  ]}
/>

### Parameters

| **Field**   | **Type**   | **Description**                                                                    |
|-------------|------------|------------------------------------------------------------------------------------|
| `chain`     | `string`   | Chain UID where the original transaction was submitted (e.g. `injective`, `amoy`) |
| `tx_hash`   | `string`   | The hash of the transaction being tracked.                                        |

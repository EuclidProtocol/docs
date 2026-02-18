---
sidebar_position: 1
---
import Tabs from '@site/src/components/Tabs';

# Swap Request

Generate a transaction payload for a swap request.

## Endpoint

**Method:** `POST`

```bash
https://testnet.api.euclidprotocol.com/api/v1/execute/swap
```

## Examples

<Tabs
  tabs={[
    {
      id: 'evm-request',
      label: 'EVM Request',
      language: 'bash',
      content: `curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/swap' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "amount_in": "100000000000000000",
  "asset_in": {
    "token": "codewizard.eucl",
    "token_type": {
      "smart": {
        "contract_address": "0x3246d25b42f6b3deca5b40334775fa4d6e333010"
      }
    }
  },
  "slippage": "500",
  "recipients": [
    {
      "user": {
        "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
        "chain_uid": "0g"
      },
      "amount": {
        "less_than_or_equal": "3563664058479"
      },
      "denom": {
        "native": {
          "denom": "euclid"
        }
      },
      "forwarding_message": "",
      "unsafe_refund_as_voucher": false
    }
  ],
  "partner_fee": {
    "partner_fee_bps": 10,
    "recipient": "0x8ed341da628fb9f540ab3a4ce4432ee9b4f5d658"
  },
  "sender": {
    "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
    "chain_uid": "bsc"
  },
  "swap_path": {
    "path": [
      {
        "route": [
          "bnb",
          "euclid"
        ],
        "dex": "euclid",
        "amount_in": "100000000000000000",
        "amount_out": "635340",
        "chain_uid": "vsl",
        "amount_out_for_hops": [
          "euclid: 635340"
        ]
      }
    ],
    "total_price_impact": "0.00"
  }
}'`
    },
    {
      id: 'evm-response',
      label: 'EVM Response',
      language: 'json',
      content: `{
   "chain_id":"97",
   "contract":"0x62d8658a3d7c669943c95c781c220469e19beb47",
   "meta":"{\"asset_in_type\":\"smart\",\"releases\":[{\"dex\":\"euclid\",\"release_address\":[{\"chain_uid\":\"bsc\",\"address\":\"0x887e4aac216674d2c432798f851c1ea5d505b2e1\",\"amount\":\"0\"}],\"token\":\"euclid\",\"amount\":\"\"}],\"swaps\":{\"path\":[{\"route\":[\"bnb\",\"euclid\"],\"dex\":\"euclid\",\"chain_uid\":\"vsl\",\"amount_in\":\"100000000000000000\",\"amount_out\":\"635340\"}]}}",
   "msgs":[
      {
         "chainId":"97",
         "to":"0x3246d25b42f6b3deca5b40334775fa4d6e333010",
         "data":"0x095ea7b300000000000000000000000062d8658a3d7c669943c95c781c220469e19beb47000000000000000000000000000000000000000000000000016345785d8a0000",
         "value":"0x0"
      },
      {
         "chainId":"97",
         "to":"0x62d8658a3d7c669943c95c781c220469e19beb47",
         "data":"0x6e31c74900000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000220000000000000000000000000000000000000000000000000016345785d8a0000000000000000000000000000000000000000000000000000000000000000032000000000000000000000000000000000000000000000000000000000000935b500000000000000000000000000000000000000000000000000000000000003600000000000000000000000000000000000000000000000000000000000000480000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004a00000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000036273630000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a30783838376534616163323136363734643263343332373938663835316331656135643530356232653100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000003626e620000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000600000000000000000000000003246d25b42f6b3deca5b40334775fa4d6e333010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000066575636c6964000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003626e62000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000066575636c69640000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001467b2261737365745f696e5f74797065223a22736d617274222c2272656c6561736573223a5b7b22646578223a226575636c6964222c2272656c656173655f61646472657373223a5b7b22636861696e5f756964223a22627363222c2261646472657373223a22307838383765346161633231363637346432633433323739386638353163316561356435303562326531222c22616m0000000000000000000000000000000000000000000000000000",
         "value":"0x0"
      }
   ],
   "rest_url":"https://bsc-testnet.drpc.org",
   "rpc_url":"https://bsc-testnet.drpc.org",
   "sender":{
      "chain_uid":"bsc",
      "address":"0x887e4aac216674d2c432798f851c1ea5d505b2e1"
   },
   "type":"evm"
}`
    },
    {
      id: 'cosmos-request',
      label: 'Cosmos Request',
      language: 'bash',
      content: `curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/swap' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "amount_in": "100000000000000000",
    "asset_in": {
      "token": "bsc",
      "token_type": {
        "smart": {
          "contract_address": "0x3246d25b42f6b3deca5b40334775fa4d6e333010"
        }
      }
    },
    "slippage": "500",
    "recipients": [
      {
        "user": {
          "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
          "chain_uid": "0g"
        },
        "amount": {
          "less_than_or_equal": "3563664058479"
        },
        "denom": {
          "native": {
            "denom": "bsc"
          }
        }
      }
    ],
    "partner_fee": {
      "partner_fee_bps": 10,
      "recipient": "0x8ed341da628fb9f540ab3a4ce4432ee9b4f5d658"
    },
    "sender": {
      "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
      "chain_uid": "neuron"
    },
    "swap_path": {
      "path": [
        {
          "route": [
            "euclid",
            "bnb"
          ],
          "dex": "euclid",
          "amount_in": "100000000000000000",
          "amount_out": "8152420272192926720",
          "chain_uid": "vsl",
          "amount_out_for_hops": [
            "bnb: 8152420272192926720"
          ]
        }
      ],
      "total_price_impact": "0.00"
    }
  }'`
    },
    {
      id: 'cosmos-response',
      label: 'Cosmos Response',
      language: 'json',
      content: `{
   "type":"cosmwasm",
   "sender":{
      "chain_uid":"neuron",
      "address":"0x887e4aac216674d2c432798f851c1ea5d505b2e1"
   },
   "contract":"euclid1aagn260yt7xtvq0jdecxu265zqzkc6mhc4glql2q2nmdsqwzmyzs8lfhhx",
   "chain_id":"neuron-1",
   "rpc_url":"https://rpc.neuron.euclidprotocol.com",
   "rest_url":"https://lcd.neuron.euclidprotocol.com",
   "msgs":[
      {
         "contractAddress":"0x3246d25b42f6b3deca5b40334775fa4d6e333010",
         "msg":{
            "send":{
               "amount":"100000000000000000",
               "contract":"euclid1aagn260yt7xtvq0jdecxu265zqzkc6mhc4glql2q2nmdsqwzmyzs8lfhhx",
               "msg":"eyJzd2FwIjp7ImFzc2V0X2luIjp7InRva2VuIjoiZXVjbGlkIiwidG9rZW5fdHlwZSI6eyJzbWFydCI6eyJjb250cmFjdF9hZGRyZXNzIjoiMHgzMjQ2ZDI1YjQyZjZiM2RlY2E1YjQwMzM0Nzc1ZmE0ZDZlMzMzMDEwIn19fSwiYXNzZXRfb3V0IjoiYm5iIiwiY3Jvc3NfY2hhaW5fYWRkcmVzc2VzIjpudWxsLCJtZXRhIjoie1wiYXNzZXRfaW5fdHlwZVwiOlwic21hcnRcIixcInJlbGVhc2VzXCI6W3tcImRleFwiOlwiZXVjbGlkXCIsXCJyZWxlYXNlX2FkZHJlc3NcIjpbe1wiY2hhaW5fdWlkXCI6XCJuZXVyb25cIixcImFkZHJlc3NcIjpcIjB4ODg3ZTRhYWMyMTY2NzRkMmM0MzI3OThmODUxYzFlYTVkNTA1YjJlMVwiLFwiYW1vdW50XCI6XCIwXCJ9XSxcInRva2VuXCI6XCJibmJcIixcImFtb3VudFwiOlwiXCJ9XSxcInN3YXBzXCI6e1wicGF0aFwiOlt7XCJyb3V0ZVwiOltcImV1Y2xpZFwiLFwiYm5iXCJdLFwiZGV4XCI6XCJldWNsaWRcIixcImNoYWluX3VpZFwiOlwidnNsXCIsXCJhbW91bnRfaW5cIjpcIjEwMDAwMDAwMDAwMDAwMDAwMFwiLFwiYW1vdW50X291dFwiOlwiODE1MjQyMDI3MjE5MjkyNjcyMFwifV19fSIsIm1pbl9hbW91bnRfb3V0IjoiNzc0NDc5OTI1ODU4MzI4MDM2MiIsInBhcnRuZXJfZmVlIjp7InBhcnRuZXJfZmVlX2JwcyI6MTAsInJlY2lwZW50IjoiIn0sInN3YXBzIjpbeyJ0b2tlbl9pbiI6ImV1Y2xpZCIsInRva2VuX291dCI6ImJuYiJ9XX19"
            }
         },
         "funds":[
            
         ]
      }
   ],
   "meta":"{\\"asset_in_type\\":\\"smart\\",\\"releases\\":[{\\"dex\\":\\"euclid\\",\\"release_address\\":[{\\"chain_uid\\":\\"neuron\\",\\"address\\":\\"0x887e4aac216674d2c432798f851c1ea5d505b2e1\\",\\"amount\\":\\"0\\"}],\\"token\\":\\"bnb\\",\\"amount\\":\\"\\"}],\\"swaps\\":{\\"path\\":[{\\"route\\":[\\"euclid\\",\\"bnb\\"],\\"dex\\":\\"euclid\\",\\"chain_uid\\":\\"vsl\\",\\"amount_in\\":\\"100000000000000000\\",\\"amount_out\\":\\"8152420272192926720\\"}]}}"
}`
    }
  ]}
/>

## Parameters

:::tip
You should obtain the `swap_path` from the [Get Routes endpoint](../Routes/Get%20Routes.md). The response includes one or more route options detailing the path and DEX for each hop. Use the selected route in your swap call.
:::

| Field | Type | Description |
|---|---|---|
| `amount_in` | `string` | Amount of the input token to be swapped. |
| `asset_in` | [`TokenWithDenom`](/docs/API/API%20Reference/common%20types.md#tokenwithdenom) | Input token and its type (either `native` or `smart`). |
| `slippage` | `string` | Slippage tolerance in basis points (e.g., `"500"` for 5%). |
| `recipients` | [`RecipientWithDenom`](#recipientwithdenom)`[]` | Recipients for the output asset. Defaults to the sender if omitted. |
| `partner_fee` | [`PartnerFee`](#partnerfee) | Partner fee configuration. Includes basis points and recipient. |
| `sender` | [`CrossChainUserWithAmount`](/docs/API/API%20Reference/common%20types.md#crosschainuserwithamount) | Address and chain initiating the swap. |
| `swap_path` | [`SwapPath`](#swappath) | Routing path with token hops and DEX info. Use values from the [Get Routes](../Routes/Get%20Routes.md) endpoint. |

### RecipientWithDenom

| Field | Type | Description |
|---|---|---|
| `user` | [`CrossChainUserWithAmount`](/docs/API/API%20Reference/common%20types.md#crosschainuserwithamount) | Recipient address and chain. |
| `amount` | [`Limit`](/docs/API/API%20Reference/common%20types.md#limit) | Optional output limits for the recipient. |
| `denom` | [`TokenType`](/docs/API/API%20Reference/common%20types.md#tokentype-variants) | Token denom/type to release to the recipient. |
| `forwarding_message` | `string` | Optional forwarding payload (base64 or string, chain-dependent). |
| `unsafe_refund_as_voucher` | `boolean` | If true, failed release refunds are sent as vouchers to the recipient (router cannot validate recipient address). If false, refund is sent to the sender. |

### SwapPath

| Field | Type | Description |
|---|---|---|
| `path` | `object[]` | Steps for the swap route, each defining a DEX and token route. |

#### Each path object

| Field | Type | Description |
|---|---|---|
| `route` | `string[]` | Token sequence for the step (e.g., `["usdc", "euclid", "eth"]`). |
| `dex` | `string` | DEX used for this step. Currently only `"euclid"` is supported. |
| `chain_uid` | `string` | UID of the chain where this step is executed. |
| `amount_in` | `string` | Input amount for this step. |
| `amount_out` | `string` | Estimated output amount for this step. |

### PartnerFee

| Field | Type | Description |
|---|---|---|
| `partner_fee_bps` | `number` | Fee in basis points (e.g., `10` = 0.1%). |
| `recipient` | `string` | Address to receive the fee (typically on the same chain as `sender`). |

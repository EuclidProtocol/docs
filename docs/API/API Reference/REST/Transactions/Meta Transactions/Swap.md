---
sidebar_position: 2
---
import Tabs from '@site/src/components/Tabs';

# Meta Swap

Create a meta-transaction payload for a swap using voucher balances.

### Request URL

```bash
https://testnet.api.euclidprotocol.com/api/v1/execute/meta-txn/swap
```

### Examples

<Tabs
  tabs={[
    {
      id: 'cosmos-request',
      label: 'Cosmos Request',
      language: 'bash',
      content: `curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/meta-txn/swap' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "amount_in": "100000000000000000",
  "asset_in": {
    "amount": "100000000000000000",
    "token": "bsc",
    "token_type": {
      "voucher": {}
    }
  },
  "cross_chain_addresses": [
    {
      "forwarding_message": {
        "data": "0x...",
        "meta": ""
      },
      "limit": {
        "less_than_or_equal": "3563664058479"
      },
      "preferred_denom": {
        "voucher": {}
      },
      "user": {
        "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
        "amount": "50000000",
        "chain_uid": "0g"
      }
    }
  ],
  "partner_fee": {
    "partner_fee_bps": 10,
    "recipent": "0x8ed341da628fb9f540ab3a4ce4432ee9b4f5d658"
  },
  "sender": {
    "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
    "amount": "100000000000000000",
    "chain_uid": "neuron"
  },
  "slippage": "500",
  "swap_path": {
    "path": [
      {
        "amount_in": "100000000000000000",
        "amount_out": "8152420272192926720",
        "chain_uid": "",
        "dex": "euclid",
        "route": [
          "euclid",
          "bnb"
        ]
      }
    ]
  }
}'`
    },
    {
      id: 'cosmos-response',
      label: 'Cosmos Response',
      language: 'json',
      content: `{
  "msg": {
    "target": "euclid1ywzqwvhmm58e02lvr579xlcn873kptl40a4teqnjd8t8kndfps7qdghdaq",
    "call_data": {
      "swap": {
        "amount_in": "100000000000000000",
        "asset_in": {
          "token": "euclid",
          "token_type": {
            "voucher": {}
          }
        },
        "asset_out": "bnb",
        "cross_chain_addresses": [
          {
            "user": {
              "chain_uid": "0g",
              "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
              "amount": "50000000"
            },
            "limit": {
              "less_than_or_equal": "3563664058479"
            },
            "preferred_denom": {
              "voucher": {}
            },
            "forwarding_message": {
              "data": "0x..."
            }
          }
        ],
        "meta": {
          "asset_in_type": "voucher",
          "releases": [
            {
              "dex": "euclid",
              "release_address": [
                {
                  "chain_uid": "0g",
                  "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
                  "amount": "3563664058479"
                }
              ],
              "token": "bnb",
              "amount": ""
            }
          ],
          "swaps": {
            "path": [
              {
                "route": [
                  "euclid",
                  "bnb"
                ],
                "dex": "euclid",
                "chain_uid": "",
                "amount_in": "100000000000000000",
                "amount_out": "8152420272192926720"
              }
            ]
          }
        },
        "min_amount_out": "7744799258583280362",
        "partner_fee": {
          "partner_fee_bps": 10,
          "recipent": "0x8ed341da628fb9f540ab3a4ce4432ee9b4f5d658"
        },
        "partner_fee_amount": "0",
        "partner_fee_recipient": {
          "chain_uid": "neuron",
          "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
          "amount": "100000000000000000"
        },
        "sender": {
          "chain_uid": "neuron",
          "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
          "amount": "100000000000000000"
        },
        "swaps": [
          {
            "token_in": "euclid",
            "token_out": "bnb"
          }
        ],
        "tx_id": "0"
      }
    }
  },
  "type": "swap",
  "token_in": "bsc",
  "token_out": "bnb",
  "token": "",
  "amount_in": "100000000000000000",
  "amount_out": "8152420272192926720"
}`
    },
    {
      id: 'evm-request',
      label: 'EVM Request',
      language: 'bash',
      content: `curl -X 'POST' \
  'https://testnet.api.euclidprotocol.com/api/v1/execute/meta-txn/swap' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "amount_in": "100000000000000000",
  "asset_in": {
    "amount": "100000000000000000",
    "token": "codewizard.eucl",
    "token_type": {
      "voucher": {}
    }
  },
  "cross_chain_addresses": [
    {
      "forwarding_message": {
        "data": "0x...",
        "meta": ""
      },
      "limit": {
        "less_than_or_equal": "3563664058479"
      },
      "preferred_denom": {
        "voucher": {}
      },
      "user": {
        "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
        "amount": "50000000",
        "chain_uid": "0g"
      }
    }
  ],
  "partner_fee": {
    "partner_fee_bps": 10,
    "recipent": "0x8ed341da628fb9f540ab3a4ce4432ee9b4f5d658"
  },
  "sender": {
    "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
    "amount": "100000000000000000",
    "chain_uid": "bsc"
  },
  "slippage": "500",
  "swap_path": {
    "path": [
      {
        "amount_in": "100000000000000000",
        "amount_out": "635340",
        "chain_uid": "",
        "dex": "euclid",
        "route": [
          "bnb",
          "euclid"
        ]
      }
    ]
  }
}'`
    },
    {
      id: 'evm-response',
      label: 'EVM Response',
      language: 'json',
      content: `{
  "msg": {
    "target": "euclid1ywzqwvhmm58e02lvr579xlcn873kptl40a4teqnjd8t8kndfps7qdghdaq",
    "call_data": {
      "swap": {
        "amount_in": "100000000000000000",
        "asset_in": {
          "token": "bnb",
          "token_type": {
            "voucher": {}
          }
        },
        "asset_out": "euclid",
        "cross_chain_addresses": [
          {
            "user": {
              "chain_uid": "0g",
              "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
              "amount": "50000000"
            },
            "limit": {
              "less_than_or_equal": "3563664058479"
            },
            "preferred_denom": {
              "voucher": {}
            },
            "forwarding_message": {
              "data": "0x..."
            }
          }
        ],
        "meta": {
          "asset_in_type": "voucher",
          "releases": [
            {
              "dex": "euclid",
              "release_address": [
                {
                  "chain_uid": "0g",
                  "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
                  "amount": "3563664058479"
                }
              ],
              "token": "euclid",
              "amount": ""
            }
          ],
          "swaps": {
            "path": [
              {
                "route": [
                  "bnb",
                  "euclid"
                ],
                "dex": "euclid",
                "chain_uid": "",
                "amount_in": "100000000000000000",
                "amount_out": "635340"
              }
            ]
          }
        },
        "min_amount_out": "603573",
        "partner_fee": {
          "partner_fee_bps": 10,
          "recipent": "0x8ed341da628fb9f540ab3a4ce4432ee9b4f5d658"
        },
        "partner_fee_amount": "0",
        "partner_fee_recipient": {
          "chain_uid": "bsc",
          "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
          "amount": "100000000000000000"
        },
        "sender": {
          "chain_uid": "bsc",
          "address": "0x887e4aac216674d2c432798f851c1ea5d505b2e1",
          "amount": "100000000000000000"
        },
        "swaps": [
          {
            "token_in": "bnb",
            "token_out": "euclid"
          }
        ],
        "tx_id": "0"
      }
    }
  },
  "type": "swap",
  "token_in": "codewizard.eucl",
  "token_out": "euclid",
  "token": "",
  "amount_in": "100000000000000000",
  "amount_out": "635340"
}`
    }
  ]}
/>

### Parameters

| Field | Type | Description |
|---|---|---|
| `amount_in` | `string` | Amount of the input token to be swapped. |
| `asset_in` | [`TokenWithDenom`](/docs/API/API%20Reference/common%20types.md#tokenwithdenom) | Input token and its type (`native`, `smart`, or `voucher`). |
| `slippage` | `string` | Slippage tolerance in basis points (e.g., `"500"` for 5%). |
| `cross_chain_addresses` | [`CrossChainAddressWithLimit`](/docs/API/API%20Reference/common%20types.md#crosschainaddresswithlimit)`[]` | Recipients for the output asset, with optional limits and forwarding. |
| `partner_fee` | `object` | Partner fee configuration. Includes basis points and recipient. |
| `sender` | [`CrossChainUserWithAmount`](/docs/API/API%20Reference/common%20types.md#crosschainuserwithamount) | Address and chain initiating the swap. |
| `swap_path` | `object` | Routing path with token hops and DEX info. |

### SwapPath

| Field | Type | Description |
|---|---|---|
| `path` | `object[]` | Steps for the swap route, each defining a DEX and token route. |

#### Each path object

| Field | Type | Description |
|---|---|---|
| `route` | `string[]` | Token sequence for the step (e.g., `["usdc", "euclid", "eth"]`). |
| `dex` | `string` | DEX used for this step (e.g., `"euclid"`, `"osmosis"`). |
| `chain_uid` | `string` | UID of the chain where this step is executed. |
| `amount_in` | `string` | Input amount for this step (usually calculated automatically). |
| `amount_out` | `string` | Estimated output amount for this step. |

### PartnerFee

| Field | Type | Description |
|---|---|---|
| `partner_fee_bps` | `number` | Fee in basis points (e.g., `10` = 0.1%). |
| `recipent` | `string` | Address to receive the fee. |

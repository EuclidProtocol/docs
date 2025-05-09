---
sidebar_position: 4
---
import Tabs from '@site/src/components/Tabs';

# Remove Liquidity

Generates a transaction to remove liquidity from a pool.

### CosmWasm
<Tabs
  tabs={[
    {
      id: 'cosmos-remove-request',
      label: 'Request',
      language: 'bash',
      content: `curl -X 'POST' \\
  'https://testnet.api.euclidprotocol.com/api/v1/execute/liquidity/remove' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "lp_allocation": "500000",
    "vlp_address": "nibi...",
    "sender": {
      "address": "inj1xyz...",
      "chain_uid": "injective"
    },
    "cross_chain_addresses": [
      {
        "user": {
          "address": "osmo1recipient...",
          "chain_uid": "osmosis"
        },
        "limit": {
          "less_than_or_equal": "300000"
        }
      }
    ]
}'`
    },
    {
      id: 'cosmos-remove-response',
      label: 'Response',
      language: 'json',
      content: `{
  "type": "cosmwasm",
  "sender": {
    "chain_uid": "injective",
    "address": "inj1epptslyy5mlvr4m238v0z0954nf9m6lly7v7pu"
  },
  "contract": "inj1sdmz25644p2nn2zse5ntrkw7cf6g7th0amtdpu",
  "chain_id": "injective-888",
  "rpc_url": "https://injective-testnet-rpc.publicnode.com",
  "rest_url": "https://testnet.sentry.lcd.injective.network",
  "msgs": [
    {
      "contractAddress": "inj14ml2czkry3t3lftplatxkhhz0nqrm8lglh4czg",
      "msg": {
        "send": {
          "amount": "500000",
          "contract": "inj1sdmz25644p2nn2zse5ntrkw7cf6g7th0amtdpu",
          "msg": "eyJyZ..."
        }
      },
      "funds": []
    }
  ]
}`
    }
  ]}
/>

### EVM

<Tabs
  tabs={[
    {
      id: 'evm-remove-request',
      label: 'Request',
      language: 'bash',
      content: `curl -X 'POST' \\
  'https://testnet.api.euclidprotocol.com/api/v1/execute/liquidity/remove' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "lp_allocation": "500000",
    "vlp_address": "nibi...",
    "sender": {
      "address": "0x72bbb...",
      "chain_uid": "base"
    },
    "cross_chain_addresses": [
      {
        "user": {
          "address": "0xrecipient...",
          "chain_uid": "amoy"
        },
        "limit": {
          "less_than_or_equal": "300000"
        }
      }
    ]
}'`
    },
    {
      id: 'evm-remove-response',
      label: 'Response',
      language: 'json',
      content: `{
  "msgs": [
    {
      "chainId": "84532",
      "data": "0x4000aea0000000000...",
      "gasLimit": "0x493E0",
      "to": "0x0000000000000000000000000000000000000000",
      "value": "0x0"
    }
  ],
  "type": "evm"
}`
    }
  ]}
/>
### Parameters 

| **Field**                 | **Type**                                                                                             | **Description**                                                                 |
|---------------------------|------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| `lp_allocation`           | `string`                                                                                            | Amount of LP tokens to remove (in smallest unit).                              |
| `vlp_address`             | `string`                                                                                            | Address of the Virtual Liquidity Pool (VLP) smart contract.                     |
| `sender`                  | [`CrossChainUser`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#crosschainuser)            | Wallet address and chain of the user initiating the removal.                   |
| `cross_chain_addresses`   | [`CrossChainUserWithLimit`](../../../Euclid%20Smart%20Contracts/CosmWasm/overview#crosschainuserwithlimit)`[]` | Optional set of addresses to specify where the assets should be released. The first element specified in the vector has highest priority and so on. Defaults to the sender. Defaults to the sender.                          |
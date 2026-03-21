---
sidebar_position: 4
---
import Tabs from '@site/src/components/Tabs';

# Remove Liquidity

Generates a transaction to remove liquidity from a pool.

### Examples

<Tabs
  tabs={[
    {
      id: 'evm-remove-request',
      label: 'EVM Request',
      language: 'bash',
      content: `curl -X 'POST' \
  'https://api.euclidprotocol.com/api/v1/execute/liquidity/remove' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "lp_allocation": "1000000",
    "vlp_address": "euclid1g6kht9c5s4jwn4akfjt3zmsfh4nvguewaegjeavpz3f0q9uylrqsz7xg3r",
    "pair": {
      "token_1": "usdc",
      "token_2": "usdt"
    },
    "receiver": {
      "address": "0x1111111111111111111111111111111111111111",
      "chain_uid": "polygon"
    },
    "sender": {
      "address": "0x1111111111111111111111111111111111111111",
      "chain_uid": "polygon"
    },
    "timeout": "60"
}'`
    },
    {
      id: 'evm-remove-response',
      label: 'EVM Response',
      language: 'json',
      content: `{
  "msgs": [
    {
      "chainId": "137",
      "data": "0x095ea7b300000000000000000000000008e6604931e9c2a978d4861b912f7894cc6063f700000000000000000000000000000000000000000000000000000000000f4240",
      "gasLimit": "0x186A0",
      "to": "0x8EE0d319865D30B27dCa58C322628597Bf5f4885",
      "value": "0x0"
    },
    {
      "chainId": "137",
      "data": "0xee970de2...",
      "gasLimit": "0x493E0",
      "to": "0x08E6604931E9c2a978D4861b912f7894CC6063F7",
      "value": "0x0"
    }
  ],
  "type": "evm"
}`
    },
    {
      id: 'cosmos-remove-request',
      label: 'Cosmos Request',
      language: 'bash',
      content: `curl -X 'POST' \
  'https://api.euclidprotocol.com/api/v1/execute/liquidity/remove' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "lp_allocation": "1000000",
    "vlp_address": "euclid1fa7tuuwmd5r3r40ujtrz82xxnxx8l4v2u74x9643v0c9j0h698qs6hx5nz",
    "pair": {
      "token_1": "inj",
      "token_2": "usdc"
    },
    "receiver": {
      "address": "inj1ugsn0llmegjn2q6fulexr4dwtazjcnvmgwhlj7",
      "chain_uid": "injective"
    },
    "sender": {
      "address": "inj1ugsn0llmegjn2q6fulexr4dwtazjcnvmgwhlj7",
      "chain_uid": "injective"
    },
    "timeout": "60"
}'`
    },
    {
      id: 'cosmos-remove-response',
      label: 'Cosmos Response',
      language: 'json',
      content: `{
  "type": "cosmwasm",
  "sender": {
    "chain_uid": "injective",
    "address": "inj1ugsn0llmegjn2q6fulexr4dwtazjcnvmgwhlj7"
  },
  "contract": "inj1mhk96ahzy54hjdw8xu9wug89yeg5y8dgm2g35q",
  "chain_id": "injective-888",
  "rpc_url": "https://injective-testnet-rpc.publicnode.com",
  "rest_url": "https://testnet.sentry.lcd.injective.network",
  "msgs": [
    {
      "contractAddress": "inj109h276p8lju5xuku64at2t5gx63sv5nsuet8ar",
      "msg": {
        "send": {
          "amount": "1000000",
          "contract": "inj1mhk96ahzy54hjdw8xu9wug89yeg5y8dgm2g35q",
          "msg": "eyJyZW1vdmVfbGlxdWlkaXR5Ijp7ImNyb3NzX2NoYWluX2FkZHJlc3NlcyI6W10sImxwX2FsbG9jYXRpb24iOiIxMDAwMDAwIiwicGFpciI6eyJ0b2tlbl8xIjoiaW5qIiwidG9rZW5fMiI6InVzZGMifSwidGltZW91dCI6bnVsbH19"
        }
      },
      "funds": []
    }
  ]
}`
    }
  ]}
/>

### Parameters 

| **Field**                 | **Type**                                                                                             | **Description**                                                                 |
|---------------------------|------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| `lp_allocation`           | `string`                                                                                            | Amount of LP tokens to remove (in smallest unit).                              |
| `vlp_address`             | `string`                                                                                            | Address of the Virtual Liquidity Pool (VLP) smart contract.                    |
| `pair`                    | [`PairToken`](/docs/API/API%20Reference/common%20types.md#pairtoken)                               | Pair tokens used for liquidity removal (`token_1`, `token_2`).                 |
| `receiver`                | [`CrossChainUser`](/docs/API/API%20Reference/common%20types.md#crosschainuser)                     | Receiver for the withdrawn assets.                                              |
| `sender`                  | [`CrossChainUserWithAmount`](/docs/API/API%20Reference/common%20types.md#crosschainuserwithamount) | Wallet address and chain of the user initiating the removal.                   |
| `timeout`                 | `string`                                                                                            | Optional timeout in seconds.                                                    |

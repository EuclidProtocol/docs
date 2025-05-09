---
sidebar_position: 3
description: "The Escorw Smart Contract (EVM)"
---
import Tabs from '@site/src/components/Tabs';

## Query Messages

:::note
We will only go through the queries for this contract, as users are not allowed to execute any messages on the Escrow contract directly.
You can read about the Escrow architecture [here](../../Architecture%20Overview/Architecture/Integrated%20Chains%20Layer/escrows.md).
:::

List of queries that can be performed on the Escrow contract.

### Get State

Returns the internal configuration and current status of the escrow contract.

#### Query Call

<Tabs tabs={[
{
id: 'solidity-example',
label: 'Solidity',
language: 'solidity',
content: `
function getState() external view returns (EscrowState memory);

`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "get_state": {}
}
`
}
]} />

#### Response

<Tabs tabs={[
{
id: 'solidity-response',
label: 'Solidity',
language: 'solidity',
content: `
struct EscrowState {
    string token_id;
    address factory;
    address owner;
    address token_manager;
}
`
}
]} />

| **Field**         | **Type**   | **Description**                                         |
|-------------------|------------|---------------------------------------------------------|
| `token_id`        | `string`   | The token this escrow contract is associated with.      |
| `factory`         | `address`  | The address of the factory that created this escrow.    |
| `owner`           | `address`  | The current owner/admin of the escrow.                  |
| `token_manager`   | `address`  | Address allowed to update or manage token settings.     |

### Get Token ID

Returns the token ID associated with this escrow contract.

#### Query Call

<Tabs tabs={[
{
id: 'solidity-example',
label: 'Solidity',
language: 'solidity',
content: `
function getTokenId() external view returns (string memory);
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "get_token_id": {}
}
`
}
]} />

#### Response

<Tabs tabs={[
{
id: 'solidity-response',
label: 'Solidity',
language: 'solidity',
content: `
string token_id;
`
}
]} />

| **Field**   | **Type**   | **Description**                           |
|-------------|------------|-------------------------------------------|
| `token_id`  | `string`   | The token ID tied to this escrow contract. |

### Is Token Allowed

Checks whether a specific token type is allowed in this escrow.

#### Query Call

<Tabs tabs={[
{
id: 'solidity-example',
label: 'Solidity',
language: 'solidity',
content: `
function isTokenAllowed(TokenType memory token_type) external view returns (bool);
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "is_token_allowed": {
    "token_type": {
      "native": {
        "denom": "usdc"
      }
    }
  }
}
`
}
]} />

#### Input Parameters

| **Field**     | **Type**     | **Description**                                            |
|---------------|--------------|------------------------------------------------------------|
| `token_type`  | [`TokenType`](overview.md#tokentype) | The type of token to check (native or smart).              |

#### Response

<Tabs tabs={[
{
id: 'solidity-response',
label: 'Solidity',
language: 'solidity',
content: `
bool is_allowed;
`
}
]} />

| **Field**     | **Type** | **Description**                             |
|---------------|----------|---------------------------------------------|
| `is_allowed`  | `bool`   | True if the token is permitted by the escrow. |

### Get Allowed Denoms

Returns a list of all native token denominations allowed by this escrow.

#### Query Call

<Tabs tabs={[
{
id: 'solidity-example',
label: 'Solidity',
language: 'solidity',
content: `
function getAllowedDenoms() external view returns (string[] memory);
`
},
{
id: 'json-example',
label: 'JSON',
language: 'json',
content: `
{
  "get_allowed_denoms": {}
}
`
}
]} />

#### Response

<Tabs tabs={[
{
id: 'solidity-response',
label: 'Solidity',
language: 'solidity',
content: `
string[] allowed_denoms;
`
}
]} />

| **Field**         | **Type**      | **Description**                                 |
|-------------------|---------------|-------------------------------------------------|
| `allowed_denoms`  | `string[]`    | List of native denoms allowed in this escrow.   |
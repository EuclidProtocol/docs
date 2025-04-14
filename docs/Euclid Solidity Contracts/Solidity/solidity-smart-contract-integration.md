---
sidebar_position: 6
description: "Integrate with Euclid's Smart Contracts on EVM"
---
import Tabs from '@site/src/components/Tabs';

# Smart Contract Integration

This guide aims to help developers integrate their Solidity-based smart contracts with the existing Euclid contract set. Whether you're building on top of Euclid's infrastructure or simply interacting with it, this guide provides the necessary tools, patterns, and examples to get started.

## Executing on a Euclid Contract

Each Euclid contract exposes a set of public functions. These are callable from external smart contracts using standard Solidity `interface` definitions.

### Pattern

To execute a function on another contract (like the Factory), you:

1. Import or define the contract interface with the function you want to call.
2. Pass in the correct parameters from your own contract.
3. Call the function like any normal Solidity external call.

### Example

Let’s say Contract A wants to perform a swap by calling the `swap_request` function on the Euclid Factory.

#### 1. Define the interface

First, define the interface for the Factory contract’s swap_request function:

<Tabs
  tabs={[
    {
      id: 'solidity-interface',
      label: 'Solidity',
      language: 'solidity',
      content: `
interface IFactory {
    function swap_request(
        string calldata asset_in,
        uint256 amount_in,
        string calldata asset_out,
        uint256 min_amount_out,
        uint64 timeout,
        NextSwapPair[] calldata swaps,
        CrossChainUserWithLimit[] calldata cross_chain_addresses,
        PartnerFee calldata partner_fee,
        string calldata meta
    ) external;
}
`
    }
  ]}
/>

#### 2. Import the necessary structs

Solidity doesn’t automatically share structs across contracts. You must define or import them yourself. 

<Tabs
  tabs={[
    {
      id: 'solidity-structs',
      label: 'Solidity',
      language: 'solidity',
      content: `
struct NextSwapPair {
    string token_in;
    string token_out;
}

struct PartnerFee {
    uint64 partner_fee_bps;
    address recipient;
}

struct CrossChainUser {
    string chain_uid;
    string user_address;
}

struct CrossChainUserWithLimit {
    CrossChainUser user;
    uint256 limit;
}
`
    }
  ]}
/>
You can copy these into your contract from the main factory. Then, prepare the data to pass into your call:

<Tabs
  tabs={[
    {
      id: 'solidity-example',
      label: 'Solidity',
      language: 'solidity',
      content: `
// Define the swap path (e.g., USDC → WETH → DAI)
NextSwapPair ;
swaps[0] = NextSwapPair("usdc", "weth");
swaps[1] = NextSwapPair("weth", "dai");

// Optional: Cross-chain recipient
CrossChainUserWithLimit ;
crossChainRecipients[0] = CrossChainUserWithLimit({
    user: CrossChainUser("arbitrum", "0xabc123..."),
    limit: 800000
});

// Optional: Partner fee config
PartnerFee memory partnerFee = PartnerFee({
    partner_fee_bps: 25,
    recipient: 0x1234567890abcdef1234567890abcdef12345678
});
`
    }
  ]}
/>

#### 3. Call the contract in your own function

:::tip
Here `factoryAddr` is the address of the deployed Factory contract you're calling.
:::
A. Native Token Example

<Tabs
  tabs={[
    {
      id: 'solidity-perform-native-swap',
      label: 'Solidity',
      language: 'solidity',
      content: `
function performNativeSwap(address factoryAddr) external payable {
    IFactory(factoryAddr).swap_request{value: msg.value}(
        "eth",
        msg.value,
        "dai",
        980000,
        60,
        swaps,
        crossChainRecipients,
        partnerFee,
        "eth-to-dai"
    );
}
`
    }
  ]}
/>

B. ERC20 Token Example

<Tabs
  tabs={[
    {
      id: 'solidity-perform-swap',
      label: 'Solidity',
      language: 'solidity',
      content: `
function performSwap(address factoryAddr) external {
    IFactory(factoryAddr).swap_request(
        "usdc",
        1000000,
        "dai",
        980000,
        60,
        swaps,
        crossChainRecipients,
        partnerFee,
        "custom-metadata"
    );
}
`
    }
  ]}
/>
    

## Querying a Euclid Contract

In Solidity, queries are simply `view` functions. To call them from another contract:

- Define the interface with the correct function signatures.
- Call them directly via the contract address.

### Example

Let’s say Contract A wants to check whether a specific token is allowed in a given Escrow contract.

#### 1. Define the interface

<Tabs
  tabs={[
    {
      id: 'solidity-escrow-interface',
      label: 'Solidity',
      language: 'solidity',
      content: `
interface IEscrow {
    function isTokenAllowed(TokenType calldata tokenInfo) external view returns (bool);
}
`
    }
  ]}
/>

#### 2. Define the struct

<Tabs
  tabs={[
    {
      id: 'solidity-token-struct',
      label: 'Solidity',
      language: 'solidity',
      content: `
struct TokenType {
    uint8 tokenType; // 0 = Native, 1 = Smart, 2 = Voucher
    string denom;
    address contractAddress;
}
`
    }
  ]}
/>

#### 3. Perform the query

<Tabs
  tabs={[
    {
      id: 'solidity-query-example',
      label: 'Solidity',
      language: 'solidity',
      content: `
function checkTokenAllowed(address escrowAddr) external view returns (bool) {
    TokenType memory tokenInfo = TokenType({
        tokenType: 0,
        denom: "usdc",
        contractAddress: address(0)
    });

    return IEscrow(escrowAddr).isTokenAllowed(tokenInfo);
}
`
    }
  ]}
/>


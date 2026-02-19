---
sidebar_position: 5
title: "Create a New Liquidity Pool"
---
import Tabs from '@site/src/components/Tabs';

# Create a New Liquidity Pool

To create a new liquidity pool, you need to generate a pool creation transaction using the REST endpoint and then broadcast it on the selected chain.

For a general overview of Euclid pool types, initialization rules, and LP minting behavior, see [Euclid Pools](../Euclid%20Pools.md).

The [Create Pool](../../API%20Reference/REST/Transactions/Liquidity/Create%20Pool.md) parameters are:

```bash
sender
pair
slippage_tolerance_bps
lp_token_name
lp_token_symbol
lp_token_decimal
lp_token_marketing
pool_config
timeout
```

## Steps

### 1. Select the chain you want to use

Choose the chain where the pool will be created from your UI, or derive it from the connected wallet.

:::tip
Use [Fetch All Supported Chains](../../Trading/Endpoints/Fetch%20Chains.md) to populate chain selection in your UI.
:::

### 2. Validate token inputs and balances

Before building the request, ensure:

- At least one token is already registered in Euclid.
- If a token is new, its token ID ends with `.eucl` (example: `dan.eucl`).
- For `native` or `smart` token types, the token exists on the selected chain.
- You have enough balance of both input tokens on the selected chain.
- `pair.token_1.token` and `pair.token_2.token` are sorted alphabetically (`token_1` must come first).

### 3. Construct the Create Pool API call

Build and call the endpoint with your selected chain, token pair, amounts, and pool config:

<Tabs
  tabs={[
    {
      id: 'cosmwasm-create-pool',
      label: 'CosmWasm',
      language: 'javascript',
      content: `const msg = await axios.post("https://testnet.api.euclidprotocol.com/api/v1/execute/pool/create", {
  sender: {
    address: wallet!.bech32Address,
    chain_uid: chain!.chain_uid,
  },
  pair: {
    token_1: {
      token: token1Id,
      token_type: token1Type, // native or smart
      amount: token1Amount,
    },
    token_2: {
      token: token2Id,
      token_type: token2Type, // native or smart
      amount: token2Amount,
    },
  },
  slippage_tolerance_bps: slippageBps,
  lp_token_name: lpTokenName,
  lp_token_symbol: lpTokenSymbol,
  lp_token_decimal: lpTokenDecimal,
  lp_token_marketing: lpTokenMarketing, // optional, Cosmos only
  timeout: "3600",
}).then((res) => res.data);

console.log(msg.msgs, "Create Pool Response");`
    },
    {
      id: 'evm-create-pool',
      label: 'EVM',
      language: 'javascript',
      content: `const msg = await axios.post("https://testnet.api.euclidprotocol.com/api/v1/execute/pool/create", {
  sender: {
    address: walletAddress,
    chain_uid: chainUid,
  },
  pair: {
    token_1: {
      token: token1Id,
      token_type: token1Type,
      amount: token1Amount,
    },
    token_2: {
      token: token2Id,
      token_type: token2Type,
      amount: token2Amount,
    },
  },
  slippage_tolerance_bps: slippageBps,
  lp_token_name: lpTokenName,
  lp_token_symbol: lpTokenSymbol,
  lp_token_decimal: lpTokenDecimal,
  pool_config: {
    pool_type: "stable",
    amp_factor: null,
  },
  timeout: "3600",
}).then((res) => res.data);`
    }
  ]}
/>

### Advanced: Create a pool using vouchers

You can also create pools using voucher tokens. This lets you compose pools with assets sourced from different chains without requiring both assets to be native to the same chain at setup time.

Keep the same request rules: valid token IDs, alphabetical token ordering, and correct pair structure.

### 4. Broadcast transaction to chain

Broadcast and sign with the connected wallet:

<Tabs
  tabs={[
    {
      id: 'cosmos-create-pool-broadcast',
      label: 'CosmWasm',
      language: 'javascript',
      content: `const tx = await client!.executeMultiple(
  wallet!.bech32Address,
  msg.msgs,
  "auto",
  "Create Pool"
);
return tx;`
    },
    {
      id: 'evm-create-pool-broadcast',
      label: 'EVM',
      language: 'javascript',
      content: `const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

for (const call of msg.msgs) {
  const tx = await signer.sendTransaction({
    to: call.to,
    data: call.data,
    value: call.value || "0x0",
  });
  await tx.wait();
}`
    }
  ]}
/>

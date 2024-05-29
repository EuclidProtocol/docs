---
sidebar_position: 4
description: "Learn About Euclid's Virtual Pools"
---

# Virtual Pools

Euclid **Virtual Pools** are responsible of keeping track and settling transactions across the Euclid ecosystem for a certain token pair. Any token pair across the entire ecosystem will have to settle its transaction in that pool for the swap to be considered final.

Virtual Pools *solely* exist on the **Virtual Settlement Layer** and never hold any tokens but rather keep track of all existing tokens for the token pair in the Euclid ecosystem. These virtual pools allow to unify the liquidity across the blockchain without actually having to bridge or move the tokens from one chain to another. This ensures that liquidity remains *decentralized* and *modular*.

Here is some of the information tracked by Euclid's virtual pools:

```rust

pub enum QueryMsg {
    // Query to simulate a swap for the asset
    #[returns(GetSwapResponse)]
    SimulateSwap { asset: Token, asset_amount: Uint128 },

    // Queries the total reserve of the pair in the VLP
    #[returns(GetLiquidityResponse)]
    Liquidity {},

    // Queries the fee of this specific pool
    #[returns(FeeResponse)]
    Fee {},

    // Queries the pool information for a chain id
    #[returns(PoolResponse)]
    Pool { chain_id: String },
    
    // Query to get all pools for the token pair
    #[returns(AllPoolsResponse)]
    GetAllPools {},
}
```

## Guaranteed Finality

Since Virtual Pools exist on a Virtual Settlement Layer, all transactions performed are finalized and committed to a blockchain before relayed back to any pool on the chain, this ensures that any change is finalized in sequence before another transaction is committed to avoid any double spending or similar exploit.
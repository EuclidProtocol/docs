---
title: Vouchers (Virtual Balances)
---

Vouchers (aka virtual balances) are the system's primary accounting primitive for cross-chain assets. They represent a 1:1 virtualized balance for each user and Virtual Liquidity Pool (VLP), tracked on the hub (VSL) chain, and are used as the authoritative source for eligibility to move real assets across chains.

Instead of moving funds on every cross-chain hop, the hub adjusts voucher balances during routing and only releases escrowed assets when a user redeems. This makes vouchers the core unit of value inside the VSL: liquidity, swaps, transfers, and claims operate on virtual balances, and physical assets are only moved at entry/exit points.

## Vouchers as the core piece in the system
- Vouchers (virtual balances) are the core unit of value inside the VSL.
- All internal routing and settlement operate on voucher balances.
- Physical assets move only at entry and redemption.

## Why we added vouchers
### Speed of execution
Vouchers let the hub execute swaps and liquidity moves without waiting on physical asset transfers across each cross-chain hop. Voucher operations run entirely on the VSL/hub execution layer (dedicated to Euclid transactions), so transfers and approvals are local and immediate. Real assets only move at entry and redemption on any Euclid-connected chain, keeping execution fast and predictable.

### Security
Only the router can mint or burn voucher balances, creating a single, auditable gate for cross-chain issuance and redemption. That centralized control point (on-chain) makes the system harder to exploit and reduces risk of real funds getting stuck mid-route, since physical assets only move when explicitly released.

### Ease of management for cross-chain funds
Escrow balances and voucher balances are decoupled: escrow holds real assets per chain, while vouchers are the consolidated, cross-chain view of a user's value. At the same time, vouchers never exceed the real assets held in escrow, so they remain directly backed by on-chain liquidity. Users can choose to redeem into native tokens on a specific chain or keep value as vouchers, which can exist on any Euclid-connected chain even if the asset isn't native there. This lets users consolidate diverse assets onto a single chain without forcing immediate redemption.

### Still decentralized and trackable
All voucher activity is on-chain: balances, approvals, transfers, and mints/burns are stored and emitted as events, and queries provide transparency. It's a virtual asset, but fully auditable.

### CEX like UX without centralization
Crypto is meant to be decentralized, yet most volume still flows through centralized exchanges because they offer a smoother experience: users don't have to think about chains, bridges, or wallet logistics. Vouchers recreate that unified experience inside Euclid while keeping everything decentralized and on-chain. The same ease of use comes from smart contracts and protocol rules, not custody or centralized intermediaries.

## How vouchers work in the architecture
### Core contract model
The `virtual_balance` contract tracks balances keyed by `(chain_uid, address, token_id)` and supports:
- Mint / Burn (router-only)
- Transfer (with optional allowance)
- Approve (for spender to move on behalf of owner)
- `GetBalance` / `GetUserBalances` queries

## Deeper dive: how vouchers are used
### 1) Deposit: escrow + mint vouchers
When assets enter the hub from another chain, escrow balances are updated and vouchers are minted to represent the deposited amount for the sender.

### 2) Swaps and liquidity
VLP operations use voucher transfers and approvals:
- When adding liquidity, VLP contracts spend voucher balances on behalf of users (via approvals).
- When removing liquidity or swapping, voucher transfers represent the internal value flow without moving real assets on each chain.

### 3) Transfer vouchers between users
Vouchers can be transferred to other cross-chain users using `ExecuteMsg::Transfer`.

### 4) Withdraw vouchers: release escrow
A user redeeming vouchers calls `WithdrawVoucher`. The router verifies the user's voucher balance via `GetBalance` query and then releases escrowed assets to the requested destination chain(s).

## Token semantics: voucher token type
Tokens have types (native/smart/voucher). Voucher tokens are not normal on-chain assets and do not have a denom or standard balance query; they are handled through the virtual balance system on the hub. Because of that, vouchers are native to the Euclid ecosystem: they aren't directly usable in external apps unless those apps integrate the Euclid liquidity layer.

## In short
Vouchers are the hub's unified accounting layer: they keep value portable across chains, make execution fast by staying local to the VSL, and let real assets move only when users choose to redeem. This unlocks one of the fastest and most secure cross-chain DeFi execution layers in the crypto ecosystem.

In the next section, we cover meta transactions which are made possible by the voucher system unlocking unique features and UX flows that other DeFi protocols  can’t offer.

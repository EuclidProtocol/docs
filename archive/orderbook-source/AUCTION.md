# Auction Mode

This engine supports a manual market-wide auction state used for orderly opens/reopens.

## Overview
- `MarketState::Auction` collects orders into a separate auction book.
- No continuous matching occurs while in auction.
- Market-wide state transitions are manual via admin endpoints.

## Order handling in Auction
- Accepted: `Limit`, `PostOnly`.
- Rejected: `Market`, `Ioc` (validation error `AUCTION_ORDER_TYPE_NOT_SUPPORTED`).
- Cancels are supported for auction orders.

## Transition behavior
### Enter Auction
- On transition to `Auction`, all resting orders in the continuous book are moved into the auction book.
- The continuous book is cleared (state is preserved via the auction book).

### Exit Auction (to Active)
- The engine computes a single clearing price and uncrosses all eligible orders.
- Remaining (unfilled) orders are moved into the continuous book.

## Clearing price selection
For each candidate price level:
1) Maximize executable volume.
2) Minimize imbalance between bid/ask volume.
3) Choose the price closest to a reference price.
4) If still tied, choose the higher price.

Reference price priority:
- Last trade price (if available).
- Midpoint of best bid/ask in the continuous book.
- Midpoint of best bid/ask in the auction book.
- Best bid or best ask if only one side is available.

## Trade attribution
- Taker is chosen deterministically by order timestamp:
  - Later timestamp = taker.
  - If timestamps tie, bid is treated as taker.

## Admin endpoints
- `POST /admin/market/auction`
- `POST /admin/market/active`

All admin endpoints require `ADMIN_TOKEN` and are audited to `ADMIN_AUDIT_LOG_PATH`.

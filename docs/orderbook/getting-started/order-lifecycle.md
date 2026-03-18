---
title: Order Lifecycle
description: End-to-end lifecycle for placing, matching, and cancelling orders.
sidebar_position: 2
---

- Audience: Trading API integrators.
- What this page covers: Place/cancel behavior, order status outcomes, and where to query final state.

## Place Order Path
1. Client submits an order to engine (`POST /orders` or `POST /signed_orders`).
2. Engine validates pair state, market state, and order constraints.
3. Engine matches immediately against opposite-side liquidity where possible.
4. If quantity remains and order type allows resting, the remaining quantity becomes `open` on the book.
5. Engine emits events (durable outbox first, then async dispatch to Kafka/sinks).
6. OMS consumes order events and updates open/history read models.

## Match Outcomes
- `filled`: Order is fully executed immediately.
- `partially_filled`: Part executes; remainder may stay `open` if order type can rest.
- `open`: No immediate full execution and remaining amount rests on the book.
- `cancelled`: Resting order is cancelled.
- `rejected`: Validation or market/pair-state rules reject the request (`error_code` in response).

## Cancel Path
1. Client calls `POST /orders/cancel` with `pair_id` and `order_id`.
2. Engine checks ownership/auth context and order existence.
3. If found and cancellable, engine removes it from the book and returns `cancelled`.
4. Cancellation event is emitted; OMS reflects this in history and removes it from the open set.

## Where to Read Open Orders and History
- Open orders: OMS `GET /orders/open/:user_id`
- Order history: OMS `GET /orders/history/:user_id`
- Single order lookup: OMS `GET /orders/:order_id`

Use OMS for user-facing order views. Engine is the execution system of record; OMS is the query/read model.

## Sequence Diagram
```mermaid
sequenceDiagram
    participant C as Trading Client
    participant E as Engine API
    participant M as Matching Engine
    participant O as Outbox
    participant K as Kafka
    participant S as OMS

    C->>E: POST /orders
    E->>M: Validate + process command
    alt Accepted
        M->>M: Match against book
        M->>O: Persist order/trade/depth events
        O-->>K: Dispatch events async
        K-->>S: Consume order events
        S->>S: Update open/history read model
        E-->>C: 200 accepted/fills
    else Rejected
        E-->>C: 4xx with error_code
    end

    C->>E: POST /orders/cancel
    E->>M: Cancel request
    M->>O: Persist cancel event
    O-->>K: Dispatch cancel event
    K-->>S: Consume cancel
    S->>S: Mark cancelled / remove from open
    E-->>C: 200 cancelled
```

## Read Next
- [Orderbook Mechanics](../concepts/orderbook-mechanics.md)
- [Engine API](../developer-reference/engine-api.md)
- [OMS Service](../developer-reference/oms-service.md)

---
title: Authentication and API Keys
description: How to get API keys and which headers to send on authenticated public endpoints.
sidebar_position: 1
---

## Get API Keys

Generate API keys in [Euclid Prime](https://orderbook-frontend.vercel.app/api).

Use the generated API key and API secret on authenticated engine and OMS requests.

## Headers
- `Authorization: Bearer <token>`
- `X-API-KEY: <key>`
- `X-API-SECRET: <secret>`

## Authenticated Endpoint Groups
- Engine authenticated routes: `https://api.liquideuclid.com/*`
- OMS authenticated routes: `https://oms.liquideuclid.com/*`

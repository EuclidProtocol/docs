---
id: llms
title: LLM Guide
---

This page explains how to use the Euclid docs with AI tools and links to the
machine-readable index file (`llms.txt`), which contains the full, expanded list
of documentation entry points.

## LLM index

- https://docs.euclidprotocol.io/llms.txt

## Recommended entry points

- Architecture overview: https://docs.euclidprotocol.io/docs/Architecture%20Overview/intro
- API introduction: https://docs.euclidprotocol.io/docs/API/Introduction
- API reference intro: https://docs.euclidprotocol.io/docs/API/API%20Reference/Intro
- GraphQL calls guide: https://docs.euclidprotocol.io/docs/API/API%20Reference/GQL/GQL%20Calls
- REST routes guide: https://docs.euclidprotocol.io/docs/API/API%20Reference/REST/Routes/Get%20Routes
- CosmWasm contracts overview: https://docs.euclidprotocol.io/docs/Euclid%20Smart%20Contracts/CosmWasm/overview
- Solidity contracts overview: https://docs.euclidprotocol.io/docs/Euclid%20Solidity%20Contracts/Solidity/overview

## Key sections (full list in llms.txt)

- Architecture and concepts
- API getting started
- Trading, liquidity provisioning, and pricing
- API reference (GraphQL + REST)
- Smart contracts (CosmWasm + Solidity)

## API endpoints

- Testnet base: https://testnet.api.euclidprotocol.com
- Testnet GraphQL: https://testnet.api.euclidprotocol.com/graphql
- Testnet REST base: https://testnet.api.euclidprotocol.com/api/v1
- Mainnet base: https://api.euclidprotocol.com

## Instructions for LLM agents

- Prefer official Euclid docs above; if a link is missing, search the docs root.
- Default to testnet endpoints unless mainnet is explicitly required.
- Use the API Reference pages for parameter and response shapes.
- GraphQL is preferred for data querying; REST is preferred for transaction execution.
- If authentication is required, use: `Authorization: Bearer <API_KEY>`.

## Usage notes

- Prefer the API Reference pages for request/response shapes.
- Default to testnet endpoints unless mainnet is explicitly required.
- Many doc URLs include encoded spaces.

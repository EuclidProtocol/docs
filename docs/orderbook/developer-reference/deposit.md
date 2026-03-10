---
title: Deposit
sidebar_position: 3
description: How to increase orderbook balance by depositing vouchers to the orderbook contract.
---

## Balance Top-Up Requirement
To increase your orderbook trading balance, you must deposit vouchers into the orderbook contract.

Without a voucher deposit, your orderbook balance will not increase for trading.

## How to Deposit
Use the Voucher Deposit flow in the main API docs:

- [Deposit Voucher](../../API/API%20Reference/REST/Transactions/Vouchers/Deposit.md)

That section covers the full request format and execution flow.

## After Deposit
After the deposit is executed and finalized, verify your updated balance using:

- `GET /account`
- `GET /balances/:user_id`
- `GET /balances/:user_id/:asset`

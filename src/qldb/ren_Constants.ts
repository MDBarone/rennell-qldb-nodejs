/*
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Constant values used throughout this tutorial.
 */

export const LEDGER_NAME = "RenellTestLedger";
export const LEDGER_NAME_WITH_TAGS = "tags";
export const TRANSACTIONS_TABLE_NAME = "Transactions";
export const TOKENS_TABLE_NAME = "Tokens";
export const TRANSACTIONS_TX_ID_INDEX_NAME = "tx_id";
export const TRANSACTIONS_TX_TYPE_INDEX_NAME = "tx_type";
export const TRANSACTIONS_APPROVED_INDEX_NAME = "approved";
export const TRANSACTIONS_WALLET_ID_TO_INDEX_NAME = "wallet_id_to";
export const TRANSACTIONS_WALLET_ID_FROM_INDEX_NAME = "wallet_id_from";
export const TOKENS_TOKEN_ID_INDEX_NAME = "token_id";
export const TOKENS_COMPANY_ID_INDEX_NAME = "company_id";

export const RETRY_LIMIT = 4;

export const JOURNAL_EXPORT_S3_BUCKET_NAME_PREFIX = "qldb-tutorial-journal-export";
export const USER_TABLES = "information_schema.user_tables";

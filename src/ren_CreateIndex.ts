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
import AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

import { QldbDriver, TransactionExecutor } from "amazon-qldb-driver-nodejs";

import { getQldbDriver } from "./ren_ConnectToLedger";
import {
    TRANSACTIONS_TABLE_NAME,
    TOKENS_TABLE_NAME,
    TRANSACTIONS_TX_ID_INDEX_NAME,
    TRANSACTIONS_TX_TYPE_INDEX_NAME,
    TRANSACTIONS_APPROVED_INDEX_NAME,
    TRANSACTIONS_WALLET_ID_TO_INDEX_NAME,
    TRANSACTIONS_WALLET_ID_FROM_INDEX_NAME,
    TOKENS_TOKEN_ID_INDEX_NAME,
    TOKENS_COMPANY_ID_INDEX_NAME

} from "./qldb/ren_Constants";
import { error, log } from "./qldb/LogUtil";

/**
 * Create an index for a particular table.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @param tableName Name of the table to add indexes for.
 * @param indexAttribute Index to create on a single attribute.
 * @returns Promise which fulfills with the number of changes to the database.
 */
export async function createIndex(
    txn: TransactionExecutor,
    tableName: string,
    indexAttribute: string
): Promise<number> {
    const statement: string = `CREATE INDEX on ${tableName} (${indexAttribute})`;
    return await txn.execute(statement).then((result) => {
        log(`Successfully created index ${indexAttribute} on table ${tableName}.`);
        return result.getResultList().length;
    });
}

/**
 * Create indexes on tables in a particular ledger.
 * @returns Promise which fulfills with void.
 */
var main = async function(): Promise<void> {
    try {
        const qldbDriver: QldbDriver = getQldbDriver();
        await qldbDriver.executeLambda(async (txn: TransactionExecutor) => {
            Promise.all([
                createIndex(txn, TOKENS_TABLE_NAME, TOKENS_TOKEN_ID_INDEX_NAME),
                createIndex(txn, TOKENS_TABLE_NAME, TOKENS_COMPANY_ID_INDEX_NAME),
                createIndex(txn, TRANSACTIONS_TABLE_NAME, TRANSACTIONS_TX_ID_INDEX_NAME),
                createIndex(txn, TRANSACTIONS_TABLE_NAME, TRANSACTIONS_TX_TYPE_INDEX_NAME),
                createIndex(txn, TRANSACTIONS_TABLE_NAME, TRANSACTIONS_APPROVED_INDEX_NAME),
                createIndex(txn, TRANSACTIONS_TABLE_NAME, TRANSACTIONS_WALLET_ID_TO_INDEX_NAME),
                createIndex(txn, TRANSACTIONS_TABLE_NAME, TRANSACTIONS_WALLET_ID_FROM_INDEX_NAME)
            ]);
        }, () => log("Retrying due to OCC conflict..."));
    } catch (e) {
        error(`Unable to create indexes: ${e}`);
    }
}

if (require.main === module) {
    main();
}

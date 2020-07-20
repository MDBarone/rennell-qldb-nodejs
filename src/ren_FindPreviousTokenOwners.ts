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

import { QldbDriver, Result, TransactionExecutor } from "amazon-qldb-driver-nodejs";
import { dom } from "ion-js";

import { getQldbDriver } from "./ren_ConnectToLedger";
// import { VEHICLE_REGISTRATION } from "./model/ren_SampleData";
import { TOKENS_TABLE_NAME } from "./qldb/ren_Constants";
import { prettyPrintResultList } from "./ren_ScanTable";
import { error, log } from "./qldb/LogUtil";
import { getDocumentId } from "./qldb/ren_Util";

/**
 * Find previous primary owners for the given token_id in a single transaction.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @param vin The VIN to find previous primary owners for.
 * @returns Promise which fulfills with void.
 */
async function FindPreviousTokenOwners(txn: TransactionExecutor, token_id: number): Promise<void> {
    const documentId: string = await getDocumentId(txn, TOKENS_TABLE_NAME, "token_id", token_id);
    const todaysDate: Date = new Date();
    const threeMonthsAgo: Date = new Date(todaysDate);
    threeMonthsAgo.setMonth(todaysDate.getMonth() - 3);

    const query: string =
        `SELECT c.wallet_id, h.metadata.version FROM history ` +
        `(${TOKENS_TABLE_NAME}, \`${threeMonthsAgo.toISOString()}\`, \`${todaysDate.toISOString()}\`) ` +
        `AS h, h.data.buyer_ids as c WHERE h.metadata.id = ?`;
    await txn.execute(query, documentId).then((result: Result) => {
        log(`Querying the 'Tokens' table's history using token_id: ${token_id}.`);
        const resultList: dom.Value[] = result.getResultList();
        // prettyPrintResultList(resultList);
        // log(resultList)
        // log(JSresultList);
        // COMPARE VERSION HISTORY FOR UNIQUE USERS
        // ...
    });
}

/**
 * Query a table's history for a particular set of documents.
 * @returns Promise which fulfills with void.
 */
var main = async function(): Promise<void> {
    try {
        const qldbDriver: QldbDriver = getQldbDriver();
        const token_id: number = 29; // EXAMPLE TOKEN
        await qldbDriver.executeLambda(async (txn: TransactionExecutor) => {
            await FindPreviousTokenOwners(txn, token_id);
        }, () => log("Retrying due to OCC conflict..."));
    } catch (e) {
        error(`Unable to query history to find previous owners: ${e}`);
    }
}

if (require.main === module) {
    main();
}

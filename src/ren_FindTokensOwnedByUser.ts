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
import { TOKENS_TABLE_NAME } from "./qldb/ren_Constants";
import { error, log } from "./qldb/LogUtil";
import { prettyPrintResultList } from "./ren_ScanTable";

let SAMPLE_ID: string = "F4D7E8B7FF4EB4DD67E3132FE7C6E10B7AA8862";

/**
 * Query 'Vehicle' and 'VehicleRegistration' tables using a unique document ID in one transaction.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @param govId The owner's government ID.
 * @returns Promise which fulfills with void.
 */
async function findTokensOwnedByUser(txn: TransactionExecutor, buyer_id: string): Promise<void> {
    // const documentId: string = await getDocumentIdForBuyer(txn, "buyer_ids", buyer_id);
    const query: string = `SELECT t.name, c.amount FROM Tokens AS t, t.buyer_ids as c WHERE c.wallet_id = ?`
    await txn.execute(query, buyer_id).then((result: Result) => {
        const resultList: dom.Value[] = result.getResultList();
        log(`Tokens and amounts for for buyer with wallet_id: ${buyer_id}`);
        prettyPrintResultList(resultList);
    });
}

/**
 * Find all vehicles registered under a person.
 * @returns Promise which fulfills with void.
 */
var main = async function(): Promise<void> {
    try {
        const qldbDriver: QldbDriver = getQldbDriver();
        await qldbDriver.executeLambda(async (txn: TransactionExecutor) => {
            await findTokensOwnedByUser(txn, SAMPLE_ID);
        }, () => log("Retrying due to OCC conflict..."));
    } catch (e) {
        error(`Error getting vehicles for owner: ${e}`);
    }
}

if (require.main === module) {
    main();
}

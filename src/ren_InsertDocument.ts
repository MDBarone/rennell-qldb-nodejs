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
import { TRANSACTIONS, TOKENS } from "./model/ren_SampleData";
import {
    TRANSACTIONS_TABLE_NAME,
    TOKENS_TABLE_NAME
} from "./qldb/ren_Constants";
import { error, log } from "./qldb/LogUtil";

/**
 * Insert the given list of documents into a table in a single transaction.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @param tableName Name of the table to insert documents into.
 * @param documents List of documents to insert.
 * @returns Promise which fulfills with a {@linkcode Result} object.
 */
export async function insertDocument(
    txn: TransactionExecutor,
    tableName: string,
    documents: object[]
): Promise<Result> {
    const statement: string = `INSERT INTO ${tableName} ?`;
    let result: Result = await txn.execute(statement, documents);
    return result;
}

/**
 * Handle the insertion of documents and updating PersonIds all in a single transaction.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @returns Promise which fulfills with void.
 */
async function updateAndInsertDocuments(txn: TransactionExecutor): Promise<void> {
    /** Functional code to add PK-like identifiers into the document data when useful.
    * May consider using this for future taxonomy
    // log("Inserting multiple documents into the 'Person' table...");
    // const documentIds: Result = await insertDocument(txn, PERSON_TABLE_NAME, PERSON);
    //
    // const listOfDocumentIds: dom.Value[] = documentIds.getResultList();
    // log("Updating PersonIds for 'DriversLicense' and PrimaryOwner for 'VehicleRegistration'...");
    // updatePersonId(listOfDocumentIds);
    */

    log("Inserting multiple documents into tables...");
    await Promise.all([
        insertDocument(txn, TRANSACTIONS_TABLE_NAME, TRANSACTIONS),
        insertDocument(txn, TOKENS_TABLE_NAME, TOKENS)
    ]);
}

/**
 * Update the PersonId value for DriversLicense records and the PrimaryOwner value for VehicleRegistration records.
 * @param documentIds List of document IDs.
 */
// export function updatePersonId(documentIds: dom.Value[]): void {
//     documentIds.forEach((value: dom.Value, i: number) => {
//         const documentId: string = value.get("documentId").stringValue();
//         DRIVERS_LICENSE[i].PersonId = documentId;
//         VEHICLE_REGISTRATION[i].Owners.PrimaryOwner.PersonId = documentId;
//     });
// }

/**
 * Insert documents into a table in a QLDB ledger.
 * @returns Promise which fulfills with void.
 */
var main = async function(): Promise<void> {
    try {
        const qldbDriver: QldbDriver = getQldbDriver();
        await qldbDriver.executeLambda(async (txn: TransactionExecutor) => {
            await updateAndInsertDocuments(txn);
        }, () => log("Retrying due to OCC conflict..."));
    } catch (e) {
        error(`Unable to insert documents: ${e}`);
    }
}

if (require.main === module) {
    main();
}

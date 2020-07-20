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
import { error, log } from "./qldb/LogUtil";
import { sleep } from "./qldb/ren_Util";

import { getQldbDriver } from "./ren_ConnectToLedger";
import { insertDocument } from "./ren_insertDocument";
import { prettyPrintResultList } from "./ren_ScanTable";

import { NEW_TOKEN } from "./model/ren_NewMintData";
import { TRANSACTIONS_TABLE_NAME } from "./qldb/ren_Constants";

var NEW_TOKEN_SUBMISSION = JSON.parse(JSON.stringify(NEW_TOKEN));
const MINT_APPROVAL_POLL_PERIOD_MS = 100000;


/**
 * Find and create new token_id from Transcations Table.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @param qldbClient The QLDB control plane client to use.
 * @returns Promise which fulfills with a CreateLedgerResponse.
 */
 async function getNewTokenID(txn: TransactionExecutor): Promise<void> {
     const query: string = `SELECT MAX(token_id) as max_id FROM Transactions`;
     await txn.execute(query).then((result: Result) => {
       const resultList = result.getResultList();
       var max_data = JSON.stringify(resultList[0]);
       const new_token_id = JSON.parse(max_data).max_id + 1;
       // Add the new id to the submission object may need to be it's own function
       NEW_TOKEN_SUBMISSION["token_id"] = new_token_id;
       return new_token_id
     });
 }

/**
 * Wait for minted token to be approved.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @returns Promise which fulfills with void.
 */
// async function waitForApprovedStatus(txn: TransactionExecutor, token_id: number): Promise<DescribeLedgerResponse> {
//     const APPROVAL_STATUS: string = 'Pending'
//     log(`Waiting for Token ${ledgerName} to become active...`);
//     while (APPROVAL_STATUS === 'Pending'){
//       APPROVAL_STATUS = checkApprovalStatus(token_id)
//       await sleep(MINT_APPROVAL_POLL_PERIOD_MS)
//      }));

/**
 * Query approved column of Transcations Table with pending token_id.
 * @param txn The {@linkcode TransactionExecutor} for lambda execute.
 * @returns Promise which fulfills with a current_status string.
 */
// async function checkStatus(txn: TransactionExecutor, token_id: number): Promise<void> {
//     const query: string = `SELECT approved as status FROM Transactions WHERE token = ?`;
//     await txn.execute(query).then((result: Result) => {
//       const resultList = result.getResultList();
//       var data = JSON.stringify(resultList[0])
//       const current_status = JSON.parse(max_data).status
//       return current_status
//     });
// }


/**
 * Create a ledger and wait for it to be active.
 * @returns Promise which fulfills with void.
 */
var main = async function(): Promise<void> {
  try {
      const qldbDriver: QldbDriver = getQldbDriver();
      await qldbDriver.executeLambda(async (txn: TransactionExecutor) => {
          await getNewTokenID(txn),
          // const token_id = await getNewTokenID(txn), // When waitForApprovedStatus function is online
          await insertDocument(txn, TRANSACTIONS_TABLE_NAME, NEW_TOKEN_SUBMISSION)
          // await waitForApprovedStatus(txn, token_id)
      }, () => log("Retrying due to OCC conflict..."));
    } catch (e) {
        error(`Unable to create the ledger: ${e}`);
    }
}

if (require.main === module) {
    main();
}

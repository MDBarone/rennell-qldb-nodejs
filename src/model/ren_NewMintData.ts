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

import { Decimal } from "ion-js";

export const NEW_TOKEN = {
        tx_type: "mint",
        instituion_id: 3,
        approved: "Pending",
        transaction_created: new Date("2020-05-12"),
        fee: new Decimal(2000, -2),
        amount: 2000,
        price: new Decimal(5000, -2),
        wallet_id_from: "12LF3R238B1FA84CF1D2E7E4874617D9HHFCF2N2",
        wallet_id_to: "",
        receipt: {
          header : {}, // Includes any relevant information from process, including raw response data from institution
          error : "",
          response: {
            initial_token_price:  new Decimal(5000, -2),
            initial_token_supply: 2000,
            ticker_name: "BLCX",
            token_name: "Blue Coin"
          }
        }
      };

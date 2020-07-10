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
const SAMPLE_BUYER_IDS: object[] = [ {wallet_id: "F4D7E8B7FF4EB4DD67E3132FE7C6E10B7AA8862", amount: 1} ];

export const TRANSACTIONS = [
  {
        tx_id: 29,
        tx_type: "mint",
        instituion_id: 3,
        token_id: 29,
        approved: "Approved",
        transaction_created: new Date("2020-05-11"),
        fee: new ion_js_1.Decimal(20.00, -2),
        amount: 10000,
        current_token_price: new ion_js_1.Decimal(20.00, -2),
        total_price: new ion_js_1.Decimal(30.00, -2),
        bid_price: new ion_js_1.Decimal(0.00, -2),
        wallet_id_from: "89DA3F238B1FA84CF1D2E7E4874617D9DDFCF3F4",
        wallet_id_to: "F4D7E8B7FF4EB4DD67E3132FE7C6E10B7AA8862",
        receipt: {
          header : {}, // Includes any relevant information from process, including raw response data from institution
          error : "",
          response: {
            initial_token_price:  new ion_js_1.Decimal(20.00, -2),
            initial_token_supply: 10000,
            tx_timestamp: new Date("20-05-12"),
            ticker_name: "ORCX",
            token_name: "Orange Coin"
          }
        }
      },
      {
        tx_id: 30,
        tx_type: "mint",
        instituion_id: 3,
        token_id: 36,
        approved: "Pending",
        transaction_created: new Date("2020-05-12"),
        fee: new ion_js_1.Decimal(20.00, -2),
        amount: 2000,
        price: 50.00,
        wallet_id_from: "89DA3F238B1FA84CF1D2E7E4874617D9DDFCF3F4",
        wallet_id_to: "",
        receipt: {
          header : {}, // Includes any relevant information from process, including raw response data from institution
          error : "",
          response: {
            initial_token_price:  new ion_js_1.Decimal(50.00, -2),
            initial_token_supply: 2000,
            tx_timestamp: new Date("20-05-12"),
            ticker_name: "YECX",
            token_name: "Yellow Coin"
          }
        }
      },
      {
        tx_id: 36,
        tx_type: "buy",
        instituion_id: 3,
        token_id: 29,
        approved: "Approved",
        transaction_created: new Date("2020-05-12"),
        amount: 1,
        fee: new ion_js_1.Decimal(1.00, -2),
        current_token_price: new ion_js_1.Decimal(20.00, -2),
        total_price: new ion_js_1.Decimal(21.00, -2),
        bid_price: new ion_js_1.Decimal(21.00, -2),
        wallet_id_from: "89DA3F238B1FA84CF1D2E7E4874617D9DDFCF3F4",
        wallet_id_to: "F4D7E8B7FF4EB4DD67E3132FE7C6E10B7AA8862",
        receipt: {
          header : {}, // Includes any relevant information from process, including raw response data from institution
          error : "",
          response: {
            final_token_price:  new ion_js_1.Decimal(20.00, -2),
            final_bid_price: new ion_js_1.Decimal(20.00, -2),
            amount: 1,
            tx_timestamp: new Date("20-05-12")
          }
        }
      },
      {
        tx_id: 36,
        tx_type: "trade",
        instituion_id: 3,
        token_id: 29,
        approved: "Approved",
        transaction_created: new Date("2020-05-12"),
        fee: new ion_js_1.Decimal(1.00, -2),
        amount: 2,
        current_token_price: new ion_js_1.Decimal(20.00, -2),
        total_price: new ion_js_1.Decimal(51.00, -2),
        max_bid_price: new ion_js_1.Decimal(25.00, -2),
        wallet_id_from: "89DA3F238B1FA84CF1D2E7E4874617D9DDFCF3F4",
        wallet_id_to: "F4D7E8B7FF4EB4DD67E3132FE7C6E10B7AA8862",

        receipt: {
          header : {}, // Includes any relevant information from process, including raw response data from institution
          error : "",
          response: {
            final_token_price:  new ion_js_1.Decimal(51.00, -2),
            final_bid_price: new ion_js_1.Decimal(51.00, -2),
            amount: 2,
            tx_timestamp: new Date("20-05-12")
    }
  }
},
    {
        tx_id: 36,
        tx_type: "trade",
        instituion_id: 3,
        token_id: 29,
        approved: "Failed",
        transaction_created: new Date("2020-05-12"),
        fee: new ion_js_1.Decimal(1.00, -2),
        amount: 1,
        current_token_price: new ion_js_1.Decimal(20.00, -2),
        total_price: new ion_js_1.Decimal(21.00, -2),
        max_bid_price: new ion_js_1.Decimal(10.00, -2),
        wallet_id_from: "89DA3F238B1FA84CF1D2E7E4874617D9DDFCF3F4",
        wallet_id_to: "F4D7E8B7FF4EB4DD67E3132FE7C6E10B7AA8862",
        receipt: {
          header : {},
          error : "Transcation could not complete, there are no more coins available for your bid range.", // Includes any relevant information from process, including raw response data from institution
          response: {
            final_token_price:  new ion_js_1.Decimal(21.00, -2),
            final_bid_price: new ion_js_1.Decimal(10.00, -2),
            amount: 1,
            tx_timestamp: new Date("20-05-12")
        }
    }
  },
    {
        tx_id: 36,
        tx_type: "trade",
        instituion_id: 3,
        token_id: 29,
        approved: "Pending",
        transaction_created: new Date("2020-05-13"),
        fee: new ion_js_1.Decimal(2.00, -2),
        amount: 1,
        current_token_price: new ion_js_1.Decimal(20.00, -2),
        total_price: new ion_js_1.Decimal(21.00, -2),
        max_bid_price: new ion_js_1.Decimal(25.00, -2),
        wallet_id_from: "89DA3F238B1FA84CF1D2E7E4874617D9DDFCF3F4",
        wallet_id_to: "H2R3E8B7FF4EB4DD67E3132FE7C6E10B7AA1900",
        receipt: {
          header : {},
          error : "", // Includes any relevant information from process, including raw response data from institution
          response: {
            final_token_price:  new ion_js_1.Decimal(22.00, -2),
            final_bid_price: new ion_js_1.Decimal(22.00, -2),
            amount: 1,
            tx_timestamp: new Date("20-05-12")
    }
  }
}
];

export const TOKENS = [
    {
        token_id: 29,
        company_id: 23049,
        name: "Orange Coin",
        ticker_name: "ORCX",
        date_registered: new Date("2020-05-11"),
        current_token_price: 20.00,
        creator_ids: ["89DA3F238B1FA84CF1D2E7E4874617D9DDFCF3F4"],
        buyer_ids: SAMPLE_BUYER_IDS

        } // Includes any relevant information from process, including raw response data from institution
    ];

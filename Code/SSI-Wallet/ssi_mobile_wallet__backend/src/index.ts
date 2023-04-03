import express from "express";
import { Express, Request, Response } from "express";

import dotenv from "dotenv";
import {
  TrinsicService,
  LoginRequest,
  LoginResponse,
  AccountService,
} from "@trinsic/trinsic";
const bodyParser = require("body-parser");
const app: Express = express();
app.use(bodyParser.json());

const port = 8000;
dotenv.config();

// create a Trinsic service
const trinsic = new TrinsicService();
// assign that service in account
trinsic.setAuthToken(process.env.AUTHTOKEN || "");

/**
 * Create a wallet with out email
 *
 * @route /createWalletWithOutEmail
 * @group Group name or category
 * @param {Type} parameter_name Description of parameter
 * @returns {Type} Description of response
 * @throws {Type} Description of error
 */
app.get("/createWalletWithOutEmail", async (req: Request, res: Response) => {
  try {

    // create a wallet in the VOMSMobileWallet ecosystem
    const value = await trinsic.account().loginAnonymous("vomsmobilewallet");

    const info = await trinsic.account().info();
    res.send(info);
  } catch (e) {
    console.error(e);
    return "ERROR" + e;
  }
});

app.post("/createWalletWithEmail", async (req: Request, res: Response) => {
  try {
    // create a Trinsic service
    const trinsic = new TrinsicService();

    // assign that service in account
    trinsic.setAuthToken(process.env.AUTHTOKEN || "");

    //   let insertItemResponse = await trinsic.wallet().insertItem(
    //     InsertItemRequest.fromPartial({
    //         itemJson: issueResponse.signedDocumentJson,
    //     })
    // );
  } catch (e) {
    console.error(e);
    console.log(process.env.AUTHTOKEN);
    return "ERROR" + e;
  }
});

app.get("/default", (req: Request, res: Response) => {
  res.send("Hello World !!");
});

// start the server
app.listen(port, () => {
  console.log(`⚡️[server]: is Server running at https://localhost:${port}`);
});

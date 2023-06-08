import express from "express";
import { Express, Request, Response } from "express";
import "dotenv/config";
import {
  TrinsicService,
  LoginRequest,
  LoginResponse,
  AccountService,
} from "@trinsic/trinsic";
const bodyParser = require("body-parser");

const app: Express = express();
app.use(bodyParser.json());
const port = 3000;

/**
 * @description create a wallet with out email
 * @param req auth token
 */
app.get("/createWalletWithOutEmail", async (req: Request, res: Response) => {
  try {
    // create a Trinsic service
    const trinsic = new TrinsicService();
    // assign that service in account
    trinsic.setAuthToken(process.env.AUTHTOKEN || "");
    // take the information related to the account
    const accountInfo = await trinsic.account().info();
    // create a wallet in the VOMSMobileWallet ecosystem
    const value = await trinsic.account().loginAnonymous("vomsmobilewallet");
    res.status(200).send('Wallet Created Successfully');
  } catch (e) {
    console.error(e);
    return "ERROR" + e;
  }
});


app.post("/insertACredential", async (req: Request, res: Response) => {
    try {
        // create a Trinsic service
        const trinsic = new TrinsicService();
        // inserting a credential to wallet
        // let insertItemResponse = await trinsic.wallet().insertItem(
        //     InsertItemRequest.fromPartial({
        //         itemJson: issueResponse.documentJson,
        //     })
        // );
        } catch (e) {
        console.error(e);
        return "ERROR" + e;
    }
});

app.get("/", async (req: Request, res: Response) => {
    res.send("Hello World !");
});

// start the server
app.listen(port, () => {
  console.log(`⚡️[server]: is Server running at https://localhost:${port}`);
});
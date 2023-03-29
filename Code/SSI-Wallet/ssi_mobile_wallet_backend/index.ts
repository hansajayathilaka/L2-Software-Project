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
const port = 8000;

app.get("/createWalletWithOutEmail", async (req: Request, res: Response) => {
  try {
    // create a Trinsic service
    const trinsic = new TrinsicService();
    // assign that service in account
    trinsic.setAuthToken(process.env.AUTHTOKEN || "");
    console.log(process.env.AUTHTOKEN);

    // take the information related to the account
    const accountInfo = await trinsic.account().info();
    console.log(accountInfo);

    // create a wallet in the VOMSMobileWallet ecosystem
    const value = await trinsic.account().loginAnonymous();
    res.send("is working");
  } catch (e) {
    console.error(e);
    console.log("Not working this part");
    return "ERROR" + e;
  }
});

// start the server
app.listen(port, () => {
  console.log(`⚡️[server]: is Server running at https://localhost:${port}`);
});

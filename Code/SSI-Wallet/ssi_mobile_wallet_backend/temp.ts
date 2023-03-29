// let loginResponse: LoginResponse; // login response

// create a wallet (account)
// async function createWallet(accountEmail: string) {
//   try {
//     // assign that service in account
//     trinsic.setAuthToken(process.env.AUTHTOKEN || "");

//     // take the information related to the account
//     const accountInfo = await trinsic.account().info();

//     // create a wallet in the VOMSMobileWallet ecosystem
//     loginResponse = await trinsic.account().login(
//       LoginRequest.fromPartial({
//         ecosystemId: accountInfo.ecosystemId,
//         email: accountEmail,
//       })
//     );

//     console.log(loginResponse);

//     return loginResponse;
//   } catch (e) {
//     console.error(e);
//     console.log("Not working this part");
//     return "ERROR" + e;
//   }
// }

// confirm account
// async function ConfirmWallet(
//   loginResponse: LoginResponse,
//   LoginconfirmationCode: Uint8Array
// ) {
//   try {
//     console.log(loginResponse);
//     const authToken = await trinsic
//       .account()
//       .loginConfirm(loginResponse.challenge, LoginconfirmationCode);
//     return authToken;
//   } catch (e) {
//     console.log(e);
//     console.log("Not working");
//     return "ERROR" + e;
//   }
// }

// to create the wallet using the email
// app.post("/", async (req: Request, res: Response) => {
//   const { accountEmail } = req.body;
//   res.send(
//     `Express + TypeScript Server id=${await createWallet(
//       accountEmail
//     )} \n And account created successfully...`
//   );
// });

// confirmation post request
// app.post("/walletConf", async (req: Request, res: Response) => {
//   // const { loginResponse, loginConfermationCode } = req.body;
//   // const final = await ConfirmWallet(loginResponse, loginConfermationCode);
//   // res.send(final);
//   // res.send(loginResponse + " " + loginConfermationCode);
// });
require("dotenv").config();
const express = require("express");
const TrinsicService = require("@trinsic/trinsic");
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  const trinsicService = new TrinsicService({
    /** Trinsic API endpoint. Defaults to `prod.trinsic.cloud` */
    serverEndpoint: "prod.trinsic.cloud",
    /** Trinsic API port; defaults to `443` */
    serverPort: 443,
    /** Whether TLS is enabled between SDK and Trinsic API; defaults to `true` */
    serverUseTls: true,
    /** Authentication token for SDK calls; defaults to empty string (unauthenticated) */
    authToken: process.env.API_TOKEN,
  });
  const accountInfo = await trinsicService.account().getInfo();
  console.log(JSON.stringify(accountInfo, null, 4));
  res.send("hello world");
});

// const initializing = async () => {
//   const trinsicService = new TrinsicService({
//     /** Trinsic API endpoint. Defaults to `prod.trinsic.cloud` */
//     serverEndpoint: "prod.trinsic.cloud",
//     /** Trinsic API port; defaults to `443` */
//     serverPort: 443,
//     /** Whether TLS is enabled between SDK and Trinsic API; defaults to `true` */
//     serverUseTls: true,
//     /** Authentication token for SDK calls; defaults to empty string (unauthenticated) */
//     authToken: process.env.API_TOKEN,
//   });
//   const accountInfo = await trinsicService.account().getInfo();
//   console.log(JSON.stringify(accountInfo, null, 4));
// };

app.listen(port, () => {
  console.log(`Listens on port ${port}`);
});

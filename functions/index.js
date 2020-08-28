const creds = require("./../../goldScriptCreds/creds");
const client = require("twilio")(
  creds.twilio.accountSid,
  creds.twilio.authToken
);
const fetch = require("node-fetch");
const request = require("request");
const functions = require("firebase-functions");

console.error("before pushing function to firebase, move creds externally");

exports.scheduledFunctionCrontab = functions.pubsub
  .schedule("0 18 * * *")
  .timeZone("Asia/Kolkata")
  .onRun((context) => {
    console.log("***sending gold rate***");

    const options = {
      method: "GET",
      url: "https://www.goldapi.io/api/XAU/INR",
      headers: {
        "x-access-token": creds.goldApi.accessToken,
        "Content-Type": "application/json",
      },
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);

      console.log("goldApi response", response.body);

      const goldRatePerOunce = JSON.parse(response.body).price;

      const goldRatePerGram = goldRatePerOunce / 28.346;
      let goldRatePerTola = goldRatePerGram * 11.66;
      let goldRate10Grams = goldRatePerGram * 10;

      goldRatePerTola =
        goldRatePerTola.toLocaleString(undefined, {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        }) + ":tola";
      goldRate10Grams =
        goldRate10Grams.toLocaleString(undefined, {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        }) + ":per10Gram";

      console.log("*** goldRatePerTola: ***", goldRatePerTola);
      console.log("*** goldRate10Grams: ***", goldRate10Grams);

      // send whatsapp message
      // templates outside 24hrs:
      // Your appointment is coming up on {{1}} at {{2}}
      // Your {{1}} order of {{2}} has shipped and should be delivered on {{3}}. Details: {{4}}
      const txtMsg =
        "Your appointment is coming up on " +
        goldRatePerTola +
        " at " +
        goldRate10Grams;

      console.log("*** txtMsg: ***", txtMsg);
      client.messages
        .create({
          from: creds.whatsapp.from,
          body: txtMsg,
          to: creds.whatsapp.to1,
        })
        .then((message) => {
          console.log("*** Whatsapp msg id: ***", message.sid);
        })
        .catch((err) => console.log(err));

      client.messages
        .create({
          from: creds.whatsapp.from,
          body: txtMsg,
          to: creds.whatsapp.to2,
        })
        .then((message) => {
          console.log("*** Whatsapp msg id: ***", message.sid);
        })
        .catch((err) => console.log(err));
    });

    return null;
  });

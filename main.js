require("dotenv").config();

(require("./keepalive")());

const { Client } = require("discord.js");

const Axios = require("axios");

const Bot = new Client({ messageCacheMaxSize: 200, messageCacheLifetime: 0 });

const token = process.env.TOKEN;

process.title = " [ [ [ [ CRACKED = Fweak ] ] ] ] ";

Bot.on("ready", () => console.log(" \nNitro Redeemer Started\n "));

Bot.on("message", async msg => {
  if (
    !msg.content
      .split(" ")
      .find(
        str =>
          str.includes("discord.gift") || str.includes("discordapp.com/gifts")
      )
  )
    return;

  let code =
    msg.content
      .split("discord.gift")
      .pop()
      .substr(1, 16) ||
    msg.content
      .split("discordapp.com/gifts")
      .pop()
      .substr(0, 16);

  checkValid(code);
});

Bot.login(token);

async function checkValid(code) {
  let res = await Axios.default
    .get(
      `https://discordapp.com/api/v6/entitlements/gift-codes/${code}?with_application=true&with_subscription_plan=true`,
      {},
      {}
    )
    .catch(O_o => {});

  if (!res) return console.log(" Invalid code! ~~~ " + code);

  switch (res.status) {
    case "200":
    case "204":
    case "201":
      redeem(code);

      break;

    case "404":
      console.log(" Invalid code! ~~~ " + code);

      break;

    default:
      return console.log(" Code didnt work ! ");
  }
}

async function redeem(code) {
  let res = await Axios.default.post(
    `https://discordapp.com/api/v6/entitlements/gift-codes/${code}/redeem`,
    {},
    {
      proxy: {
        host: process.env.PHOST,
        port: process.env.PPORT
      },

      headers: {
        Authorization: token
      }
    }
  );

  switch (res.status) {
    case "200":
    case "204":
    case "201":
      console.log(" Activated the code! ~~~ " + code);
      break;

    case "404":
      console.log(" Invalid code! ~~~ " + code);
      break;

    default:
      console.log(" Code didnt work ! ");
      break;
  }
}

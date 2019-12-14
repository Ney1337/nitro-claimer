require("dotenv").config();

const http = require("http");

module.exports = () => {
  http
    .createServer((req, res) => {
      res.write("OK");
      res.end();
    })
    .listen("3000");
};

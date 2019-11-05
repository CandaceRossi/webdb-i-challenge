const express = require("express");

const AccountsRouter = require("./accounts/accountsRouter.js");
const server = express();

server.use(express.json());

server.use("/api/accounts", AccountsRouter);

server.get("/", (req, res) => {
  res.send("<h3>DB INTRO PROJECT I</h3>");
});

module.exports = server;

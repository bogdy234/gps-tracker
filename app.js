const express = require("express");
const mongoose = require("mongoose");
const positionRouter = require("./Positions/Controller");

const app = express();

function startServer() {
  app.listen(4000, () => console.log("running"));
}

const db =
  "mongodb+srv://root:root@scd-project.usnxf.mongodb.net/scd-project?retryWrites=true&w=majority";

function startDatabase() {
  mongoose.connect(db, () => console.log("connected"));
}

function initRouters() {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });
  app.use(express.json());
  app.use("/positions", positionRouter);
}

(function run() {
  startServer();
  startDatabase();
  initRouters();
})();

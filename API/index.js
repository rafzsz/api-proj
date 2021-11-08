const express = require("express");
const app = express();
const cors = require("cors");
const consign = require("consign");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("database", "username", "password", {
  dialect: "sqlite",
  storage: "C:/Users/rafae/Desktop/ADS/Projeto Integrador/BD/database.sqlite",
});

sequelize.sync({ force: true });

app.use(cors());
app.use(express.json());
app.set("sequelize", sequelize);

consign().include("models").then("controllers").into(app);

app.get("/", function (req, res) {
  res.redirect("/login");
});

app.listen(3000);

const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const consign = require("consign");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("database", "postgres", "password", {
  dialect: "postgres",
});

sequelize.sync({ force: false });

app.use(cors());
app.set("sequelize", sequelize);
app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ limit: "1000mb" }));
app.use(bodyParser({ limit: "1000MB" }));

consign().include("models").then("controllers").into(app);

app.get("/", function (req, res) {
  res.redirect("/login");
});

app.listen(3000);

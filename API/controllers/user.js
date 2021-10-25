const crypto = require("crypto");
var jwt = require("jsonwebtoken");
const auth = require("../middlewares/authMiddleware");

module.exports = function (app) {
  const UserModel = app.models.user;

  app.get("/user/:id?", auth, async function (req, res) {
    const id = parseInt(req.params.id) || false;
    if (!id) {
      const users = await UserModel.findAll();
      res.json(users);
    } else {
      const user = await UserModel.findByPk(id);
      res.json(user);
    }
  });

  app.post("/user", async function (req, res) {
    const hash = crypto
      .createHash("sha256")
      .update(req.body.password)
      .digest("hex");
    req.body.password = hash;
    const user = await UserModel.create(req.body);
    res.json(user);
  });

  app.put("/user/:id", auth, async function (req, res) {
    const crypto = require("crypto");
    const id = parseInt(req.params.id);
    const user = await UserModel.findByPk(id);
    const hash = crypto
      .createHash("sha256")
      .update(req.body.password)
      .digest("hex");
    user.name = req.body.name;
    user.mail = req.body.mail;
    user.password = hash;
    user.adress = req.body.adress;
    user.number = req.body.number;
    user.state = req.body.state;
    user.zip = req.body.zip;
    user.phone = req.body.phone;
    user.birthDate = req.body.birthDate;
    user.cpf = req.body.cpf;
    await user.save();
    res.json(user);
  });

  app.delete("/user/:id", auth, async function (req, res) {
    const id = parseInt(req.params.id);
    const user = await UserModel.findByPk(id);
    await user.destroy();
    res.json({ status: "success" });
  });

  app.post("/login", async function (req, res) {
    const user = await UserModel.findOne({
      where: { mail: req.body.mail },
    });
    const hash = crypto
      .createHash("sha256")
      .update(req.body.password)
      .digest("hex");
    if (user.password === hash) {
      const token = jwt.sign({ id: user.id }, "segredo");
      res.json({ status: "success", token });
      res.status(200);
    } else {
      res.json({ status: "Não autenticado" });
      res.status(401);
    }
  });
};

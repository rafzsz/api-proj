const crypto = require("crypto");
var jwt = require("jsonwebtoken");
const auth = require("../middlewares/authMiddleware");

module.exports = function (app) {
  const AdmModel = app.models.adm;

  app.get("/adm/:id?", auth, async function (req, res) {
    const id = parseInt(req.params.id) || false;
    if (!id) {
      const adms = await AdmModel.findAll();
      res.json(adms);
    } else {
      const user = await AdmModel.findByPk(id);
      res.json(adm);
    }
  });

  app.post("/adm", async function (req, res) {
    const hash = crypto
      .createHash("sha256")
      .update(req.body.password)
      .digest("hex");
    req.body.password = hash;
    const adm = await AdmModel.create(req.body);
    res.json(adm);
  });

  app.put("/adm/:id", auth, async function (req, res) {
    const crypto = require("crypto");
    const id = parseInt(req.params.id);
    const adm = await AdmModel.findByPk(id);
    const hash = crypto
      .createHash("sha256")
      .update(req.body.password)
      .digest("hex");
    adm.name = req.body.name;
    adm.mail = req.body.mail;
    adm.password = hash;
    adm.adress = req.body.adress;
    adm.number = req.body.number;
    adm.state = req.body.state;
    adm.zip = req.body.zip;
    adm.phone = req.body.phone;
    adm.birthDate = req.body.birthDate;
    adm.cpf = req.body.cpf;
    await adm.save();
    res.json(adm);
  });

  app.delete("/adm/:id", auth, async function (req, res) {
    const id = parseInt(req.params.id);
    const adm = await AdmModel.findByPk(id);
    await adm.destroy();
    res.json({ status: "success" });
  });

  app.post("/login", async function (req, res) {
    const user = await AdmModel.findOne({
      where: { mail: req.body.mail },
    });
    const hash = crypto
      .createHash("sha256")
      .update(req.body.password)
      .digest("hex");
    if (user.password === hash) {
      const token = jwt.sign({ id: adm.id }, "segredo");
      res.json({ status: "success", token });
      res.status(200);
    } else {
      res.json({ status: "Não autenticado" });
      res.status(401);
    }
  });
};

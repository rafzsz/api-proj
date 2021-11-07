const auth = require("../middlewares/authMiddleware");

module.exports = function (app) {
  const AdoteiModel = app.models.adotei;

  app.get("/adotei/:id?", auth, async function (req, res) {
    const id = parseInt(req.params.id) || false;
    if (!id) {
      const adoteis = await AdoteiModel.findAll();
      res.json(adoteis);
    } else {
      const adotei = await AdoteiModel.findByPk(id);
      res.json(adotei);
    }
  });

  app.post("/adotei", auth, async function (req, res) {
    const adotei = await AdoteiModel.create(req.body);
    res.json(adotei);
  });

  app.put("/adotei/:id", auth, async function (req, res) {
    const id = parseInt(req.params.id);
    const adotei = await AdoteiModel.findByPk(id);
    adotei.name = req.body.name;
    adotei.URL = req.body.URL;
    await adotei.save();
    res.json(adotei);
  });

  app.delete("/adotei/:id", auth, async function (req, res) {
    const id = parseInt(req.params.id);
    const adotei = await AdoteiModel.findByPk(id);
    await adotei.destroy();
    res.json({ status: "success" });
  });
};

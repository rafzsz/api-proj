const auth = require("../middlewares/authMiddleware");

module.exports = function (app) {
  const StrayModel = app.models.strayPet;

  app.get("/strayPet/:id?", auth, async function (req, res) {
    const id = parseInt(req.params.id) || false;
    if (!id) {
      const strays = await StrayModel.findAll();
      res.json(strays);
    } else {
      const stray = await StrayModel.findByPk(id);
      res.json(stray);
    }
  });

  app.post("/strayPet", auth, async function (req, res) {
    const stray = await StrayModel.create(req.body);
    res.json(stray);
  });

  app.put("/strayPet/:id", auth, async function (req, res) {
    const id = parseInt(req.params.id);
    const stray = await StrayModel.findByPk(id);
    stray.type = req.body.type;
    stray.location = req.body.location;
    stray.date = req.body.date;
    stray.description = req.body.description;
    await stray.save();
    res.json(stray);
  });

  app.delete("/strayPet/:id", auth, async function (req, res) {
    const id = parseInt(req.params.id);
    const stray = await StrayModel.findByPk(id);
    await stray.destroy();
    res.json({ status: "success" });
  });
};

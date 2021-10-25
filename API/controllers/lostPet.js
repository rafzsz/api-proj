const auth = require("../middlewares/authMiddleware");

module.exports = function (app) {
  const LostModel = app.models.lostPet;

  app.get("/lostPet/:id?", auth, async function (req, res) {
    const id = parseInt(req.params.id) || false;
    if (!id) {
      const losts = await LostModel.findAll();
      res.json(losts);
    } else {
      const lost = await LostModel.findByPk(id);
      res.json(lost);
    }
  });

  app.post("/lostPet", auth, async function (req, res) {
    const lost = await LostModel.create(req.body);
    res.json(lost);
  });

  app.put("/lostPet/:id", auth, async function (req, res) {
    const id = parseInt(req.params.id);
    const lost = await LostModel.findByPk(id);
    lost.name = req.body.name;
    lost.type = req.body.type;
    lost.date = req.body.date;
    lost.breed = req.body.breed;
    lost.description = req.body.description;
    lost.lastSee = req.body.lastSee;
    await lost.save();
    res.json(lost);
  });

  app.delete("/lostPet/:id", auth, async function (req, res) {
    const id = parseInt(req.params.id);
    const lost = await LostModel.findByPk(id);
    await lost.destroy();
    res.json({ status: "success" });
  });
};

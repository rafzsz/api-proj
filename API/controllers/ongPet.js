const auth = require("../middlewares/authMiddleware");

module.exports = function (app) {
  const PartnerModel = app.models.ongPet;

  app.get("/ongPet/:id?", auth, async function (req, res) {
    const id = parseInt(req.params.id) || false;
    if (!id) {
      const partners = await PartnerModel.findAll();
      res.json(partners);
    } else {
      const partner = await PartnerModel.findByPk(id);
      res.json(partner);
    }
  });

  app.post("/ongPet", auth, async function (req, res) {
    const partner = await PartnerModel.create(req.body);
    res.json(partner);
  });

  app.put("/ongPet/:id", auth, async function (req, res) {
    const id = parseInt(req.params.id);
    const partner = await PartnerModel.findByPk(id);
    partner.name = req.body.name;
    partner.location = req.body.location;
    partner.information = req.body.information;
    await partner.save();
    res.json(partner);
  });

  app.delete("/lostPet/:id", auth, async function (req, res) {
    const id = parseInt(req.params.id);
    const partner = await Partner.findByPk(id);
    await partner.destroy();
    res.json({ status: "success" });
  });
};

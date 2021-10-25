const auth = require("../middlewares/authMiddleware");

module.exports = function (app) {
  const ComplaintModel = app.models.complaints;

  app.get("/complaints/:id?", auth, async function (req, res) {
    const id = parseInt(req.params.id) || false;
    if (!id) {
      const complaints = await ComplaintModel.findAll();
      res.json(complaints);
    } else {
      const coment = await ComplaintModel.findByPk(id);
      res.json(complaint);
    }
  });

  app.post("/complaints", auth, async function (req, res) {
    const complaint = await ComplaintModel.create(req.body);
    res.json(complaint);
  });

  app.put("/complaints/:id", auth, async function (req, res) {
    const id = parseInt(req.params.id);
    const complaint = await ComplaintModel.findByPk(id);
    complaint.user = req.body.user;
    complaint.coment = req.body.coment;
    await complaint.save();
    res.json(complaint);
  });

  app.delete("/complaints/:id", auth, async function (req, res) {
    const id = parseInt(req.params.id);
    const complaint = await ComplaintModel.findByPk(id);
    await complaint.destroy();
    res.json({ status: "success" });
  });
};

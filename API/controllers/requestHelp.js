const auth = require("../middlewares/authMiddleware");

module.exports = function (app) {
  const RequestModel = app.models.requestHelp;

  app.get("/requestHelp/:id?", auth, async function (req, res) {
    const id = parseInt(req.params.id) || false;
    if (!id) {
      const requests = await RequestModel.findAll();
      res.json(requests);
    } else {
      const request = await RequestModel.findByPk(id);
      res.json(request);
    }
  });

  app.post("/requestHelp", auth, async function (req, res) {
    const request = await RequestModel.create(req.body);
    res.json(request);
  });

  app.put("/requestHelp/:id", auth, async function (req, res) {
    const id = parseInt(req.params.id);
    const request = await RequestModel.findByPk(id);
    request.user = req.body.user;
    request.title = req.body.title;
    request.description = req.body.description;
    request.approved = req.body.approved;
    await request.save();
    res.json(request);
  });

  app.delete("/requestHelp/:id", auth, async function (req, res) {
    const id = parseInt(req.params.id);
    const request = await RequestModel.findByPk(id);
    await request.destroy();
    res.json({ status: "success" });
  });
};

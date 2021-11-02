const auth = require("../middlewares/authMiddleware");

module.exports = function (app) {
  const PhotoMural = app.models.photoMural;

  app.get("/photoMural/:id?", auth, async function (req, res) {
    const id = parseInt(req.params.id) || false;
    if (!id) {
      const photos = await PhotoMural.findAll();
      res.json(photos);
    } else {
      const photo = await PhotoMural.findByPk(id);
      res.json(photo);
    }
  });

  app.post("/photoMural", auth, async function (req, res) {
    const photo = await PhotoMural.create(req.body);
    res.json(photo);
  });

  app.put("/photoMural/:id", auth, async function (req, res) {
    const id = parseInt(req.params.id);
    const photo = await PhotoMural.findByPk(id);
    photo.user = req.body.user;
    photo.url = req.body.url;
    photo.description = req.body.description;
    await photo.save();
    res.json(photo);
  });

  app.delete("/photoMural/:id", auth, async function (req, res) {
    const id = parseInt(req.params.id);
    const photo = await PhotoMural.findByPk(id);
    await photo.destroy();
    res.json({ status: "success" });
  });
};

var jwt = require("jsonwebtoken");
// const user = require("../controllers/user");

module.exports = async function auth(req, res, next) {
  try {
    var splitedToken =
      req.headers.authorization.split(" ")[1] || req.headers.authorization;
    var tk = jwt.verify(splitedToken, "segredo");
    // var user = await UserModel.findByPk(tk.id);
    res.locals.user = tk.id;
    next();
  } catch {
    res.json({ status: "Erro de token" });
    res.status(401);
  }
};

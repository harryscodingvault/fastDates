const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(404).send({ mesg: "Invalid Auth!" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.id };
    next();
  } catch (err) {
    return res.status(404).send({ msg: "Invalid Auth!" });
  }
};

module.exports = auth;

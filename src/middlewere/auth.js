const jwt = require("jsonwebtoken");
const response = require("../services/response.service");
const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return response.notFound(res, "Яроқсиз токен");
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(
      token,
      process.env.SECRET_KEY || "5555",
      function (err, decoded) {
        if (err) return response.error(res, "Ноқонуний");
        req.userId = decoded.id;
        next();
      }
    );
  } catch (error) {
    return response.internal(res, undefined, error.message);
  }
};

module.exports = {
  auth,
};

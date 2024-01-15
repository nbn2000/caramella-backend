const tokenService = require("../services/token.service");

const auth = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ").pop() || null;
    if (!token) {
      res.status(401).json({
        message: "Unauthorized",
        variant: "error",
      });
    } else {
      const decodedToken = await tokenService.verifyToken(token);
      req.headers.user = decodedToken;
      next();
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Invalid token",
      error: err,
    });
  }
};

module.exports = auth;

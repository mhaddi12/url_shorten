const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        msg: "Token is required",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        msg: "Token is invalid",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Something went wrong",
    });
  }
};

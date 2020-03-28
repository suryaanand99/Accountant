const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      throw new Error("Unauthorized access");
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!payload.id) {
      throw new Error("Unauthorized access");
    }
    // We are only finding the user by the id alone.
    const user = await User.findOne({ _id: payload.id, accessToken: token });
    if (!user) {
      throw new Error("Unauthorized access");
    }
    req.user = user;
    next();
  } catch (err) {
    if (
      err.message === "Unauthorized access" ||
      err.message === "invalid token" ||
      err.message === "token expired" ||
      err.message === "jwt malformed"
    )
      return res
        .status(401)
        .json({ statusCode: 401, message: "Unauthorized access" });
    res.status(500).json({ statusCode: 500, message: "Server Error" });
  }
};

module.exports = authenticate;

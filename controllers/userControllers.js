const User = require("../models/User");

module.exports = {
  registerUser: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ statusCode: 400, message: "User already exists" });
      }
      user = await User.create({ name, email, password });
      // Token creation
      const accessToken = await user.generateToken();
      // Sending the response.
      res
        .status(201)
        .json({ statusCode: 201, user, accessToken, expiresIn: "3 days" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ statusCode: 500, message: "Server Error" });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findByEmailAndPassword(email, password);
      const token = await user.generateToken();
      res
        .status(200)
        .json({
          statusCode: 200,
          user,
          accessToken: token,
          expiresIn: "3 days"
        });
    } catch (err) {
      console.log(err.message);
      if (err.message == "Unauthorized access")
        return res
          .status(401)
          .json({ statusCode: 401, message: "Unauthorized access" });
      res.status(500).json({ statusCode: 500, message: "Server Error" });
    }
  }
};

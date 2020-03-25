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
  }
};

const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    accessToken: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

userSchema.methods = {
  generateToken: async function() {
    try {
      const user = this;
      const accessToken = await jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "3 days" }
      );
      user.accessToken = accessToken;
      await user.save();
      return accessToken;
    } catch (err) {
      throw err;
    }
  },

  toJSON: function() {
    const user = this.toObject();
    delete user.password;
    delete user.accessToken;
    delete user.__v;
    return user;
  }
};

//custom named modern methods for database queries
userSchema.statics = {
  findByEmailAndPassword: async function(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Unauthorized access");
      }

      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Unauthorized access");
      }
      return user;
    } catch (err) {
      throw err;
    }
  }
};

userSchema.pre("save", async function(next) {
  const user = this;
  try {
    if (user.isModified("password")) {
      const hashedPassword = await bcryptjs.hash(user.password, 10);
      user.password = hashedPassword;
    }
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

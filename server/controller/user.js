const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signup = async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.body.email });
    if (userData == null) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
      await new User(req.body).save();
      res.status(201).json({ message: "User created" });
    } else {
      return res.status(409).json({ message: "Mail exists" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.login = async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.body.email });
    if (userData != null) {
      const result = await bcrypt.compare(req.body.password, userData.password);
      if (result) {
        const token = jwt.sign(
          {
            email: userData.email,
            ID: userData._id,
          },
          "affworld"
        );
        return res.status(200).json({
          ID: userData._id,
          Email: userData.email,
          token: token,
          message: "Auth Successful",
        });
      } else {
        return res.status(404).json({ message: "Password is wrong" });
      }
    } else {
      return res.status(404).json({ message: "Mail not exists" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.user = async (req, res) => {
  try {
    const userData = await User.find();
    res.status(201).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

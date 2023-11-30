const users = require("../Models/userSchema");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  console.log("inside register", req.body);
  const { username, email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email: email });
    if (existingUser) {
      return res.status(406).json("User already exists");
    } else {
      const newUser = new users({
        username,
        email,
        password,
        isAuthor: false,
        isAdmin: false,
        profilePic: "",
      });
      await newUser.save();
      return res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(401).json("Error creating user", error);
  }
};

exports.login = async (req, res) => {
  console.log("inside login", req.body);
  const { email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email, password });
    if (existingUser) {
      const token = jwt.sign({ userId: existingUser._id }, "blog123");
      res.status(200).json({
        existingUser,
        token,
      });
    } else {
      return res.status(404).json("Invalid credentials");
    }
  } catch (error) {
    res.status(401).json("Error creating user", error);
  }
};

const users = require("../Models/userSchema");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  console.log("inside register", req.body);
  const { username, email, password ,created_at} = req.body;
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
        authorRequest: false,
        isAdmin: false,
        profilePic: "",
        created_at
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

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    res.status(401).json("Error getting users", error);
  }
};

exports.getUserByid = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await users.findById({ _id: id });
    return res.status(200).json(user);
  } catch (error) {
    res.status(401).json(error);
    console.log("error getting User backend");
  }
};

exports.setAuthor = async (req, res) => {

  
    const { isAuthor ,id} = req.body;
    
    try {
      const user = await users.findByIdAndUpdate(
        {_id:id},
        { $set: { isAuthor } }, // Use $set to update only the specified field
        { new: true }
      );
    
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    
};


exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      // Check if user exists before attempting to delete
      const userToDelete = await users.findById(id);
  
      if (!userToDelete) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Delete the user
      const deletedUser = await users.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return res.status(500).json({ error: 'Error deleting user' });
      }
  
      res.status(200).json(deletedUser);
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
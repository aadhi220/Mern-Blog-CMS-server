const users = require("../Models/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const nodemailer = require("nodemailer");
const mailgen = require("mailgen");
const bcrypt =require("bcrypt");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const mailGenerator = new mailgen({
  theme: "cerberus", // Use the 'cerberus' theme for a clean and modern look
  product: {
    name: "RateLab",
    link: process.env.SITE_URL,
    // Add other product details as needed
  },
});


exports.register = async (req, res) => {
  console.log('inside register', req.body);
  const { username, email, password, created_at } = req.body;

  try {
    const existingUser = await users.findOne({ email: email });

    if (existingUser) {
      return res.status(406).json('User already exists');
    } else {
      // Hash the password before saving to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new users({
        username,
        email,
        password: hashedPassword,
        isAuthor: false,
        authorRequest: false,
        isAdmin: false,
        profilePic: '',
        created_at: created_at,
        job: '',
      });

      await newUser.save();

      return res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(401).json('Error creating user');
  }
};

exports.login = async (req, res) => {
  console.log('inside login', req.body);
  const { email, password } = req.body;

  try {
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);

      if (isPasswordValid) {
        const token = jwt.sign({ userId: existingUser._id }, 'blog123');
        res.status(200).json({
          existingUser,
          token,
        });
      } else {
        return res.status(404).json('Invalid credentials');
      }
    } else {
      return res.status(404).json('Invalid credentials');
    }
  } catch (error) {
    res.status(401).json('Error creating user', error);
  }
};

exports.setAuthor = async (req, res) => {
  const { isAuthor, id, username, email } = req.body;

  try {
    const user = await users.findByIdAndUpdate(
      { _id: id },
      { $set: { isAuthor } },
      { new: true }
    );

    const introMessage = isAuthor
      ? `Congratulations! You are now part of the RateLab author community. Share your thoughts and insights with our readers! <br/><br/><div style="text-align: center;"><a href="${process.env.DASHBOARD_URL}" style="display: inline-block; padding: 15px 25px; font-size: 18px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 5px;">Go to Dashboard</a></div>`
      : "Your author status on RateLab has been revoked. If you have any concerns, please contact the admin.";

    const outroMessage = `Explore more on RateLab: ${process.env.SITE_URL}`;

    const emailBody = {
      body: {
        name: username,
        intro: introMessage,
        outro: outroMessage,
        // Add other email content as needed
      },
    };

    const emailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Author Status Update on RateLab",
      html: mailGenerator.generate(emailBody),
    };

    // Use async/await and wrap in a try-catch block for nodemailer operations
    try {
      await transporter.sendMail(emailOptions);
      console.log("Email sent successfully.");
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      throw new Error("Email sending failed");
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


exports.getAllUsers = async (req, res) => {
  const { temp } = req.params;

  const query = {
    authorRequest: true,
  };
  console.log("temp", temp);

  if (temp === "author") {
    try {
      const allUsers = await users.find(query);
      return res.status(200).json(allUsers);
    } catch (error) {
      console.error("Error getting users:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    try {
      const allUsers = await users.find();
      return res.status(200).json(allUsers);
    } catch (error) {
      console.error("Error getting users:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
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

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if user exists before attempting to delete
    const userToDelete = await users.findById(id);

    if (!userToDelete) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete the user
    const deletedUser = await users.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(500).json({ error: "Error deleting user" });
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.setAuthorReq = async (req, res) => {
  try {
    const { username, job, email, authorRequest } = req.body;
    const images = req.files.map((file) => file.filename);
    const userId = req.payload;
    console.log("images", images);

    const user = await users.findByIdAndUpdate(
      { _id: userId },
      {
        $set: {
          isAuthor: false,
          username: username,
          job: job,
          email: email,
          authorRequest: authorRequest,
          profilePic: images[0],
        },
      },
      { new: true }
    );

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const users = require("../Models/SubscribeSchema");
const userDb = require('../Models/userSchema')
require("dotenv").config();
const nodemailer = require("nodemailer");
const mailgen = require("mailgen");

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



exports.addEmail = async (req, res) => {
  console.log("inside addEmail", req.body);
  const { email, created_at, author, userId } = req.body;

  try {
  
  
      const subscriber = await userDb.findById({ _id: userId });

      if (subscriber) {

        if (subscriber.subscribed.includes(author)) {
          return res.status(400).json("already subscribed");
        }
        try {
          // Update the 'subscribed' field by adding the 'author'>
          subscriber.subscribed.push(author);

          // Save the updated document
          await subscriber.save();

          const newEmail = new users({
            email: email,
            created_at: created_at,
            author: author,
          });

          await newEmail.save();

          return res.status(200).json("Email added successfully");
        } catch (error) {
          // Pass 'res' as an argument to the error response
          console.log(error.message);
          return res
            .status(500)
            .json({ error: "Error adding subscriber", details: error.message });
        }
      }
  
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error adding email", details: error.message });
  }
};

exports.sendMail = async (req, res) => {
  const { title, username } = req.body;
  let subscribers = [];

  try {
    // Get subscribers for the specific author
    subscribers = await users.find({ author: username }, 'email');

    // If no subscribers found for the specific author, get subscribers for "all"
    if (!subscribers || subscribers.length === 0) {
      subscribers = await users.find({ author: "all" }, 'email');
    }

    // Extract emails from subscribers
    const emails = subscribers.map(subscriber => subscriber.email);

      const introMessage = `${username} has added a new blog - ${title} <br/><br/><div style="text-align: center;"><a href="${process.env.SITE_URL}" style="display: inline-block; padding: 15px 25px; font-size: 18px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 5px;">Go to Ratelab.com</a></div>`;
  
      const outroMessage = `Explore more on RateLab: ${process.env.SITE_URL}`;
  
      const emailBody = {
        body: {
          name:"",
          intro: introMessage,
          outro: outroMessage,
          // Add other email content as needed
        },
      };
  
      const emailOptions = {
        from: process.env.EMAIL_USER,
        to: emails.join(","),
        subject: "RateLab newsletter",
        html: mailGenerator.generate(emailBody),
      };
  
      // Use async/await and wrap in a try-catch block for nodemailer operations
      try {
        await transporter.sendMail(emailOptions);
        console.log("Email sent successfully.");
        return res.status(200).json({ message: "Email sent successfully" });
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        throw new Error("Email sending failed");
      }
    } catch (error) {
      console.error("Error retrieving subscribers:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  


  // exports.sendForgotMail = async (req, res) => {
  //   const  email  = req.body;
  // let client = ""
  
  //   try {
  
  //     client = await users.find({ email: email });
  

  //     if (!client) {
           
  //     }

  //       const introMessage = `Hai ${client.username}<br/><br/><p> ${client.password} is your current password . pleace update your password after login </p> <div style="text-align: center;"><a href="${process.env.SITE_URL}" style="display: inline-block; padding: 15px 25px; font-size: 18px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 5px;">Go to Ratelab.com</a></div>`;
    
  //       const outroMessage = `Explore more on RateLab: ${process.env.SITE_URL}`;
    
  //       const emailBody = {
  //         body: {
  //           name:"",
  //           intro: introMessage,
  //           outro: outroMessage,
  //           // Add other email content as needed
  //         },
  //       };
    
  //       const emailOptions = {
  //         from: process.env.EMAIL_USER,
  //         to: emails.join(","),
  //         subject: "RateLab newsletter",
  //         html: mailGenerator.generate(emailBody),
  //       };
    
  //       // Use async/await and wrap in a try-catch block for nodemailer operations
  //       try {
  //         await transporter.sendMail(emailOptions);
  //         console.log("Email sent successfully.");
  //         return res.status(200).json({ message: "Email sent successfully" });
  //       } catch (emailError) {
  //         console.error("Error sending email:", emailError);
  //         throw new Error("Email sending failed");
  //       }
  //     } catch (error) {
  //       console.error("Error retrieving subscribers:", error);
  //       return res.status(500).json({ error: "Internal server error" });
  //     }
  //   };
  


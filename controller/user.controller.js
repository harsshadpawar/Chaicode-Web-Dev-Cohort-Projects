import User from "../model/User.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body; // get data
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  } //validate

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    } // check if user already exists

    const user = await User.create({
      name,
      email,
      password,
    });
    console.log(user);

    if (!user) {
      return res.status(400).json({
        message: "User not registered",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    console.log(token);
    user.verificationToken = token; //create a verification token

    await user.save(); // create a user in database

    //send email
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });
    console.log("BASE_URL:", process.env.BASE_URL);
    const mailOption = {
      from: process.env.MAILTRAP_SENDEREMAIL,
      to: user.email,
      subject: "Verify your email", // Subject line
      text: `Please click on the following link: 
      ${process.env.BASE_URL}/api/v1/users/verify/${token}`,
    };

    await transporter.sendMail(mailOption); // send token as email to user

    res.status(201).json({
      message: "User registered successfully",
      success: true,
    }); // send success status to user
  } catch (error) {
    res.status(400).json({
      message: "User not registered ",
      error,
      success: false,
    }); // send failure status to user
  }
};

//Verify API call to verify the token.
const verifyUser = async (req, res) => {
  //return response

  const { token } = req.params; //get token from url
  console.log(token);
  if (!token) {
    return res.status(400).json({
      message: "Invalid token",
    });
  }
  const user = await User.findOne({ verificationToken: token }); //get token from DB and // validate token

  if (!user) {
    return res.status(400).json({
      message: "Invalid token",
    });
  }
  user.isVerified = true; // set isVerified field to true
  user.verificationToken = undefined; // remove verification token
  await user.save(); // save

  try {
    res.status(200).json({
      message: "User verified successfully",
      success: true,
    }); // send success status to user
  } catch (error) {
    res.status(400).json({
      message: "token is not valid ",
      error,
      success: false,
    }); // send failure status to user
  }
};

//login API call to verify the token.
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password); // compare password

    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isVerified = user.isVerified;
    console.log("User verification status:", isVerified);

    if (!isVerified) {
      return res.status(400).json({
        message: "Please verify your email",
      });
    }

    //Authentication using stateless login using JSON web Token

    const token = jwt.sign(
      { id: user._id, role: user.role },

      "shhhhh",
      {
        expiresIn: "24h",
      }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    };

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "Unsucessful Login! ",
      error,
      success: false,
    });
  }
};

export { registerUser, verifyUser, login };

import { JWT_SECRET } from "../config/config.js";
import User from "../model/User.js";
import jwt from "jsonwebtoken";

export const registerAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const isUserExists = await User.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: email.toLowerCase() },
      ],
    });

    if (isUserExists) {
      return res.status(400).json({
        success: false,
        message: "username or email already exists",
      });
    }

    const userInfo = new User({
      username: username,
      email: email,
      password: password,
    });

    await userInfo.save();
    res.status(201).json({
      success: true,
      message: "Account created successfully",
      userInfo,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "email does not exists",
      });
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "incorrect password",
      });
    }

    const expiresIn = 7 * 24 * 60 * 60; // 7days

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: expiresIn * 1000,
    });

    res.status(200).json({
      success: true,
      message: "login success",
      user,
      expiresIn,
    });
  } catch (error) {
    console.log("Error at login: ", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

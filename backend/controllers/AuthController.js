import UserModel from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create User
export const CreateAUser = async (req, res) => {
  try {
    const { name, email, address, phoneNo, gender } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(200).json({ sucess: false, message: "User Exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const HashPass = await bcrypt.hash(req.body.password, salt);
    const password = HashPass;

    // Save a user
    await UserModel.create({ name, email, password, address, phoneNo, gender });
    res.status(200).json({ sucess: true, message: "User Created" });
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

// Login User
export const LoginAUser = async (req, res) => {
  try {
    const email = req.body.email;

    // Checking if User Exists
    const User = await UserModel.findOne({ email });
    if (!User) {
      return res.status(404).json({ sucess: false, message: "User Not found" });
    }

    // Checking the password
    const ComPass = await bcrypt.compare(req.body.password, User.password);
    if (!ComPass) {
      return res
        .status(404)
        .json({ sucess: false, message: "Invalid Password" });
    }

    // Sending the auth Token
    const { _id, __v, password, isAdmin, ...user } = User._doc;

    const token = jwt.sign({ id: _id, admin: isAdmin }, process.env.JWTS);

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 86400000,
        SameSite: false,
      })
      .json({ sucess: true, user, _id, isAdmin, token });
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

// Logout User
export const LogoutAUser = async (req, res) => {};

// Get User Info
export const getUserInfo = async (req, res) => {
  try {
    const userId = req.id;

    // Finding the user
    const User = await UserModel.findById(userId);

    if (!User) {
      return res.status(404).json("User Not Found");
    }

    const { __v, password, ...others } = User._doc;

    res.status(200).json({ ...others });
  } catch (error) {
    console.log(error);
  }
};

import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt, { hash } from "bcryptjs";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials!",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid Credentials!",
      });
    }
    const token = generateToken(user._id, res);
    console.log(token);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      mail: user.email,
      age: user.age,
      token,
    });
  } catch (error) {
    console.log();
    console.log("Login Error :", error);
    return res.status(500).json({
      message: "Internal Error!",
    });
  }
};
export const signup = async (req, res) => {
  const { email, name, password, age, grade, subjects, total, correct } =
    req.body;
  try {
    if (
      !email ||
      !name ||
      !password ||
      password.length < 6 ||
      !age ||
      subjects.length == 0 ||
      !total ||
      !correct
    ) {
      return res.status(400).json({
        message: "Invalid Credentials!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(salt, hashPassword);
    let type = "Slow";
    const score = (correct / total) * 100;
    if (score <= 33) {
      type = "Slow";
    } else if (score > 33 && score <= 66) {
      type = "Medium";
    } else {
      type = "Fast";
    }
    console.log(type, score);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      age,
      grade,
      subjects,
      student_type: type,
    });
    const token = generateToken(newUser._id, res);
    await newUser.save();
    return res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      profilePic: newUser.profilePic,
      token,
      age,
      grade,
      subjects,
      student_type: type,
    });
  } catch (error) {
    console.log("Signup Error :", error);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: "strict",
    });
    res.status(200).json({
      message: "Logout Successful!",
    });
  } catch (error) {
    console.log("Logout Error:", error);
    return res.status(500).json({
      message: "Internal Error!",
    });
  }
};

export const check = async (req, res) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    console.log("Error in finding AUTH USER!");
  }
};
export const updateProfile = async function (req, res) {
  try {
    const { email, name, age, grade, subjects } = req.body;
    const user = await User.find(email);
    if (!user) {
      res.status(404).json({
        message: "User not found!",
      });
    }
    if (user.email != email) {
      message: "Email cannot be Changed";
    }
    if (name) {
      user.name = name;
    }
    if (age) {
      user.age = age;
    }
    if (grade) {
      user.grade = grade;
    }
    if (subjects) {
      user.subjects = subjects;
    }
    await user.save();
    res.status(200).json({
      message: "Profile Updated!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};
export const DecideScore = async function (req, res) {
  try {
    const { total, correct, mail } = req.body;

    const user = await User.findOne({ email: mail });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const score = (correct / total) * 100;

    if (score <= 33) {
      user.student_type = "Slow";
    } else if (score > 33 && score <= 66) {
      user.student_type = "Medium";
    } else {
      user.student_type = "Fast";
    }
    console.log(user.student_type);
    // Save the updated user
    await user.save();

    return res
      .status(200)
      .json({ message: "Student type updated successfully!" });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

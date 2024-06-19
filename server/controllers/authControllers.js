import usermodel from "../models/usermodel.js";
import fs from "fs";
import mongoose from "mongoose";
import path from "path";

const getConfigFile = () => {
  try {
    const __filename = new URL(import.meta.url).pathname;
    const __dirname = path.dirname(__filename);
    return path.join(
      __dirname.replace(/^\/[a-zA-Z]:\//, "/"),
      "../config/predefinedAdminEmails.json"
    );
  } catch (err) {
    console.error("Error getting config file path:", err);
    return null;
  }
};
const loadPredefinedAdminEmails = () => {
  try {
    const configFile = getConfigFile();
    if (!configFile) {
      return [];
    }
    return JSON.parse(fs.readFileSync(configFile, "utf8"));
  } catch (err) {
    console.error("Error loading predefined admin emails:", err);
    return [];
  }
};

export const addPredefinedEmailsController = async (req, res) => {
  const { email } = req.body;

  try {
    const predefinedAdminEmails = loadPredefinedAdminEmails();

    // Add new emails
    if (!predefinedAdminEmails.includes(email)) {
      predefinedAdminEmails.push(email);
    } else {
      res.status(200).json({ success: true, message: "Email Already exists" });
    }

    const user = await usermodel.findOne({ email });

    if (user && user.userType === "User") {
      user.userType = "Admin";
      await user.save();
    }

    // Write updated emails to file
    const configFile = getConfigFile();
    fs.writeFileSync(configFile, JSON.stringify(predefinedAdminEmails));

    res.status(200).json({
      success: true,
      message: "Predefined emails updated successfully",
    });
  } catch (error) {
    console.error("Error adding predefined emails:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const removePredefinedEmailsController = async (req, res) => {
  const { email } = req.body;

  try {
    const predefinedAdminEmails = loadPredefinedAdminEmails();

    // Check if the email exists in the predefined list
    const index = predefinedAdminEmails.indexOf(email);
    if (index !== -1) {
      // Remove the email from the list
      predefinedAdminEmails.splice(index, 1);

      // Check if the email exists in the usermodel and if userType is "Admin"
      const user = await usermodel.findOne({ email });
      if (user && user.userType === "Admin") {
        user.userType = "User";
        await user.save();
      }

      // Write updated emails to file
      const configFile = getConfigFile();
      fs.writeFileSync(configFile, JSON.stringify(predefinedAdminEmails));

      res
        .status(200)
        .json({ success: true, message: "Email removed successfully" });
    } else {
      res.status(400).json({
        success: false,
        message: "Email not found in the predefined list",
      });
    }
  } catch (error) {
    console.error("Error removing predefined email:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const registerController = async (req, res, next) => {
  const { fname, lname, email, password } = req.body;

  try {
    if (!fname || !lname || !email || !password) {
      res.status(400).json({ message: "Please fill out all the fields" });
    }

    const existingUser = await usermodel.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "User Already Exists" });
    }

    const predefinedAdminEmails = loadPredefinedAdminEmails();
    const userType = predefinedAdminEmails.includes(email) ? "Admin" : "User";

    const user = await usermodel.create({
      firstName: fname,
      lastName: lname,
      email,
      password,
      userType,
    });

    const token = user.createJWT();

    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Please fill out all the fields" });
    }

    const user = await usermodel.findOne({ email }).select("+password");

    if (!user) {
      res.status(400).json({ message: "Invalid Email or Password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new Error("Invalid Email or Password");
    }

    const token = user.createJWT();

    res.status(200).json({
      success: true,
      message: "Login Successful",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await usermodel.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const user = await usermodel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.userType === "Admin" || user.userType === "Super Admin") {
      const predefinedAdminEmails = loadPredefinedAdminEmails();
      const index = predefinedAdminEmails.indexOf(user.email);

      if (index !== -1) {
        predefinedAdminEmails.splice(index, 1);
        const configFile = getConfigFile();
        fs.writeFileSync(configFile, JSON.stringify(predefinedAdminEmails));
      }
    }

    await usermodel.findByIdAndDelete(id);
    res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    return next(error);
  }
};

export const editRole = async (req, res) => {
  const { id } = req.params;
  const { userType } = req.body;

  try {
    const user = await usermodel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const predefinedAdminEmails = loadPredefinedAdminEmails();

    if (userType === "Admin" || userType === "Super Admin") {
      if (!predefinedAdminEmails.includes(user.email)) {
        predefinedAdminEmails.push(user.email);
        const configFile = getConfigFile();
        fs.writeFileSync(configFile, JSON.stringify(predefinedAdminEmails));
      }
    } else if (userType === "User") {
      const index = predefinedAdminEmails.indexOf(user.email);
      if (index !== -1) {
        predefinedAdminEmails.splice(index, 1);
        const configFile = getConfigFile();
        fs.writeFileSync(configFile, JSON.stringify(predefinedAdminEmails));
      }
    }

    user.userType = userType;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "User role updated successfully" });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

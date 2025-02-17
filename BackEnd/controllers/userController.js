const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the .env file");
}

const Register = async (req, res) => {
  try {
    if (!req.body.password) {
      return res.status(400).send({ error: "Password is required, duh!" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).send({ 
      user: {
      id: user._id,
      name: user.name,
      email: user.email
      }, 
      token 
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
const Login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(400).send("Mot de passe incorrect");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).send({ message: "Connected  yay", token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select("-password");
    if (!user) {
      return res.status(404).send({ error: "User not Found bro!" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(404).send({ error: "User Not Found" });
    }
    res.status(200).send({ message: "User Deleted Bye, see ya never!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getUserByToken = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found or inactive" });
    }

    res.status(200).json({ 
      user: {
      id: user._id,
      name: user.name,
      email: user.email,
      // Add other fields you want to return here, excluding the password
      }
    });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Invalid Token yo!", error: error.message });
  }
};

module.exports = { Register, Login, updateUser, deleteUser, getUserByToken };

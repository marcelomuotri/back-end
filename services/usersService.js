// userService.js

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const createUser = async (name, email, password, role) => {
  const user = new User({ name, email, password, role });
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  await user.save();

  const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET, {
    expiresIn: "4h",
  });

  return { user, token };
};

const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  const validPassword = bcryptjs.compareSync(password, user.password);
  if (!validPassword) {
    throw new Error("Contraseña incorrecta");
  }

  const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET, {
    expiresIn: "4h",
  });

  return { user, token };
};

module.exports = {
  createUser,
  authenticateUser,
};

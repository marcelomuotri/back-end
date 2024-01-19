const { response } = require("express");

const bcryptjs = require("bcryptjs"); //este es para las contraseñas

// Controlador para el registro de usuarios
const User = require("../models/user"); // Asegúrate de que la ruta sea correcta
const jwt = require("jsonwebtoken");

const userPost = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const user = new User({ name, email, password, role });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar en la base de datos
    await user.save();

    // Generar el token JWT
    const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET, {
      expiresIn: "4h", // o el tiempo que consideres adecuado
    });

    res.json({
      user: user.toJSON(), // Aprovechamos el método toJSON que ya excluye la contraseña y la versión
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "el usuario no se pudo crear",
      error,
    });
  }
};

// Controlador para iniciar sesión de un usuario
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el correo existe en la base de datos
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Usuario incorrecto",
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Contraseña incorrecta",
      });
    }

    // Generar el token JWT
    const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET, {
      expiresIn: "4h", // o el tiempo que consideres adecuado
    });

    res.json({
      user: user.toJSON(), // Aprovechamos el método toJSON que ya excluye la contraseña y la versión
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Inicio se sesion incorrecto",
    });
  }
};

module.exports = {
  userPost,
  userLogin,
};

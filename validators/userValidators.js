// validators/userValidators.js

const { check } = require("express-validator");
const { emailExist, isRoleValid } = require("../helpers/db-validators");

const registerValidators = [
  check("name", "el nombre no puede estar vacio").not().isEmpty(),
  check("password", "El password debe ser de más de 6 letras").isLength({
    min: 6,
  }),
  check("email", "el correo ingresado no es válido").isEmail(),
  check("email").custom(emailExist),
  // check("role").custom(isRoleValid) // Descomenta si necesitas verificar el rol al registrarse
];

const loginValidators = [
  check("email", "El formato del correo es incorrecto").isEmail(),
  check("password", "El password no puede estar vacío").not().isEmpty(),
];

module.exports = {
  registerValidators,
  loginValidators,
};

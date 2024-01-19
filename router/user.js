const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  isRoleValid,
  emailExist,
  idExist,
} = require("../helpers/db-validators");
const { userLogin, userPost } = require("../controllers/users");

const router = Router();

router.post(
  "/register",
  [
    check("name", "el nombre no puede estar vacio").not().isEmpty(),
    check("password", "El password debe ser de más de 6 letras").isLength({
      min: 6,
    }),
    check("email", "el correo ingresado no es válido").isEmail(),
    check("email").custom(emailExist),
    //check("role").custom(isRoleValid), // Asumiendo que quieres verificar roles en el registro
    validarCampos,
  ],
  userPost
);

// Ruta de Inicio de Sesión
router.post(
  "/login",
  [
    check("email", "El formato del correo es incorrecto").isEmail(),
    check("password", "El password no puede estar vacío").not().isEmpty(),
    validarCampos,
  ],
  userLogin
);

module.exports = router;

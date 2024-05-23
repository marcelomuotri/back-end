const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  isRoleValid,
  emailExist,
  idExist,
} = require("../helpers/db-validators");
const { userLogin, userPost } = require("../controllers/users");
const {
  registerValidators,
  loginValidators,
} = require("../validators/userValidators");

const router = Router();

router.post("/register", [...registerValidators, validarCampos], userPost);

router.post("/login", [loginValidators, validarCampos], userLogin);

module.exports = router;

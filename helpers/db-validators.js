const Role = require("../models/role");
const Usuario = require("../models/user");

const isRoleValid = async (rol = "") => {
  //aca va a evaluar el rol que decibe en el body,
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
  }
};

const emailExist = async (email = "") => {
  const existeEmail = await Usuario.findOne({ email }); // con esto buscamos si en Usuario existe ese correo
  if (existeEmail) {
    throw new Error(`Este correo ya esta registrado`);
  }
};

const idExist = async (id) => {
  const existeId = await Usuario.findById(id); // con esto buscamos si en Usuario existe ese correo
  if (!existeId) {
    throw new Error(`Este id no existe`);
  }
};

module.exports = {
  isRoleValid,
  emailExist,
  idExist,
};

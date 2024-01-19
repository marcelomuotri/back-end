// aca es para crear la coleccion, contiene el modelo de los datos

const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "name is mandatory"],
  },
  email: {
    type: String,
    required: [true, "email is mandatory"],
    unique: true, //tiene que ser un correo unico , no se puede repetir
  },
  password: {
    type: String,
    required: [true, "password is mandatory"],
  },
  role: {
    type: String,
    required: [true, "role is mandatory"],
  },
});

//aca yo puedo crearme metodos personales, como tambien sobrescribir los tojson y esos metodos existentes

// tiene que ser una funcion normal
UserSchema.methods.toJSON = function () {
  const { __v, password, ...rest } = this.toObject(); // de esta manera yo estoy separando el password y laversion de la respuesta y todos los demas van a ser almacenados en usuario
  return rest;
};

module.exports = model("User", UserSchema);

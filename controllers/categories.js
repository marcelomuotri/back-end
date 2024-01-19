const { response } = require("express");

const bcryptjs = require("bcryptjs"); //este es para las contraseñas

//const Carpa = require("../models/usuario"); // aca traigo el modelo de la coleccion
const Category = require("../models/category"); // aca traigo el modelo de la coleccion
const Historial = require("../models/historial"); // aca traigo el modelo de historial

const getCategories = async (req, res) => {
  const query = {};

  const { limite = 12, desde = 0 } = req.query;

  try {
    const categories = await Category.find(query)
        .skip(Number(desde)) 
        .limit(Number(limite));

    // Enviando la respuesta solo con el array dentro del objeto data
    res.json({
        data: categories
    });
} catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
}
};

module.exports = {
  getCategories,
};

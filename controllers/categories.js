// categoryController.js

const { response } = require("express");
const categoryService = require("../services/categoriesService"); // Importa el nuevo servicio

const getCategories = async (req, res) => {
  const { limite = 12, desde = 0 } = req.query;

  try {
    const categories = await categoryService.getCategories(limite, desde);
    res.json({ data: categories });
  } catch (error) {
    console.error("Controller error:", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = {
  getCategories,
};

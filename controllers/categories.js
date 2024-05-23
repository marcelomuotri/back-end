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

const addCategory = async (req, res) => {
  try {
    const savedCategory = await categoryService.addCategory(req.body);
    res.json({ data: savedCategory });
  } catch (error) {
    console.error("Controller error:", error.message);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getCategories,
  addCategory,
};

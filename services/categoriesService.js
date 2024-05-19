// categoryService.js

const Category = require("../models/category"); // Importando el modelo de categoría

const getCategories = async (limit = 12, offset = 0) => {
  try {
    const categories = await Category.find({})
      .skip(Number(offset))
      .limit(Number(limit));

    return categories;
  } catch (error) {
    console.error("Error getting categories:", error);
    throw new Error("Error getting categories");
  }
};

module.exports = {
  getCategories,
};

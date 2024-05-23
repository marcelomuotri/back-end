// categoryService.js

const Category = require("../models/category");

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

const findOne = async (criteria) => {
  try {
    const document = await Category.findOne(criteria);
    return document;
  } catch (error) {
    console.error("Error finding document:", error);
    throw new Error("Error finding document");
  }
};

const addCategory = async (categoryData) => {
  try {
    const existingCategory = await findOne({ name: categoryData.name });
    if (existingCategory) {
      throw new Error(`Category with name ${categoryData.name} already exists`);
    }

    const category = new Category(categoryData);
    const savedCategory = await category.save();
    return savedCategory;
  } catch (error) {
    console.error("Error saving category:", error);
    throw new Error("Error saving category: " + error.message);
  }
};

module.exports = {
  getCategories,
  addCategory,
};

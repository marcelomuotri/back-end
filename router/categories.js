const { Router } = require("express");
const { getCategories, addCategory } = require("../controllers/categories");

const router = Router();

router.get("/", getCategories);
router.post("/", addCategory);

module.exports = router;

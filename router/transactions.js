const { Router } = require("express");
const {
  getTransactions,
  addTransaction,
  deleteTransaction
} = require("../controllers/transactions");

const router = Router();

router.get("/", getTransactions);
router.post("/", addTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;

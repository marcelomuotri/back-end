// transactionController.js

const transactionService = require("../services/transactionsService"); // Importa el nuevo servicio

const getTransactions = async (req, res) => {
  const {
    limite = 100,
    desde = 0,
    category,
    dateFrom,
    dateTo,
    user,
  } = req.query;
  try {
    const transactions = await transactionService.getTransactions(
      limite,
      desde,
      category,
      dateFrom,
      dateTo,
      user
    );
    res.json({ data: transactions });
  } catch (error) {
    console.error("Controller error:", error.message);
    res.status(500).json({ msg: "Couldn't find transactions" });
  }
};

const addTransaction = async (req, res) => {
  try {
    const savedTransaction = await transactionService.addTransaction(req.body);
    res.json({ data: savedTransaction });
  } catch (error) {
    console.error("Controller error:", error.message);
    res.status(500).json({ msg: error.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await transactionService.deleteTransaction(
      req.params.id
    );
    res.json({
      msg: "Transaction deleted successfully",
      data: deletedTransaction,
    });
  } catch (error) {
    console.error("Controller error:", error.message);
    res.status(500).json({ msg: "Couldn't delete the transaction" });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  deleteTransaction,
};

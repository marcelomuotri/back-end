// transactionService.js

const Transaction = require("../models/transaction"); // Importando el modelo de transacción

const getTransactions = async (
  limit = 100,
  offset = 0,
  category,
  dateFrom,
  dateTo
) => {
  const query = {};

  if (category) {
    query.category = category;
  }

  if (dateFrom || dateTo) {
    query.transactionDate = {};
    if (dateFrom) {
      query.transactionDate.$gte = new Date(dateFrom);
    }
    if (dateTo) {
      query.transactionDate.$lte = new Date(dateTo);
    }
  }

  try {
    const transactions = await Transaction.find(query)
      .populate("category")
      .skip(Number(offset))
      .limit(Number(limit));
    return transactions;
  } catch (error) {
    console.error("Error getting transactions:", error);
    throw new Error("Error getting transactions");
  }
};

const addTransaction = async (transactionData) => {
  const transaction = new Transaction(transactionData);
  try {
    const savedTransaction = await transaction.save();
    return savedTransaction;
  } catch (error) {
    console.error("Error saving transaction:", error);
    throw new Error("Error saving transaction");
  }
};

const deleteTransaction = async (transactionId) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(
      transactionId
    );
    if (!deletedTransaction) {
      throw new Error("Transaction not found");
    }
    return deletedTransaction;
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw new Error("Error deleting transaction");
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  deleteTransaction,
};

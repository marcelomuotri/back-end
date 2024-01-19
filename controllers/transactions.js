const { response } = require("express");
const Transaction = require("../models/transaction");

const getTransactions = async (req, res) => {
  console.log("fetched");
  const query = {};
  const { limite = 100, desde = 0, category, dateFrom, dateTo } = req.query;

  if (category) {
    query.category = category; // Asumiendo que 'category' es un ID de la categoría
  }

  if (dateFrom || dateTo) {
    query.transactionDate = {};
    if (dateFrom) {
      query.transactionDate.$gte = new Date(dateFrom); // Fecha mayor o igual a dateFrom
    }
    if (dateTo) {
      query.transactionDate.$lte = new Date(dateTo); // Fecha menor o igual a dateTo
    }
  }

  try {
    const transactions = await Transaction.find(query)
      .populate("category") // Esto llenará el campo 'category' con la data de la colección 'Category'
      .skip(Number(desde))
      .limit(Number(limite));

    // Enviando la respuesta solo con el array dentro del objeto data
    res.json({
      data: transactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Couldn't find transactions" });
  }
};

const addTransaction = async (req, res) => {
  const newTransaction = new Transaction(req.body);

  try {
    const savedTransaction = await newTransaction.save();

    res.json({
      data: savedTransaction,
    });
    console.log("new transaction saved!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Couldn't save the transaction" });
  }
};

const deleteTransaction = async (req, res) => {
  console.log("intentando borrar");
  try {
    // Busca y elimina la transacción en la base de datos
    const deletedTransaction = await Transaction.findByIdAndDelete(
      req.params.id
    );

    // Si no se encontró la transacción
    if (!deletedTransaction) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    // Envía una respuesta confirmando la eliminación
    res.json({
      msg: "Transaction deleted successfully",
      data: deletedTransaction,
    });
    console.log("Transaction deleted!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Couldn't delete the transaction" });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  deleteTransaction,
};

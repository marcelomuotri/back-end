const { Schema, model } = require("mongoose");

const TransactionSchema = Schema({
  user: {
    type: String,
    required: [true, "user obligatorio"],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category", // Referencia al modelo Category que proporcionaste
    required: [true, "la categoria es obligatoria"],
  },
  amount: {
    type: Number,
    required: [true, "el amount es obligatoria"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: [true, "la descripcion es obligatoria"],
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
});

// Método personalizado para transformar la respuesta JSON
TransactionSchema.methods.toJSON = function () {
  const { __v, ...transaction } = this.toObject();
  return transaction;
};

module.exports = model("Transaction", TransactionSchema);

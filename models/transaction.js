const { Schema, model } = require('mongoose');

const TransactionSchema = Schema({
    user: {
        type: String,
        default: '1'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',   // Referencia al modelo Category que proporcionaste
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        trim: true
    },
    transactionDate: {
        type: Date
    }
    // Puedes agregar más campos según lo requieras.
});

// Método personalizado para transformar la respuesta JSON
TransactionSchema.methods.toJSON = function() {
    const { __v, ...transaction } = this.toObject();
    return transaction;
}

module.exports = model('Transaction', TransactionSchema);

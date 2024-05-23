// aca es para crear la coleccion, contiene el modelo de los datos

const { Schema, model } = require("mongoose");

const CategorySchema = Schema(
  {
    name: {
      type: String,
      required: [true, "El name es obligatorio"],
    },
    description: {
      type: String,
      required: [true, "la description es obligatoria"],
    },
    icon: {
      type: String,
      required: [true, "la icon es obligatoria"],
    },
    label: {
      type: String,
      required: [true, "la label es obligatoria"],
    },
    userId: {
      type: String,
      required: [true, "la userId es obligatoria"],
    },
  },
  { strict: "throw" }
);

module.exports = model("Category", CategorySchema);

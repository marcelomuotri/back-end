

// aca es para crear la coleccion, contiene el modelo de los datos

const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String
        //required: [true, 'El numero es obligatorio']

    },

    description:{
        type:String
        //required: [true, 'la capacidad es obligatoria'],
    },

    color:{
        type:String
        //required: [true, 'la capacidad es obligatoria'],
    },


})

//aca yo puedo crearme metodos personales, como tambien sobrescribir los tojson y esos metodos existentes

// tiene que ser una funcion normal
CategorySchema.methods.toJSON = function() {
    const { __v, password , ...categories } = this.toObject() // de esta manera yo estoy separando el password y laversion de la respuesta y todos los demas van a ser almacenados en usuario
    return categories;
}


module.exports = model( 'Category', CategorySchema )
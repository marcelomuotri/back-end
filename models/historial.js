

const { Schema, model } = require('mongoose');

const HistorialSchema = Schema({

    historial:{
        type: Object
    }

})

//aca yo puedo crearme metodos personales, como tambien sobrescribir los tojson y esos metodos existentes




module.exports = model( 'Historial', HistorialSchema )
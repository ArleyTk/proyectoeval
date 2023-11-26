const {Schema, model} = require('mongoose')

const ProyectoSchema = Schema({
    idproyecto: {
        type: Number,
        unique: true,
        required: [true, 'El id es obligatorio']
    },

    nombreproyecto: {
        type: String,
        required: [true, 'el nombre es obligatorio'],
        minlength: [3, 'Debe tener mínimo 3 caracteres']
        //maxlength:  [7, 'Debe tener máximo 3 caracteres']
    },

    horasDedicadas: {
        type: Number,
        required: true,
    },

    valorProyecto: {
        type: Number,
        required: [true, 'el valor es obligatorio'],
        //maxlength:  [7, 'Debe tener máximo 3 caracteres']
    },

    numeroIntegrantes: {
        type: String,
        required: [true, 'el nombre es obligatorio'],
        //maxlength:  [7, 'Debe tener máximo 3 caracteres']
    },

})

//Exportar la función 
module.exports = model('Proyecto',ProyectoSchema)


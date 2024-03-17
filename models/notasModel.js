const mongoose = require('mongoose');

const estudiantesSchema = new mongoose.Schema({
    nombre: String,
    apellidos: String,
    correo: String,
    nota: Number
});

const Estudiantes = mongoose.model("estudiantes", estudiantesSchema);

module.exports = Estudiantes;
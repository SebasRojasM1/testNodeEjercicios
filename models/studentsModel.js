const mongoose = require('mongoose');

const studentsSchema = new mongoose.Schema({
    nombre: String,
    edad: Number,
    correo: String,
    profesorId: Number
});

const Students = mongoose.model("students", studentsSchema);

module.exports = Students;
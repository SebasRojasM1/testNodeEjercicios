const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: String,
    apellidos: String,
    correo: String,
    ciudad: String,
    pais: String,
    salario: Number,
    empresa_id: Number
});

const User = mongoose.model('usuarios', userSchema);

module.exports = User;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: Number,
    nombre: String,
    apellidos: String,
    correo: String,
    ciudad: String,
    pais: String,
    salario: Number,
    empresa_id: String
});

const User = mongoose.model('usuarios', userSchema);

module.exports = User;

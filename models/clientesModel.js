const mongoose = require('mongoose');

const clientesSchema = new mongoose.Schema({
    idUser: Number,
    nombre: String,
    email: String,
    edad: Number,
    password: String,
});

const Clientes = mongoose.model("clientes", clientesSchema);

module.exports = Clientes;
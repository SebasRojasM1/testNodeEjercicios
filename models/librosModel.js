const mongoose = require('mongoose');

const librosSchema = new mongoose.Schema({
    nombre: String,
    genero: String,
    referencia: Number
});

const Libros = mongoose.model("libros", librosSchema);

module.exports = Libros;
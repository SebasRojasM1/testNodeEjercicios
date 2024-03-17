const mongoose = require('mongoose');

const empresaSchema = new mongoose.Schema({
    nombre: String,
    nit: Number,
    direccion: String,
    telefono: String,
    ciudad: String
});

const Empresa = mongoose.model("empresas", empresaSchema);

module.exports = Empresa;
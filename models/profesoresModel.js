const mongoose = require('mongoose');

const profesoresSchema = new mongoose.Schema({
    nombres: String,
    especialidad: String,
    email: String
});

const Profesores = mongoose.model("profesores", profesoresSchema);

module.exports = Profesores;
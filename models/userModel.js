const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    idUser: Number,
    nombre: String,
    edad: Number,
    tipo_usuario: String,
    email: String,
    password: String,
});

const User = mongoose.model("users", userSchema);

module.exports = User;
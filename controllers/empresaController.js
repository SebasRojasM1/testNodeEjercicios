const Empresa = require('../models/empresaModel');

const empresaController = {
    // Obtener todos los usuarios
    getAllEmpresas: async (req, res) => {
        try {
            const empresas = await Empresa.find();
            res.json(empresas);
        } catch (error) {
            console.error('Error al obtener la informacion de la empresa:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },


    // Crear un nuevo usuario
    createEmpresa: async (req, res) => {
        const empresaData = req.body;
        try {
            const newEmpresa = new Empresa(empresaData);
            const savedEmpresa = await newEmpresa.save();
            res.status(201).json(savedEmpresa);
        } catch (error) {
            console.error('Error al crear usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Otros métodos para manejar otras solicitudes relacionadas con los usuarios (actualizar, eliminar, etc.)
};

module.exports = empresaController;
const Estudiantes = require('../models/notasModel');

const userController = {
    // Obtener todos los usuarios
    getAllUsers: async (req, res) => {
        try {
            const users = await Estudiantes.find();
            res.json(users);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getUserByID: async (req, res) => {
        const id = req.params.id 

        try {
            const studentId = await Estudiantes.findById(id);
            res.json(studentId);

            //SEGUNDA OPCION
            /* const id = req.parameter.id   
            const userId = userIdUser.findById(id) 
            res.json(userId)*/
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },  

    getUserByName: async (req, res) => {
        const name = req.params.nombres 

        try {
            const studentName = await Estudiantes.findOne({name: name});
            res.json(studentName);

            //SEGUNDA OPCION
            /* const name = req.parameter.name   
            const userName = userNameUser.findOne({name: name}) 
            res.json(userName)*/
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getUserByNota: async (req, res) => {
        const nota = req.params.nota 

        try {
            const studentNota = await Estudiantes.findOne({nota: nota});
            res.json(studentNota);

            //SEGUNDA OPCION
            /* const name = req.parameter.name   
            const userName = userNameUser.findOne({name: name}) 
            res.json(userName)*/
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Obtener todas y solamente la nota
    getAllNotes: async (req, res) => {
        try {
            const allNotes = await Estudiantes.find({}, {nota: 1, _id: 0});
            res.json(allNotes);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },


    // Crear un nuevo usuario
    createUser: async (req, res) => {
        const userData = req.body;
        try {
            const newUser = new Estudiantes(userData);
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            console.error('Error al crear usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Otros métodos para manejar otras solicitudes relacionadas con los usuarios (actualizar, eliminar, etc.)
};

module.exports = userController;
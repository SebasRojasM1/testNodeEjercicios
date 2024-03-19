const Students = require('../models/studentsModel');

const studentsController = {
    // Obtener todos los estudiantes
    getAllStudents: async (req, res) => {
        try {
            const students = await Students.find();
            res.json(students);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },


    /*Consultar el libro segun su referencia */
    getStudentById: async (req, res) => {
        const {_id} = req.params 

        try {
            const studentById = await Students.findOne({_id: _id});
            res.json(studentById);

            //SEGUNDA OPCION
            /* const name = req.parameter.name   
            const userName = userNameUser.findOne({name: name}) 
            res.json(userName)*/
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },


    /*Actualizar el nombre de un libro */
    updateStudent : async (req, res) => {
        try {
            const {nombre} = req.params;

            const updateStudent = await Students.findOneAndUpdate({nombre: nombre}, {$set: {nombre: "Andrea"} }) /*Recibe 2 parametros. 1. El nombre de quien voy a actualizar (recibe la url), 2. el valor que voy a actualizar*/

            res.json(updateStudent)
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },



    /*Eliminar un libro por su nombre */
    deleteStudent: async (req, res) => {
        try {
            const {nombre} = req.params;
            const deleteStudent = await Students.findOneAndDelete({nombre: nombre});
            res.json(deleteStudent);
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },



    // Crear un nuevo usuario
    createStudent: async (req, res) => {
        const studentData = req.body;
        try {
            const newStudent = new Students(studentData);
            const savedStudent = await newStudent.save();
            res.status(201).json(savedStudent);
        } catch (error) {
            console.error('Error al crear usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Otros métodos para manejar otras solicitudes relacionadas con los usuarios (actualizar, eliminar, etc.)
};

module.exports = studentsController;
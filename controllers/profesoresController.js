const Profesores = require('../models/profesoresModel');

const profesoresController = {
    // Obtener todos los profesores
    getAllTeachers: async (req, res) => {
        try {
            const teacher = await Profesores.find();
            res.json(teacher);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },


    /*Consultar el libro segun su referencia */
    getTeacherByID: async (req, res) => {
        const {_id} = req.params 

        try {
            const teacherById = await Profesores.findOne({_id: _id});
            res.json(teacherById);

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
    updateTeacher : async (req, res) => {
        try {
            const {nombre} = req.params;

            const updateTeacher = await Profesores.findOneAndUpdate({nombre: nombre}, {$set: {nombre: "Yandel"} }) /*Recibe 2 parametros. 1. El nombre de quien voy a actualizar (recibe la url), 2. el valor que voy a actualizar*/

            res.json(updateTeacher)
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    
    updateTeacherPut: async(req, res) => {
        try {
            const { nombres } = req.params;
            //const { nuevoNombre } = req.body; // Se espera que el nuevo nombre se envíe en el cuerpo de la solicitud

        // Buscar y actualizar el estudiante
        const updateStudent = await Profesores.findOneAndUpdate(
            { nombres: nombres },
            { nombres: "Yandel" }, 
            { new: true } // Opción para devolver el documento actualizado
        );

        res.json(updateStudent);

        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });  
        }
    },



    /*Eliminar un libro por su nombre */
    deleteTeacher: async (req, res) => {
        try {
            const {_id} = req.params;;
            const deleteTeacher = await Profesores.findOneAndDelete({_id: _id});
            res.json(deleteTeacher);
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },



    // Crear un nuevo usuario
    createTeacher: async (req, res) => {
        const teacherData = req.body;
        try {
            const newTeacher = new Profesores(teacherData);
            const savedTeacher = await newTeacher.save();
            res.status(201).json(savedTeacher);
        } catch (error) {
            console.error('Error al crear usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Otros métodos para manejar otras solicitudes relacionadas con los usuarios (actualizar, eliminar, etc.)
};

module.exports = profesoresController;
const Libros = require('../models/librosModel');

const librosController = {
    // Obtener todos los libros
    getAllUsers: async (req, res) => {
        try {
            const libros = await Libros.find();
            res.json(libros);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },


    /*Consultar el libro segun su referencia */
    getBookByReference: async (req, res) => {
        const referencia = req.params.referencia 

        try {
            const bookReference = await Libros.findOne({referencia: referencia});
            res.json(bookReference);

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
    updateBook : async (req, res) => {
        try {
            const {nombre} = req.params;

            const updateBook = await Libros.findOneAndUpdate({nombre: nombre}, {$set: {nombre: "StarWars"} }) /*Recibe 2 parametros. 1. El nombre de quien voy a actualizar (recibe la url), 2. el valor que voy a actualizar*/

            res.json(updateBook)
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },



    /*Eliminar un libro por su nombre */
    deleteBook: async (req, res) => {
        try {
            const {nombre} = req.params;;
            const deleteBook = await Libros.findOneAndDelete({nombre: nombre});
            res.json(deleteBook);
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },



    // Crear un nuevo usuario
    createBook: async (req, res) => {
        const bookData = req.body;
        try {
            const newBook = new Libros(bookData);
            const savedBook = await newBook.save();
            res.status(201).json(savedBook);
        } catch (error) {
            console.error('Error al crear usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Otros métodos para manejar otras solicitudes relacionadas con los usuarios (actualizar, eliminar, etc.)
};

module.exports = librosController;
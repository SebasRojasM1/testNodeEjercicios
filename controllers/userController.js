const User = require('../models/userModel');

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const jwt_secret = "#2fasdgr4#"

const userController = {
    // Obtener todos los usuarios
    getAllUsers: async (req, res) => {
        try {
            const user = await User.find();
            res.json(user);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },



    getUserByID: async (req, res) => {
        const {_id} = req.params

        try {
            const idUser = await User.findById(_id);
            res.json(idUser);

        } catch (error) {
            console.error('Error al obtener usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },  

    
    getUserByName: async (req, res) => {
        const {nombre} = req.params 

        try {
            const userName = await User.findOne({nombre: nombre});
            res.json(userName);

        } catch (error) {
            console.error('Error al obtener usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },



    updateUser : async (req, res) => {
        
        try {
            const {nombre} = req.params;

            const updateUser = await User.findOneAndUpdate({nombre: nombre}, {$set: {nombre: "Miguel"} }) /*Recibe 2 parametros. 1. El nombre de quien voy a actualizar (recibe la url), 2. el valor que voy a actualizar*/

            res.json(updateUser)
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },



    deleteUser: async (req, res) => {
        try {
            const {nombre} = req.params;
            const deletedUser = await User.findOneAndDelete({nombre: nombre});
            res.json(deletedUser);
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },


    // Crear un nuevo usuario
    createUser: async (req, res) => {
        const userData = req.body;
        try {
            const newUser = new User(userData);
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            console.error('Error al crear usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },


    register: async(req, res) => {
        try {
            //Encriptaremos la password que nos llegarà

            const {nombre, email, edad, tipo_usuario, password} = req.body;

            const users = await User.find()
            const userData = {
                /*ESPECIFICAR LA MISMA ESTRUCTURA DEL ESQUEMA */
                
                idUser: users.length + 1, //idUser es dinamico, pero para ello, debemos saber cuantos usuarios hay existentes, para que se agregue al siguiente disponible.usamos users.length +1 
                nombre: nombre,
                edad: edad,
                tipo_usuario, tipo_usuario,
                email: email,
                password: await bcrypt.hash(password, 10)
                            //bcrypt.hash recibe 2 parametros. 1 contraseña, 2 los saltos/steps (como recorrerà) de la contraseña
            }

            const newUser = new User (userData);
            const savedUser = await newUser.save();

            res.status(201).json(savedUser);

        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },


    login: async(req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.find({email: email})

            if(!user){
                return res.status(401).json({message: "El usuario no existe"})
            }


            // verificamos si el usuario que intentamos loguear es el mismo que registramos
            const isPasswordValid = await bcrypt.compare(password, user[0].password)


            //y si es valido, para que me genere el token JWT para firmar...

            //el jwt.sign recibe dos parametros: USERID, CANTIDAD DE TIEMPO EN LA QUE EXPIRARÀ ESE TOKEN
            const token = jwt.sign({idUser: user._id}, jwt_secret, {
                //puedes especificar en letras el tiempo establecido
                expiresIn: "1h"
            })

            res.json({message: "logged is successfully", token})

        } catch (error) {
            console.error('Error al loguearse:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    // Otros métodos para manejar otras solicitudes relacionadas con los usuarios (actualizar, eliminar, etc.)

};



module.exports = userController;
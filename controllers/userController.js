const User = require('../models/userModel');

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const jwt_secret = "##%asasasasa"


const userController = {
    // Obtener todos los usuarios
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getUserByID: async (req, res) => {
        const id = req.params.id 

        try {
            const userId = await User.findById(id);
            res.json(userId);

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
            const userName = await User.findOne({name: name});
            res.json(userName);

            //SEGUNDA OPCION
            /* const name = req.parameter.name   
            const userName = userNameUser.findOne({name: name}) 
            res.json(userName)*/
        } catch (error) {
            console.error('Error al obtener usuario:', error);
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

            const {nombre, apellidos, correo, ciudad, pais, salario, empresa_id} = req.body;

            const users = await User.find()
            const userData = {
                /*ESPECIFICAR LA MISMA ESTRUCTURA DEL ESQUEMA */
                
                userId: users.length + 1, //userId es dinamico, pero para ello, debemos saber cuantos usuarios hay existentes, para que se agregue al siguiente disponible.usamos users.length +1 
                nombre: nombre,
                apellidos: apellidos,

                correo: correo,
                ciudad: ciudad,
                pais: pais,
                salario: salario,
                                //bcrypt.hash recibe 2 parametros. 1 contraseña, 2 los saltos/steps (como recorrerà) de la contraseña
                empresa_id: await bcrypt.hash(empresa_id, 10)
            }

            const newUser = new User(userData);
            const savedUser = await newUser.save();

            res.status(201).json(savedUser);

        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },


    login: async(req, res) => {
        try {
            const { correo, empresa_id } = req.body;

            const user = await User.find({correo: correo})

            if(!user){
                return res.status(401).json({message: "El usuario no existe"})
            }


            // verificamos si el usuario que intentamos loguear es el mismo que registramos
            const isPasswordValid = await bcrypt.compare(empresa_id, user[0].empresa_id)


            //y si es valido, para que me genere el token JWT para firmar...

            //el jwt.sign recibe dos parametros: USERID, CANTIDAD DE TIEMPO EN LA QUE EXPIRARÀ ESE TOKEN
            const token = jwt.sign({userId: userId}, jwt_secret, {
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
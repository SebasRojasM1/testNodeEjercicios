const Clientes = require('../models/clientesModel');

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")


const jwt_secret = "##%asasasasa"

const clientesController = {
    // Obtener todos los clientes
    getAllClients: async (req, res) => {
        try {
            const clientes = await Clientes.find();
            res.json(clientes);
        } catch (error) {
            console.error('Error al obtener clientes:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Obtener un cliente por su ID
    getCostumerByID: async (req, res) => {
        const {_id} = req.params

        try {
            const idUser = await Clientes.findById(_id);
            res.json(idUser);

        } catch (error) {
            console.error('Error al obtener clientes:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },  


    // Obtener un cliente por su nombre
    getCustomerByName: async (req, res) => {
        const {nombre} = req.params 

        try {
            const customerName = await Clientes.findOne({nombre: nombre});
            res.json(customerName);

        } catch (error) {
            console.error('Error al obtener clientes:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },


    // Actualizar cliente
    updateUser : async (req, res) => {
        
        try {
            const {nombre} = req.params;

            const updateCustomer = await Clientes.findOneAndUpdate({nombre: nombre}, {$set: {nombre: "Pedro"} }) /*Recibe 2 parametros. 1. El nombre de quien voy a actualizar (recibe la url), 2. el valor que voy a actualizar*/

            res.json(updateCustomer)
        } catch (error) {
            console.error('Error al actualizar el cliente:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },


    // Eliminar cliente
    deleteUser: async (req, res) => {
        try {
            const {email} = req.params;
            const deletedUser = await Clientes.findOneAndDelete({email: email});
            res.json(deletedUser);
        } catch (error) {
            console.error('Error al actualizar el cliente:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },


    // Crear un nuevo cliente
    createUser: async (req, res) => {
        const userData = req.body;
        try {
            const newUser = new Clientes(userData);
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            console.error('Error al crear cliente:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },


    //Registrar un nuevo cliente
    register: async(req, res) => {
        try {
            //Encriptaremos la password que nos llegarà

            //Propiedades de nuestro formulario.
            const {nombre, email, edad, password, confirmar_password} = req.body;

            // Verificamos si el correo electrónico ya está registrado.
            const existingUser = await Clientes.findOne({ email: email });

            if (existingUser) {
                return res.status(400).json({ message: "El correo electrónico ya está registrado" }); 
            }


            // Verificamos si las contraseñas coinciden
            if (password !== confirmar_password) {
                return res.status(400).json({ message: "Las contraseñas no coinciden" });
            }

            const users = await Clientes.find()
            const userData = {

                /*ESPECIFICAR LA MISMA ESTRUCTURA DEL ESQUEMA */
                idUser: users.length + 1, //idUser es dinamico, pero para ello, debemos saber cuantos clientes hay existentes, para que se agregue al siguiente disponible. Usamos users.length +1 
                nombre: nombre,
                email: email,

                edad: edad,
                password: await bcrypt.hash(password, 10)
                            //bcrypt.hash recibe 2 parametros. 1 contraseña, 2 los saltos/steps (como recorrerà) de la contraseña
            }

            const newUser = new Clientes (userData);
            const savedUser = await newUser.save();

            res.status(201).json(savedUser);

        } catch (error) {
            console.error('Error al registrar cliente:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },



    //Loguear cliente
    login: async(req, res) => {
        try {
            //Datos extraidos del cuerpo(body) HTML
            const { email, password } = req.body;
    

            //Comparamos los emails, y verificamos si el email ingresado existe
            const customer = await Clientes.findOne({ email: email });
    
            if (!customer) {
                return res.status(401).json({ message: "El cliente no existe" });
            }
    
            
            //Comparamos las contraseñas, y verificamos si la contraseña que se ingresò es correcta
            const isPasswordValid = await bcrypt.compare(password, customer.password);
                
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Contraseña incorrecta" });
            }
    

            //Generamos el token de acceso con su tiempo de duraciòn
            const token = jwt.sign({ idUser: customer._id }, jwt_secret, {
                expiresIn: "1h"
            });
    
            res.json({ message: "Inicio de sesión exitoso", token });
    
        } catch (error) {
            console.error('Error al loguearse:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
}
}



module.exports = clientesController;
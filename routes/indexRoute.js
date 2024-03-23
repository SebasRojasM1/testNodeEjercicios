const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


/* usuarios */
/*Llamar a todos los usuarios (GET), e ingresar nuevos usuarios (POST) */
router.get('/api/users', userController.getAllUsers);
router.post('/api/users/create', userController.createUser);
router.patch('/api/users/update/:nombre', userController.updateUser);
router.delete('/api/users/delete/:nombre', userController.deleteUser);


/*llamado del usuario por el ID */
router.get('/api/users/id/:id', userController.getUserByID);


/*llamado del usuario por el nombre */
router.get('/api/users/nombre/:nombre', userController.getUserByName);




//REGISTRO USUARIOS
router.post('/register', userController.register);

/*LOGIN */
router.post('/login', userController.login);


module.exports = router;
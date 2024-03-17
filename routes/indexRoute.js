const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const empresaController = require('../controllers/empresaController');


/* USUARIOS */
/*Ruta: llamado de todos los usuarioso */
router.get('/api/usuarios', userController.getAllUsers);
router.post('/api/usuarios', userController.createUser);

/*Ruta: llamado del usuario por el ID */
router.get('/api/usuarios/id/:id', userController.getUserByID);

/*Ruta: llamado del usuario por el nombre */
router.get('/api/usuarios/nombres/:nombres', userController.getUserByName);



/*EMPRESAS*/
router.get('/api/empresas', empresaController.getAllEmpresas);
router.post('/api/empresas', empresaController.createEmpresa);




module.exports = router;
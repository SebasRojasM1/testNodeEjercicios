const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

const auth = require("../middleware/auth")



/* CLIENTES */
/*Ruta: Llamar a todos los clientes (GET), e ingresar nuevos clientes (POST) */
router.get('/api/clientes', auth.authenticate(), clientesController.getAllClients);
router.post('/api/clientes/create', clientesController.createUser);
router.patch('/api/clientes/update/:nombre', clientesController.updateUser);
router.delete('/api/clientes/delete/:email', clientesController.deleteUser);


/*Ruta: llamado del clientes por el ID */
router.get('/api/clientes/id/:id', clientesController.getCostumerByID);


/*Ruta: llamado del clientes por el nombre */
router.get('/api/clientes/nombre/:nombre', clientesController.getCustomerByName);




//REGISTRO CLIENTES
router.post('/register', clientesController.register);

/*LOGIN */
router.post('/login', clientesController.login);


module.exports = router;
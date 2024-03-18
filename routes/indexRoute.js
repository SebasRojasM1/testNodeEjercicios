const express = require('express');
const router = express.Router();
const NotasController = require('../controllers/notasController');


/* ESTUDIANTES */
/*Ruta: Llamar a todos los estudiantes (GET), e ingresar nuevos estudiantes (POST) */
router.get('/api/estudiantes', NotasController.getAllUsers);
router.post('/api/estudiantes', NotasController.createUser);
router.patch('/api/estudiantes/update/:nombre', NotasController.updateUser);
router.delete('/api/estudiantes/delete/:nombre', NotasController.deleteUser);


/*Ruta: llamado del usuario por el ID */
router.get('/api/estudiantes/id/:id', NotasController.getUserByID);


/*Ruta: llamado del usuario por el nombre */
router.get('/api/estudiantes/nombre/:nombre', NotasController.getUserByName);

/*Ruta: llamado del estudiante por la nota */
router.get('/api/estudiantes/nota/:nota', NotasController.getUserByNota);

/*Ruta: llamado del estudiante por la nota */
router.get('/api/estudiantes/notas', NotasController.getAllNotes);


module.exports = router;
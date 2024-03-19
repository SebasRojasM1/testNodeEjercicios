const express = require('express');
const router = express.Router();
const profesoresController = require('../controllers/profesoresController');
const studentsController = require('../controllers/studentsController');



/* ESTUDIANTE */
/*Ruta: Llamar a todos los libros (GET), e ingresar nuevos libros (POST) */
router.get('/api/students', studentsController.getAllStudents);//Llamar a todos los estudiantes
router.post('/api/students/create', studentsController.createStudent);//Crear estudiante


/*Ruta: llamado del usuario por el ID */
router.get('/api/students/id/:_id', studentsController.getStudentById);


/*Ruta: Actualizar el nombre de un estudiante */
router.patch('/api/students/update/:nombre', studentsController.updateStudent);

/*Borrar un estudiante por su nombre */
router.delete('/api/students/delete/:nombre', studentsController.deleteStudent);






/*PROFESORES*/
router.get('/api/profesores', profesoresController.getAllTeachers);//Llamar a todos los profesores
router.post('/api/profesores/create', profesoresController.createTeacher); //Crear profesor


/*Ruta: llamado del usuario por el id */
router.get('/api/profesores/id/:_id', profesoresController.getTeacherByID);


/*Ruta: Actualizar el nombre de un estudiante */
router.patch('/api/profesores/update/:nombre', profesoresController.updateTeacher);

/*Borrar un estudiante por su nombre */
router.delete('/api/profesores/delete/:nombre', profesoresController.deleteTeacher);


module.exports = router;
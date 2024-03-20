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
//router.patch('/api/students/update/:nombre', studentsController.updateStudent);

/*Ruta: Actualizar el nombre de un estudiante */
router.put('/api/students/update/:nombre', studentsController.updateStudentPut);

/*Borrar un estudiante por su nombre */
router.delete('/api/students/delete/:_id', studentsController.deleteStudent);






/*PROFESORES*/
router.get('/api/profesores', profesoresController.getAllTeachers);//Llamar a todos los profesores
router.post('/api/profesores/create', profesoresController.createTeacher); //Crear profesor


/*Ruta: llamado del usuario por el id */
router.get('/api/profesores/id/:_id', profesoresController.getTeacherByID);


/*Ruta: Actualizar el nombre de un estudiante */
//router.patch('/api/profesores/update/:nombre', profesoresController.updateTeacher);

/*Ruta: Actualizar el nombre de un estudiante */
router.put('/api/profesores/update/:nombres', profesoresController.updateTeacherPut);

/*Borrar un estudiante por su nombre */
router.delete('/api/profesores/delete/:_id', profesoresController.deleteTeacher);


module.exports = router;
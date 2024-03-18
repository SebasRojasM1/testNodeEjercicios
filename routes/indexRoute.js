const express = require('express');
const router = express.Router();
const librosController = require('../controllers/librosController');


/* LIBROS */
/*Ruta: Llamar a todos los libros (GET), e ingresar nuevos libros (POST) */
router.get('/api/libros', librosController.getAllUsers);
router.post('/api/libros/create', librosController.createBook);


/*Ruta: llamado del usuario por el referencia */
router.get('/api/libros/referencia/:referencia', librosController.getBookByReference);


/*Ruta: Actualizar el nombre de un libro */
router.patch('/api/libros/update/:nombre', librosController.updateBook);

/*Borrar un libro por su nombre */
router.delete('/api/libros/delete/:nombre', librosController.deleteBook);



module.exports = router;
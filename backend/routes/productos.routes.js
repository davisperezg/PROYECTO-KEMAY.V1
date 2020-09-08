const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productos.controller');


const passport = require('passport')

router.get('/',passport.authenticate('jwt', {session:false}), productoController.listarProducto);
router.post('/',passport.authenticate('jwt', {session:false}), productoController.crearProducto);
router.get('/:id',passport.authenticate('jwt', {session:false}), productoController.obtenerProducto);
router.put('/:id',passport.authenticate('jwt', {session:false}), productoController.actualizarProducto)
router.delete('/:id',passport.authenticate('jwt', {session:false}), productoController.eliminarProducto)
router.get('/tipo/categoria/:id',passport.authenticate('jwt', {session:false}), productoController.TipoXcategoria)
router.get('/marca/tipo/:id',passport.authenticate('jwt', {session:false}), productoController.MarcaXtipo)
router.get('/marca/:id',passport.authenticate('jwt', {session:false}), productoController.listarProductoXCategoriaXTipoXMarca)



module.exports = router;
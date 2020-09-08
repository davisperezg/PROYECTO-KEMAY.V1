const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventario.controller');


const passport = require('passport')

router.get('/',passport.authenticate('jwt', {session:false}), inventarioController.listarInventario);
router.post('/',passport.authenticate('jwt', {session:false}), inventarioController.crearInventario);
router.put('/:id',passport.authenticate('jwt', {session:false}), inventarioController.actualizarPrecioInventario)
router.delete('/:id',passport.authenticate('jwt', {session:false}), inventarioController.eliminarInventario)
router.post('/historial/',passport.authenticate('jwt', {session:false}), inventarioController.crearHistorial);
router.get('/historial/:id',passport.authenticate('jwt', {session:false}), inventarioController.obtenerUltimoHistorial);
router.get('/historial/producto/:id',passport.authenticate('jwt', {session:false}), inventarioController.obtenerHistorial);


module.exports = router;
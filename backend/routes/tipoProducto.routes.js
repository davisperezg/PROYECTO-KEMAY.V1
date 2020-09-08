const express = require('express');
const router = express.Router();
const tipoController = require('../controllers/tipoProducto.controller');


const passport = require('passport')

router.get('/',passport.authenticate('jwt', {session:false}), tipoController.listarTipo);
router.post('/',passport.authenticate('jwt', {session:false}), tipoController.crearTipo);
router.get('/:id',passport.authenticate('jwt', {session:false}), tipoController.obtenerTipo);
router.put('/:id',passport.authenticate('jwt', {session:false}), tipoController.actualizarTipo)
router.delete('/:id',passport.authenticate('jwt', {session:false}), tipoController.eliminarTipo)

module.exports = router;
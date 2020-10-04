const express = require('express');
const router = express.Router();
const renovacionController = require('../controllers/renovacion.controller');
const vencidoController = require('../controllers/vencidos.controller');


const passport = require('passport')

router.get('/',passport.authenticate('jwt', {session:false}), renovacionController.listarRenovacion);
router.get('/:id',passport.authenticate('jwt', {session:false}), renovacionController.obtenerRenovacion);
router.post('/',passport.authenticate('jwt', {session:false}), renovacionController.crearRenovacion);
router.put('/:id',passport.authenticate('jwt', {session:false}), renovacionController.actualizarRenovacion)
router.delete('/:id',passport.authenticate('jwt', {session:false}), renovacionController.eliminarRenovacion)

router.get('/vencido',passport.authenticate('jwt', {session:false}), vencidoController.listarVencido);


module.exports = router;
const express = require('express');
const router = express.Router();
const instalacionController = require('../controllers/instalacion.controller');


const passport = require('passport')

router.get('/operador/',passport.authenticate('jwt', {session:false}), instalacionController.listarOperador);
router.get('/tecnico/',passport.authenticate('jwt', {session:false}), instalacionController.listarTecnico);
router.post('/',passport.authenticate('jwt', {session:false}), instalacionController.crearInstalacion);
router.get('/:id',passport.authenticate('jwt', {session:false}), instalacionController.obtenerInstalacion);
router.get('/',passport.authenticate('jwt', {session:false}), instalacionController.listaInstalacion);
router.delete('/:id',passport.authenticate('jwt', {session:false}), instalacionController.eliminarInstalacion)
router.put('/:id',passport.authenticate('jwt', {session:false}), instalacionController.actualizarFechaIniFin);

module.exports = router;
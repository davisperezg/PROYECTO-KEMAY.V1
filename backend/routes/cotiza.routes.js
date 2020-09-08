const express = require('express');
const router = express.Router();
const cotizaController = require('../controllers/cotiza.controler');
const passport = require('passport')

router.post('/',passport.authenticate('jwt', {session:false}), cotizaController.crearCotiza);
router.post('/detalle',passport.authenticate('jwt', {session:false}), cotizaController.crearDetalle);
router.get('/:id',passport.authenticate('jwt', {session:false}), cotizaController.obtenerProforma);
router.get('/detalle/:id',passport.authenticate('jwt', {session:false}), cotizaController.obtenerDetalleProforma);

module.exports = router;
const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientes.controller');


const passport = require('passport')

router.get('/',passport.authenticate('jwt', {session:false}), clientesController.listarCliente_no_gps);
router.post('/',passport.authenticate('jwt', {session:false}), clientesController.crearCliente);
router.delete('/:id',passport.authenticate('jwt', {session:false}), clientesController.eliminarCliente)
router.get('/tipo',passport.authenticate('jwt', {session:false}), clientesController.listarTipodeCliente);

//gps
router.post('/gps/',passport.authenticate('jwt', {session:false}), clientesController.crearClienteGPS);
router.get('/gps/:id',passport.authenticate('jwt', {session:false}), clientesController.obtenerClienteGPS);

//fin gps

router.post('/tipo',passport.authenticate('jwt', {session:false}), clientesController.crearPlan);
router.delete('/tipo/:id',passport.authenticate('jwt', {session:false}), clientesController.eliminarPlan)
router.put('/tipo/:id',passport.authenticate('jwt', {session:false}), clientesController.actualizarPlan);
router.get('/tipo/:id',passport.authenticate('jwt', {session:false}), clientesController.listarValorTipo);

module.exports = router;
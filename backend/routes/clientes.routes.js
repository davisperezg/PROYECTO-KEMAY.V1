const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientes.controller');


const passport = require('passport')

router.get('/',passport.authenticate('jwt', {session:false}), clientesController.listarCliente_no_gps);
router.post('/',passport.authenticate('jwt', {session:false}), clientesController.crearCliente);
router.delete('/:id',passport.authenticate('jwt', {session:false}), clientesController.eliminarCliente)

module.exports = router;
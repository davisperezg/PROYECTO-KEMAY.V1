const express = require('express');
const router = express.Router();
const marcaController = require('../controllers/marca.controller');


const passport = require('passport')

router.get('/',passport.authenticate('jwt', {session:false}), marcaController.listarMarca);
router.post('/',passport.authenticate('jwt', {session:false}), marcaController.crearMarca);
router.get('/:id',passport.authenticate('jwt', {session:false}), marcaController.obtenerMarca);
router.put('/:id',passport.authenticate('jwt', {session:false}), marcaController.actualizarMarca)
router.delete('/:id',passport.authenticate('jwt', {session:false}), marcaController.eliminarMarca)


module.exports = router;
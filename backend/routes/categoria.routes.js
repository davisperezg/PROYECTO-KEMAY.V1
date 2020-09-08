const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoria.controller');


const passport = require('passport')

router.get('/',passport.authenticate('jwt', {session:false}), categoriaController.listarCategoria);
router.post('/',passport.authenticate('jwt', {session:false}), categoriaController.crearCategoria);
router.get('/:id',passport.authenticate('jwt', {session:false}), categoriaController.obtenerCategoria);
router.put('/:id',passport.authenticate('jwt', {session:false}), categoriaController.actualizarCategoria)
router.delete('/:id',passport.authenticate('jwt', {session:false}), categoriaController.eliminarCategoria)

module.exports = router;
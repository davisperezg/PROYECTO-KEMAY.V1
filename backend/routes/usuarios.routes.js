const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');
const passport = require('passport')

router.get('/',passport.authenticate('jwt', {session:false}), usuariosController.getUsuarios);
router.post('/',passport.authenticate('jwt', {session:false}), usuariosController.createUsuario);
router.post('/login', usuariosController.login);
router.get('/:id',passport.authenticate('jwt', {session:false}), usuariosController.getUsuario);
router.put('/:id',passport.authenticate('jwt', {session:false}), usuariosController.updateUsuario)
router.delete('/:id',passport.authenticate('jwt', {session:false}), usuariosController.deleteUsuario)


module.exports = router;
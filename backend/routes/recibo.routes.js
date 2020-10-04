const express = require('express');
const router = express.Router();
const reciboController = require('../controllers/recibos.controller');


const passport = require('passport')

router.get('/',passport.authenticate('jwt', {session:false}), reciboController.listarRecibo);
router.get('/:id',passport.authenticate('jwt', {session:false}), reciboController.obtenerRecibo);
router.post('/',passport.authenticate('jwt', {session:false}), reciboController.crearRecibo);
router.put('/:id',passport.authenticate('jwt', {session:false}), reciboController.actualizarRecibo)
router.delete('/:id',passport.authenticate('jwt', {session:false}), reciboController.eliminarRecibo)



module.exports = router;
const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculo.controller');
const passport = require('passport')

router.post('/',passport.authenticate('jwt', {session:false}), vehiculoController.crearVehiculo);

module.exports = router;
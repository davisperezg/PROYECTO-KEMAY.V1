//const Usuarios = require('../models/usuarios')
//const { json } = require('express')
const estrategiaJWT = require('passport-jwt').Strategy
const extractJWT = require('passport-jwt').ExtractJwt
const mysql = require('mysql')
//const dbconfig = require('../database')
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    port:'3306',
    database:'kemaytec_mydb'
})

//connection.query('USE '+dbconfig.database);

const options = {
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'token'
}

const strategy = new estrategiaJWT(options, (payload, done) => {

    connection.query('SELECT * FROM usuarios u INNER JOIN rol r ON u.id_rol = r.id_rol WHERE id_usuarios = ?', [payload.sub],(err, result) => {
        if(err) return console.log('ERROR EN ESTRATEGIA JWT')
        if (result) {
           return done(null, result)
        }else{
           return done(null, false)
        }
    }) 
     /**
     *
    Usuarios.findOne({_id:payload.sub})
        .then((user) => {
            if(user){
                return done(null, user)
            }else{
                return done(null, false)
            }
        })
        .catch(err => done(err, null))
     */
})

module.exports = (passport) =>{
    passport.use(strategy)
}
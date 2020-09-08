const jsonwebtoken = require('jsonwebtoken');

const PRIV_KEY = 'token';

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */

function issueJWT(user) {
  //console.log(user.id_usuarios)
  //var ObjectId = user.id_usuarios.toString()
  const _id = user.id_usuarios;

  const expiresIn = '1d';

  const payload = {
    sub: _id,
    iat: Date.now()
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn});

  return {
    token: signedToken,
    expires: expiresIn
  }
}

/**
 * var obtenerDatosToken = async function(token) { 
    const user = await Usuarios.findOne({_id:token})
    const usuarioConsultando = user.nombre_completo+' '+user.apellido_paterno;
    const rol =  await Roles.findOne({_id:user.roles})
    const rolConsultando = rol.nombre

    return {usuarioConsultando, rolConsultando}
}

var mensajeConsola = async function(rolConsultando, usuarioConsultando, mensaje) { 
    let now= new Date();
    const consola =console.log('El día '+now.getDate()+'-'+(now.getMonth()+1)+'-'+now.getFullYear()+' a las '+
                        now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+
                            ' area '+rolConsultando+': '+usuarioConsultando+' '+mensaje)

    return {consola}
}
 */

//module.exports.mensajeConsola = mensajeConsola;
//module.exports.obtenerDatosToken = obtenerDatosToken;
module.exports.issueJWT = issueJWT;
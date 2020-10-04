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
function fechaActual(){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  var fecha = yyyy+'-'+mm+'-'+dd
  return fecha;
}
function sumaFecha(d, fechaRecibida){
  var Fecha = new Date();
  var sFecha = fechaRecibida || (Fecha.getFullYear() + "/" + (Fecha.getMonth() +1) + "/" + Fecha.getDate());
  var sep = sFecha.indexOf('/') != -1 ? '/' : '-';
  var aFecha = sFecha.split(sep);
  var fecha = aFecha[0]+'/'+aFecha[1]+'/'+aFecha[2];
  fechaRecibida= new Date(fecha);
  fechaRecibida.setDate(fechaRecibida.getDate()+parseInt(d));
  var anno=fechaRecibida.getFullYear();
  var mes= fechaRecibida.getMonth()+1;
  var dia= fechaRecibida.getDate();
  mes = (mes < 10) ? ("0" + mes) : mes;
  dia = (dia < 10) ? ("0" + dia) : dia;
  var fechaFinal = anno+sep+mes+sep+dia;
  return (fechaFinal);
}
function dateformat2aux(fechaAux){
  var today = new Date(fechaAux);
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  var fecha = yyyy+'-'+mm+'-'+dd
  return fecha;
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
module.exports.dateformat2aux = dateformat2aux;
module.exports.fechaActual = fechaActual;
module.exports.sumaFecha = sumaFecha;
module.exports.issueJWT = issueJWT;
//const Usuarios = require('../models/usuarios');
const usuariosController = {};
const bcrypt  = require('bcrypt')
const saltRounds = 10;
const utils = require('../lib/utils')
//const Roles = require('../models/roles')

usuariosController.getUsuarios =  async (req, res) => {
    /**
     * utils.obtenerDatosToken(req.user._id).then(async function(result) {
        const usuarioConsultando = result.usuarioConsultando
            if(result.rolConsultando === 'Administrador'){
                //fin log consulta        
                const mensaje = 'realizó una consulta a los usuarios'
                await Usuarios.find().then(function(usuarios){
                utils.mensajeConsola(result.rolConsultando, result.usuarioConsultando, mensaje).
                        then(function(result){
                            res.status(200).json({
                                usuarioConsultando, //muestra resultados del log 
                                usuarios 
                            });
                        })
                })
            }else{
                const mensaje = 'intentó consultar a los usuarios'
                utils.mensajeConsola(result.rolConsultando, result.usuarioConsultando, mensaje).
                    then(function(result) {
                        res.status(401).json({success:false, message:'Permiso denegado',usuarioConsultando})
                    })
            }
        })   
     */
}

usuariosController.getUsuario = async function(req, res) {
/**
 * 
    utils.obtenerDatosToken(req.user._id).then(async function(result) {
        const usuarioConsultando = result.usuarioConsultando
         if(result.rolConsultando === 'Administrador'){
             try{
                const mensaje = 'consultó a un usuario'    
                const datos = await Usuarios.findById(req.params.id)
                utils.mensajeConsola(result.rolConsultando, result.usuarioConsultando, mensaje).
                    then(function(result) {
                        res.json({
                            usuarioConsultando,
                            datos
                            });
                        }).catch(function(e){
                            //validaciones
                            //res.status(500).send('El servidor no pudo encontrar un usuario')
                        });
             }catch{
                const mensaje = 'intentó consultar un usuario'
                utils.mensajeConsola(result.rolConsultando, result.usuarioConsultando, mensaje).
                    then(function(result) {
                        return res.status(500).json('El servidor no pudo encontrar un usuario')
                    })
             }
    }else{
        const mensaje = 'intentó consultar un usuario'
           utils.mensajeConsola(result.rolConsultando, result.usuarioConsultando, mensaje).
                then(function(result) {
                   return res.status(401).json({success:false, message:'Permiso denegado',usuarioConsultando})
                })
        }   
    })   
 */
}

usuariosController.createUsuario =  async (req, res) => {
        if(req.body.contrasenia.length <= 6 || req.body.contrasenia === undefined){
            return res.status(400).json('Error la contraseña debe ser mayor a seis caracteres !')
        }else if(req.body.repita_contrasenia.length <= 6 || req.body.repita_contrasenia === undefined){
            return res.status(400).json('Error repetir contraseña debe ser mayor a seis caracteres!')
        }else{
            if(req.body.contrasenia === req.body.repita_contrasenia){
                //Genera un salt
                const salt =  await bcrypt.genSalt(saltRounds);
                //Genera una contrasenia hash (salt + hash)
                const passwordHash = await bcrypt.hash(req.body.contrasenia, salt);
                //Reasignando hashed a la contrasenia de texto plano
                this.contrasenia  = passwordHash;

                const myuser = {
                    contrasenia:this.contrasenia,
                    repita_contrasenia:this.contrasenia,
                    email:req.body.email,
                    nombres:req.body.nombres,
                    apellidos:req.body.apellidos,
                    id_rol:req.body.id_rol
                }
                if(myuser.nombres === '' || myuser.nombres === undefined){
                    return res.status(400).json('Error completar nombres !')
                }else if(myuser.apellidos === '' || myuser.apellidos === undefined){
                    return res.status(400).json('Error completar apellidos !')
                }else if(myuser.email === '' || myuser.email === undefined){
                    return res.status(400).json('Error completar email !')
                }else if(myuser.id_rol === '' || myuser.id_rol === undefined){
                    return res.status(400).json('Error seleccionar el rol !')
                }
                else{

                req.getConnection((err, connection) => {
                    //validaciones
                        const query = connection.query('INSERT INTO usuarios set ?', myuser, (err, user) => {
                            if(err){
                                res.status(400).json({mensaje:'No puede registrar un correo existente'})
                            }else{
                                res.status(200).json({mensaje:'Usuario registrado'})
                            }
                        })
                })
                }
        }else{
            return res.status(400).json('Error la contraseña no coincide !')
        }
    }
}

usuariosController.login = async (req, res, next) => {
        try{
        const { email, contrasenia} = req.body; //RECIBO PARAMETRO
        req.getConnection((err, conn) => {
            //query
            conn.query('SELECT * FROM usuarios u INNER JOIN rol r ON u.id_rol = r.id_rol WHERE u.email = ? ',[email],(err, user) => {
            const data = user
             if (err) {
              return res.status(500).json(err);
             }
             try{
                if(email === data[0].email) {
                    bcrypt.compare(contrasenia, data[0].contrasenia,async (err, isMatch) => {
                        if(err){
                            return res.status(500).json('Error en el servidor al comparar contraseña')
                        }else if(isMatch == true){
                            const tokenObject = utils.issueJWT(data[0])
                            const info = {
                                ID:data[0].id_usuarios,
                                email: data[0].email,
                                datos: data[0].nombres +' '+data[0].apellidos,
                                rol: data[0].nombre,
                                des_rol: data[0].descripcion 
                            } 
                            return res.status(200).json({success:true, key:tokenObject, info})
                        }else{
                            return res.status(400).json('Contraseña erronea ')
                        }  
                    });
                }
             }catch(err){
                 //VALIDANDO QUE EL CORREO NO EXISTE
                return res.status(400).json('Correo no existe')
             }
            });
          });
         
    }catch{
        return res.status(500).json('error del servidor al logearse')
    }
   
}

usuariosController.updateUsuario =  async function(req, res) {
    /**
     * const { id } = req.params;
    const usuarios = {
                nombre_completo: req.body.nombre_completo,
                apellido_paterno: req.body.apellido_paterno,
                apellido_materno: req.body.apellido_materno,
                roles: req.body.roles,
                email:req.body.email,
                contrasenia:req.body.contrasenia,
                nameroles:req.body.nameroles
            }
    utils.obtenerDatosToken(req.user._id).then(function(result) {
         //console.log(result.consola)
         const usuarioConsultando = result.usuarioConsultando
         if(result.rolConsultando === 'Administrador'){
            const mensaje = 'actualizó un usuario'
            try{
                bcrypt.hash(usuarios.contrasenia, saltRounds, async function() {
                    const salt = await bcrypt.genSalt(saltRounds);
                    const passwordHash = await bcrypt.hash(usuarios.contrasenia, salt);
                    usuarios.contrasenia  = passwordHash;
                    await Usuarios.findByIdAndUpdate(id, {$set: usuarios}, {new : true}).then(function(err){
                       // if(usuarios.roles)
                       utils.mensajeConsola(result.rolConsultando, result.usuarioConsultando, mensaje).
                        then(function(result) {
                            res.status(200).json('Usuario actualizado')
                        })
                    }).catch(function(e){
                        //ingresar aqui validaciones
                        const mensaje = 'intentó actualizar un usuario ingresando un correo que ya existe'
                        utils.mensajeConsola(result.rolConsultando, result.usuarioConsultando, mensaje).
                            then(function(result) {
                                res.status(400).json('El servidor encontró un correo que ya existe')
                            })
                    });    
                });
            }catch{
                res.status(500).json('El servidor encontró un problema al actualizar usuario')
            }
         }else{
            const mensaje = 'intentó actualizar un usuario'
            utils.mensajeConsola(result.rolConsultando, result.usuarioConsultando, mensaje).
                then(function(result) {
                    res.status(401).json({success:false, message:'Permiso denegado',usuarioConsultando})
                })
         }
    })
     */
}

usuariosController.deleteUsuario =  async function(req, res) {
 /**
  * utils.obtenerDatosToken(req.user._id).then(async function(result) {
        const usuarioConsultando = result.usuarioConsultando
            if(result.rolConsultando === 'Administrador'){
                const mensaje = 'eliminó un usuario'
                    try{
                        await Usuarios.findByIdAndRemove(req.params.id).then(function(err){
                                utils.mensajeConsola(result.rolConsultando, result.usuarioConsultando, mensaje, result.myid).
                                    then(function(result) {
                                       return res.status(200).json('Usuario eliminado')
                                    })//validar catch
                                })
                        
                    }catch{
                        return  res.status(500).json('El servidor encontró un problema al actualizar usuario')
                    }
            }else{
                const mensaje = 'intentó eliminar un usuario'
                utils.mensajeConsola(result.rolConsultando, result.usuarioConsultando, mensaje).
                    then(function(result) {
                        return  res.status(401).json({success:false, message:'Permiso denegado',usuarioConsultando})
                })
         }
    })
  */
}


module.exports = usuariosController;

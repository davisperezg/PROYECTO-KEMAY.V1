const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt  = require('bcrypt')
const saltRounds = 10;

const UsuariosSchema = new Schema({
    nombre_completo: { type:String, required:true },
    apellido_paterno:{ type:String, required:true },
    apellido_materno:{ type:String, required:true },
    roles: {type:Schema.Types.ObjectId, ref:'roles', required:true},
    email:{ type:String, required:true, unique:true, lowercase:true},   
    contrasenia:{ type:String, required:true },
    nameroles:{ type:String, required:true },
   
},{ timestamps: true });

UsuariosSchema.pre('save', async function(next){
    const usuario = this;
    try{    
        if (!usuario.isModified('contrasenia')) {
            return next();
        }
        //Genera un salt
        const salt =  await bcrypt.genSalt(saltRounds);
        //Genera una contrasenia hash (salt + hash)
        const passwordHash = await bcrypt.hash(this.contrasenia, salt);
        //Reasignando hashed a la contrasenia de texto plano
        this.contrasenia  = passwordHash;
        next();

    }catch(error){
        next(error);
    }
});

//Exportar para usar en otra parte de mi aplicación
module.exports = mongoose.model('Usuarios', UsuariosSchema);
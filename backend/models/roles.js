const mongoose = require('mongoose');
const { Schema } = mongoose;

const RolesSchema = new Schema({
    nombre: { type:String, required:true }
});

//Exportar para usar en otra parte de mi aplicación
module.exports = mongoose.model('Roles', RolesSchema);
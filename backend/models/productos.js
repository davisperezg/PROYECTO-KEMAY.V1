const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductoSchema = new Schema({
  categoria:{ type:Schema.Types.ObjectId, ref:'categoria', required:true},
  tipo:{ type:Schema.Types.ObjectId, ref:'tipoProducto', required:true},
  marca:{ type:Schema.Types.ObjectId, ref:'marca', required:true },
  modelo: {type:String, required:true},
  nombre: { type:String, required:true },
  descripcion:{ type:String, required:true },
  precio:{ type:String, required:true, unique:true, lowercase:true}
  
  },{ timestamps: true });
  module.exports = mongoose.model('Productos', ProductoSchema);                                                                                                                                                                                                                   
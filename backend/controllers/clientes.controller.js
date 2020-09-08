const clientesController = {};

clientesController.listarCliente_no_gps = async (req, res) => {
    req.getConnection((err, conn) => {
        //validaciones

        //query
        conn.query('SELECT * FROM clientes_no_gps', (err, clientes) => {
         if (err) {
          res.status(500).json(err);
         }
         res.status(200).json(clientes)
        });
      });
}
clientesController.crearCliente =  async (req, res) => {
  const data = {
    nombres:req.body.nombres,
    apellidos:req.body.apellidos,
    tipo_documento:req.body.tipo_documento,
    numero_documento:req.body.numero_documento,
    direccion:req.body.direccion,
    telefono:req.body.telefono,
    celular:req.body.celular
  }
    
  if(data.nombres === ''){
    return res.status(400).json('Error completar nombres !')
  }else if(data.apellidos === ''){
    return res.status(400).json('Error completar apellidos !')
  }else if(data.tipo_documento === ''){
    return res.status(400).json('Error seleccionar documento !')
  }else if(data.numero_documento === ''){
    return res.status(400).json('Error completar número del documento !')
  }else if(data.direccion === ''){
    return res.status(400).json('Error completar dirección !')
  }else if(data.celular === ''){
    return res.status(400).json('Error completar celular !')
  }else{
  //VALIDACIONES EXPRESIONES REGULARES SI ES QUE HAY
    
  //SINO EJECUTA SCRIPT
  req.getConnection((err, connection) => {
  
  console.log('DETECTANDO ERRORES: '+err)
  const query = connection.query('INSERT INTO clientes_no_gps set ?', data, (err, clientes) => {
      if(err){  
        console.log(err.sqlMessage)
        var cadena = err.sqlMessage
        var CelularUnico = cadena.substr(-13,12)
          if(CelularUnico === 'CelularUnico'){
            return res.status(400).json('Error Celular duplicado !')
          }else{
            var NroDocumentoUnico = cadena.substr(-18,17)
            if(NroDocumentoUnico === 'NroDocumentoUnico'){
              return res.status(400).json('Error Nro. Documento duplicado !')
            }else{
              var TelefonoUnico = cadena.substr(-14,13)
              if(TelefonoUnico === 'TelefonoUnico'){
                return res.status(400).json('Error Nro. Telefono duplicado !')
              }else{
                return res.status(400).json('Problema interno, intente más tarde')
              }
            } 
          }
        }else{
            return res.status(200).json('Cliente Registrado')
        }
        //console.log(categoria)
      
      })
    })
  }
}
clientesController.eliminarCliente = async function(req, res) {
  const { id } = req.params;
  req.getConnection((err, connection) => {
  //validaciones

    connection.query('DELETE FROM clientes_no_gps WHERE id_clientes = ?', [id], (err, rows) => {
      if(err){
          return res.status(400).json('El cliente presenta proformas. No se puede eliminar');
      }else{
          return res.status(200).json('Cliente Eliminado');
      }
    });
  });
}
module.exports = clientesController;

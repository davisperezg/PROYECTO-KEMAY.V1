const clientesController = {};

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today =  yyyy+'-'+mm+'-'+dd;

clientesController.listarTipodeCliente = async (req, res) => {
  req.getConnection((err, conn) => {
      //validaciones
     
      //query
      conn.query('SELECT id_tipo_cliente as idTipo, tipo as plan, valor as valPlan, descripcion as desVal, dias as dias FROM tipo_cliente', (err, listTipo) => {
       if (err) {
        res.status(500).json(err);
       }
       res.status(200).json(listTipo)
      });
    });
}

clientesController.listarValorTipo= async (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {

      conn.query('SELECT tc.valor as idTip, tc.dias  FROM tipo_cliente tc where tc.id_tipo_cliente = ?',[id],(err, listTipo) => {
       if (err) {
        res.status(500).json(err);
       }
       res.status(200).json(listTipo)
      });
    });
}
clientesController.crearPlan =  async (req, res) => {
  
  const data = req.body
  const dataAux = {
    tipo:data.plan,
    descripcion:data.desPlan,
    valor:data.valPlan,
    dias:data.dias
  }
  //console.log(req.body)
  req.getConnection((err, connection) => {
  //validaciones

  const query = connection.query('INSERT INTO tipo_cliente set ?', dataAux, (err, tipo) => {
      if(err){
          return res.status(400).json('Problema interno, intente más tarde')
      }else{
          return res.status(200).json('Tipo de Plan Registrado')
      }
      //console.log(categoria)
      
  })
})
  
}
clientesController.actualizarPlan = async function(req, res) {
  const { id } = req.params;
  const data = req.body
  const dataAux = {
    tipo:data.plan,
    descripcion:data.desPlan,
    valor:data.valPlan,
    dias:data.dias
  }
  req.getConnection((err, conn) => {
      //validaciones
      conn.query('UPDATE tipo_cliente set ? where id_tipo_cliente = ?', [dataAux, id], (err, rows) => {
          return res.status(200).json('Tipo de Plan Actualizado');
      });
  });
}
 
clientesController.eliminarPlan = async function(req, res) {
  const { id } = req.params;
  req.getConnection((err, connection) => {
  //validaciones
    connection.query('DELETE FROM tipo_cliente WHERE id_tipo_cliente = ?', [id], (err, rows) => {
      if(err){
          return res.status(400).json('El plan está asociado a un cliente');
      }else{
          return res.status(200).json('Tipo de Plan Eliminado');
      }
    });
  });
}
//CLIENTE GPS
clientesController.obtenerClienteGPS = async function(req, res) {
  const { id } = req.params;
  req.getConnection((err, connection) => {
  //validaciones
  const query = connection.query('SELECT c.*, tc.valor  FROM cliente c inner join tipo_cliente tc on tc.id_tipo_cliente = c.id_tipo_cliente WHERE c.numero_identificacion = ?', [id], (err, cliente) => {
      if(err) return res.status(400).json(err); 
      if(cliente.length > 0){
        return res.status(200).json({state:'true', message:'El sistema encontró un cliente existente', data:cliente});
      }else{ 
        return res.status(200).json({state:'false'});
      } 
    }) 
  })
}

clientesController.crearClienteGPS =  async (req, res) => {
  const data = req.body
  const dataAux = {
    nombres:                data.name+' '+data.fl_name, //not null
    direccion:              data.direction,
    celular:                data.cel, //not null, unique
    celular_opcional:       data.cel2,
    fecha_creada:           today,
    id_tipo_cliente:        data.plan,
    tipo_identificacion:    data.tipIden,
    numero_identificacion:  data.numIden //not null, unique
  }
  if(dataAux.numero_identificacion === ''){
    return res.status(400).json('Error completar Número de Documento !')
  }else if(dataAux.celular === ''){
    return res.status(400).json('Error completar Celular !')
  }else if(data.name === '' || data.fl_name === null && data.fl_name === '' || data.fl_name === null){
    return res.status(400).json('Error completar Nombres y/o Razón social !')
  }else{
  console.log(dataAux.nombres)
  req.getConnection((err, connection) => {
  const query = connection.query('INSERT INTO cliente set ?', dataAux, (err, clientes) => {
      if(err){      
        var cadena = err.sqlMessage
        var NroDocumentoUnico = cadena.substr(-9,8)
        if(NroDocumentoUnico === 'NumUnico'){
          return res.status(400).json('Este cliente ya ha sido registrado !')
        }else{
          var CelUnico = cadena.substr(-9,8)  
            if(CelUnico === 'CelUnico'){
              return res.status(400).json('Hay un cliente existente con este número de celular registrado !')
            }
            console.log(err)
            return res.status(400).json('Problema interno, intente más tarde')
          }
        }else{
            return res.status(200).json({message:'Cliente registrado correctamente.',data:clientes.insertId})
        }      
      })
    })
  }
}
//FIN CLIENTE GPS

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
  console.log(data)
  if(data.tipo_documento === ''){
    return res.status(400).json('Error seleccionar documento !')
  }else if(data.numero_documento === ''){
    return res.status(400).json('Error completar número del documento !')
  }else{
  //VALIDACIONES EXPRESIONES REGULARES SI ES QUE HAY
    
  //SINO EJECUTA SCRIPT
  req.getConnection((err, connection) => {
  
  const query = connection.query('INSERT INTO clientes_no_gps set ?', data, (err, clientes) => {
      if(err){  
        
        var cadena = err.sqlMessage
        //var CelularUnico = cadena.substr(-13,12)
        //  if(CelularUnico === 'CelularUnico' && clientes){
        //    return res.status(400).json('Error Celular duplicado !')
        //  }else{
            var NroDocumentoUnico = cadena.substr(-18,17)
            if(NroDocumentoUnico === 'NroDocumentoUnico'){
              return res.status(400).json('Error Nro. Documento duplicado !')
            }else{
              //var TelefonoUnico = cadena.substr(-14,13)
              //if(TelefonoUnico === 'TelefonoUnico' && clientes){
              //  return res.status(400).json('Error Nro. Telefono duplicado !')
              //}else{
                console.log(err)
                return res.status(400).json('Problema interno, intente más tarde')
             // }
              
           // } 
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

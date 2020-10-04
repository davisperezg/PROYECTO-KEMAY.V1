const instalacionController = {};
const utils = require('../lib/utils')

instalacionController.eliminarInstalacion = async function(req, res) {
  const { id } = req.params;
  req.getConnection((err, connection) => {
  //validaciones

    connection.query('DELETE FROM instalacion WHERE id_instalacion = ?', [id], (err, rows) => {
      if(err){
          console.log(err)
          return res.status(400).json('Error al eliminar una instalación');
      }else{
          return res.status(200).json('Instalación eliminada');
      }
    });
  });
}

instalacionController.obtenerInstalacion= async (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {

      conn.query('select c.nombres, i.fecha_inicio as fechIni, i.fecha_termino as fechTer, i.usuario as username, ' +
      'i.contrasenia as password , i.numero_operador as numOpe,v.placa as placa ' +
      'from instalacion i inner join vehiculo v on i.id_vehiculo = v.id_vehiculo inner join cliente c on c.id_cliente = v.id_cliente ' +
      'where i.id_instalacion = ?',[id],(err, listTipo) => {
       if (err) {
        res.status(500).json(err);
       }
       res.status(200).json(listTipo)
      });
    });
}
instalacionController.listaInstalacion = async (req, res) => {
  req.getConnection((err, conn) => {
      //validaciones
      //query
      conn.query('SELECT c.id_cliente as idCli, i.id_instalacion as idIns,tc.id_tipo_cliente as idTip,tc.dias as dias,tc.tipo as nomTip, c.nombres,c.direccion,concat(c.celular," ",c.celular_opcional) as contacto, DATE_FORMAT(i.fecha_inicio,"%d-%m-%Y") as fechIni, DATE_FORMAT(i.fecha_termino,"%d-%m-%Y") as fechTer, i.usuario as username, ' +
      'i.contrasenia as password , i.numero_operador as numOpe,v.placa as placa, v.id_vehiculo as idVeh ' +
      'from instalacion i inner join vehiculo v on i.id_vehiculo = v.id_vehiculo inner join cliente c on c.id_cliente = v.id_cliente inner join tipo_cliente tc on tc.id_tipo_cliente = c.id_tipo_cliente order by c.id_cliente desc', (err, insta) => {
       if (err) {
        res.status(500).json(err);
       }
       res.status(200).json(insta)
      });
    });
}

instalacionController.listarOperador = async (req, res) => {
    req.getConnection((err, conn) => {
        //validaciones
        //query
        conn.query('SELECT o.id_operador as idOpe, o.nombre as nom FROM operador o', (err, operador) => {
         if (err) {
          res.status(500).json(err);
         }
         res.status(200).json(operador)
        });
      });
}
instalacionController.listarTecnico = async (req, res) => {
    req.getConnection((err, conn) => {
        //validaciones
        //query
        conn.query('SELECT t.id_tecnico_gps as idTec, t.nombre as nom, t.numero as num FROM tecnico_gps t', (err, operador) => {
         if (err) {
          res.status(500).json(err);
         }
         res.status(200).json(operador)
        });
      });
}
instalacionController.actualizarFechaIniFin  = async function(req, res) {
  const { id } = req.params;
  const data = req.body
  console.log(data)
  const dataFechas = {
    fecha_inicio : utils.dateformat2aux(data.fechIni),
    fecha_termino : utils.dateformat2aux(data.fechTer)
  }
  console.log(dataFechas)
  //obtener fecha
  //enviar datos del historial
  req.getConnection((err, conn) => {
      //validaciones
      conn.query('update instalacion set ?  where id_instalacion = '+data.id, [dataFechas, id], (err, rows) => {
          if(err) {
              console.log(err)
              return res.status(400).json('Problema interno, intente más tarde')
          }else{
              if(rows.protocol41 === true){
                  console.log('fechas actualizadas :)')
                  return res.status(200).json('Fecha Actualizada');
              }     
          }
      });
  });
}

instalacionController.crearInstalacion =  async (req, res) => {
  //var fecha = this.sumaFecha(7,'01/07/2014');
  //alert(fecha);

    const data = req.body
    console.log(data)
    const dataAux = {
        id_vehiculo:data.idVeh,
        id_usuarios:data.idUsu,
        id_tecnico_gps:data.idTec,
        id_operador:data.idOpe,
        fecha_inicio:utils.fechaActual(),
        fecha_termino:utils.sumaFecha(data.dias,utils.fechaActual()),
        usuario:data.username,
        contrasenia:data.password,
        numero_operador:data.numOpe,
        chip_compro:data.chip,
        id_tipo_producto:data.idTip,
        fecha_creada:data.fechCre
    }
    console.log(dataAux)
    //console.log(req.body)
    req.getConnection((err, connection) => {
    //validaciones
  
    const query = connection.query('INSERT INTO instalacion set ?', dataAux, (err, ins) => {
              if(err){
                
                var cadena = err.sqlMessage
                var NroDocumentoUnico = cadena.substr(-9,8)
                if(NroDocumentoUnico === 'NumUnico'){
                  return res.status(400).json({message:'Este número del operador ya ha sido registrado !',code:'num'})
                }else{
                  var cadena = err.sqlMessage
                  var idVehiculo = cadena.substr(-9,8)
                  if(idVehiculo === 'VehUnico'){
                    return res.status(400).json({message:'Este vehiculo ya ha sido registrado !',code:'veh'})
                  }
                  
                  return res.status(400).json('Problema interno, intente más tarde')
                }
              }else{
                  return res.status(200).json({message:'Instalación Registrada.',data:ins.insertId})
              }      
          })
      })
    
  }

  
  function fechaSiguiente(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear()+1;
    var fecha = yyyy+'-'+mm+'-'+dd
    return fecha;
  }


module.exports = instalacionController;

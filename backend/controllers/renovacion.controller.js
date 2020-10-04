const renovacionController = {};
const utils = require('../lib/utils')

renovacionController.listarRenovacion = async (req, res) => {
    req.getConnection((err, conn) => {
        //validaciones

        //query
        conn.query('SELECT * FROM renovacion', (err, renovacion) => {
         if (err) {
          res.status(500).json(err);
         }
         res.status(200).json(renovacion)
        });
      });
}
renovacionController.crearRenovacion = async (req, res) => {
    const data = req.body;
    var calDias = (data.cantCuo * data.dias)
    const dataAux = {
        fecha_inicio:utils.fechaActual(),
        fecha_termino:utils.sumaFecha(calDias,utils.fechaActual()),
        id_vehiculo:data.veh,
        fecha_antigua:data.fechAnti,
        tipo_cli:data.tip
    }
    if(utils.fechaActual() <= dataAux.fecha_antigua){
        return res.status(400).json({message:'El cliente tiene una renovación pendiente',status:false})
    }else{
        req.getConnection((err, connection) => {
            //validaciones
        
            const query = connection.query('INSERT INTO renovacion set ?', dataAux, (err, renovacion) => {
                if(err){
                    console.log(err)
                    //var cadena = err.sqlMessage
                    //var NombreUnico = cadena.substr(-12,11)
                    //console.log(NombreUnico)
                    //if(NombreUnico === 'NombreUnico'){
                        return res.status(400).json('Error al insertar renovación !')
                    //  }
                }else{
                    return res.status(200).json({message:'Renovacion registrada',data:renovacion.insertId})
                }
                
            })
          })
    }
}

renovacionController.obtenerRenovacion = async function(req, res) {
    const { id } = req.params;
    req.getConnection((err, connection) => {
    //validaciones

    const query = connection.query('SELECT * FROM renovacion WHERE id_renovacion = ?', [id], (err, renovacion) => {
        //console.log(categoria)
        res.status(200).json(renovacion) 
    })
  })
}

renovacionController.actualizarRenovacion = async function(req, res) {
    const { id } = req.params;
    const newRenovacion = req.body;
    req.getConnection((err, conn) => {
        //validaciones

        conn.query('UPDATE renovacion set ? where id_renovacion = ?', [newRenovacion, id], (err, rows) => {
            return res.status(200).json('Renovacion actualizada');
        }); 
    });
}

renovacionController.eliminarRenovacion = async function(req, res) {
    const { id } = req.params;
    req.getConnection((err, connection) => {
    //validaciones
 
      connection.query('DELETE FROM renovacion WHERE id_renovacion = ?', [id], (err, rows) => {
        if(err){
            return res.status(400).json('Error al eliminar renovacion');
        }else{
            return res.status(200).json('Renovacion eliminada');
        }
      });
    });
}



module.exports = renovacionController;

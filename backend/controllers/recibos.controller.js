const recibosController = {};


recibosController.listarRecibo = async (req, res) => {
    req.getConnection((err, conn) => {
        //validaciones

        //query
        conn.query('SELECT * FROM recibos', (err, renovacion) => {
         if (err) {
          res.status(500).json(err);
         }
         res.status(200).json(renovacion)
        });
      });
}
recibosController.crearRecibo = async (req, res) => {
    const data = req.body;

    const dataAux = {
        tip:data.tip,
        id_cliente:data.idCli,
        id_vehiculo:data.idVeh,
        fecha:data.fecha,
        cuenta:data.cuenta,
        resta:data.resta,
        total:data.total,
        cantcuotas:data.cantCuo
    }
    req.getConnection((err, connection) => {
    //validaciones

    const query = connection.query('INSERT INTO recibos set ?', dataAux, (err, recibo) => {
        if(err){
            //var cadena = err.sqlMessage
            //var NombreUnico = cadena.substr(-12,11)
            //console.log(NombreUnico)
            //if(NombreUnico === 'NombreUnico'){
                console.log(err)
                return res.status(400).json('Error al insertar recibos !')
            //  }
        }else{
            //console.log()
            return res.status(200).json({message:'Recibo registrado',data:recibo.insertId})
        }
        
    })
  })
    
}

recibosController.obtenerRecibo = async function(req, res) {
    const { id } = req.params;
    req.getConnection((err, connection) => {
    //validaciones
        
    const query = connection.query('SELECT * FROM recibos WHERE id_recibos = ?', [id], (err, renovacion) => {
        //console.log(categoria)
        if(err) return res.status(400).json('Problema interno, intente más tarde') 
        res.status(200).json(renovacion) 
    })
  })
}

recibosController.actualizarRecibo = async function(req, res) {
    const { id } = req.params;
    const newRecibo = req.body;
    req.getConnection((err, conn) => {
        //validaciones

        conn.query('UPDATE recibos set ? where id_recibos = ?', [newRecibo, id], (err, rows) => {
            return res.status(200).json('Recibo actualizado');
        }); 
    });
}

recibosController.eliminarRecibo = async function(req, res) {
    const { id } = req.params;
    req.getConnection((err, connection) => {
    //validaciones
 
      connection.query('DELETE FROM recibos WHERE id_recibos = ?', [id], (err, rows) => {
        if(err){
            return res.status(400).json('Error al eliminar renovacion');
        }else{
            return res.status(200).json('Recibo eliminada');
        }
      });
    });
}
module.exports = recibosController;

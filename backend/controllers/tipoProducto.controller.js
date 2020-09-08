const tipoController = {};
const utils = require('../lib/utils')

tipoController.listarTipo = async (req, res) => {
    req.getConnection((err, conn) => {
        //validaciones

        //query
        conn.query('SELECT tp.* , c.nombre as categoria FROM tipo_producto tp INNER JOIN categoria c '+
        'on c.id_categoria = tp.id_categoria', (err, tipo_producto) => {
         if (err) {
          res.status(500).json(err);
         }
         res.status(200).json(tipo_producto)
        });
      });
}
tipoController.crearTipo = async (req, res) => {
    const data = req.body;
    //console.log(req.body)
    req.getConnection((err, connection) => {
    //validaciones

    const query = connection.query('INSERT INTO tipo_producto set ?', data, (err, tipo_producto) => {
        
        if(err){
            var cadena = err.sqlMessage
            var NombreUnico = cadena.substr(-12,11)
            //console.log(NombreUnico)
            if(NombreUnico === 'NombreUnico'){
                return res.status(400).json('Error nombre de Tipo Producto/Servicio duplicada !')
              }
        }else{
            return res.status(200).json('Tipo de producto registrado');
        }

    })
  })
}

tipoController.obtenerTipo = async function(req, res) {
    const { id } = req.params;
    req.getConnection((err, connection) => {
    //validaciones

    const query = connection.query('SELECT * FROM tipo_producto WHERE id_tipo_producto = ?', [id], (err, tipo_producto) => {
        //console.log(tipo_producto)
        return res.status(200).json(tipo_producto);
    })
  })
}

tipoController.actualizarTipo = async function(req, res) {
    const { id } = req.params;
    const newTipo = req.body;
    req.getConnection((err, conn) => {
        //validaciones

        conn.query('UPDATE tipo_producto set ? where id_tipo_producto = ?', [newTipo, id], (err, rows) => {
            return res.status(200).json('Tipo Actualizada');
        });
    });

}

tipoController.eliminarTipo = async function(req, res) {
    const { id } = req.params;
    req.getConnection((err, connection) => {
    //validaciones
 
      connection.query('DELETE FROM tipo_producto WHERE id_tipo_producto = ?', [id], (err, rows) => {
        if(err){
            return res.status(400).json('PRIMERO ELIMINE LA MARCA RELACIONADO A ESTE TIPO DE PRODUCTO');
        }else{
            return res.status(200).json('Tipo Eliminado');
        }
      });
    });
}


module.exports = tipoController;
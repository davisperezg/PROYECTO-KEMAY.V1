const marcaController = {};
const utils = require('../lib/utils')



marcaController.listarMarca = async (req, res) => {
    req.getConnection((err, conn) => {
        //validaciones

        //query
        conn.query('SELECT m.* , tp.nombre as tipo_producto FROM marca m INNER JOIN tipo_producto tp ON m.id_tipo_producto = tp.id_tipo_producto', (err, marca) => {
         if (err) {
          res.status(500).json(err);
         }
         res.status(200).json(marca)
        });
      });
}

marcaController.crearMarca = async (req, res) => {
    const data = req.body;
    //console.log(req.body)
    req.getConnection((err, connection) => {
    //validaciones

    const query = connection.query('INSERT INTO marca set ?', data, (err, marca) => {
        if(err){
            //var cadena = err.sqlMessage
            //var NombreUnico = cadena.substr(-12,11)
            //console.log(NombreUnico)
            //console.log(data.id_tipo_producto)
            //if(data.id_tipo_product == data.id_tipo_product && NombreUnico === 'NombreUnico'){
             //   return res.status(400).json('Error nombre de Marca duplicada !')
             // }
             return res.status(400).json('Error al registrar Marca !')
        }else{
            //console.log(marca)
            return res.status(200).json('Marca registrada');
        }
    })
  })
}

marcaController.obtenerMarca = async function(req, res) {
    const { id } = req.params;
    req.getConnection((err, connection) => {
    //validaciones

    const query = connection.query('SELECT * FROM marca WHERE id_marca = ?', [id], (err, marca) => {
        //console.log(tipo_producto)
        return res.status(200).json(marca);
    })
  })
}

marcaController.actualizarMarca = async function(req, res) {

    const { id } = req.params;
    const newTipo = req.body;
    req.getConnection((err, conn) => {
        //validaciones

        conn.query('UPDATE marca set ? where id_marca = ?', [newTipo, id], (err, rows) => {
            return res.status(200).json('Marca Actualizada');
        });
    });
}

marcaController.eliminarMarca = async function(req, res) {
    const { id } = req.params;
    req.getConnection((err, connection) => {
    //validaciones
 
      connection.query('DELETE FROM marca WHERE id_marca = ?', [id], (err, rows) => {
        if(err){
            return res.status(400).json('PRIMERO ELIMINE EL PRODUCTO RELACIONADO CON ESTA MARCA');
        }else{
            return res.status(200).json('Marca Eliminada');
        }
      });
    });
}
module.exports = marcaController;

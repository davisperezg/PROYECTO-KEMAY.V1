const categoriaController = {};


categoriaController.listarCategoria = async (req, res) => {
    req.getConnection((err, conn) => {
        //validaciones

        //query
        conn.query('SELECT * FROM categoria', (err, categoria) => {
         if (err) {
          res.status(500).json(err);
         }
         res.status(200).json(categoria)
        });
      });
}
categoriaController.crearCategoria = async (req, res) => {
    const data = req.body;
    //console.log(req.body)
    req.getConnection((err, connection) => {
    //validaciones

    const query = connection.query('INSERT INTO categoria set ?', data, (err, categoria) => {
        if(err){
            var cadena = err.sqlMessage
            var NombreUnico = cadena.substr(-12,11)
            //console.log(NombreUnico)
            if(NombreUnico === 'NombreUnico'){
                return res.status(400).json('Error nombre de Categoría duplicada !')
              }
        }else{
            return res.status(200).json('Categoría registrada')
        }
        
    })
  })
    
}

categoriaController.obtenerCategoria = async function(req, res) {
    const { id } = req.params;
    req.getConnection((err, connection) => {
    //validaciones

    const query = connection.query('SELECT * FROM CATEGORIA WHERE ID_CATEGORIA = ?', [id], (err, categoria) => {
        //console.log(categoria)
        res.status(200).json(categoria) 
    })
  })
}

categoriaController.actualizarCategoria = async function(req, res) {
    const { id } = req.params;
    const newCategoria = req.body;
    req.getConnection((err, conn) => {
        //validaciones

        conn.query('UPDATE categoria set ? where id_categoria = ?', [newCategoria, id], (err, rows) => {
            return res.status(200).json('Categoría Actualizada');
        }); 
    });
}

categoriaController.eliminarCategoria = async function(req, res) {
    const { id } = req.params;
    req.getConnection((err, connection) => {
    //validaciones
 
      connection.query('DELETE FROM categoria WHERE id_categoria = ?', [id], (err, rows) => {
        if(err){
            return res.status(400).json('PRIMERO ELIMINE EL TIPO DE PRODUCTO RELACIONADO A ESTA CATEGORIA');
        }else{
            return res.status(200).json('Categoría Eliminada');
        }
      });
    });
}
module.exports = categoriaController;

const inventarioController = {};

inventarioController.listarInventario = async (req, res) => {
    //const productos = await Productos.find();
    //return res.status(200).json(productos);
    req.getConnection((err, conn) => {
        //validaciones

        //query
        conn.query('SELECT i.*, p.descripcion as producto, p.precio FROM inventario i INNER JOIN producto p ON p.id_producto = i.id_producto order by i.id_inventario desc'
        , (err, inventario) => {
         if (err) {
          res.status(500).json(err);
         }
         res.status(200).json(inventario)
        }); 
      });
}


inventarioController.crearInventario =  async (req, res) => {
    const data = req.body;
    //console.log(req.body)
    req.getConnection((err, connection) => {
    //validaciones

    const query = connection.query('INSERT INTO inventario set ?', data, (err, rows) => {
        if(err){
            if(err.code === 'ER_DUP_ENTRY'){
                return res.status(400).json('Producto duplicado, ya está añadido !')
            }else{
                return res.status(400).json('Problema interno, intente más tarde')
            }
        }else{
            //console.log(query)
            //console.log("data recibida: "+data)
            console.log(rows.id_producto)
            //console.log(inventario)
            return res.status(200).json('Inventario Registrado')
        }
        //console.log(categoria)
        
    })
  })
    
}

inventarioController.actualizarPrecioInventario  = async function(req, res) {
    const { id } = req.params;
    const nuevoCantidad = req.body;
    //obtener fecha
    
    //enviar datos del historial
    
    req.getConnection((err, conn) => {
        //validaciones
        console.log('Actualizando el precio inventario...')
        conn.query('update inventario set ? + cantidad  where id_inventario = ?', [nuevoCantidad, id], (err, rows) => {
            if(err) {
                console.log('No se pudo actualizar problema encontrada')
                return res.status(400).json('Problema interno, intente más tarde')
            }else{
                if(rows.protocol41 === true){
                    console.log('Precio actualizado :)')
                    return res.status(200).json('Cantidad Actualizada');
                }
                
            }
        });
        
    });
}




inventarioController.crearHistorial  = async function(req, res) {
    //enviar datos del historial
    const data = req.body;

    req.getConnection((err, connection) => {
        //validaciones
   
    connection.query('INSERT INTO inventario_modificacion set ?', data, (err, rows) => {
            if(err){
                if(err.code === "ER_DUP_ENTRY"){
                    return res.status(400).json('Producto Duplicado en el Historial')
                }else{
                    return res.status(400).json('Problema interno, al guardar su historial')
                }  
                  
            }else{ 
                console.log('Historia Registrada')
            }                        
        })
    })
}

inventarioController.eliminarInventario = async function(req, res) {
    const { id } = req.params;
    req.getConnection((err, connection) => {
    //validaciones
    console.log('eliminando inventario...')
      connection.query('DELETE FROM inventario WHERE id_producto = ?', [id], (err, rows) => {
        if(err){
            return res.status(400).json('El producto tiene un historial');
        }else{
            console.log('inventario eliminado: '+id)
            return res.status(200).json('Producto Eliminado');
        }
      });
    });
}

inventarioController.obtenerUltimoHistorial = async function(req, res) {
    const { id } = req.params;
    req.getConnection((err, connection) => {
    //validaciones

    const query = connection.query('SELECT id_inventario_modificacion, id_inventario, cantidad, fecha_modificada, motivo FROM inventario_modificacion '
     + 'where id_inventario = ? ORDER BY fecha_modificada DESC LIMIT 1', [id], (err, inventario) => {
        if(err){
            return res.status(400).json('Ocurrio un problema al buscar el historial del producto')
        }
        //console.log(tipo_producto)
        return res.status(200).json(inventario);
    })
  })
}
inventarioController.obtenerHistorial = async function(req, res) {
    const { id } = req.params;
    req.getConnection((err, connection) => {
    //validaciones

    const query = connection.query('SELECT ih.cantidad, ih.fecha_modificada, ih.motivo FROM inventario_modificacion ih where ih.id_inventario = ? order by ih.fecha_modificada desc', [id], (err, historiaIventarioXProducto) => {
        //console.log(tipo_producto)
    //    if(err) return console.log(err)
        return res.status(200).json(historiaIventarioXProducto);
    })
  })
}
//fin
module.exports = inventarioController;

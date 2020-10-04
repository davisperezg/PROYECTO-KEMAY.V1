const Productos = require('../models/productos');
const productosController = {};
const utils = require('../lib/utils')


productosController.listarProducto = async (req, res) => {
    //const productos = await Productos.find();
    //return res.status(200).json(productos);
    req.getConnection((err, conn) => {
        //validaciones

        //query
        conn.query('SELECT p.*, tp.nombre as tipo_producto, m.nombre as marca, c.nombre as categoria  FROM producto p INNER JOIN categoria c ON p.id_categoria = c.id_categoria ' +
        'INNER JOIN tipo_producto tp ON tp.id_tipo_producto = p.id_tipo_producto INNER JOIN marca m '+
        'ON m.id_marca = p.id_marca order by p.id_producto desc', (err, productos) => {
         if (err) {
          res.status(500).json(err);
         }
         res.status(200).json(productos)
        });
      });
}

productosController.listarProductoXCategoriaXTipoXMarca = async (req, res) => {
    
    const { id } = req.params;
    req.getConnection((err, conn) => {
        //console.log(conn)
        conn.query('SELECT p.id_producto, p.descripcion, p.precio FROM producto p where '+
        'p.id_marca = ?',[id], (err, productos) => {
         if (err) {  
          res.status(500).json(err);
         }else{
            res.status(200).json(productos)
         }
        });
      });
}


productosController.TipoXcategoria = async (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        //validaciones

        //query
        conn.query('SELECT tp.*, c.nombre as categoria FROM tipo_producto tp INNER JOIN '+
        'categoria c ON tp.id_categoria = c.id_categoria WHERE tp.id_categoria = ? ',[id] ,(err, tipoXcategoria) => {
         if (err) {
          res.status(500).json(err);
         }
         res.status(200).json(tipoXcategoria)
        });
      });
}

productosController.MarcaXtipo = async (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        //validaciones

        //query
        conn.query('SELECT m.* FROM marca m INNER JOIN '+
        'tipo_producto tp ON tp.id_tipo_producto = m.id_tipo_producto WHERE tp.id_tipo_producto = ? ',[id] ,(err, marcaXtipo) => {
         if (err) {
          res.status(500).json(err);
         }
         res.status(200).json(marcaXtipo)
        });
      });
}

productosController.crearProducto =  async (req, res) => {
    const data = req.body;
    //console.log(req.body)
    req.getConnection((err, connection) => {
    //validaciones
    const query = connection.query('INSERT INTO producto set ?', data, (err, producto) => {
        if(err){
            return res.status(400).json('Problema interno, intente más tarde')
        }else{
            return res.status(200).json('Producto Registrado')
        }
        //console.log(categoria)
        
    })
  })
    
}
productosController.actualizarProducto = async function(req, res) {
    const { id } = req.params;
    const newProducto = req.body;
    req.getConnection((err, conn) => {
        //validaciones

        conn.query('UPDATE producto set ? where id_producto = ?', [newProducto, id], (err, rows) => {
            console.log(rows)
            return res.status(200).json('Producto Actualizado');
        });
    });
}


productosController.obtenerProducto = async function(req, res) {
    const { id } = req.params;
    req.getConnection((err, connection) => {
    //validaciones

    const query = connection.query('SELECT * FROM producto WHERE id_producto = ?', [id], (err, producto) => {
        //console.log(tipo_producto)
        return res.status(200).json(producto);
    })
  })
}


productosController.eliminarProducto = async function(req, res) {
    const { id } = req.params;
    req.getConnection((err, connection) => {
    //validaciones
 
      connection.query('DELETE FROM producto WHERE id_producto = ?', [id], (err, rows) => {
        if(err){
            return res.status(400).json('Primero elimine el producto del inventario');
        }else{
            return res.status(200).json('Producto Eliminado');
        }
      });
    });
}
//fin
module.exports = productosController;

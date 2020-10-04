const vencidoController = {};


vencidoController.listarVencido = async (req, res) => {
    req.getConnection((err, conn) => {
        //validaciones

        //query
        conn.query('SELECT * FROM instalacion', (err, renovacion) => {
         if (err) {
          res.status(500).json(err);
         }
         res.status(200).json(renovacion)
        });
      });
}

module.exports = vencidoController;

const cotizaController = {};


cotizaController.crearCotiza = async (req, res) => {
    const data = req.body;
    //console.log(req.body)
    req.getConnection((err, connection) => {
      if(err){
        console.log('ERROR EN CREAR COTIZA')
      }
    //validaciones
    try{
        connection.query('INSERT INTO proforma set ?', data, (err, cotiza) => {
           if(err) {
             console.log(err)
            return res.status(400).json('Cliente no existe')
           }else{
            if(cotiza.insertId > 0){ 
              const data = {numProforma:cotiza.insertId,message:true}
              return res.status(200).json(data)
             }else{
              const data = {numProforma:cotiza.insertId,message:false}
              return res.status(200).json(data)
             }
           }
        })
    }catch(err){
        return res.status(400).json('Error al registrar Proforma')
    }
  })
    
}


cotizaController.crearDetalle = async (req, res) => {
    const data = req.body;
    //console.log(req.body)
    req.getConnection((err, connection) => {
      if(err){
        console.log('ERROR EN CREAR DETALLE')
      }
    //validaciones
    try{
        connection.query('INSERT INTO detalle_proforma set ?', data, (err, detalle) => {
          if(err) return console.log('ERROR EN INSERT DETALLE')
          return res.status(200).json('Proforma Registrada')
        })
    }catch(err){
        console.log(err)
    }
  })
    
} 
 
cotizaController.obtenerProforma = async function(req, res) {
    const { id } = req.params;
    req.getConnection((err, connection) => {
    //validaciones
    if(err){
      console.log('ERROR EN OBTENER COTIZA')
    }
    connection.query('SELECT * FROM PROFORMA P INNER JOIN clientes_no_gps C ON P.id_clientes = C.id_clientes WHERE P.id_proforma = ?', [id], (err, proforma) => {
        if(err) return res.status(400).json('Error al obtener la proforma') 
        //console.log(categoria)
        res.status(200).json(proforma)
    })
  })
}

cotizaController.obtenerDetalleProforma = async function(req, res) {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    if(err){
      console.log('ERROR EN OBTENER DETALLE')
    }
  //validaciones
  connection.query('SELECT * FROM detalle_proforma P INNER JOIN producto PP ON P.id_producto = PP.id_producto WHERE P.id_proforma = ?', [id], (err, detalle) => {
      if(err) return res.status(400).json('Error al obtener detalle de la proforma') 
      //console.log(categoria)
      res.status(200).json(detalle)
  })
})
}


module.exports = cotizaController;

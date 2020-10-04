const vehiculoController = {};

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today =  yyyy+'-'+mm+'-'+dd;

vehiculoController.crearVehiculo =  async (req, res) => {
  
  const data = req.body
  const dataAux = {
    placa:data.plate,
    marca:data.mar,
    modelo:data.mod,
    id_cliente:data.idCliente
  }
  //console.log(req.body)
  req.getConnection((err, connection) => {
  //validaciones

  const query = connection.query('INSERT INTO vehiculo set ?', dataAux, (err, veh) => {
            if(err){
                var cadena = err.sqlMessage
                var NroDocumentoUnico = cadena.substr(-9,8)
                if(NroDocumentoUnico === 'NumUnico'){
                  return res.status(400).json('Este vehiculo ya ha sido registrado !')
                }else{
                    return res.status(400).json('Problema interno, intente más tarde')
                }
            }else{
                return res.status(200).json({message:'Vehiculo Registrado.',data:veh.insertId})
            }      
        })
    })
  
}

module.exports = vehiculoController;

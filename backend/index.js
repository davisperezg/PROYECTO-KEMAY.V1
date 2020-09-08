const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const passport = require('passport');
const mysql = require('mysql')
const myConnection = require('express-myconnection')


//bd mongo
//const { mongoose } = require('./database');
//Herramientas
//npm install nodemon (recarga el servidor automaticamente)
//instalar mongodb comunity si no  está en un server
//npm install mongoose (base de datos mongodb)
//iniciar bd sudo service mongod start (linux) - mongod(windows)

//Settings
require('./config/passport')(passport)
app.set('port', process.env.PORT || 80);

//Middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host:'localhost',
    user:'root',
    password:'',
    port:'3306',
    database:'kemaytec_mydb'
},'single'))
app.use(passport.initialize());
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

//Routes
app.use('/api/employees', require('./routes/employee.routes'));
app.use('/api/roles', require('./routes/roles.routes'));
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/marcas', require('./routes/marca.routes'));
app.use('/api/tipos', require('./routes/tipoProducto.routes'));
app.use('/api/categorias', require('./routes/categoria.routes'));
app.use('/api/inventario', require('./routes/inventario.routes'));
app.use('/api/clientes', require('./routes/clientes.routes'));
app.use('/api/cotiza', require('./routes/cotiza.routes'));

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port.', app.get('port'));
});
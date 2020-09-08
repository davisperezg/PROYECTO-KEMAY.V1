
const mysql = require('mysql')
const myConnection = require('express-myconnection')

myConnection(mysql, {
    host:'localhost',
    user:'root',
    password:'',
    port:'3306',
    database:'kemaytec_mydb'
},'single')

module.exports = myConnection;
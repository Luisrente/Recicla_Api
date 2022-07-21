const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password:'',
     port: '3306',
     database: 'dbpermisos'
});

mysqlConnection.connect( err => {
  if(err){
    console.log('Error en la conexion a la database: ', err);
    return;
  }else{
    console.log('OK : Conexion establecida correctamente!');
  }
});

module.exports = mysqlConnection;
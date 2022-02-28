const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    //  host: 'database-2.cbycvd1mx19a.us-east-1.rds.amazonaws.com',
    //  user: 'admin',
    //  password:'3105156999',
    //  port: '3306',
    //  database: 'recicla'
     host: 'localhost',
     user: 'root',
     password:'root',
     port: '8889',
     database: 'Base_dato'
});

mysqlConnection.connect( err => {
  if(err){
    console.log('Error en db: ', err);
    return;
  }else{
    console.log('Dib ok');
  }
});
module.exports = mysqlConnection;
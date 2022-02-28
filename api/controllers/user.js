const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection/connection');
const jwt = require('jsonwebtoken');





exports.listausuario=function(req,res){
  mysqlConnection.query('select * from Persona', (err,rows,fields) => {
    if(!err){
      res.json(rows);
    }else{
      console.log(err);
    }
  })
}


  exports.create = function (req,res) {
  const { Email, Contraseña } = req.body;
  mysqlConnection.query('SELECT * FROM Persona WHERE Email=? and Contraseña=? ',
  [Email,Contraseña],
  (err,rows,fields) => {
    if(!err){
      if(rows.length >0){
        let data = JSON.stringify(rows[0]);
        const token = jwt.sign(data, 'stil');
        res.json({token});
      }else{
        res.json('Usuario o clave incorrectos');
      }
    }else{
      console.log(err);
    }
  }
  )
}

exports.test=function (req,res)  {
  console.log(req.data);
  res.json('Informacion secreta');
}


function verifyToken(req,res, next){
  if(!req.headers.authorization) return res.status(401).json('No autorizado');

  const token = req.headers.authorization.substr(7);
  if(token!==''){
    const content = jwt.verify(token,'stil');
    req.data = content;
    next();
  }else{
    res.status(401).json('Token vacio');
  }

}
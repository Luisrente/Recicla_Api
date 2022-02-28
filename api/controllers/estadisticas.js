const express = require('express');
const router = express.Router();
const mysqlConnection = require('../connection/connection');


Pendientes=function(req, res){
    let sql ='call Pendientes()'
    mysqlConnection.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
  }


Cantidad=function(req, res){
  let sql =' call EstadisticasCifra()'
  mysqlConnection.query(sql,(err, rows, fields)=>{
      if(err) throw err;
      else{
          res.json(rows)
      }
  })
}


email=function(req, res){
  let sql =' SELECT * FROM recicla.HistorialCorreo;'
  mysqlConnection.query(sql,(err, rows, fields)=>{
      if(err) throw err;
      else{
          res.json(rows)
      }
  })
}


puntoss=function(req, res){
  let sql ='SELECT nombre,Id_categoria,puntos FROM Residuo WHERE puntos > (SELECT (AVG(puntos)) FROM Residuo) '
  mysqlConnection.query(sql,(err, rows, fields)=>{
      if(err) throw err;
      else{
          res.json(rows)
      }
  })
}

pedidos=function(req, res){
  let sql ='SELECT * FROM `Recoleccion` WHERE `idReciclador`=1'
  mysqlConnection.query(sql,(err, rows, fields)=>{
      if(err) throw err;
      else{
          res.json(rows)
      }
  })
}





Consultareciclador=function(req, res){
  let estado='Recogido';
  let fecha='2022-01-01'
  let sql ='SELECT Persona.Dni, Reciclador.idReciclador,Persona.Nombre1,Persona.Apellido2 FROM Persona RIGHT JOIN Reciclador ON Persona.Dni=Reciclador.Dni WHERE Reciclador.idReciclador IN (SELECT Recoleccion.idReciclador FROM Recoleccion WHERE Recoleccion.fecha > ? AND Recoleccion.estado=?);'
  mysqlConnection.query(sql,[fecha,estado],(err, rows, fields)=>{
      if(err) throw err;
      else{
          res.json(rows)
      }
  })
}
Categoria=function(req, res){
  let categoria='Delicados';
  let sql ='SELECT nombre ,detalles FROM(SELECT Categoria.Id_categoria FROM Categoria WHERE Categoria.Nombre=?) AS Cate ,(SELECT Residuo.nombre,Residuo.Id_categoria,Residuo.detalles FROM Residuo) AS R WHERE Cate.Id_categoria=R.Id_categoria;';
  mysqlConnection.query(sql,[categoria],(err, rows, fields)=>{
      if(err) throw err;
      else{
          res.json(rows)
      }
  })
}

Cliente=function(req, res){
  let estado='Recogido';
  let sql ='SELECT Persona.Dni,T.Id_Cliente,Persona.Nombre1,Persona.Apellido1,Persona.Apellido2, T.total FROM Persona RIGHT JOIN (SELECT Cliente.Id_Cliente,Cliente.Dni,(SUM(Detalle.punto))as total FROM Cliente INNER JOIN Solicitud ON Solicitud.Id_solicitud=Cliente.Id_Cliente INNER JOIN Detalle ON Solicitud.Id_solicitud=Detalle.Id_solicitud INNER JOIN Recoleccion ON Recoleccion.Id_solicitud=Solicitud.Id_solicitud WHERE Recoleccion.estado=? GROUP BY Cliente.Id_Cliente ORDER BY total DESC ) AS T ON Persona.Dni=T.Dni;';
  mysqlConnection.query(sql,[estado],(err, rows, fields)=>{
      if(err) throw err;
      else{
          res.json(rows)
      }
  })
}

  exports.models={
    Cantidad,
    Pendientes,
    Consultareciclador,
    Categoria,
    Cliente,
    email,
    pedidos,
    puntoss
  }
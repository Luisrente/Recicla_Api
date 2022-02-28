const express = require('express');
const mysqlConnection = require('../connection/connection');
const jwt = require('jsonwebtoken');



listarResiduo=function(req, res){
    const sql = `SELECT * FROM Residuo`;
      mysqlConnection.query(sql,(err, rows, fields)=>{
          if(err) throw err;
          else{
              res.json(rows)
          }
      })
    }

   ObtenerResiduo=function(req, res){
      const {id} = req.params
      let sql ='select * from tb_equipo where id_equipo = ?'
      mysqlConnection.query(sql,[id],(err, rows, fields)=>{
          if(err) throw err;
          else{
              res.json(rows)
          }
      })
    }

    eliminarResiduo=function(req, res){
          const{id} = req.params
        
          let sql =`delete from tb_equipo where id_equipo = '${id}'`
          mysqlConnection.query(sql, (err, rows, fields)=>{
              if(err) throw err
              else{
                  res.json({status: 'equipo eliminado'})
              }
          })
        }
    crearResiduo=function  ( req, res){
          const{nombre, logo} = req.body
        
          let sql = `insert into tb_equipo(nombre, logo) values('${nombre}','${logo}')`
          mysqlConnection.query(sql, (err, rows, fields)=>{
              if(err) throw err
              else{
                  res.json({status: 'equipo agregado'})
              }
          })
        }
    actualizarResiduo=function(req, res){
          const{id}=req.params
          const{nombre, logo} = req.body
        
          let sql = `update tb_equipo set 
                      nombre ='${nombre}',
                      logo='${logo}'
                      where id_equipo = '${id}'`
          
                      mysqlConnection.query(sql, (err, rows, fields)=>{
              if(err) throw err
              else{
                  res.json({status: 'equipo modificado'})
              }
          })
        }  
    exports.module={
        listarResiduo,
        ObtenerResiduo,
        eliminarResiduo,
        crearResiduo,
        actualizarResiduo
    }
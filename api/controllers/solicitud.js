const express = require('express');
const mysqlConnection = require('../connection/connection');



   listarsolicitud=function(req, res){
      let sql ='SELECT * FROM `Solicitud`'
      mysqlConnection.query(sql,(err, rows, fields)=>{
          if(err) throw err;
          else{
              res.json(rows)
          }
      })
    }

    ObtenersolicitudUser=function(req, res){
      const {id} = req.params
      let sql ='SELECT * FROM `Solicitud` WHERE `Id_Cliente`= ?'
      mysqlConnection.query(sql,[id],(err, rows, fields)=>{
          if(err) throw err;
          else{
              res.json(rows)
          }
      })
    }


    creardireccion=function ( req, res){
        const {
            id_cliente,
            Id_barrio,
            referencia,
            longitud,
            latitud,
          }=req.body;
        console.log('entro');
        const sql = 'INSERT INTO `Direccion` (`Id_direccion`, `Id_barrio`, `id_cliente`, `referencia`, `longitud`, `latitud`) VALUES (NULL, ?, ?, ?,?,?);';
        mysqlConnection.query(sql,[Id_barrio,id_cliente,referencia,longitud,latitud],(err, rows, fields)=>{
            if(err) throw err
            else{
                console.log('dirrecion ');
                res.json({status: 'Solicitud agregada'})
            }
        })
      }

    crearSolicitud=function ( req, res){
          const {Id_Cliente,Id_direccion,Estado ,descripcion}=req.body;

          console.log('entro');
          const sql = `CALL Insertarsolicitud(?,?,?,?)`;
          mysqlConnection.query(sql,[Id_Cliente,Id_direccion,descripcion,Estado],(err, rows, fields)=>{
              if(err) throw err
              else{
                  console.log('ddd');
                  res.json({status: 'Solicitud agregada'})
              }
          })
        }


        crearDetalle=function ( req, res){
            const { 
                Id_residuo,
                Cantidad,
                punto}=req.body;
            const sql = `CALL Agregar_Detalle(?,?,?)`;
            mysqlConnection.query(sql,[Id_residuo,Cantidad,punto],(err, rows, fields)=>{
                if(err) throw err
                else{
                    res.json({status: 'Detalle  agregada'})
                }
            })
          }


        Residuo=function ( req, res){
            const sql = `SELECT * FROM Residuo`;
            mysqlConnection.query(sql,(err, rows, fields)=>{
                if(err) throw err
                else{
                    res.json(rows)

                }
            })
          }

          Reciclador=function ( req, res){
            const sql = `SELECT Solicitud.Id_solicitud ,
            Solicitud.Id_Cliente,Solicitud.Id_direccion,Solicitud.Fecha,
            Solicitud.descripcion,Solicitud.Estado,	Residuo.nombre,Direccion.referencia,Direccion.longitud,Direccion.latitud FROM Solicitud 
            INNER JOIN Direccion on Direccion.Id_direccion=Solicitud.Id_direccion
            INNER JOIN Detalle on Detalle.Id_solicitud=Solicitud.Id_solicitud
            INNER JOIN Residuo on Residuo.Id_residuo=Detalle.Id_residuo WHERE Solicitud.Estado="Pendiente"
        `;
            mysqlConnection.query(sql,(err, rows, fields)=>{
                if(err) throw err
                else{
                    res.json(rows)

                }
            })
          }

          Aceptar=function ( req, res){
            const {Id_solicitud,idReciclador,estado}=req.body;
            console.log('entro');
            const sql = 'CALL recoleccion(?,?,?);'
            mysqlConnection.query(sql,[Id_solicitud,idReciclador,estado],(err, rows, fields)=>{
                if(err) throw err
                else{
                    console.log('ddd');
                    res.json({status: 'Solicitud agregada'})
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
        listarsolicitud,
         ObtenersolicitudUser,
         crearSolicitud,
         crearDetalle,
         Residuo,
         creardireccion,
         Reciclador,
         Aceptar
    }
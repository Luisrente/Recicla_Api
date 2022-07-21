const express = require('express');
const mysqlConnection = require('../connection/connection');

exports.login = function (req, res) {
  const { email, password } = req.body;
  let sql = `SELECT * FROM persona WHERE email = ? AND password = ?;`;
  mysqlConnection.query(sql, [email, password], (err, rows, fields) => {
    if (!err) {
      if (rows.length > 0) {
        const user = rows[0];
        if (user.rol == "admin") {
          sql = `SELECT * FROM persona inner join administrativo using(cedula) WHERE cedula = ?;`;
          mysqlConnection.query(sql, [user.cedula], (err, rows, fields) => {
            if (err) throw err
            else {
              if (err) throw err
              else {
                const user = rows[0];
                res.json(user)
              }
            }
          })
        } else {
          sql = `SELECT * FROM persona inner join empleado using(cedula) WHERE cedula = ?;`;
          mysqlConnection.query(sql, [user.cedula], (err, rows, fields) => {
            if (err) throw err
            else {
              if (err) throw err
              else {
                const user = rows[0];
                res.json(user)
              }
            }
          })
        }
      } else {
        res.send('Usuario o clave incorrectos');
      }
    } else {
      console.log(err);
    }
  });
}

function makebase64(buff) {
  let bufferOriginal = Buffer.from(buff.data).toString("base64");
  let buff2 = Buffer.from(bufferOriginal, 'base64');
  let text = buff2.toString('ascii');
  return text;
}

exports.getUser = function (req, res) {
  const { id, rol } = req.body;
  let sql;
  if (rol == "admin") {
    sql = "SELECT * FROM persona inner join administrativo using(cedula) WHERE idAdministrativo = ?";
    mysqlConnection.query(sql, [id], (err, rows, fields) => {
      if (err) throw err
      else {
        if (err) throw err
        else {
          
          const user = rows[0];
          user.firma = makebase64(user.firma.toJSON())
          return res.json(user)
        }
      }
    })
  } else {
    sql = "SELECT * FROM permiso inner join administrativo using(idAdministrativo) INNER JOIN persona USING (cedula) INNER JOIN motivo USING(codMotivo) WHERE idAdministrativo = ?;";
    mysqlConnection.query(sql, [id], (err, rows, fields) => {
      if (err) throw err
      else {
        if (err) throw err
        else {
          const user = rows[0];
          user.firma = makebase64(user.firma.toJSON())
          return res.json(user)
        }
      }
    })
  }
}

exports.listarEmpleados = function (req, res) {
  const sql = `SELECT * FROM persona NATURAL JOIN empleado`;
  mysqlConnection.query(sql, (err, rows, fields) => {
    if (err) throw err;
    else {
      res.json(rows);
    }
  });
}

exports.obtenerEmpleado = function (req, res) {
  const { id } = req.params;
  console.log(id);
  let sql = 'SELECT * FROM `persona` WHERE `cedula`= ?'
  mysqlConnection.query(sql, [id], (err, rows, fields) => {
    if (err) throw err;
    else {
      console.log(rows);
      res.json(rows)

    }
  })
}

exports.crearEmpleado = function (req, res) {
  const {
    cedula, apellido1, apellido2, nombre1, nombre2, email,
    password, telefono, direccion, sexo, fnacimiento, firma, rol
  } = req.body;
  console.log('entro');
  const sql = 'INSERT INTO `persona` (`cedula`, `apellido1`, `apellido2`, `nombre1`, `nombre2`, `email`, `password`, `telefono`, `direccion`, `sexo`, `fnacimiento`, `firma`, `rol`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ';

  try {
    mysqlConnection.query(sql, [cedula, apellido1, apellido2, nombre1, nombre2, email, password, telefono, direccion, sexo, fnacimiento, firma, rol], (err, rows, fields) => {
      try {
        if (err) throw err
        else {
          console.log('test consulta empleado');
          const sql1 = 'INSERT INTO `empleado` (`idEmpleado`, `cedula`) VALUES (NULL, ?)';
          mysqlConnection.query(sql1, [cedula], (err, rows, fields) => {
            if (err) throw err
            else {
              return res.json({ status: 'OK: Empleado agregado' })
            }
          })
        }
      } catch (error) {
        let msg = "error"
        console.log(msg)
        return res.json(msg);
      }
    })
  } catch (error) {
    console.log(error);
  }
}

exports.editarEmpleado = function (req, res) {
  const {
    cedula,
    apellido1,
    apellido2,
    nombre1,
    nombre2,
    email,
    password,
    telefono,
    direccion,
    sexo,
    fnacimiento,
    firma,
    rol
  } = req.body;
  const sql = 'UPDATE persona SET cedula = ?, apellido1 = ?, apellido2 = ?, nombre1 = ?, nombre2 = ?, email = ?, password = ?, telefono = ?, direccion = ?, sexo = ?, fnacimiento = ?, firma = ?, rol = ? WHERE cedula = ?';
  mysqlConnection.query(sql, [cedula, apellido1, apellido2, nombre1, nombre2, email, password, telefono, direccion, sexo, fnacimiento, firma, rol, cedula], (err, rows, fields) => {
    if (err) {
      throw err;
    } else {
      res.json({ status: 'OK: Usuario actualizado' });
    }
  })
}

exports.deleteEmpleado = function (req, res) {
  console.log('id:', req.params.id);
  const { id } = req.params
  let sql = `DELETE FROM empleado WHERE cedula = ${id};`;
  mysqlConnection.query(sql, (err, rows, fields) => {
    if (err) throw err
    else {
      const sql2 = `DELETE FROM persona WHERE cedula = ${id}`;
      mysqlConnection.query(sql2, (err, rows, fields) => {
        if (err) throw err
        else {
          res.json({ status: 'OK: Empleado eliminado' })
        }
      })
    }
  })
}

/* Administradores */

exports.listarAdmins = function (req, res) {
  const sql = `SELECT * FROM persona NATURAL JOIN administrativo`;
  mysqlConnection.query(sql, (err, rows, fields) => {
    if (err) throw err;
    else {
      res.json(rows);
    }
  });
}

exports.crearAdmin = function (req, res) {
  const {
    cedula,
    apellido1,
    apellido2,
    nombre1,
    nombre2,
    email,
    password,
    telefono,
    direccion,
    sexo,
    fnacimiento,
    firma,
    rol
  } = req.body;
  console.log('entro');
  const sql = 'INSERT INTO `persona` (`cedula`, `apellido1`, `apellido2`, `nombre1`, `nombre2`, `email`, `password`, `telefono`, `direccion`, `sexo`, `fnacimiento`, `firma`, `rol`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ';

  mysqlConnection.query(sql, [cedula, apellido1, apellido2, nombre1, nombre2, email, password, telefono, direccion, sexo, fnacimiento, firma, rol], (err, rows, fields) => {
    if (err) throw err
    else {
      const sql1 = 'INSERT INTO `administrativo` (`idAdministrativo`, `cedula`) VALUES (NULL, ?)';
      mysqlConnection.query(sql1, [cedula], (err, rows, fields) => {
        if (err) throw err
        else {
          res.json({ status: 'OK: Admin agregado' })
        }
      })
    }
  })
}

exports.deleteAdmin = function (req, res) {
  console.log('id:', req.params.id);
  const { id } = req.params;
  let sql = `DELETE FROM administrativo WHERE cedula = ${id};`;
  mysqlConnection.query(sql, (err, rows, fields) => {
    if (err) throw err
    else {
      const sql2 = `DELETE FROM persona WHERE cedula = ${id}`;
      mysqlConnection.query(sql2, (err, rows, fields) => {
        if (err) throw err
        else {
          res.json({ status: 'OK: Administrador eliminado' })
        }
      })
    }
  })
}

/* Permisos */

exports.getIds = function (req, res) {
  const { cedulaAdmin, cedulaEmpleado } = req.body;
  let sql = 'SELECT idAdministrativo FROM administrativo WHERE cedula = ?';
  mysqlConnection.query(sql, [cedulaAdmin], (err, rows, fields) => {
    if (err) throw err
    else {
      if (err) throw err
      else {
        const AdminRows = rows;
        sql = 'SELECT idEmpleado FROM empleado WHERE cedula = ?';
        mysqlConnection.query(sql, [cedulaEmpleado], (err, rows, fields) => {
          if (err) throw err
          else {
            if (err) throw err
            else {
              const EmpleadoRows = rows;
              res.json({
                idAdministrativo: AdminRows[0] ? AdminRows[0].idAdministrativo : null,
                EmpleadoRows: EmpleadoRows[0] ? EmpleadoRows[0].idEmpleado : null
              })
            }
          }
        })
      }
    }
  })
}


/* Motivos */

exports.listarMotivos = function (req, res) {
  const sql = `SELECT * FROM motivo`;
  mysqlConnection.query(sql, (err, rows, fields) => {
    if (err) throw err;
    else {
      res.json(rows);
    }
  });
}

exports.obtenerMotivo = function (req, res) {
  const { id } = req.params;
  console.log(id);
  let sql = 'SELECT * FROM `motivo` WHERE `codMotivo`= ?'
  mysqlConnection.query(sql, [id], (err, rows, fields) => {
    if (err) throw err;
    else {
      console.log(rows);
      res.json(rows)

    }
  })
}

/* metodo para editar 1 */
exports.editarMotivo = function (req, res) {
  const { codMotivo, detalleMotivo, descripcion } = req.body;
  const sql = 'UPDATE motivo SET codMotivo = ?, detalleMotivo = ?, descripcion = ? WHERE codMotivo = ?'
  mysqlConnection.query(sql, [codMotivo, detalleMotivo, descripcion, codMotivo], (err, rows, fields) => {
    if (err) {
      throw err;
    } else {
      res.json({ status: 'OK: Motivo actualizado' });
    }
  })
}

exports.crearMotivo = function (req, res) {
  const { codMotivo, detalleMotivo, descripcion } = req.body;
  console.log('entro');
  const sql = 'INSERT INTO `motivo` (`codMotivo`, `detalleMotivo`, `descripcion`) VALUES (?, ?, ?); ';
  mysqlConnection.query(sql, [codMotivo, detalleMotivo, descripcion], (err, rows, fields) => {
    if (err) throw err
    else {
      if (err) throw err
      else {
        /* console.log('test consulta empleado'); */
        res.json({ status: 'OK: Motivo agregado' })
      }
    }
  })
}

exports.deleteMotivo = function (req, res) {
  console.log('id:', req.params.id);
  const { id } = req.params
  let sql = `DELETE FROM motivo WHERE codMotivo = '${id}'`
  mysqlConnection.query(sql, (err, rows, fields) => {
    if (err) throw err
    else {
      res.json({ status: 'eliminado' })
      console.log(res.json);
    }
  })
}

/* ************************* permisos **********************************/

exports.crearPermiso = function (req, res) {
  const { idAdministrativo, idEmpleado, fpermiso, fsalida, fentrada, observaciones, codMotivo } = req.body;
  const sql = 'INSERT INTO permiso (idPermiso, idAdministrativo, idEmpleado, fpermiso, fsalida, fentrada, observaciones, codMotivo) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)';
  mysqlConnection.query(sql, [idAdministrativo, idEmpleado, fpermiso, fsalida, fentrada, observaciones, codMotivo], (err, rows, fields) => {
    if (err) throw err
    else {
      if (err) throw err
      else {
        res.json({ status: 'OK: Permiso agregado' })
      }
    }
  })
}

exports.obtenerPermisos = function (req, res) {
  const { id } = req.params;
  const sql = 'SELECT cedula, nombre1, apellido1, fpermiso, fsalida, fentrada, detalleMotivo FROM permiso inner join empleado using(idEmpleado) INNER JOIN persona USING (cedula) INNER JOIN motivo USING(codMotivo) WHERE idAdministrativo = ?;'
  mysqlConnection.query(sql, [id], (err, rows, fields)=>{
    if(err) throw err;
    else{
      res.json(rows);
    }
  })
}




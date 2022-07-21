const express = require('express');
const router = express.Router();

//Controllers
const proceso= require('../controllers/procesos');

//auth
router.post('/login',proceso.login);
router.post('/me',proceso.getUser);

//empleados
router.get('/empleados',proceso.listarEmpleados);
router.get('/empleados/:id', proceso.obtenerEmpleado);
router.delete('/empleados/:id', proceso.deleteEmpleado);
router.post('/empleados',proceso.crearEmpleado);
router.put('/empleados/:id',proceso.editarEmpleado);

//admins
router.get('/admins', proceso.listarAdmins);
router.post('/admins', proceso.crearAdmin);
router.delete('/admins/:id', proceso.deleteAdmin);

//permisos
router.post('/permisos', proceso.crearPermiso);
router.get('/permisos/:id', proceso.obtenerPermisos);
router.post('/permisosIds', proceso.getIds);

//motivos
router.get('/motivos', proceso.listarMotivos);
router.post('/motivos', proceso.crearMotivo);
router.get('/motivos/:id', proceso.obtenerMotivo);
router.put('/motivos/:id', proceso.editarMotivo);
router.delete('/motivos/:id', proceso.deleteMotivo);

module.exports = router;
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authVerify=require('../middleware/auth')


//Controllers
const userController=require('../controllers/user')
const residuoController=require('../controllers/residuo')
const estadisticas=require('../controllers/estadisticas');
const solicitud=require('../controllers/solicitud')

//Usuario

router.get('/',userController.listausuario);
router.post('/singin',userController.create);
router.post('/test',verifyToken,userController.test);


//Residuo
router.get('/residuo',residuoController.module.listarResiduo);
router.get('/residuo/:id',residuoController.module.ObtenerResiduo);
router.post('/residuo/',residuoController.module.crearResiduo);
router.delete('/residuo/:id',residuoController.module.eliminarResiduo);
router.put('/residuo/:id',residuoController.module.actualizarResiduo);


//Estadistica
router.get('/estadistica',estadisticas.models.Pendientes);
router.get('/estadistica/cant',estadisticas.models.Cantidad);
router.get('/estadistica/reciclador',estadisticas.models.Consultareciclador);
router.get('/estadistica/Categoria',estadisticas.models.Categoria);
router.get('/estadistica/Cliente',estadisticas.models.Cliente);
router.get('/pedido',estadisticas.models.pedidos);
router.get('/puntos',estadisticas.models.puntoss);



//solicitud
router.get('/solicitud',solicitud.module.listarsolicitud);
router.get('/solicitud/:id',solicitud.module.ObtenersolicitudUser);
router.post('/solicitud',solicitud.module.crearSolicitud);

// Detalle 
router.post('/Detalle',solicitud.module.crearDetalle);


//Dirrecion 
router.post('/dirrecion',solicitud.module.creardireccion);


//reciclador 
router.get('/reciclador',solicitud.module.Reciclador);
router.post('/aceptar',solicitud.module.Aceptar);

//email
router.get('/email',estadisticas.models.email);






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


module.exports = router;
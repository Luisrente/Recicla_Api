
const jwt = require('jsonwebtoken');


exports.authVerify= function verifyToken(req,res, next){
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
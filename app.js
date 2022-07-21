const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
   /*  res.setHeader('Access-Control-Allow-Origin', '*'); */
    
    next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.json());

/* const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
} */


app.use(cors());

/* app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
}) */

const userRoute = require('./api/routes/user');
app.use('/user',userRoute);

module.exports = app;
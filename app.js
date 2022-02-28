const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());
//peticiones no tener problema 

// ROUTES

const userRoute = require('./api/routes/user');
app.use('/user',userRoute);
// app.use('/soli',require('./api/routes/solicitud'));


module.exports = app;
//Carregando os modulos 
var express = require('express');
var app = express();

//Routes
const indexRoute = require('./routes/route');

//Porta que meu projeto irá rodar
app.listen(3000);

//Register Routes
app.use('/', indexRoute);

module.exports = app;
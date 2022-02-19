const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Arquivos que gerenciam as querys executadas e dados
const tasks = require('./querys/tasks');

var app = express();

app.use('/', tasks);

app.listen(3000, () => console.log('Servidor Rodando'));
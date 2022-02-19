const express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    cors = require('cors'), 
    port = process.env.PORT || 3000;

app.set('port', port)

//suporte para JSON
app.use(cors());
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({    
  extended: true
}));

// INSTANCIO AS QUERYS
const querys = require('./querys/tasks')
app.use('/task', querys);

app.listen(port, () => {
  console.log('\nServidor rodando: http://localhost:' + port)
})
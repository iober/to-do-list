const { Pool } = require('pg');

// Faz a conexão com o banco de dados
const con = new Pool({
    connectionString: 'postgres://postgres:master@localhost:5432/to-do-list'
})

con.connect((err) => {
    if (!err) {
        console.log('Conectado')
    } else {
        console.log('Erro na conexão com o banco:' + err)
    }
})

module.exports = con;
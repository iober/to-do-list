const { Pool } = require('pg');

// Faz a conexão com o banco de dados
const con = new Pool({
    connectionString: 'postgres://irreqcqqfpktns:11ad3e7284cafe2a705328eebe0da5ebd9d447a26986a531772647090a090630@ec2-34-201-95-176.compute-1.amazonaws.com:5432/d7dqvfn92hq9lp'
})

con.connect((err) => {
    if (!err) {
        console.log('Conectado')
    } else {
        console.log('Erro na conexão com o banco:' + err)
    }
})

module.exports = con;
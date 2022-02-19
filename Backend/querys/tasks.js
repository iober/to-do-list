const express = require('express');
const async = require('async');
const conn = require('../conexao');
const Router = express.Router();

Router.get('/', async (req, res) => {

    var query = 'select * from lista'
    
    conn.query(query, (err, rows) => {
        if (!err) {
            console.log('Task: ', rows.rows)
            return res.end('<p>API OK</p>');
        } else {
            console.log(err)
        }
    })
})

module.exports = Router;
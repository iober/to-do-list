const express = require('express');
const Router = express.Router();
const con = require('../conexao');

// QUERYS DO CRUD DAS TAREFAS
Router.get("/carregarTask", async (req, res) => {
    var query = "select * from lista";
  
    con.query(query, (err, rows) => {
      if (!err) {
        res.send(rows.rows);
      } else {
        console.log(err);
      }
    });
  });
  
  //insere tarefa no banco
  Router.post('/inserirTask', function (req, res) {
    var dados = req.body
    var query = 'insert into lista ("dsTask") values ($1) returning *'
    con.query(query, [dados.dsTask], (err, rows) => {
      if (!err) {
        res.send(rows.rows);
      } else {
        console.log(err);
      }
    });
  });
  
  // CONCLUIR TAREFA
  Router.put('/concluirTask', function (req, res) {
    var dados = req.body
    var query = `update lista set "statusTask" = 'C' where "idTask" = $1 returning *`
    con.query(query, [dados.idTask], (err, rows) => {
      if (!err) {
        res.send(rows.rows);
      } else {
        console.log(err);
      }
    });
  });
  
  // RESTAURA TAREFA PARA EM ABERTO
  Router.put('/restaurar', function (req, res) {
    var dados = req.body
    var query = `update lista set "statusTask" = 'A' where "idTask" = $1 returning *`
    con.query(query, [dados.idTask], (err, rows) => {
      if (!err) {
        res.send(rows.rows);
      } else {
        console.log(err);
      }
    });  
  })
  
  // EXCLUI DEFINITIVAMENTE A TAREFA
  Router.delete('/excluir', function (req, res) {
    var dados = req.body
    var query = `delete from lista where "idTask" = $1 returning *`
    con.query(query, [dados.idTask], (err, rows) => {
      if (!err) {
        res.send(rows.rows);
      } else {
        console.log(err);
      }
    });
  });

  
module.exports = Router;
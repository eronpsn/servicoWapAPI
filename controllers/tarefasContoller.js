const { response } = require("express");
const moment = require('moment');
const { db } = require('../database/config');


const getTarefas = async (req,res=response) =>{ 
 
    db.any('SELECT * FROM swap.tarefas')
    .then(data => {
      console.log(data);
      res.json({
        ok : true,
        data
    });
    })
    .catch(error => {
      console.error('Erro:', error);
    });   
};

const criarTarefa = (request, res=response) => {
    const { descricao} = request.body
    const uid = request.uid;  // uid q foi gerado pelo token
     // Obter a data atual
     const dataAtual = moment();
     const dataFormatada = dataAtual.format('YYYY-MM-DD HH:mm:ss');

  
    db.any('INSERT INTO swap.tarefas (descricao, status, solicitante_id, data_criacao) VALUES ($1, $2, $3, $4)', [descricao, 'P', uid, dataFormatada])
    .then(data => {
      console.log(data);
      res.json({
        ok : true,
        data
    });
    })
    .catch(error => {
      console.error('Erro:', error);
    })
    
  }

module.exports = {
    getTarefas,
    criarTarefa
}
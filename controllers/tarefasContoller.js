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
  const pegarTarefa = (request, res=response) => {
    const { id_tarefa} = request.body
    const uid = request.uid;  // uid q foi gerado pelo token
     // Obter a data atual
     const dataAtual = moment();
     const dataFormatada = dataAtual.format('YYYY-MM-DD HH:mm:ss');

  
    db.any('UPDATE swap.tarefas SET responsavel_id = $1,  data_inicio = $2, status = $3 WHERE id = $4 and status = $5', [uid, dataFormatada, 'A', id_tarefa, 'P'])
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

  const concluirTarefa = (request, res=response) => {
    const { id_tarefa} = request.body
    const uid = request.uid;  // uid q foi gerado pelo token

  
    db.any('UPDATE swap.tarefas SET status = $1, concluiu = true WHERE id = $2 and responsavel_id = $3 and status = $4 ', ['C', id_tarefa, uid, 'A'  ])
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

  const exluirTarefa = (request, res=response) => {
    const { id_tarefa} = request.body
    const uid = request.uid;  // uid q foi gerado pelo token

  
    db.any('DELETE FROM swap.tarefas WHERE id = $1 and solicitante_id = $2 and status = $3', [id_tarefa, uid, 'P'  ])
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
    criarTarefa,
    pegarTarefa,
    concluirTarefa,
    exluirTarefa
}
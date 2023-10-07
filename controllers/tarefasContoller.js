const { response } = require("express");
const moment = require('moment');
const { db } = require('../database/config');


const getTarefas = async (req, res = response) => {

  db.any("select t.id, t.descricao, t.status, t.data_criacao, t.solicitante_id, u.nome from swap.tarefas t join swap.usuarios u on t.solicitante_id = u.id  where t.status = 'P' ")
    .then(dados => {
      //console.log(data);
      res.status(200).send({
        success: true,
        dados
      });
    })
    .catch(error => {
      console.error('Erro:', error);
    });
};

const criarTarefa = (request, res = response) => {
  const { descricao } = request.body
  const uid = request.uid;  // uid q foi gerado pelo token
  // Obter a data atual
  const dataAtual = moment();
  const dataFormatada = dataAtual.format('YYYY-MM-DD HH:mm:ss');


  db.any('INSERT INTO swap.tarefas (descricao, status, solicitante_id, data_criacao) VALUES ($1, $2, $3, $4)', [descricao, 'P', uid, dataFormatada])
    .then(data => {
      console.log(data);
      res.status(200).send({
        success: true,
        data
      });
    })
    .catch(error => {
      console.error('Erro:', error);
    })

}
const pegarTarefa = (request, res = response) => {
  const { id_tarefa } = request.body
  const uid = request.uid;  // uid q foi gerado pelo token
  // Obter a data atual
  const dataAtual = moment();
  const dataFormatada = dataAtual.format('YYYY-MM-DD HH:mm:ss');


  db.any('UPDATE swap.tarefas SET responsavel_id = $1,  data_inicio = $2, status = $3 WHERE id = $4 and status = $5', [uid, dataFormatada, 'A', id_tarefa, 'P'])
    .then(data => {
      res.status(200).send({
        success: true,
        message: 'alterado com sucesso.'
      });
    })
    .catch(error => {
      console.error('Erro:', error);
    })

}

const concluirTarefa = (request, res = response) => {
  const { id_tarefa } = request.body
  const uid = request.uid;  // uid q foi gerado pelo token


  db.any('UPDATE swap.tarefas SET status = $1, concluiu = true WHERE id = $2 and responsavel_id = $3 and status = $4 ', ['C', id_tarefa, uid, 'A'])
    .then(data => {
      res.status(200).send({
        success: true,
        message: 'Alterado com sucesso.'
      });
    })
    .catch(error => {
      console.error('Erro:', error);
    })

}

const exluirTarefa = (request, res = response) => {
  const { id_tarefa } = request.body
  const uid = request.uid;  // uid q foi gerado pelo token


  db.any('DELETE FROM swap.tarefas WHERE id = $1 and solicitante_id = $2 and status = $3', [id_tarefa, uid, 'P'])
    .then(data => {
      console.log(data);
      res.status(200).send({
        success: true,
        message: 'Deletado com sucesso.'
      });
    })
    .catch(error => {
      console.error('Erro:', error);
    })

}

const editarTarefa = (request, res = response) => {
  try {
    const { id_tarefa, descricao } = request.body
    const uid = request.uid;  // uid q foi gerado pelo token
    if (uid === undefined) {
      res.status(401).send({
        success: false,
        message: 'Não autorizado.'
      });
    } else {
      db.any('UPDATE swap.tarefas SET descricao = $1 WHERE id = $2 and solicitante_id = $3 and status = $4 ', [descricao, id_tarefa, uid, 'P'])
        .then(data => {
          res.status(200).send({
            success: true,
            message: 'Aterefa alterada com sucesso.'
          });
        })
        .catch(error => {
          console.error('Erro:', error);
        })
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Erro ao alterar a tarefa'
    });
  }
}

module.exports = {
  getTarefas,
  criarTarefa,
  pegarTarefa,
  concluirTarefa,
  exluirTarefa,
  editarTarefa
}
const { response } = require("express");
var md5 = require('md5');

const { db } = require('../database/config');


const getUsers = async (req,res=response) =>{

    db.any('SELECT * FROM swap.usuarios')
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

const createUser = (request, res=response) => {
    const { nome, email, senha, perfil } = request.body

  
    db.any('INSERT INTO swap.usuarios (nome, email, senha, perfil ) VALUES ($1, $2, $3, $4)', [nome, email, md5(senha), perfil])
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
    getUsers,
    createUser
}
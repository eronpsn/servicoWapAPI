const { response } = require("express");
const bcrypt = require('bcryptjs');

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
    const salt = bcrypt.genSaltSync();
    var passWord = bcrypt.hashSync(senha, salt);
  
    db.any('INSERT INTO swap.usuarios (nome, email, senha, perfil ) VALUES ($1, $2, $3, $4)', [nome, email, passWord, perfil])
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

  const deleteUser = (request, res=response) => {
    const { id_user } = request.body
    
  
    db.any('DELETE FROM swap.usuarios where id = $1', [id_user])
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
    createUser,
    deleteUser
}
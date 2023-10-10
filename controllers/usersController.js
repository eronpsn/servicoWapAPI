const { response } = require("express");
const bcrypt = require('bcryptjs');

const { db } = require('../database/config');

const { loginUser } = require('./authController'); 


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

const createUser = async  (request, res=response) => {
    const { nome, email, senha } = request.body
    const salt = bcrypt.genSaltSync();
    var passWord = bcrypt.hashSync(senha, salt);
  try {
    await db.any('INSERT INTO swap.usuarios (nome, email, senha, perfil ) VALUES ($1, $2, $3, $4)', [nome, email, passWord, 'U']);
    //const userId = insertResult[0].id;
     await loginUser({ body: { email, senha } }, res);
   /* console.log(loginResponse);
    if(loginResponse.success){
      const token = loginResponse.token;
      res.status(200).json({
        success: true,
        message: 'Logado com sucesso.',
        user: loginResponse.user,
        token                      
    });
    }else{
      return res.status(400).json({
        success: false,
        message: 'Algo errado.'
    });
    }*/

  /*  .then(data => {
      console.log(data);
      res.json({
        success : true,
        message: 'Criado com sucesso.'
    });
    })*/
  }catch(error) {
      console.error('Erro:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao criar o usuário'
      });
    }
    
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
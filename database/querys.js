//const pgp = require('pg-promise')();
const { db } = require('./config');

//const db = pgp(connectionConfig);

// Adicionar o schema "stesa" à sessão
//db.any('SET search_path TO swap');

// Exemplo de consulta usando o schema "stesa"
db.any('SELECT * FROM swap.usuarios')
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Erro:', error);
  });

const pgp = require('pg-promise')();
require('dotenv').config();


const connectionConfig = {
    host: process.env.HOST_DB,
    port: process.env.PORT_DB,
    database: process.env.DATABASE,
    user: process.env.USER_DB,
    password: process.env.PASS_WORD_DB,
    ssl: {
      rejectUnauthorized: false, // Necessário quando sslmode=require
    },
  };
  const db = pgp(connectionConfig);


  module.exports = {
    db
  }
 
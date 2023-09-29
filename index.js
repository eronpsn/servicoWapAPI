const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { formatString } = require("./helpers/format_string");

// Express App
const app = express();

// Json and Cors Middlewares
app.use(cors());
app.use(express.json());

// path public
const public = path.resolve(__dirname,'public');
app.use(express.static(public));
const URL_API = formatString('/api/{0}',process.env.VERSAO_API);
// Routes
app.use(formatString('{0}/login',URL_API), require('./routes/authRoute'));
app.use(formatString('{0}/users',URL_API), require('./routes/usersRoute'));
app.use(formatString('{0}/tarefas',URL_API), require('./routes/tarefasRoute'));


//Node server (socket)
const server = require('http').createServer(app);

// Listen to Server (Socket)
server.listen(3000,(err)=>{  //process.env.PORT
    if(err) throw new Error(err);
    console.log('Server running on Port: ',process.env.PORT);
});


const { response, json } = require("express");
const { db } = require('../database/config');

//const https = require('https');
//const axios = require('axios').default;
const bcrypt = require('bcryptjs');
//const User = require('../models/user');
//const Usuario = require('../models/usuario');
const { generateToken } = require("../helpers/jwt");
const { formatString } = require("../helpers/format_string");


const loginUser = async (req, res = response) => {

    const { email, senha } = req.body
    //const email = req.body.email // is same

    try {
        //valid user
        db.any('SELECT * FROM swap.usuarios s WHERE email = $1', [email])
            .then(async data => {
                if (data.length === 0) {
                    res.status(400).json({
                        success: false,
                        message: 'user NOT found'
                    });
                } else {

                    //valid password
                    const validPw = bcrypt.compareSync(senha, data[0]['senha']);
                    if (!validPw) {
                        return res.status(400).json({
                            success: false,
                            message: 'Invalid password'
                        });
                    }

                    // generate JWT (json web token)
                    const token = await generateToken(data[0]['id']);

                    res.status(200).json({
                        success: true,
                        message: 'Logado com sucesso.',
                        user: {
                            "id": data[0]['id'],
                            "nome": data[0]['nome'],
                            "perfil": data[0]['perfil']
                        },
                        token                      
                    });
                }
            })
            .catch(error => {
                console.error('Erro:', error);
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Unknown Error, contact administrator'
        });
    }

};

const renewToken = async (req, res = response) => {

    try {

        const uid = req.uid;  // uid q foi gerado pelo token
        console.log("uid: " + uid);
        db.any('SELECT * FROM swap.usuarios WHERE id = $1', [uid])
            .then(async data => {
                console.log(data);
                if (data.length === 0) {
                    return res.status(404).json({
                        ok: false,
                        msj: 'user NOT found'
                    });
                } else {
                    //create new JWT (json web token)
                    const token = await generateToken(uid);
                    res.json({
                        ok: true,
                        token
                    });
                }

            })
            .catch(error => {
                console.error('Erro:', error);
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Erro desconhecido, entre em contato com o administrador'
        });
    }
}

module.exports = {
    loginUser,
    renewToken
}
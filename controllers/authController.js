const { response, json } = require("express");
const https = require('https');
const axios = require('axios').default;
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Usuario = require('../models/usuario');
const { generateToken } = require("../helpers/jwt");
const { geraMath } = require("../helpers/math");

const createUser = async (req, res = response) => {

    const { email, password } = req.body
    // const email = req.body.email // is same

    try {

        const user = new User(req.body);

        // validate if email already exists
        const emailExist = await User.findOne({ email: email });
        if (emailExist) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already exists'
            });
        }

        // encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // generate JWT (json web token)
        const token = await generateToken(user.id);

        await user.save();

        res.json({
            ok: true,
            user,
            token,
            msg: 'User Sucsefully created'
            //message:req.body
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unknown Error, Contact Admin'
        });
    }

};

const loginUser = async (req, res = response) => {

    const { email, password } = req.body
    //const email = req.body.email // is same

    try {
        //valid user
        const userDB = await User.findOne({ email });
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msj: 'user NOT found'
            });
        }

        //valid password
        const validPw = bcrypt.compareSync(password, userDB.password);
        if (!validPw) {
            return res.status(400).json({
                ok: false,
                msj: 'Invalid password'
            });
        }

        // generate JWT (json web token)
        const token = await generateToken(userDB.id);

        res.json({
            ok: true,
            user: userDB,
            token
            //message:req.body
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unknown Error, contact administrator'
        });
    }

};

const renewToken = async (req, res = response) => {

    try {

        const uid = req.uid;  // uid q foi gerado pelo token

        //create new JWT (json web token)
        const token = await generateToken(uid);

        //valid user
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msj: 'Usuário não localizado'
            });
        }

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Erro desconhecido, entre em contato com o administrador'
        });
    }
}
const renewCod = async (req, res = response) => {

    /* client.get("https://localhost:5001/api/v1/usuario/matricula/eronildes_pereira", function (data, response) {
     // parsed response body as js object
     console.log(data);
     // raw response
     console.log(response);
 });*/
    // registering remote methods
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    })
    axios.defaults.httpsAgent = httpsAgent
    axios.get('https://localhost:5001/api/v1/usuario/matricula/eronildes_pereira')
        .then(res => {
            const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
            console.log('Status Code:', res.status);
            console.log('Date in Response header:', headerDate);

            const users = res.data;
            console.log(users);

            /* for(user of users) {
               console.log(`Got user with id: ${user.id}, name: ${user.name}`);
             }*/
        })
        .catch(err => {
            console.log('Error: ', err.message);
        });
}

const CriarNovoUsuario = async (req, res = response) => {

    const { matricula } = req.body

    try {
        var fullUrl = req.protocol + '://' + req.get('host');
        const codVerificacao = geraMath(111111, 999999);
        const user = await Usuario.findOne({ matricula: matricula.trim() });
        if (user) {
            //gera um novo código de verficação e envia por email    
            // encrypt o código de verificacao
            const salt = bcrypt.genSaltSync();
            var newCodVerificacao = bcrypt.hashSync(codVerificacao.toString(), salt);
            var newCodValidacao = "nA";

            // generate JWT (json web token)
            const token = await generateToken(user.id);
            const _res = await Usuario.findOneAndUpdate({ _id: user.id },
                { $set: { codVerificacao: newCodVerificacao, codValidacao: newCodValidacao, ativo: false } }, { new: true });

            console.log('COD. VERIFICACAO: ' + codVerificacao);
            res.json({
                ok: true,
                usuario_id: user.id,
                token,
                msg: 'Novo código gerado com sucesso.'
            });
        }else{
        var rota = `/d2l/api/lp/1.4/users/?UserName=${matricula.trim()}`;
        axios.get(fullUrl + '/api/login/d2l', {
            headers: {
                'x-rota': rota.trim()
            }
        })
            .then(async function (response) {
                const resp = response.data;
                if (resp.ok) {
                    var nome = resp.dados.DisplayName;
                    const usuario = new Usuario(req.body);
                    usuario.nome = nome;
                    usuario.email = resp.dados.ExternalEmail;
                    usuario.imagemPerfil = 'https://ui-avatars.com/api/?name=' + nome.replace(' ', '+');

                    // encrypt o código de verificacao
                    const salt = bcrypt.genSaltSync();
                    usuario.codVerificacao = bcrypt.hashSync(codVerificacao.toString(), salt);

                    // generate JWT (json web token)
                    const token = await generateToken(usuario.id);

                    await usuario.save();
                    console.log('COD. VERIFICACAO: ' + codVerificacao);
                    res.json({
                        ok: true,
                        usuario_id: usuario.id,
                        token,
                        msg: 'Usuário cadastrado com sucesso.'
                    });

                } else {
                    res.status(500).json({
                        ok: false,
                        msg: 'Usuário não loclizado no AVA'
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
                res.status(500).json({
                    ok: false,
                    msg: 'Erro ao cadastro usuário'
                });
            })
            .finally(function () {
                // always executed
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Erro ao cadastro usuário'
        });
    }

};

const ValidaCodigoVerificacao = async (req, res = response) => {
    const {usuario_id, cod_verificacao } = req.body   
    try {
        const usuario = await Usuario.findOne({
            _id: usuario_id
        },{_id:1, nome: 1, online: 1, email: 1, perfil:1, imagemPerfil: 1, ativo:1, ultimoAcesso:1, codVerificacao:1 });
        if (usuario) {
            const validPw = bcrypt.compareSync(cod_verificacao.toString(), usuario.codVerificacao);         
            if (!validPw) {
                return res.status(400).json({
                    ok: false,
                    msj: 'Código Inválido'
                });
            }
            const token = await generateToken(usuario_id);
            // gera e encrypt o código de validação
            var cod = geraMath(111111, 999999)
            const salt = bcrypt.genSaltSync();
            var codValidacao = bcrypt.hashSync(cod.toString(), salt);
                const _res = await Usuario.findOneAndUpdate({ _id: usuario_id},
                    { $set: { codValidacao: codValidacao, ativo: true } }, { new: true });
            console.log('CÓDIGO DE VALIDAÇÃO: ' + cod);        
            return res.status(200).json({
                ok: true,
                usuario: usuario,
                codValidacao: cod,
                token,
                msg: 'Ativado com sucesso'
            });
        }else{
        return res.status(400).json({
            ok: false,
            msg: 'Usuário não existe'
        });
    }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Erro ao ativar usuário'
        });
    }

}





module.exports = {
    createUser,
    loginUser,
    renewToken,
    renewCod,
    CriarNovoUsuario,   
    ValidaCodigoVerificacao
}
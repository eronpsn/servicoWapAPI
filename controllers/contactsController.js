const { response } = require("express");
const Usuario = require('../models/usuario');
const Contato = require('../models/contato');

const MeusContatos = async (req, res = response) => {

    try {

        Usuario.
            findOne({ _id: req.uid }).
            populate({ path: 'contatos.usuario', select: ['nome','imagemPerfil'] }).
            exec(function (err, dados) {
                if (err) return handleError(err);
                res.json({
                    ok: true,
                    contatos: dados.contatos,
                    msg: 'Lista de contatos'
                    //message:req.body
                });
            });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Erro ao buscar contato'
        });
    }

};

const NovoContato = async (req, res = response) => {    
    const { usuario_id, contato_id } = req.body
    try {
        const usuario = await Usuario.findOne({ _id: usuario_id }).lean();
        console.log(usuario);
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuário não existe'
            });
        }
        /*   const nDate = new Date().toLocaleString('en-US', {
               timeZone: 'Asia/Calcutta'
             });*/

        const contato = new Contato();
        contato.usuario = contato_id;

        const _res = await Usuario.findOneAndUpdate({ _id: usuario_id }, {
            "$addToSet": {
                contatos: [
                    contato
                ]
            },

        }
        );

        res.json({
            ok: true,
            //usuario,
            msg: 'Contato cadastrado com sucesso.'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Erro ao cadastro de contato'
        });
    }

};

const BloqueContato = async (req, res = response) => {
    const { usuario_id, contato_id } = req.body
    console.log(req.body)

    try {
        const usuario = await Usuario.findOne({ _id: usuario_id }).lean();
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuário não existe'
            });
        }
        const _res = await Usuario.findOneAndUpdate({ _id: usuario_id, "contatos.usuario_id": contato_id },
            { "contatos.$.bloqueado": true });

        res.json({
            ok: true,
            _res,
            msg: 'Contato bloqueado com sucesso.'
            //message:req.body
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Erro ao bloquear contato'
        });
    }

};

module.exports = {
    MeusContatos,
    NovoContato,
    BloqueContato
}
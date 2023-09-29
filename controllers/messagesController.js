
const Messagem = require('../models/message');
const Usuario = require('../models/usuario');


const getChat = async (req, res) => {

    const uid = req.uid;
    const mFrom = req.params.from;
console.log("de " + uid + " para" + mFrom);
    var last30;

    // If mFrom starts with "AAA" => it IS a group message
    if (mFrom.substring(0, 3) == "AAA") {
        //console.log(mFrom.slice(3))

        last30 = await Messagem.find({ destinatario: mFrom.slice(3) })
            .sort({ createdAt: 'desc' })
            .limit(30);

        res.json({
            ok: true,
            msj: last30,
        })
    } else { // Not a group message (No "AAA")
        last30 = await Messagem.find({
            $or: [{ remetente: uid, destinatario: mFrom }, { destinatario: mFrom, remetente: uid }]
        })
            .sort({ createdAt: 'desc' })
            .limit(30);

        res.json({
            ok: true,
            msj: last30,
        })
    }

};

const mensgensRecentes = async (req, res = response) => {
    //console.log(req.uid)

    try {
        const uid = req.uid;
       console.log(uid);
     var teste = await  Messagem.aggregate(
        [
          {
            $group: {
              _id:  '$destinatario',
              "time" : {
                "$push" : {
                    "date" : "$messagem", 
                    "duration" : "$nome",
                    "remetente": "$remetente",
                    "destinatario": "$destinatario",
                }
            } 
            }
          },
          { 
            "$project" : {
                "_id" : false, 
                "destinatario" : "$destinatario", 
                "time" : "$time"
            }
        }, 
        { 
            "$unwind" : "$time"
        }
        ]
     )


     res.json({
        ok: true,
        msj: teste,
        msg: 'Lista de mensagens recentes'
    });


      //var  mensagens = await 
   /*   Messagem.find({
            $or: [{ remetente: uid }, { destinatario: uid }]
        })
            .sort({ createdAt: 'desc' }).
         //   limit(1).
             populate({ path: 'destinatario', select: ['nome', 'imagemPerfil'] }).
             exec(function (err, dados) {

                console.log("Retorno");
                console.log(dados);
                if (err) return handleError(err);
               // var mensagens = (dados) ? dados.contatos : [];
                res.json({
                    ok: true,
                    msj: dados,
                    msg: 'Lista de mensagens recentes'
                });
            });*/


       /* res.json({
            ok: true,
            msj: mensagens,
        })*/
      /*  Usuario.
            findOne({ 
                $and: [
                    { _id: req.uid }//, { "contatos.ultimaMensagem": { $ne: "nA" } }
                ]
            }).
            populate({ path: 'contatos.usuario', select: 'nome' }).
            exec(function (err, dados) {

                console.log("Retorno");
                console.log(dados);
                if (err) return handleError(err);
                var contatos = (dados) ? dados.contatos : [];
                res.json({
                    ok: true,
                    msj: contatos,
                    msg: 'Lista de mensagens recentes'
                });
            });*/


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Erro ao buscar mensagens'
        });
    }

};

module.exports = {
    getChat,
    mensgensRecentes
}
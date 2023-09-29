const { Schema, model } = require("mongoose");

const Contato = new Schema({
    usuario: {type:  Schema.Types.ObjectId, ref: 'Usuarios', required: true},
    bloqueado: {type: Boolean, default: false},
    dataCriado: { type: Date, default: Date.now },
    ultimaMensagem:{type: String, default:"nA"},
    dataUltimaMensagem: { type: Date, default: Date.now },
});

const UsuarioSchema = Schema({
    nome: {
        type: String,
        required: true
    },
    matricula: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: true,
    },
    ativo: {
        type: Boolean,
        default: true,
    },
    dataInscricao: {
        type: String,
        default: new Date().toISOString().replace('T', ' ').substring(0, 19),
    },
    codVerificacao: {
        type: String,
        required: true
    },
    codValidacao: {
        type: String,
        default: "nA"
    },
    ultimoAcesso:{
        type: String,
        default: new Date().toISOString().replace('T', ' ').substring(0, 19),
    },
    imagemPerfil:{
        type: String,
        default: ''
    },
    perfil:{
        type: String,
        default: 'Aluno'
    },
    contatos:[Contato]
});


// extract only what we need to show
UsuarioSchema.method('toJSON',function(){
    const { __v,_id, codVerificacao, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Usuarios',UsuarioSchema);
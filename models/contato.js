const { Schema, model } = require("mongoose");
const Contato = new Schema({
    usuario: {type:  Schema.Types.ObjectId, ref: 'Usuarios', required: true},
    bloqueado: {type: Boolean, default: false},
    dataCriado: { type: Date, default: Date.now },
    ultimaMensagem:{type: String, default:"nA"},
    dataUltimaMensagem: { type: Date, default: Date.now },
});

Contato.method('toJSON',function(){
    const { __v,_id, usuario_id, ...object} = this.toObject();
    object.uid = _id;
    //console.log(object)
    return object;
});

module.exports = model('Contato',Contato);
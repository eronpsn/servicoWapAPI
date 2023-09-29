const { Schema, model } = require("mongoose");

const MessagemSchema = Schema({
    remetente: {
        type: Schema.Types.ObjectId,
        ref:'Usuarios',
        required: true
    },
    destinatario: {
        type: Schema.Types.ObjectId,
        ref:'Usuarios',
        required: true
    },
    messagem: {
        type: String,
        required: true,
    },
    chatGrupo: {
        type: Boolean,
        required: false,
    },
    nome: {
        type: String,
        required: true,
    },
},{
    timestamps:true
});

// extract what we need to show
MessagemSchema.method('toJSON',function(){
    const { __v,_id, ...object} = this.toObject();
    return object;
});


module.exports = model('Messagem',MessagemSchema);
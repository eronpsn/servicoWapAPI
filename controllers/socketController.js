const Usuario = require('../models/usuario')
const Messagem = require('../models/message');

const userConnected = async (uid ='') =>{
    const user = await Usuario.findById(uid);
    if(user){
    user.online = true;
    user.ultimoAcesso = new Date().toISOString().replace('T', ' ').substring(0, 19);
    await user.save();
    }
    return user;
};

const userDisconnected = async (uid ='') =>{
    const user = await Usuario.findById(uid);
    if(user){
    user.online = false;
    user.ultimoAcesso = new Date().toISOString().replace('T', ' ').substring(0, 19);
    await user.save();
    }
    return user;
};

const saveMessage = async(payload) =>{
    /*payload {from:'',to:'',message:''} */

    try {
        const message = Messagem(payload);
        await message.save();
        return true;
    } catch (error) {
        return false;
    }
}


module.exports = {
    userConnected,
    userDisconnected,
    saveMessage
}
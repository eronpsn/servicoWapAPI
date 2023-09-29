const jwt = require('jsonwebtoken');

const validateJWT = (req,res,next) => {

    // read token
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok:false,
            msj:'Token não encontrado'
        });
    }

    try {
        // Try to verify token, if not go to catch
        const { uid } = jwt.verify(token,'fnns23e@fkndjs783bd8jwjf0hg?ef6jhnsp'); //process.env.JWTKEY
        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msj:'Token inválido'
        });
    }

    
}

module.exports = {
    validateJWT
}
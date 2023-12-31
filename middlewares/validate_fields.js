const { validationResult } = require("express-validator");

const validateFields = (req,res,next) => {

    const err  = validationResult(req);
    
    if(!err.isEmpty()){
        return res.status(400).json({
            ok : false,
            message:err.mapped(),
            msg:'Informação inválida'
        });
    }
        
    next();
}

module.exports = {
    validateFields
}
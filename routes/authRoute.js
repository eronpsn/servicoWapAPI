// path: /auth/login

const { Router } = require('express');
const { check } = require('express-validator');
const { loginUser, renewToken } = require('../controllers/authController');
const { validateFields } = require('../middlewares/validate_fields');
const { validateJWT } = require('../middlewares/validate_jwt');

const router = Router();
router.post('/',[
    check('email','Email é obrigatório').isEmail(),
    check('senha','Senha é obrigatório').not().isEmpty(),
    check('perfil','Perfil é obrigatório').not().isEmpty(),
    validateFields
],loginUser);

//validateJWT
router.get('/atualiza-token',validateJWT, renewToken)

module.exports = router;


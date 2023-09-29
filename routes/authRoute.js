// path: /auth/login

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser,loginUser,renewToken,renewCod, CriarNovoUsuario,  ValidaCodigoVerificacao } = require('../controllers/authController');
const{RequestD2L} = require('../valence/doRequest');
const { validateFields } = require('../middlewares/validate_fields');
const { validateJWT } = require('../middlewares/validate_jwt');

const router = Router();

//router.post('/new',createUser);
router.post('/new',[
    check('name','Nome é obrigatório').not().isEmpty(),
    check('email','Email é obrigatório').isEmail(),
    check('password','Password é obrigatório').not().isEmpty(),
    validateFields
],createUser);

router.post('/',[
    check('email','Email é obrigatório').isEmail(),
    check('password','Password é obrigatório').not().isEmpty(),
    validateFields
],loginUser);

//validateJWT
router.get('/atualiza-token',validateJWT, renewToken)

router.get('/auenticar',renewCod)

router.post('/novo-usuario',CriarNovoUsuario)

router.get('/d2l',RequestD2L)

router.post('/valida-codigo-verificacao',validateJWT, ValidaCodigoVerificacao);

module.exports = router;


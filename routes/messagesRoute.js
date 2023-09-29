// path: /auth/login

const { Router } = require('express');
const { getChat,mensgensRecentes } = require('../controllers/messagesController');
const { validateJWT } = require('../middlewares/validate_jwt');

const router = Router();

//validateJWT
router.get('/mensagens-recentes',validateJWT, mensgensRecentes)
router.get('/:from',validateJWT, getChat)



module.exports = router;
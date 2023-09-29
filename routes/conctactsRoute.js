const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate_jwt');
const {MeusContatos, NovoContato, BloqueContato} = require('../controllers/contactsController');

const router = Router();
router.get('/',validateJWT,MeusContatos)

router.post('/novo-contato',validateJWT,NovoContato)

router.post('/bloquea-contato',validateJWT,BloqueContato)
module.exports = router;
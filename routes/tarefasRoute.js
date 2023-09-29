const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate_jwt');
const { getTarefas, criarTarefa } = require('../controllers/tarefasContoller');

const router = Router();

router.get('/',validateJWT, getTarefas)
router.post('/nova-tarefa', validateJWT,criarTarefa)

module.exports = router;
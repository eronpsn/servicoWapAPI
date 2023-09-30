const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate_jwt');
const { getTarefas, criarTarefa, pegarTarefa, concluirTarefa, exluirTarefa } = require('../controllers/tarefasContoller');

const router = Router();

router.get('/',validateJWT, getTarefas)
router.post('/nova-tarefa', validateJWT,criarTarefa)
router.post('/pegar-tarefa', validateJWT,pegarTarefa)
router.post('/concluir-tarefa', validateJWT,concluirTarefa)
router.post('/excluir-tarefa', validateJWT,exluirTarefa)

module.exports = router;
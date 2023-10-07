const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate_jwt');
const { getTarefas, criarTarefa, pegarTarefa, concluirTarefa, exluirTarefa, editarTarefa } = require('../controllers/tarefasContoller');

const router = Router();

router.get('/',validateJWT, getTarefas)
router.post('/nova-tarefa', validateJWT,criarTarefa)
router.put('/pegar-tarefa', validateJWT,pegarTarefa)
router.put('/concluir-tarefa', validateJWT,concluirTarefa)
router.delete('/excluir-tarefa', validateJWT,exluirTarefa)
router.put('/editar-tarefa', validateJWT,editarTarefa)

module.exports = router;
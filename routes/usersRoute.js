// path: /auth/login

const { Router } = require('express');
const { getUsers, createUser, deleteUser } = require('../controllers/usersController');
const { validateJWT } = require('../middlewares/validate_jwt');
const router = Router();

//validateJWT
router.get('/',validateJWT, getUsers)
router.post('/novo-usuario', createUser)
router.post('/excluir-usuario',validateJWT, deleteUser)

module.exports = router;


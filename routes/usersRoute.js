// path: /auth/login

const { Router } = require('express');
const db = require('../database/config');
const { getUsers, createUser } = require('../controllers/usersController');
const { validateJWT } = require('../middlewares/validate_jwt');
const router = Router();

//validateJWT
//router.get('/',validateJWT, getUsers)
router.get('/', getUsers)
router.post('/novo-usuario', createUser)

module.exports = router;


const express = require("express");
const { cadastrarUsuario } = require("../controller/usuarios/cadastroUsuario");
const { login } = require("../controller/usuarios/loginUsuario");
const { cadastrarTarefa } = require("../controller/todos/registerTask");
const verificaLogin = require('../middleware/verificarLogin')
const router = express.Router();

router.post('/cadastro', cadastrarUsuario)
router.post('/login', login)

router.use(verificaLogin)

router.post('/cadastrarTarefa', cadastrarTarefa)


module.exports = router;

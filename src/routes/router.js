const express = require("express");
const { cadastrarUsuario } = require("../controller/usuarios/cadastroUsuario");
const { login } = require("../controller/usuarios/loginUsuario");
const { cadastrarTarefa } = require("../controller/todos/registerTask");

const router = express.Router();

module.exports = router;

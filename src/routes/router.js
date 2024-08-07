const express = require("express");
const router = express.Router();

const cadastrarUsuario = require("../controller/usuarios/cadastroUsuario");
const login = require("../controller/usuarios/loginUsuario");
const cadastrarTarefa = require("../controller/todos/registerTask");
const verificaLogin = require("../middleware/verificarLogin");

router.post("/cadastro", cadastrarUsuario);
router.post("/login", login);

router.use(verificaLogin);

router.post("/cadastrarTarefa", cadastrarTarefa);
// router.put("/atualizarTarefa/:id", atualizarTarefa)
// router.get("/listarTarefa", listarTarefa)
// router.delete("/deletarTarefa/:id", deletarTarefa);

module.exports = router;

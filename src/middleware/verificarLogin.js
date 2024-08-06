const pool = require("../database/conexao");
const jwt = require("jsonwebtoken");
const senhajwt = require("../segredo"); //substituir

const verificaLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Não autorizado" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, senhajwt);
    const { rows, rowCount } = await pool.query(
      "select * from usuarios where id = $1", [id]
    ); // substituir knex ou prisma

    if (rowCount === 0) {
      return res.status(401).json({ message: "Não autorizado" })
    }

    const {senha, ...usuario} = rows[0]

    req.usuario = usuario

    next()
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor - (caiu no catch)" });
  }
};

module.exports = verificaLogin
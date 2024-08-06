const bcrypt = require("bcrypt");
const pool = require("../../database/conexao");
const jwt = require("jsonwebtoken");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    if (!nome || !email || !senha) {
      return res.status(401).json({ message: "Todos campos são obrigatórios" });
    }

    const emailExiste = await pool.query(
      "select * from usuarios where email = $1",
      [email]
    );

    if (emailExiste.rowCount > 0) {
      return res
        .status(401)
        .json({ message: "Email já existe, email deve ser único" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const query =
      "insert into usuarios (nome, email, senha) values ($1, $2, $3) returning *";

    const { rows } = await pool.query(query, [nome, email, senhaCriptografada]);

    const { senha: _, ...usuario } = rows[0];

    return res.status(201).json(usuario);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

module.exports = cadastrarUsuario;

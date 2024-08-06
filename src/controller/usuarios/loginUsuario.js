const bcrypt = require("bcrypt");
const pool = require("../../database/conexao");
const jwt = require("jsonwebtoken");
const senhajwt = require("../../segredo")

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const { rows, rowCount } = await pool.query(
      "select * from usuarios where email = $1",
      [email]
    );

    if (rowCount === 0) {
      return res.status(400).json({ message: "Email ou senha inválidos"})
    }

    const  {senha: senhaUsuario, ... usuario} = rows[0] //spread operator

    const senhaCorreta = await bcrypt.compare(senha, senhaUsuario);

    if (!senhaCorreta) {
      return res.status(400).json({ message: "Email ou senha inválidos" })
    }

    const token = jwt.sign({ id: usuario.id },  senhajwt,  { expiresIn: "8h" });

    return res.json({
      usuario,
      token,
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = login
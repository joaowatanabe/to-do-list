const pool = require("../../database/conexao");
const addressHandler = require("../../utils/addressHandler");

const cadastrarTarefa = async (req, res) => {
  const { tarefa, ativo, cep } = req.body;

  if (!tarefa) {
    return res.status(400).json({ message: "Campo tarefa é obrigatório" });
  }

  if (!cep && !cep.length < 8) {
    return res.status(400).json({
      message:
        "O campo cep é obrigatório e deve ser no formato correto 00000000",
    });
  }

  const enderecoData = await addressHandler.getEndereco(cep);

  const enderecoFormatado = await addressHandler.formatarEndereco(enderecoData);

  try {
    const query =
      "insert into todos (usuario_id, tarefa, ativo, data, endereco) values ($1, $2, $3, $4, $5) returning *";

    const params = [
      req.usuario.id,
      tarefa,
      ativo,
      new Date(),
      enderecoFormatado,
    ];

    const { rows } = await pool.query(query, params);

    return res.status(201).json(rows[0])
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

module.exports = cadastrarTarefa;

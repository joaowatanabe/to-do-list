const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "todolist",
});

module.exports = pool;

//Mudar isso conforme o .env igual outro desafio

const axios = require("axios");

const getEndereco = async (cep) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

const formatarEndereco = async (cepData) => {
  return `${cepData.logradouro}, ${cepData.uf}`;
};

module.exports = { getEndereco, formatarEndereco };

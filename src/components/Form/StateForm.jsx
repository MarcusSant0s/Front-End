import React, { useState } from 'react';
import axios from 'axios';

const StateForm = () => {
  const [stateName, setStateName] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dados a serem enviados para o servidor
    const stateData = {
      stateName: stateName
    };

    // Configuração da requisição, incluindo a autenticação básica
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:admin'), // Autenticação básica
      }
    };

    try {
      // Enviar a requisição POST com Axios
      const response = await axios.post('http://localhost:8080/api/states', stateData, config); 
      setResponseMessage(`State added successfully: ${JSON.stringify(response.data)}`);
    } catch (error) {
      setResponseMessage(`Error: ${error.response ? error.response.data : error.message}`);
    }
  };

  return (
    <div>
      <h2>Cadastro de Estado</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="stateName">Nome do Estado:</label>
          <input
            type="text"
            id="stateName"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default StateForm;

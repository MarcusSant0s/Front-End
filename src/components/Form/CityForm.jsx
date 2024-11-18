import React, { useState } from 'react';
import axios from 'axios';

const CityForm = () => {
  const [cityName, setCityName] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dados a serem enviados para o servidor
    const stateData = {
        cityName: cityName
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
      const response = await axios.post('http://localhost:8080/api/cities', stateData, config); 
      setResponseMessage(`City added successfully: ${JSON.stringify(response.data)}`);
    } catch (error) {
      setResponseMessage(`Error: ${error.response ? error.response.data : error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-custom-gray text-gray-800">
        <header className="bg-white shadow-md p-4">
            <h2>Cadastro da Cidade</h2>
        </header> 
        <main className="p-6">
        <section className="h-screen flex flex-col  ">
      <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center p-2 w-max  mx-auto bg-white rounded-md'>
        <div>
          <label htmlFor="cityName">Nome:</label>
          <input
            type="text"
            id="cityName"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </section>
    </main>
    </div>
  );
};

export default CityForm;

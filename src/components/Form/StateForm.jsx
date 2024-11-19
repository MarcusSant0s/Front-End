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
    <div className="min-h-screen text-gray-800">

    <main className="p-6">
    <section className="h-screen flex flex-col  "> 
     <form onSubmit={handleSubmit} className='mx-auto flex flex-col
        items-center justify-center 
        p-2 w-max  mx-aut
        bg-white rounded-md gap-2
        shadow-lg border border-black/10'>
       <h2 className='font-semibold'>Cadastro de UF</h2>
        <div>
           <input
             className='border-b border-b-gray-300 px-1'
              type="text"
              id="stateName"
              placeholder='Nome'
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
              required
            />
        </div>
        <button 
          className='ml-auto bg-green-500
           text-white font-semibold px-2 
           py-1 rounded-sm '
          type="submit">Salvar</button>
      </form>
      </section>
      {responseMessage && <p>{responseMessage}</p>}
      </main>
    </div>
  );
};

export default StateForm;

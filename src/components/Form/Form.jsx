import React, { useState } from "react";

export default function Form() {
  // Definindo o estado local para os campos do formulário
  const [values, setValues] = useState({
    name: "",
    lastName: "",
    age: "",
    typeDocument: "",
    numberDocument: "",
    gender: "",
    phoneNumber: "",
  });

  // Função de envio do formulário
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode enviar os dados para a API ou outro processo
    alert("Formulário enviado com sucesso!");
  };

  // Função para atualizar o valor dos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Formulário de Cadastro</h2>

      <form onSubmit={handleFormSubmit}>
        {/* Primeiro Nome */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Primeiro Nome
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
            placeholder="Digite seu primeiro nome"
          />
        </div>

        {/* Sobrenome */}
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Sobrenome
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
            placeholder="Digite seu sobrenome"
          />
        </div>

        {/* Idade */}
        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Idade
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={values.age}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
            placeholder="Digite sua idade"
          />
        </div>

        {/* Tipo de Documento */}
        <div className="mb-4">
          <label htmlFor="typeDocument" className="block text-sm font-medium text-gray-700">
            Tipo de Documento
          </label>
          <select
            id="typeDocument"
            name="typeDocument"
            value={values.typeDocument}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
          >
            <option value="" disabled hidden className="">Selecione o tipo de documento</option> 
            <option value="CPF">CPF</option>
            <option value="CNPJ">CNPJ</option>
 
          </select>
        </div>

        {/* Número do Documento */}
        <div className="mb-4">
          <label htmlFor="numberDocument" className="block text-sm font-medium text-gray-700">
            Número do Documento
          </label>
          <input
            type="text"
            id="numberDocument"
            name="numberDocument"
            value={values.numberDocument}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
            placeholder="Digite o número do documento"
          />
        </div>

        {/* Gênero */}
        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gênero
          </label>
          <select
            id="gender"
            name="gender"
            value={values.gender}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
          >
            <option value=""  disabled hidden >Selecione o gênero</option>
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
            <option value="other">Prefiro não dizer</option>
          </select>
        </div>

        {/* Número de Telefone */}
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Número de Telefone
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
            placeholder="Digite seu número de telefone"
          />
        </div>

        {/* Botão de Envio */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-3 px-4 text-white bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

import React, { useState } from "react";
// Importando o InputMask para campos de telefone e documento
import InputMask from "react-input-mask"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Form() {
  // Estado do formulário
  const [values, setValues] = useState({
    name: "",
    lastName: "",
    age: "",
    typeDocument: "",
    numberDocument: "",
    gender: "",
    phoneNumber: "",
    contractType: "",  // Novo campo para formato de contratação
    isActive: false,   // Novo campo para indicar se está ativo (booleano)
    observation: "",   // Novo campo de observação
  });

  // Estado de erros
  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    age: "",
    typeDocument: "",
    numberDocument: "",
    phoneNumber: "",
    gender: "",
    contractType: "",
    isActive: "",
    observation: "",
  });

  // Função para lidar com as mudanças nos campos
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Se for checkbox, atualiza o valor como booleano
    if (type === "checkbox") {
      setValues({
        ...values,
        [name]: checked,
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }

    // Validação básica para não permitir números nos campos de nome e sobrenome
    if (name === "name" || name === "lastName") {
      if (/[\d]/.test(value)) {
        setErrors({
          ...errors,
          [name]: "O nome não pode conter números.",
        });
      } else {
        setErrors({
          ...errors,
          [name]: "",
        });
      }
    }
  };

  // Validação da idade (deve ser maior ou igual a 18 anos para contratação)
  const validateAge = (age) => {
    if (age < 18) {
      setErrors({
        ...errors,
        age: "A idade mínima para contratação é 18 anos.",
      });
    } else if (age < 1 || age > 100) {
      setErrors({
        ...errors,
        age: "A idade deve ser um número entre 1 e 100.",
      });
    } else {
      setErrors({
        ...errors,
        age: "",
      });
    }
  };

  // Função de envio do formulário
  const handleFormSubmit = (e) => {
    e.preventDefault();

    let formIsValid = true;

    // Resetando os erros antes de validar
    let newErrors = {
      name: "",
      lastName: "",
      age: "",
      typeDocument: "",
      numberDocument: "",
      phoneNumber: "",
      gender: "",
      contractType: "",
      isActive: "",
      observation: "",
    };

    // Verificando campos obrigatórios
    if (!values.name.trim()) {
      newErrors.name = "O nome é obrigatório.";
      formIsValid = false;
    }

    if (!values.lastName.trim()) {
      newErrors.lastName = "O sobrenome é obrigatório.";
      formIsValid = false;
    }

    if (!values.age.trim()) {
      newErrors.age = "A idade é obrigatória.";
      formIsValid = false;
    } else if (parseInt(values.age) < 18) {
      newErrors.age = "A idade mínima para contratação é 18 anos.";
      formIsValid = false;
    } else if (parseInt(values.age) < 1 || parseInt(values.age) > 100) {
      newErrors.age = "A idade deve ser entre 1 e 100.";
      formIsValid = false;
    }

    if (!values.typeDocument) {
      newErrors.typeDocument = "Selecione o tipo de documento.";
      formIsValid = false;
    }

    if (!values.numberDocument.trim()) {
      newErrors.numberDocument = "O número do documento é obrigatório.";
      formIsValid = false;
    }

    if (!values.phoneNumber.trim()) {
      newErrors.phoneNumber = "O número de telefone é obrigatório.";
      formIsValid = false;
    }

    if (!values.gender) {
      newErrors.gender = "Selecione o gênero.";
      formIsValid = false;
    }

    if (!values.contractType) {
      newErrors.contractType = "Selecione o formato de contratação.";
      formIsValid = false;
    }

    // Atualizando os erros se houver algum
    setErrors(newErrors);

    // Somente enviar o formulário se ele for válido
    if (formIsValid) {
      toast.success('Formulário enviado com sucesso!', {
        position: "bottom-right",
        autoClose: 2000,
      });
      
      // Aqui você pode realizar a lógica de envio para a API ou outro processo
    }
  };

  return (
    
    
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-2 lg:-mt-14">
      <h2 className="text-2xl font-semibold text-white bg-custom-orange px-2 py-1 rounded-md mb-6">Formulário de Cadastro</h2>

      <h4 className="font-semibold text-gray-600 mb-1 border-b border-gray-300">Dados Pessoais</h4>
      
      <form onSubmit={handleFormSubmit}>
        {/* Nome */}
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
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
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
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
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
            onChange={(e) => {
              handleChange(e);
              validateAge(e.target.value);
            }}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
            placeholder="Digite sua idade"
          />
          {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
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
            className="mt-1 py-3 px-4 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
          >
            <option value="" disabled hidden>
              Selecione o tipo de documento
            </option>
            <option value="CPF">CPF</option>
            <option value="CNPJ">CNPJ</option>
          </select>
          {errors.typeDocument && <p className="text-red-500 text-xs mt-1">{errors.typeDocument}</p>}
        </div>

        {/* Número do Documento (CPF / CNPJ) */}
        <div className="mb-4">
          <label htmlFor="numberDocument" className="block text-sm font-medium text-gray-700">
            Número do Documento
          </label>
          <InputMask
            mask={values.typeDocument === "CPF" ? "999.999.999-99" : "99.999.999/0001-99"}
            id="numberDocument"
            name="numberDocument"
            value={values.numberDocument}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
            placeholder="Digite o número do documento"
          />
          {errors.numberDocument && <p className="text-red-500 text-xs mt-1">{errors.numberDocument}</p>}
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
            className="mt-1 py-3 px-4 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
          >
            <option value="" disabled hidden>
              Selecione o gênero
            </option>
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
          <InputMask
            mask="(99) 99999-9999"
            id="phoneNumber"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
            placeholder="Digite seu número de telefone"
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
        </div>


        <h4 className="font-semibold text-gray-600  mt-8 mb-3 border-b border-gray-300">Dados Profissionais</h4>
        {/* Formato de Contratação */}
        <div className="mb-4">
          <label htmlFor="contractType" className="block text-sm font-medium text-gray-700">
            Formato de Contratação
          </label>
          <select
            id="contractType"
            name="contractType"
            value={values.contractType}
            onChange={handleChange}
            className="mt-1 py-3 px-4 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
          >
            <option value="" disabled hidden>
              Selecione o formato de contratação
            </option>
            <option value="PJ">PJ</option>
            <option value="CLT">CLT</option>
          </select>
          {errors.contractType && <p className="text-red-500 text-xs mt-1">{errors.contractType}</p>}
        </div>

        {/* Ativo */}
        <div className="mb-4">
          <label htmlFor="isActive" className="block text-sm font-medium text-gray-700">
            Contrato Ativo
          </label>
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={values.isActive}
            onChange={handleChange}
            className="mt-1 w-5 h-5 text-gray-900 focus:ring-2 focus:ring-gray-400"
          />
        </div>

        {/* Observação */}
        <div className="mb-4">
          <label htmlFor="observation" className="block text-sm font-medium text-gray-700">
            Observação
          </label>
          <textarea
            id="observation"
            name="observation"
            value={values.observation}
            onChange={handleChange}
            rows="3"
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:outline-none"
            placeholder="Digite qualquer observação (opcional)"
          />
        </div>

        {/* Botão de Enviar */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-3 px-4 text-white bg-custom-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Enviar
          </button>
        </div>
      </form>
      <ToastContainer   style={{ width: "max-con" }}   />

    </div>
  );
}

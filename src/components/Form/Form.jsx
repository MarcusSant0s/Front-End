import React, { useState } from "react";
import InputMask from "react-input-mask"; // Importing InputMask for phone and document fields

export default function Form() {
  // Form state
  const [values, setValues] = useState({
    name: "",
    lastName: "",
    age: "",
    typeDocument: "",
    numberDocument: "",
    gender: "",
    phoneNumber: "",
  });

  // Error state
  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    age: "",
    typeDocument: "",
    numberDocument: "",
    phoneNumber: "",
    gender: "",
  });

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Basic field validation: No numbers in name or last name
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

    setValues({
      ...values,
      [name]: value,
    });
  };

  // Age validation: between 1 and 100
  const validateAge = (age) => {
    if (age < 1 || age > 100) {
      setErrors({
        ...errors,
        age: "A idade deve ser um número de entre 1 e 100.",
      });
    } else {
      setErrors({
        ...errors,
        age: "",
      });
    }
  };

  // Form submit handler
  const handleFormSubmit = (e) => {
    e.preventDefault();

    let formIsValid = true;

    // Reset errors before validation
    let newErrors = {
      name: "",
      lastName: "",
      age: "",
      typeDocument: "",
      numberDocument: "",
      phoneNumber: "",
      gender: "",
    };

    // Check for empty fields
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

    // Update errors if there are any
    setErrors(newErrors);

    // Only submit if form is valid
    if (formIsValid) {
      alert("Formulário enviado com sucesso!");
      // Aqui você pode realizar a lógica de envio para a API ou outro processo
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-2">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Formulário de Cadastro</h2>

      <form onSubmit={handleFormSubmit}>
        {/* Name */}
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

        {/* Last Name */}
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

        {/* Age */}
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

        {/* Document Type */}
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

        {/* Document Number (CPF / CNPJ) */}
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

        {/* Gender */}
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

        {/* Phone Number */}
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

        {/* Submit Button */}
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Collaborator, Role } from '../Table/types'; // Ajuste conforme necessário

interface CollaboratorFormProps {
  collaborator: Collaborator | null;
  onClose: () => void;
  onSave: () => void;
}

const CollaboratorForm: React.FC<CollaboratorFormProps> = ({
  collaborator,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Collaborator>({
    id: collaborator ? collaborator.id : undefined,
    name: collaborator ? collaborator.name : '',
    lastName: collaborator ? collaborator.lastName : '',
    cpf: collaborator ? collaborator.cpf : '',
    phoneNumber: collaborator ? collaborator.phoneNumber : '',
    birthDate: collaborator ? collaborator.birthDate : '',
    role: collaborator ? collaborator.role : { id: 0, name: '' }, // Garantir que o role comece como objeto
  });
  console.log(formData)

  const [roles, setRoles] = useState<Role[]>([]);

  // Carregar roles para o select
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/roles');
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);

  // Função para atualizar os dados do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'role') {
      const selectedRole = roles.find((role) => role.id === parseInt(value));
      setFormData({
        ...formData,
        role: selectedRole || { id: 0, name: '' }, // Certifique-se de atualizar o objeto completo do role
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Função para salvar ou atualizar o colaborador
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending request with formData:", formData);
    try {
      if (formData.id === undefined) {
        // Adicionar um novo colaborador
        await axios.post('http://localhost:8080/api/collaborator', formData);
      } else {
        // Atualizar colaborador existente
        await axios.put(`http://localhost:8080/api/collaborator/${formData.id}`, formData);
      }
      onSave(); // Atualiza a lista de colaboradores
      onClose(); // Fecha o formulário
    } catch (error) {
      console.error('Error saving collaborator:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block">CPF - CNPJ</label>
        <input
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block">Birth Date</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block">Role</label>
        <select
          name="role"
          value={formData.role.id}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {formData.id === undefined ? 'Add Collaborator' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

export default CollaboratorForm;

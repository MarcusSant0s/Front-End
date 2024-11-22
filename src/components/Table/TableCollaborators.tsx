import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CollaboratorForm from '../Form/CollaboratorForm';
import { Collaborator, Role } from './types'; // Ajuste conforme necessário

const TableCollaborators: React.FC = () => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedCollaborator, setSelectedCollaborator] = useState<Collaborator | null>(null);

  useEffect(() => {
    fetchCollaborators();
  }, []);

  // Função para buscar colaboradores
  const fetchCollaborators = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/collaborator');
      console.log('Collaborators:', response.data); // Verificar os dados retornados
      setCollaborators(response.data);
    } catch (error) {
      console.error('Error fetching collaborators:', error);
    }
  };

  // Função para excluir colaborador
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/collaborator/${id}`);
      setCollaborators(collaborators.filter((collaborator) => collaborator.id !== id));
    } catch (error) {
      console.error('Error deleting collaborator:', error);
    }
  };

  // Função para editar colaborador
  const handleEdit = (collaborator: Collaborator) => {
    setSelectedCollaborator(collaborator);
    setShowForm(true);
  };

  // Função para adicionar novo colaborador
  const handleAdd = () => {
    setSelectedCollaborator(null);
    setShowForm(true);
  };

  // Função para fechar o formulário
  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div className="container max-sm:w-screen  md:mx-auto mt-8 md:px-4">

      <h1 className="text-2xl font-bold mb-4">Colaboradores</h1>
      <button
        onClick={handleAdd}
        className="mb-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
      >
        Adicionar Colaboradores
      </button>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nome</th>
            <th className="py-2 px-4 border-b">Sobrenome</th>
            <th className="py-2 px-4 border-b">N° Documento</th>
            <th className="py-2 px-4 border-b">Telefone</th>
            <th className="py-2 px-4 border-b">Data Nascimento</th>
            <th className="py-2 px-4 border-b">Função</th>
            <th className="py-2 px-4 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {collaborators.map((collaborator) => (
            <tr key={collaborator.id}>
              <td className="py-2 px-4 border-b">{collaborator.name}</td>
              <td className="py-2 px-4 border-b">{collaborator.lastName}</td>
              <td className="py-2 px-4 border-b">{collaborator.cpf}</td>
              <td className="py-2 px-4 border-b">{collaborator.phoneNumber}</td>
              <td className="py-2 px-4 border-b">{collaborator.birthDate}</td>
              <td className="py-2 px-4 border-b">{collaborator.role.name}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEdit(collaborator)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                >
                  Editar
                </button>
                <button
                   onClick={() => {
                    if (collaborator.id !== undefined) {
                      handleDelete(collaborator.id); // Safe to call handleDelete since id is not undefined
                    }
                  }}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Exibindo o formulário de edição ou criação */}
      {showForm && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
          onClick={closeForm}
        >
          <div
            className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <CollaboratorForm
              collaborator={selectedCollaborator}
              onClose={closeForm}
              onSave={fetchCollaborators} // Atualiza a lista após salvar
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TableCollaborators;

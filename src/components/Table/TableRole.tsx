import React, { useState, useEffect } from "react";
import axios from "axios";

import Modal from "../Modal/Modal"; // Importando o componente Modal

interface Role {
  id: number;
  name: string;
  description: string;
}

const RoleForm: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newRole, setNewRole] = useState<Role>({ id: 0, name: "", description: "" });

  // Buscar roles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/roles");
        setRoles(response.data);
      } catch (error) {
        console.error("Erro ao buscar roles:", error);
      }
    };
    fetchRoles();
  }, []);

  // Função para editar role
  const handleEdit = (role: Role) => {
    setEditingRole(role);
    setShowModal(true);
  };

  // Função para excluir role
  const handleDelete = async (roleId: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/roles/${roleId}`);
      setRoles(roles.filter((role) => role.id !== roleId));
    } catch (error) {
      console.error("Erro ao excluir role:", error);
    }
  };

  // Função chamada após salvar ou atualizar role
  const handleSave = async () => {
    try {
      if (editingRole) {
        // Atualizando role
        await axios.put(`http://localhost:8080/api/roles/${editingRole.id}`, editingRole);
      } else {
        // Criando novo role
        await axios.post("http://localhost:8080/api/roles", newRole);
      }

      // Atualiza a lista de roles
      const response = await axios.get("http://localhost:8080/api/roles");
      setRoles(response.data);
      setShowModal(false); // Fechar o modal
    } catch (error) {
      console.error("Erro ao salvar role:", error);
    }
  };

  // Função chamada ao fechar o modal sem salvar
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Função para lidar com a alteração nos campos de texto
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingRole) {
      setEditingRole({ ...editingRole, [name]: value });
    } else {
      setNewRole({ ...newRole, [name]: value });
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-xl font-bold mb-4">Roles</h1>

      <button
        onClick={() => {
          setEditingRole(null);
          setShowModal(true);
        }}
        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 mb-4"
      >
        Adicionar Role
      </button>

      {showModal && (
        <Modal onClose={handleCloseModal}>
          <div>
            <h2 className="text-lg font-bold">{editingRole ? "Editar Role" : "Adicionar Role"}</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block">Nome</label>
                <input
                id="name"
                type="text"
                name="name"
                value={editingRole ? editingRole.name : newRole.name || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  {editingRole ? "Salvar" : "Adicionar"}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      <table className="min-w-full bg-white border border-gray-300 mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Nome</th>
            <th className="px-4 py-2 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td className="px-4 py-2 border-b text-left">{role.name}</td>
              <td className="px-4 py-2 border-b text-left">{role.description}</td>
              <td className="px-4 py-2 border-b text-left">
                <button
                  onClick={() => handleEdit(role)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(role.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleForm;

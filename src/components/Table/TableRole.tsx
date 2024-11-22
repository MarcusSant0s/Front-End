import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoleForm from '../Form/RoleForm';

interface Role {
  id?: number;
  name: string;
}

const TableRole: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('/api/roles');
      // Verifique se a resposta é um array antes de definir o estado
      if (Array.isArray(response.data)) {
        setRoles(response.data);
      } else {
        console.error('Expected an array, but got:', response.data);
        setRoles([]);  // Garante que o estado seja um array, mesmo que a resposta não seja
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
      setRoles([]);  // Garante que o estado seja um array mesmo em caso de erro
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/roles/${id}`);
      fetchRoles();
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Roles Management</h1>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-300 mb-8">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td className="py-2 px-4 border-b">{role.id}</td>
              <td className="py-2 px-4 border-b">{role.name}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => {}}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(role.id!)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form */}
      <RoleForm fetchRoles={fetchRoles} />
    </div>
  );
};

export default TableRole;

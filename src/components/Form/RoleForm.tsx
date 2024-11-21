import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Role {
  id?: number;
  name: string;
}

const RoleForm: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [formData, setFormData] = useState<Role>({ name: '' });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('/api/roles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && selectedRoleId) {
        await axios.put(`/api/roles/${selectedRoleId}`, formData);
      } else {
        await axios.post('/api/roles', formData);
      }
      fetchRoles();
      resetForm();
    } catch (error) {
      console.error('Error saving role:', error);
    }
  };

  const handleEdit = (role: Role) => {
    setFormData(role);
    setIsEditing(true);
    setSelectedRoleId(role.id || null);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/roles/${id}`);
      fetchRoles();
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  const resetForm = () => {
    setFormData({ name: '' });
    setIsEditing(false);
    setSelectedRoleId(null);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Roles Management</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Role Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className={`px-4 py-2 rounded ${isEditing ? 'bg-blue-500' : 'bg-green-500'} text-white`}
          >
            {isEditing ? 'Update Role' : 'Add Role'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="ml-2 px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <table className="min-w-full bg-white border border-gray-300">
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
                  onClick={() => handleEdit(role)}
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
    </div>
  );
};

export default RoleForm;

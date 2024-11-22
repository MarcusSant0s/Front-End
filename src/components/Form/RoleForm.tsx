import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Role {
  id?: number;
  name: string;
}

interface RoleFormProps {
  fetchRoles: () => void;
}

const RoleForm: React.FC<RoleFormProps> = ({ fetchRoles }) => {
  const [formData, setFormData] = useState<Role>({ name: '' });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);

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
      fetchRoles();  // Re-fetch the roles after adding or editing
      resetForm();
    } catch (error) {
      console.error('Error saving role:', error);
    }
  };

  const resetForm = () => {
    setFormData({ name: '' });
    setIsEditing(false);
    setSelectedRoleId(null);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold">{isEditing ? 'Edit Role' : 'Add Role'}</h2>
      <form onSubmit={handleSubmit} className="mt-4">
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
    </div>
  );
};

export default RoleForm;

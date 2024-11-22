import React, { useState, useEffect } from "react";
import axios from "axios";

interface ClientFormProps {
  client?: Client | null;
  onClose: () => void;
  onSave: () => void;
}

interface Client {
  idClient: number;
  name: string;
  lastName: string;
  document: string;
  city: string;
  street: string;
  phoneNumber: string;
}

const ClientForm: React.FC<ClientFormProps> = ({ client, onClose, onSave }) => {
  const [formData, setFormData] = useState<Client>({
    idClient: client?.idClient || 0,
    name: client?.name || "",
    lastName: client?.lastName || "",
    document: client?.document || "",
    city: client?.city || "",
    street: client?.street || "",
    phoneNumber: client?.phoneNumber || "",
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let createdClient;
      if (formData.idClient) {
        // Update existing client
        await axios.put(`http://localhost:8080/api/client/${formData.idClient}`, formData);
        createdClient = formData; // Existing client
      } else {
        // Create new client
        const response = await axios.post("http://localhost:8080/api/client", formData);
        createdClient = response.data; // Newly created client
      }

      onSave();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
    }
  };

 

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">{formData.idClient ? "Editar Cliente" : "Adicionar Cliente"}</h2>

      <div>
        <label htmlFor="name" className="block font-medium">
          Nome
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="lastName" className="block font-medium">
          Sobrenome
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="document" className="block font-medium">
          Documento
        </label>
        <input
          type="text"
          id="document"
          name="document"
          value={formData.document}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="city" className="block font-medium">
          Cidade
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="street" className="block font-medium">
          Rua
        </label>
        <input
          type="text"
          id="street"
          name="street"
          value={formData.street}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block font-medium">
          Número de Telefone
        </label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
        <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
          Salvar
        </button>
      </div>
    </form>
  );
};

export default ClientForm;

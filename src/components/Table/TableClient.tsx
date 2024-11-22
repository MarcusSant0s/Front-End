import React, { useState, useEffect } from "react";
import axios from "axios";
import ClientForm from "../Form/ClientForm";
import Modal from "../Modal/Modal"; // Importing the Modal component

interface Client {
  idClient: number;
  name: string;
  lastName: string;
  document: string;
  city: string;
  street: string;
  phoneNumber: string;
}

const TableClient: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch clients
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/client");
        setClients(response.data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };
    fetchClients();
  }, []);

  // Edit client
  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setShowModal(true);
  };

  // Delete client
  const handleDelete = async (clientId: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/client/${clientId}`);
      setClients(clients.filter((client) => client.idClient !== clientId));
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    }
  };

  // Called after saving or updating a client
  const handleSave = () => {
    axios.get("http://localhost:8080/api/client").then((response) => {
      setClients(response.data);
    });
    setShowModal(false); // Close the modal
  };

  // Close modal without saving
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Clientes</h1>

      <button
        onClick={() => {
          setEditingClient(null);
          setShowModal(true);
        }}
        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 mb-4"
      >
        Adicionar Cliente
      </button>

      {showModal && (
        <Modal onClose={handleCloseModal}>
          <ClientForm
            client={editingClient}
            onClose={handleCloseModal}
            onSave={handleSave}
          />
        </Modal>
      )}

      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Nome</th>
            <th className="px-4 py-2 border-b">Sobrenome</th>
            <th className="px-4 py-2 border-b">Documento</th>
            <th className="px-4 py-2 border-b">Cidade</th>
            <th className="px-4 py-2 border-b">Rua</th>
            <th className="px-4 py-2 border-b">Número de Telefone</th>
            <th className="px-4 py-2 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.idClient}>
              <td className="px-4 py-2 border-b text-left">{client.name}</td>
              <td className="px-4 py-2 border-b text-left">{client.lastName}</td>
              <td className="px-4 py-2 border-b text-left">{client.document}</td>
              <td className="px-4 py-2 border-b text-left">{client.city}</td>
              <td className="px-4 py-2 border-b text-left">{client.street}</td>
              <td className="px-4 py-2 border-b text-left">{client.phoneNumber}</td>
              <td className="px-4 py-2 border-b text-left">
                <button
                  onClick={() => handleEdit(client)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(client.idClient)}
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

export default TableClient;

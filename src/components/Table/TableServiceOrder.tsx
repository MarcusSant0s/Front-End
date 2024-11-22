import React, { useState, useEffect } from "react";
import axios from "axios";
import ServiceOrderForm from "../Form/ServiceOrderForm"; // Formulário para editar ou adicionar ordens de serviço
import Modal from "../Modal/Modal"; // Importando o componente Modal

interface Collaborator {
  id: number;
  name: string;
  role: { id: number; name: string };
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

interface ServiceOrder {
  idServiceOrder: number;
  collaborator: Collaborator;
  client: Client;
  imagePath: string;
  description: string | null;
  status: string;
  creationDate: string;
  completionDate: string | null;
  lastModified: string | null;
}

const ServiceOrderTable: React.FC = () => {
  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([]);
  const [editingServiceOrder, setEditingServiceOrder] = useState<ServiceOrder | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Fetching service orders
  useEffect(() => {
    const fetchServiceOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/service-orders");
        setServiceOrders(response.data);
      } catch (error) {
        console.error("Erro ao buscar ordens de serviço:", error);
      }
    };
    fetchServiceOrders();
  }, []);

  // Function to edit service order
  const handleEdit = (serviceOrder: ServiceOrder) => {
    setEditingServiceOrder(serviceOrder);
    setShowModal(true);
  };

  // Function to delete service order
  const handleDelete = async (serviceOrderId: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/service-orders/${serviceOrderId}`);
      setServiceOrders(serviceOrders.filter((order) => order.idServiceOrder !== serviceOrderId));
    } catch (error) {
      console.error("Erro ao excluir ordem de serviço:", error);
    }
  };

  // Function called after saving or updating service order
  const handleSave = () => {
    axios.get("http://localhost:8080/api/service-orders").then((response) => {
      setServiceOrders(response.data); // Refetch and update the service orders list
    });
    setShowModal(false); // Close the modal
  };

  // Function to close the modal without saving
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container max-sm:w-screen  md:mx-auto mt-8 md:px-4">

      <h1 className="text-xl font-bold mb-4">Ordens de Serviço</h1>

      <button
        onClick={() => {
          setEditingServiceOrder(null);
          setShowModal(true);
        }}
        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 mb-4"
      >
        Adicionar Ordem de Serviço
      </button>

      {showModal && (
        <Modal onClose={handleCloseModal}>
          <ServiceOrderForm
            serviceOrder={editingServiceOrder}
            onClose={handleCloseModal}
            onSave={handleSave}
          />
        </Modal>
      )}

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Colaborador</th>
            <th className="px-4 py-2 border-b">Cliente</th>
            <th className="px-4 py-2 border-b">Imagem</th>
            <th className="px-4 py-2 border-b">Descrição</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b">Data de Criação</th>
            <th className="px-4 py-2 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {serviceOrders.map((serviceOrder) => (
            <tr key={serviceOrder.idServiceOrder}>
              <td className="px-4 py-2 border-b text-left">{serviceOrder.collaborator.name}</td>
              <td className="px-4 py-2 border-b text-left">{serviceOrder.client.name}</td>
              <td className="px-4 py-2 border-b text-left">{serviceOrder.imagePath}</td>
              <td className="px-4 py-2 border-b text-left">{serviceOrder.description}</td>
              <td className="px-4 py-2 border-b text-left">{serviceOrder.status}</td>
              <td className="px-4 py-2 border-b text-left">{serviceOrder.creationDate}</td>
              <td className="px-4 py-2 border-b text-left">
                <button
                  onClick={() => handleEdit(serviceOrder)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(serviceOrder.idServiceOrder)}
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

export default ServiceOrderTable;

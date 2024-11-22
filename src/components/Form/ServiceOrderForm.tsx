import React, { useState, useEffect } from "react";
import axios from "axios";

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
  idServiceOrder?: number;
  collaborator: Collaborator;
  client: Client;
  imagePath: string;
  description: string | null;
  status: string;
  creationDate: string;
  completionDate: string | null;
  lastModified: string | null;
}

interface ServiceOrderFormProps {
  serviceOrder: ServiceOrder | null;
  onClose: () => void;
  onSave: () => void;
}

const ServiceOrderForm: React.FC<ServiceOrderFormProps> = ({ serviceOrder, onClose, onSave }) => {
  const [formData, setFormData] = useState<ServiceOrder>({
    collaborator: { id: 0, name: "", role: { id: 0, name: "" } },
    client: { idClient: 0, name: "", lastName: "", document: "", city: "", street: "", phoneNumber: "" },
    imagePath: "",
    description: "",
    status: "Pendente",
    creationDate: "",
    completionDate: null,
    lastModified: null,
  });

  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  // Fetching collaborators and clients for selection
  useEffect(() => {
    const fetchData = async () => {
      try {
        const collaboratorsResponse = await axios.get("http://localhost:8080/api/collaborator");
        setCollaborators(collaboratorsResponse.data);
        const clientsResponse = await axios.get("http://localhost:8080/api/client");
        setClients(clientsResponse.data);

        if (serviceOrder) {
          setFormData(serviceOrder);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [serviceOrder]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    // Se o nome do campo for 'collaborator' ou 'client', atualize apenas o 'id' do colaborador/cliente.
    if (name === "collaborator") {
      setFormData((prevData) => ({
        ...prevData,
        collaborator: { ...prevData.collaborator, id: parseInt(value) },
      }));
    } else if (name === "client") {
      setFormData((prevData) => ({
        ...prevData,
        client: { ...prevData.client, idClient: parseInt(value) },
      }));
    } else {
      // Para outros campos, atualize o valor diretamente.
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.idServiceOrder) {
        await axios.put(`http://localhost:8080/api/service-orders/${formData.idServiceOrder}`, formData);
      } else {
        await axios.post("http://localhost:8080/api/service-orders", formData);
      }
      onSave();
    } catch (error) {
      console.error("Erro ao salvar a ordem de serviço:", error);
    }
  };

  return (
    <div className="modal-content p-6 bg-white rounded-md">
      <h2 className="text-xl font-bold mb-4">{serviceOrder ? "Editar Ordem de Serviço" : "Adicionar Ordem de Serviço"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="collaborator" className="block font-medium mb-2">
            Colaborador
          </label>
          <select
            id="collaborator"
            name="collaborator"
            value={formData.collaborator.id}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Selecione um colaborador</option>
            {collaborators.map((collaborator) => (
              <option key={collaborator.id} value={collaborator.id}>
                {collaborator.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="client" className="block font-medium mb-2">
            Cliente
          </label>
        
          <select
            id="client"
            name="client"
            value={formData.client.idClient}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Selecione um cliente</option>
            {clients.map((client) => (
              <option key={client.idClient} value={client.idClient}>
                {client.name} {client.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="imagePath" className="block font-medium mb-2">
          Foto
          </label>
          <input
            id="imagePath"
            name="imagePath"
            type="text"
            value={formData.imagePath}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block font-medium mb-2">
            Descrição
          </label>
          <input
            id="description"
            name="description"
            type="text"
            value={formData.description || ""}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block font-medium mb-2">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          >
            <option value="Pendente">Pendente</option>
            <option value="Concluído">Concluído</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded"
          >
            {serviceOrder ? "Atualizar" : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceOrderForm;

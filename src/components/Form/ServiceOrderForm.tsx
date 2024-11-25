import React, { useState, useEffect } from "react";
import axios from "axios";

interface Collaborator {
  id: number;
  name: string;
  role: { id: number; name: string };
}
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
  manager: Collaborator; 
  technical: Collaborator; 
  client: Client;
  imagePath: File | null;
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
    manager: { id: 0, name: "", role: { id: 0, name: "" } },
    technical: { id: 0, name: "", role: { id: 0, name: "" } },
    client: { idClient: 0, name: "", lastName: "", document: "", city: "", street: "", phoneNumber: "" },
    imagePath: null,
    description: "",
    status: "Pendente",
    creationDate: "",
    completionDate: null,
    lastModified: null,
  });

  const [image, setImage] = useState<File | null>(null);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  // Fetching collaborators and clients for selection
  useEffect(() => {
    const fetchData = async () => {
      try {
        const collaboratorsResponse = await axios.get("http://localhost:8080/api/collaborator");
        console.log(collaboratorsResponse)
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
  console.log("handleChange");
  console.log(e.target.value);


    const { name, value } = e.target;
    console.log(name)
    console.log(value)
    
    if (name === "manager" || name === "technical") {
      // Garantir que manager e technical sejam sempre objetos
      setFormData((prevData) => ({
        ...prevData,
        [name]: { ...prevData[name as keyof ServiceOrder], id: parseInt(value) } as Collaborator,
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
      const data = new FormData();
      console.log("pre-data")
      console.log(data)
      data.append("serviceOrder", new Blob([JSON.stringify(formData)], { type: "application/json" }));

      if (image) data.append("image", image);

  
      const formDataEntries = data as unknown as { entries: () => IterableIterator<[string, FormDataEntryValue]> };

      for (const [key, value] of formDataEntries.entries()) {
        console.log(`${key}:`, value);
      }


      if (formData.idServiceOrder) {
        console.log("Put : \n")
        console.log(data)
        await axios.put(`http://localhost:8080/api/service-orders/${formData.idServiceOrder}`, data);
      } else {
        console.log("Post : \n")
        console.log(data)
        await axios.post("http://localhost:8080/api/service-orders", data);
      }

      onSave();
    } catch (error) {
      console.error("Erro ao salvar a ordem de serviço:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="modal-content p-6 bg-white rounded-md">
      <h2 className="text-xl font-bold mb-4">{serviceOrder ? "Editar Ordem de Serviço" : "Adicionar Ordem de Serviço"}</h2>
      <form onSubmit={handleSubmit}>

 {/* Seleção do colaborador manager */}
 <div className="mb-4">
          <label htmlFor="manager" className="block font-medium mb-2">
            Administrativo
          </label>
          <select
            id="manager"
            name="manager"
            value={formData.manager?.id}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Selecione o gerente</option>
            {collaborators && collaborators.length > 0 ? (
              collaborators.map((collaborator) => (
                <option key={collaborator.id} value={collaborator.id}>
                  {collaborator.name}
                </option>
              ))
            ) : (
              <option disabled>Não há colaboradores disponíveis</option>
            )}
          </select>
        </div>

        {/* Seleção do colaborador técnico */}
        <div className="mb-4">
          <label htmlFor="technical" className="block font-medium mb-2">
            Técnico
          </label>
          <select
            id="technical"
            name="technical"
            value={formData.technical?.id}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Selecione o técnico</option>
            {collaborators && collaborators.length > 0 ? (
              collaborators.map((collaborator) => (
                <option key={collaborator.id} value={collaborator.id}>
                  {collaborator.name}
                </option>
              ))
            ) : (
              <option disabled>Não há colaboradores disponíveis</option>
            )}
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
            type="file"
            accept="image/*"
            onChange={handleImageChange}
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

import React, { useState } from "react";
import axios from "axios";

interface Stock {
  id?: number;
  stockName: string;
}

// types.ts
interface Product {
  id: number;
  description: string;
  serialNumber: string;
  active: boolean;
}


interface StockFormProps {
  onClose: () => void;
  onSave: () => void;
  existingStock?: Stock;
  allProducts: Product[];
}

const StockForm: React.FC<StockFormProps> = ({ onClose, onSave, existingStock, allProducts }) => {
  const [formData, setFormData] = useState<Stock>({
    id: existingStock?.id,
    stockName: existingStock?.stockName || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.id) {
        // Atualização de estoque
        await axios.put(`http://localhost:8080/api/stock/${formData.id}`, formData);
      } else {
        // Criação de novo estoque
        await axios.post("http://localhost:8080/api/stock", formData);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error("Error saving stock:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">{formData.id ? "Editar Estoque" : "Criar Estoque"}</h2>
      <div>
        <label htmlFor="stockName" className="block font-medium">
          Nome do Estoque
        </label>
        <input
          type="text"
          id="stockName"
          name="stockName"
          value={formData.stockName}
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

export default StockForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { StockFormProps } from "./types"; // Ajuste o caminho conforme sua estrutura

const StockForm: React.FC<StockFormProps> = ({ onClose, onSave, existingStock }) => {
  const [stockName, setStockName] = useState<string>("");

  // Preencher os campos se houver um estoque existente
  useEffect(() => {
    if (existingStock) {
      setStockName(existingStock.stockName || "");
    }
  }, [existingStock]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const stockData = {
      stockName,
    };

    try {
      if (existingStock?.idStock) {
        // Atualizar estoque existente
        await axios.put(`http://localhost:8080/api/stock/${existingStock.idStock}`, stockData);
      } else {
        // Criar novo estoque
        await axios.post("http://localhost:8080/api/stock", stockData);
      }

      onSave(); // Atualizar lista de estoques
      onClose(); // Fechar formulário
    } catch (error) {
      console.error("Erro ao salvar o estoque:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="stockName" className="block text-sm font-semibold">
          Nome do Estoque
        </label>
        <input
          id="stockName"
          type="text"
          value={stockName}
          onChange={(e) => setStockName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div className="flex space-x-2">
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          {existingStock ? "Atualizar Estoque" : "Adicionar Estoque"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default StockForm;

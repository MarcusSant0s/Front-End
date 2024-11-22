import React, { useState, useEffect } from "react";
import axios from "axios";
import StockForm from "../Form/StockForm"; // Ajuste o caminho conforme necessário

interface Stock {
  id?: number;
  stockName: string;
  products: { productId: number; quantity: number }[];
}

const StocksTable: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/stock");
      setStocks(response.data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  const handleDelete = async (id: number) => {
      try {
        await axios.delete(`http://localhost:8080/api/stock/${id}`);
        setStocks(stocks.filter((stock) => stock.id !== id));
      } catch (error) {
        console.error("Error deleting stock:", error);
      }
    
  };

  const handleEdit = (stock: Stock) => {
    setSelectedStock(stock);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedStock(null);
    setShowForm(true);
  };

  const closeForm = () => setShowForm(false);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Estoques</h1>
      <button
        onClick={handleAdd}
        className="mb-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
      >
        Adicionar Estoque
      </button>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nome do Estoque</th>
            <th className="py-2 px-4 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.id}>
              <td className="py-2 px-4 border-b">{stock.stockName}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEdit(stock)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => stock.id && handleDelete(stock.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
          onClick={closeForm}
        >
          <div
            className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <StockForm
              onClose={closeForm}
              onSave={fetchStocks}
              existingStock={selectedStock || undefined}
              allProducts={[]} // Passe os produtos aqui, se necessário
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StocksTable;

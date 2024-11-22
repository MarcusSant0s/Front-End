import React, { useState, useEffect } from "react";
import axios from "axios";

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
  onSave: () => void;
}

interface Product {
  id: number | undefined;
  description: string;
  serialNumber: string;
  active: boolean;
  quantity: number;
  stock: { // Alterado para incluir o objeto stock
    idStock: number;
  };
}

interface Stock {
  idStock: number;
  stockName: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState<Product>({
    id: product?.id || undefined,
    description: product?.description || "",
    serialNumber: product?.serialNumber || "",
    active: product?.active ?? true, // Valor padrão true
    quantity: product?.quantity || 1,
    stock: { idStock: product?.stock?.idStock || 0 }, // Alterado para refletir stock id
  });

  const [stocks, setStocks] = useState<Stock[]>([]);

  // Buscar estoques disponíveis
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/stock");
        setStocks(response.data);
      } catch (error) {
        console.error("Erro ao buscar estoques:", error);
      }
    };
    fetchStocks();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData((prev) => ({ ...prev, active: checked }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, quantity: Number(e.target.value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(formData)
      let createdProduct;
      if (formData.id) {
        // Atualizar produto existente
        await axios.put(`http://localhost:8080/api/product/${formData.id}`, {
          ...formData,
          stock: { idStock: formData.stock.idStock }, // Envia o stock com apenas o id
        });
        createdProduct = formData; // Produto existente
      } else {
        // Criar novo produto
        const response = await axios.post("http://localhost:8080/api/product", {
          ...formData,
          stock: { idStock: formData.stock.idStock }, // Envia o stock com apenas o id
        });
        createdProduct = response.data; // Produto recém-criado
        console.log(createdProduct);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">{formData.id ? "Editar Produto" : "Adicionar Produto"}</h2>

      <div>
        <label htmlFor="description" className="block font-medium">
          Descrição
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="serialNumber" className="block font-medium">
          Número de Série
        </label>
        <input
          type="text"
          id="serialNumber"
          name="serialNumber"
          value={formData.serialNumber}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="active"
          checked={formData.active}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="active" className="font-medium">
          Ativo
        </label>
      </div>

      <div>
        <label htmlFor="quantity" className="block font-medium">
          Quantidade
        </label>
        <input
          type="number"
          id="quantity"
          value={formData.quantity}
          onChange={handleQuantityChange}
          className="w-full px-3 py-2 border rounded"
          min="1"
          required
        />
      </div>

      <div>
        <label htmlFor="stock" className="block font-medium">
          Estoque
        </label>
        <select
          id="stock"
          value={formData.stock.idStock || ""}
          onChange={(e) => setFormData((prev) => ({ ...prev, stock: { idStock: parseInt(e.target.value, 10) } }))}
          className="w-full px-3 py-2 border rounded"
          required
        >
          <option value="" disabled>
            Selecione um estoque
          </option>
          {stocks.map((stock) => (
            <option key={stock.idStock} value={stock.idStock}>
              {stock.stockName}
            </option>
          ))}
        </select>
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

export default ProductForm;

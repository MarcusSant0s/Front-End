import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from './types'; // Ajuste conforme necessário

interface ProductFormProps {
  product: Product | null;
  onClose: () => void;
  onSave: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState<Product>({
    id: 0,
    description: '',
    serialNumber: ''
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  // Função para lidar com mudanças no formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData:Product) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Função para salvar ou atualizar o produto
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (formData.id) {
        // Atualizar produto existente
        await axios.put(`http://localhost:8080/api/product/${formData.id}`, formData);
      } else {
        // Adicionar novo produto
        await axios.post('http://localhost:8080/api/product', formData);
      }
      onSave(); // Atualiza a lista de produtos
      onClose(); // Fecha o formulário
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">{product ? 'Editar Produto' : 'Adicionar Produto'}</h2>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Descrição
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700">
          Número de Série
        </label>
        <input
          type="text"
          id="serialNumber"
          name="serialNumber"
          value={formData.serialNumber}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          {product ? 'Salvar Alterações' : 'Adicionar Produto'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;

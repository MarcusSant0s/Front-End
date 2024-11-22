import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from '../Form/ProductForm'; // Ajuste conforme necessário
import { Product } from './types'; // Ajuste conforme necessário

const TableProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Função para buscar produtos
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/product');
      console.log('Products:', response.data); // Verificar os dados retornados
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Função para excluir produto
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/product/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Função para editar produto
  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  // Função para adicionar novo produto
  const handleAdd = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  // Função para fechar o formulário
  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Produtos</h1>
      <button
        onClick={handleAdd}
        className="mb-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
      >
        Adicionar Produto
      </button>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Descrição</th>
            <th className="py-2 px-4 border-b">Número de Série</th>
            <th className="py-2 px-4 border-b">Ações</th>
            <th className="py-2 px-4 border-b">Ativo</th>

          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{product.serialNumber}</td>

              <td className="py-2 px-4 border-b">{product.description}</td>
              <td className="py-2 px-4 border-b">{product.serialNumber}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEdit(product)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                >
                  Editar
                </button>
                <button
                   onClick={() => {
                    if (product.id !== undefined) {
                      handleDelete(product.id); // Safe to call handleDelete since id is not undefined
                    }
                  }}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Exibindo o formulário de edição ou criação */}
      {showForm && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
          onClick={closeForm}
        >
          <div
            className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <ProductForm
              product={selectedProduct}
              onClose={closeForm}
              onSave={fetchProducts} // Atualiza a lista após salvar
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TableProduct;

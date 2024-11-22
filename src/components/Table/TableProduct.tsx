import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "../Form/ProductForm";
import Modal from "../Modal/Modal"; // Importando o componente Modal

interface Product {
  id: number;
  description: string;
  serialNumber: string;
  active: boolean;
  quantity: number;
  stock: { // Alterado para incluir o objeto stock
    idStock: number;
    stockName: string;
  };
}
const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Buscar produtos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/product");
        setProducts(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    fetchProducts();
  }, []);

  // Função para editar produto
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  // Função para excluir produto
  const handleDelete = async (productId: number) => {
    console.log("delete " + productId )
    try {
      await axios.delete(`http://localhost:8080/api/product/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  };

  // Função chamada após salvar ou atualizar produto
  const handleSave = () => {
    // Atualiza a lista de produtos

    axios.get("http://localhost:8080/api/product").then((response) => {
      setProducts(response.data);
    });
    setShowModal(false); // Fechar o modal
  };

  // Função chamada ao fechar o modal sem salvar
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="">
      <h1 className="text-xl font-bold mb-4">Produtos</h1>

      <button
        onClick={() => {
          setEditingProduct(null);
          setShowModal(true);
        }}
        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 mb-4"
      >
        Adicionar Produto
      </button>

      {showModal && (
        <Modal onClose={handleCloseModal}>
          <ProductForm
            product={editingProduct}
            onClose={handleCloseModal}
            onSave={handleSave}
          />
        </Modal>
      )}

<table className="min-w-full table-auto">
  <thead>
    <tr>
      <th className="px-4 py-2 border-b">Descrição</th>
      <th className="px-4 py-2 border-b">Número de Série</th>
      <th className="px-4 py-2 border-b">Quantidade</th>
      <th className="px-4 py-2 border-b">Estoque</th>
      <th className="px-4 py-2 border-b">Ativo</th>
      <th className="px-4 py-2 border-b">Ações</th>
    </tr>
  </thead>
  <tbody>
    {products.map((product) => (
      <tr key={product.id}>
        <td className="px-4 py-2 border-b text-left ">{product.description}</td>
        <td className="px-4 py-2 border-b text-left ">{product.serialNumber}</td>
        <td className="px-4 py-2 border-b text-left ">{product.quantity}</td>
        <td className="px-4 py-2 border-b text-left ">{product.stock ? product.stock.stockName : 'Não definido'}</td> 
        <td className="px-4 py-2 border-b text-left ">{product.active ? "Sim" : "Não"}</td>
        <td className="px-4 py-2 border-b text-left ">
          <button
            onClick={() => handleEdit(product)}
            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
          >
            Editar
          </button>
          <button
            onClick={() => handleDelete(product.id)}
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
export default ProductTable;

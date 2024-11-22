import {useState} from 'react'
import { Link } from 'react-router-dom';

export default function SideBar () {

  const [isNavBarActive, setIsNavBarActive] = useState(true);


  const links = [
    { path: "tabela/ordem-servico", label: "Ordens de Serviço" },
    { path: "tabela/colaborador", label: "Colaboradores" },
    { path: "tabela/produto", label: "Produtos" },
    { path: "tabela/estoque", label: "Estoques" },
    { path: "tabela/cliente", label: "Clientes" },
    { path: "tabela/funções", label: "Funções" },


  ];

  return (
      <aside
        className={` hidden md:block w-64 bg-white border-r border-gray-300 transition-transform ${
          isNavBarActive ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 flex flex-col`}
      >
        <div className="p-4 bg-gray-200 border-b border-gray-300">
          <h2 className="text-xl font-semibold text-gray-700">Menu</h2>
 
        </div>
        <nav className="flex-1 p-4 space-y-4">
          {links.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className="block py-2 px-3 rounded-lg hover:bg-gray-100 text-gray-700 font-medium"
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>
  )
}

  
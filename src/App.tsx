import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import PageNotFound from './routes/PageNotFound';
import Layout from './routes/Layout'; 
import Login from './routes/Login';
import Home from './routes/Home';

import TableRole from './components/Table/TableRole';
import TableProduct from './components/Table/TableProduct';
import TableCollaborators from './components/Table/TableCollaborators';
import TableServiceOrder from './components/Table/TableServiceOrder';
import TableStock from './components/Table/TableStock';
import TableClient from './components/Table/TableClient';

interface FormRoute {
  path: string;
  element: JSX.Element;
}

const formRoutes: FormRoute[] = [
  { path: "tabela/colaborador", element: <TableCollaborators /> },
  { path: "tabela/produto", element: <TableProduct /> },
  { path: "tabela/estoque", element: <TableStock /> },
  { path: "tabela/cliente", element: <TableClient /> },
  { path: "tabela/ordem-servico", element: <TableServiceOrder /> },
  { path: "tabela/funções", element: <TableRole /> },
];

function App() {
  return (
    <Routes>
      {/* Rota para Login */}
      <Route path="/Login" element={<Login />} />

      {/* Layout principal, evitando repetição de componentes */}
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        {formRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>

      {/* Rota de erro */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;

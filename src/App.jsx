
import './App.css'
 
import { Routes, Route } from 'react-router-dom';

import PageNotFound from './routes/PageNotFound';
import Layout from './routes/Layout'; 

import Login from './routes/Login'
import Home from './routes/Home';

import TableProduct from './components/Table/TableProduct';
import TableCollaborators from './components/Table/TableCollaborators';

import TableStock from './components/Table/TableStock';
import TableClient from './components/Table/TableClient'

const formRoutes = [

  { path: "tabela/colaborator", element: <TableCollaborators /> },
  { path: "tabela/produto", element: <TableProduct/> },
  { path: "tabela/estoque", element: <TableStock/> },
  { path: "tabela/cliente", element: <TableClient/> },


];


function App() {


   

  return (
    <Routes>
      {/* Rota para Login */}
      <Route path="/Login" element={<Login />} />

      {/* Mask - evita repetição de componentes */}
      <Route path="/" element={<Layout />}>
      
      <Route path="" element={<Home />} />
          {formRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>

      {/* Rota de erro */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
 
 
)
}

export default App

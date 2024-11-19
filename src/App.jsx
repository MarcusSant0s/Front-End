
import './App.css'
 
import { Routes, Route } from 'react-router-dom';

import PageNotFound from './routes/PageNotFound';
import Layout from './routes/Layout'; 
import CostumerForm from './components/Form/CostumerForm';

import Login from './routes/Login'
import Home from './routes/Home';


import StateForm from './components/Form/StateForm';
import CityForm from './components/Form/CityForm';
import UserForm from './components/Form/UserForm';

const formRoutes = [
  { path: "cadastro/user", element: <UserForm /> },
  { path: "cadastro/estado", element: <StateForm /> },
  { path: "cadastro/cidade", element: <CityForm /> },
  { path: "cadastro/cliente", element: <CostumerForm /> },
];


function App() {


   

  return (
    <Routes>
      {/* Rota para Login */}
      <Route path="/Login" element={<Login />} />

      {/* Mask - evita repetição de componentes */}
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Home />} />

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

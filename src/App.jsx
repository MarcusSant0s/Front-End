
import './App.css'
 
import { Routes, Route } from 'react-router-dom';
import Layout from './routes/Layout'; 
import Login from './routes/Login'
import PageNotFound from './routes/PageNotFound';

import StateForm from './components/Form/StateForm';
import CityForm from './components/Form/CityForm';
import UserForm from './components/Form/UserForm';

const formRoutes = [
  { path: "cadastro/user", element: <UserForm /> },
  { path: "cadastro/estado", element: <StateForm /> },
  { path: "cadastro/cidade", element: <CityForm /> },
];


function App() {


   

  return (
    <Routes>

      {/* Rota para Login */}
      <Route
        path="/Login" 
        element={
        <Login />
        }
       />

      {/* Mask - evita repetição de componentes */}
      <Route path="/" element={<Layout />}>
         
      {
      formRoutes.map(
        (route, index) => (
                            <Route  
                              key={index} 
                              path={route.path} 
                              element={route.element}
                            />
      ))}
        
      </Route>
      
      {/* Rota de erro */}
        <Route 
          path="*" 
          element={
          <PageNotFound />
          }
        />

  </Routes>

 
  

//   <div className="grid md:grid-cols-4 md:gap-6 ">
//   <div className='col-span-4 sm:hidden'>
//     {/* NavBar */}
//     <NavBar />
//   </div>
//   <div className=" md:col-span-1 sm:hidden">
//     {/* SideBar */}
//     
//   </div>
//   <div className="col-span-3 ">
//     {/* Form */}
//     <Form />
//   </div>
// </div>
)
}

export default App

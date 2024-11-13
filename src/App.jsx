import { useState } from 'react' 


 import Form from './components/Form/Form'
 import SideBar from './components/SideBar/SideBar'
 import NavBar from './components/NavBar/NavBar'
import './App.css'

function App() {

  const [isNavBarActive, setIsNavBarActive] = useState(false)
   

  return (
    <div>

          <Form />
    
      </div>
  

//   <div className="grid md:grid-cols-4 md:gap-6 ">
//   <div className='col-span-4 sm:hidden'>
//     {/* NavBar */}
//     <NavBar />
//   </div>
//   <div className=" md:col-span-1 sm:hidden">
//     {/* SideBar */}
//     <SideBar />
//   </div>
//   <div className="col-span-3 ">
//     {/* Form */}
//     <Form />
//   </div>
// </div>
)
}

export default App

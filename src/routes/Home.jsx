import { useState } from 'react'
import UserForm from '../components/Form/UserForm'


const Home = () => {
  const [isNavBarActive, setIsNavBarActive] = useState(false)

  return (
          <UserForm />
  )
}

export default Home
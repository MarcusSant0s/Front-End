 
import { Link } from "react-router-dom"
const PageNotFound = () => {
  return (

        <section className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Página não encontrada</p>

            <Link
                to="/"
                className="p-3 px-6 bg-custom-orange text-white font-semibold rounded-md hover:bg-orange-500 transition"
            >
                Voltar para o início
            </Link>
        </section>

  )
}

export default PageNotFound
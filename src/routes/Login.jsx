import { Footer } from "../components/Footer/Footer";

const Login = () => {
  return (
        <div className="min-h-screen bg-custom-gray text-gray-800">
        <header className="bg-white shadow-md p-4">
            <h1 className="text-2xl font-bold">Cabosat </h1>
        </header>
        <main className="p-6">
        <section class="h-screen flex items-center ">
            <form className="flex flex-col items-center -mt-32 justify-center p-2 w-max  mx-auto bg-white rounded-md ">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Login</h2>

                <input
                    type="text"
                    placeholder="Usuário"
                    class="w-80 p-3 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    class="w-80 p-3 mb-6 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                />

                <button
                    type="submit"
                    class="w-80 p-3 bg-custom-orange text-white font-semibold rounded-md hover:bg-orange-500 transition"
                >
                    Login
                </button>
            </form>
        </section>

        </main>
        <Footer/>
        </div>

  )
}

export default Login;
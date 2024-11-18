import { Footer } from "../components/Footer/Footer";
import PersonSvg from '../components/SVGs/PersonSvg';
import PasswordSvg from '../components/SVGs/PasswordSvg'


const Login = () => {
  return (

        <div className="min-h-screen bg-custom-gray text-black ">
            
            <div class="relative bg-gray-800 h-80">
            <div class="absolute top-0 right-0 w-1/2 h-full bg-gray-800 opacity-50 z-10">
                <div class="absolute top-0 right-0 w-full h-full triangle-1"></div>
                <div class="absolute top-0 right-0 w-full h-full triangle-2 opacity-60"></div>
            </div>
            </div>

        <main className="p-6">
        <section class="h-screen flex ">
            
            <form className="flex flex-col items-center h-max -mt-32 justify-center p-2 w-max  mx-auto bg-white shadow-lg z-20 ">
                <h2 class="text-2xl font-bold text-gray-800 mb-6 border-b border-b-gray-400 w-full max-w-60 text-center">Login</h2>

                <h1 className='font-dm-serif text-custom-orange text-3xl font-bold italic mb-8'> CABOSAT </h1>

                <div className="relative w-80 mb-4">
                    <input
                        type="text"
                        placeholder="Usuário"
                        className="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 pr-10" // Add pr-10 for padding-right
                    />
                    <PersonSvg
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 "
                    />
                </div>

                <div className="relative w-80 mb-4">
                <input
                    type="password"
                    placeholder="Senha"
                    class="w-80 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                    <PasswordSvg
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 "
                    />
                </div>



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
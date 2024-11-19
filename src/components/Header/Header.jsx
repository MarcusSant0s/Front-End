import {useState, useEffect} from 'react'
import IconLogo from '../../assets/favIcon.png'
import Hamburguer_Icon from '../SVGs/Hamburguer_Icon'
 


const Header = () => {
  const [isSidebarAppears, setSidebarAppears] = useState(false);

  // Função para alternar a visibilidade da sidebar
  const toggleSidebar = () => setSidebarAppears(!isSidebarAppears);

  // Adiciona/Remove overflow-hidden no body com base no estado do menu
  useEffect(() => {
    if (isSidebarAppears) {
      // Quando o menu estiver visível, adiciona overflow-hidden no body
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      // Quando o menu não estiver visível, permite rolar novamente
      document.body.style.overflow = 'auto';
    }

    // Cleanup para remover a alteração ao sair da página
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSidebarAppears]);

  return (
    <header className='bg-gray-800 flex justify-between items-center px-4 py-2'>
      {/* Icon Logo */}
      <div>
        <a href="">
        <h1 className='font-dm-serif text-custom-orange text-3xl font-bold italic '> CABOSAT </h1>
                  </a>
      </div>

      {/* Sobreposição e Menu */}
      <div
        className={`${
          isSidebarAppears ? 'block' : 'hidden'
        } absolute left-0 top-0 h-screen w-full bg-gray-300/80 backdrop-blur-sm z-10 `}
        onClick={toggleSidebar} // Fecha a sidebar ao clicar na sobreposição
      >
        <nav
          className='w-3/4 bg-white text-custom-black h-full flex flex-col items-start p-4 z-20 border-r border-black'
          onClick={(e) => e.stopPropagation()} // Impede o clique no menu de fechar a sidebar
        >
          <h4 
          className="text-2xl  mb-2 border-b bg-gray-800 text-white w-full px-2 py-1"
          >Menu
          </h4>
          <a href="#" className=" w-full px-2 py-2">Exemplo 1</a>
          <a href="#" className=" w-full border-y border-gray-300 px-2 py-2">Exemplo 2</a>
          <a href="#" className=" w-full border-y border-gray-300 px-2 py-2">Exemplo 3</a>
        </nav>
      </div>

      {/* Hamburger Icon */}
      <button
        className='ml-auto md:hidden '
        type='button'
        onClick={toggleSidebar}
      >
        <Hamburguer_Icon />
      </button>
    </header>
  );
};

export default Header;

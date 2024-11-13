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
    <header className='bg-custom-orange flex justify-between items-center p-4'>
      {/* Icon Logo */}
      <div>
        <a href="">
          <img src={IconLogo} alt="HomePage Icon" className='w-28' />
        </a>
      </div>

      {/* Sobreposição e Menu */}
      <div
        className={`${
          isSidebarAppears ? 'block' : 'hidden'
        } absolute left-0 top-0 h-screen w-full bg-gray-300/80 backdrop-blur-sm z-10`}
        onClick={toggleSidebar} // Fecha a sidebar ao clicar na sobreposição
      >
        <nav
          className='w-3/4 bg-red-800 h-full flex flex-col items-start p-4 z-20'
          onClick={(e) => e.stopPropagation()} // Impede o clique no menu de fechar a sidebar
        >
          <a href="#" className="text-white py-2">Exemplo 1</a>
          <a href="#" className="text-white py-2">Exemplo 2</a>
          <a href="#" className="text-white py-2">Exemplo 3</a>
        </nav>
      </div>

      {/* Hamburger Icon */}
      <button
        className='ml-auto'
        type='button'
        onClick={toggleSidebar}
      >
        <Hamburguer_Icon />
      </button>
    </header>
  );
};

export default Header;
